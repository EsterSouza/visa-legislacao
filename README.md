# @visa/legislacao

Base unificada de legislação sanitária brasileira — fonte única do InspecVISA, do
PastaVISA e, adiante, do ERP da TreinaVISA.

São **118 atos** com autoria ABNT curada, alcance territorial (UF e município),
segmento de estabelecimento e situação de vigência. Nasceu da união das duas bases
que existiam em paralelo: 87 atos do InspecVISA (com curadoria de vigência) e 47 do
PastaVISA (com referência ABNT NBR 6023 completa), 16 deles em comum.

## Uso

```ts
import { searchLegislation, applicableLegislation, formatAbnt } from '@visa/legislacao';

applicableLegislation({ uf: 'PR', municipio: 'Curitiba', segment: 'estetica' });
searchLegislation({ texto: 'residuos', uf: 'BR' });
formatAbnt('RDC 222/2018');
```

Pela linha de comando: `npm run consultar -- --help`.

## Distribuição

O `dist/` é versionado de propósito: os consumidores instalam pelo tarball https do
GitHub, sem git e sem chave SSH no pipeline (npm normaliza dependência `github:` para
`git+ssh` no lockfile, o que quebra build na Vercel e no Docker).

`npm install` roda `prepare`, que recompila o `dist`. **Commite o `dist` junto com a
mudança do `src`** e publique uma tag nova; é ela que os apps apontam.

## Editar a base

Os verbetes ficam em [`src/library.ts`](src/library.ts), que é a única cópia — nos
apps o arquivo antigo virou reexportação. As regras de cada campo estão no cabeçalho
do arquivo. Depois de editar:

```bash
npm test
```

O teste barra chave canônica duplicada, verbete sem autoria, revogada sem substituta e
ato afirmando vigência sem data de verificação.

## Vigência

`status` vale `vigente`, `vigente_com_alteracoes`, `revogada` ou `nao_verificado`.
Os 31 atos herdados do PastaVISA entraram como `nao_verificado`: são normas reais e
continuam sendo sugeridas, mas ninguém apurou se seguem valendo. `npm run consultar --
--pendentes` lista a fila.
