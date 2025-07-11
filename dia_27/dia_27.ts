/**
 * 🎯 Objetivo do Dia 27:
 * Criar um template fullstack com TypeScript
 * Incluir backend, frontend, SDK, tipos, CLI e testes
 * Organizar com monorepo (pnpm ou turborepo)
 * Adicionar CI/CD, linter, prettier e scripts padrão
 * Permitir clonar e começar qualquer app novo em minutos
 */

/**
 * ✅ 1. Estrutura base do template
 * ts-template/
   ├── apps/
   │   ├── backend/          ← API (NestJS, Express ou tRPC)
   │   └── frontend/         ← React ou Next.js
   ├── packages/
   │   ├── types/            ← Tipos globais compartilhados
   │   ├── sdk/              ← Client SDK baseado nas rotas
   │   └── cli/              ← Ferramenta de linha de comando
   ├── .github/workflows/   ← CI/CD GitHub Actions
   ├── .eslintrc.js         ← ESLint
   ├── .prettierrc          ← Prettier
   ├── turbo.json           ← Turborepo pipeline
   ├── tsconfig.json
   ├── pnpm-workspace.yaml
   └── README.md
 */

/**
 * ✅ 2. Monorepo com pnpm
 * 📄 pnpm-workspace.yaml
 * packages:
  - apps/*
  - packages/*
 */

/**
 * 📄 tsconfig.json
 * {
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@ts-template/types": ["packages/types/src"],
      "@ts-template/sdk": ["packages/sdk/src"],
      "@ts-template/cli": ["packages/cli/src"]
    }
  }
}
 */

/**
 * ✅ 3. Backend mínimo (apps/backend)
 * Exemplo com Express:
 */

// apps/backend/src/index.ts
import express from "express";
import { Usuario } from "@ts-template/types";

const app = express();
app.use(express.json());

app.get("/usuario", (_req, res) => {
  const usuario: Usuario = { id: 1, nome: "Gabriel" };
  res.json(usuario);
});

app.listen(3001, () => console.log("API pronta na porta 3001"));

/**
 * ✅ 4. Frontend mínimo (apps/frontend)
 * Usando React ou Next.js:
 */

// apps/frontend/pages/index.tsx
import { sdk } from "@ts-template/sdk";
import { useEffect, useState } from "react";

export default function Home() {
  const [nome, setNome] = useState("");

  useEffect(() => {
    sdk.getUsuario().then(u => setNome(u.nome));
  }, []);

  return <h1>Olá, {nome}!</h1>;
}

/**
 * ✅ 5. SDK compartilhado (packages/sdk)
 */

// packages/sdk/src/index.ts
import { Usuario } from "@ts-template/types";

export const sdk = {
  getUsuario: async (): Promise<Usuario> => {
    const res = await fetch("http://localhost:3001/usuario");
    return res.json();
  }
};

/**
 * ✅ 6. Tipos globais (packages/types)
 */

// packages/types/src/index.ts
export interface Usuario {
  id: number;
  nome: string;
}

/**
 * ✅ 7. CLI (packages/cli)
 */

// packages/cli/src/index.ts
#!/usr/bin/env tsx
import prompts from "prompts";

(async () => {
  const { nome } = await prompts({
    type: "text",
    name: "nome",
    message: "Qual seu nome?"
  });

  console.log(`Olá, ${nome}!`);
})();

/**
 * ✅ 8. Turborepo config
 * // turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "lint": {},
    "test": {}
  }
}
 */

/**
 * ✅ 9. CI/CD com GitHub Actions
 * # .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  ci:
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
 * ✅ 10. Scripts globais
 * 📄 package.json da raiz
 * "scripts": {
  "dev": "turbo run dev",
  "build": "turbo run build",
  "lint": "turbo run lint",
  "test": "turbo run test",
  "cli": "tsx packages/cli/src/index.ts"
}
 */

/**
 * 🧪 Desafio do Dia 27:
 * Clone este template para ts-template
 * Crie um endpoint GET /produto
 * Gere o tipo Produto em @ts-template/types
 * Use o SDK no frontend
 * Crie comando cli gerar produto
 * Teste build, lint, test e CI
 */