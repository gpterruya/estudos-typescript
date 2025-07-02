/**
 * 🎯 Objetivo do Dia 17:
 * 1. Criar um CLI para gerar arquivos automaticamente
 * 2. Usar o pacote commander ou yargs para criar comandos
 * 3. Gerar Controllers, DTOs e Validators com base em parâmetros
 * 4. Incluir inteligência de nomes e estrutura de pastas
 * 5. (Avançado) Gerar tipos e schemas sincronizados (ex: zod + dto + interface)
 */

/**
 * ✅ 1. Estrutura do projeto
 * meu-framework/
├─ src/
│  ├─ cli.ts
│  ├─ templates/
│  │  ├─ controller.template.ts
│  │  ├─ dto.template.ts
│  │  └─ validator.template.ts
├─ package.json
├─ tsconfig.json
 */

/**
 * ✅ 2. Instalação das libs
 * npm install commander chalk
 * (Opcional: fs-extra, inquirer, prettier para melhorias)
 */

/**
 * ✅ 3. Criando o CLI com commander
 * 📄 src/cli.ts
 */

#!/usr/bin/env ts-node
import { Command } from "commander";
import fs from "fs";
import path from "path";

const program = new Command();

program
  .name("meu-cli")
  .description("Gerador de código em TypeScript")
  .version("1.0.0");

program
  .command("generate")
  .alias("g")
  .argument("<tipo>", "Tipo de artefato (controller, dto, validator)")
  .argument("<nome>", "Nome do artefato (PascalCase)")
  .action((tipo, nome) => {
    const pasta = `./src/generated/${tipo}s`;
    const templatePath = `./src/templates/${tipo}.template.ts`;
    const destino = `${pasta}/${nome}.ts`;

    fs.mkdirSync(pasta, { recursive: true });

    const template = fs.readFileSync(templatePath, "utf-8");
    const arquivo = template.replace(/__NOME__/g, nome);

    fs.writeFileSync(destino, arquivo);

    console.log(`✅ ${tipo} "${nome}" gerado com sucesso!`);
  });

program.parse();

/**
 * ✅ 4. Templates inteligentes
 * 📄 templates/controller.template.ts
 */

export class __NOME__Controller {
  listar() {
    // ...
  }

  criar() {
    // ...
  }
}

/**
 * 📄 templates/dto.template.ts
 */

export interface __NOME__DTO {
  nome: string;
  idade: number;
}

/**
 * 📄 templates/validator.template.ts
 */

import { z } from "zod";

export const __NOME__Validator = z.object({
  nome: z.string(),
  idade: z.number().min(18),
});

/**
 * ✅ 5. Usando o CLI
 * Comando:
 * npx ts-node src/cli.ts g controller Produto
 * Resultado:
 */

// src/generated/controllers/Produto.ts
export class ProdutoController {
  listar() {}
  criar() {}
}

/**
 * 💡 Melhorias futuras:
 * - Integração com Prettier para formatar código gerado
 * - Aceitar --campos e gerar DTOs dinamicamente
 * - Gerar testes automaticamente junto com os arquivos
 * - Adicionar comentários e documentação nos arquivos gerados
 * - Criar .d.ts de metadata baseado nos comandos executados
 */

/**
 * 🧪 Desafio do Dia 17:
 * 1. Gere um ProdutoController com listar e criar
 * 2. Crie o ProdutoDTO com nome e valor
 * 3. Crie o ProdutoValidator com zod e validação mínima
 * 4. Adicione uma opção --crud para gerar os 4 métodos básicos (listar, criar, atualizar, remover)
 * 5. (Ninja 🥷) Gere dinamicamente um schema Zod com base em um DTO via AST
 */

export class ProdutoController {
  listar() {
    // Lista produtos
  }

  criar() {
    // Cria novo produto
  }
}

export interface ProdutoDTO {
  nome: string;
  valor: number;
}


import { z } from "zod";

export const ProdutoValidator = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  valor: z.number().positive("Valor deve ser positivo"),
});

export class __NOME__Controller {
  listar() {
    // ...
  }

  criar() {
    // ...
  }

  atualizar() {
    // ...
  }

  remover() {
    // ...
  }

}
.option("--crud", "Gerar métodos CRUD")

const templateRaw = fs.readFileSync(templatePath, "utf-8");
let arquivo = templateRaw.replace(/__NOME__/g, nome);

if (options.crud && tipo === "controller") {
  arquivo = `
export class ${nome}Controller {
  listar() {}
  criar() {}
  atualizar() {}
  remover() {}
}
`;
}

import { Project, SyntaxKind } from "ts-morph";
import fs from "fs";

function mapTsTypeToZod(type: string): string {
  if (type === "string") return "z.string()";
  if (type === "number") return "z.number()";
  if (type === "boolean") return "z.boolean()";
  return "z.any()";
}

function gerarZodValidator(dtoPath: string, validatorPath: string) {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(dtoPath);

  const interfaceDecl = sourceFile.getInterface(() => true); // Pega a primeira interface

  if (!interfaceDecl) {
    throw new Error("Nenhuma interface encontrada.");
  }

  const interfaceName = interfaceDecl.getName();
  const props = interfaceDecl.getProperties();

  const campos = props.map((prop) => {
    const nome = prop.getName();
    const tipo = prop.getType().getText();
    return `  ${nome}: ${mapTsTypeToZod(tipo)},`;
  });

  const validator = `
import { z } from "zod";

export const ${interfaceName.replace("DTO", "Validator")} = z.object({
${campos.join("\n")}
});
`;

  fs.writeFileSync(validatorPath, validator);
  console.log(`✅ Validator gerado: ${validatorPath}`);
}

gerarZodValidator("src/generated/dtos/ProdutoDTO.ts", "src/generated/validators/ProdutoValidator.ts");

// npx ts-node gerar-validator.ts