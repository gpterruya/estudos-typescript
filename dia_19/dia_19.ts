/**
 * 🎯 Objetivo do Dia 19:
 * 1. Criar a base de um SDK client-side
 * 2. Gerar os tipos a partir de um contrato (OpenAPI ou GraphQL)
 * 3. Usar fetch, axios ou openapi-client-axios com tipagem completa
 * 4. Criar um client com métodos intuitivos (ex: sdk.usuario.listar())
 * 5. Exportar para ser usado em outros projetos com segurança total de tipos
 */

/**
 * ✅ 1. Criando a base do SDK
 * 📂 Estrutura sugerida
 * sdk/
   ├─ client.ts
   ├─ types.ts
   ├─ index.ts
 */

/**
 * ✅ 2. Gerando tipos a partir de uma OpenAPI
 * 📦 Instale:
 * npm install -D openapi-typescript
 * 
 */

/**
 * 🔧 Geração dos tipos:
 * npx openapi-typescript https://petstore3.swagger.io/api/v3/openapi.json -o sdk/types.ts
 */

/**
 * Exemplo do conteúdo gerado:
 */

export interface paths {
  "/pet/{petId}": {
    get: {
      parameters: {
        path: {
          petId: number;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": Pet;
          };
        };
      };
    };
  };
}

/**
 * ✅ 3. Criando o client
 * 📄 sdk/client.ts
 */

import { paths } from "./types";

export class ApiClient {
  constructor(private baseUrl: string) {}

  async getPet(petId: number): Promise<paths["/pet/{petId}"]["get"]["responses"]["200"]["content"]["application/json"]> {
    const res = await fetch(`${this.baseUrl}/pet/${petId}`);
    if (!res.ok) throw new Error("Erro na API");
    return res.json();
  }

  // outros métodos...
}

/**
 * ✅ 4. Expondo um SDK organizado
 * 📄 sdk/index.ts
 */

import { ApiClient } from "./client";

export function createSDK(baseUrl: string) {
  const client = new ApiClient(baseUrl);

  return {
    pet: {
      buscar: (id: number) => client.getPet(id),
      // criar, atualizar, deletar...
    },
    // usuario, pedido, produto...
  };
}

/**
 * Uso:
 */

import { createSDK } from "./sdk";

const sdk = createSDK("https://petstore3.swagger.io/api/v3");

sdk.pet.buscar(123).then(console.log);

/**
 * ✅ 5. (Avançado) Usar OpenAPI com axios + autocomplete
 * 📦 Instale:
 * npm install openapi-client-axios
 */

/**
 * 📄 Exemplo com OpenAPIClient:
 */

import createClient from "openapi-client-axios";

const api = createClient({
  definition: "https://petstore3.swagger.io/api/v3/openapi.json",
});

const client = await api.init();

const res = await client.get("/pet/123"); // tipado com base no OpenAPI

/**
 * ✅ 6. Gerando SDK a partir de GraphQL (opcional)
 * 📦 Instale:
 * npm install -D graphql graphql-request
 */

/**
 * 📄 Geração com graphql-codegen
 * npx graphql-code-generator init
 * Gera types + client GraphQL com autocomplete completo!
 */


/**
 * 🧪 Desafio do Dia 19:
 * 1. Escolha uma API OpenAPI pública (ex: PetStore)
 * 2. Gere os tipos com openapi-typescript
 * 3. Crie o ApiClient com métodos básicos (buscar, criar, listar)
 * 4. Exporte um SDK em formato sdk.usuario.buscar(id)
 * 5. (Avançado): transforme isso num pacote npm ou numa lib local para reuso em outros projetos
 */

