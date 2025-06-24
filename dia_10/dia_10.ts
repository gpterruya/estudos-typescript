/**
 * 🎯 Objetivo do Dia 10:
 * 1. Entender e criar arquivos de definição de tipos (.d.ts)
 * 2. Usar e modificar tipos de bibliotecas externas
 * 3. Aprender os campos avançados do tsconfig.json
 * 4. Criar ambientes personalizados com TypeScript
 * 5. Usar TypeScript em monorepos (com TurboRepo, NX ou Yarn Workspaces)
 */

/**
 * ✅ 1. Arquivos de definição (.d.ts)
 * O que são?
 * São arquivos usados para declarar tipos de bibliotecas que não têm TypeScript nativo.
 * Exemplo simples de .d.ts:
 */

// arquivo: global.d.ts
declare module "biblioteca-externa" {
  export function coisaLegal(x: number): string;
}

/**
 * Como usar:
 */

import { coisaLegal } from "biblioteca-externa";

const resultado = coisaLegal(42);

/**
 * Se a biblioteca não tiver tipos, instale tipos externos:
 * npm install @types/nome-da-biblioteca
 */

/**
 * ✅ 2. Extendendo tipos de bibliotecas
 * Exemplo com Express:
 * Você pode estender tipos globais:
 */

// types/express.d.ts
import "express";

declare module "express" {
  interface Request {
    usuario?: {
      id: number;
      email: string;
    };
  }
}

/**
 * Agora req.usuario estará disponível com tipo em todos os middlewares.
 */

/**
 * ✅ 3. Configuração avançada do tsconfig.json
 * Campos úteis:
 * {
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "baseUrl": "./src",
    "paths": {
      "@models/*": ["models/*"],
      "@utils/*": ["utils/*"]
    },
    "types": ["node", "jest"],
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": true
  }
}
 */

/**
 * Use paths para alias:
 */

import { formatarData } from "@utils/data";

/**
 * ✅ 4. Ambientes personalizados
 * Você pode definir tipos diferentes para ambientes:
 * - global.d.ts → tipos globais
 * - env.d.ts → tipar process.env
 * Exemplo:
 */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    DATABASE_URL: string;
  }
}

/**
 * Agora o TS vai te avisar se tentar acessar uma env não definida.
 */

/**
 * ✅ 5. Monorepos com TypeScript
 * TypeScript funciona muito bem com monorepos, e você pode compartilhar tipos entre apps, libs, workers etc.
 * Exemplos de estrutura:
 * - Com TurboRepo ou NX
 * /apps
  ├─ web/
  ├─ api/
/packages
  ├─ ui/
  ├─ types/
 */

/**
 * tsconfig.base.json
 * {
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@types/*": ["packages/types/*"]
    }
  }
}
 */

/**
 * Em cada projeto (tsconfig.json):
 * {
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
 * Isso permite reutilização de tipos e padronização da build entre apps/libs.  
*/

/**
 * 🧪 Exercício do Dia 10:
 * 1. Crie um global.d.ts que adicione usuario: { id: number } ao Request do Express.
 * 2. Crie um tsconfig.json com baseUrl e paths apontando @utils para src/utils.
 * 3. Simule uma lib externa (ex: "minha-lib") e crie um .d.ts com uma função tipada.
 * 4. Monte uma estrutura de projeto com apps/api e packages/types, e compartilhe um tipo Usuario entre ambos.
 */

import "express";

declare module "express" {
  interface Request {
    usuario?: {
      id: number;
    };
  }
}

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "baseUrl": "./src",
    "paths": {
      "@utils/*": ["utils/*"]
    },
    "types": ["node", "jest"],
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": true
  }
}

declare module "minha-lib" {
  export function coisaLegal(x: number): string;
}

/apps
  ├─ web/
  ├─ api/
/packages
  ├─ ui/
  ├─ types/
  |--usuarios.ts