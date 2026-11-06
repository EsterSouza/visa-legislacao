// ============================================================
// Risco sanitário, multa e taxa por CNAE, em cada lugar
// ============================================================
// Pesquisa de 06/11/2026: cada valor saiu de uma norma aberta e lida, citada em
// `norma` e `onde`. As normas de cada lugar, com o link e como a vigência foi
// conferida, estão em `LUGARES_RISCO_CNAE[].normas`.
//
// - `provisorio`: veio de norma revogada, usada até sair a vigente (o Rio usa o
//   Decreto 45.585/2018 porque o art. 6º do 57.501 só vale com o regulamento do IVISA).
// - `segueFederal`: o lugar não tem classificação própria para o código e a ficha
//   repete a IN Anvisa 66/2020.
// - `opcoes`: o risco depende de uma condição; `invasivo` diz se a opção é a de quem
//   faz (true) ou não faz (false) procedimento invasivo, e null quando não depende disso.
//
// Os códigos são os 39 do catálogo de CNAE do InspecVISA (saúde, estética, PICS,
// ILPI, alimentos e apoio). Gerado por script a partir da pesquisa: para corrigir um
// valor, corrija aqui e anote a fonte em `onde`.
/**
 * As opções que valem para quem faz (true) ou não faz (false) procedimento invasivo.
 * Sem resposta (undefined), devolve todas.
 */
