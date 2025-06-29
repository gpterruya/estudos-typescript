/**
 * 🎯 Objetivo do Dia 15:
 * 1. Entender e usar o TypeScript Compiler API
 * 2. Analisar e transformar código com AST (Abstract Syntax Tree)
 * 3. Criar geradores de código tipados
 * 4. Automatizar criação de APIs, DTOs, tipos e validações
 * 5. Visão geral de como frameworks como NestJS, Prisma, tRPC e Zod usam tipos para gerar DX avançada
 */

/**
 * ✅ 1. TypeScript Compiler API: introdução
 * - A TypeScript Compiler API permite:
 * - Ler arquivos .ts
 * - Entender e navegar pelo código
 * - Gerar novos arquivos .ts
 * - Fazer ferramentas como linters, geradores, builders etc.
 */

/**
 * 🔧 Instalação:
 * npm install typescript
 */

/**
 * ✅ 2. Lendo e analisando um arquivo .ts
 */

import ts from "typescript";

const codigo = `function soma(a: number, b: number) { return a + b }`;

const sourceFile = ts.createSourceFile(
  "exemplo.ts",
  codigo,
  ts.ScriptTarget.Latest,
  true
);

function visitar(node: ts.Node) {
  if (ts.isFunctionDeclaration(node)) {
    console.log("Função encontrada:", node.name?.getText());
  }
  ts.forEachChild(node, visitar);
}

visitar(sourceFile);

import * as fs from "fs";

const gerarDto = (nome: string, campos: Record<string, string>) => {
  const props = Object.entries(campos)
    .map(([key, tipo]) => `  ${key}: ${tipo};`)
    .join("\n");

  const dto = `export interface ${nome}DTO {\n${props}\n}`;
  fs.writeFileSync(`./${nome}DTO.ts`, dto);
};

gerarDto("Usuario", {
  nome: "string",
  idade: "number",
});

/**
 * Resultado:
 */

export interface UsuarioDTO {
  nome: string;
  idade: number;
}

/**
 * ✅ 4. Criar CLI para gerar código
 * Exemplo com commander:
 */

import { Command } from "commander";
const program = new Command();

program
  .command("gerar-dto <nome>")
  .option("-c, --campos <campos...>", "campos em formato nome:tipo")
  .action((nome, options) => {
    const campos: Record<string, string> = {};
    options.campos.forEach((campo: string) => {
      const [nomeCampo, tipo] = campo.split(":");
      campos[nomeCampo] = tipo;
    });

    gerarDto(nome, campos);
  });

program.parse(process.argv);

/**
 * Uso:
 * npx ts-node cli.ts gerar-dto Usuario -c nome:string idade:number
 */

/**
 * ✅ 5. Como grandes frameworks usam isso?
 * | Framework             | Como usa tipos                                                |
| --------------------- | ------------------------------------------------------------- |
| **NestJS**            | Gera documentação, validação e objetos com decorators + types |
| **tRPC**              | Usa tipos como fonte de verdade para toda API                 |
| **Prisma**            | Gera tipos automáticos com base no schema do banco            |
| **Zod**               | Gera tipos e validação no mesmo lugar                         |
| **OpenAPI Generator** | Gera classes, validação e APIs a partir do contrato           |
 */

/**
 * 🧪 Desafio do Dia 15:
 * 1. Crie um script que gere uma interface TypeScript a partir de um .json de exemplo.
 * 2. Use ts.createSourceFile() para analisar um arquivo e listar nomes de funções.
 * 3. Escreva um CLI que gere tipos de requisição/resposta com base em nome da rota.
 * 4. (Desafio Ninja 🥷): gere dinamicamente um arquivo que exporta uma rota tRPC + Zod com base em campos informados.
 */

/**
 * {
  "nome": "Gabriel",
  "idade": 25,
  "ativo": true
}
 */

import * as fs from "fs";

const gerarInterface = (jsonPath: string, nomeInterface: string) => {
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const objeto = JSON.parse(raw);

  const mapTipo = (valor: any): string => {
    if (typeof valor === "string") return "string";
    if (typeof valor === "number") return "number";
    if (typeof valor === "boolean") return "boolean";
    if (Array.isArray(valor)) return "any[]";
    if (typeof valor === "object") return "Record<string, any>";
    return "any";
  };

  const campos = Object.entries(objeto)
    .map(([chave, valor]) => `  ${chave}: ${mapTipo(valor)};`)
    .join("\n");

  const codigo = `export interface ${nomeInterface} {\n${campos}\n}`;
  fs.writeFileSync(`${nomeInterface}.ts`, codigo);
};

gerarInterface("usuario.json", "Usuario");

import ts from "typescript";
import * as fs from "fs";

const codigo = fs.readFileSync("exemplo.ts", "utf-8");

const source = ts.createSourceFile(
  "exemplo.ts",
  codigo,
  ts.ScriptTarget.Latest,
  true
);

const funcoes: string[] = [];

function visitar(node: ts.Node) {
  if (ts.isFunctionDeclaration(node) && node.name) {
    funcoes.push(node.name.getText());
  }
  ts.forEachChild(node, visitar);
}

visitar(source);
console.log("Funções encontradas:", funcoes);

import { Command } from "commander";
import * as fs from "fs";

const program = new Command();

program
  .command("gerar-rota <nome>")
  .option("--params <campos...>")
  .option("--resposta <campos...>")
  .action((nome, options) => {
    const parseCampos = (entrada: string[]) => {
      const obj: Record<string, string> = {};
      entrada.forEach((campo) => {
        const [k, v] = campo.split(":");
        obj[k] = v;
      });
      return obj;
    };

    const params = parseCampos(options.params || []);
    const resposta = parseCampos(options.resposta || []);

    const toInterface = (nome: string, campos: Record<string, string>) => {
      const linhas = Object.entries(campos)
        .map(([k, v]) => `  ${k}: ${v};`)
        .join("\n");
      return `export interface ${nome} {\n${linhas}\n}`;
    };

    const nomeCamel = nome.replace(/\//g, "_").replace(/:/g, "");

    const codigo = `
${toInterface(`Req_${nomeCamel}`, params)}

${toInterface(`Res_${nomeCamel}`, resposta)}
    `;

    fs.writeFileSync(`${nomeCamel}.ts`, codigo.trim());
    console.log(`Arquivo ${nomeCamel}.ts gerado!`);
  });

program.parse(process.argv);

import fs from "fs";

function gerarTrpcRota(nome: string, campos: Record<string, string>) {
  const zodFields = Object.entries(campos)
    .map(([k, t]) => `  ${k}: z.${t}()`)
    .join(",\n");

  const input = `const ${nome}Input = z.object({\n${zodFields}\n});`;

  const rota = `
export const appRouter = t.router({
  ${nome}: t.procedure
    .input(${nome}Input)
    .mutation(({ input }) => {
      // TODO: implementar
      return { sucesso: true };
    }),
});
  `;

  fs.writeFileSync(`${nome}.ts`, `import { z } from "zod";\nimport { t } from "./trpc";\n\n${input}\n${rota}`);
  console.log(`✅ Rota tRPC gerada: ${nome}.ts`);
}

gerarTrpcRota("criarProduto", { nome: "string", preco: "number" });