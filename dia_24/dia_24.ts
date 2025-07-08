/**
 * ✅ 1. ESLint + Prettier no monorepo
 * 📦 Instale na raiz:
 * pnpm add -D eslint prettier eslint-config-prettier eslint-plugin-import typescript
 */

/**
 * 📄 .eslintrc.js
 * module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "import/order": ["warn", { "alphabetize": { order: "asc" } }]
  }
};
 */

/**
 * 📄 .prettierrc
 * {
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all"
}
 */

/**
 * ✅ 2. Husky + lint-staged (para checar antes de commitar)
 * 📦 Instale:
 * pnpm add -D husky lint-staged
 * npx husky install
 */

/**
 * 📄 package.json (raiz)
 * "lint-staged": {
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ]
},
"scripts": {
  "prepare": "husky install"
}
 */

/**
 * Adicione o hook:
 * npx husky add .husky/pre-commit "pnpm lint-staged"
 * Agora todo commit formata e corrige o código automaticamente.
 */

/**
 * ✅ 3. Usando Turborepo para otimização
 * 📦 Instale:
 * pnpm add -D turbo
 */

/**
 * 📄 turbo.json
 * {
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
 * 📄 package.json (raiz)
 * "scripts": {
  "build": "turbo run build",
  "lint": "turbo run lint",
  "test": "turbo run test"
}
 */

/**
 * Cada pacote (backend, frontend, types) define seus próprios scripts:
 * // apps/backend/package.json
"scripts": {
  "build": "tsc",
  "lint": "eslint .",
  "test": "vitest"
}
 */

/**
 * ✅ 4. CI/CD com GitHub Actions
 */

/**
 * 📄 .github/workflows/ci.yml
 * name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm lint
      - run: pnpm test
 */

/**
 * ✅ 5. Testando o monorepo com tudo integrado
 * Agora você pode rodar:
 * pnpm build   # compila tudo com cache
 * pnpm lint    # lint em todos os pacotes
 * pnpm test    # testes globais
 * E toda PR/push no GitHub vai rodar tudo automaticamente. ✔️
 */

/**
 * 🧪 Desafio do Dia 24:
 * Instale ESLint, Prettier, Husky e lint-staged
 * Configure pnpm build, lint, test com Turborepo
 * Crie uma PR com código mal formatado e veja o GitHub Actions barrar
 * (Avançado): crie um comando pnpm check que rode tudo (build + lint + test)
 */