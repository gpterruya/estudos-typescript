/**
 * ✅ 1. TypeScript + Node.js / Express
 * 🗂 Estrutura de projeto comum:
 * /src
  ├─ controllers/
  ├─ routes/
  ├─ services/
  ├─ models/
  ├─ types/
  └─ index.ts
 */

  /**
   * 🧪 Exemplo: tipo de usuário
   */

// types/User.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * ✨ Usando em uma rota:
 */

import { Request, Response } from "express";
import { User } from "./types/User";

const users: User[] = [];

export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

/**
 * ✅ 2. TypeScript + React
 * 🧪 Componente com props tipadas:
 */

type BotaoProps = {
  texto: string;
  onClick: () => void;
};

export function Botao({ texto, onClick }: BotaoProps) {
  return <button onClick={onClick}>{texto}</button>;
}

/**
 * 🧠 Dica: use React.FC<Props> quando quiser inferência automática de children.
 */

const Card: React.FC<{ titulo: string }> = ({ titulo, children }) => (
  <div>
    <h2>{titulo}</h2>
    <div>{children}</div>
  </div>
);

/**
 * ✅ 3. Tipando chamadas de API REST
 * Front-end:
 */

type Post = {
  id: number;
  title: string;
};

async function buscarPosts(): Promise<Post[]> {
  const res = await fetch("/api/posts");
  return res.json();
}

/**
 * ✅ 4. Tipando respostas GraphQL
 */

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

// Exemplo de uso:
type Usuario = { nome: string };
type Resposta = GraphQLResponse<{ usuario: Usuario }>;

/**
 * ✅ 5. Validação com Zod
 * Zod é uma lib de validação de dados com tipagem automática:
 */

import { z } from "zod";

const schemaUsuario = z.object({
  nome: z.string(),
  idade: z.number().int().positive(),
});

type Usuario = z.infer<typeof schemaUsuario>;

/**
 * 🧪 Exemplo de validação:
 */

const entrada = { nome: "Gabriel", idade: 28 };
const resultado = schemaUsuario.safeParse(entrada);

if (!resultado.success) {
  console.error(resultado.error);
}

/**
 * ✅ 6. Boas práticas com TypeScript
 * 
 * | Prática                            | Por quê?                            |
   | ---------------------------------- | ----------------------------------- |
   | Use sempre interfaces/types        | Organização e reuso                 |
   | Nunca use `any`                    | Perde todo o poder do TS            |
   | Crie arquivos `types/`             | Centralize suas definições          |
   | Tipar retorno de funções           | Ajuda o IntelliSense e previne bugs |
   | Usar `zod` ou `class-validator`    | Para validar entrada de APIs        |
   | Use `eslint` + `typescript-eslint` | Para manter o código limpo          |
 */

/**
 * 🧪 Exercício do Dia 8:
 * Imagine que você está criando uma API de usuários. Faça:
 * 1. Crie um tipo ou interface Usuario com id, nome, email
 * 2. Crie uma função listarUsuarios(): Usuario[]
 * 3. Crie um schema Zod baseado nesse tipo
 * 4. Faça uma função que valide um objeto e retorne se ele é um usuário válido
 */

type exUsuario = {
    id: number
    nome: string
    email: string
}

function listarUsuarios(): exUsuario[] {
    return [
        { id: 1, nome: "Gabriel", email: ""}
    ]
}

const schemaExUsuario = z.object({
    id: z.number().int().positive(),
    nome: z.string(),
    email: z.string(),
})

const exEntrada = { id: 1, nome: "Gabriel", email: "" };
const exResultado = schemaExUsuario.safeParse(exEntrada);

if (!exResultado.success) {
  console.error(exResultado.error);
}