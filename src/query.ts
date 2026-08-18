// Consulta da base unificada: identificação do ato, aplicabilidade territorial e
// por segmento, busca avançada e formatação ABNT.

import { LEGISLATION_LIBRARY } from './library';
import type { LegislationEntry, LegislationSegment, LegislationStatus } from './types';
import { toUF } from './uf';

// ── Identificação do ato ─────────────────────────────────────────────────────

/**
 * Segmento que é só referência a artigo/inciso/parágrafo, sem nomear ato algum.
 * O `§` fica fora do grupo com `\b` porque não é caractere de palavra: com a
 * borda exigida, "§ 3º" escapava e virava nome de norma no relatório.
 */
const ONLY_SUBREFERENCE =
  /^(?:(?:art\.?|artigo|inciso|par[aá]grafo|item|subitem|cap[íi]tulo|anexo)\b|§)[\s\d.,ºªivxlcIVXLC-]*$/i;

const ACT_PATTERNS: RegExp[] = [
  // O número aceita ponto de milhar ("RE Anvisa nº 2.605/2006") e ano de 2 ou 4
  // dígitos ("RDC 216/04"), senão o ato é cortado no primeiro ponto.
  /\b(?:RDC|IN|RE|RN|RT)\s*(?:ANVISA\s*)?(?:n[oº.]?\s*)?([\d.]+)(?:[-/]\d{2,4})?/i,
  /\bPortaria\s+(?:(?:GM|SVS|MS|CVS|SES|SMS)[/\s]*)?(?:n[oº.]?\s*)?(\d[\d.]*(?:[-/]\d{2,4})?)/i,
  /\bLei\s+(?:Federal\s+|Estadual\s+|Municipal\s+|Complementar\s+|Ordin[aá]ria\s+)?(?:[A-Z]{2}\s+)?(?:n[oº.]?\s*)?([\d.]+(?:[-/]\d{2,4})?)/i,
  /\bDecreto(?:-Lei)?\s+(?:n[oº.]?\s*)?([\d.]+(?:[-/]\d{2,4})?)/i,
  /\bNR[.\s-]?(\d+)/i,
  /\bABNT\s+NBR\s+(\d+)/i,
  /\bInstru[cç][aã]o\s+Normativa\s+(?:n[oº.]?\s*)?(\d+(?:[-/]\d{2,4})?)/i,
  /\bNota\s+T[eé]cnica\b[^;,]*/i,
  /\bResolu[cç][aã]o\s+(?:n[oº.]?\s*)?([\d.]+(?:[-/]\d{2,4})?)/i,
];

const SUBREF_TAIL = /[,\s]+(al[íi]nea|inciso|artigo|art\.|§|par[aá]grafo|item|subitem|cap[íi]tulo).*/i;

/**
 * Extrai apenas a legislação base de um texto bruto, descartando sub-referências
 * como alíneas, incisos, artigos e parágrafos.
 */
export function extractBaseLegislation(raw: string): string[] {
  const bases = new Set<string>();

  for (const segment of (raw || '').split(';')) {
    const s = segment.trim();
    if (!s) continue;

    let matched = false;
    for (const pattern of ACT_PATTERNS) {
      const match = s.match(pattern);
      if (!match) continue;
      const clean = match[0].trim().replace(SUBREF_TAIL, '').trim();
      if (clean) bases.add(clean);
      matched = true;
      break;
    }

    if (!matched && s.length > 3 && !ONLY_SUBREFERENCE.test(s)) {
      const clean = s.replace(SUBREF_TAIL, '').trim();
      if (clean && !ONLY_SUBREFERENCE.test(clean)) bases.add(clean);
    }
  }

  return Array.from(bases);
}

const TYPE_TOKEN =
  /\bRDC\b|\bPORTARIA\b|\bDECRETO\b|\bLEI\b|\bNR\b|\bNBR\b|\bINSTRUCAO NORMATIVA\b|\bIN\b|\bRESOLUCAO\b|\bNOTA TECNICA\b|\bPARECER\b|\bCBO\b|\bRE\b/;

/**
 * Chave canônica de uma legislação, para deduplicar variações do mesmo ato
 * (ex.: "RDC 502/2021", "RDC ANVISA nº 502/2021", "RDC nº 502/2021" → mesma chave).
 * Reduz a tipo + número + ano, ignorando "ANVISA", "nº", artigos e acentos.
 */
