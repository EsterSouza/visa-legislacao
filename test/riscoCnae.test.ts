import { describe, expect, it } from 'vitest';
import { LUGARES_RISCO_CNAE, RISCO_CNAE, opcoesDoRisco } from '../src/index.js';

describe('risco por CNAE', () => {
  it('todo lugar tem tabela, e todo valor cita a norma', () => {
    for (const l of LUGARES_RISCO_CNAE) {
      const tabela = RISCO_CNAE[l.id];
      expect(tabela, l.id).toBeDefined();
      for (const [cnae, r] of Object.entries(tabela)) {
        expect(cnae, l.id).toMatch(/^\d{4}-\d\/\d{2}$/);
        expect(r.norma, `${l.id} ${cnae}`).toBeTruthy();
        expect(r.risco || r.complexidade || r.opcoes.length, `${l.id} ${cnae}`).toBeTruthy();
        expect(new Set(r.opcoes.map((o) => o.se)).size, `${l.id} ${cnae}`).toBe(r.opcoes.length);
      }
    }
  });

  it('federal: injetáveis dependem da pergunta 46 e a resposta escolhe a opção', () => {
    const r = RISCO_CNAE.federal['8650-0/01'];
    expect(r.condicao).toMatch(/46/);
    expect(opcoesDoRisco(r, true).map((o) => o.risco)).toEqual(['Nível de risco III (alto risco)']);
    expect(opcoesDoRisco(r, false).map((o) => o.risco)).toEqual(['Nível de risco II (médio risco)']);
    expect(opcoesDoRisco(r)).toHaveLength(2);
  });

  it('Rio vem do decreto revogado e diz que é provisório; DF repete o federal', () => {
    expect(RISCO_CNAE['rio-capital']['8711-5/02']).toMatchObject({ risco: 'Alto', complexidade: 'Média', provisorio: true });
    expect(RISCO_CNAE.df['8630-5/01'].segueFederal).toBe(true);
  });

  it('nenhum texto leva travessão', () => {
    expect(JSON.stringify([LUGARES_RISCO_CNAE, RISCO_CNAE])).not.toContain('—');
  });
});
