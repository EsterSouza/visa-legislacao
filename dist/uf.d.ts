/** Normaliza UF/nome de estado (remove acentos, espaços nas bordas, caixa) para comparação. */
export declare function normalizeStateName(value?: string | null): string;
/** Lista para popular selects de estado, na ordem alfabética do nome. */
export declare const UF_OPTIONS: {
    uf: string;
    name: string;
}[];
/**
 * Sigla da UF a partir de sigla ou nome por extenso, tolerando acento, caixa e
 * espaços. O estado do cliente é texto livre de origem ("Goias", "Sao Paulo",
 * "rj "), então comparar a string crua perde a legislação estadual.
 * Devolve '' quando não reconhece. 'BR' é tratado como federal (devolve '').
 */
export declare function toUF(value?: string | null): string;
export declare function isRioState(value?: string | null): boolean;
//# sourceMappingURL=uf.d.ts.map