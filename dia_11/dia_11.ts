/**
 * 🎯 Objetivo do Dia 11:
 * 1. Gerar arquivos .d.ts automaticamente para bibliotecas TypeScript
 * 2. Entender e manipular o TypeScript Compiler API
 * 3. Criar tipos dinâmicos com mapeamentos complexos
 * 4. Construir um DSL tipado (Domain Specific Language)
 * 5. Criar e publicar uma lib tipada com segurança total
 */

/**
 * ✅ 1. Gerando .d.ts automaticamente
 * Se você está criando uma lib ou pacote, pode gerar tipos usando o próprio compilador:
 * 📦 tsconfig.json para lib
 * {
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "declarationDir": "./dist/types",
    "outDir": "./dist",
    "module": "ESNext",
    "target": "ES2020",
    "strict": true,
    "moduleResolution": "node"
  },
  "include": ["src"]
}
 * npx tsc
 * Vai gerar .d.ts automaticamente em dist/types/.
 */

/**
 * ✅ 2. Usando o TypeScript Compiler API (AST)
 * Você pode criar transformações de código, gerar arquivos ou construir ferramentas com a API do compilador.
 * 
 * Instalar:
 * npm install typescript
 * 
 * Exemplo básico:
 */

import ts from "typescript";

const source = "const x: number = 42;";
const node = ts.createSourceFile("x.ts", source, ts.ScriptTarget.Latest);

ts.forEachChild(node, child => {
  console.log("Tipo de nó:", ts.SyntaxKind[child.kind]);
});

/**
 * ✅ 3. Tipos dinâmicos com mapeamento e transformação
 * Você já viu [K in keyof T], agora vamos transformar tipos dinamicamente:
 */

type Modificar<T> = {
  [K in keyof T as `mod_${string & K}`]: T[K];
};

type Pessoa = {
  nome: string;
  idade: number;
};

type PessoaModificada = Modificar<Pessoa>;
// { mod_nome: string; mod_idade: number }

/**
 * ✅ 4. Criando DSL tipado
 * Um DSL (Domain-Specific Language) permite criar interfaces declarativas com segurança de tipos.
 * Exemplo: mini-ORM tipado
 */

type Coluna<T> = {
  nome: string;
  tipo: T;
};

function coluna<T>(nome: string): Coluna<T> {
  return { nome, tipo: undefined as any as T };
}

const schema = {
  id: coluna<number>("id"),
  nome: coluna<string>("nome"),
};

type InferirSchema<T extends Record<string, Coluna<any>>> = {
  [K in keyof T]: T[K]["tipo"];
};

type Usuario = InferirSchema<typeof schema>;
// { id: number; nome: string }

/**
 * ✅ 5. Criando e publicando uma lib tipada
 * 
 * 📁 Estrutura recomendada:
 * /src
  ├─ index.ts
  └─ util.ts
   /tsconfig.json
   /package.json
 */

/**
 * package.json:
 * {
  "name": "minha-lib",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  }
}
 * Depois é só:
 * npx tsc
 * npm publish --access public
 */

/**
 * 🧪 Desafio do Dia 11:
 * 1. Crie um tipo PrefixarChaves<T, Prefixo> que adicione um prefixo a todas as chaves de um tipo.
 * 2. Escreva uma função definirTabela<T>() que recebe um objeto de colunas e infere o tipo da "linha" (como no mini ORM).
 * 3. Gere o arquivo .d.ts para sua lib usando o TypeScript compiler.
 * 4. Use ts.createSourceFile() para analisar e imprimir os tipos de nós de um arquivo .ts.
 */

type PrefixarChaves<T, Prefixo extends string> = {
    [K in keyof T as `${Prefixo}${Capitalize<string & K>}`]: T[K];
}

function definirTabela<T extends Record<string, Coluna<any>>>(schema: T) {
  type Linha = {
    [K in keyof T]: T[K]["tipo"];
  };

  return {} as Linha;
}

// {
//   "compilerOptions": {
//     "declaration": true,
//     "emitDeclarationOnly": true,
//     "outDir": "./dist",
//     "strict": true
//   },
//   "include": ["src"]
// }

// npx tsc

import ts from "typescript";

const sourceCode = `
  const nome: string = "Gabriel";
  const idade = 30;
`;

const sourceFile = ts.createSourceFile("exemplo.ts", sourceCode, ts.ScriptTarget.Latest, true);

ts.forEachChild(sourceFile, node => {
  console.log("Nó:", ts.SyntaxKind[node.kind]);
});