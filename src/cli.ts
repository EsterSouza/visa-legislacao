// Consulta da base pela linha de comando. Existe para que a curadoria (e a skill
// de legislação sanitária) consultem o que já está apurado antes de sair
// pesquisando norma na internet — e para que ninguém cite ato de memória.
//
//   npx tsx src/cli.ts residuos
//   npx tsx src/cli.ts --uf PR --segmento estetica
//   npx tsx src/cli.ts --pendentes
//   npx tsx src/cli.ts --abnt "RDC 222/2018"

import { findLegislation, formatAbnt, pendingVerification, searchLegislation } from './query';
import type { LegislationEntry, LegislationSegment, LegislationStatus } from './types';

const SEGMENTOS: LegislationSegment[] = ['estetica', 'ilpi', 'alimentos', 'saude'];

const ROTULO_STATUS: Record<LegislationStatus, string> = {
  vigente: 'vigente',
  vigente_com_alteracoes: 'vigente c/ alterações',
  revogada: 'REVOGADA',
  nao_verificado: 'vigência não verificada',
};

function abrangencia(entry: LegislationEntry): string {
  if (!entry.uf) return 'federal';
  return entry.municipio ? `${entry.uf}/${entry.municipio}` : entry.uf;
}

function imprimir(entry: LegislationEntry): void {
  const revogada = entry.status === 'revogada';
  console.log(`\n${entry.name}`);
  console.log(`  ${entry.authority}`);
  console.log(`  ${entry.summary}`);
  console.log(
    `  ${abrangencia(entry)} · ${ROTULO_STATUS[entry.status]}` +
      (entry.verifiedAt ? ` (verificado em ${entry.verifiedAt})` : '') +
      (entry.segments?.length ? ` · ${entry.segments.join(', ')}` : ''),
  );
  if (revogada && entry.replacedBy) console.log(`  → substituída por ${entry.replacedBy}`);
  if (entry.url) console.log(`  ${entry.url}`);
}

function valorDe(argv: string[], flag: string): string | undefined {
  const i = argv.indexOf(flag);
  return i >= 0 ? argv[i + 1] : undefined;
}

function main(argv: string[]): number {
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(
      [
        'Consulta a base unificada de legislação sanitária.',
        '',
        '  <termos>              busca livre em nome, ementa, autoria e referência ABNT',
        '  --uf <UF|BR>          alcance territorial; BR devolve só as federais',
        '  --municipio <nome>    filtra o alcance municipal',
        '  --segmento <s>        ' + SEGMENTOS.join(' | '),
        '  --revogadas           inclui as revogadas no resultado',
        '  --pendentes           lista o que entrou sem checagem de vigência',
        '  --abnt "<citação>"    imprime a referência ABNT NBR 6023 de um ato',
      ].join('\n'),
    );
    return 0;
  }

  const citacao = valorDe(argv, '--abnt');
  if (citacao) {
    const entry = findLegislation(citacao);
    if (!entry) {
      console.error(`Ato fora da base: "${citacao}". Pesquise a norma antes de citá-la.`);
      return 1;
    }
    console.log(formatAbnt(citacao, entry));
    return 0;
  }

  if (argv.includes('--pendentes')) {
    const pendentes = pendingVerification();
    console.log(`${pendentes.length} atos sem checagem de vigência:`);
    pendentes.forEach(imprimir);
    return 0;
  }

  const segmento = valorDe(argv, '--segmento');
  if (segmento && !SEGMENTOS.includes(segmento as LegislationSegment)) {
    console.error(`Segmento inválido: "${segmento}". Use um de: ${SEGMENTOS.join(', ')}.`);
    return 1;
  }

  const flags = new Set(['--uf', '--municipio', '--segmento', '--revogadas', '--pendentes', '--abnt']);
  const texto = argv
    .filter((arg, i) => !flags.has(arg) && !flags.has(argv[i - 1]))
    .join(' ')
    .trim();

  const resultado = searchLegislation({
    texto,
    uf: valorDe(argv, '--uf'),
    municipio: valorDe(argv, '--municipio'),
    segment: segmento as LegislationSegment | undefined,
    incluirRevogadas: argv.includes('--revogadas'),
  });

  if (resultado.length === 0) {
    console.log('Nada na base para esses filtros. A norma pode existir e ainda não ter verbete.');
    return 0;
  }

  console.log(`${resultado.length} ato(s):`);
  resultado.forEach(imprimir);
  return 0;
}

process.exitCode = main(process.argv.slice(2));
