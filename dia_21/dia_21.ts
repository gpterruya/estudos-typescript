/**
 * 🎯 Objetivo do Dia 21:
 * 1. Criar um mini framework de rotas
 * 2. Validar entradas com Zod (ou schema próprio)
 * 3. Gerar tipos automáticos para o cliente (SDK)
 * 4. Permitir requisições GET, POST com segurança total de tipos
 * 5. Exportar um client SDK tipado
 * 6. Gerar documentação automática
 * 7. Incluir testes com cobertura completa
 */

/**
 * 🛠️ Estrutura do framework
 * meu-framework/
   ├─ src/
   │  ├─ router.ts          # Framework principal
   │  ├─ sdk.ts             # SDK client-side
   │  ├─ docs.ts            # Geração de docs
   │  └─ app.ts             # Onde as rotas são registradas
   ├─ tests/
   │  └─ rotas.test.ts
 */

/**
 * ✅ 1. Criando o registrador de rotas
 * 📄 router.ts
 */

import { z, ZodSchema } from "zod";

type RouteDef = {
  method: "GET" | "POST";
  path: string;
  schema: ZodSchema<any>;
  handler: (input: any) => any;
};

const routes: RouteDef[] = [];

export function defineRoute<M extends "GET" | "POST">(
  method: M,
  path: string,
  schema: ZodSchema<any>,
  handler: (input: z.infer<typeof schema>) => any
) {
  routes.push({ method, path, schema, handler });
}

export function getRoutes() {
  return routes;
}

/**
 * ✅ 2. Criando rotas tipadas
 * 📄 app.ts
 */

import { z } from "zod";
import { defineRoute } from "./router";

defineRoute("POST", "/usuario", z.object({
  nome: z.string(),
  idade: z.number().min(18)
}), ({ nome, idade }) => {
  return { id: 1, nome, idade };
});

defineRoute("GET", "/saudacao", z.object({ nome: z.string() }), ({ nome }) => {
  return `Olá, ${nome}!`;
});

/**
 * ✅ 3. Gerando o SDK tipado
 * 📄 sdk.ts
 */

import { getRoutes } from "./router";

export function createClient(baseUrl: string) {
  const sdk: any = {};

  for (const route of getRoutes()) {
    const key = route.path.replace("/", "").replace(":", "");
    sdk[key] = async (input: any) => {
      const res = await fetch(`${baseUrl}${route.path}`, {
        method: route.method,
        headers: { "Content-Type": "application/json" },
        body: route.method === "POST" ? JSON.stringify(input) : undefined,
      });

      return res.json();
    };
  }

  return sdk;
}

/**
 * ✅ 4. Gerando documentação automática
 * 📄 docs.ts
 */

import { getRoutes } from "./router";

export function gerarDocumentacao() {
  const rotas = getRoutes();
  return rotas.map(r => ({
    metodo: r.method,
    caminho: r.path,
    esquemaEntrada: r.schema.toString(),
  }));
}

console.log(gerarDocumentacao());

/**
 * ✅ 5. Testando seu framework
 * 📄 tests/rotas.test.ts
 */

import { describe, it, expect } from "vitest";
import { getRoutes } from "../src/router";

describe("Framework de rotas", () => {
  it("deve registrar rotas corretamente", () => {
    const rotas = getRoutes();
    expect(rotas.length).toBeGreaterThan(0);
    expect(rotas[0]).toHaveProperty("path");
    expect(rotas[0]).toHaveProperty("schema");
  });
});

/**
 * ✅ 6. Executando tudo junto
 */

// main.ts
import "./src/app";
import { createClient } from "./src/sdk";

const sdk = createClient("http://localhost:3000");

sdk.usuario({ nome: "Gabriel", idade: 25 }).then(console.log);

