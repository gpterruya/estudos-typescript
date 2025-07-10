/**
 * 🎯 Objetivo do Dia 26:
 * Criar um pacote TypeScript pronto para publicar
 * Exportar tipos automaticamente
 * Gerar documentação via JSDoc
 * Configurar exports modernos (exports, types, main)
 * Fazer build para CJS + ESM
 * Publicar com npm publish ou pnpm publish
 */

/**
 * ✅ 1. Estrutura do projeto
 * mkdir minha-lib
 * cd minha-lib
 * pnpm init
 * pnpm add -D typescript tsup
 */

/**
 * Estrutura:
 * minha-lib/
   ├─ src/
   │  └─ index.ts
   ├─ dist/
   ├─ package.json
   ├─ tsconfig.json
 */

/**
 * ✅ 2. Código da lib com JSDoc
 * 📄 src/index.ts
 */

/**
 * Soma dois números
 * @param a O primeiro número
 * @param b O segundo número
 * @returns A soma dos dois
 */
export function somar(a: number, b: number): number {
  return a + b;
}

/**
 * Pessoa com nome e idade
 */
export interface Pessoa {
  nome: string;
  idade: number;
}

// Qualquer usuário que importar sua função terá autocomplete + documentação inline!

/**
 * ✅ 3. tsconfig.json
 * {
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Node",
    "declaration": true,
    "declarationDir": "dist",
    "outDir": "dist",
    "esModuleInterop": true,
    "strict": true
  },
  "include": ["src"]
}
 */

/**
 * ✅ 4. Build com tsup
 * Instale:
 * pnpm add -D tsup
 */

/**
 * 📄 package.json
 * "scripts": {
  "build": "tsup src/index.ts --dts --format esm,cjs --out-dir dist"
}
 */

/**
 * ✅ 5. Configurando package.json para NPM
 * {
  "name": "minha-lib-do-gabriel",
  "version": "1.0.0",
  "main": "dist/index.cjs",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/index.cjs",
      "import": "./dist/index.mjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "keywords": ["typescript", "lib", "math"],
  "author": "Gabriel Porto Terruya",
  "license": "MIT"
}
 */

/**
 * ✅ 6. Publicando no NPM
 * 1. Crie uma conta em https://www.npmjs.com/
 * 2. Faça login via terminal:
 * npm login
 * 3. Publicar:
 * pnpm build
 * npm publish --access public
 */

/**
 * ✅ 7. Testando a lib publicada
 * pnpm add minha-lib-do-gabriel
 */

/**
 * Em outro projeto:
 */

import { somar, Pessoa } from "minha-lib-do-gabriel";

const resultado = somar(2, 3); // 5
const usuario: Pessoa = { nome: "Gabriel", idade: 30 };

// ✅ Com autocomplete, tipos e JSDoc incluídos automaticamente.

/**
 * 🧪 Desafio do Dia 26:
 * 1. Crie uma lib @gabriel/tools com:
 * 2. função formatarNome(nome: string): string
 * 3. interface Endereco { rua, numero, cidade }
 * 4. Use JSDoc em tudo
 * 5. Configure o build com tsup (ESM + CJS + types)
 * 6. Publique no NPM com pnpm publish
 * 7. Teste a instalação local em outro projeto
 */