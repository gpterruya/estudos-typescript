/**
 * 🎯 Objetivo do Dia 12:
 * 1. Usar Zod com validação + inferência automática de tipos
 * 2. Criar uma API fullstack tRPC com TypeScript
 * 3. Integrar com Prisma e tipagem inferida do banco de dados
 * 4. Explorar bibliotecas de tipos avançados (type-fest, ts-toolbelt)
 * 5. Discutir validação, transformação e tipagem com class-validator e class-transformer
 */

/**
 * ✅ 1. Zod: validação + tipos
 * Zod é uma das libs mais importantes para projetos TS modernos.
 * Exemplo:
 */

import { z } from "zod";

const usuarioSchema = z.object({
  nome: z.string(),
  idade: z.number().min(18),
});

type Usuario = z.infer<typeof usuarioSchema>;

function validarUsuario(dados: unknown): Usuario {
  const resultado = usuarioSchema.parse(dados); // lança erro se inválido
  return resultado;
}

/**
 * O Zod garante validação e inferência automática do tipo.
 */

/**
 * ✅ 2. tRPC: API tipada sem schemas duplicados
 * Crie APIs onde o cliente e o servidor compartilham os mesmos tipos, sem precisar escrever contratos duplicados.
 * Exemplo básico:
 */

// server.ts
import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const appRouter = t.router({
  saudacao: t.procedure
    .input(z.string())
    .query((opts) => {
      return `Olá, ${opts.input}!`;
    }),
});

export type AppRouter = typeof appRouter;

/**
 * No cliente:
 */

import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./server";

const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:3000/trpc" })],
});

const resposta = await client.saudacao.query("Gabriel");
console.log(resposta); // Olá, Gabriel!

/**
 * A tipagem é garantida de ponta a ponta com base no AppRouter.
 */

/**
 * ✅ 3. Integração com Prisma
 * Prisma já gera os tipos a partir do banco de dados, e você pode usá-los diretamente com Zod e tRPC.
 * Exemplo:
 */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const usuarios = await prisma.usuario.findMany(); // já vem tipado

/**
 * Validar entrada com Zod:
 */

const criarUsuarioSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
});

type NovoUsuario = z.infer<typeof criarUsuarioSchema>;

/**
 * ✅ 4. Bibliotecas de tipos avançados
 * 📦 type-fest
 * Uma coletânea de tipos utilitários muito poderosos.
 */

import { Merge } from "type-fest";

type A = { nome: string };
type B = { idade: number };

type AB = Merge<A, B>; // { nome: string; idade: number }

/**
 * 📦 ts-toolbelt
 * Tipos funcionais, matemáticos, lógicos, etc.
 */

import { List } from "ts-toolbelt";

type Nomes = ["Gabriel", "João"];
type Tamanho = List.Length<Nomes>; // 2

/**
 * ✅ 5. class-validator e class-transformer
 * Ideal para usar com NestJS ou APIs baseadas em classes.
 */

import { IsEmail, IsString } from "class-validator";

class UsuarioDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;
}

/**
 * Validando:
 */

import { validate } from "class-validator";

const dto = new UsuarioDto();
dto.nome = "Gabriel";
dto.email = "invalido";

validate(dto).then((erros) => {
  if (erros.length > 0) {
    console.log("Erro de validação!", erros);
  }
});

/**
 * 🧪 Exercício do Dia 12:
 * 1. Crie um schema Zod de Produto com nome, preco e emEstoque
 * 2. Use esse schema num endpoint tRPC que recebe um produto e retorna uma mensagem
 * 3. Crie um tipo com Merge<A, B> usando type-fest
 * 4. Crie uma DTO com class-validator e valide uma entrada com erro
 * 5. (Desafio bônus): integre tudo isso em um projeto com Express ou Next.js
 */

import { z } from "zod";

const produtoSchema = z.object({
  nome: z.string(),
  preco: z.number(),
  emEstoque: z.boolean(),
});

import { initTRPC } from "@trpc/server";
import { produtoSchema } from "./schemas/produto";

const t = initTRPC.create();

export const appRouter = t.router({
  registrarProduto: t.procedure
    .input(produtoSchema)
    .mutation(({ input }) => {
      return `Produto '${input.nome}' cadastrado com sucesso por R$${input.preco.toFixed(2)}!`;
    }),
});

export type AppRouter = typeof appRouter;

import { Merge } from "type-fest";

type A = { nome: string };
type B = { idade: number };

type Pessoa = Merge<A, B>;

// usuario.dto.ts
import { IsString, IsEmail, validate } from "class-validator";

class UsuarioDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;
}

// Exemplo de uso
const dto = new UsuarioDto();
dto.nome = "Gabriel";
dto.email = "email_invalido";

validate(dto).then((erros) => {
  if (erros.length > 0) {
    console.log("Erros de validação:");
    console.log(erros);
  } else {
    console.log("Validação OK");
  }
});

import express from "express";
import { produtoSchema } from "./schemas/produto";

const app = express();
app.use(express.json());

app.post("/produto", (req, res) => {
  const resultado = produtoSchema.safeParse(req.body);
  if (!resultado.success) {
    return res.status(400).json(resultado.error.format());
  }

  const produto = resultado.data;
  res.json({ mensagem: `Produto ${produto.nome} cadastrado com sucesso!` });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
