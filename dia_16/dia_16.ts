/**
 * 🎯 Objetivo do Dia 16:
 * 1. Criar um mini-framework com decorators
 * 2. Usar metadata reflection (reflect-metadata)
 * 3. Aplicar validação automática com decorators e Zod
 * 4. Gerar documentação de rotas/tipos automaticamente
 * 5. Criar uma experiência de uso declarativa, como NestJS ou tRPC
 */

/**
 * ✅ 1. Decorators em TypeScript
 * Habilite no tsconfig.json:
 * 
 * {
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
 */

/**
 * Instale reflect-metadata:
 * npm install reflect-metadata
 */

/**
 * E no início da aplicação:
 */

import "reflect-metadata";

/**
 * Exemplo de uso:
 */

function Controller(prefix: string) {
  return function (target: Function) {
    Reflect.defineMetadata("prefix", prefix, target);
  };
}

function Get(path: string) {
  return function (target: any, key: string) {
    Reflect.defineMetadata("path", path, target, key);
    Reflect.defineMetadata("method", "GET", target, key);
  };
}

/**
 * Declarando um "controller":
 */

@Controller("/users")
class UserController {
  @Get("/:id")
  getById() {
    return "Usuário retornado";
  }
}

/**
 * ✅ 2. Lendo os metadata decorators
 */

const controllers = [UserController];

controllers.forEach((ControllerClass) => {
  const prefix = Reflect.getMetadata("prefix", ControllerClass);
  const prototype = ControllerClass.prototype;

  Object.getOwnPropertyNames(prototype).forEach((method) => {
    const path = Reflect.getMetadata("path", prototype, method);
    const http = Reflect.getMetadata("method", prototype, method);
    if (path && http) {
      console.log(`[${http}] ${prefix}${path} -> ${method}`);
    }
  });
});

/**
 * 💡 Saída:
 * [GET] /users/:id -> getById
 */

/**
 * ✅ 3. Tipagem + validação com decorators + Zod
 */

import { z } from "zod";

function Validate(schema: z.ZodTypeAny) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata("zod", schema, target, key);
  };
}

const createUserSchema = z.object({
  nome: z.string(),
  idade: z.number().min(18),
});

@Controller("/users")
class UserController {
  @Validate(createUserSchema)
  create(data: any) {
    return `Usuário criado: ${data.nome}`;
  }
}

/**
 * Validação automática na execução:
 */

const schema = Reflect.getMetadata("zod", controller, "create");
const data = { nome: "Gabriel", idade: 17 };
schema.parse(data); // Lança erro automaticamente

/**
 * ✅ 4. Geração de documentação automática
 * Você pode usar os decorators para gerar uma documentação de rota estilo Swagger:
 * [
  {
    rota: "POST /users",
    handler: "create",
    schema: "createUserSchema",
    descricao: "Cria um novo usuário"
  }
]
 */

/**
 * ✅ 5. DX Final: seu framework
 * Você pode criar uma API assim:
 */

@Controller("/produtos")
class ProdutoController {
  @Get("/")
  listar() {}

  @Get("/:id")
  buscar() {}

  @Validate(z.object({ nome: z.string() }))
  create(body: any) {}
}

/**
 * E o framework interno pode:
 * - Validar os parâmetros automaticamente
 * - Mapear rotas e métodos
 * - Expor documentação gerada via metadata
 * - Garantir tipos com segurança total (Zod + decorators)
 */

/**
 * 🧪 Exercício do Dia 16:
 * 1. Crie um decorator @Controller que registra prefixo
 * 2. Crie @Get(path) que guarda o método e caminho
 * 3. Crie @Validate(schema) que valida entrada com Zod
 * 4. Monte uma função registrarRotas() que percorre todos controllers e exibe as rotas + métodos
 * 5. (Avançado): Gere um arquivo .d.ts contendo todos os métodos, caminhos e tipos inferidos de entrada
 */

function Controller(prefix: string) {
  return function (target: Function) {
    Reflect.defineMetadata("prefix", prefix, target);
  };
}

function Get(path: string) {
  return function (target: any, key: string) {
    Reflect.defineMetadata("path", path, target, key);
    Reflect.defineMetadata("method", "GET", target, key);
  };
}

import { z } from "zod";

function Validate(schema: z.ZodTypeAny) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata("zod", schema, target, key);
  };
}

function registrarRotas(controllers: any[]) {
    controllers.forEach((ControllerClass) => {
  const prefix = Reflect.getMetadata("prefix", ControllerClass);
  const prototype = ControllerClass.prototype;

  Object.getOwnPropertyNames(prototype).forEach((method) => {
    const path = Reflect.getMetadata("path", prototype, method);
    const http = Reflect.getMetadata("method", prototype, method);
    if (path && http) {
      console.log(`[${http}] ${prefix}${path} -> ${method}`);
    }
  });
});
}

const conteudo = `export interface Rota {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  handler: string;
  schema?: string | null;
}

export const rotas: Rota[];
`;

fs.writeFileSync("rotasGeradas.d.ts", conteudo);