/**
 * 🧪 Desafio do Dia 21:
 * 1. Crie rotas GET /produto/:id e POST /produto com Zod
 * 2. Gere o SDK client para essas rotas
 * 3. Adicione geração automática de .d.ts para o SDK (via z.infer)
 * 4. Gere documentação JSON com nome, método, path e entrada esperada
 * 5. (Avançado) Exporte seu mini-framework como um pacote NPM
 */

// src/app.ts
import { z } from "zod";
import { defineRoute } from "./router";

// POST /produto
defineRoute("POST", "/produto", z.object({
  nome: z.string(),
  preco: z.number().min(0),
}), ({ nome, preco }) => {
  return { id: 1, nome, preco };
});

// GET /produto/:id
defineRoute("GET", "/produto/:id", z.object({
  id: z.string().regex(/^\d+$/),
}), ({ id }) => {
  return { id: Number(id), nome: "Mouse", preco: 120 };
});

// src/sdk.ts
import { getRoutes } from "./router";

export function createClient(baseUrl: string) {
  const sdk: Record<string, (input: any) => Promise<any>> = {};

  for (const route of getRoutes()) {
    const key = route.path
      .replace("/", "")
      .replace(/[:/]/g, "_");

    sdk[key] = async (input: any) => {
      let url = `${baseUrl}${route.path}`;

      // Substituir parâmetros da URL se houver
      if (route.method === "GET") {
        for (const [k, v] of Object.entries(input)) {
          url = url.replace(`:${k}`, encodeURIComponent(String(v)));
        }
      }

      const res = await fetch(url, {
        method: route.method,
        headers: { "Content-Type": "application/json" },
        body: route.method === "POST" ? JSON.stringify(input) : undefined,
      });

      return res.json();
    };
  }

  return sdk;
}

// src/types.ts
import { z } from "zod";

export const ProdutoInput = z.object({
  nome: z.string(),
  preco: z.number(),
});

export const ProdutoByIdInput = z.object({
  id: z.string().regex(/^\d+$/),
});

export type ProdutoInputType = z.infer<typeof ProdutoInput>;
export type ProdutoByIdInputType = z.infer<typeof ProdutoByIdInput>;

// src/docs.ts
import { getRoutes } from "./router";

export function gerarDocumentacao() {
  return getRoutes().map((r) => ({
    metodo: r.method,
    path: r.path,
    entrada: r.schema.shape,
  }));
}

console.log(JSON.stringify(gerarDocumentacao(), null, 2));

// meu-framework/
// ├─ src/
// │  ├─ router.ts
// │  ├─ sdk.ts
// │  ├─ docs.ts
// │  └─ index.ts         ← arquivo principal de exportação
// ├─ package.json
// ├─ tsconfig.json
// ├─ README.md

//src/index.ts
// export * from "./router";
// export * from "./sdk";
// export * from "./docs";

//tsconfig.json
// {
//   "compilerOptions": {
//     "target": "ES2020",
//     "module": "ESNext",
//     "declaration": true,
//     "outDir": "./dist",
//     "moduleResolution": "Node",
//     "esModuleInterop": true,
//     "strict": true,
//     "skipLibCheck": true
//   },
//   "include": ["src"]
// }

// npx tsc

//package.json
// {
//   "name": "zod-router-sdk",
//   "version": "1.0.0",
//   "description": "Mini-framework com validação, rotas e geração de SDKs com TypeScript e Zod",
//   "main": "dist/index.js",
//   "types": "dist/index.d.ts",
//   "scripts": {
//     "build": "tsc",
//     "prepublishOnly": "npm run build"
//   },
//   "keywords": ["typescript", "sdk", "zod", "router", "api"],
//   "author": "Gabriel Porto Terruya",
//   "license": "MIT",
//   "dependencies": {
//     "zod": "^3.0.0"
//   },
//   "devDependencies": {
//     "typescript": "^5.0.0"
//   }
// }

// Crie sua conta: https://www.npmjs.com/signup
// Faça login no terminal:
// npm login
// Execute:
// npm publish --access public
// ✅ Pronto! Seu pacote pode ser instalado com:
// npm install zod-router-sdk