export function opcoesDoRisco(r, invasivo) {
    if (invasivo === undefined)
        return r.opcoes;
    return r.opcoes.filter((o) => o.invasivo === null || o.invasivo === invasivo);
}
export const LUGARES_RISCO_CNAE = [
    {
        "id": "rio-capital",
        "titulo": "Rio de Janeiro (capital)",
        "uf": "RJ",
        "municipio": "Rio de Janeiro",
        "normas": [
            {
                "nome": "Decreto Rio nº 45.585/2018 (Anexo I, 'Graduação dos Níveis de Complexidade e Risco'), com a tabela atualizada pela Portaria S/IVISA-RIO nº 221-N/2021",
                "url": "https://vigilanciasanitaria.prefeitura.rio/wp-content/uploads/sites/84/2023/04/DecretoRio455852018CONSOLIDADO06122019.pdf",
                "vigencia": "revogado pelo Decreto Rio 57.501/2026 (art. 72, I, a partir de 02/02/2026); usado como provisório. O art. 67 do 57.501 mantém 'as regras atuais para o licenciamento sanitário e agropecuário implantadas no SISVISA' até sair a portaria do art. 6º §1º, o que indica que esta tabela ainda é a que o SISVISA aplica.",
                "comoConferiu": "PDF consolidado (06/12/2019) baixado do site do IVISA-Rio; Anexo I nas páginas 45 a 55, extraído com PyMuPDF find_tables e conferido na imagem renderizada das páginas 45 e 46. A tabela não usa CNAE: cada CNAE da lista foi ligado ao item pela descrição da atividade."
            },
            {
                "nome": "Portaria S/IVISA-RIO nº 221-N, de 29/12/2021 (DOM 30/12/2021)",
                "url": "https://www.normasbrasil.com.br/norma/portaria-221-2021-rio-de-janeiro_425549.html",
                "vigencia": "atualizou o Anexo I do 45.585 (delegação do art. 65, IX). Caiu junto com o decreto, salvo pelo art. 67 do 57.501 (regras do SISVISA mantidas).",
                "comoConferiu": "HTML do Normas Brasil baixado com curl e lido linha a linha. Valores iguais aos do 45.585 para todos os itens usados, exceto: 1.1.93 passou a 'Serviço de Embelezamento e estética sem procedimento invasivo' (Pequena/Baixo) e 1.1.94 a 'Serviço de estética, com procedimento invasivo' (Pequena/Alto); criou 1.1.96 a 1.1.99 (hospital dia: Média/Alto)."
            },
            {
                "nome": "Decreto Rio nº 57.501, de 30/01/2026 (D.O.RIO 02/02/2026)",
                "url": "https://vigilanciasanitaria.prefeitura.rio/wp-content/uploads/sites/84/2026/04/Decreto-N%C2%B0-57501_2026.pdf",
                "vigencia": "vigente desde 02/02/2026, mas o art. 71 diz que o art. 6º (Anexo I por segmento) só entra em vigor na data do regulamento do IVISA-Rio do art. 6º §1º, que não foi achado.",
                "comoConferiu": "PDF baixado (é a impressão do leis.org, 46 páginas). Anexo I lido nas imagens renderizadas das páginas 41 a 44, porque o texto extraído embaralha a coluna de risco. Arts. 5º, 6º, 10, 14, 15, 67, 69, 71 e 72 lidos no texto."
            }
        ],
        "semClassificacao": "O Anexo I do 45.585/221-N lista atividades por descrição, sem CNAE, e não diz o que acontece com atividade não listada. Há o grupo 1.2 'Atividades Relacionadas' (ex.: 1.2.3 Prestação de serviços, Mínima/Baixo), mas não é possível dizer pela norma que 8211-3/00 cai ali. No 57.501, o art. 10 torna inexigível a licença para autônomo e profissional liberal autônomo (I, a), para quem usa o imóvel só como ponto de referência (I, b), para MEI (III) e, no inciso XI, para o que o regulamento do art. 6º §1º enquadrar como Baixo Risco \"A\".",
        "multa": {
            "norma": "Decreto Rio 57.501/2026",
            "normaCompleta": "Decreto Rio nº 57.501/2026, art. 34; valores de 2026 conferidos na Portaria S/IVISA-RIO nº 828/2025 (republicada no DOM de 05/01/2026)",
            "url": "https://vigilanciasanitaria.prefeitura.rio/wp-content/uploads/sites/84/2026/04/Decreto-N%C2%B0-57501_2026.pdf",
            "onde": "Art. 34, I (ambulante, feirante e afins) e II, alíneas a a f (por complexidade e risco)",
            "unidade": "R$",
            "valorUnidade": null,
            "anoUnidade": 2026,
            "faixas": {},
            "dependeDe": "Já está no app. Confirmado: o art. 34 do 57.501 traz os mesmos valores da Portaria 828 republicada; a única diferença da 1ª publicação da 828 é a alínea e, grave: R$ 5.271,24 virou R$ 5.270,67."
        },
        "taxa": {
            "norma": "Decreto Rio 55.583/2024",
            "normaCompleta": "Taxa de Licenciamento Sanitário (TLS): Lei nº 691/1984, art. 96-A (redação da Lei nº 7.000/2021), regulamentada pelo Decreto Rio nº 55.583/2024, art. 37; valor-base de 2026 na Portaria S/IVISA-RIO nº 828/2025, item 2.1 do Anexo",
            "url": "https://www.normasbrasil.com.br/norma/decreto-55583-2024-rio-de-janeiro_471478.html",
            "onde": "Decreto 55.583/2024, art. 37, tabelas I a III e §§ 1º a 10; Portaria 828/2025, Anexo, item 2",
            "comoCalcula": "VT = C x R x A x P x valor-base / 12. C é o fator de complexidade, R o fator de risco, A o fator de área e P os meses de validade (12 na licença anual). Na mesma pessoa e no mesmo local, valem o C e o R de maior grau (§ 2º). Multiplicadores: 2,0 para serviço de saúde com internação (§ 6º); 0,5 para feirante, ambulante, atividade não localizada, atividade em residência, unidade móvel e veículo (§ 7º); 0,9 para área de até 50 m² (§ 10); 5,0, 3,5 ou 2,0 para evento e atividade transitória de até 1, 3 ou 6 meses (§ 8º). Isentos: MEI e pequeno agricultor, agricultura familiar, orgânicos e populações tradicionais (art. 40).",
            "ano": 2026,
            "tabela": [
                {
                    "criterio": "valor-base 2026",
                    "valor": "R$ 488,62"
                },
                {
                    "criterio": "C: Mínima",
                    "valor": "1,00"
                },
                {
                    "criterio": "C: Pequena",
                    "valor": "1,50"
                },
                {
                    "criterio": "C: Média",
                    "valor": "2,00"
                },
                {
                    "criterio": "C: Grande",
                    "valor": "2,50"
                },
                {
                    "criterio": "C: Máxima",
                    "valor": "3,00"
                },
                {
                    "criterio": "R: Baixo",
                    "valor": "1,00"
                },
                {
                    "criterio": "R: Alto",
                    "valor": "1,25"
                },
                {
                    "criterio": "A: até 50 m²",
                    "valor": "0,50"
                },
                {
                    "criterio": "A: acima de 50 até 100 m²",
                    "valor": "0,75"
                },
                {
                    "criterio": "A: acima de 100 até 200 m²",
                    "valor": "1,00"
                },
                {
                    "criterio": "A: acima de 200 até 400 m²",
                    "valor": "2,00"
                },
                {
                    "criterio": "A: acima de 400 até 800 m²",
                    "valor": "3,00"
                },
                {
                    "criterio": "A: acima de 800 até 1.600 m²",
                    "valor": "4,00"
                },
                {
                    "criterio": "A: acima de 1.600 m²",
                    "valor": "5,00"
                },
                {
                    "criterio": "Registro de produto, por unidade (2026)",
                    "valor": "R$ 153,94"
                },
                {
                    "criterio": "Aprovação de produto dispensado de registro, por unidade (2026)",
                    "valor": "R$ 80,30"
                }
            ],
            "porCnae": null
        },
        "notas": [
            "1) Regulamento do IVISA-Rio que enquadra CNAE no 57.501: não encontrado (buscas no site do IVISA, legisweb, normasbrasil, doweb e na web em geral). Atos de 2026 achados e descartados: Portaria 828/2025 (taxa) e Portaria 839, de 20/07/2026 (periodicidade de análise de produto de origem animal no SIM-RIO). 2) Art. 67 do 57.501: enquanto não sair a portaria do art. 6º §1º, 'permanecerão em vigor as regras atuais para o licenciamento sanitário e agropecuário implantadas no SISVISA'. Art. 71: o art. 6º só entra em vigor com esse regulamento. Por isso a tabela 45.585/221-N é provavelmente a que o SISVISA ainda usa, mesmo revogada. 3) Art. 14 do 57.501: licença automática, exceto hospital com internação privado, farmácia com manipulação, terapia renal substitutiva, ILPI, agroindústria/armazém de produto de origem animal e comércio que industrializa produto de origem animal com autosserviço. Para esses, art. 15: inspeção prévia, com protocolo 'AGUARDANDO INSPEÇÃO' que permite funcionar provisoriamente (exceto agroindústria de origem animal). Isso pesa para 8711-5/01 e 8711-5/02. 4) Os 'Tipos' do Anexo I do 57.501 (Tipo I, II...) não são definidos no decreto; a definição viria no regulamento. Não há como converter CNAE para tipo sem ele. 5) Anexo I do 57.501, segmento → detalhamento → complexidade → risco (lido nas imagens): [Alimentos] Ponto de referência e simples escritório (Restrição) → Mínima → Baixo B | [Alimentos] Atividades não localizadas e veículo → Pequena → Baixo B | [Alimentos] Comerciante ambulante em ponto fixo (praias e logradouros), alimentos para consumo imediato → Pequena → Baixo B | [Alimentos] Feirante (feiras livres, móveis e orgânicas) com produtos de origem animal e alimentos para consumo no local → Pequena → Baixo B | [Alimentos] Demais comerciantes ambulantes e feirantes → Mínima → Baixo A | [Alimentos] Serviço e comércio - Tipo I → Mínima → Baixo B | [Alimentos] Serviço e comércio - Tipo II → Pequena → Baixo B | [Alimentos] Serviço e comércio - Tipo III → Média → Baixo B | [Alimentos] Educação infantil (creche) → Pequena → Alto | [Alimentos] Cozinha industrial → Média → Alto | [Alimentos] Hipermercado e supermercado → Média → Alto | [Alimentos] Indústria e comércio atacadista com fracionamento → Grande → Alto | [Serviços e produtos de interesse à saúde] Ponto de referência e simples escritório (Restrição) → Mínima → Baixo B | [Saúde] Profissional autônomo - Tipo I → Pequena → Baixo B | [Saúde] Profissional autônomo - Tipo II → Pequena → Alto | [Saúde] Serviço de interesse sanitário - Tipo I → Pequena → Baixo B | [Saúde] Serviço de interesse sanitário - Tipo II → Média → Baixo B | [Saúde] Serviço de interesse sanitário - Tipo III → Pequena → Alto | [Saúde] Serviço de interesse sanitário - Tipo IV → Média → Alto | [Saúde] Ambulância suporte avançado de vida → Pequena → Alto | [Saúde] Ambulância suporte básico de vida → Pequena → Baixo B | [Saúde] Veículo - Tipo I → Média → Baixo B | [Saúde] Veículo - Tipo II → Média → Alto | [Saúde] Serviço assistencial de saúde - Tipo I → Pequena → Baixo B | [Saúde] Serviço assistencial de saúde - Tipo II → Pequena → Alto | [Saúde] Serviço assistencial de saúde - Tipo III → Média → Alto | [Saúde] Serviço assistencial de saúde - Tipo IV → Grande → Alto | [Saúde] Serviço assistencial de saúde - Tipo V → Máxima → Alto | [Saúde] Comércio de Produtos Tipo I → Pequena → Baixo B | [Saúde] Comércio de Produtos Tipo II → Pequena → Alto | [Saúde] Comércio de Produtos Tipo III → Média → Alto | [Saúde] Indústria → Máxima → Alto | [Não reconhecidas como alimentos ou saúde] Atividades autônomas consideradas reguladas → Mínima → Baixo B | [Não reconhecidas como alimentos ou saúde] Estação rodoviária, aquaviária, ferroviária e metroviária → Mínima → Baixo B | [Não reconhecidas como alimentos ou saúde] Veículo coleta de resíduos especiais; veículo pipa d'água → Pequena → Alto | [Não reconhecidas como alimentos ou saúde] Serviço - Tipo I → Mínima → Baixo B | [Não reconhecidas como alimentos ou saúde] Serviço - Tipo II → Pequena → Baixo B | [Não reconhecidas como alimentos ou saúde] Serviço - Tipo III → Média → Baixo B | [Não reconhecidas como alimentos ou saúde] Serviço - Tipo IV → Grande → Baixo B | [Relacionadas à Vigilância Sanitária] Atividades autônomas não consideradas reguladas → Mínima → Baixo A | [Relacionadas à Vigilância Sanitária] Ponto de referência pessoa jurídica (Restrição) → Mínima → Baixo A | [Relacionadas à Vigilância Sanitária] Indústria → Média → Alto | [Relacionadas à Vigilância Sanitária] Comércio e serviço → Mínima → Baixo B | [Relacionadas à Vigilância Sanitária] Outras atividades, exceto indústria, comércio e serviço → Mínima → Baixo A | [Defesa Agropecuária / POA] Agroindústria de pequeno porte (Indústria I - LC 270/24) → Pequena → Alto | [Defesa Agropecuária / POA] Agroindústria - Tipo I → Média → Alto | [Defesa Agropecuária / POA] Agroindústria - Tipo II → Máxima → Alto | [Defesa Agropecuária / POA] Autosserviço - Tipo I (comércio em geral) → Média → Alto | [Defesa Agropecuária / POA] Autosserviço - Tipo II (supermercado e hipermercado) → Grande → Alto | [Atividades Agropecuárias] Agricultura, pecuária, aquicultura, pesca, silvicultura e extrativismo, exceto agroindustrialização → Mínima → Baixo A. Observação: na imagem da p. 43, 'Atividades autônomas consideradas reguladas' aparece como primeira linha do bloco 'não reconhecidas como alimentos ou saúde', logo depois de 'Indústria' (Máxima/Alto) do bloco de saúde. 6) Anexo II do 57.501 (transitórias): evento até 1.000/dia Média/Baixo B; >1.000 a 40.000 Média/Alto; >40.000 a 100.000 Grande/Alto; >100.000 Máxima/Alto; expositor de serviços de saúde Pequena/Baixo B; expositor de alimentos Média/Baixo B; catering e cozinha industrial Grande/Alto; atendimento médico de urgência Médio/Alto; ambulância avançada Pequena/Alto; ambulância básica Pequena/Baixo B; prestador diversos Médio/Baixo B; ambulante Pequena/Baixo B; food truck fora de EIS Pequena/Baixo B; circos e feiras Média/Baixo B; canteiro de obras Grande/Baixo B; alimentação coletiva/saúde ocupacional Grande/Baixo B; outros Média/Baixo B (lido nas imagens das pp. 45 e 46). 7) Itens com risco null dependem de condição (procedimento invasivo, clínica x consultório); os dois resultados estão em 'condicao'.",
            "A taxa não varia por CNAE. Varia pela complexidade e pelo risco da atividade, que hoje saem da tabela 45.585/221-N (ver rio-capital.json), e pela área e pelo prazo.",
            "Exemplo com a fórmula: clínica odontológica (Pequena, Alto) com 80 m², licença de 12 meses: 1,50 x 1,25 x 0,75 x 12 x 488,62 / 12 = R$ 687,12. Conta minha, para conferir a fórmula; não vem da norma.",
            "O § 10 (fator 0,9 até 50 m²) se soma ao fator A de 0,50 da mesma faixa. O decreto não diz se um exclui o outro; a leitura literal multiplica os dois.",
            "A Portaria 828 também traz preço público de análise de projeto arquitetônico por complexidade, risco e área (item 5.3), por exemplo Pequena/Alto até 200 m²: R$ 543,86. Não é a TLS.",
            "O 57.501, art. 4º § 2º, isenta da TLS os segmentos do art. 98-A, V, da Lei 691. Esse inciso não foi aberto.",
            "O art. 34, § 1º, do 57.501 limita a multa do art. 30, I, a três vezes a TLS devida no exercício."
        ]
    },
    {
        "id": "rj-estado",
        "titulo": "Estado do Rio de Janeiro",
        "uf": "RJ",
        "municipio": null,
        "normas": [
            {
                "nome": "Resolução SES-RJ nº 2.191, de 02/12/2020",
                "url": "https://www.legisweb.com.br/legislacao/?id=405476",
                "vigencia": "vigente, com os anexos alterados pela Res. SES 4.001/2026 (o LegisWeb anota: 'Ver Resolução SES Nº 4001 ... que altera os anexos'). Não revogada.",
                "comoConferiu": "Três cópias: DOERJ original no site da SES (https://www.saude.rj.gov.br/comum/code/MostrarArquivo.php?C=MzY0NjE%2C), PDF da Prefeitura de Rio das Ostras (https://www.riodasostras.rj.gov.br/wp-content/uploads/2021/07/Resolucao-SES-RJ-2191-2020-atividades-CNAEs-risco.pdf) e HTML do LegisWeb. Tabelas dos Anexos I a IV extraídas do PDF de Rio das Ostras com PyMuPDF find_tables; anexo de cada CNAE conferido também no LegisWeb. Os anexos são do texto de 2020: não refletem a 4.001."
            },
            {
                "nome": "Resolução SES-RJ nº 4.001, de 05/05/2026 (DOERJ 07/05/2026)",
                "url": "https://www.legisweb.com.br/legislacao/?id=495448",
                "vigencia": "vigente desde 07/05/2026. Art. 1º: 'Alterar os Anexos da Resolução SES nº 2191/2020'. Não revoga a 2.191.",
                "comoConferiu": "Corpo da resolução lido no LegisWeb (os anexos não aparecem lá). A lista dos 39 CNAEs veio da notícia da SES-RJ reproduzida pelo Conass (https://www.conass.org.br/saude-rj-simplifica-abertura-de-empresas-reclassificando-algumas-atividades-como-sendo-de-baixo-risco-sanitario/), que diz que as atividades 'antes classificadas como de médio ou alto risco, passam a integrar a categoria de baixo risco' e ficam dispensadas de licença prévia. Fonte secundária: conferir no DOERJ de 07/05/2026."
            },
            {
                "nome": "Resolução COGIRE/JUCERJA nº 9, de 21/05/2026",
                "url": "https://www.legisweb.com.br/legislacao/?id=496382",
                "vigencia": "vigente. Remete a classificação sanitária à 2.191 'com as alterações promovidas pela Resolução SES nº 4.001' e substitui os Anexos I, II e III da COGIRE 08/2025 (lista integrada do REGIN, que junta todos os órgãos).",
                "comoConferiu": "HTML do LegisWeb lido; o Anexo Único lá mostra só 12 CNAEs que passam ao Anexo I (Risco 1) da COGIRE 08, entre eles 4724-5/00. A lista pode estar truncada no LegisWeb."
            }
        ],
        "semClassificacao": "Art. 6º da 2.191: 'As atividades econômicas não relacionadas nesta Resolução não são de competência direta da vigilância sanitária, estando automaticamente dispensadas de licenciamento sanitário.' Art. 5º §4º: se não der para verificar as condições do Anexo III, vale o maior risco previsto até a confirmação. Art. 3º §4º: MEI fica dispensado de alvará e licença sanitária.",
        "multa": {
            "norma": "Lei 6.437/1977, como referência",
            "normaCompleta": "Lei federal nº 6.437/1977, art. 2º, § 1º (referência; não foi confirmado que o Estado a aplica, ver notas)",
            "url": "https://www.planalto.gov.br/ccivil_03/leis/l6437compilado.htm",
            "onde": "Art. 2º, § 1º, I a III (redação da MP 2.190-34/2001); art. 4º classifica a gravidade pelo número de agravantes",
            "unidade": "R$",
            "valorUnidade": null,
            "anoUnidade": null,
            "faixas": {
                "leve": {
                    "min": 2000.0,
                    "max": 75000.0
                },
                "grave": {
                    "min": 75000.0,
                    "max": 200000.0
                },
                "gravissima": {
                    "min": 200000.0,
                    "max": 1500000.0
                }
            },
            "dependeDe": "Art. 4º: leve quando há atenuante, grave com uma agravante, gravíssima com duas ou mais. Art. 2º § 2º: em dobro na reincidência. § 3º: considera a capacidade econômica do infrator. Valores fixos em reais na lei, sem correção."
        },
        "taxa": {
            "norma": "Portaria SUPAR 66/2025",
            "normaCompleta": "Taxas de Serviços Estaduais (Decreto-lei estadual nº 5/1975, art. 107), Anexo IV, Taxas de Saúde, valores de 2026 na Portaria SUPAR nº 66, de 26/12/2025 (DOE 30/12/2025)",
            "url": "https://www.normasbrasil.com.br/norma/portaria-66-2025-rj_488738.html",
            "onde": "Anexo IV, item 1 (licença inicial, revalidação anual e mudança de endereço) e item 13 (análise de planta)",
            "comoCalcula": "Valor fixo em reais por tipo de estabelecimento, alguns por porte da empresa (critério de porte da Coordenação de Vigilância Sanitária da SES). Cobrado na licença inicial, na revalidação anual e na mudança de endereço. Simples Nacional não tem desconto aqui: o desconto de 70% vale só para as taxas de administração fazendária.",
            "ano": 2026,
            "tabela": [
                {
                    "criterio": "1.10 serviços médicos, clínicas e ambulatórios sem internação",
                    "valor": "R$ 932,31"
                },
                {
                    "criterio": "1.12 hospitais e clínicas com internação: grande / médio / pequeno porte",
                    "valor": "R$ 13.984,76 / R$ 9.323,17 / R$ 4.661,59"
                },
                {
                    "criterio": "1.13 serviços ou clínicas odontológicas",
                    "valor": "R$ 932,31"
                },
                {
                    "criterio": "1.14 prótese dentária",
                    "valor": "R$ 699,22"
                },
                {
                    "criterio": "1.9.1 laboratórios de análises clínicas, pesquisa e anatomia patológica",
                    "valor": "R$ 1.864,61"
                },
                {
                    "criterio": "1.9.2 postos de coleta",
                    "valor": "R$ 466,18"
                },
                {
                    "criterio": "1.16.1 raio x, radioterapia, radioisótopo e congêneres",
                    "valor": "R$ 3.263,10"
                },
                {
                    "criterio": "1.16.2 radiodiagnóstico odontológico",
                    "valor": "R$ 1.631,57"
                },
                {
                    "criterio": "1.17 fisioterapia e/ou praxioterapia",
                    "valor": "R$ 932,31"
                },
                {
                    "criterio": "1.19 ginástica, esteticismo, de beleza e congêneres",
                    "valor": "R$ 1.631,57"
                },
                {
                    "criterio": "1.20 consultório, gabinete, psicólogo, massagista, pedicure e fonoaudiólogo",
                    "valor": "R$ 233,09"
                },
                {
                    "criterio": "1.21 hidroterápico e saunas",
                    "valor": "R$ 1.631,57"
                },
                {
                    "criterio": "1.1 farmácias, drogarias, dispensários, ervanarias",
                    "valor": "R$ 2.330,79"
                },
                {
                    "criterio": "10 inspeção em estabelecimento de alimentos: grande / médio / pequeno porte",
                    "valor": "R$ 9.323,17 / R$ 4.661,59 / R$ 2.330,79"
                },
                {
                    "criterio": "9 cadastro de alimento",
                    "valor": "R$ 2.330,79"
                },
                {
                    "criterio": "2 assunção ou alteração de responsabilidade técnica / razão social",
                    "valor": "R$ 233,09"
                },
                {
                    "criterio": "11 segunda via de licença ou certidão",
                    "valor": "R$ 186,46"
                },
                {
                    "criterio": "13.10 análise de planta: serviços médicos sem internação",
                    "valor": "R$ 466,18"
                },
                {
                    "criterio": "13.19 análise de planta: ginástica, esteticismo, beleza",
                    "valor": "R$ 466,18"
                },
                {
                    "criterio": "13.20 análise de planta: consultório, psicólogo, massagista, pedicure, fonoaudiólogo",
                    "valor": "isento"
                }
            ],
            "porCnae": null
        },
        "notas": [
            "1) A 4.001 não revoga a 2.191: o art. 1º só altera os anexos. A COGIRE/JUCERJA 9/2026 confirma ao citar 'Resolução SES nº 2.191/2020, com as alterações promovidas pela Resolução SES nº 4.001'. 2) O texto dos anexos da 4.001 não foi achado (nem no LegisWeb, nem no site da SES ou da JUCERJA). Os 13 CNAEs da lista marcados com norma r4001 vêm da notícia oficial da SES-RJ e falta conferir no DOERJ se ficaram em baixo risco sem condição ou com as condições do Anexo III. 3) Da lista, os que a notícia inclui nos 39: 1091-1/02, 4712-1/00, 4721-1/02, 4722-9/01, 5611-2/01, 5611-2/03, 5620-1/02, 8650-0/02, 8650-0/03, 8650-0/04, 8650-0/05, 8650-0/06, 9602-5/01. 4) 'Complexidade' existe só como definição no art. 2º, IV da 2.191 ('Alta ou Baixa'); os anexos não dão complexidade por CNAE. 5) Na lista integrada da JUCERJA (COGIRE 08/2025, que junta bombeiros, ambiente e vigilância sanitária), 8230-0/02 aparece em Risco 3 e 8211-3/00 em Risco 1. Isso não é classificação sanitária. 6) O Anexo IV de 4724-5/00 parece ter a pergunta invertida no original (vender só vegetais dá médio risco). O texto foi registrado como está.",
            "Não achei um código sanitário estadual com multa em faixas. O Decreto-lei estadual nº 214/1975 (Código de Saúde) aparece citado como fonte das penalidades no Decreto estadual 1.754/1978, mas o texto não foi aberto.",
            "Lei estadual nº 7.216/2016 (texto da ALERJ, em vigor) trata das sanções por condutas lesivas à saúde pública, com foco em pragas, vetores e epidemias. Art. 6º: multa de R$ 50,00 a R$ 50.000,00 quando não há cominação específica. O art. 5º escreve o teto como 'R$ 50.000,000,00 (cinquenta milhões de reais)', em conflito com o art. 6º. Não há faixas leve, grave ou gravíssima: o art. 30 deixa a tipificação por porte para um decreto, que não foi achado.",
            "Por isso a multa deste arquivo usa a Lei 6.437/1977 como referência. Falta confirmar qual lei a SUVISA aplica nos autos estaduais.",
            "UFIR-RJ 2026: R$ 4,9604 (Resolução SEFAZ nº 849/2025, citada na Portaria SUPAR 66/2025). Não há multa sanitária estadual em UFIR-RJ nas normas abertas.",
            "A taxa estadual só é cobrada quando quem licencia é o Estado. No Rio capital quem licencia é o IVISA-Rio, com a TLS municipal.",
            "A taxa estadual não varia por CNAE nem por risco: varia pelo tipo de estabelecimento descrito no Anexo IV e, em alguns itens, pelo porte."
        ]
    },
    {
        "id": "sp-capital",
        "titulo": "São Paulo (capital)",
        "uf": "SP",
        "municipio": "São Paulo",
        "normas": [
            {
                "nome": "Portaria SMS nº 266/2025 (Prefeitura de São Paulo), alterada pela Portaria SMS nº 456/2025",
                "url": "https://prefeitura.sp.gov.br/documents/d/saude/portaria-266_25_completa_rev-11_-22062026-1-pdf",
                "vigencia": "Em vigor desde 11/08/2025 (art. 45, na redação da Portaria SMS nº 456/2025). Revogou a Portaria SMS.G nº 2.215/2016. Os anexos são publicados e revisados no site da Covisa (art. 45, parágrafo único). Usei a compilação rev. 11, de 22/06/2026.",
                "comoConferiu": "Baixei o PDF da compilação completa rev. 11 (147 p.) no site da Prefeitura e li o art. 4º, § 2º, o art. 5º e o Anexo I com pdftotext e PyMuPDF. A página da norma em legislacao.prefeitura.sp.gov.br lista só a Portaria SMS 456/2025 como alteração e não mostra revogação. O fluxograma 'Caminho do licenciamento' da Covisa, de 29/10/2026, confirma que só o Anexo I da 266/2025 é licenciável."
            },
            {
                "nome": "Portaria SMS/COVISA nº 368/2023",
                "url": "https://legislacao.prefeitura.sp.gov.br/leis/portaria-secretaria-municipal-da-saude-sms-covisa-368-de-20-de-junho-de-2023",
                "vigencia": "Revogada pela Portaria SMS/COVISA nº 404/2024, segundo a página de revogações do portal de legislação municipal.",
                "comoConferiu": "Li o Anexo I (PDF de 7 p.) e o texto da portaria. Ela não classifica risco. Trata só das atividades que exigem LTA (Laudo Técnico de Avaliação do projeto), DCFF e MDS. Não foi usada nos itens."
            }
        ],
        "semClassificacao": "Art. 4º, § 2º: os estabelecimentos cujas atividades não estão no Anexo I ficam dispensados de Licença de Funcionamento Sanitária, mas continuam sujeitos à atuação da Vigilância em Saúde. O art. 5º, I, chama isso de Nível de Risco I (Baixo). A introdução do Anexo I repete que o que não está no quadro não é passível de licença.",
        "multa": {
            "norma": "Lei municipal 13.725/2004",
            "normaCompleta": "Lei municipal nº 13.725, de 09/01/2004 (Código Sanitário do Município de São Paulo), arts. 118, III, e 121",
            "url": "https://legislacao.prefeitura.sp.gov.br/leis/lei-13725-de-09-de-janeiro-de-2004",
            "onde": "Art. 121, I a III (faixas por gravidade em reais); art. 121, § 1º (atualização anual pelo IPCA em 1º de janeiro); arts. 123 a 127 (graduação)",
            "unidade": "R$ (valores nominais de 2004, a atualizar pelo IPCA)",
            "valorUnidade": null,
            "anoUnidade": 2004,
            "faixas": {
                "leve": {
                    "min": 100.0,
                    "max": 30000.0
                },
                "grave": {
                    "min": 30001.0,
                    "max": 100000.0
                },
                "gravissima": {
                    "min": 100001.0,
                    "max": 500000.0
                }
            },
            "dependeDe": "A autoridade enquadra a infração como leve, grave ou gravíssima e gradua o valor dentro da faixa pela gravidade do fato, pelas atenuantes e agravantes, pelos antecedentes e pela capacidade econômica do infrator (arts. 123 a 126). A reincidência permite a penalidade máxima (art. 127). A lei manda atualizar os valores em 1º de janeiro de cada ano pela variação do IPCA do ano anterior (art. 121, § 1º)."
        },
        "taxa": {
            "norma": "Portaria SMS 266/2025",
            "normaCompleta": "Portaria SMS nº 266/2025, art. 40",
            "url": "https://prefeitura.sp.gov.br/documents/d/saude/portaria-266_25_completa_rev-11_-22062026-1-pdf",
            "onde": "Art. 40, p. 28 do PDF da compilação rev. 11",
            "comoCalcula": "Não há taxa. O art. 40 diz que a emissão da Licença de Funcionamento Sanitária no Sistema Municipal de Vigilância em Saúde não depende de pagamento de taxas ou emolumentos.",
            "ano": 2026,
            "tabela": [],
            "porCnae": null
        },
        "notas": [
            "Não há escala de complexidade. A coluna 'Inspeção prévia' (SIM, NÃO ou DCA) diz o procedimento e foi anotada em 'onde'. O risco é dado por linha ('Compreende') dentro do CNAE; quando as linhas divergem, a regra está em 'condicao'. Pessoa física (CPF) em atividade de risco II não recebe CLI automático e protocola direto na Vigilância (art. 7º, § 1º, e art. 9º, IV). A Portaria SMS/COVISA 368/2023 citada no pedido não é norma de risco e está revogada. Ponto a conferir: o 8711-5/01 (clínicas e residências geriátricas) não tem linha no Anexo I da rev. 11 nem da rev. 2 de 2025, embora outros CNAEs remetam a ele. A rev. 11 é a mais recente que encontrei, e a Covisa revisa os anexos sem publicar nova portaria.",
            "As faixas da multa estão em valores nominais de 2004. A lei manda corrigir todo ano pelo IPCA, mas não achei portaria, decreto ou comunicado com os valores de 2026, por isso valorUnidade ficou null. Calcular a correção por conta própria seria estimativa, não norma.",
            "A capital tem código sanitário próprio e não usa a UFESP para a multa sanitária municipal.",
            "Licença sem taxa não isenta de outras cobranças municipais que não sejam sanitárias (por exemplo, a taxa de fiscalização de estabelecimentos), que não foram pesquisadas."
        ]
    },
    {
        "id": "sp-estado",
        "titulo": "Estado de São Paulo",
        "uf": "SP",
        "municipio": null,
        "normas": [
            {
                "nome": "Portaria CVS nº 1, de 5 de janeiro de 2024 (licenciamento sanitário no Sevisa), Anexo I",
                "url": "https://www.santos.sp.gov.br/static/files_www/files/portal_files/SAUDE/cvs-1-de-9-de-fevereiro-de-2024-lista_de_atividade_licenca.pdf",
                "vigencia": "Vigente. A CVS 13/2025 (republicada em 13/05/2026) e a Portaria SMS 266/2025 da capital a citam 'e suas atualizações'. O original fica em https://cvs.saude.sp.gov.br/zip/E_PT-CVS-1_050124.pdf, e existe uma republicação de 03/05/2024 (E_PT-CVS-1_050124 - REP 030524.pdf).",
                "comoConferiu": "O site do CVS recusou o acesso (403) tanto pelo curl quanto pelo WebFetch. Li o Anexo I numa cópia de 53 p. publicada pela Prefeitura de Santos (rodapé 'Anexo I – Portaria CVS 1/2024', arquivo criado em 12/03/2024), com pdftotext e PyMuPDF. Não abri o art. 37 nem a republicação de 03/05/2024."
            },
            {
                "nome": "Portaria CVS nº 13, de 7 de novembro de 2025 (atividades de Nível de Risco I, isentas de licenciamento)",
                "url": "https://visa.jundiai.sp.gov.br/wp-content/uploads/2026/05/Portaria-CVS-13-2025-Atividades-isentas-de-licenciamento-sanitario.pdf",
                "vigencia": "Republicada no DOE de 13/05/2026 (Seção 1, p. 82) por atualização do Anexo Único. Revogou a Portaria CVS 5/2025.",
                "comoConferiu": "Baixei o PDF da republicação (cópia da Visa de Jundiaí, com código de autenticidade do DOE). Li os arts. 1º a 8º e o Anexo Único e conferi as linhas da tabela pela imagem da página."
            }
        ],
        "semClassificacao": "A introdução do Anexo I da CVS 1/2024 diz que as atividades da tabela do IBGE que não constam do Anexo I não são passíveis de Licença Sanitária. A CVS 13/2025 lista o Nível de Risco I (Baixo), isento, às vezes com uma condição ('desde que...'). Quem não cumpre a condição volta à linha do Anexo I da CVS 1/2024. O art. 3º diz que os isentos continuam sujeitos a monitoramento e intervenção sanitária, e o art. 6º permite que o município complemente a lista.",
        "multa": {
            "norma": "Lei estadual 10.083/1998",
            "normaCompleta": "Lei estadual nº 10.083, de 23/09/1998 (Código Sanitário do Estado de São Paulo), art. 112, III",
            "url": "https://www.al.sp.gov.br/repositorio/legislacao/lei/1998/lei-10083-23.09.1998.html",
            "onde": "Art. 112, III (multa de 10 a 10.000 vezes o valor nominal da UFESP vigente); arts. 116 a 120 (graduação: atenuantes, agravantes, antecedentes, capacidade econômica; reincidência leva à penalidade máxima)",
            "unidade": "UFESP",
            "valorUnidade": 38.42,
            "anoUnidade": 2026,
            "faixas": {
                "geral": {
                    "min": 10,
                    "max": 10000
                }
            },
            "dependeDe": "A lei não divide a multa por leve, grave e gravíssima. Fixa uma faixa única de 10 a 10.000 UFESP. A autoridade gradua o valor pela gravidade do fato, pelas atenuantes e agravantes, pelos antecedentes e pela capacidade econômica do infrator (arts. 116 a 120). A reincidência permite a penalidade máxima (art. 120)."
        },
        "taxa": {
            "norma": "Lei estadual 7.645/1991",
            "normaCompleta": "Taxa de Fiscalização e Serviços Diversos (TFSD), Lei estadual nº 7.645/1991 e alterações, Capítulo V (Atos de Vigilância Sanitária); valores em reais de 2026 no Comunicado SRE nº 15, de 22/12/2025 (DOE de 23/12/2025)",
            "url": "https://legislacao.fazenda.sp.gov.br/SiteAssets/Paginas/Comunicado-SRE-15-de-2025/Comunicado%20SRE_15_2025_ANEXO.pdf",
            "onde": "Anexo I do Comunicado SRE 15/2025, Capítulo V, item 1 ('Inspeção sanitária para concessão da licença de funcionamento/cadastro quando do início das atividades, renovação e alterações'), p. 3 a 11 do PDF",
            "comoCalcula": "Valor fixo por atividade, em reais, convertido da UFESP de 2026. Por exemplo, R$ 4.226,20 equivale a 110 UFESP e R$ 633,93 a 16,5 UFESP. O valor é cobrado na concessão, na renovação e na alteração da licença. Não varia pelo nível de risco: varia pela atividade e, em alguns itens, pelo porte (leitos, área do laudo técnico) ou pelo tipo (clínica ou consultório).",
            "ano": 2026,
            "tabela": [
                {
                    "criterio": "Indústria de alimentos (maioria dos itens 1.1.1, inclusive sorvetes por indústria, panificação industrial e outros produtos alimentícios)",
                    "valor": "R$ 4.226,20"
                },
                {
                    "criterio": "Sorvetes por sorveteria (1.1.1.8.2)",
                    "valor": "R$ 1.690,48"
                },
                {
                    "criterio": "Padaria e confeitaria com predominância de produção própria (1.1.1.25)",
                    "valor": "R$ 1.267,86"
                },
                {
                    "criterio": "Hipermercado e supermercado (1.1.17.1 e 1.1.17.2)",
                    "valor": "R$ 2.958,34"
                },
                {
                    "criterio": "Minimercado, padaria de revenda, laticínios, açougue, peixaria, lanchonete, cantina (1.1.17)",
                    "valor": "R$ 1.267,86"
                },
                {
                    "criterio": "Restaurante, bar, bufê, alimentos para consumo domiciliar (1.1.17)",
                    "valor": "R$ 1.690,48"
                },
                {
                    "criterio": "Fornecimento de alimentos para empresas (1.1.17.17)",
                    "valor": "R$ 4.226,20"
                },
                {
                    "criterio": "Hortifrúti, bebidas, doces (1.1.17)",
                    "valor": "R$ 845,24"
                },
                {
                    "criterio": "Ambulatório com procedimentos cirúrgicos (1.2.1.7)",
                    "valor": "R$ 1.690,48"
                },
                {
                    "criterio": "Ambulatório com exames complementares (1.2.1.8)",
                    "valor": "R$ 1.267,86"
                },
                {
                    "criterio": "Consultório médico, odontológico e profissionais de saúde em geral (1.2.1.9, 1.2.1.10.1, 1.2.1.28 a 1.2.1.33, 1.2.1.36, 1.2.1.37)",
                    "valor": "R$ 633,93"
                },
                {
                    "criterio": "Demais estabelecimentos odontológicos (1.2.1.10.2)",
                    "valor": "R$ 1.479,17"
                },
                {
                    "criterio": "Clínica de fisioterapia ou de terapia ocupacional (1.2.1.30.1 e 1.2.1.31.1)",
                    "valor": "R$ 1.267,86"
                },
                {
                    "criterio": "Consultório de fisioterapia ou de terapia ocupacional (1.2.1.30.2 e 1.2.1.31.2)",
                    "valor": "R$ 614,72"
                },
                {
                    "criterio": "Cabeleireiro, outras atividades de beleza, tatuagem e piercing (1.3.3.7, 1.3.3.8, 1.3.3.10)",
                    "valor": "R$ 845,24"
                },
                {
                    "criterio": "Demais estabelecimentos não especificados sujeitos à fiscalização (1.4.1)",
                    "valor": "R$ 1.479,17"
                },
                {
                    "criterio": "Termo de responsabilidade técnica (1.5.2)",
                    "valor": "R$ 211,31"
                },
                {
                    "criterio": "Laudo técnico de avaliação: até 100 m², de 101 a 500 m², acima de 500 m² (1.5.5)",
                    "valor": "422,62 / 845,24 / 1.267,86"
                }
            ],
            "porCnae": {
                "8630-5/01": "R$ 1.690,48",
                "8630-5/02": "R$ 1.267,86",
                "8630-5/03": "R$ 633,93",
                "8630-5/04": "633,93 (consultório odontológico); 1.479,17 (demais estabelecimentos odontológicos)",
                "8650-0/01": "R$ 633,93",
                "8650-0/99": "R$ 633,93",
                "8650-0/04": "633,93 (item geral); 1.267,86 (clínica); 614,72 (consultório)",
                "8650-0/02": "R$ 633,93",
                "8650-0/03": "R$ 633,93",
                "8640-2/99": "R$ 1.690,48",
                "9602-5/02": "R$ 845,24",
                "9602-5/01": "R$ 845,24",
                "9609-2/06": "R$ 845,24",
                "8690-9/01": "R$ 845,24",
                "8690-9/03": "R$ 633,93",
                "8690-9/04": "R$ 633,93",
                "8650-0/05": "633,93 (item geral); 1.267,86 (clínica); 614,72 (consultório)",
                "8650-0/06": "R$ 633,93",
                "8711-5/02": "R$ 845,24",
                "8711-5/01": "R$ 1.267,86",
                "5611-2/01": "R$ 1.690,48",
                "5611-2/03": "R$ 1.267,86",
                "5611-2/04": "R$ 1.690,48",
                "5611-2/05": "R$ 1.690,48",
                "1091-1/02": "R$ 1.267,86",
                "4721-1/02": "R$ 1.267,86",
                "4711-3/02": "R$ 2.958,34",
                "4712-1/00": "R$ 1.267,86",
                "4724-5/00": "R$ 845,24",
                "4722-9/01": "R$ 1.267,86",
                "4722-9/02": "R$ 1.267,86",
                "5620-1/04": "R$ 1.690,48",
                "5620-1/02": "R$ 1.690,48",
                "5620-1/01": "R$ 4.226,20",
                "5620-1/03": "R$ 1.267,86",
                "1053-8/00": "4.226,20 (indústria); 1.690,48 (sorveteria)",
                "1099-6/99": "R$ 4.226,20"
            }
        },
        "notas": [
            "Não há escala de complexidade. O risco é dado por linha ('Compreende') dentro do CNAE. Na capital vale a Portaria SMS 266/2025, que quase repete o Anexo I estadual. Limitação: o Anexo I veio de uma cópia municipal de março de 2024, anterior à republicação de 03/05/2024, que não consegui abrir; algum CNAE pode ter mudado de linha. O 8650-0/99 com optometrista aparece na CVS 13 como sujeito a licença, mas a cópia do Anexo I não tem a linha. Na capital, o optometrista é II MÉDIO.",
            "Multa: a lei estadual não tem faixas leve, grave e gravíssima. Os campos ficaram null e a faixa única está em 'geral' (10 a 10.000 UFESP, ou R$ 384,20 a R$ 384.200,00 em 2026).",
            "A TFSD estadual vale para atos de vigilância sanitária feitos pelo Estado (GVS). Municípios com vigilância própria cobram pela lei municipal deles. Na capital, a licença municipal não tem taxa (ver sp-capital-multa.json). Uma busca indicou que os comunicados do CVS restringem esses valores aos atos dos GVS, mas não abri esses comunicados porque o site do CVS recusa o acesso (403).",
            "Há valor por atividade mesmo para CNAEs que a CVS 13/2025 declara isentos (hortifrúti, bares, nutrição, psicologia, terapia ocupacional, fonoaudiologia, práticas integrativas). A taxa só cabe quando houver licença: atividade isenta não paga.",
            "8211-3/00 e 8230-0/02 não têm item na tabela. São isentos pela CVS 13/2025.",
            "O Comunicado CVS que compatibiliza CNAE e item da TFSD para 2026 não foi encontrado. O de 2025 está no site do CVS, que não abriu."
        ]
    },
    {
        "id": "mg",
        "titulo": "Minas Gerais",
        "uf": "MG",
        "municipio": null,
        "normas": [
            {
                "nome": "Resolução SES/MG nº 10.601, de 21 de outubro de 2025. Define as regras e os procedimentos para o Licenciamento Sanitário, no âmbito da Vigilância Sanitária do Estado de Minas Gerais.",
                "url": "https://portal-antigo.saude.mg.gov.br/images/documentos/RESOLU%C3%87%C3%83O%20CIB%20-%2010.601.pdf",
                "vigencia": "Vigente. Art. 49: entra em vigor 30 dias após a publicação (a data de publicação no Diário Oficial não foi conferida). Art. 50 revoga as Resoluções SES/MG 5.711/2017, 7.426/2021 e 8.765/2023. A busca de 06/11/2026 não achou alteração posterior.",
                "comoConferiu": "PDF de 71 páginas baixado do portal da SES-MG (link citado na página de serviço mg.gov.br \"Solicitar alvará sanitário para estabelecimentos de alto risco\"). Anexo I (tabela CNAE, nível e nº da pergunta, p. 17 a 63) extraído com PyMuPDF find_tables e conferido pelas coordenadas das palavras, porque o pdftotext -layout desalinha código e nível. Anexo II (perguntas, p. 64 a 68) lido da mesma forma. Arts. 6º, 7º e 10 a 12 lidos no texto."
            },
            {
                "nome": "Resolução SES/MG nº 8.765, de 16 de maio de 2023, que alterava os Anexos da Resolução SES/MG 7.426/2021",
                "url": "https://www.saude.mg.gov.br/wp-content/uploads/2023/11/RESOLUCAO-SES-8765-CIB-d8e.pdf",
                "vigencia": "Revogada pelo art. 50 da Resolução SES/MG 10.601/2025.",
                "comoConferiu": "PDF baixado e lido só para comparar; não usado nos itens."
            }
        ],
        "semClassificacao": "Os 39 CNAEs da lista constam do Anexo I, que traz a tabela CNAE inteira (inclusive as atividades fora do controle sanitário, marcadas NA). A resolução não tem regra para CNAE ausente da tabela; o art. 7º diz que o risco é identificado pelos Anexos I e II.",
        "multa": {
            "norma": "Lei estadual 13.317/1999",
            "normaCompleta": "Lei Estadual nº 13.317, de 24 de setembro de 1999 (Código de Saúde do Estado de Minas Gerais), art. 101 com redação da Lei nº 15.288/2004",
            "url": "https://www.almg.gov.br/legislacao-mineira/texto/LEI/13317/1999/?cons=1",
            "onde": "arts. 100 e 101, § 1º (graduação nos arts. 106 a 108)",
            "unidade": "Ufemg",
            "valorUnidade": 5.7899,
            "anoUnidade": 2026,
            "faixas": {
                "leve": {
                    "min": 600,
                    "max": 21000
                },
                "grave": {
                    "min": 21001,
                    "max": 60000
                },
                "gravissima": {
                    "min": 60001,
                    "max": 450000
                }
            },
            "dependeDe": "Art. 101: a multa é \"graduada de acordo com a gravidade da infração e a condição econômica do infrator\". A gravidade vem das circunstâncias do art. 100: leve com atenuante, grave com uma agravante e gravíssima com duas ou mais. O art. 106 também pesa a gravidade do fato e os antecedentes do infrator. Não depende do nível de risco do CNAE nem de complexidade; o porte só entra como condição econômica."
        },
        "taxa": {
            "norma": "Lei estadual 6.763/1975",
            "normaCompleta": "Lei Estadual nº 6.763, de 26 de dezembro de 1975, Tabela A (Taxa de Expediente), item 3: atos de autoridade administrativa da Secretaria de Estado de Saúde",
            "url": "https://www.fazenda.mg.gov.br/empresas/legislacao_tributaria/leis/l6763_1975_09.html#tab_a",
            "onde": "Tabela A, itens 3.1 (concessão ou renovação de alvará de licença de funcionamento) a 3.9",
            "comoCalcula": "Valor fixo anual em Ufemg por tipo de estabelecimento, separado em maior e menor risco epidemiológico; não usa CNAE nem área, exceto a análise de projeto, que é por m².",
            "ano": 2026,
            "tabela": [
                {
                    "criterio": "Indústria ou distribuição de alimentos de maior risco epidemiológico (itens 3.1.1.1 a 3.1.1.10)",
                    "valor": "265 Ufemg/ano (R$ 1.534,32 em 2026)"
                },
                {
                    "criterio": "Indústria ou distribuição de alimentos de menor risco epidemiológico (itens 3.1.2.x)",
                    "valor": "106 Ufemg/ano (R$ 613,73 em 2026)"
                },
                {
                    "criterio": "Serviços de saúde de maior risco epidemiológico: hospital, ambulatório, clínica médica, odontológica e veterinária, laboratórios, radiologia, hemoterapia (itens 3.1.7.x)",
                    "valor": "200 Ufemg/ano (R$ 1.157,98 em 2026)"
                },
                {
                    "criterio": "Serviços de saúde de menor risco epidemiológico: clínica de fisioterapia, psicoterapia, fonoaudiologia, consultórios, massagem, ótica (itens 3.1.8.x)",
                    "valor": "106 Ufemg/ano (R$ 613,73 em 2026)"
                },
                {
                    "criterio": "Análise de projeto de estabelecimento sujeito a controle sanitário (item 3.8)",
                    "valor": "0,50 Ufemg por m² de área construída (R$ 2,89 por m² em 2026)"
                },
                {
                    "criterio": "Vistoria para desinterdição ou ampliação de linha de produção (item 3.9)",
                    "valor": "30 Ufemg (R$ 173,70 em 2026)"
                },
                {
                    "criterio": "Baixa de alvará, alteração contratual ou baixa de responsabilidade técnica (itens 3.3.1 a 3.3.3)",
                    "valor": "5 Ufemg (R$ 28,95 em 2026)"
                }
            ],
            "porCnae": {
                "8630-5/01": "200 Ufemg/ano (R$ 1.157,98 em 2026): item 3.1.7.2 ou 3.1.7.3 (ambulatório ou clínica médica)",
                "8630-5/02": "200 Ufemg/ano (R$ 1.157,98 em 2026): item 3.1.7.3 (clínica médica); laboratório e radiologia têm itens próprios, também de 200",
                "8630-5/03": "106 Ufemg/ano (R$ 613,73 em 2026) se consultório (item 3.1.8.6); 200 Ufemg/ano (R$ 1.157,98 em 2026) se clínica médica (item 3.1.7.3)",
                "8630-5/04": "106 Ufemg/ano (R$ 613,73 em 2026) se consultório odontológico (item 3.1.8.6); 200 Ufemg/ano (R$ 1.157,98 em 2026) se clínica ou ambulatório odontológico (itens 3.1.7.2 e 3.1.7.3)",
                "8650-0/02": "106 Ufemg/ano (R$ 613,73 em 2026): consultório nutricional (item 3.1.8.6)",
                "8650-0/03": "106 Ufemg/ano (R$ 613,73 em 2026): clínica de psicoterapia ou psicanálise, ou consultório de psicologia (itens 3.1.8.2 e 3.1.8.6)",
                "8650-0/04": "106 Ufemg/ano (R$ 613,73 em 2026): clínica de fisioterapia ou reabilitação (item 3.1.8.1)",
                "8650-0/06": "106 Ufemg/ano (R$ 613,73 em 2026): clínica de fonoaudiologia (item 3.1.8.5)",
                "9602-5/02": "106 Ufemg/ano (R$ 613,73 em 2026) só para estabelecimento de massagem (item 3.1.8.7); demais serviços de estética não estão na tabela",
                "1053-8/00": "265 Ufemg/ano (R$ 1.534,32 em 2026): gelados comestíveis (item 3.1.1.9)",
                "1091-1/02": "265 Ufemg/ano (R$ 1.534,32 em 2026): panificação, fabricação e distribuição (item 3.1.1.4); doces de confeitaria com creme, item 3.1.1.2, também 265",
                "5620-1/01": "265 Ufemg/ano (R$ 1.534,32 em 2026): refeições industriais (item 3.1.1.8)"
            }
        },
        "notas": [
            "Minas tem lista própria e completa. Pelo art. 7º da IN Anvisa 66/2020, a classificação federal só se aplica quando não há classificação do estado, então em MG vale a 10.601. A regra antiga (7.426 com anexos da 8.765) listava só os níveis II e III e as condicionantes; a 10.601 classifica todo CNAE, inclusive nível I e NA. Art. 6º § 3º: com várias atividades de níveis diferentes no mesmo estabelecimento, vale o mais alto. A fiscalização dos níveis I e II é municipal (art. 17); o nível III segue pactuação na CIB. Mudanças em relação à 8.765, só para registro: bufê (5620-1/02) e peixaria subiram de II para III; sorvetes (1053-8/00) desceu de III para II; padarias, minimercado e bares passaram a ter nível II explícito.",
            "A taxa estadual da Lei 6.763 é cobrada quando a Vigilância Sanitária estadual emite o alvará. Pela Resolução SES/MG 10.601/2025, os níveis I e II são de competência municipal, e o município cobra a própria taxa. Na prática, a tabela estadual vale para o nível III pactuado com o Estado.",
            "A tabela estadual não acompanhou a classificação por CNAE da 10.601: ela usa nomes de estabelecimento antigos e maior ou menor \"risco epidemiológico\". Para restaurante, salão de beleza, ILPI, mercado e estética não há item próprio na Tabela A.",
            "Ufemg 2026: R$ 5,7899 (Resolução SEF 5.969/2025, art. 1º).",
            "BH: a multa ficou null porque não abri o texto consolidado do Código Sanitário Municipal. A TFS está em UFIR, sem valor em reais de 2026 confirmado.",
            "Belo Horizonte: taxa pela Lei Municipal nº 5.641, de 22 de dezembro de 1989, Tabela I, item II (Taxa de Fiscalização Sanitária, TFS), com redação dada pela Lei nº 7.774, de 16/7/1999 (art. 12): Valor anual por estabelecimento conforme o grupo de atividade (maior ou menor risco, alimento ou serviço de saúde) e a faixa de área em m²; não usa CNAE.."
        ]
    },
    {
        "id": "df",
        "titulo": "Distrito Federal",
        "uf": "DF",
        "municipio": null,
        "normas": [
            {
                "nome": "Instrução Normativa nº 03, de 26 de agosto de 2026 (SES/SEAS/SVS/DIVISA). Aprova o Regulamento Técnico sobre o Licenciamento Sanitário, no âmbito do Distrito Federal.",
                "url": "https://www.sinj.df.gov.br/sinj/Norma/4c3fdab09bcf49e1ae31c20287dcdc13/ses_seas_svs_divisa_int_03_2026.html",
                "vigencia": "Vigente desde a publicação (art. 9º); publicada em 04/09/2026, segundo a Agência Brasília. O art. 10 revoga a IN 33/2022 DIVISA/SVS/SES-DF.",
                "comoConferiu": "Texto compilado do SINJ-DF baixado com curl e lido inteiro (arts. 1º a 10 e Anexos I e II). O SINJ marca a IN 33/2022 como revogada por esta."
            },
            {
                "nome": "Portaria nº 433, de 17 de setembro de 2024 (procedimentos de Projeto Básico de Arquitetura na Vigilância Sanitária do DF)",
                "url": "https://www.sinj.df.gov.br/sinj/Norma/3955f6e2861b4250a3ad61a1f39a0bc2/Portaria_433_17_09_2024.html",
                "vigencia": "Não conferida.",
                "comoConferiu": "Aberta pelo WebFetch: cita a IN Anvisa 66/2020 só nos considerandos, como a lista de CNAE por grau de risco."
            },
            {
                "nome": "Instrução Normativa Anvisa nº 66, de 1º de setembro de 2020",
                "url": "https://saude.se.gov.br/wp-content/uploads/2025/04/IN-N%C2%B066-DE-1o-DE-SETEMBRO-DE-2020.pdf",
                "vigencia": "A busca de 06/11/2026 não achou revogação (há minuta de RDC da Anvisa de 2024, sem publicação confirmada).",
                "comoConferiu": "Cópia em PDF republicada pela SES-SE (a página do DOU exige JavaScript). Arts. 1º a 8º lidos; anexos lidos por coordenadas com PyMuPDF."
            }
        ],
        "semClassificacao": "O DF não publica lista própria de CNAE. A IN 3/2026 manda usar o risco \"conforme disponibilizado no Sistema de Registro e Licenciamento de Estabelecimentos - RLE/Redesim\" e, para o risco I, a Resolução CGSIM 62/2020 alterada pela 66/2021. A página de licenciamento da SES-DF também não traz tabela. Sem lista distrital, vale o art. 7º da IN Anvisa 66/2020 (lista federal quando não há classificação local), e a CGSIM prevalece em caso de conflito (art. 6º).",
        "multa": {
            "norma": "Lei 6.437/1977, pelo Código de Saúde do DF",
            "normaCompleta": "Lei Federal nº 6.437, de 20 de agosto de 1977, art. 2º, § 1º, com redação da Medida Provisória nº 2.190-34/2001, aplicada no DF por força do art. 118, § 5º, da Lei Distrital nº 5.321/2014 (Código de Saúde do DF), incluído pela Lei 5.547/2015",
            "url": "https://www.planalto.gov.br/ccivil_03/leis/l6437.htm",
            "onde": "Lei 6.437, arts. 2º, § 1º (valores), § 2º (dobro na reincidência), § 3º (capacidade econômica), 4º (classificação) e 6º (graduação); Lei 5.321/2014, art. 118, § 5º",
            "unidade": "R$",
            "valorUnidade": null,
            "anoUnidade": null,
            "faixas": {
                "leve": {
                    "min": 2000,
                    "max": 75000
                },
                "grave": {
                    "min": 75000,
                    "max": 200000
                },
                "gravissima": {
                    "min": 200000,
                    "max": 1500000
                }
            },
            "dependeDe": "Gravidade (art. 4º: leve com atenuante, grave com uma agravante, gravíssima com duas ou mais), gravidade do fato e antecedentes (art. 6º), e capacidade econômica do infrator (art. 2º, § 3º). Multa em dobro na reincidência (§ 2º). Não depende do risco do CNAE nem de complexidade."
        },
        "taxa": {
            "norma": "Portaria SES/DF 5/2023",
            "normaCompleta": "Taxa de Expediente da Vigilância Sanitária (Código Tributário do DF e LC distrital 264/1999, alterada pela LC 783/2008), com valores anuais em portaria da SES-DF. A de 2026 é a Portaria nº 11, de 07/01/2026 (DODF de 09/01/2026); a última com anexo lido é a Portaria SES/DF nº 5, de 02/01/2023.",
            "url": "https://www.legisweb.com.br/legislacao/?id=441124",
            "onde": "Portaria SES/DF 5/2023, arts. 1º a 6º e Anexo",
            "comoCalcula": "Valor fixo por serviço pedido (parecer técnico ou laudo de inspeção para a licença, segunda via, desinterdição), igual para qualquer atividade; não varia por risco, área ou CNAE.",
            "ano": 2023,
            "tabela": [
                {
                    "criterio": "Parecer técnico ou laudo de inspeção (inclui o da licença sanitária)",
                    "valor": "R$ 201,83"
                },
                {
                    "criterio": "Segunda via da licença sanitária",
                    "valor": "R$ 40,21"
                },
                {
                    "criterio": "Vistoria técnica para desinterdição",
                    "valor": "R$ 169,42"
                }
            ],
            "porCnae": null
        },
        "notas": [
            "Segue a lista federal: IN Anvisa 66/2020 para os níveis II, III e dependente de pergunta, e a resolução CGSIM para o nível I. A tabela aplicada de fato está dentro do RLE/Redesim do DF e não foi publicada como norma, por isso os itens ficam null. A única pista distrital por CNAE é o item 4.4.2 do Anexo I da IN 3/2026, que trata 8650-0/01, 8630-5/03 e 8650-0/99 como atividades de risco III que, por exceção, podem funcionar sem estabelecimento. Na IN 66, esses três dependem da pergunta 46 (procedimento invasivo). Para conferir CNAE a CNAE, é preciso consultar o próprio RLE/Redesim do DF (redesimples.df.gov.br).",
            "O DF não tem multa própria: o art. 118, § 5º do Código de Saúde (Lei 5.321/2014) manda aplicar a Lei 6.437/1977, e a IN SES/DF 3/2026 (art. 6º) faz o mesmo.",
            "Na Lei 6.437 os valores são em reais, sem unidade fiscal nem correção prevista no texto lido; por isso valorUnidade é null.",
            "Isenções da taxa, pela IN SES/DF 3/2026, art. 3º: o MEI fica isento de taxas de abertura, licença e alvará (LC 123/2006), e o agricultor familiar com DAP, o MEI e o empreendedor de economia solidária ficam isentos de taxas de fiscalização sanitária. O risco I nem pede licenciamento (art. 2º, § 2º).",
            "Os valores de 2026 existem (Portaria SES/DF 11/2026), mas não consegui abrir o anexo. Para fechar, falta o DODF de 09/01/2026, Seção I.",
            "O DF é a própria capital, então capitais fica vazio."
        ]
    },
    {
        "id": "sc",
        "titulo": "Santa Catarina",
        "uf": "SC",
        "municipio": null,
        "normas": [
            {
                "nome": "Resolução Normativa nº 01/DIVS/SUV/SES, de 12 de setembro de 2025: lista de atividades econômicas sujeitas à vigilância sanitária, por nível de risco, para fins de licenciamento sanitário no Estado de Santa Catarina",
                "url": "https://www.joinville.sc.gov.br/wp-content/uploads/2025/10/Resolucao-Normativa-n%C2%B0-01DIVSSUVSES-01outubro2025.pdf",
                "vigencia": "Publicada no DOE-SC em 15/09/2025 (edição 22598, matéria 1114833); vigora desde a publicação (art. 22). Revogou a RN 003/DIVS/SES de 01/12/2021 (art. 21). A ficha do Legisweb (id 483524) não registra alteração nem revogação, e a busca não achou norma posterior.",
                "comoConferiu": "Baixado o PDF do extrato digital do DOE-SC (cópia da Prefeitura de Joinville). A camada de texto é OCR com linhas desalinhadas no Anexo I, então cada linha usada foi lida na imagem da página renderizada (PyMuPDF), não no texto extraído. Artigos 3º a 8º e 19 a 22 lidos no texto. Situação conferida na ficha do Legisweb."
            }
        ],
        "semClassificacao": "Os 39 CNAEs da lista constam do Anexo I. A RN não tem regra expressa para CNAE ausente do Anexo I: o art. 7º manda atividades de denominação genérica seguirem as normas da atividade específica, e o art. 19 deixa casos omissos e dúvidas para a DIVS/SES/SC. Diferente da IN 66, o Anexo I de SC também lista atividades de risco I (inclusive CNAEs sem interesse sanitário evidente, como 8211-3/00), então a lista estadual cobre tudo.",
        "multa": {
            "norma": "Lei estadual 6.320/1983",
            "normaCompleta": "Lei estadual 6.320, de 20/12/1983 (normas gerais de saúde), art. 59 com redação da Lei 17.024/2016",
            "url": "http://leis.alesc.sc.gov.br/html/1983/6320_1983_Lei.html",
            "onde": "art. 53 (classificação), art. 59 (valores), art. 60 (reincidência)",
            "unidade": "R$",
            "valorUnidade": null,
            "anoUnidade": null,
            "faixas": {
                "leve": {
                    "min": 84.06,
                    "max": 420.32
                },
                "grave": {
                    "min": 421.0,
                    "max": 840.64
                },
                "gravissima": {
                    "min": 841.0,
                    "max": 3362.58
                }
            },
            "dependeDe": "Gravidade pelas circunstâncias atenuantes e agravantes (art. 53 e 54) e capacidade econômica do infrator (art. 59, § 1º). Não depende do nível de risco da RN 01/2025. Reincidência específica leva à pena máxima e à classificação gravíssima (art. 60)."
        },
        "taxa": {
            "norma": "Lei estadual 7.541/1988",
            "normaCompleta": "Lei 7.541/1988, Tabela II (Atos da Saúde Pública), item 1 Alvará Sanitário Anual, valores do Decreto 420/2023",
            "url": "https://legislacao.sef.sc.gov.br/html/Decretos/2023/Dec_23_0420.htm",
            "onde": "Anexo Único, Tabela II, item 1 (códigos 11101 a 16299)",
            "comoCalcula": "Valor fixo anual por atividade desenvolvida, com grupos de maior e menor risco epidemiológico; não usa área nem o nível de risco da RN 01/2025.",
            "ano": 2024,
            "tabela": [
                {
                    "criterio": "Indústria de alimentos, maior risco epidemiológico (ex.: sorvetes, refeições industriais, panificação industrial)",
                    "valor": "R$ 562,18"
                },
                {
                    "criterio": "Indústria de alimentos, menor risco epidemiológico",
                    "valor": "R$ 379,46"
                },
                {
                    "criterio": "Local de elaboração ou venda de alimentos, maior risco",
                    "valor": "R$ 84,32 a R$ 281,09 conforme a atividade"
                },
                {
                    "criterio": "Local de elaboração ou venda de alimentos, menor risco",
                    "valor": "R$ 42,16 a R$ 140,53 conforme a atividade"
                },
                {
                    "criterio": "Serviços de saúde, maior risco (ambulatórios, clínicas, hospitais, laboratórios)",
                    "valor": "R$ 84,32 a R$ 562,18 conforme a atividade"
                },
                {
                    "criterio": "Serviços de saúde, menor risco (consultórios, clínicas de fisioterapia, psicologia, odontologia)",
                    "valor": "R$ 112,43 a R$ 309,20 conforme a atividade"
                },
                {
                    "criterio": "Serviços de interesse da saúde (asilo, salão de beleza, estética facial, escritório)",
                    "valor": "R$ 14,05 a R$ 562,18 conforme a atividade"
                }
            ],
            "porCnae": {
                "8630-5/01": "15101 Ambulatório médico R$ 196,74 ou 15107 Clínica médica R$ 379,46",
                "8630-5/02": "15107 Clínica médica R$ 379,46; imagem: 15150 Clínica de diagnóstico por imagem R$ 379,46 por equipamento",
                "8630-5/03": "15209 Consultório médico R$ 196,74",
                "8630-5/04": "15211 Consultório odontológico R$ 196,74 ou 15204 Clínica de odontologia R$ 309,20",
                "8650-0/01": "15104 Ambulatório de enfermagem R$ 196,74",
                "8650-0/99": "15299 Congêneres grupo 152 R$ 112,43",
                "8650-0/04": "15201 Clínica de fisioterapia e/ou reabilitação R$ 309,20",
                "8650-0/02": "15210 Consultório nutricional R$ 196,74",
                "8650-0/03": "15212 Consultório de psicanálise / psicologia R$ 196,74",
                "8640-2/99": "15199 Congêneres grupo 151 R$ 196,74",
                "9602-5/02": "16217 Estética facial / maquilagem R$ 112,43; sob responsabilidade médica: 15148 R$ 196,74",
                "8211-3/00": "16214 Escritório em geral R$ 42,16",
                "9602-5/01": "16230 Salão de beleza / manicuro / pedicuro / cabeleireiro R$ 84,32 (barbearia 16204: R$ 42,16)",
                "8650-0/06": "15208 Clínica de fonoaudiologia R$ 196,74",
                "8711-5/02": "16101 Asilo e similares R$ 112,43",
                "8711-5/01": "16101 Asilo e similares R$ 112,43 ou 15205 Clínica de tratamento e repouso R$ 309,20",
                "5611-2/01": "12121 Restaurante / buffet / churrascaria R$ 196,74",
                "5611-2/03": "12113 Lanchonete R$ 112,43; casa de sucos 12106: R$ 112,43",
                "5611-2/04": "12201 Bar / boate / uisqueria R$ 84,32",
                "5611-2/05": "12201 Bar / boate / uisqueria R$ 84,32",
                "1091-1/02": "12116 Padaria / panificadora R$ 140,53 (confeitaria 12108: R$ 196,74)",
                "4721-1/02": "12116 Padaria / panificadora R$ 140,53",
                "4711-3/02": "12114 Mercados / super / mini R$ 84,32 (somatório das atividades)",
                "4712-1/00": "12115 Mercearia / armazém R$ 84,32",
                "4724-5/00": "12209 Quitanda, frutas e verduras R$ 42,16",
                "4722-9/01": "12101 Açougue R$ 196,74",
                "4722-9/02": "12118 Peixaria R$ 140,53",
                "5620-1/04": "12199 Congêneres grupo 121 R$ 112,43 (rotisserie 12122: R$ 196,74)",
                "5620-1/02": "12121 Restaurante / buffet / churrascaria R$ 196,74",
                "5620-1/01": "11108 Refeições industriais R$ 562,18",
                "5620-1/03": "12103 Cantina escolar R$ 140,53",
                "1053-8/00": "11109 Sorvetes e similares R$ 562,18",
                "1099-6/99": "11199 Congêneres grupo 111 R$ 562,18 ou 11299 Congêneres grupo 112 R$ 379,46"
            }
        },
        "notas": [
            "SC tem lista própria e completa; não segue a IN Anvisa 66/2020. Em vez de perguntas, a condição vem escrita na própria linha do Anexo I (linhas desdobradas, em negrito no original). Exercício de vários CNAEs de níveis diferentes leva ao nível mais alto (art. 8º). Pontos que chamam atenção: restaurantes, lanchonetes e bares (5611-2/xx) são I - Baixo; açougue (4722-9/01) é I - Baixo e peixaria (4722-9/02) é III - Alto, conferido em imagem ampliada; cantina (5620-1/03) é I - Baixo enquanto marmita para empresas (5620-1/01) é III - Alto; padaria com produção própria (1091-1/02) é I - Baixo. Odontologia (8630-5/04) inclui expressamente a harmonização orofacial feita por odontólogos. O licenciamento costuma ser municipal; a RN é a régua estadual.",
            "A multa estadual de SC é baixa (máximo R$ 3.362,58) e está em reais desde a Lei 17.024/2016; a UFR antiga não vale mais.",
            "Existe o PL 253/2018 na ALESC, que substituiria a Lei 6.320/1983 com multas maiores; não confirmei aprovação. A RN 01/2025 ainda cita a Lei 6.320 como vigente.",
            "A taxa estadual de alvará sanitário vale onde o Estado licencia; município com vigilância própria cobra pela sua lei. A tabela não muda com o nível de risco (I, II, III) da RN 01/2025, e atividade de risco I é dispensada de alvará (art. 4º da RN), então em tese não paga.",
            "CNAEs sem item próprio na Tabela II (tatuagem, práticas integrativas, acupuntura, podologia, terapia ocupacional, casa de festas) ficaram null em porCnae; provavelmente caem em 'Congêneres' do grupo (15199 R$ 196,74, 15299 R$ 112,43, 16199 R$ 196,74, 16299 R$ 84,32), mas a escolha é da autoridade.",
            "Florianópolis ficou sem valores: não consegui abrir a LC 239/2006 nem o Decreto 8.897/2011.",
            "Florianópolis: multa pela Lei Complementar municipal 239/2006 (Código de Vigilância em Saúde); taxa pela LC 239/2006, cobrança regulada pelo Decreto 8.897/2011."
        ]
    },
    {
        "id": "rs",
        "titulo": "Rio Grande do Sul",
        "uf": "RS",
        "municipio": null,
        "normas": [
            {
                "nome": "Portaria SES/RS nº 192/2022, de 6 de abril de 2022: lista de atividades econômicas sujeitas à vigilância sanitária por grau de risco e dependente de informação para fins de licenciamento sanitário, conforme a CNAE, e regulamenta o SIVISA-RS",
                "url": "https://saude.rs.gov.br/upload/arquivos/202204/12135503-192.pdf",
                "vigencia": "Vigora desde a publicação (art. 17), assinada em 06/04/2022. Não achei revogação nem portaria substituta em duas buscas (saude.rs.gov.br, legisweb); um documento da FAMURS de 2023 ainda a cita como referência. Não consegui abrir o DOE-RS nem a página de legislação do CEVS (404), então a vigência atual não está confirmada por fonte oficial posterior.",
                "comoConferiu": "O curl direto ao saude.rs.gov.br foi bloqueado pelo firewall do site; o PDF veio pelo WebFetch (binário salvo) e foi lido com pdftotext, que tem camada de texto limpa. As linhas com 'P' (8630-5/03, 8630-5/99, 9602-5/02) foram conferidas também na imagem da página. Artigos 4º a 9º, Anexo II (perguntas 47 e 54) e Anexo III (respostas) lidos no texto."
            }
        ],
        "semClassificacao": "O Anexo I traz os CNAEs da tabela, inclusive os não sujeitos, marcados NA ('Não se Aplica', art. 4º, § 1º). Dos 39 da lista, só 8211-3/00 e 8230-0/02 são NA; nenhum ficou ausente. A portaria não traz regra para CNAE que não esteja no Anexo I.",
        "multa": {
            "norma": "Lei 6.437/1977",
            "normaCompleta": "Lei federal 6.437/1977, aplicada pela vigilância sanitária estadual do RS",
            "url": "https://www.planalto.gov.br/ccivil_03/leis/l6437.htm",
            "onde": "art. 2º, § 1º (valores, redação da MP 2.190-34/2001), § 2º (dobro na reincidência), § 3º (capacidade econômica); art. 4º (classificação)",
            "unidade": "R$",
            "valorUnidade": null,
            "anoUnidade": null,
            "faixas": {
                "leve": {
                    "min": 2000,
                    "max": 75000
                },
                "grave": {
                    "min": 75000,
                    "max": 200000
                },
                "gravissima": {
                    "min": 200000,
                    "max": 1500000
                }
            },
            "dependeDe": "Gravidade pelas circunstâncias atenuantes e agravantes (arts. 4º, 6º a 9º) e capacidade econômica do infrator (art. 2º, § 3º); dobra na reincidência. O manual do CEVS manda considerar também o porte (MEI, ME, EPP) na dosimetria. Não depende do grau de risco da Portaria 192/2022."
        },
        "taxa": {
            "norma": "Lei estadual 8.109/1985",
            "normaCompleta": "Lei estadual 8.109/1985 (Taxa de Serviços Diversos), Tabela de Incidência, Título II, Secretaria da Saúde, item 3",
            "url": "https://www.normasbrasil.com.br/norma/lei-8109-1985-rs_152981.html",
            "onde": "Tabela de Incidência, Título II, item 3",
            "comoCalcula": "Valor único em UPF-RS para alvará inicial (com vistoria prévia) e renovação anual, igual para todas as atividades da lista; não varia por risco, área ou CNAE.",
            "ano": 2026,
            "tabela": [
                {
                    "criterio": "Alvará inicial, inclusive vistoria prévia, e renovação anual (item 3)",
                    "valor": "7,3561 UPF-RS (R$ 208,37 em 2026)"
                },
                {
                    "criterio": "Vistoria para encerramento de atividades ou alteração de endereço (item 2)",
                    "valor": "4,3787 UPF-RS (R$ 124,03 em 2026)"
                },
                {
                    "criterio": "Exame de projeto de prédio não residencial, por m² (item 1)",
                    "valor": "0,0438 UPF-RS (R$ 1,24 em 2026)"
                },
                {
                    "criterio": "UPF-RS 2026",
                    "valor": "R$ 28,3264 (IN RE 111/25)"
                }
            ],
            "porCnae": null
        },
        "notas": [
            "RS tem lista própria com perguntas (modelo parecido com o da IN 66, mas com números de pergunta e graus próprios, inclusive respostas que levam a I ou NA). Atenção ao art. 2º: 'Os municípios poderão vincular-se às disposições da presente Portaria por meio de instrumento válido e próprio'; município com norma própria pode classificar diferente, então vale conferir o município antes de usar. Vários CNAEs de níveis distintos levam ao mais alto (art. 4º, § 4º). Destaques: restaurantes, lanchonetes e bares I; bufê (5620-1/02) e comida para consumo domiciliar (5620-1/04) I; supermercado II e minimercado I; açougue I e peixaria II; tatuagem III; casa de festas NA.",
            "O RS não tem tabela própria de multa sanitária estadual: segue a Lei 6.437/77. Os arts. 48-A e 48-B que aparecem em busca são do Decreto 55.240/2020 (medidas da covid), não de código sanitário.",
            "A taxa estadual só é cobrada quando o licenciamento é feito pelo Estado; a maioria dos municípios licencia e cobra pela própria lei.",
            "A redação vigente do item 3 da Lei 8.109/1985 não foi confirmada em fonte oficial (Assembleia ou Receita Estadual).",
            "Porto Alegre ficou sem valores: não consegui abrir a LC 395/1996 consolidada.",
            "Porto Alegre: multa pela Lei Complementar municipal 395/1996 (Código Municipal de Saúde)."
        ]
    },
    {
        "id": "pa",
        "titulo": "Pará",
        "uf": "PA",
        "municipio": null,
        "normas": [
            {
                "nome": "Decreto Estadual nº 1.098, de 15 de outubro de 2020. Regulamenta o baixo risco e dispensa atos públicos de liberação de atividade econômica no Estado do Pará. DOE-PA nº 34.375, de 16/10/2020.",
                "url": "https://sistemas.semas.pa.gov.br/legislacao/files/pdf/535272_compilada.pdf",
                "vigencia": "Em vigor desde a publicação (art. 10). O texto compilado da SEMAS não mostra alteração, e a busca não achou decreto que altere o Anexo I. O Corpo de Bombeiros do Pará republicou o decreto no site em 2025.",
                "comoConferiu": "Baixei o PDF compilado (15 p.) do portal de legislação da SEMAS, extraí com pdftotext -layout e procurei cada CNAE no Anexo I."
            }
        ],
        "semClassificacao": "O Decreto 1.098/2020 só lista o baixo risco e não diz nada sobre quem fica fora do Anexo I. Pela lógica do decreto, atividade fora do anexo não tem a dispensa e continua sujeita a licenciamento sanitário, mas o nível (médio ou alto) não está em norma estadual que eu tenha encontrado. Por isso deixei risco null e norma \"segue-federal\" nos 31 CNAE que não estão no anexo: na falta de lista estadual, a referência é a IN Anvisa 66/2020 com a RDC 153/2017. Atenção: não achei texto paraense que diga expressamente que adota a IN 66; isso é a regra geral, não uma adoção declarada.",
        "multa": {
            "norma": "Lei 6.437/1977, como referência",
            "normaCompleta": "Lei federal 6.437/1977 (não achei código sanitário estadual do Pará com multa própria)",
            "url": "https://www.planalto.gov.br/ccivil_03/leis/L6437.htm",
            "onde": "Art. 2º, § 1º, redação da MP 2.190-34/2001; art. 4º (classificação)",
            "unidade": "R$",
            "valorUnidade": null,
            "anoUnidade": null,
            "faixas": {
                "leve": {
                    "min": 2000,
                    "max": 75000
                },
                "grave": {
                    "min": 75000,
                    "max": 200000
                },
                "gravissima": {
                    "min": 200000,
                    "max": 1500000
                }
            },
            "dependeDe": "Gravidade (art. 4º: leve com atenuante, grave com uma agravante, gravíssima com duas ou mais), capacidade econômica do infrator e circunstâncias."
        },
        "taxa": null,
        "notas": [
            "Não achei norma da SESPA (Departamento Estadual de Vigilância Sanitária, DEVS) que classifique atividades por grau de risco por CNAE para licenciamento. Procurei no site da SESPA (página de vigilância sanitária e busca por \"risco sanitário\" e \"CNAE\"), no LegisWeb e em buscas sobre IOEPA, CIB/PA e Integrador Pará: nada. O único ato estadual com lista por CNAE é o Decreto 1.098/2020, do Governador, que só define o baixo risco (comum a sanitário e ambiental). Diferença grande em relação à IN 66/2020: o Pará dispensa de licença fisioterapia, fonoaudiologia, nutrição, psicologia, terapia ocupacional, cabeleireiro/manicure e minimercado (4712-1/00), que na IN 66 são nível de risco II (médio). 8211-3/00 não está na IN 66, e no Pará é baixo risco expresso. O art. 7º recomenda que município que aderir à REDESIM pela JUCEPA siga essa padronização, então Belém e outros municípios podem ter regra própria; não pesquisei Belém. Não abri o DOE-PA original (IOEPA), só o compilado da SEMAS, que avisa que não substitui o publicado.",
            "UPF-PA 2026: R$ 5,0155, pela Portaria SEFA 640/2025, segundo a notícia do COAD (não abri o DOE). Pus aqui porque é a unidade das taxas estaduais do Pará, mas não achei taxa sanitária estadual que a use.",
            "Não achei código sanitário estadual nem lei de taxa sanitária estadual. Pelo Decreto 1.098/2020 o Estado só define o baixo risco. Na busca aparece o município de Ananindeua com taxa de vigilância sanitária municipal (Lei municipal 1.320, valores em UPF-PA, decreto de atualização 1.073/2023), o que sugere que no Pará a cobrança é municipal. Não abri esses atos.",
            "Belém não pesquisado."
        ]
    },
    {
        "id": "manaus",
        "titulo": "Manaus",
        "uf": "AM",
        "municipio": "Manaus",
        "normas": [
            {
                "nome": "Decreto Municipal nº 4.648, de 12 de novembro de 2019 (Manaus). REDESIM municipal, licenciamento e alvará; Anexo VI com a lista de classificação de risco por CNAE, com colunas por órgão, incluindo Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade).",
                "url": "https://www.manaus.am.gov.br/semsa/wp-content/uploads/sites/8/2023/01/DECRETO-No-4.648-DE-12-DE-NOVEMBRO-2019-1.pdf",
                "vigencia": "DOM Manaus 12/11/2019, ed. 4719; revogou os Decretos 3.200/2015 e 3.318/2016. Continua listado na página de legislação da VISA/SEMSA Manaus. Não conferi se houve alteração posterior do Anexo VI.",
                "comoConferiu": "Baixei o PDF (56 p.) do site da SEMSA e li as colunas RS e Complexidade pela posição das palavras (PyMuPDF), na linha do CNAE com especialização 00."
            }
        ],
        "semClassificacao": null,
        "multa": {
            "norma": "Lei municipal 392/1997",
            "normaCompleta": "Lei Municipal Manaus 392/1997 (Código Sanitário de Manaus), regulamentada pelo Decreto 3.910/1997",
            "url": "https://www.manaus.am.gov.br/semsa/wp-content/uploads/sites/8/2023/01/Codigo-Sanitario-de-Manaus-1.pdf",
            "onde": "Lei 392/1997, art. 11 (mesmas faixas repetidas no art. 612 e seguintes do regulamento); art. 12 (reincidência em dobro)",
            "unidade": "UFM",
            "valorUnidade": 152.78,
            "anoUnidade": 2026,
            "faixas": {
                "leve": {
                    "min": 1,
                    "max": 100
                },
                "grave": {
                    "min": 100,
                    "max": 200
                },
                "gravissima": {
                    "min": 200,
                    "max": 400
                }
            },
            "dependeDe": "Gravidade; reincidência ou continuidade dobra a multa anterior (art. 12). Em reais, 2026: leve R$ 152,78 a R$ 15.278,00; grave acima de R$ 15.278,00 até R$ 30.556,00; gravíssima acima de R$ 30.556,00 até R$ 61.112,00. (A lei diz \"de mais de cem\" e \"de mais de duzentas\" UFM.)"
        },
        "taxa": {
            "norma": "LC municipal 10/2018",
            "normaCompleta": "Lei Complementar Manaus 10/2018 (Licença Sanitária, Taxa de Vigilância Sanitária TVS e Taxa de Serviços Administrativos TSA)",
            "url": "https://www.legisweb.com.br/legislacao/?id=373212",
            "onde": "Arts. 16 a 18 e Anexo I (TVS); Anexo II (TSA); art. 35 (isenções)",
            "comoCalcula": "TVS anual em UFM, pela área usada na atividade (7 faixas, de até 100 m² a mais de 1.500 m²) cruzada com o Tipo de atividade / risco à saúde de 1 a 5 da atividade de maior risco do estabelecimento (art. 18). O tipo de cada CNAE é a coluna \"Tipo de Atividade/Risco à Saúde (Complexidade)\" do Anexo VI do Decreto 4.648/2019. MEI, agricultor familiar e economia solidária são isentos (art. 35). Serviços avulsos (projeto, vistoria, documentos) pagam a TSA.",
            "ano": 2026,
            "tabela": [
                {
                    "criterio": "Até 100 m²: tipos 1 / 2 / 3 / 4 / 5",
                    "valor": "2,00 / 2,75 / 3,50 / 3,88 / 5,00 UFM"
                },
                {
                    "criterio": "100,01 a 200 m²",
                    "valor": "3,00 / 3,75 / 4,50 / 4,88 / 6,00 UFM"
                },
                {
                    "criterio": "200,01 a 300 m²",
                    "valor": "4,00 / 5,00 / 6,00 / 6,50 / 8,00 UFM"
                },
                {
                    "criterio": "300,01 a 500 m²",
                    "valor": "6,00 / 7,00 / 8,00 / 8,50 / 10,00 UFM"
                },
                {
                    "criterio": "500,01 a 1.000 m²",
                    "valor": "8,00 / 9,75 / 11,50 / 12,38 / 15,00 UFM"
                },
                {
                    "criterio": "1.000,01 a 1.500 m²",
                    "valor": "10,00 / 13,00 / 16,00 / 17,50 / 22,00 UFM"
                },
                {
                    "criterio": "Acima de 1.500 m²",
                    "valor": "12,00 / 16,50 / 21,00 / 23,25 / 30,00 UFM"
                },
                {
                    "criterio": "UFM 2026",
                    "valor": "R$ 152,78"
                }
            ],
            "porCnae": {
                "8630-5/01": "Tipo 4: 3,88 a 23,25 UFM conforme a área (R$ 592,79 a R$ 3552,14 em 2026)",
                "8630-5/02": "Tipo 3: 3,50 a 21,00 UFM conforme a área (R$ 534,73 a R$ 3208,38 em 2026)",
                "8630-5/03": "Tipo 1: 2,00 a 12,00 UFM conforme a área (R$ 305,56 a R$ 1833,36 em 2026)",
                "8630-5/04": "Tipo 4: 3,88 a 23,25 UFM conforme a área (R$ 592,79 a R$ 3552,14 em 2026)",
                "8650-0/04": "Tipo 1: 2,00 a 12,00 UFM conforme a área (R$ 305,56 a R$ 1833,36 em 2026)",
                "8650-0/02": "Tipo 1: 2,00 a 12,00 UFM conforme a área (R$ 305,56 a R$ 1833,36 em 2026)",
                "8650-0/03": "Tipo 1: 2,00 a 12,00 UFM conforme a área (R$ 305,56 a R$ 1833,36 em 2026)",
                "8640-2/99": "Tipo 5: 5,00 a 30,00 UFM conforme a área (R$ 763,90 a R$ 4583,40 em 2026)",
                "9602-5/01": "Tipo 2: 2,75 a 16,50 UFM conforme a área (R$ 420,14 a R$ 2520,87 em 2026)",
                "9609-2/06": "Tipo 4: 3,88 a 23,25 UFM conforme a área (R$ 592,79 a R$ 3552,14 em 2026)",
                "8690-9/01": "Tipo 1: 2,00 a 12,00 UFM conforme a área (R$ 305,56 a R$ 1833,36 em 2026)",
                "8690-9/03": "Tipo 3: 3,50 a 21,00 UFM conforme a área (R$ 534,73 a R$ 3208,38 em 2026)",
                "8690-9/04": "Tipo 2: 2,75 a 16,50 UFM conforme a área (R$ 420,14 a R$ 2520,87 em 2026)",
                "8650-0/05": "Tipo 1: 2,00 a 12,00 UFM conforme a área (R$ 305,56 a R$ 1833,36 em 2026)",
                "8650-0/06": "Tipo 1: 2,00 a 12,00 UFM conforme a área (R$ 305,56 a R$ 1833,36 em 2026)",
                "8711-5/02": "Tipo 4: 3,88 a 23,25 UFM conforme a área (R$ 592,79 a R$ 3552,14 em 2026)",
                "8711-5/01": "Tipo 5: 5,00 a 30,00 UFM conforme a área (R$ 763,90 a R$ 4583,40 em 2026)",
                "5611-2/01": "Tipo 3: 3,50 a 21,00 UFM conforme a área (R$ 534,73 a R$ 3208,38 em 2026)",
                "5611-2/03": "Tipo 2: 2,75 a 16,50 UFM conforme a área (R$ 420,14 a R$ 2520,87 em 2026)",
                "5611-2/04": "Tipo 2: 2,75 a 16,50 UFM conforme a área (R$ 420,14 a R$ 2520,87 em 2026)",
                "5611-2/05": "Tipo 2: 2,75 a 16,50 UFM conforme a área (R$ 420,14 a R$ 2520,87 em 2026)",
                "1091-1/02": "Tipo 2: 2,75 a 16,50 UFM conforme a área (R$ 420,14 a R$ 2520,87 em 2026)",
                "4721-1/02": "Tipo 2: 2,75 a 16,50 UFM conforme a área (R$ 420,14 a R$ 2520,87 em 2026)",
                "4711-3/02": "Tipo 3: 3,50 a 21,00 UFM conforme a área (R$ 534,73 a R$ 3208,38 em 2026)",
                "4712-1/00": "Tipo 2: 2,75 a 16,50 UFM conforme a área (R$ 420,14 a R$ 2520,87 em 2026)",
                "4724-5/00": "Tipo 1: 2,00 a 12,00 UFM conforme a área (R$ 305,56 a R$ 1833,36 em 2026)",
                "4722-9/01": "Tipo 2: 2,75 a 16,50 UFM conforme a área (R$ 420,14 a R$ 2520,87 em 2026)",
                "4722-9/02": "Tipo 2: 2,75 a 16,50 UFM conforme a área (R$ 420,14 a R$ 2520,87 em 2026)",
                "5620-1/04": "Tipo 3: 3,50 a 21,00 UFM conforme a área (R$ 534,73 a R$ 3208,38 em 2026)",
                "5620-1/02": "Tipo 3: 3,50 a 21,00 UFM conforme a área (R$ 534,73 a R$ 3208,38 em 2026)",
                "5620-1/01": "Tipo 3: 3,50 a 21,00 UFM conforme a área (R$ 534,73 a R$ 3208,38 em 2026)",
                "5620-1/03": "Tipo 1: 2,00 a 12,00 UFM conforme a área (R$ 305,56 a R$ 1833,36 em 2026)",
                "1053-8/00": "Tipo 3: 3,50 a 21,00 UFM conforme a área (R$ 534,73 a R$ 3208,38 em 2026)",
                "1099-6/99": "Tipo 3: 3,50 a 21,00 UFM conforme a área (R$ 534,73 a R$ 3208,38 em 2026)",
                "8650-0/01": "Tipo \"*\" (Risco Condicionado): depende das respostas no pedido; sem valor fixo na tabela",
                "8650-0/99": "Tipo \"*\" (Risco Condicionado): depende das respostas no pedido; sem valor fixo na tabela",
                "9602-5/02": "Tipo \"*\" (Risco Condicionado): depende das respostas no pedido; sem valor fixo na tabela",
                "8211-3/00": "Baixo Risco A: sem licença sanitária; sem tipo na tabela",
                "8230-0/02": "Baixo Risco A: sem licença sanitária; sem tipo na tabela"
            }
        },
        "notas": []
    },
    {
        "id": "am",
        "titulo": "Amazonas",
        "uf": "AM",
        "municipio": null,
        "normas": [
            {
                "nome": "Resolução Normativa nº 01/DEVISA/DITEC/DIPRE/FVS-RCP, de 6 de outubro de 2021 (assinada em 25/8/2021). Dispõe sobre a Tabela de Classificação de Risco Sanitário por CNAE para fins de licenciamento sanitário no âmbito do Estado do Amazonas. Aprovada pela Portaria nº 125/DIPRE/FVS-RCP, DOE-AM 7/10/2021.",
                "url": "https://www.fvs.am.gov.br/media/uploads/formularios/poratria_125_de_2021_e__resoluc%CC%A7a%CC%83o_normativa_01_de_2021_-_classificac%CC%A7a%CC%83o_de_risco_santa%CC%81rio_-_versa%CC%83o_periodo_eleitoral_2022.pdf",
                "vigencia": "Em vigor desde a publicação no DOE-AM de 7/10/2021 (art. 29); revogou a Nota Técnica 10/DEVISA/FVS-AM/2017. A página de formulários da FVS-RCP (fvs.am.gov.br/formularios), que já traz taxas e documentos de 2026, ainda a lista como a norma de classificação de risco. Não achei norma posterior.",
                "comoConferiu": "Baixei o PDF (72 p.) do site da FVS-RCP, extraí com pdftotext -layout e conferi as linhas duvidosas pela posição das palavras com PyMuPDF (8211-3/00 sai desalinhado no texto corrido; números 53 e 65 na coluna de pergunta)."
            }
        ],
        "semClassificacao": "Todos os 39 CNAE estão no Anexo IV da RN 01/2021. A tabela tem a categoria \"Dispensado de Licenciamento\" (art. 6º, XII, e art. 7º: atividades que não fazem parte do rol licenciável, com Declaração de Dispensa emitida pela REDESIM, modelo no Anexo I). O modelo da declaração descreve as dispensadas como atividades não relacionadas na RDC 153/2017 e na IN Anvisa 66/2020.",
        "multa": {
            "norma": "LC estadual 70/2009",
            "normaCompleta": "Lei Complementar AM 70/2009 (Código de Saúde do Estado do Amazonas)",
            "url": "https://www.fvs.am.gov.br/media/uploads/formularios/lei_complementar_n._70_de_2009_co%CC%81digo_de_sau%CC%81de_do_amazonas.pdf",
            "onde": "Art. 278, § 1º (valores) e § 2º (atualização anual pela SELIC); art. 282 (classificação)",
            "unidade": "R$",
            "valorUnidade": null,
            "anoUnidade": 2009,
            "faixas": {
                "leve": {
                    "min": null,
                    "max": 2000
                },
                "grave": {
                    "min": null,
                    "max": 10120
                },
                "gravissima": {
                    "min": null,
                    "max": 40470
                }
            },
            "dependeDe": "Gravidade (art. 282: leve com atenuante, grave com uma agravante, gravíssima com duas ou mais) e condição econômica do infrator (art. 278, caput, e art. 281, parágrafo único). A lei só dá teto, sem piso."
        },
        "taxa": {
            "norma": "Portaria 163/DIPRE/FVS-RCP",
            "normaCompleta": "Portaria nº 163/DIPRE/FVS-RCP, de 23/12/2025 (DOE-AM 23/12/2025), com base nos arts. 299 a 301 da LC 70/2009",
            "url": "https://www.fvs.am.gov.br/media/publicacao/PORTARIA_N%C2%BA_163-DIPRE-FVS-RCP_-_Atualizacao_das_Taxas_2026.pdf",
            "onde": "Anexo I (Taxa de Fiscalização de Vigilância em Saúde), item 1; Anexo II (taxa de deslocamento por regional)",
            "comoCalcula": "Licença sanitária de funcionamento cobrada por porte, pelo faturamento anual, com renovação bianual; não varia por CNAE nem por risco. Vistoria de prédio e análise de projeto são cobradas à parte (projeto por faixa de área). Fora de Manaus e entorno soma-se a taxa de deslocamento da regional. Reajuste anual pela SELIC do ano anterior (art. 4º).",
            "ano": 2026,
            "tabela": [
                {
                    "criterio": "Faturamento anual acima de R$ 50 milhões",
                    "valor": "R$ 5.756,63"
                },
                {
                    "criterio": "Acima de R$ 20 milhões até R$ 50 milhões",
                    "valor": "R$ 4.797,18"
                },
                {
                    "criterio": "Acima de R$ 6 milhões até R$ 20 milhões",
                    "valor": "R$ 3.837,75"
                },
                {
                    "criterio": "Até R$ 6 milhões",
                    "valor": "R$ 2.878,30"
                },
                {
                    "criterio": "ME e EPP (art. 3º, I e II, da LC 123/2006)",
                    "valor": "R$ 959,43"
                },
                {
                    "criterio": "MEI e empresa de agricultura familiar",
                    "valor": "Isenta"
                },
                {
                    "criterio": "Vistoria de prédio",
                    "valor": "R$ 575,66"
                },
                {
                    "criterio": "Vistoria prévia do projeto arquitetônico",
                    "valor": "R$ 211,07 (até 40 m²) a R$ 1.404,60 (acima de 270 m²)"
                },
                {
                    "criterio": "Deslocamento, regional que inclui Manaus",
                    "valor": "R$ 170,30"
                }
            ],
            "porCnae": null
        },
        "notas": [
            "O Amazonas tem tabela própria (Anexo IV da RN 01/2021), montada sobre a RDC 153/2017, a IN Anvisa 66/2020 e a Resolução CGSIM 62/2020, citadas nos considerandos; para o Risco I o art. 8º manda manter a definição do CGSIM. Ponto decisivo: pelo art. 2º, § 1º, a tabela estadual só vale onde o município não tem classificação própria. Manaus tem, no Decreto Municipal 4.648/2019 (Anexo VI), e ele diverge bastante: lá fisioterapia, nutrição, psicologia, TO, fono, práticas integrativas, acupuntura, podologia, consulta médica (8630-5/03), alimentação (5611, 5620-1/02 a /04), comércio de alimentos e padaria de produção própria são Baixo Risco B; enfermagem, 8650-0/99 e estética (9602-5/02) são Risco Condicionado; 8230-0/02 e 8211-3/00 são Baixo Risco A. Os valores de Manaus estão no campo extra \"manaus\" de cada item. As ações de risco I e II cabem aos municípios (art. 1º, III); alto risco é pactuado na CIB-AM (Resolução CIB-AM 087/2022, que baixei, mas é PDF de imagem sem texto extraível, então não li). A lista de RISCO III que exige Projeto Básico de Arquitetura fica em Nota Técnica da FVS-RCP (art. 13, VI).",
            "Multa estadual: só tenho os tetos nominais de 2009. A lei manda corrigir todo ano pela SELIC, por portaria; não achei a de 2026, então os valores reais de hoje são maiores.",
            "A taxa estadual só vale para o que a FVS-RCP licencia (alto risco pactuado). Em Manaus quem licencia é a VISA municipal, e vale a TVS da LC 10/2018. A LC 10/2018 também tem multas tributárias próprias, separadas da multa sanitária: 40 UFM por funcionar sem a TVS lançada (art. 14) e 20 UFM por não atualizar o cadastro (art. 19).",
            "Uma apresentação da VISA Manaus no Simbravisa 2025 diz que a licença sanitária \"atualmente é gratuita\". Não li esse documento; se for verdade, deve tratar do documento de licença, não da TVS, que a LC 10/2018 manda cobrar todo ano."
        ]
    },
    {
        "id": "ba",
        "titulo": "Bahia",
        "uf": "BA",
        "municipio": null,
        "normas": [
            {
                "nome": "Portaria SESAB nº 101, de 24 de março de 2020. Dispõe sobre a classificação de grau de risco das atividades econômicas para fins de licenciamento sanitário no âmbito do Estado da Bahia, nos termos da Lei da Liberdade Econômica. DOE-BA 7/4/2020.",
                "url": "https://www.legisweb.com.br/legislacao/?id=392599",
                "vigencia": "Em vigor desde a publicação (DOE-BA 7/4/2020); revogou a Portaria SESAB 1.354/2018. Continua listada na página de legislação da SUVISA/DIVISA (ba.gov.br/saude/suvisa/vigilancia-sanitaria/legislacoes), com o PDF em .../uploads/2021/06/PORTARIA-No-101.-de-24-de-marco-de-2020.pdf. Não achei norma posterior que a revogue.",
                "comoConferiu": "Baixei o texto integral do LegisWeb com curl e li os anexos linha a linha (grep de cada CNAE). Conferi que a página de legislação da SESAB ainda lista a portaria."
            },
            {
                "nome": "Decreto nº 24.038, de 8 de outubro de 2025. Regulamenta a Lei 14.878/2025 (Código de Vigilância em Saúde da Bahia).",
                "url": "https://www.legisweb.com.br/legislacao/?id=484721",
                "vigencia": "Publicado em outubro de 2025.",
                "comoConferiu": "Baixei com curl e li os arts. 87, 89 e 90. Não traz lista por CNAE: o art. 89, § 1º remete a classificação à regulamentação própria da autoridade sanitária; não cita nem revoga a Portaria 101/2020."
            }
        ],
        "semClassificacao": "A Portaria 101/2020 não diz expressamente o que acontece com CNAE que não está nos anexos. O único dispositivo genérico é o art. 13: qualquer serviço, produto ou atividade que possa trazer risco à saúde fica sujeito a monitoramento da VISA, haja ou não obrigação de licenciamento. 8211-3/00 e 8230-0/02 não aparecem em nenhum anexo.",
        "multa": {
            "norma": "Lei estadual 14.878/2025",
            "normaCompleta": "Lei estadual BA 14.878/2025 (Código de Vigilância em Saúde do Estado da Bahia), regulamentada pelo Decreto 24.038/2025",
            "url": "https://www.legisweb.com.br/legislacao/?id=484722",
            "onde": "Art. 244, § 2º (valores); art. 240 (classificação leve, grave, gravíssima)",
            "unidade": "R$",
            "valorUnidade": null,
            "anoUnidade": null,
            "faixas": {
                "leve": {
                    "min": 2000,
                    "max": 20000
                },
                "grave": {
                    "min": 20000,
                    "max": 100000
                },
                "gravissima": {
                    "min": 100000,
                    "max": 250000
                }
            },
            "dependeDe": "Gravidade (art. 240: leve com atenuante, grave com uma agravante, gravíssima com mais de uma) e porte da empresa, que fixa o teto dentro da faixa: leve até R$ 5.000 (MEI), 10.000 (EPP), 15.000 (médio porte), 20.000 (grande porte); grave até 30.000, 50.000, 75.000, 100.000; gravíssima até 120.000, 150.000, 200.000, 250.000."
        },
        "taxa": {
            "norma": "Lei estadual 11.631/2009",
            "normaCompleta": "Lei estadual BA 11.631/2009 (taxas estaduais), Anexo I, item 2 (Secretaria da Saúde), na redação da Lei 13.592/2016",
            "url": "https://www.legisweb.com.br/legislacao/?id=332336",
            "onde": "Anexo I, item 2.1 (Licença anual para funcionamento) e 2.2 (Vistoria ou inspeção sanitária), notas 1 a 3",
            "comoCalcula": "Valor fixo em reais por atividade (licença anual de funcionamento), somado por atividade exercida, exceto unidade hospitalar (nota 1), com teto de R$ 6.000,00 para os itens 2.1.13 a 2.1.15; cobrança por endereço (nota 2). A vistoria/inspeção (2.2) é cobrada à parte: R$ 500 (itens 2.1.1 a 2.1.7), R$ 200 (2.1.8, varejo), R$ 400 (2.1.9 a 2.1.14), R$ 300 (2.1.15 e 2.1.16). Não varia por grau de risco, varia pela atividade.",
            "ano": 2016,
            "tabela": [
                {
                    "criterio": "Serviço ambulatorial com procedimentos cirúrgicos ou exames complementares; clínica odontológica; laboratório clínico",
                    "valor": "R$ 1.324,00"
                },
                {
                    "criterio": "Consultório odontológico",
                    "valor": "R$ 1.200,00"
                },
                {
                    "criterio": "Ambulatorial restrito a consultas; fisioterapia; enfermagem, nutrição, psicologia, TO, fono; práticas integrativas; clínicas e residências geriátricas",
                    "valor": "R$ 882,00"
                },
                {
                    "criterio": "Serviços de beleza e estética; salão, manicure e pedicure",
                    "valor": "R$ 665,00"
                },
                {
                    "criterio": "Acupuntura; RPG",
                    "valor": "R$ 500,00"
                },
                {
                    "criterio": "Tatuagem e piercing",
                    "valor": "R$ 400,00"
                },
                {
                    "criterio": "Indústria de alimento",
                    "valor": "R$ 1.370,00"
                },
                {
                    "criterio": "Varejo: supermercado",
                    "valor": "R$ 780,00"
                },
                {
                    "criterio": "Restaurante, lanchonete, bufê, padaria sem predominância de revenda",
                    "valor": "R$ 430,00"
                },
                {
                    "criterio": "Bares; cantina; alimentos para consumo domiciliar; alimentos para empresas; minimercado",
                    "valor": "R$ 388,00"
                },
                {
                    "criterio": "Carnes, hortifruti, bebidas, doces, laticínios; peixaria; conveniência",
                    "valor": "R$ 195,00"
                },
                {
                    "criterio": "Vistoria ou inspeção sanitária (2.2)",
                    "valor": "R$ 200,00 a R$ 500,00 conforme o grupo"
                }
            ],
            "porCnae": {
                "8630-5/01": "R$ 1.324,00 (2.1.13.9)",
                "8630-5/02": "R$ 1.324,00 (2.1.13.8)",
                "8630-5/03": "R$ 882,00 (2.1.13.10)",
                "8630-5/04": "R$ 1.324,00 clínica / R$ 1.200,00 consultório (2.1.13.14 e 2.1.13.15)",
                "8650-0/01": "R$ 882,00 (2.1.13.38)",
                "8650-0/02": "R$ 882,00 (2.1.13.38)",
                "8650-0/03": "R$ 882,00 (2.1.13.38)",
                "8650-0/05": "R$ 882,00 (2.1.13.38)",
                "8650-0/06": "R$ 882,00 (2.1.13.38)",
                "8650-0/04": "R$ 882,00 (2.1.13.6)",
                "8690-9/01": "R$ 882,00 (2.1.13.11)",
                "8690-9/03": "R$ 500,00 (2.1.13.30)",
                "9602-5/02": "R$ 665,00 (2.1.15.2.2)",
                "9602-5/01": "R$ 665,00 (2.1.15.2.4)",
                "9609-2/06": "R$ 400,00 (2.1.15.20)",
                "8711-5/01": "R$ 882,00 (2.1.13.17)",
                "5611-2/01": "R$ 430,00 (2.1.8.6)",
                "5611-2/03": "R$ 430,00 (2.1.8.6)",
                "5620-1/02": "R$ 430,00 (2.1.8.6)",
                "1091-1/02": "R$ 430,00 (2.1.8.6, padaria sem predominância de revenda)",
                "5611-2/04": "R$ 388,00 (2.1.8.5)",
                "5611-2/05": "R$ 388,00 (2.1.8.5)",
                "5620-1/01": "R$ 388,00 (2.1.8.5)",
                "5620-1/03": "R$ 388,00 (2.1.8.5)",
                "5620-1/04": "R$ 388,00 (2.1.8.5)",
                "4711-3/02": "R$ 780,00 (2.1.8.2)",
                "4712-1/00": "R$ 388,00 (2.1.8.3)",
                "4724-5/00": "R$ 195,00 (2.1.8.7)",
                "4722-9/01": "R$ 195,00 (2.1.8.7)",
                "4722-9/02": "R$ 195,00 (2.1.8.8)",
                "1053-8/00": "R$ 1.370,00 (2.1.2, indústria de alimento)",
                "1099-6/99": "R$ 1.370,00 (2.1.2, indústria de alimento)"
            }
        },
        "notas": [
            "A Bahia tem lista própria, montada sobre a IN Anvisa 16/2017 (citada nos considerandos), não sobre a IN 66/2020. Mesmo assim, nesta lista de 39 CNAE ela coincide com a IN 66 em quase tudo, inclusive a pergunta 46 (procedimento invasivo) para 8630-5/03, 8650-0/01, 8650-0/99 e 9602-5/02. Diferenças: nutrição, psicologia, terapia ocupacional, fonoaudiologia e práticas integrativas (8650-0/02, /03, /05, /06 e 8690-9/01) são baixo risco ou nível de risco I na Bahia, dispensados de alvará, e médio risco na IN 66; bares 5611-2/04 e 5611-2/05 são médio risco na Bahia e não constam na IN 66. Competência: alto risco é pactuado na CIB; os CNAE dos Anexos VII e VIII (8630-5/01, /02, /04, 8711-5/02, 9609-2/06 e 9602-5/02, entre os desta lista) seguem com a VISA municipal; baixo e médio risco são sempre do município (art. 12, § 2º). Município pode editar norma suplementar (art. 14), então Salvador e outros podem ter regra própria; não pesquisei. O Decreto 24.038/2025 prevê portaria nova da SESAB sobre alvará de 24 ou 36 meses conforme o risco, que não localizei. A comparação com a IN 66 foi feita no texto do PDF da IN 66 já presente em scratchpad/risco/in66.",
            "A taxa estadual é a do DAE da SESAB/DIVISA. Ela só se aplica onde quem licencia é o Estado; onde a VISA municipal licencia (baixo e médio risco sempre, e os CNAE dos Anexos VII e VIII da Portaria SESAB 101/2020), vale a taxa municipal.",
            "porCnae: 8640-2/99, 8650-0/99, 8690-9/04 (podologia), 8711-5/02 (ILPI), 4721-1/02, 8211-3/00 e 8230-0/02 ficaram de fora porque a tabela não tem linha que eu possa ligar sem adivinhar. A tabela tem \"Produtos alimentícios em geral ou especializado... não especificados anteriormente\" por R$ 400,00, que pode servir a 4721-1/02, mas não está nomeado.",
            "Valores de 2016 em reais fixos: não achei lei ou portaria que os tenha corrigido depois. Vale conferir o DAE de 2026 no site da SEFAZ-BA.",
            "Salvador não pesquisado a fundo: a busca mostrou que a taxa municipal é a TVS do Anexo IX da Lei municipal 7.186/2006 (alterada pelas Leis 7.611/2008, 7.727/2009 e 7.995/2011), mas não abri a tabela vigente nem o código sanitário municipal."
        ]
    },
    {
        "id": "federal",
        "titulo": "Federal (IN Anvisa 66/2020)",
        "uf": null,
        "municipio": null,
        "normas": [
            {
                "nome": "Instrução Normativa Anvisa nº 66/2020",
                "url": "https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2020/in066_1%C2%B0_09_2020.pdf",
                "vigencia": "vigente; pelo art. 7º só vale onde estado e município não têm classificação própria",
                "comoConferiu": "PDF oficial do Saúde Legis, anexos I a IV"
            }
        ],
        "semClassificacao": "8211-3/00, 5611-2/04, 5611-2/05 e 8230-0/02 não constam da IN 66. O nível I é definido em resolução do CGSIM (art. 5º).",
        "multa": {
            "norma": "Lei 6.437/1977",
            "normaCompleta": "Lei nº 6.437/1977",
            "url": "https://www.planalto.gov.br/ccivil_03/leis/l6437.htm",
            "onde": "art. 2º, § 1º, na redação da MP 2.190-34/2001",
            "unidade": "R$",
            "valorUnidade": null,
            "anoUnidade": null,
            "faixas": {
                "leve": {
                    "min": 2000,
                    "max": 75000
                },
                "grave": {
                    "min": 75000,
                    "max": 200000
                },
                "gravissima": {
                    "min": 200000,
                    "max": 1500000
                }
            },
            "dependeDe": "Gravidade e capacidade econômica do infrator; em dobro na reincidência (§ 2º)"
        },
        "taxa": null,
        "notas": [
            "Pergunta 46 decide os quatro do Anexo III.",
            "Taxa: a Anvisa não licencia serviço de saúde nem comércio de alimento; a taxa é a do estado ou do município que emite a licença."
        ]
    }
];
export const RISCO_CNAE = {
    "rio-capital": {
        "8630-5/01": {
            "risco": "Alto",
            "complexidade": "Média",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.58 (p. 49 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021 (1.1.58 'Serviço assistencial de saúde ambulatorial com recursos para realização de procedimentos invasivo'). Se for hospital-dia, a 221-N tem o item 1.1.99, também Média/Alto. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "8630-5/02": {
            "risco": "Alto",
            "complexidade": "Grande",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.59 (p. 49 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "8630-5/03": {
            "risco": "Baixo",
            "complexidade": "Pequena",
            "condicao": "Sem procedimento invasivo: item 1.1.55, Pequena/Baixo. Com procedimento invasivo: item 1.1.58, Média/Alto.",
            "opcoes": [
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Baixo",
                    "complexidade": "Pequena",
                    "invasivo": false
                },
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto",
                    "complexidade": "Média",
                    "invasivo": true
                }
            ],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.55 (p. 49 do PDF consolidado); item 1.1.58 (p. 49 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "8630-5/04": {
            "risco": "Alto",
            "complexidade": "Pequena",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.57 (p. 49 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021 ('Clínica odontológica'). Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "8650-0/01": {
            "risco": null,
            "complexidade": null,
            "condicao": "Profissional sem procedimento invasivo: item 1.1.87, Mínima/Baixo. Com procedimento invasivo: item 1.1.85, Pequena/Alto. Se for serviço ambulatorial (clínica), vale 1.1.55 (Pequena/Baixo) ou 1.1.58 (Média/Alto).",
            "opcoes": [
                {
                    "se": "profissional, sem procedimento invasivo",
                    "risco": "Baixo",
                    "complexidade": "Mínima",
                    "invasivo": false
                },
                {
                    "se": "profissional, com procedimento invasivo",
                    "risco": "Alto",
                    "complexidade": "Pequena",
                    "invasivo": true
                },
                {
                    "se": "clínica, sem procedimento invasivo",
                    "risco": "Baixo",
                    "complexidade": "Pequena",
                    "invasivo": false
                },
                {
                    "se": "clínica, com procedimento invasivo",
                    "risco": "Alto",
                    "complexidade": "Média",
                    "invasivo": true
                }
            ],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.85 (p. 50 do PDF consolidado); item 1.1.87 (p. 51 do PDF consolidado); item 1.1.55 (p. 49 do PDF consolidado); item 1.1.58 (p. 49 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "8650-0/99": {
            "risco": null,
            "complexidade": null,
            "condicao": "Sem procedimento invasivo: item 1.1.87, Mínima/Baixo. Com procedimento invasivo: item 1.1.85, Pequena/Alto.",
            "opcoes": [
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Baixo",
                    "complexidade": "Mínima",
                    "invasivo": false
                },
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto",
                    "complexidade": "Pequena",
                    "invasivo": true
                }
            ],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.85 (p. 50 do PDF consolidado); item 1.1.87 (p. 51 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "8650-0/04": {
            "risco": null,
            "complexidade": null,
            "condicao": "Consultório sem procedimento invasivo: item 1.1.87, Mínima/Baixo. Com procedimento invasivo: item 1.1.85, Pequena/Alto. Se for serviço de reabilitação: item 1.1.82, Média/Alto.",
            "opcoes": [
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Baixo",
                    "complexidade": "Mínima",
                    "invasivo": false
                },
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto",
                    "complexidade": "Pequena",
                    "invasivo": true
                },
                {
                    "se": "serviço de reabilitação",
                    "risco": "Alto",
                    "complexidade": "Média",
                    "invasivo": null
                }
            ],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.85 (p. 50 do PDF consolidado); item 1.1.87 (p. 51 do PDF consolidado); item 1.1.82 (p. 50 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "8650-0/02": {
            "risco": null,
            "complexidade": null,
            "condicao": "Sem procedimento invasivo: item 1.1.87, Mínima/Baixo. Com procedimento invasivo: item 1.1.85, Pequena/Alto.",
            "opcoes": [
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Baixo",
                    "complexidade": "Mínima",
                    "invasivo": false
                },
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto",
                    "complexidade": "Pequena",
                    "invasivo": true
                }
            ],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.85 (p. 50 do PDF consolidado); item 1.1.87 (p. 51 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "8650-0/03": {
            "risco": "Baixo",
            "complexidade": "Mínima",
            "condicao": "Psicologia não faz procedimento invasivo: item 1.1.87 (Mínima/Baixo). Se houvesse, 1.1.85 (Pequena/Alto).",
            "opcoes": [
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Baixo",
                    "complexidade": "Mínima",
                    "invasivo": false
                },
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto",
                    "complexidade": "Pequena",
                    "invasivo": true
                }
            ],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.87 (p. 51 do PDF consolidado); item 1.1.85 (p. 50 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "8640-2/99": {
            "risco": "Alto",
            "complexidade": "Médio",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.67 (p. 49 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021 ('Serviço de complementação diagnóstica e terapêutica e congêneres; exceto por registro gráfico'; a tabela escreve 'Médio'). Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "9602-5/02": {
            "risco": null,
            "complexidade": "Pequena",
            "condicao": "Sem procedimento invasivo: item 1.1.93 da 221-N ('Serviço de Embelezamento e estética sem procedimento invasivo'), Pequena/Baixo. Com procedimento invasivo: item 1.1.94 da 221-N ('Serviço de estética, com procedimento invasivo'), Pequena/Alto. No texto original do 45.585 o 1.1.94 era só 'Serviço de estética, instituto de beleza', Pequena/Baixo, sem a divisão.",
            "opcoes": [
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Baixo",
                    "complexidade": "Pequena",
                    "invasivo": false
                },
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto",
                    "complexidade": "Pequena",
                    "invasivo": true
                }
            ],
            "norma": "Portaria S/IVISA-Rio 221-N/2021",
            "onde": "Anexo da Portaria S/IVISA-RIO 221-N/2021, itens 1.1.93 e 1.1.94; no 45.585 consolidado, item 1.1.94 (p. 51). Correspondência por descrição.",
            "provisorio": true,
            "segueFederal": false
        },
        "9602-5/01": {
            "risco": "Baixo",
            "complexidade": "Pequena",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, itens 1.1.90 ('manicure, pedicuro, calista...') e 1.1.93 ('Salão de cabeleireiro barbearia' no 45.585, p. 51; virou 'Serviço de Embelezamento e estética sem procedimento invasivo' na 221-N). Ambos Pequena/Baixo. Correspondência por descrição.",
            "provisorio": true,
            "segueFederal": false
        },
        "9609-2/06": {
            "risco": "Alto",
            "complexidade": "Pequena",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.89 (p. 51 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "8690-9/01": {
            "risco": null,
            "complexidade": null,
            "condicao": "Sem procedimento invasivo: item 1.1.87, Mínima/Baixo (ou 1.1.91 massoterapia, Pequena/Baixo). Com procedimento invasivo: item 1.1.85, Pequena/Alto.",
            "opcoes": [
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Baixo",
                    "complexidade": "Mínima",
                    "invasivo": false
                },
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto",
                    "complexidade": "Pequena",
                    "invasivo": true
                },
                {
                    "se": "massoterapia",
                    "risco": "Baixo",
                    "complexidade": "Pequena",
                    "invasivo": null
                }
            ],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.85 (p. 50 do PDF consolidado); item 1.1.87 (p. 51 do PDF consolidado); item 1.1.91 (p. 51 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "8690-9/03": {
            "risco": null,
            "complexidade": null,
            "condicao": "A tabela não cita acupuntura. Com procedimento invasivo (agulha): item 1.1.85, Pequena/Alto. Sem procedimento invasivo: item 1.1.87, Mínima/Baixo.",
            "opcoes": [
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Baixo",
                    "complexidade": "Mínima",
                    "invasivo": false
                },
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto",
                    "complexidade": "Pequena",
                    "invasivo": true
                }
            ],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.85 (p. 50 do PDF consolidado); item 1.1.87 (p. 51 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "8690-9/04": {
            "risco": null,
            "complexidade": null,
            "condicao": "A tabela não cita podologia. Como atividade de saúde com procedimento invasivo: item 1.1.85 ou 1.1.86, Pequena/Alto. Sem procedimento invasivo: 1.1.87 ou 1.1.88, Mínima/Baixo. O item 1.1.90 ('pedicuro, calista') é Pequena/Baixo.",
            "opcoes": [
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Baixo",
                    "complexidade": "Mínima",
                    "invasivo": false
                },
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto",
                    "complexidade": "Pequena",
                    "invasivo": true
                },
                {
                    "se": "como pedicuro ou calista",
                    "risco": "Baixo",
                    "complexidade": "Pequena",
                    "invasivo": null
                }
            ],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.85 (p. 50 do PDF consolidado); item 1.1.86 (p. 50 do PDF consolidado); item 1.1.88 (p. 51 do PDF consolidado); item 1.1.90 (p. 51 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "8650-0/05": {
            "risco": null,
            "complexidade": null,
            "condicao": "Sem procedimento invasivo: item 1.1.87, Mínima/Baixo. Com procedimento invasivo: item 1.1.85, Pequena/Alto. Se for serviço de reabilitação: 1.1.82, Média/Alto.",
            "opcoes": [
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Baixo",
                    "complexidade": "Mínima",
                    "invasivo": false
                },
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto",
                    "complexidade": "Pequena",
                    "invasivo": true
                },
                {
                    "se": "serviço de reabilitação",
                    "risco": "Alto",
                    "complexidade": "Média",
                    "invasivo": null
                }
            ],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.85 (p. 50 do PDF consolidado); item 1.1.87 (p. 51 do PDF consolidado); item 1.1.82 (p. 50 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "8650-0/06": {
            "risco": null,
            "complexidade": null,
            "condicao": "Sem procedimento invasivo: item 1.1.87, Mínima/Baixo. Com procedimento invasivo: item 1.1.85, Pequena/Alto.",
            "opcoes": [
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Baixo",
                    "complexidade": "Mínima",
                    "invasivo": false
                },
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto",
                    "complexidade": "Pequena",
                    "invasivo": true
                }
            ],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.85 (p. 50 do PDF consolidado); item 1.1.87 (p. 51 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "8711-5/02": {
            "risco": "Alto",
            "complexidade": "Média",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.81 (p. 50 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "8711-5/01": {
            "risco": "Alto",
            "complexidade": "Média",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.81 (p. 50 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "5611-2/01": {
            "risco": "Baixo",
            "complexidade": "Média",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.32 (p. 47 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "5611-2/03": {
            "risco": "Baixo",
            "complexidade": "Pequena",
            "condicao": "Lanchonete, pastelaria, pizzaria: item 1.1.27, Pequena/Baixo. Casa de chá, sucos, cafeteria, sorveteria: item 1.1.26, Mínima/Baixo.",
            "opcoes": [
                {
                    "se": "lanchonete, pastelaria ou pizzaria",
                    "risco": "Baixo",
                    "complexidade": "Pequena",
                    "invasivo": null
                },
                {
                    "se": "casa de chá, de sucos, cafeteria ou sorveteria",
                    "risco": "Baixo",
                    "complexidade": "Mínima",
                    "invasivo": null
                }
            ],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.27 (p. 46 do PDF consolidado); item 1.1.26 (p. 46 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "5611-2/04": {
            "risco": "Baixo",
            "complexidade": "Pequena",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.27 (p. 46 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021 (bar, botequim, choperia...). Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "5611-2/05": {
            "risco": "Baixo",
            "complexidade": "Pequena",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.27 (p. 46 do PDF consolidado); item 1.1.16 (p. 46 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021 (boate, danceteria em 1.1.27; casa de shows em 1.1.16; ambos Pequena/Baixo). Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "1091-1/02": {
            "risco": "Baixo",
            "complexidade": "Média",
            "condicao": "Padaria e confeitaria: item 1.1.30, Média/Baixo. Se for indústria de alimentos: item 1.1.40, Grande/Alto.",
            "opcoes": [
                {
                    "se": "padaria e confeitaria",
                    "risco": "Baixo",
                    "complexidade": "Média",
                    "invasivo": null
                },
                {
                    "se": "indústria de alimentos",
                    "risco": "Alto",
                    "complexidade": "Grande",
                    "invasivo": null
                }
            ],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.30 (p. 47 do PDF consolidado); item 1.1.40 (p. 48 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "4721-1/02": {
            "risco": "Baixo",
            "complexidade": "Média",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.30 (p. 47 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "4711-3/02": {
            "risco": "Baixo",
            "complexidade": "Máxima",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.37 (p. 47 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "4712-1/00": {
            "risco": "Baixo",
            "complexidade": "Média",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.36 (p. 47 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021 ('...mercado, mercearia e congêneres'). Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "4724-5/00": {
            "risco": "Baixo",
            "complexidade": "Pequena",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.28 (p. 47 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "4722-9/01": {
            "risco": "Baixo",
            "complexidade": "Média",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.31 (p. 47 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "4722-9/02": {
            "risco": "Baixo",
            "complexidade": "Média",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.31 (p. 47 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "5620-1/04": {
            "risco": "Alto",
            "complexidade": "Média",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.34 (p. 47 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "5620-1/02": {
            "risco": "Baixo",
            "complexidade": "Média",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.33 (p. 47 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "8230-0/02": {
            "risco": "Baixo",
            "complexidade": "Pequena",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.16 (p. 46 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021 ('Casa de shows e espetáculos, serviço de diversão, casa de festa...'). Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "5620-1/01": {
            "risco": "Alto",
            "complexidade": "Média",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.35 (p. 47 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "5620-1/03": {
            "risco": "Baixo",
            "complexidade": "Pequena",
            "condicao": "A tabela cita 'cantina' no item 1.1.27 (Pequena/Baixo). Se a cantina for cozinha que fornece para empresa, cabe o item 1.1.35 (Média/Alto).",
            "opcoes": [
                {
                    "se": "cantina",
                    "risco": "Baixo",
                    "complexidade": "Pequena",
                    "invasivo": null
                },
                {
                    "se": "cozinha que fornece para empresa",
                    "risco": "Alto",
                    "complexidade": "Média",
                    "invasivo": null
                }
            ],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.27 (p. 46 do PDF consolidado); item 1.1.35 (p. 47 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "1053-8/00": {
            "risco": "Alto",
            "complexidade": "Grande",
            "condicao": "Indústria de sorvetes: item 1.1.40, Grande/Alto. Sorveteria de varejo: item 1.1.26, Mínima/Baixo.",
            "opcoes": [
                {
                    "se": "indústria de sorvetes",
                    "risco": "Alto",
                    "complexidade": "Grande",
                    "invasivo": null
                },
                {
                    "se": "sorveteria de varejo",
                    "risco": "Baixo",
                    "complexidade": "Mínima",
                    "invasivo": null
                }
            ],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.40 (p. 48 do PDF consolidado); item 1.1.26 (p. 46 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021. Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        },
        "1099-6/99": {
            "risco": "Alto",
            "complexidade": "Grande",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Rio 45.585/2018",
            "onde": "Anexo I, item 1.1.40 (p. 48 do PDF consolidado). Mesmo valor na Portaria S/IVISA-RIO 221-N/2021 ('Indústria de alimentos, gêneros alimentícios...'). Correspondência CNAE→item feita por descrição: o anexo não traz código CNAE.",
            "provisorio": true,
            "segueFederal": false
        }
    },
    "rj-estado": {
        "8630-5/01": {
            "risco": "Alto risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo I (alto risco) da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/02": {
            "risco": "Alto risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo I (alto risco) da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/03": {
            "risco": null,
            "complexidade": null,
            "condicao": "Pergunta do Anexo IV: 'Haverá no exercício da atividade a realização de procedimentos invasivos?' SIM: Alto risco. NÃO: Médio risco (\"risco B\").",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto risco",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo IV da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/04": {
            "risco": "Alto risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo I (alto risco) da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/01": {
            "risco": null,
            "complexidade": null,
            "condicao": "Anexo IV: procedimentos invasivos? SIM: Alto risco. NÃO: Médio risco (\"risco B\").",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto risco",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo IV da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/99": {
            "risco": null,
            "complexidade": null,
            "condicao": "Anexo IV: procedimentos invasivos? SIM: Alto risco. NÃO: Médio risco (\"risco B\").",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto risco",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo IV da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/04": {
            "risco": "Baixo risco",
            "complexidade": null,
            "condicao": "Pela 2.191 (Anexos III e IV): 1) centro ou núcleo de reabilitação física? SIM: Alto risco; 2) consultório isolado com procedimento invasivo? SIM: Médio risco; NÃO às duas: Baixo risco (\"risco A\"). A notícia da SES-RJ (Conass, 11/05/2026) inclui este CNAE entre os 39 reclassificados para baixo risco pela Res. SES 4.001/2026. O anexo da 4.001 não foi aberto, então não se sabe se as condições da 2.191 continuam. Perguntas da Res. 2.191. A Res. 4.001 pôs este CNAE em baixo risco e não se sabe se as perguntas continuam.",
            "opcoes": [
                {
                    "se": "centro ou núcleo de reabilitação física",
                    "risco": "Alto risco",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "consultório isolado com procedimento invasivo",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "consultório isolado sem procedimento invasivo",
                    "risco": "Baixo risco, \"risco A\"",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Resolução SES-RJ 4.001/2026",
            "onde": "Notícia SES-RJ/Conass sobre a Res. 4.001 (8650004); Anexos III e IV da 2.191",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/02": {
            "risco": "Baixo risco",
            "complexidade": null,
            "condicao": "Pela 2.191: 1) clínica ou centro de nutrição? SIM: Alto risco; 2) consultório isolado com procedimento invasivo? SIM: Médio risco; NÃO às duas: Baixo risco. A notícia da SES-RJ (Conass, 11/05/2026) inclui este CNAE entre os 39 reclassificados para baixo risco pela Res. SES 4.001/2026. O anexo da 4.001 não foi aberto, então não se sabe se as condições da 2.191 continuam. Perguntas da Res. 2.191. A Res. 4.001 pôs este CNAE em baixo risco e não se sabe se as perguntas continuam.",
            "opcoes": [
                {
                    "se": "clínica ou centro de nutrição",
                    "risco": "Alto risco",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "consultório isolado com procedimento invasivo",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "consultório isolado sem procedimento invasivo",
                    "risco": "Baixo risco, \"risco A\"",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Resolução SES-RJ 4.001/2026",
            "onde": "Notícia SES-RJ/Conass sobre a Res. 4.001 (8650002); Anexos III e IV da 2.191",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/03": {
            "risco": "Baixo risco",
            "complexidade": null,
            "condicao": "Pela 2.191: 1) clínica ou centro de psicologia e psicanálise? SIM: Alto risco; 2) consultório isolado com procedimento invasivo? SIM: Médio risco; NÃO às duas: Baixo risco. A notícia da SES-RJ (Conass, 11/05/2026) inclui este CNAE entre os 39 reclassificados para baixo risco pela Res. SES 4.001/2026. O anexo da 4.001 não foi aberto, então não se sabe se as condições da 2.191 continuam. Perguntas da Res. 2.191. A Res. 4.001 pôs este CNAE em baixo risco e não se sabe se as perguntas continuam.",
            "opcoes": [
                {
                    "se": "clínica ou centro de psicologia e psicanálise",
                    "risco": "Alto risco",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "consultório isolado com procedimento invasivo",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "consultório isolado sem procedimento invasivo",
                    "risco": "Baixo risco, \"risco A\"",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Resolução SES-RJ 4.001/2026",
            "onde": "Notícia SES-RJ/Conass sobre a Res. 4.001 (8650003); Anexos III e IV da 2.191",
            "provisorio": false,
            "segueFederal": false
        },
        "8640-2/99": {
            "risco": "Alto risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo I (alto risco) da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/02": {
            "risco": null,
            "complexidade": null,
            "condicao": "Anexo IV: 'Haverá no exercício da atividade a realização de procedimentos invasivos?' SIM: Médio risco (\"risco B\"). NÃO: Baixo risco (\"risco A\"). Anexo III: baixo risco 'desde que ... diferente de realização de procedimentos invasivos'.",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Baixo risco, \"risco A\"",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexos III e IV da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/01": {
            "risco": "Baixo risco",
            "complexidade": null,
            "condicao": "Pela 2.191 (Anexo IV): 'utilização de materiais perfuro cortantes não descartáveis?' SIM: Médio risco; NÃO: Baixo risco. A notícia da SES-RJ (Conass, 11/05/2026) inclui este CNAE entre os 39 reclassificados para baixo risco pela Res. SES 4.001/2026. O anexo da 4.001 não foi aberto, então não se sabe se as condições da 2.191 continuam. Perguntas da Res. 2.191. A Res. 4.001 pôs este CNAE em baixo risco e não se sabe se as perguntas continuam.",
            "opcoes": [
                {
                    "se": "usa material perfurocortante não descartável",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "só material descartável",
                    "risco": "Baixo risco, \"risco A\"",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Resolução SES-RJ 4.001/2026",
            "onde": "Notícia SES-RJ/Conass sobre a Res. 4.001 (9602501); Anexos III e IV da 2.191",
            "provisorio": false,
            "segueFederal": false
        },
        "9609-2/06": {
            "risco": "Alto risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo I (alto risco) da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/01": {
            "risco": "Médio risco, \"risco B\" ou moderado",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo II (médio risco, \"risco B\" ou moderado) da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/03": {
            "risco": "Médio risco, \"risco B\" ou moderado",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo II (médio risco, \"risco B\" ou moderado) da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/04": {
            "risco": "Médio risco, \"risco B\" ou moderado",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo II (médio risco, \"risco B\" ou moderado) da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/05": {
            "risco": "Baixo risco",
            "complexidade": null,
            "condicao": "Pela 2.191: 1) clínica ou centro de terapia ocupacional? SIM: Alto risco; 2) consultório isolado com procedimento invasivo? SIM: Médio risco; NÃO às duas: Baixo risco. A notícia da SES-RJ (Conass, 11/05/2026) inclui este CNAE entre os 39 reclassificados para baixo risco pela Res. SES 4.001/2026. O anexo da 4.001 não foi aberto, então não se sabe se as condições da 2.191 continuam. Perguntas da Res. 2.191. A Res. 4.001 pôs este CNAE em baixo risco e não se sabe se as perguntas continuam.",
            "opcoes": [
                {
                    "se": "clínica ou centro de terapia ocupacional",
                    "risco": "Alto risco",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "consultório isolado com procedimento invasivo",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "consultório isolado sem procedimento invasivo",
                    "risco": "Baixo risco, \"risco A\"",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Resolução SES-RJ 4.001/2026",
            "onde": "Notícia SES-RJ/Conass sobre a Res. 4.001 (8650005); Anexos III e IV da 2.191",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/06": {
            "risco": "Baixo risco",
            "complexidade": null,
            "condicao": "Pela 2.191: 1) clínica ou centro de fonoaudiologia? SIM: Alto risco; 2) consultório isolado com procedimento invasivo? SIM: Médio risco; NÃO às duas: Baixo risco. A notícia da SES-RJ (Conass, 11/05/2026) inclui este CNAE entre os 39 reclassificados para baixo risco pela Res. SES 4.001/2026. O anexo da 4.001 não foi aberto, então não se sabe se as condições da 2.191 continuam. Perguntas da Res. 2.191. A Res. 4.001 pôs este CNAE em baixo risco e não se sabe se as perguntas continuam.",
            "opcoes": [
                {
                    "se": "clínica ou centro de fonoaudiologia",
                    "risco": "Alto risco",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "consultório isolado com procedimento invasivo",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "consultório isolado sem procedimento invasivo",
                    "risco": "Baixo risco, \"risco A\"",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Resolução SES-RJ 4.001/2026",
            "onde": "Notícia SES-RJ/Conass sobre a Res. 4.001 (8650006); Anexos III e IV da 2.191",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/02": {
            "risco": "Alto risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo I (alto risco) da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/01": {
            "risco": "Alto risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo I (alto risco) da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/01": {
            "risco": "Baixo risco",
            "complexidade": null,
            "condicao": "Pela 2.191 (Anexo IV): 'Produz e/ou serve mais de 100 refeições (preparações prontas) por dia?' SIM: Médio risco; NÃO: Baixo risco, desde que declare responsável técnico e/ou funcionários capacitados em Boas Práticas. A notícia da SES-RJ (Conass, 11/05/2026) inclui este CNAE entre os 39 reclassificados para baixo risco pela Res. SES 4.001/2026. O anexo da 4.001 não foi aberto, então não se sabe se as condições da 2.191 continuam. Perguntas da Res. 2.191. A Res. 4.001 pôs este CNAE em baixo risco e não se sabe se as perguntas continuam.",
            "opcoes": [
                {
                    "se": "mais de 100 refeições por dia",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "até 100 refeições por dia e equipe capacitada",
                    "risco": "Baixo risco, \"risco A\"",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Resolução SES-RJ 4.001/2026",
            "onde": "Notícia SES-RJ/Conass sobre a Res. 4.001 (5611201); Anexos III e IV da 2.191",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/03": {
            "risco": "Baixo risco",
            "complexidade": null,
            "condicao": "Pela 2.191 (Anexo IV): sorveteria com fabricação própria? SIM: Alto risco. Serve almoço ou jantar (quilo, self-service, à la carte, PF)? SIM: Médio risco. Hambúrguer artesanal? SIM: Médio risco. NÃO a tudo e funcionários capacitados em Boas Práticas: Baixo risco. A notícia da SES-RJ (Conass, 11/05/2026) inclui este CNAE entre os 39 reclassificados para baixo risco pela Res. SES 4.001/2026. O anexo da 4.001 não foi aberto, então não se sabe se as condições da 2.191 continuam. Perguntas da Res. 2.191. A Res. 4.001 pôs este CNAE em baixo risco e não se sabe se as perguntas continuam.",
            "opcoes": [
                {
                    "se": "sorveteria com fabricação própria",
                    "risco": "Alto risco",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "serve almoço, jantar ou hambúrguer artesanal",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "nada disso e equipe capacitada",
                    "risco": "Baixo risco, \"risco A\"",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Resolução SES-RJ 4.001/2026",
            "onde": "Notícia SES-RJ/Conass sobre a Res. 4.001 (5611203); Anexos III e IV da 2.191",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/04": {
            "risco": null,
            "complexidade": null,
            "condicao": "Anexo IV: 'Produz e/ou serve refeições (preparações prontas) para consumo (café da manhã, brunch, almoço, lanche, jantar, sobremesa ou ceia)?' SIM: Médio risco (\"risco B\"). NÃO: Baixo risco (\"risco A\").",
            "opcoes": [
                {
                    "se": "serve refeições",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "só bebidas",
                    "risco": "Baixo risco, \"risco A\"",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexos III e IV da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/05": {
            "risco": null,
            "complexidade": null,
            "condicao": "Anexo IV: serve refeições (café da manhã, almoço, lanche, jantar...)? SIM: Médio risco (\"risco B\"). NÃO: Baixo risco (\"risco A\").",
            "opcoes": [
                {
                    "se": "serve refeições",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "só bebidas",
                    "risco": "Baixo risco, \"risco A\"",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexos III e IV da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "1091-1/02": {
            "risco": "Baixo risco",
            "complexidade": null,
            "condicao": "Pela 2.191 o CNAE está no Anexo II (médio) e também nos Anexos III/IV: produto diferente de artesanal? SIM: Médio risco; NÃO: Baixo risco, desde que declare funcionários capacitados. A notícia da SES-RJ (Conass, 11/05/2026) inclui este CNAE entre os 39 reclassificados para baixo risco pela Res. SES 4.001/2026. O anexo da 4.001 não foi aberto, então não se sabe se as condições da 2.191 continuam. Perguntas da Res. 2.191. A Res. 4.001 pôs este CNAE em baixo risco e não se sabe se as perguntas continuam.",
            "opcoes": [
                {
                    "se": "produção não artesanal",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "produção artesanal e equipe capacitada",
                    "risco": "Baixo risco, \"risco A\"",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Resolução SES-RJ 4.001/2026",
            "onde": "Notícia SES-RJ/Conass sobre a Res. 4.001 (1091102); Anexos II, III e IV da 2.191",
            "provisorio": false,
            "segueFederal": false
        },
        "4721-1/02": {
            "risco": "Baixo risco",
            "complexidade": null,
            "condicao": "Pela 2.191 (Anexo IV): 'O pão é produzido e não se trata de pão congelado, apenas assado no local?' SIM: Médio risco; NÃO: Baixo risco. A notícia da SES-RJ (Conass, 11/05/2026) inclui este CNAE entre os 39 reclassificados para baixo risco pela Res. SES 4.001/2026. O anexo da 4.001 não foi aberto, então não se sabe se as condições da 2.191 continuam. Perguntas da Res. 2.191. A Res. 4.001 pôs este CNAE em baixo risco e não se sabe se as perguntas continuam.",
            "opcoes": [
                {
                    "se": "produz o pão no local",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "só assa pão congelado",
                    "risco": "Baixo risco, \"risco A\"",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Resolução SES-RJ 4.001/2026",
            "onde": "Notícia SES-RJ/Conass sobre a Res. 4.001 (4721102); Anexos III e IV da 2.191",
            "provisorio": false,
            "segueFederal": false
        },
        "4711-3/02": {
            "risco": "Médio risco, \"risco B\" ou moderado",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo II (médio risco, \"risco B\" ou moderado) da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "4712-1/00": {
            "risco": "Baixo risco",
            "complexidade": null,
            "condicao": "Pela 2.191 (Anexo IV): 'Comercializa produtos que necessitam de refrigeração e/ou de origem animal?' SIM: Médio risco; NÃO: Baixo risco. A notícia da SES-RJ (Conass, 11/05/2026) inclui este CNAE entre os 39 reclassificados para baixo risco pela Res. SES 4.001/2026. O anexo da 4.001 não foi aberto, então não se sabe se as condições da 2.191 continuam. Perguntas da Res. 2.191. A Res. 4.001 pôs este CNAE em baixo risco e não se sabe se as perguntas continuam.",
            "opcoes": [
                {
                    "se": "vende refrigerados ou de origem animal",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "não vende refrigerados nem de origem animal",
                    "risco": "Baixo risco, \"risco A\"",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Resolução SES-RJ 4.001/2026",
            "onde": "Notícia SES-RJ/Conass sobre a Res. 4.001 (4712100); Anexos III e IV da 2.191",
            "provisorio": false,
            "segueFederal": false
        },
        "4724-5/00": {
            "risco": null,
            "complexidade": null,
            "condicao": "Anexo IV da 2.191: 'Vende só verduras, frutas, legumes e hortaliças, diferente de aves vivas, coelhos e outros pequenos animais para alimentação?' SIM: Médio risco; NÃO: Baixo risco (a pergunta parece invertida no original; o Anexo III diz 'Desde que não venda verduras, frutas, legumes e hortaliças e venda aves vivas...'). Este CNAE NÃO está na lista de 39 da 4.001 divulgada, mas a Res. COGIRE/JUCERJA 9/2026 o passa para o Anexo I (Risco 1, baixo) da COGIRE 08/2025.",
            "opcoes": [
                {
                    "se": "SIM à pergunta 'vende só verduras, frutas, legumes e hortaliças?'",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "NÃO à mesma pergunta",
                    "risco": "Baixo risco, \"risco A\"",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexos III e IV da Res. SES 2.191/2020; Anexo Único da Res. COGIRE/JUCERJA 9/2026",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/01": {
            "risco": "Baixo risco",
            "complexidade": null,
            "condicao": "Pela 2.191 estava no Anexo II (médio risco), sem pergunta. A notícia da SES-RJ (Conass, 11/05/2026) inclui este CNAE entre os 39 reclassificados para baixo risco pela Res. SES 4.001/2026. O anexo da 4.001 não foi aberto, então não se sabe se as condições da 2.191 continuam.",
            "opcoes": [],
            "norma": "Resolução SES-RJ 4.001/2026",
            "onde": "Notícia SES-RJ/Conass sobre a Res. 4.001 (4722901); Anexo II da 2.191",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/02": {
            "risco": "Médio risco, \"risco B\" ou moderado",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo II (médio risco, \"risco B\" ou moderado) da Res. SES 2.191/2020 (peixaria não está na lista de 39 da 4.001 divulgada)",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/04": {
            "risco": null,
            "complexidade": null,
            "condicao": "Anexo IV: 1) Pizzaria? SIM: Médio risco. 2) Prepara refeições ou pratos cozidos para consumo domiciliar, mais de 100 refeições por dia? SIM: Médio risco. NÃO às duas e funcionários capacitados em Boas Práticas: Baixo risco (\"risco A\").",
            "opcoes": [
                {
                    "se": "pizzaria ou mais de 100 refeições por dia",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "nenhuma das duas e equipe capacitada",
                    "risco": "Baixo risco, \"risco A\"",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexos III e IV da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/02": {
            "risco": "Baixo risco",
            "complexidade": null,
            "condicao": "Pela 2.191 (Anexo IV): mais de 100 refeições por dia? SIM: Médio risco; NÃO: Baixo risco, desde que declare responsável técnico e/ou funcionários capacitados. A notícia da SES-RJ (Conass, 11/05/2026) inclui este CNAE entre os 39 reclassificados para baixo risco pela Res. SES 4.001/2026. O anexo da 4.001 não foi aberto, então não se sabe se as condições da 2.191 continuam. Perguntas da Res. 2.191. A Res. 4.001 pôs este CNAE em baixo risco e não se sabe se as perguntas continuam.",
            "opcoes": [
                {
                    "se": "mais de 100 refeições por dia",
                    "risco": "Médio risco, \"risco B\" ou moderado",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "até 100 refeições por dia e equipe capacitada",
                    "risco": "Baixo risco, \"risco A\"",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Resolução SES-RJ 4.001/2026",
            "onde": "Notícia SES-RJ/Conass sobre a Res. 4.001 (5620102); Anexos III e IV da 2.191",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/01": {
            "risco": "Alto risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo I (alto risco) da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/03": {
            "risco": "Médio risco, \"risco B\" ou moderado",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo II (médio risco, \"risco B\" ou moderado) da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "1053-8/00": {
            "risco": "Alto risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo I (alto risco) da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        },
        "1099-6/99": {
            "risco": "Alto risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES-RJ 2.191/2020",
            "onde": "Anexo I (alto risco) da Res. SES 2.191/2020",
            "provisorio": false,
            "segueFederal": false
        }
    },
    "sp-capital": {
        "8630-5/01": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 89-90 (Ambulatório Cirúrgico tipo I: análise por DCA; tipo II e Unidade Ambulatorial tipo III: inspeção prévia SIM)",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/02": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 90-91 (todas as linhas III ALTO, análise por DCA)",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/03": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 91 (consultório, posto, policlínica, medicina do trabalho: II MÉDIO, CLI para pessoa jurídica)",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/04": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 91-92 (clínica, consultório, policlínica e unidade móvel, com ou sem raios X: III ALTO, DCA)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/01": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 99 (consultório de enfermagem: II MÉDIO, CLI)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/99": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": "Só o consultório isolado de optometrista de nível superior está no Anexo I (II MÉDIO). Qualquer outro profissional deste CNAE fica fora do Anexo I: Nível de Risco I (Baixo), dispensado de licença (art. 4º, § 2º, e art. 5º, I).",
            "opcoes": [
                {
                    "se": "optometrista de nível superior em consultório isolado",
                    "risco": "Nível de Risco II (Médio)",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "outro profissional deste CNAE",
                    "risco": "Nível de Risco I (Baixo)",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 100",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/04": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": "Só o centro ou núcleo de reabilitação física está no Anexo I (III ALTO, DCA). Consultório de fisioterapia que não seja centro de reabilitação fica fora do Anexo I: Nível de Risco I (Baixo), dispensado de licença (art. 4º, § 2º, e art. 5º, I).",
            "opcoes": [
                {
                    "se": "centro ou núcleo de reabilitação física",
                    "risco": "Nível de Risco III (Alto)",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "consultório de fisioterapia que não é centro de reabilitação",
                    "risco": "Nível de Risco I (Baixo)",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 99-100",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/02": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Não consta do Anexo I; art. 4º, § 2º, e art. 5º, I (p. 14-15 do PDF)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/03": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Não consta do Anexo I; art. 4º, § 2º, e art. 5º, I (p. 14-15 do PDF)",
            "provisorio": false,
            "segueFederal": false
        },
        "8640-2/99": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 98-99 (complementação diagnóstica e terapêutica sem radiação, SADT, medicina hiperbárica, centro de infusão: III ALTO, inspeção prévia SIM)",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/02": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": "II MÉDIO (CLI) para limpeza de pele, massagem facial, maquiagem, depilação, massagem corporal, SPA, embelezamento sem responsabilidade médica e bronzeamento sem câmara. Passa a III ALTO (DCA) quando usa equipamento que possa ser operado por profissional de nível superior da saúde (exceto médico e dentista), quando faz procedimento invasivo não cirúrgico sob responsabilidade desse profissional ou quando faz micropigmentação com agulhas.",
            "opcoes": [
                {
                    "se": "estética simples, sem equipamento de profissional da saúde nem procedimento invasivo",
                    "risco": "Nível de Risco II (Médio)",
                    "complexidade": null,
                    "invasivo": false
                },
                {
                    "se": "com equipamento operado por profissional de nível superior da saúde",
                    "risco": "Nível de Risco III (Alto)",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "com procedimento invasivo não cirúrgico",
                    "risco": "Nível de Risco III (Alto)",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "com micropigmentação",
                    "risco": "Nível de Risco III (Alto)",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 114-116",
            "provisorio": false,
            "segueFederal": false
        },
        "8211-3/00": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Não consta do Anexo I; art. 4º, § 2º, e art. 5º, I (p. 14-15 do PDF)",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/01": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 113-114 (cabeleireiro, manicure, pedicure, barbearia: II MÉDIO, CLI)",
            "provisorio": false,
            "segueFederal": false
        },
        "9609-2/06": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 116 (piercing e tatuagem: III ALTO, DCA)",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/01": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Não consta do Anexo I; art. 4º, § 2º, e art. 5º, I (p. 14-15 do PDF)",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/03": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 101 (consultório isolado de acupuntura: II MÉDIO, CLI)",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/04": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 101 (consultório isolado de podologia: II MÉDIO, CLI)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/05": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Não consta do Anexo I; art. 4º, § 2º, e art. 5º, I (p. 14-15 do PDF)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/06": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Não consta do Anexo I; art. 4º, § 2º, e art. 5º, I (p. 14-15 do PDF)",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/02": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 112 (ILPI: III ALTO, inspeção prévia SIM)",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/01": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": "O 8711-5/01 não tem linha própria no Anexo I da rev. 11; só aparece nas listas de 'não compreende' de outros CNAEs, que remetem a ele. Pela regra do art. 4º, § 2º, fica dispensado de licença. Parece lacuna da compilação, porque no Estado (CVS 1/2024) o mesmo CNAE é III ALTO. Confirmar com a Covisa antes de usar.",
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Ausente do Anexo I; art. 4º, § 2º, e art. 5º, I",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/01": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 79-80 (II MÉDIO, CLI)",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/03": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 80 (II MÉDIO, CLI)",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/04": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Não consta do Anexo I; art. 4º, § 2º, e art. 5º, I (p. 14-15 do PDF)",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/05": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Não consta do Anexo I; art. 4º, § 2º, e art. 5º, I (p. 14-15 do PDF)",
            "provisorio": false,
            "segueFederal": false
        },
        "1091-1/02": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 44-45 (padaria tradicional com venda predominante de fabricação própria: II MÉDIO, CLI)",
            "provisorio": false,
            "segueFederal": false
        },
        "4721-1/02": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 79 (II MÉDIO, CLI)",
            "provisorio": false,
            "segueFederal": false
        },
        "4711-3/02": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 78 (área de venda de 300 a 5.000 m² e depósito fechado: II MÉDIO, CLI)",
            "provisorio": false,
            "segueFederal": false
        },
        "4712-1/00": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 79 (área de venda inferior a 300 m²: II MÉDIO, CLI)",
            "provisorio": false,
            "segueFederal": false
        },
        "4724-5/00": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Não consta do Anexo I; art. 4º, § 2º, e art. 5º, I (p. 14-15 do PDF)",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/01": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 79 (II MÉDIO, CLI)",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/02": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 79 (II MÉDIO, CLI)",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/04": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 81 (II MÉDIO, CLI)",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/02": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 81 (bufê com preparo em instalação própria: II MÉDIO, CLI)",
            "provisorio": false,
            "segueFederal": false
        },
        "8230-0/02": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Não consta do Anexo I; art. 4º, § 2º, e art. 5º, I (p. 14-15 do PDF)",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/01": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 80-81 (cozinha industrial e catering: III ALTO, DCA)",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/03": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Não consta do Anexo I; art. 4º, § 2º, e art. 5º, I (p. 14-15 do PDF)",
            "provisorio": false,
            "segueFederal": false
        },
        "1053-8/00": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 38 (III ALTO, inspeção prévia SIM)",
            "provisorio": false,
            "segueFederal": false
        },
        "1099-6/99": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SMS 266/2025",
            "onde": "Anexo I (rev. 11, 22/06/2026), p. 49-50 (todas as linhas III ALTO, inspeção prévia SIM)",
            "provisorio": false,
            "segueFederal": false
        }
    },
    "sp-estado": {
        "8630-5/01": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 42 do PDF (ambulatório cirúrgico I, II e III e clínica de estética tipos I, II e III: III ALTO)",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/02": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 42 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/03": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 42 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/04": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 43 do PDF (todas as linhas III ALTO)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/01": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 46 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/99": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": "Isento desde que a optometria não seja exercida por optometrista com formação superior. Se for, a CVS 13/2025 manda licenciar, mas a cópia do Anexo I da CVS 1/2024 que abri não tem linha para o 8650-0/99. O risco do optometrista ficou sem fonte.",
            "opcoes": [
                {
                    "se": "sem optometrista de nível superior",
                    "risco": "Nível de Risco I (Baixo)",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "com optometrista de nível superior",
                    "risco": null,
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Portaria CVS 13/2025",
            "onde": "Anexo Único da CVS 13/2025 (republicação no DOE de 13/05/2026), p. 52 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/04": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": "Isento desde que não seja centro ou núcleo de reabilitação física. O centro ou núcleo de reabilitação física é Nível de Risco III (Alto) no Anexo I da CVS 1/2024, p. 46 do PDF.",
            "opcoes": [
                {
                    "se": "consultório que não é centro de reabilitação",
                    "risco": "Nível de Risco I (Baixo)",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "centro ou núcleo de reabilitação física",
                    "risco": "Nível de Risco III (Alto)",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Portaria CVS 13/2025",
            "onde": "Anexo Único da CVS 13/2025 (republicação no DOE de 13/05/2026), p. 51 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/02": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 13/2025",
            "onde": "Anexo Único da CVS 13/2025 (republicação no DOE de 13/05/2026), p. 51 do PDF ('Não compete à vigilância sanitária')",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/03": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 13/2025",
            "onde": "Anexo Único da CVS 13/2025 (republicação no DOE de 13/05/2026), p. 51 do PDF ('Não compete à vigilância sanitária')",
            "provisorio": false,
            "segueFederal": false
        },
        "8640-2/99": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 46 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/02": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": "II MÉDIO para limpeza de pele, massagem facial, maquiagem, depilação, massagem corporal, SPA, embelezamento sem responsabilidade médica e bronzeamento sem câmara. Passa a III ALTO quando usa equipamento que possa ser operado por profissional não médico, quando faz procedimento invasivo não cirúrgico sob responsabilidade de profissional não médico ou quando faz micropigmentação com agulhas.",
            "opcoes": [
                {
                    "se": "estética simples, sem equipamento nem procedimento invasivo",
                    "risco": "Nível de Risco II (Médio)",
                    "complexidade": null,
                    "invasivo": false
                },
                {
                    "se": "com equipamento operado por profissional não médico",
                    "risco": "Nível de Risco III (Alto)",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "com procedimento invasivo não cirúrgico",
                    "risco": "Nível de Risco III (Alto)",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "com micropigmentação",
                    "risco": "Nível de Risco III (Alto)",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 52 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8211-3/00": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 13/2025",
            "onde": "Anexo Único da CVS 13/2025 (republicação no DOE de 13/05/2026), p. 49 do PDF ('Não compete à vigilância sanitária')",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/01": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 52 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "9609-2/06": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 52 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/01": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 13/2025",
            "onde": "Anexo Único da CVS 13/2025 (republicação no DOE de 13/05/2026), p. 52 do PDF ('Não compete à vigilância sanitária')",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/03": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 46 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/04": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 47 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/05": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 13/2025",
            "onde": "Anexo Único da CVS 13/2025 (republicação no DOE de 13/05/2026), p. 52 do PDF ('Não compete à vigilância sanitária')",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/06": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 13/2025",
            "onde": "Anexo Único da CVS 13/2025 (republicação no DOE de 13/05/2026), p. 52 do PDF ('Não compete à vigilância sanitária')",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/02": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 51 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/01": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 47 do PDF (casa de repouso para maiores de 60 anos, centrada em serviços médicos e de enfermagem)",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/01": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 36 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/03": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 36 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/04": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 13/2025",
            "onde": "Anexo Único da CVS 13/2025 (republicação no DOE de 13/05/2026), p. 42 do PDF ('Não compete à vigilância sanitária')",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/05": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 13/2025",
            "onde": "Anexo Único da CVS 13/2025 (republicação no DOE de 13/05/2026), p. 42 do PDF ('Não compete à vigilância sanitária')",
            "provisorio": false,
            "segueFederal": false
        },
        "1091-1/02": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 10 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "4721-1/02": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 35 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "4711-3/02": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 35 do PDF (área de venda de 300 a 5.000 m²)",
            "provisorio": false,
            "segueFederal": false
        },
        "4712-1/00": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": "Isento desde que não tenha açougue, peixaria ou padaria com manipulação de produtos (CVS 13/2025). Com qualquer um deles, é Nível de Risco II (Médio) pelo Anexo I da CVS 1/2024, p. 35 do PDF.",
            "opcoes": [
                {
                    "se": "sem açougue, peixaria ou padaria com manipulação",
                    "risco": "Nível de Risco I (Baixo)",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "com açougue, peixaria ou padaria com manipulação",
                    "risco": "Nível de Risco II (Médio)",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Portaria CVS 13/2025",
            "onde": "Anexo Único da CVS 13/2025 (republicação no DOE de 13/05/2026), p. 35 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "4724-5/00": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 13/2025",
            "onde": "Anexo Único da CVS 13/2025 (republicação no DOE de 13/05/2026), p. 35 do PDF ('Não compete à vigilância sanitária')",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/01": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 35 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/02": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 36 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/04": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 37 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/02": {
            "risco": "Nível de Risco II (Médio)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 36 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8230-0/02": {
            "risco": "Nível de Risco I (Baixo)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 13/2025",
            "onde": "Anexo Único da CVS 13/2025 (republicação no DOE de 13/05/2026), p. 50 do PDF ('Não compete à vigilância sanitária')",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/01": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 36 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "1053-8/00": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 6 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "1099-6/99": {
            "risco": "Nível de Risco III (Alto)",
            "complexidade": null,
            "condicao": "Só a fabricação artesanal de produtos de soja é Nível de Risco I (Baixo), isenta (CVS 13/2025, Anexo Único, p. 11 do PDF). Os demais produtos são III ALTO no Anexo I da CVS 1/2024.",
            "opcoes": [
                {
                    "se": "fabricação artesanal de produtos de soja",
                    "risco": "Nível de Risco I (Baixo)",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "demais produtos ou fabricação industrial",
                    "risco": "Nível de Risco III (Alto)",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Portaria CVS 1/2024",
            "onde": "Anexo I da CVS 1/2024 (cópia da Prefeitura de Santos), p. 14 do PDF",
            "provisorio": false,
            "segueFederal": false
        }
    },
    "mg": {
        "8630-5/01": {
            "risco": "Nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 60",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/02": {
            "risco": "P (depende de pergunta)",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo II: \"Realização apenas de exames psicotécnicos?\" SIM: Nível de risco II. NÃO: Nível de risco III.",
            "opcoes": [
                {
                    "se": "só exames psicotécnicos",
                    "risco": "Nível de risco II",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "com outros exames além dos psicotécnicos",
                    "risco": "Nível de risco III",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 60; pergunta 46 no Anexo II, p. 67",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/03": {
            "risco": "P (depende de pergunta)",
            "complexidade": null,
            "condicao": "Pergunta 47 do Anexo II: \"A atividade envolve de procedimentos invasivos?\" SIM: Nível de risco III. NÃO: Nível de risco II.",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Nível de risco III",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Nível de risco II",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 60; pergunta 47 no Anexo II, p. 67",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/04": {
            "risco": "Nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 60",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/01": {
            "risco": "P (depende de pergunta)",
            "complexidade": null,
            "condicao": "Pergunta 35 do Anexo II: \"A atividade envolve procedimentos invasivos ou procedimento de estética?\" SIM: Nível de risco III. NÃO: Nível de risco II.",
            "opcoes": [
                {
                    "se": "com procedimento invasivo ou de estética",
                    "risco": "Nível de risco III",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "sem procedimento invasivo nem de estética",
                    "risco": "Nível de risco II",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 60; pergunta 35 no Anexo II, p. 66",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/99": {
            "risco": "P (depende de pergunta)",
            "complexidade": null,
            "condicao": "Pergunta 59 do Anexo II: \"A atividade envolve procedimentos invasivos ou procedimento de estética?\" SIM: Nível de risco III. NÃO: Nível de risco I.",
            "opcoes": [
                {
                    "se": "com procedimento invasivo ou de estética",
                    "risco": "Nível de risco III",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "sem procedimento invasivo nem de estética",
                    "risco": "Nível de risco I",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 61; pergunta 59 no Anexo II, p. 68",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/04": {
            "risco": "P (depende de pergunta)",
            "complexidade": null,
            "condicao": "Pergunta 35 do Anexo II: \"A atividade envolve procedimentos invasivos ou procedimento de estética?\" SIM: Nível de risco III. NÃO: Nível de risco II.",
            "opcoes": [
                {
                    "se": "com procedimento invasivo ou de estética",
                    "risco": "Nível de risco III",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "sem procedimento invasivo nem de estética",
                    "risco": "Nível de risco II",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 60; pergunta 35 no Anexo II, p. 66",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/02": {
            "risco": "Nível de risco I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 60",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/03": {
            "risco": "Nível de risco I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 60",
            "provisorio": false,
            "segueFederal": false
        },
        "8640-2/99": {
            "risco": "Nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 60",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/02": {
            "risco": "P (depende de pergunta)",
            "complexidade": null,
            "condicao": "Pergunta 56 do Anexo II: \"Realiza procedimento de micropigmentação da pele ou procedimento estetico invasivo não cirúrgico sob responsabilidade técnica de profissional de nível superior da área da saúde?\" SIM: Nível de risco III. NÃO: Nível de risco II.",
            "opcoes": [
                {
                    "se": "com micropigmentação ou procedimento invasivo não cirúrgico sob RT de nível superior da saúde",
                    "risco": "Nível de risco III",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "sem micropigmentação nem procedimento invasivo não cirúrgico",
                    "risco": "Nível de risco II",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 63; pergunta 56 no Anexo II, p. 68. Anexo III (p. 70): dispensado de aprovação de projeto arquitetônico \"caso o estabelecimento realize somente atividade de depilação a laser\".",
            "provisorio": false,
            "segueFederal": false
        },
        "8211-3/00": {
            "risco": "Não se Aplica (NA)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 58",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/01": {
            "risco": "Nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 63",
            "provisorio": false,
            "segueFederal": false
        },
        "9609-2/06": {
            "risco": "Nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 63",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/01": {
            "risco": "Nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 61",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/03": {
            "risco": "Nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 61",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/04": {
            "risco": "Nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 61",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/05": {
            "risco": "Nível de risco I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 60",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/06": {
            "risco": "Nível de risco I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 60",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/02": {
            "risco": "Nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 61",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/01": {
            "risco": "Nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 61",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/01": {
            "risco": "Nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 51",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/03": {
            "risco": "Nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 51",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/04": {
            "risco": "Nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 51",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/05": {
            "risco": "Nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 51",
            "provisorio": false,
            "segueFederal": false
        },
        "1091-1/02": {
            "risco": "Nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 24",
            "provisorio": false,
            "segueFederal": false
        },
        "4721-1/02": {
            "risco": "Nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 46",
            "provisorio": false,
            "segueFederal": false
        },
        "4711-3/02": {
            "risco": "Nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 46",
            "provisorio": false,
            "segueFederal": false
        },
        "4712-1/00": {
            "risco": "Nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 46",
            "provisorio": false,
            "segueFederal": false
        },
        "4724-5/00": {
            "risco": "Nível de risco I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 46",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/01": {
            "risco": "P (depende de pergunta)",
            "complexidade": null,
            "condicao": "Pergunta 40 do Anexo II: \"A atividade envolve transformação artesanal?\" SIM: Nível de risco III. NÃO: Nível de risco II.",
            "opcoes": [
                {
                    "se": "com transformação artesanal",
                    "risco": "Nível de risco III",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "sem transformação artesanal",
                    "risco": "Nível de risco II",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 46; pergunta 40 no Anexo II, p. 67. Consta do Anexo III (p. 69): quando nível III, dispensado de aprovação de projeto arquitetônico.",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/02": {
            "risco": "Nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 46. Consta do Anexo III (p. 69): nível III dispensado de aprovação de projeto arquitetônico.",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/04": {
            "risco": "Nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 51",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/02": {
            "risco": "Nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 51",
            "provisorio": false,
            "segueFederal": false
        },
        "8230-0/02": {
            "risco": "P (depende de pergunta)",
            "complexidade": null,
            "condicao": "Pergunta 44 do Anexo II: \"A atividade envolve o serviço de buffet/catering associado?\" SIM: Nível de risco II. NÃO: Nível de risco I.",
            "opcoes": [
                {
                    "se": "com bufê ou catering associado",
                    "risco": "Nível de risco II",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "sem bufê nem catering associado",
                    "risco": "Nível de risco I",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 58; pergunta 44 no Anexo II, p. 67",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/01": {
            "risco": "Nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 51",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/03": {
            "risco": "Nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 51",
            "provisorio": false,
            "segueFederal": false
        },
        "1053-8/00": {
            "risco": "Nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 23",
            "provisorio": false,
            "segueFederal": false
        },
        "1099-6/99": {
            "risco": "P (depende de pergunta)",
            "complexidade": null,
            "condicao": "Pergunta 6 do Anexo II: \"A produção é artesanal e de alimentos com dispensa de registro sanitário?\" SIM: Nível de risco II. NÃO: Nível de risco III.",
            "opcoes": [
                {
                    "se": "produção artesanal de alimento dispensado de registro",
                    "risco": "Nível de risco II",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "produção não artesanal ou de alimento com registro obrigatório",
                    "risco": "Nível de risco III",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Resolução SES/MG 10.601/2025",
            "onde": "Anexo I (CNAEs e RISCOS), p. 24; pergunta 6 no Anexo II, p. 64",
            "provisorio": false,
            "segueFederal": false
        }
    },
    "df": {
        "8630-5/01": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "8630-5/02": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "8630-5/03": {
            "risco": "Depende de informação",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo IV: haverá a realização de procedimentos invasivos? Sim: nível III (alto risco). Não: nível II (médio risco).",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Nível de risco III (alto risco)",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Nível de risco II (médio risco)",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo III, pergunta 46",
            "provisorio": false,
            "segueFederal": true
        },
        "8630-5/04": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "8650-0/01": {
            "risco": "Depende de informação",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo IV: haverá a realização de procedimentos invasivos? Sim: nível III (alto risco). Não: nível II (médio risco).",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Nível de risco III (alto risco)",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Nível de risco II (médio risco)",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo III, pergunta 46",
            "provisorio": false,
            "segueFederal": true
        },
        "8650-0/99": {
            "risco": "Depende de informação",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo IV: haverá a realização de procedimentos invasivos? Sim: nível III (alto risco). Não: nível II (médio risco).",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Nível de risco III (alto risco)",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Nível de risco II (médio risco)",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo III, pergunta 46",
            "provisorio": false,
            "segueFederal": true
        },
        "8650-0/04": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "8650-0/02": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "8650-0/03": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "8640-2/99": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "9602-5/02": {
            "risco": "Depende de informação",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo IV: haverá a realização de procedimentos invasivos? Sim: nível III (alto risco). Não: nível II (médio risco).",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Nível de risco III (alto risco)",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Nível de risco II (médio risco)",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo III, pergunta 46",
            "provisorio": false,
            "segueFederal": true
        },
        "9602-5/01": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "9609-2/06": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "8690-9/01": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "8690-9/03": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "8690-9/04": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "8650-0/05": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "8650-0/06": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "8711-5/02": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "8711-5/01": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "5611-2/01": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "5611-2/03": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "1091-1/02": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "4721-1/02": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "4711-3/02": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "4712-1/00": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "4724-5/00": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "4722-9/01": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "4722-9/02": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "5620-1/04": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "5620-1/02": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "5620-1/01": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "5620-1/03": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "1053-8/00": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "1099-6/99": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        }
    },
    "sc": {
        "8630-5/01": {
            "risco": "III - Alto",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 24 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/02": {
            "risco": "II - Médio / III - Alto",
            "complexidade": null,
            "condicao": "Que não incluam serviços de medicina hiperbárica: II - Médio. Que incluam serviços de medicina hiperbárica: III - Alto.",
            "opcoes": [
                {
                    "se": "sem medicina hiperbárica",
                    "risco": "II - Médio",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "com medicina hiperbárica",
                    "risco": "III - Alto",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 24 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/03": {
            "risco": "I - Baixo / II - Médio",
            "complexidade": null,
            "condicao": "Que envolva exclusivamente atividades de Telemedicina/Telesaúde: I - Baixo. Restrita a consultas (incluindo as Unidades Públicas de Saúde): II - Médio.",
            "opcoes": [
                {
                    "se": "só telemedicina ou telessaúde",
                    "risco": "I - Baixo",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "consultas presenciais",
                    "risco": "II - Médio",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 24 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/04": {
            "risco": "III - Alto",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 24 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/01": {
            "risco": "II - Médio / III - Alto",
            "complexidade": null,
            "condicao": "Que não utilizem dispositivos médicos invasivos, medicamentos, agregados leucoplaquetários autólogos, bem como cosméticos e outros correlatos: II - Médio. Que utilizem: III - Alto.",
            "opcoes": [
                {
                    "se": "sem dispositivo invasivo, medicamento ou cosmético",
                    "risco": "II - Médio",
                    "complexidade": null,
                    "invasivo": false
                },
                {
                    "se": "com dispositivo invasivo, medicamento ou cosmético",
                    "risco": "III - Alto",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 25 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/99": {
            "risco": "III - Alto",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 25 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/04": {
            "risco": "I - Baixo / III - Alto",
            "complexidade": null,
            "condicao": "Que não utilizem dispositivos médicos invasivos, medicamentos, agregados leucoplaquetários autólogos, bem como cosméticos e outros correlatos: I - Baixo. Que utilizem: III - Alto.",
            "opcoes": [
                {
                    "se": "sem dispositivo invasivo, medicamento ou cosmético",
                    "risco": "I - Baixo",
                    "complexidade": null,
                    "invasivo": false
                },
                {
                    "se": "com dispositivo invasivo, medicamento ou cosmético",
                    "risco": "III - Alto",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 25 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/02": {
            "risco": "I - Baixo",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 25 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/03": {
            "risco": "I - Baixo",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 25 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8640-2/99": {
            "risco": "III - Alto",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 25 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/02": {
            "risco": "II - Médio / III - Alto",
            "complexidade": null,
            "condicao": "Sem a realização de práticas invasivas, sem aplicação de medicamentos e sem o uso de dispositivos médicos ou eletromédicos: II - Médio. Realizados exclusivamente por profissionais de saúde, que utiliza dispositivos médicos invasivos, equipamentos eletromédicos, bem como medicamentos, cosméticos e outros correlatos, exceto se realizado por odontólogos: III - Alto. A norma não diz o enquadramento de quem não é profissional de saúde e usa eletromédico.",
            "opcoes": [
                {
                    "se": "sem prática invasiva, medicamento ou eletromédico",
                    "risco": "II - Médio",
                    "complexidade": null,
                    "invasivo": false
                },
                {
                    "se": "por profissional de saúde, com invasivo, eletromédico ou medicamento",
                    "risco": "III - Alto",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 26 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8211-3/00": {
            "risco": "I - Baixo",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 23 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/01": {
            "risco": "I - Baixo",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 26 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "9609-2/06": {
            "risco": "II - Médio",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 27 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/01": {
            "risco": "I - Baixo / II - Médio",
            "complexidade": null,
            "condicao": "Que não realizam atividades de ozonioterapia, acupuntura ou auriculoterapia com agulha: I - Baixo. Que realizam: II - Médio.",
            "opcoes": [
                {
                    "se": "sem ozonioterapia, acupuntura ou auriculoterapia com agulha",
                    "risco": "I - Baixo",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "com ozonioterapia, acupuntura ou auriculoterapia com agulha",
                    "risco": "II - Médio",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 25 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/03": {
            "risco": "II - Médio",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 25 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/04": {
            "risco": "II - Médio",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 25 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/05": {
            "risco": "I - Baixo",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 25 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/06": {
            "risco": "I - Baixo",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 25 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/02": {
            "risco": "III - Alto",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 25 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/01": {
            "risco": "III - Alto",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 25 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/01": {
            "risco": "I - Baixo",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 20 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/03": {
            "risco": "I - Baixo",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 20 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/04": {
            "risco": "I - Baixo",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 20 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/05": {
            "risco": "I - Baixo",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 20 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "1091-1/02": {
            "risco": "I - Baixo",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 6 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "4721-1/02": {
            "risco": "I - Baixo",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 17 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "4711-3/02": {
            "risco": "I - Baixo",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 17 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "4712-1/00": {
            "risco": "I - Baixo",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 17 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "4724-5/00": {
            "risco": "II - Médio",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 17 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/01": {
            "risco": "I - Baixo",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 17 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/02": {
            "risco": "III - Alto",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 17 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/04": {
            "risco": "II - Médio",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 20 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/02": {
            "risco": "II - Médio",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 20 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "8230-0/02": {
            "risco": "I - Baixo / II - Médio",
            "complexidade": null,
            "condicao": "Sem serviço de alimentação: I - Baixo. Com serviço de alimentação: II - Médio.",
            "opcoes": [
                {
                    "se": "sem serviço de alimentação",
                    "risco": "I - Baixo",
                    "complexidade": null,
                    "invasivo": null
                },
                {
                    "se": "com serviço de alimentação",
                    "risco": "II - Médio",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 23 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/01": {
            "risco": "III - Alto",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 20 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/03": {
            "risco": "I - Baixo",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 20 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "1053-8/00": {
            "risco": "III - Alto",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 6 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        },
        "1099-6/99": {
            "risco": "III - Alto",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/DIVS/SUV/SES/2025",
            "onde": "Anexo I, p. 6 do PDF (extrato do DOE-SC hospedado pela Prefeitura de Joinville)",
            "provisorio": false,
            "segueFederal": false
        }
    },
    "rs": {
        "8630-5/01": {
            "risco": "III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 55 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/02": {
            "risco": "III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 55 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/03": {
            "risco": "II / III",
            "complexidade": null,
            "condicao": "Pergunta 47 (Anexo II, p. 64-66): 'Haverá no exercício da atividade a realização de procedimentos invasivos?' Anexo III, p. 72: SIM = III; NÃO = II.",
            "opcoes": [
                {
                    "se": "sem procedimento invasivo",
                    "risco": "II",
                    "complexidade": null,
                    "invasivo": false
                },
                {
                    "se": "com procedimento invasivo",
                    "risco": "III",
                    "complexidade": null,
                    "invasivo": true
                }
            ],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 55 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/04": {
            "risco": "III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 55 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/01": {
            "risco": "II / III",
            "complexidade": null,
            "condicao": "Pergunta 47 (Anexo II, p. 64-66): 'Haverá no exercício da atividade a realização de procedimentos invasivos?' Anexo III, p. 72: SIM = III; NÃO = II.",
            "opcoes": [
                {
                    "se": "sem procedimento invasivo",
                    "risco": "II",
                    "complexidade": null,
                    "invasivo": false
                },
                {
                    "se": "com procedimento invasivo",
                    "risco": "III",
                    "complexidade": null,
                    "invasivo": true
                }
            ],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 56 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/99": {
            "risco": "II / III",
            "complexidade": null,
            "condicao": "Pergunta 47 (Anexo II, p. 64-66): 'Haverá no exercício da atividade a realização de procedimentos invasivos?' Anexo III, p. 72: SIM = III; NÃO = II.",
            "opcoes": [
                {
                    "se": "sem procedimento invasivo",
                    "risco": "II",
                    "complexidade": null,
                    "invasivo": false
                },
                {
                    "se": "com procedimento invasivo",
                    "risco": "III",
                    "complexidade": null,
                    "invasivo": true
                }
            ],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 56 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/04": {
            "risco": "I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 56 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/02": {
            "risco": "I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 56 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/03": {
            "risco": "I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 56 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8640-2/99": {
            "risco": "III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 56 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/02": {
            "risco": "II / III",
            "complexidade": null,
            "condicao": "Anexo I indica 'P' com perguntas '47-54'. Lido como perguntas 47 e 54: as do meio (48 a 53) tratam de lavanderia hospitalar, carne de ave, material biológico, produto artesanal, tabacaria e cuidador, sem relação com estética, e a portaria não explica a notação. Pergunta 47, procedimentos invasivos: SIM = III, NÃO = II. Pergunta 54, 'uso de equipamento que emite radiação tais como: microondas, luz visível, laser, ultravioleta, entre outras': SIM = III, NÃO = II (Anexo III, p. 72). Pelo art. 4º, § 4º, vale o mais alto: qualquer SIM leva a III; os dois NÃO, a II.",
            "opcoes": [
                {
                    "se": "sem invasivo e sem equipamento que emite radiação (laser, luz, UV)",
                    "risco": "II",
                    "complexidade": null,
                    "invasivo": false
                },
                {
                    "se": "com procedimento invasivo",
                    "risco": "III",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "com equipamento que emite radiação (laser, luz, UV)",
                    "risco": "III",
                    "complexidade": null,
                    "invasivo": null
                }
            ],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 59 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8211-3/00": {
            "risco": "NA",
            "complexidade": null,
            "condicao": "NA = 'Não se Aplica': atividade não sujeita à vigilância sanitária (art. 4º, § 1º).",
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 53 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/01": {
            "risco": "I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 59 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "9609-2/06": {
            "risco": "III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 60 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/01": {
            "risco": "II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 57 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/03": {
            "risco": "II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 57 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/04": {
            "risco": "II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 57 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/05": {
            "risco": "I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 56 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/06": {
            "risco": "I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 56 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/02": {
            "risco": "III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 57 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/01": {
            "risco": "III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 57 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/01": {
            "risco": "I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 45 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/03": {
            "risco": "I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 45 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/04": {
            "risco": "I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 46 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/05": {
            "risco": "I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 46 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "1091-1/02": {
            "risco": "I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 17 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "4721-1/02": {
            "risco": "I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 40 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "4711-3/02": {
            "risco": "II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 40 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "4712-1/00": {
            "risco": "I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 40 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "4724-5/00": {
            "risco": "II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 40 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/01": {
            "risco": "I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 40 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/02": {
            "risco": "II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 40 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/04": {
            "risco": "I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 46 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/02": {
            "risco": "I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 46 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "8230-0/02": {
            "risco": "NA",
            "complexidade": null,
            "condicao": "NA = 'Não se Aplica' (art. 4º, § 1º). A portaria não desdobra casa de festas com serviço de alimentação; nesse caso o serviço de alimentação teria CNAE próprio (ex.: 5620-1/02, I).",
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 54 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/01": {
            "risco": "III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 46 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/03": {
            "risco": "II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 46 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "1053-8/00": {
            "risco": "III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 16 do PDF",
            "provisorio": false,
            "segueFederal": false
        },
        "1099-6/99": {
            "risco": "III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SES/RS 192/2022",
            "onde": "Anexo I, p. 17 do PDF",
            "provisorio": false,
            "segueFederal": false
        }
    },
    "pa": {
        "8630-5/01": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "8630-5/02": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "8630-5/03": {
            "risco": "Depende de informação",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo IV: haverá a realização de procedimentos invasivos? Sim: nível III (alto risco). Não: nível II (médio risco).",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Nível de risco III (alto risco)",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Nível de risco II (médio risco)",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo III, pergunta 46",
            "provisorio": false,
            "segueFederal": true
        },
        "8630-5/04": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "8650-0/01": {
            "risco": "Depende de informação",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo IV: haverá a realização de procedimentos invasivos? Sim: nível III (alto risco). Não: nível II (médio risco).",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Nível de risco III (alto risco)",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Nível de risco II (médio risco)",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo III, pergunta 46",
            "provisorio": false,
            "segueFederal": true
        },
        "8650-0/99": {
            "risco": "Depende de informação",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo IV: haverá a realização de procedimentos invasivos? Sim: nível III (alto risco). Não: nível II (médio risco).",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Nível de risco III (alto risco)",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Nível de risco II (médio risco)",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo III, pergunta 46",
            "provisorio": false,
            "segueFederal": true
        },
        "8650-0/04": {
            "risco": "baixo risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto estadual 1.098/2020",
            "onde": "Anexo I (Atividades de baixo risco), p. 6 do texto compilado da SEMAS; art. 4º: baixo risco para fins de segurança sanitária e ambiental, dispensado de todos os atos públicos de liberação (art. 5º)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/02": {
            "risco": "baixo risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto estadual 1.098/2020",
            "onde": "Anexo I (Atividades de baixo risco), p. 7 do texto compilado da SEMAS; art. 4º: baixo risco para fins de segurança sanitária e ambiental, dispensado de todos os atos públicos de liberação (art. 5º)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/03": {
            "risco": "baixo risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto estadual 1.098/2020",
            "onde": "Anexo I (Atividades de baixo risco), p. 7 do texto compilado da SEMAS; art. 4º: baixo risco para fins de segurança sanitária e ambiental, dispensado de todos os atos públicos de liberação (art. 5º)",
            "provisorio": false,
            "segueFederal": false
        },
        "8640-2/99": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "9602-5/02": {
            "risco": "Depende de informação",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo IV: haverá a realização de procedimentos invasivos? Sim: nível III (alto risco). Não: nível II (médio risco).",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Nível de risco III (alto risco)",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Nível de risco II (médio risco)",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo III, pergunta 46",
            "provisorio": false,
            "segueFederal": true
        },
        "8211-3/00": {
            "risco": "baixo risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto estadual 1.098/2020",
            "onde": "Anexo I (Atividades de baixo risco), p. 14 do texto compilado da SEMAS; art. 4º: baixo risco para fins de segurança sanitária e ambiental, dispensado de todos os atos públicos de liberação (art. 5º)",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/01": {
            "risco": "baixo risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto estadual 1.098/2020",
            "onde": "Anexo I (Atividades de baixo risco), p. 7 do texto compilado da SEMAS; art. 4º: baixo risco para fins de segurança sanitária e ambiental, dispensado de todos os atos públicos de liberação (art. 5º)",
            "provisorio": false,
            "segueFederal": false
        },
        "9609-2/06": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "8690-9/01": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "8690-9/03": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "8690-9/04": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "8650-0/05": {
            "risco": "baixo risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto estadual 1.098/2020",
            "onde": "Anexo I (Atividades de baixo risco), p. 7 do texto compilado da SEMAS; art. 4º: baixo risco para fins de segurança sanitária e ambiental, dispensado de todos os atos públicos de liberação (art. 5º)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/06": {
            "risco": "baixo risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto estadual 1.098/2020",
            "onde": "Anexo I (Atividades de baixo risco), p. 6 do texto compilado da SEMAS; art. 4º: baixo risco para fins de segurança sanitária e ambiental, dispensado de todos os atos públicos de liberação (art. 5º)",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/02": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "8711-5/01": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "5611-2/01": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "5611-2/03": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "1091-1/02": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "4721-1/02": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "4711-3/02": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "4712-1/00": {
            "risco": "baixo risco",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto estadual 1.098/2020",
            "onde": "Anexo I (Atividades de baixo risco), p. 9 do texto compilado da SEMAS; art. 4º: baixo risco para fins de segurança sanitária e ambiental, dispensado de todos os atos públicos de liberação (art. 5º)",
            "provisorio": false,
            "segueFederal": false
        },
        "4724-5/00": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "4722-9/01": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "4722-9/02": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "5620-1/04": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "5620-1/02": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "5620-1/01": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "5620-1/03": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": true
        },
        "1053-8/00": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        },
        "1099-6/99": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": true
        }
    },
    "manaus": {
        "8630-5/01": {
            "risco": "Alto Risco",
            "complexidade": "4",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/02": {
            "risco": "Alto Risco",
            "complexidade": "3",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/03": {
            "risco": "Baixo Risco B",
            "complexidade": "1",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/04": {
            "risco": "Alto Risco",
            "complexidade": "4",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/01": {
            "risco": "Baixo Risco A, Baixo Risco B ou Alto Risco",
            "complexidade": null,
            "condicao": "O decreto não diz qual é a pergunta: o art. 30, § 4º só diz que o risco sai das respostas a perguntas no pedido eletrônico (SLIM), e pode dar Baixo Risco A, Baixo Risco B ou Alto Risco. A coluna de complexidade traz \"*\".",
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/99": {
            "risco": "Baixo Risco A, Baixo Risco B ou Alto Risco",
            "complexidade": null,
            "condicao": "O decreto não diz qual é a pergunta: o art. 30, § 4º só diz que o risco sai das respostas a perguntas no pedido eletrônico (SLIM), e pode dar Baixo Risco A, Baixo Risco B ou Alto Risco. A coluna de complexidade traz \"*\".",
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/04": {
            "risco": "Baixo Risco B",
            "complexidade": "1",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/02": {
            "risco": "Baixo Risco B",
            "complexidade": "1",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/03": {
            "risco": "Baixo Risco B",
            "complexidade": "1",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8640-2/99": {
            "risco": "Alto Risco",
            "complexidade": "5",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/02": {
            "risco": "Baixo Risco A, Baixo Risco B ou Alto Risco",
            "complexidade": null,
            "condicao": "O decreto não diz qual é a pergunta: o art. 30, § 4º só diz que o risco sai das respostas a perguntas no pedido eletrônico (SLIM), e pode dar Baixo Risco A, Baixo Risco B ou Alto Risco. A coluna de complexidade traz \"*\".",
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8211-3/00": {
            "risco": "Baixo Risco A",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/01": {
            "risco": "Baixo Risco B",
            "complexidade": "2",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "9609-2/06": {
            "risco": "Alto Risco",
            "complexidade": "4",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/01": {
            "risco": "Baixo Risco B",
            "complexidade": "1",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/03": {
            "risco": "Baixo Risco B",
            "complexidade": "3",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/04": {
            "risco": "Baixo Risco B",
            "complexidade": "2",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/05": {
            "risco": "Baixo Risco B",
            "complexidade": "1",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/06": {
            "risco": "Baixo Risco B",
            "complexidade": "1",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/02": {
            "risco": "Alto Risco",
            "complexidade": "4",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/01": {
            "risco": "Alto Risco",
            "complexidade": "5",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/01": {
            "risco": "Baixo Risco B",
            "complexidade": "3",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/03": {
            "risco": "Baixo Risco B",
            "complexidade": "2",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/04": {
            "risco": "Baixo Risco B",
            "complexidade": "2",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/05": {
            "risco": "Baixo Risco B",
            "complexidade": "2",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "1091-1/02": {
            "risco": "Baixo Risco B",
            "complexidade": "2",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "4721-1/02": {
            "risco": "Baixo Risco B",
            "complexidade": "2",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "4711-3/02": {
            "risco": "Baixo Risco B",
            "complexidade": "3",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "4712-1/00": {
            "risco": "Baixo Risco B",
            "complexidade": "2",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "4724-5/00": {
            "risco": "Baixo Risco B",
            "complexidade": "1",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/01": {
            "risco": "Baixo Risco B",
            "complexidade": "2",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/02": {
            "risco": "Baixo Risco B",
            "complexidade": "2",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/04": {
            "risco": "Baixo Risco B",
            "complexidade": "3",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/02": {
            "risco": "Baixo Risco B",
            "complexidade": "3",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "8230-0/02": {
            "risco": "Baixo Risco A",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/01": {
            "risco": "Alto Risco",
            "complexidade": "3",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/03": {
            "risco": "Baixo Risco B",
            "complexidade": "1",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "1053-8/00": {
            "risco": "Alto Risco",
            "complexidade": "3",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        },
        "1099-6/99": {
            "risco": "Alto Risco",
            "complexidade": "3",
            "condicao": null,
            "opcoes": [],
            "norma": "Decreto Manaus 4.648/2019",
            "onde": "Anexo VI, colunas Risco Sanitário (RS) e Tipo de Atividade/Risco à Saúde (Complexidade), linha da especialização 00",
            "provisorio": false,
            "segueFederal": false
        }
    },
    "am": {
        "8630-5/01": {
            "risco": "RISCO III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 65 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/02": {
            "risco": "RISCO III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 65 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/03": {
            "risco": "PERG (ALTO OU MEDIO)",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo V: \"Haverá no exercício da atividade a realização de procedimentos invasivos?\" Sim: RISCO III (alto risco). Não: RISCO II (médio risco), conforme a legenda \"Risco II com perguntas\" do art. 5º, § 2º.",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "RISCO III",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "RISCO II",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 65 do PDF da FVS-RCP, pergunta 46",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/04": {
            "risco": "RISCO III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 65 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/01": {
            "risco": "PERG (ALTO OU MEDIO)",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo V: \"Haverá no exercício da atividade a realização de procedimentos invasivos?\" Sim: RISCO III (alto risco). Não: RISCO II (médio risco), conforme a legenda \"Risco II com perguntas\" do art. 5º, § 2º.",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "RISCO III",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "RISCO II",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 66 do PDF da FVS-RCP, pergunta 46",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/99": {
            "risco": "PERG (ALTO OU MEDIO)",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo V: \"Haverá no exercício da atividade a realização de procedimentos invasivos?\" Sim: RISCO III (alto risco). Não: RISCO II (médio risco), conforme a legenda \"Risco II com perguntas\" do art. 5º, § 2º.",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "RISCO III",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "RISCO II",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 66 do PDF da FVS-RCP, pergunta 46",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/04": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 66 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/02": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 66 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/03": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 66 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "8640-2/99": {
            "risco": "RISCO III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 65 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/02": {
            "risco": "PERG (ALTO OU MEDIO)",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo V: \"Haverá no exercício da atividade a realização de procedimentos invasivos?\" Sim: RISCO III (alto risco). Não: RISCO II (médio risco), conforme a legenda \"Risco II com perguntas\" do art. 5º, § 2º.",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "RISCO III",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "RISCO II",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 69 do PDF da FVS-RCP, pergunta 46",
            "provisorio": false,
            "segueFederal": false
        },
        "8211-3/00": {
            "risco": "Dispensado de Licenciamento",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 63 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/01": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 69 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "9609-2/06": {
            "risco": "RISCO III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 69 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/01": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 66 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/03": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 66 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/04": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 66 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/05": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 66 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/06": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 66 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/02": {
            "risco": "RISCO III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 66 do PDF da FVS-RCP. O número solto (53 ou 65) na coluna PERGUNTA desta linha é o número de página do diário, não pergunta: o Anexo V só vai até a 47.",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/01": {
            "risco": "RISCO III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 66 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/01": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 54 do PDF da FVS-RCP. O número solto (53 ou 65) na coluna PERGUNTA desta linha é o número de página do diário, não pergunta: o Anexo V só vai até a 47.",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/03": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 54 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/04": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 54 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/05": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 54 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "1091-1/02": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 20 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "4721-1/02": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 48 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "4711-3/02": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 48 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "4712-1/00": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 48 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "4724-5/00": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 48 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/01": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 48 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/02": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 48 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/04": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 54 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/02": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 54 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "8230-0/02": {
            "risco": "RISCO I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 63 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/01": {
            "risco": "RISCO III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 54 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/03": {
            "risco": "RISCO II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 54 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "1053-8/00": {
            "risco": "RISCO III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 20 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        },
        "1099-6/99": {
            "risco": "RISCO III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "RN 01/2021 da FVS-RCP",
            "onde": "Anexo IV (Tabela de Classificação de Riscos das Atividades Econômicas), p. 21 do PDF da FVS-RCP",
            "provisorio": false,
            "segueFederal": false
        }
    },
    "ba": {
        "8630-5/01": {
            "risco": "Alto risco ou nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo I (atividades de alto risco ou nível de risco III). Consta também no Anexo VII: licenciamento continua com a VISA municipal (Grupo 1 da Res. CIB/BA 34/2016).",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/02": {
            "risco": "Alto risco ou nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo I (atividades de alto risco ou nível de risco III). Consta também no Anexo VII: licenciamento continua com a VISA municipal (Grupo 1 da Res. CIB/BA 34/2016).",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/03": {
            "risco": "DI - Depende de Informação",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo IV: \"Haverá no exercício da atividade a realização de procedimentos invasivos?\" Sim: alto risco ou nível de risco III. Não: médio risco ou nível de risco II (art. 3º, § 4º).",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto risco ou nível de risco III",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Médio risco ou nível de risco II",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo IV (atividades dependentes de informação), pergunta 46",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/04": {
            "risco": "Alto risco ou nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo I (atividades de alto risco ou nível de risco III). Consta também no Anexo VII: licenciamento continua com a VISA municipal (Grupo 1 da Res. CIB/BA 34/2016).",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/01": {
            "risco": "DI - Depende de Informação",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo IV: \"Haverá no exercício da atividade a realização de procedimentos invasivos?\" Sim: alto risco ou nível de risco III. Não: médio risco ou nível de risco II (art. 3º, § 4º).",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto risco ou nível de risco III",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Médio risco ou nível de risco II",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo IV (atividades dependentes de informação), pergunta 46",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/99": {
            "risco": "DI - Depende de Informação",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo IV: \"Haverá no exercício da atividade a realização de procedimentos invasivos?\" Sim: alto risco ou nível de risco III. Não: médio risco ou nível de risco II (art. 3º, § 4º).",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto risco ou nível de risco III",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Médio risco ou nível de risco II",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo IV (atividades dependentes de informação), pergunta 46",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/04": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/02": {
            "risco": "Baixo risco ou nível de risco I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo III (atividades de baixo risco ou nível de risco I)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/03": {
            "risco": "Baixo risco ou nível de risco I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo III (atividades de baixo risco ou nível de risco I)",
            "provisorio": false,
            "segueFederal": false
        },
        "8640-2/99": {
            "risco": "Alto risco ou nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo I (atividades de alto risco ou nível de risco III)",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/02": {
            "risco": "DI - Depende de Informação",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo IV: \"Haverá no exercício da atividade a realização de procedimentos invasivos?\" Sim: alto risco ou nível de risco III. Não: médio risco ou nível de risco II (art. 3º, § 4º).",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Alto risco ou nível de risco III",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Médio risco ou nível de risco II",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo IV (atividades dependentes de informação), pergunta 46. Consta também no Anexo VIII: licenciamento com a VISA municipal.",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/01": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "9609-2/06": {
            "risco": "Alto risco ou nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo I (atividades de alto risco ou nível de risco III). Consta também no Anexo VII: licenciamento continua com a VISA municipal (Grupo 1 da Res. CIB/BA 34/2016).",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/01": {
            "risco": "Baixo risco ou nível de risco I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo III (atividades de baixo risco ou nível de risco I)",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/03": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/04": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/05": {
            "risco": "Baixo risco ou nível de risco I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo III (atividades de baixo risco ou nível de risco I)",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/06": {
            "risco": "Baixo risco ou nível de risco I",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo III (atividades de baixo risco ou nível de risco I)",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/02": {
            "risco": "Alto risco ou nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo I (atividades de alto risco ou nível de risco III). Consta também no Anexo VII: licenciamento continua com a VISA municipal (Grupo 1 da Res. CIB/BA 34/2016).",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/01": {
            "risco": "Alto risco ou nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo I (atividades de alto risco ou nível de risco III)",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/01": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/03": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/04": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/05": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "1091-1/02": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "4721-1/02": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "4711-3/02": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "4712-1/00": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "4724-5/00": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/01": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/02": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/04": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/02": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/01": {
            "risco": "Alto risco ou nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo I (atividades de alto risco ou nível de risco III)",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/03": {
            "risco": "Médio risco ou nível de risco II",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo II (atividades de médio risco ou nível de risco II)",
            "provisorio": false,
            "segueFederal": false
        },
        "1053-8/00": {
            "risco": "Alto risco ou nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo I (atividades de alto risco ou nível de risco III)",
            "provisorio": false,
            "segueFederal": false
        },
        "1099-6/99": {
            "risco": "Alto risco ou nível de risco III",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "Portaria SESAB 101/2020",
            "onde": "Anexo I (atividades de alto risco ou nível de risco III)",
            "provisorio": false,
            "segueFederal": false
        }
    },
    "federal": {
        "8630-5/01": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/02": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/03": {
            "risco": "Depende de informação",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo IV: haverá a realização de procedimentos invasivos? Sim: nível III (alto risco). Não: nível II (médio risco).",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Nível de risco III (alto risco)",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Nível de risco II (médio risco)",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo III, pergunta 46",
            "provisorio": false,
            "segueFederal": false
        },
        "8630-5/04": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/01": {
            "risco": "Depende de informação",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo IV: haverá a realização de procedimentos invasivos? Sim: nível III (alto risco). Não: nível II (médio risco).",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Nível de risco III (alto risco)",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Nível de risco II (médio risco)",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo III, pergunta 46",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/99": {
            "risco": "Depende de informação",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo IV: haverá a realização de procedimentos invasivos? Sim: nível III (alto risco). Não: nível II (médio risco).",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Nível de risco III (alto risco)",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Nível de risco II (médio risco)",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo III, pergunta 46",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/04": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/02": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/03": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "8640-2/99": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/02": {
            "risco": "Depende de informação",
            "complexidade": null,
            "condicao": "Pergunta 46 do Anexo IV: haverá a realização de procedimentos invasivos? Sim: nível III (alto risco). Não: nível II (médio risco).",
            "opcoes": [
                {
                    "se": "com procedimento invasivo",
                    "risco": "Nível de risco III (alto risco)",
                    "complexidade": null,
                    "invasivo": true
                },
                {
                    "se": "sem procedimento invasivo",
                    "risco": "Nível de risco II (médio risco)",
                    "complexidade": null,
                    "invasivo": false
                }
            ],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo III, pergunta 46",
            "provisorio": false,
            "segueFederal": false
        },
        "9602-5/01": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "9609-2/06": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/01": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/03": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "8690-9/04": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/05": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "8650-0/06": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/02": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": false
        },
        "8711-5/01": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/01": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "5611-2/03": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "1091-1/02": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "4721-1/02": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "4711-3/02": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "4712-1/00": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "4724-5/00": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/01": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "4722-9/02": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/04": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/02": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/01": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": false
        },
        "5620-1/03": {
            "risco": "Nível de risco II (médio risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo II",
            "provisorio": false,
            "segueFederal": false
        },
        "1053-8/00": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": false
        },
        "1099-6/99": {
            "risco": "Nível de risco III (alto risco)",
            "complexidade": null,
            "condicao": null,
            "opcoes": [],
            "norma": "IN Anvisa 66/2020",
            "onde": "Anexo I",
            "provisorio": false,
            "segueFederal": false
        }
    }
};
//# sourceMappingURL=riscoCnae.js.map