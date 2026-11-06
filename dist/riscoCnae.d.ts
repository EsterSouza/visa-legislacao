export interface OpcaoRiscoCnae {
    se: string;
    risco: string | null;
    complexidade: string | null;
    invasivo: boolean | null;
}
export interface RiscoCnae {
    risco: string | null;
    complexidade: string | null;
    condicao: string | null;
    opcoes: OpcaoRiscoCnae[];
    norma: string | null;
    onde: string | null;
    provisorio: boolean;
    segueFederal: boolean;
}
export interface FaixaDeMulta {
    min: number | null;
    max: number | null;
}
export interface MultaSanitaria {
    norma: string;
    normaCompleta: string;
    url: string | null;
    onde: string | null;
    /** 'R$' ou a unidade fiscal (UFESP, Ufemg, UFM...). */
    unidade: string | null;
    valorUnidade: number | null;
    anoUnidade: number | null;
    /** leve, grave, gravissima; ou geral, quando a lei não separa por gravidade. */
    faixas: Partial<Record<'leve' | 'grave' | 'gravissima' | 'geral', FaixaDeMulta>>;
    dependeDe: string | null;
}
export interface TaxaSanitaria {
    norma: string;
    normaCompleta: string;
    url: string | null;
    onde: string | null;
    comoCalcula: string | null;
    ano: number | null;
    tabela: {
        criterio: string;
        valor: string;
    }[];
    /** Valor por CNAE, quando a tabela permite ligar a atividade ao código. */
    porCnae: Record<string, string> | null;
}
export interface LugarRiscoCnae {
    id: string;
    titulo: string;
    uf: string | null;
    municipio: string | null;
    normas: {
        nome: string;
        url: string | null;
        vigencia: string | null;
        comoConferiu: string | null;
    }[];
    /** O que a norma diz sobre o código que ela não lista. */
    semClassificacao: string | null;
    multa: MultaSanitaria | null;
    taxa: TaxaSanitaria | null;
    notas: string[];
}
/**
 * As opções que valem para quem faz (true) ou não faz (false) procedimento invasivo.
 * Sem resposta (undefined), devolve todas.
 */
export declare function opcoesDoRisco(r: RiscoCnae, invasivo?: boolean): OpcaoRiscoCnae[];
export declare const LUGARES_RISCO_CNAE: LugarRiscoCnae[];
export declare const RISCO_CNAE: Record<string, Record<string, RiscoCnae>>;
//# sourceMappingURL=riscoCnae.d.ts.map