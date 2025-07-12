/**
 * 🎯 Objetivo do Dia 28 – Desafio Final
 * Criar um sistema com:
 * | Componente        | Descrição                                            |
   | ----------------- | ---------------------------------------------------- |
   | **Backend**       | API REST simples com Express e rotas tipadas via Zod |
   | **Frontend**      | React (Next.js) que consome o SDK gerado             |
   | **SDK**           | Baseado nos schemas do backend (inferência 100%)     |
   | **Tipos globais** | Compartilhados entre todos os módulos                |
   | **CLI**           | Gera rotas, schemas e arquivos com input interativo  |
   | **CI/CD**         | Com GitHub Actions, ESLint, Prettier, testes         |
   | **Monorepo**      | Organizado com `pnpm` e `turbo`                      |
 */

/**
 * 🧩 Estrutura esperada
 * ts-fullstack-system/
   ├── apps/
   │   ├── backend/
   │   └── frontend/
   ├── packages/
   │   ├── types/
   │   ├── sdk/
   │   └── cli/
   ├── .github/workflows/
   ├── pnpm-workspace.yaml
   ├── turbo.json
   └── tsconfig.json
 */

/**
 * ✅ Etapas do Desafio Final
 * 🧱 1. Crie a estrutura base do monorepo
 * Use pnpm init + pnpm-workspace.yaml
 *  Configure turbo.json e tsconfig.json com paths
 */

/**
 * 🧠 2. Crie os tipos compartilhados
 */

// packages/types/src/index.ts
export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export interface Produto {
  id: number;
  nome: string;
  preco: number;
}

/**
 * 🛠️ 3. Implemente o backend
 */

// apps/backend/src/index.ts
import express from "express";
import { z } from "zod";
import { Usuario, Produto } from "@ts/types";

const app = express();
app.use(express.json());

app.get("/usuario", (_req, res) => {
  const usuario: Usuario = { id: 1, nome: "Gabriel", email: "gabriel@ex.com" };
  res.json(usuario);
});

app.get("/produto", (_req, res) => {
  const produto: Produto = { id: 42, nome: "Mouse Gamer", preco: 199.9 };
  res.json(produto);
});

app.listen(3001, () => console.log("API online na porta 3001"));

/**
 * 📦 4. SDK inteligente
 */

// packages/sdk/src/index.ts
import { Usuario, Produto } from "@ts/types";

export const sdk = {
  getUsuario: async (): Promise<Usuario> =>
    fetch("http://localhost:3001/usuario").then((res) => res.json()),

  getProduto: async (): Promise<Produto> =>
    fetch("http://localhost:3001/produto").then((res) => res.json()),
};

/**
 * 💻 5. Frontend com React ou Next.js
 */

// apps/frontend/pages/index.tsx
import { sdk } from "@ts/sdk";
import { useEffect, useState } from "react";

export default function Home() {
  const [usuario, setUsuario] = useState("");
  const [produto, setProduto] = useState("");

  useEffect(() => {
    sdk.getUsuario().then((u) => setUsuario(u.nome));
    sdk.getProduto().then((p) => setProduto(p.nome));
  }, []);

  return (
    <div>
      <h1>Bem-vindo, {usuario}!</h1>
      <p>Produto em destaque: {produto}</p>
    </div>
  );
}

/**
 * 🔧 6. CLI: Gerador de arquivos
 */

// packages/cli/src/index.ts
#!/usr/bin/env tsx
import prompts from "prompts";
import fs from "fs";

(async () => {
  const { nome } = await prompts({
    type: "text",
    name: "nome",
    message: "Qual o nome da nova rota?",
  });

  const content = `
import { Request, Response } from 'express';

export function ${nome}(req: Request, res: Response) {
  res.send("Rota ${nome} funcionando!");
}
`;

  fs.writeFileSync(`apps/backend/src/${nome}.ts`, content);
  console.log(`Rota ${nome}.ts criada com sucesso!`);
})();

/**
 * ✅ 7. CI/CD + scripts
 * 📄 .github/workflows/ci.yml
 * name: CI

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test
 */

/**
 * 🧪 8. Testes com Vitest (exemplo no SDK)
 */

// packages/sdk/src/sdk.test.ts
import { describe, it, expect } from "vitest";
import { sdk } from ".";

describe("SDK", () => {
  it("deve buscar usuário", async () => {
    const usuario = await sdk.getUsuario();
    expect(usuario).toHaveProperty("nome");
  });
});

/**
 * 🧼 9. Scripts globais
 * 📄 package.json (raiz):
 * "scripts": {
  "dev": "turbo run dev",
  "build": "turbo run build",
  "test": "turbo run test",
  "cli": "tsx packages/cli/src/index.ts"
}
 */

/**
 * 🧪 Desafio Final: checklist
✅ Monorepo com pnpm
✅ Backend com rotas reais
✅ Tipos globais com @ts/types
✅ SDK inteligente com retorno inferido
✅ CLI com geração de código
✅ Frontend consumindo SDK
✅ Testes com vitest
✅ CI/CD com GitHub Actions
✅ Linter, Prettier, padrão de projeto
 */

/**
 * 🏁 Missão final (opcional e poderosa)
 * Publique esse repositório como template no GitHub
 * Adicione um botão Use this template
 * Compartilhe com a comunidade ou use como base para freelas
 */