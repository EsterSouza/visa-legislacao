import { describe, expect, it } from 'vitest';

import { LEGISLATION_LIBRARY } from '../src/library';
import {
  applicableLegislation,
  canonicalLegislationKey,
  extractBaseLegislation,
  findLegislation,
  formatAbnt,
  isApplicable,
  matchesScope,
  pendingVerification,
  searchLegislation,
} from '../src/query';

describe('integridade da biblioteca', () => {
  it('não tem dois verbetes para o mesmo ato', () => {
    const porChave = new Map<string, string[]>();
    for (const entry of LEGISLATION_LIBRARY) {
      const k = canonicalLegislationKey(entry.name);
      porChave.set(k, [...(porChave.get(k) || []), entry.name]);
    }
    const colisoes = [...porChave.entries()].filter(([, nomes]) => nomes.length > 1);
    expect(colisoes).toEqual([]);
  });

  it('todo verbete tem autoria — sem ela a citação sai sem órgão', () => {
    const semAutoria = LEGISLATION_LIBRARY.filter((e) => !e.authority?.trim());
    expect(semAutoria.map((e) => e.name)).toEqual([]);
  });

  it('toda url preenchida aponta para http(s)', () => {
    const invalidas = LEGISLATION_LIBRARY.filter((e) => e.url && !/^https?:\/\//.test(e.url));
    expect(invalidas.map((e) => e.name)).toEqual([]);
  });

  it('norma revogada nomeia a substituta', () => {
    const orfas = LEGISLATION_LIBRARY.filter((e) => e.status === 'revogada' && !e.replacedBy);
    expect(orfas.map((e) => e.name)).toEqual([]);
  });

  it('só afirma vigência quando há data de verificação', () => {
    const semData = LEGISLATION_LIBRARY.filter((e) => e.status !== 'nao_verificado' && !e.verifiedAt);
    expect(semData.map((e) => e.name)).toEqual([]);
  });

  it('município sempre vem acompanhado da UF', () => {
    const soltos = LEGISLATION_LIBRARY.filter((e) => e.municipio && !e.uf);
    expect(soltos.map((e) => e.name)).toEqual([]);
  });
});

describe('chave canônica', () => {
  it('funde grafias diferentes do mesmo ato', () => {
    const k = canonicalLegislationKey('RDC Anvisa nº 502/2021');
    expect(canonicalLegislationKey('RDC 502/2021')).toBe(k);
    expect(canonicalLegislationKey('RDC nº 502/2021')).toBe(k);
    expect(canonicalLegislationKey('Resolução da Diretoria Colegiada - RDC nº 502, de 2021')).not.toBe('');
  });

  it('separa atos de mesmo número e anos diferentes', () => {
    expect(canonicalLegislationKey('Portaria CVS 5/2013')).not.toBe(
      canonicalLegislationKey('Portaria CVS nº 5/2025'),
    );
  });

  it('ignora zero à esquerda no número do ato', () => {
    expect(canonicalLegislationKey('Portaria IVISA-RIO nº 002/2020')).toBe(
      canonicalLegislationKey('Portaria IVISA-RIO 2/2020'),
    );
  });

  it('lê ano de dois dígitos colado ao número', () => {
    expect(canonicalLegislationKey('Portaria SVS/MS nº 344/98')).toBe(
      canonicalLegislationKey('Portaria SVS/MS nº 344/1998'),
    );
  });

  it('não confunde "CBO 5162-10" nem "NR-32" com ano', () => {
    expect(canonicalLegislationKey('CBO 5162-10')).toBe('CBO|5162|');
    expect(canonicalLegislationKey('NR-32')).toBe('NR|32|');
  });

  it('não confunde número de artigo com número do ato', () => {
    expect(canonicalLegislationKey('Art. 276, Lei Municipal 1.812/2014')).toBe(
      canonicalLegislationKey('Lei Municipal nº 1.812/2014 - Senador Canedo'),
    );
  });
});

describe('extração de citação livre', () => {
  it('descarta artigo e inciso, guardando só o ato', () => {
    expect(extractBaseLegislation('Art. 29, Inciso II da RDC 502/2021; ABNT NBR 9050')).toEqual([
      'RDC 502/2021',
      'ABNT NBR 9050',
    ]);
  });

  it('ignora trecho que é só sub-referência', () => {
    expect(extractBaseLegislation('Art. 12; § 3º')).toEqual([]);
  });

  it('resolve a citação de um item de roteiro para o verbete', () => {
    const entry = findLegislation('Art. 8º da RDC 502/2021');
    expect(entry?.name).toBe('RDC Anvisa nº 502/2021');
  });
});

describe('aplicabilidade territorial', () => {
  it('norma federal vale em qualquer lugar', () => {
    const federal = LEGISLATION_LIBRARY.find((e) => e.name === 'RDC Anvisa nº 222/2018')!;
    expect(matchesScope(federal, { uf: 'PR' })).toBe(true);
  });

  it('norma estadual não vaza para outra UF', () => {
    const pr = LEGISLATION_LIBRARY.find((e) => e.name === 'Lei Estadual PR nº 13.331/2001')!;
    expect(matchesScope(pr, { uf: 'PR' })).toBe(true);
    expect(matchesScope(pr, { uf: 'Paraná' })).toBe(true);
    expect(matchesScope(pr, { uf: 'SC' })).toBe(false);
  });

  it('norma municipal exige o município, não só a UF', () => {
    const maraba = LEGISLATION_LIBRARY.find((e) => e.name === 'Lei Municipal nº 17.333/2008 - Marabá')!;
    expect(matchesScope(maraba, { uf: 'PA', municipio: 'Marabá' })).toBe(true);
    expect(matchesScope(maraba, { uf: 'PA', municipio: 'maraba' })).toBe(true);
    expect(matchesScope(maraba, { uf: 'PA', municipio: 'Belém' })).toBe(false);
    expect(matchesScope(maraba, { uf: 'PA' })).toBe(false);
  });

  it('não sugere norma revogada', () => {
    const revogada = LEGISLATION_LIBRARY.find((e) => e.status === 'revogada')!;
    expect(isApplicable(revogada, { uf: revogada.uf, segment: 'saude' })).toBe(false);
  });

  it('sugere as estaduais do PR para uma clínica de estética em Curitiba', () => {
    const nomes = applicableLegislation({ uf: 'PR', municipio: 'Curitiba', segment: 'estetica' }).map(
      (e) => e.name,
    );
    expect(nomes).toContain('Lei Estadual PR nº 13.331/2001');
    expect(nomes).toContain('Lei Estadual PR nº 18.925/2016');
    expect(nomes).not.toContain('Lei Estadual SC nº 6.320/1983');
  });
});

describe('busca avançada', () => {
  it('acha por termo livre sem acento e fora de ordem', () => {
    const nomes = searchLegislation({ texto: 'residuos gerenciamento' }).map((e) => e.name);
    expect(nomes).toContain('RDC Anvisa nº 222/2018');
  });

  it('filtra só federais quando pedem BR', () => {
    const resultado = searchLegislation({ uf: 'BR' });
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado.every((e) => !e.uf)).toBe(true);
  });

  it('cruza UF com segmento — território traz as federais junto', () => {
    // Filtrar por UF é perguntar "o que vale aqui", não "o que é estadual daqui":
    // a federal de estética vale em SC e precisa aparecer. Para só as nacionais,
    // usa-se uf: 'BR'.
    const resultado = searchLegislation({ uf: 'SC', segment: 'estetica' });
    expect(resultado.map((e) => e.name)).toContain('Lei Estadual SC nº 18.630/2023');
    expect(resultado.every((e) => !e.uf || e.uf === 'SC')).toBe(true);
    expect(resultado.some((e) => !e.uf)).toBe(true);
    expect(resultado.map((e) => e.name)).not.toContain('Lei Estadual PR nº 18.925/2016');
  });

  it('deixa as revogadas de fora por padrão', () => {
    expect(searchLegislation({}).some((e) => e.status === 'revogada')).toBe(false);
    expect(searchLegislation({ incluirRevogadas: true }).some((e) => e.status === 'revogada')).toBe(true);
  });

  it('lista o que ainda falta verificar', () => {
    const pendentes = pendingVerification();
    expect(pendentes.length).toBeGreaterThan(0);
    expect(pendentes.every((e) => !e.verifiedAt)).toBe(true);
  });
});

describe('citação ABNT', () => {
  it('usa a referência completa quando o verbete tem uma', () => {
    const citacao = formatAbnt('RDC 222/2018');
    expect(citacao).toContain('de 28 de março de 2018');
    expect(citacao).toContain('Disponível em:');
  });

  it('monta a forma curta quando não há referência pronta', () => {
    const semAbnt = LEGISLATION_LIBRARY.find((e) => !e.abnt && e.authority && e.summary)!;
    const citacao = formatAbnt(semAbnt.name);
    expect(citacao.startsWith(semAbnt.authority)).toBe(true);
    expect(citacao).toContain(semAbnt.name);
  });

  it('marca a revogação em vez de citar a norma como viva', () => {
    const revogada = LEGISLATION_LIBRARY.find((e) => e.status === 'revogada')!;
    expect(formatAbnt(revogada.name)).toContain('[REVOGADA');
  });

  it('devolve a menção crua quando o ato não está na base', () => {
    expect(formatAbnt('Critério técnico de higiene das mãos')).toBe(
      'Critério técnico de higiene das mãos',
    );
  });
});