export function canonicalLegislationKey(raw: string): string {
  const up = (raw || '')
    .toUpperCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

  const typeMatch = up.match(TYPE_TOKEN);
  const type = typeMatch ? typeMatch[0].replace(/\s+/g, ' ') : 'OUTRO';

  // Trecho a partir do tipo reconhecido — não do início da string. Um texto como
  // "Art. 276, Lei Municipal 1.812/2014" não pode ter o "276" do artigo
  // confundido com o número da lei.
  const searchFrom = typeMatch ? typeMatch.index! + typeMatch[0].length : 0;
  const tail = up.slice(searchFrom);

  // Ano de 4 dígitos quando existir; senão, ano de 2 dígitos colado ao número do
  // ato por barra ("Portaria SVS/MS nº 344/98", "Decreto-Rio 45585/18"). Exige-se
  // número de ato com 3+ dígitos e separador "/" para não ler "NR-32" nem
  // "CBO 5162-10" como ano.
  const yearMatch = up.match(/\b(19|20)\d{2}\b/);
  let year = yearMatch ? yearMatch[0] : '';
  if (!year) {
    const short = tail.match(/\d[\d.]{2,}\/(\d{2})\b/);
    if (short) {
      const yy = Number(short[1]);
      year = String(yy >= 30 ? 1900 + yy : 2000 + yy);
    }
  }

  // Número principal: primeira sequência de dígitos diferente do ano, sem ponto de
  // milhar e sem zeros à esquerda ("002/2020" e "2/2020" são o mesmo ato).
  const nums = (tail.match(/\d[\d.]*/g) || []).map((n) =>
    n.replace(/\./g, '').replace(/^0+(?=\d)/, ''),
  );
  const yearShort = year ? year.slice(2) : '';
  const number = nums.find((n) => n !== year && n !== yearShort) || nums[0] || '';

  return `${type}|${number}|${year}`;
}

const BY_KEY = new Map<string, LegislationEntry>(
  LEGISLATION_LIBRARY.map((entry) => [canonicalLegislationKey(entry.name), entry]),
);

/** Verbete da biblioteca correspondente a uma citação livre, ou undefined. */
export function findLegislation(mention: string): LegislationEntry | undefined {
  return BY_KEY.get(canonicalLegislationKey(mention));
}

// ── Aplicabilidade ───────────────────────────────────────────────────────────

export interface LegislationScope {
  /** UF ou nome do estado do estabelecimento. Vazio = só normas federais casam. */
  uf?: string | null;
  municipio?: string | null;
  /** Segmento do estabelecimento, para a sugestão automática. */
  segment?: string | null;
}

