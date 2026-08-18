import type { LegislationEntry, LegislationSegment, LegislationStatus } from './types.js';
/**
 * Extrai apenas a legislação base de um texto bruto, descartando sub-referências
 * como alíneas, incisos, artigos e parágrafos.
 */
export declare function extractBaseLegislation(raw: string): string[];
/**
 * Chave canônica de uma legislação, para deduplicar variações do mesmo ato
 * (ex.: "RDC 502/2021", "RDC ANVISA nº 502/2021", "RDC nº 502/2021" → mesma chave).
 * Reduz a tipo + número + ano, ignorando "ANVISA", "nº", artigos e acentos.
 */
export declare function canonicalLegislationKey(raw: string): string;
/** Verbete da biblioteca correspondente a uma citação livre, ou undefined. */
export declare function findLegislation(mention: string): LegislationEntry | undefined;
export interface LegislationScope {
    /** UF ou nome do estado do estabelecimento. Vazio = só normas federais casam. */
    uf?: string | null;
    municipio?: string | null;
    /** Segmento do estabelecimento, para a sugestão automática. */
    segment?: string | null;
}
/**
 * Alcance territorial: a norma vale onde o estabelecimento está?
 * Federal vale sempre. Estadual exige a UF. Municipal exige UF e município.
 * Não olha segmento nem vigência — é a pergunta geográfica isolada, usada para
 * casar as normas citadas dentro de um documento.
 */
export declare function matchesScope(entry: LegislationEntry, scope?: LegislationScope): boolean;
/**
 * Decide se uma norma deve ser **sugerida automaticamente** para um
 * estabelecimento, pela UF, pelo município e pelo segmento.
 * - Ato revogado nunca é sugerido; se algum item ainda o citar, o relatório
 *   imprime a substituta em vez de tratá-lo como vigente.
 * - Federal sem segmento curado não infla a lista: entra pelo item que a cita.
 * - Estadual/municipal precisa casar o território; o segmento, quando curado,
 *   ainda é respeitado.
 */
export declare function isApplicable(entry: LegislationEntry, scope?: LegislationScope): boolean;
/** Normas sugeridas para um estabelecimento, em ordem alfabética. */
export declare function applicableLegislation(scope: LegislationScope): LegislationEntry[];
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
/**
 * Busca combinada na base — é o que dá consulta avançada às três aplicações.
 * Filtros vazios devolvem a biblioteca inteira (menos as revogadas).
 */
export declare function searchLegislation(filter?: LegislationFilter): LegislationEntry[];
/** Atos que entraram na base sem checagem de vigência. Alimenta o painel de pendências. */
export declare function pendingVerification(): LegislationEntry[];
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
export declare function formatAbnt(mention: string, entry?: LegislationEntry): string;
//# sourceMappingURL=query.d.ts.map