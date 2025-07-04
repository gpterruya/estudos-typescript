/**
 * 🎯 Objetivo do Dia 18:
 * 1. Gerar interfaces TypeScript a partir de JSON
 * 2. Gerar Zod schemas automaticamente
 * 3. Importar e tipar OpenAPI/Swagger com ferramentas prontas
 * 4. Fazer sincronização entre contrato → validação → tipo
 * 5. Criar ferramentas para não escrever tipos nunca mais à mão
 */

/**
 * ✅ 1. Gerar interfaces TypeScript a partir de JSON
 * 📦 Instale:
 * npm install -D quicktype
 * {
  "nome": "Gabriel",
  "idade": 28,
  "ativo": true
}
 * Gera automaticamente:
 */

export interface Pessoa {
  nome: string;
  idade: number;
  ativo: boolean;
}

/**
 * ✅ 2. Gerar Zod schemas com json-schema-to-zod
 * 📦 Instale:
 * npm install -D json-schema-to-zod
 */

/**
 * 👇 Exemplo JSON Schema:
 * {
  "type": "object",
  "properties": {
    "nome": { "type": "string" },
    "idade": { "type": "number" }
  },
  "required": ["nome", "idade"]
}
 */

/**
 * Execute:
 * npx json-schema-to-zod schema.json > schema.zod.ts
 */

import { z } from "zod";

export const schema = z.object({
  nome: z.string(),
  idade: z.number(),
});

/**
 * ✅ 3. Importar e tipar APIs OpenAPI (Swagger)
 * 🔧 Ferramentas:
 * 1. openapi-typescript
 * npm install -D openapi-typescript
 * npx openapi-typescript https://petstore3.swagger.io/api/v3/openapi.json -o types.ts
 * Gera:
 */

import { paths } from "./types";

type CriarPetResponse = paths["/pet"]["post"]["responses"]["200"]["content"]["application/json"];

/**
 * 2. openapi-client-axios
 * npm install openapi-client-axios
 */

import createClient from "openapi-client-axios";

const api = createClient({ definition: "https://petstore3.swagger.io/api/v3/openapi.json" });

const cliente = await api.init();

const pet = await cliente.get("/pet/123"); // totalmente tipado

/**
 * ✅ 4. Sincronizar contrato → validação → tipos
 * Estrutura ideal:
 * 📁 contratos/
     └─ usuario.openapi.json
   📁 schemas/
     └─ usuario.schema.zod.ts
   📁 types/
     └─ usuario.ts
 * Você pode criar um script para:
 * - Converter JSON Schema → Zod
 * - Gerar types automaticamente com z.infer
 * - Manter tudo sincronizado entre contrato, validador e types
 */

/**
 * ✅ 5. Automação final com CLI personalizado
 */

// tools/generate-from-json.ts
import fs from "fs";
import { quicktype } from "quicktype-core";

// gera interface de JSON
async function gerarInterface(nome: string, json: string) {
  const input = JSON.parse(json);
  const result = await quicktype({
    inputData: [{ name: nome, samples: [JSON.stringify(input)] }],
    lang: "ts",
  });
  fs.writeFileSync(`types/${nome}.ts`, result.lines.join("\n"));
}

/**
 * 🧪 Desafio do Dia 18:
 * 1. Pegue um JSON de exemplo de usuário e gere uma interface TypeScript com quicktype
 * 2. Converta um JSON Schema para um Zod schema com json-schema-to-zod
 * 3. Baixe um Swagger OpenAPI (ex: Petstore) e gere tipos com openapi-typescript
 * 4. Use openapi-client-axios para fazer requisições com tipagem completa
 * 5. (Opcional avançado): crie um script que pega um Swagger e gera Zod + interface + cliente HTTP automaticamente
 */

// {
//   "nome": "Gabriel",
//   "idade": 30,
//   "ativo": true
// }
// npx quicktype -s json -o Usuario.ts --lang typescript <<< $(cat usuario.json)

// {
//   "type": "object",
//   "properties": {
//     "nome": { "type": "string" },
//     "idade": { "type": "number" },
//     "ativo": { "type": "boolean" }
//   },
//   "required": ["nome", "idade"]
// }
// npx json-schema-to-zod usuario.schema.json > usuario.schema.zod.ts

// npx openapi-typescript https://petstore3.swagger.io/api/v3/openapi.json -o petstore-types.ts

// npm install openapi-client-axios

import OpenAPIClientAxios from "openapi-client-axios";

const api = new OpenAPIClientAxios({
  definition: "https://petstore3.swagger.io/api/v3/openapi.json"
});

async function main() {
  const client = await api.init();

  const response = await client.get("/pet/1"); // total segurança de tipos
  console.log(response.data);
}

main();

// scripts/gerar-do-json.ts
import fs from "fs";
import { quicktype, InputData, JSONInput } from "quicktype-core";

async function gerarInterface(nome: string, json: string) {
  const jsonInput = new JSONInput();
  await jsonInput.addSource({ name: nome, samples: [json] });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  const result = await quicktype({
    inputData,
    lang: "ts"
  });

  fs.writeFileSync(`types/${nome}.ts`, result.lines.join("\n"));
}

const jsonRaw = fs.readFileSync("usuario.json", "utf-8");
gerarInterface("Usuario", jsonRaw);
