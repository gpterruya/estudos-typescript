/**
 * 🎯 Objetivo do Dia 22:
 * 1. Criar tipos dinâmicos e reutilizáveis
 * 2. Aprender a usar condicional, inferência e mapeamento de tipos
 * 3. Tornar seu SDK e rotas completamente inferíveis
 * 4. Gerar tipos automáticos para entradas e saídas
 * 5. Garantir completude e segurança máxima sem repetir tipos
 */

/**
 * ✅ 1. Inferência automática com z.infer
 * Você já conhece:
 */

import { z } from "zod";

const schema = z.object({
  nome: z.string(),
  idade: z.number(),
});

type Pessoa = z.infer<typeof schema>; // ✅

/**
 * Mas... imagine que temos várias rotas com schemas. Podemos mapear automaticamente todas as entradas e saídas com um tipo genérico.
 */

/**
 * ✅ 2. Criando tipagem global de rotas
 */

type Rota<Metodo extends string, Caminho extends string, Input, Output> = {
  metodo: Metodo;
  caminho: Caminho;
  schemaEntrada: Input;
  schemaSaida: Output;
};

/**
 * ✅ 3. Exemplo de rotas com tipagem refinada
 */

import { z } from "zod";

const schemaCriarUsuario = z.object({
  nome: z.string(),
  idade: z.number(),
});

const schemaUsuarioSaida = z.object({
  id: z.number(),
  nome: z.string(),
});

export const rotas = {
  criarUsuario: {
    metodo: "POST",
    caminho: "/usuario",
    schemaEntrada: schemaCriarUsuario,
    schemaSaida: schemaUsuarioSaida,
  },
};

/**
 * Agora podemos extrair os tipos dinamicamente:
 */

type Entrada<T> = T extends { schemaEntrada: infer I } ? z.infer<I> : never;
type Saida<T> = T extends { schemaSaida: infer O } ? z.infer<O> : never;

type EntradaUsuario = Entrada<typeof rotas.criarUsuario>; // { nome: string; idade: number; }
type SaidaUsuario = Saida<typeof rotas.criarUsuario>;     // { id: number; nome: string; }

/**
 * ✅ 4. Gerar SDK baseado em tipos
 */

function createSmartSDK<R extends Record<string, any>>(rotas: R) {
  const sdk: Record<string, any> = {};

  for (const chave in rotas) {
    const rota = rotas[chave];
    sdk[chave] = async (input: Entrada<typeof rota>): Promise<Saida<typeof rota>> => {
      const res = await fetch(rota.caminho, {
        method: rota.metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      return res.json();
    };
  }

  return sdk as {
    [K in keyof R]: (input: Entrada<R[K]>) => Promise<Saida<R[K]>>;
  };
}

/**
 * ✅ Uso:
 */

const sdk = createSmartSDK(rotas);

sdk.criarUsuario({ nome: "Gabriel", idade: 28 }).then((res) => {
  res.id;    // tipo inferido: number
  res.nome;  // tipo inferido: string
});

/**
 * ✅ 5. Extra: Gerar tipos de contrato/exportação automática
 * Você pode exportar:
 */

export type Contract = {
  [K in keyof typeof rotas]: {
    input: Entrada<typeof rotas[K]>;
    output: Saida<typeof rotas[K]>;
    path: typeof rotas[K]["caminho"];
    method: typeof rotas[K]["metodo"];
  };
};

/**
 * E usar em outro projeto (frontend) com segurança total.
 */

/**
 * 🧪 Desafio do Dia 22:
 * 1. Crie 2 rotas com Zod: criarProduto e buscarProduto
 * 2. Tipifique suas entradas e saídas automaticamente com z.infer
 * 3. Crie um tipo Contract que mapeia todas as rotas
 * 4. Escreva uma função createSmartSDK(contract) com inferência 100%
 * 5. Use esse SDK simulando requisições fetch, com autocomplete
 */

// 🗂️ Estrutura
// .
// ├─ rotas.ts
// ├─ sdk.ts
// ├─ main.ts

// rotas.ts
import { z } from "zod";

const schemaCriarProduto = z.object({
  nome: z.string(),
  preco: z.number().min(0),
});

const schemaProdutoSaida = z.object({
  id: z.number(),
  nome: z.string(),
  preco: z.number(),
});

const schemaBuscarProduto = z.object({
  id: z.number(),
});

export const rotas = {
  criarProduto: {
    metodo: "POST",
    caminho: "/produto",
    schemaEntrada: schemaCriarProduto,
    schemaSaida: schemaProdutoSaida,
  },

  buscarProduto: {
    metodo: "GET",
    caminho: "/produto/:id",
    schemaEntrada: schemaBuscarProduto,
    schemaSaida: schemaProdutoSaida,
  },
};

import { z } from "zod";

// Inferência genérica das rotas
export type Entrada<T> = T extends { schemaEntrada: infer I } ? z.infer<I> : never;
export type Saida<T> = T extends { schemaSaida: infer O } ? z.infer<O> : never;

export type Contract = {
  [K in keyof typeof rotas]: {
    input: Entrada<typeof rotas[K]>;
    output: Saida<typeof rotas[K]>;
    path: typeof rotas[K]["caminho"];
    method: typeof rotas[K]["metodo"];
  };
};

// sdk.ts
import { rotas } from "./rotas";
import { Entrada, Saida } from "./tipos"; // opcional separar

export function createSmartSDK<R extends Record<string, any>>(rotas: R) {
  const sdk: any = {};

  for (const chave in rotas) {
    const rota = rotas[chave];
    sdk[chave] = async (input: Entrada<typeof rota>): Promise<Saida<typeof rota>> => {
      console.log(`🟢 Chamando ${rota.metodo} ${rota.caminho}`, input);
      // Simulando resposta
      return {
        id: 1,
        nome: "Produto Teste",
        preco: 99.9,
      } as Saida<typeof rota>;
    };
  }

  return sdk as {
    [K in keyof R]: (input: Entrada<R[K]>) => Promise<Saida<R[K]>>;
  };
}

// main.ts
import { rotas } from "./rotas";
import { createSmartSDK } from "./sdk";

const sdk = createSmartSDK(rotas);

// Autocomplete e tipagem automática:
async function exemplo() {
  const novoProduto = await sdk.criarProduto({
    nome: "Teclado Gamer",
    preco: 199.9,
  });

  console.log(novoProduto.id);    // number
  console.log(novoProduto.nome);  // string

  const buscado = await sdk.buscarProduto({ id: 1 });
  console.log(buscado.nome); // string
}

exemplo();