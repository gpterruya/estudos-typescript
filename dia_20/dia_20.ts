/**
 * 🎯 Objetivo do Dia 20:
 * 1. Criar testes unitários e e2e com TypeScript
 * 2. Usar tipagem forte nos testes
 * 3. Validar funções, APIs e tipos com segurança
 * 4. Integrar Zod e tRPC nos testes com inferência total
 * 5. Aprender boas práticas de organização e cobertura de testes
 */

/**
 * ✅ 1. Instalando estrutura de testes com TypeScript
 * Usaremos Vitest, que tem ótima integração com TS:
 * npm install -D vitest
 */

/**
 * No package.json:
 * {
  "scripts": {
    "test": "vitest"
  }
}
 */

/**
 * ✅ 2. Primeiro teste com TypeScript
 */

// src/math.ts
export function soma(a: number, b: number): number {
  return a + b;
}

// tests/math.test.ts
import { describe, it, expect } from "vitest";
import { soma } from "../src/math";

describe("Função soma", () => {
  it("soma dois números corretamente", () => {
    expect(soma(2, 3)).toBe(5);
  });

  it("erro se passar string", () => {
    // @ts-expect-error
    soma("a", "b"); // Aqui o TS avisa no momento da escrita
  });
});

// ✅ Você já testou e garantiu tipo antes mesmo de rodar.

/**
 * ✅ 3. Testando Zod com TypeScript
 */

import { z } from "zod";

const schema = z.object({
  nome: z.string(),
  idade: z.number().min(18),
});

type Pessoa = z.infer<typeof schema>;

// tests/schema.test.ts
import { describe, it, expect } from "vitest";
import { schema } from "../src/schema";

describe("Validação de Pessoa", () => {
  it("valida com sucesso", () => {
    const input = { nome: "Gabriel", idade: 28 };
    expect(() => schema.parse(input)).not.toThrow();
  });

  it("falha se idade for menor que 18", () => {
    const input = { nome: "Gabriel", idade: 10 };
    expect(() => schema.parse(input)).toThrow();
  });
});

/**
 * ✅ 4. Testando APIs com tipagem total (tRPC ou fetch)
 * Se estiver usando um client SDK gerado com TypeScript, seus testes podem ser 100% inferidos.
 * Exemplo com fetch tipado:
 */

import { describe, it, expect } from "vitest";

const buscarUsuario = async (id: number) => {
  const res = await fetch(`http://localhost:3000/usuario/${id}`);
  return res.json() as Promise<{ id: number; nome: string }>;
};

describe("API /usuario/:id", () => {
  it("retorna um usuário válido", async () => {
    const usuario = await buscarUsuario(1);
    expect(usuario).toHaveProperty("id");
    expect(typeof usuario.nome).toBe("string");
  });
});

/**
 * ✅ 5. Testes + tipos: anti-regressão e confiabilidade
 * Boas práticas:
 * ✅ Use @ts-expect-error quando quiser garantir que erros de tipo acontecem mesmo
 * ✅ Use z.infer para sincronizar schema ↔ type
 * ✅ Tipos nos testes garantem que você nunca teste algo obsoleto ou inválido
 */

/**
 * 🧪 Desafio do Dia 20:
 * 1. Crie uma função desconto(preco: number, porcentagem: number): number e teste:
 *  - resultado correto
 *  - erro se passar string (@ts-expect-error)
 * 2. Crie um schema Zod para Produto { nome, preco } e teste:
 *  - com dados válidos
 *  - com nome vazio e preco negativo
 * 3. Teste uma rota (ou função assíncrona) que retorna Usuario { id, nome }
 * 4. Use vitest --coverage para analisar a cobertura do seu código
 */