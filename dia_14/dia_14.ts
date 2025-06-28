/**
 * 🎯 Objetivo do Dia 14:
 * 1. Interpretar e manipular strings via tipos
 * 2. Criar um tipo que valida e extrai dados de rotas
 * 3. Simular um sistema de rotas REST tipado com segurança total
 * 4. Aplicar distribuição condicional e infer avançado
 * 5. Criar uma API declarativa tipada (como tRPC ou Prisma faz)
 */

/**
 * ✅ 1. Interpretando strings com tipos (template literal + infer)
 * - Separando parâmetros de rota
 */

type ExtrairParametro<T> = T extends `${infer _Prefix}:${infer Param}` ? Param : never;

type Teste = ExtrairParametro<"/user/:id">; // "id"

/**
 * ✅ 2. Múltiplos parâmetros com recursão
 */

type ExtrairParametros<T> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtrairParametros<`/${Rest}`>
    : T extends `${string}:${infer Param}`
      ? Param
      : never;

type Exemplo = ExtrairParametros<"/user/:id/post/:postId">;
// "id" | "postId"

/**
 * ✅ 3. Sistema de rotas REST tipado
 * - Declarando rotas:
 */

type Rotas = {
  "GET /users": () => User[];
  "GET /users/:id": (id: string) => User;
  "POST /users": (user: User) => User;
};

/**
 * - Extraindo método e caminho:
 */

type Metodo<R> = R extends `${infer M} ${string}` ? M : never;
type Caminho<R> = R extends `${string} ${infer P}` ? P : never;

type Teste1 = Metodo<"GET /users/:id">; // "GET"
type Teste2 = Caminho<"GET /users/:id">; // "/users/:id"

/**
 * ✅ 4. API declarativa tipada
 * - Criar uma função api() que valida o handler:
 */

type User = { id: string; nome: string };

type RotaDefinida<T extends string, H> = {
  path: T;
  handler: H;
};

function rota<T extends string, H>(path: T, handler: H): RotaDefinida<T, H> {
  return { path, handler };
}

// Exemplo de uso
const r1 = rota("/produtos/:id", (params: { id: string }) => {
  return `Produto ${params.id}`;
});

/**
 * ✅ 5. Criando um tipo ParamsDe<T>
 * Transforma /users/:id em { id: string }
 */

type ExtrairChaves<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtrairChaves<`/${Rest}`>
    : T extends `${string}:${infer Param}`
      ? Param
      : never;

type ParamsDe<T extends string> = {
  [K in ExtrairChaves<T>]: string;
};

type Resultado = ParamsDe<"/usuarios/:id/posts/:postId">;
// { id: string; postId: string }

/**
 * ✅ Desafio Prático do Dia 14:
 * Implemente um mini-framework de rotas com as seguintes funções:
 */

rota("GET /users/:id", (params: { id: string }) => {
  // retorna usuário
});

rota("POST /users", (body: User) => {
  // cria usuário
});

/**
 * Crie os tipos:
 * - Metodo<R> que extrai "GET" | "POST" de "GET /caminho"
 * - Caminho<R> que extrai o path ("/users/:id")
 * - ParamsDe<T> que gera um objeto com os parâmetros da URL
 * - Handler<T> que infere a assinatura do handler automaticamente com base na rota
 */

type Metodo<R> = R extends `${infer M} ${string}` ? M : never;

type Caminho<R> = R extends `${string} ${infer P}` ? P : never;

type ExtrairChaves<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtrairChaves<`/${Rest}`>
    : T extends `${string}:${infer Param}`
      ? Param
      : never;

type ParamsDe<T extends string> = {
  [K in ExtrairChaves<T>]: string;
};

type Handler<T extends string> =
  Metodo<T> extends "GET" | "DELETE"
    ? (params: ParamsDe<Caminho<T>>) => unknown
    : Metodo<T> extends "POST" | "PUT"
      ? (body: any) => unknown
      : never;
