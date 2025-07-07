/**
 * 🎯 Objetivo do Dia 23:
 * 1. Criar um monorepo com pnpm ou turborepo
 * 2. Compartilhar tipos entre backend e frontend
 * 3. Usar TypeScript path aliases e refs cruzadas
 * 4. Integrar Zod, SDK, Prisma e testes no mesmo projeto
 * 5. Automatizar builds e testes com cache inteligente
 */

/**
 * ✅ 1. O que é um monorepo?
 * Um monorepo é um repositório único que contém múltiplos pacotes, como @app/backend, @app/frontend, @app/types, etc.
 * Vantagens:
 * ✅ Tipos compartilhados
 * ✅ Deploys e builds otimizados
 * ✅ Reaproveitamento total de código
 * ✅ Melhor DX com IntelliSense e autocomplete global
 */

/**
 * ✅ 2. Iniciando com pnpm e workspaces
 * 📦 pnpm init
 * mkdir ts-monorepo
 * cd ts-monorepo
 * pnpm init
 */

/**
 * 📄 pnpm-workspace.yaml
 * packages:
  - apps/*
  - packages/*
 */

  /**
   * ✅ 3. Estrutura do projeto
   * ts-monorepo/
     ├─ apps/
     │  ├─ backend/       # NestJS, Express, tRPC, etc
     │  └─ frontend/      # React, Next.js, etc
     ├─ packages/
     │  ├─ types/         # Tipos globais
     │  └─ sdk/           # SDK gerado a partir das rotas
     ├─ pnpm-workspace.yaml
     └─ tsconfig.json
   */

/**
 * ✅ 4. Tipos compartilhados
 * 📄 packages/types/src/index.ts
 */

export interface Usuario {
  id: number;
  nome: string;
}

/**
 * No frontend e backend:
 * import type { Usuario } from "@app/types";
 */

/**
 * Para isso funcionar:
 * 📄 tsconfig.json na raiz
 * {
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@app/types": ["packages/types/src"],
      "@app/sdk": ["packages/sdk/src"]
    }
  }
}
 */

/**
 * ✅ 5. Frontend usando tipos do backend
 * 📄 apps/frontend/pages/index.tsx
 */

import type { Usuario } from "@app/types";

const user: Usuario = {
  id: 1,
  nome: "Gabriel"
};

export default function Home() {
  return <h1>Olá, {user.nome}!</h1>;
}

/**
 * ✅ 6. Backend consumindo os mesmos tipos
 * 📄 apps/backend/src/routes.ts
 */

import { Usuario } from "@app/types";

export function getUsuario(): Usuario {
  return { id: 1, nome: "Gabriel" };
}

/**
 * ✅ 7. Gerando SDK no monorepo
 * 📄 packages/sdk/src/index.ts
 */

import { Usuario } from "@app/types";

export const sdk = {
  getUsuario: async (): Promise<Usuario> => {
    return fetch("/api/usuario").then(res => res.json());
  }
};

/**
 * Use no frontend:
 */

import { sdk } from "@app/sdk";

sdk.getUsuario().then(u => console.log(u.nome));

/**
 * ✅ 8. Comandos com pnpm
 * 📄 apps/backend/package.json
 * {
  "name": "@app/backend",
  "scripts": {
    "dev": "ts-node src/index.ts"
  }
}
 */

/**
 * Rodar:
 * pnpm --filter @app/backend dev
 */

/**
 * ✅ 9. Otimizando com Turborepo (opcional)
 * npx create-turbo@latest
 * Ele cuida de cache, paralelismo e build incremental entre pacotes
 */

/**
 * 🧪 Desafio do Dia 23:
 * 1. Crie um monorepo com apps/backend, apps/frontend e packages/types
 * 2. Exporte um tipo Usuario no types e use em ambos os apps
 * 3. Crie um SDK simples (getUsuario()) no pacote sdk
 * 4. Integre o SDK no frontend com autocomplete
 * 5. (Avançado): use Vitest no monorepo com testes que usam tipos globais
 */

// 📁 pnpm-workspace.yaml
// packages:
//   - apps/*
//   - packages/*

// mkdir ts-monorepo
// cd ts-monorepo

// mkdir -p apps/backend
// mkdir -p apps/frontend
// mkdir -p packages/types
// mkdir -p packages/sdk

// pnpm init -y

// 📄 tsconfig.json (raiz)
// {
//   "compilerOptions": {
//     "baseUrl": ".",
//     "paths": {
//       "@app/types": ["packages/types/src"],
//       "@app/sdk": ["packages/sdk/src"]
//     },
//     "target": "ES2020",
//     "module": "ESNext",
//     "moduleResolution": "Node",
//     "strict": true,
//     "esModuleInterop": true,
//     "forceConsistentCasingInFileNames": true
//   }
// }

// 📄 packages/types/package.json
// {
//   "name": "@app/types",
//   "version": "1.0.0",
//   "main": "src/index.ts"
// }

// 📄 packages/types/src/index.ts
export interface Usuario {
  id: number;
  nome: string;
}

// 📄 packages/sdk/package.json
// {
//   "name": "@app/sdk",
//   "version": "1.0.0",
//   "main": "src/index.ts",
//   "dependencies": {
//     "@app/types": "*"
//   }
// }

// 📄 packages/sdk/src/index.ts
import { Usuario } from "@app/types";

export const sdk = {
  getUsuario: async (): Promise<Usuario> => {
    const res = await fetch("http://localhost:3000/api/usuario");
    return res.json();
  }
};

// cd apps/backend
// pnpm init -y

// 📄 apps/backend/package.json
//{
//   "name": "@app/backend",
//   "version": "1.0.0",
//   "type": "module",
//   "scripts": {
//     "dev": "node src/server.js"
//   },
//   "dependencies": {
//     "@app/types": "*"
//   }
// }

// 📄 apps/backend/src/server.js
import express from "express";
const app = express();
app.use(express.json());

app.get("/api/usuario", (req, res) => {
  res.json({ id: 1, nome: "Gabriel" });
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));

// Obs: Como estamos usando .js, não precisa de TS aqui, mas você pode configurar TS se quiser (ts-node, etc.).

// cd apps/frontend
// pnpm init -y

// 📄 apps/frontend/package.json
// {
//   "name": "@app/frontend",
//   "version": "1.0.0",
//   "scripts": {
//     "dev": "vite"
//   },
//   "dependencies": {
//     "@app/types": "*",
//     "@app/sdk": "*"
//   }
// }

// 📄 apps/frontend/index.ts
import { sdk } from "@app/sdk";

sdk.getUsuario().then((usuario) => {
  console.log(`Usuário: ${usuario.nome}`);
});