function normalizeMunicipio(value?: string | null): string {
  return (value || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

/**
 * Alcance territorial: a norma vale onde o estabelecimento está?
 * Federal vale sempre. Estadual exige a UF. Municipal exige UF e município.
 * Não olha segmento nem vigência — é a pergunta geográfica isolada, usada para
 * casar as normas citadas dentro de um documento.
 */
export function matchesScope(entry: LegislationEntry, scope: LegislationScope = {}): boolean {
  const entryUF = toUF(entry.uf);
  if (!entryUF) return true; // federal/nacional

  if (entryUF !== toUF(scope.uf)) return false;
  if (!entry.municipio) return true;

  return normalizeMunicipio(entry.municipio) === normalizeMunicipio(scope.municipio);
}

/**
 * Decide se uma norma deve ser **sugerida automaticamente** para um
 * estabelecimento, pela UF, pelo município e pelo segmento.
 * - Ato revogado nunca é sugerido; se algum item ainda o citar, o relatório
 *   imprime a substituta em vez de tratá-lo como vigente.
 * - Federal sem segmento curado não infla a lista: entra pelo item que a cita.
 * - Estadual/municipal precisa casar o território; o segmento, quando curado,
 *   ainda é respeitado.
 */
export function isApplicable(entry: LegislationEntry, scope: LegislationScope = {}): boolean {
  if (entry.status === 'revogada') return false;
  if (!matchesScope(entry, scope)) return false;

  const segments = entry.segments || [];
  if (segments.length === 0) {
    // Sem segmento curado: territorial entra pelo território, federal não entra.
    return Boolean(toUF(entry.uf));
  }
  return Boolean(scope.segment) && segments.includes(scope.segment as LegislationSegment);
}

/** Normas sugeridas para um estabelecimento, em ordem alfabética. */
export function applicableLegislation(scope: LegislationScope): LegislationEntry[] {
  return LEGISLATION_LIBRARY.filter((entry) => isApplicable(entry, scope)).sort((a, b) =>
    a.name.localeCompare(b.name, 'pt-BR'),
  );
}

// ── Busca avançada ───────────────────────────────────────────────────────────

export interface LegislationFilter {
  /** Termos livres; todos precisam aparecer em nome, ementa, autoria ou ABNT. */
  texto?: string;
  /** UF de abrangência. 'BR' ou 'federal' devolve só as nacionais. */
  uf?: string | null;
  municipio?: string | null;
  segment?: LegislationSegment;
  status?: LegislationStatus[];
  /** Por padrão as revogadas ficam de fora da busca. */
  incluirRevogadas?: boolean;
}

function searchable(entry: LegislationEntry): string {
  return [entry.name, entry.summary, entry.authority, entry.abnt, entry.researchNotes]
    .filter(Boolean)
    .join(' ')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase();
}

const HAYSTACK = new Map(LEGISLATION_LIBRARY.map((e) => [e, searchable(e)]));

/**
 * Busca combinada na base — é o que dá consulta avançada às três aplicações.
 * Filtros vazios devolvem a biblioteca inteira (menos as revogadas).
 */
export function searchLegislation(filter: LegislationFilter = {}): LegislationEntry[] {
  const termos = (filter.texto || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .split(/\s+/)
    .filter(Boolean);

  const querFederal = ['BR', 'FEDERAL', 'NACIONAL'].includes((filter.uf || '').trim().toUpperCase());
  const ufAlvo = querFederal ? '' : toUF(filter.uf);

  return LEGISLATION_LIBRARY.filter((entry) => {
    if (!filter.incluirRevogadas && entry.status === 'revogada') return false;
    if (filter.status && !filter.status.includes(entry.status)) return false;

    if (querFederal && toUF(entry.uf)) return false;
    if (ufAlvo && !matchesScope(entry, { uf: ufAlvo, municipio: filter.municipio })) return false;

    if (filter.segment && !(entry.segments || []).includes(filter.segment)) return false;

    if (termos.length) {
      const texto = HAYSTACK.get(entry) || '';
      if (!termos.every((t) => texto.includes(t))) return false;
    }

    return true;
  }).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}

/** Atos que entraram na base sem checagem de vigência. Alimenta o painel de pendências. */
export function pendingVerification(): LegislationEntry[] {
  return LEGISLATION_LIBRARY.filter((e) => e.status === 'nao_verificado' || !e.verifiedAt);
}

// ── Citação ──────────────────────────────────────────────────────────────────

/**
 * Referência no padrão ABNT NBR 6023.
 *
 * Autoria, ementa e vigência vêm do verbete curado — nunca são deduzidas do
 * texto. Quando o verbete traz `abnt` (referência completa, com data do ato e
 * "Disponível em"), ela é usada como está; senão monta-se a forma curta.
 *
 * Sem verbete, a referência sai como o item a citou: sem autoria e sem ementa.
 * Sumir do relatório seria pior — o item cobra uma exigência e some a base dela.
 */
export function formatAbnt(mention: string, entry?: LegislationEntry): string {
  const verbete = entry ?? findLegislation(mention);
  if (!verbete) return mention.trim();

  const revogada = verbete.status === 'revogada';
  const marcaRevogacao = revogada
    ? `[REVOGADA${verbete.replacedBy ? ` — substituída por ${verbete.replacedBy}` : ''}.]`
    : '';

  if (verbete.abnt) return [verbete.abnt, marcaRevogacao].filter(Boolean).join(' ');

  const authority = (verbete.authority || '').trim().replace(/\.$/, '');
  const summary = (verbete.summary || '').trim().replace(/\.$/, '');

  return [
    authority ? `${authority}. ${verbete.name}.` : `${verbete.name}.`,
    summary ? `${summary}.` : '',
    verbete.url ? `Disponível em: ${verbete.url}.` : '',
    marcaRevogacao,
  ]
    .filter(Boolean)
    .join(' ');
}
