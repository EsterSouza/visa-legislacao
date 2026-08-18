/** Segmento de estabelecimento a que a norma se aplica. */
export type LegislationSegment = 'estetica' | 'ilpi' | 'alimentos' | 'saude';
/**
 * Situação de vigência apurada.
 * - `nao_verificado`: o ato entrou na base sem checagem de vigência. Continua
 *   sendo sugerido (é norma real), mas a UI o marca e ele aparece no relatório
 *   de pendências até alguém verificar. Nunca afirme vigência sem `verifiedAt`.
 */
export type LegislationStatus = 'vigente' | 'vigente_com_alteracoes' | 'revogada' | 'nao_verificado';
export interface LegislationEntry {
    /** Grafia canônica do ato, usada no relatório e na biblioteca. */
    name: string;
    summary: string;
    url: string;
    /**
     * Entidade responsável pelo ato, na forma da entrada de autoria da ABNT NBR 6023
     * (ex.: 'BRASIL. Ministério da Saúde', 'RIO DE JANEIRO (Município)'). É a única
     * fonte de autoria da citação — nenhum gerador deduz órgão por conta própria.
     */
    authority: string;
    /**
     * Referência ABNT NBR 6023 completa, escrita à mão (com data do ato, local de
     * publicação e "Disponível em"). Quando ausente, `formatAbnt` monta uma forma
     * curta a partir de `authority` + `name` + `summary` + `url`.
     */
    abnt?: string;
    /** UF de abrangência; ausente/null = federal ou nacional. */
    uf?: string | null;
    /** Município de abrangência; exige `uf`. Ausente = alcança a UF inteira. */
    municipio?: string | null;
    /** Segmentos para sugestão automática; ausente = nenhum. */
    segments?: LegislationSegment[];
    status: LegislationStatus;
    /** Ato que substituiu este, quando `status` é 'revogada'. */
    replacedBy?: string;
    /** Data da última verificação de vigência (ISO, AAAA-MM-DD). Ausente = não verificado. */
    verifiedAt?: string;
    /**
     * Cache de pesquisa: artigos já lidos, o que dizem e em que curadoria foram
     * usados. Existe para não repetir a mesma leitura de norma (e o mesmo gasto de
     * tokens) numa consulta futura.
     */
    researchNotes?: string;
}
//# sourceMappingURL=types.d.ts.map