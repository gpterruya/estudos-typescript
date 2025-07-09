/**
 * 🎯 Objetivo do Dia 25:
 * 1. Criar um CLI em TypeScript
 * 2. Aceitar argumentos de terminal com tipagem segura
 * 3. Fazer entrada interativa com perguntas (como o create-react-app)
 * 4. Gerar arquivos automaticamente
 * 5. Publicar como executável global
 * 6. (Avançado): integrar com SDKs e serviços
 */

/**
 * ✅ 1. Criando o projeto do CLI
 * mkdir meu-cli
 * cd meu-cli
 * pnpm init
 * pnpm add -D typescript tsx
 */

/**
 * 📄 tsconfig.json
 * {
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Node",
    "outDir": "dist",
    "esModuleInterop": true,
    "strict": true,
    "resolveJsonModule": true
  }
}
 */

/**
 * ✅ 2. Fazendo o arquivo de entrada
 * 📄 src/index.ts
 */

console.log("Olá, Gabriel! Bem-vindo ao CLI em TypeScript.");

/**
 * Rodar com:
 * pnpm tsx src/index.ts
 */

/**
 * ✅ 3. Lidando com argumentos de terminal
 * 📄 src/index.ts
 */

const [,, comando, nome] = process.argv;

if (comando === "saudar" && nome) {
  console.log(`Olá, ${nome}! Seja bem-vindo!`);
} else {
  console.log("Uso: cli saudar <nome>");
}

// pnpm tsx src/index.ts saudar Gabriel
// # 👉 Olá, Gabriel! Seja bem-vindo!

/**
 * ✅ 4. Entrada interativa com prompts
 * pnpm add prompts
 */

import prompts from "prompts";

async function main() {
  const resposta = await prompts({
    type: "text",
    name: "nome",
    message: "Qual o seu nome?",
  });

  console.log(`Olá, ${resposta.nome}`);
}

main();

/**
 * ✅ 5. Gerar arquivos automaticamente
 */

import fs from "fs";

function criarArquivo(nome: string) {
  const conteudo = `export const ${nome} = "${nome} gerado";\n`;
  fs.writeFileSync(`src/${nome}.ts`, conteudo);
  console.log(`Arquivo ${nome}.ts criado!`);
}

criarArquivo("exemplo");

/**
 * ✅ 6. Tornar executável com #!/usr/bin/env node
 * 📄 bin/cli.ts
 */

//#!/usr/bin/env tsx

console.log("Executando o CLI...");

/**
 * Dê permissão e rode:
 * chmod +x bin/cli.ts
 * ./bin/cli.ts
 */

/**
 * ✅ 7. Publicar como CLI global (opcional)
 * 📄 package.json
 * "bin": {
  "meucli": "bin/cli.ts"
}
 */

/**
 * Compile para JS ou use tsx como wrapper:
 * pnpm link
 * meucli
 */

/**
 * ✅ 8. Exemplo completo: meucli gerar rota
 */

import fs from "fs";
import path from "path";

const [, , comando, nome] = process.argv;

if (comando === "gerar" && nome) {
  const rota = `
import { Request, Response } from 'express';

export function ${nome}(req: Request, res: Response) {
  res.send("${nome} executado com sucesso!");
}
`;
  fs.writeFileSync(`src/${nome}.ts`, rota);
  console.log(`Rota ${nome}.ts criada!`);
}

/**
 * 🧪 Desafio do Dia 25:
 * Crie um CLI meucli que tenha os comandos:
 * saudar <nome> → imprime "Olá, <nome>"
 * gerar <nome> → gera um arquivo com função
 * Adicione entrada interativa com prompts
 * Compile com tsx ou tsup
 * Use pnpm link e teste como global
 * (Avançado): Gere SDKs ou schemas Zod a partir de JSON
 */