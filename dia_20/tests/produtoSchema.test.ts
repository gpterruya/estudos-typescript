import { describe, it, expect } from "vitest";
import { produtoSchema } from "../produtoSchema";

describe("Schema Produto", () => {
  it("valida produto válido", () => {
    const produto = {
      nome: "Notebook",
      preco: 2500,
    };
    expect(() => produtoSchema.parse(produto)).not.toThrow();
  });

  it("falha se nome for vazio", () => {
    const produto = {
      nome: "",
      preco: 2500,
    };
    expect(() => produtoSchema.parse(produto)).toThrow();
  });

  it("falha se preco for negativo", () => {
    const produto = {
      nome: "Teclado",
      preco: -50,
    };
    expect(() => produtoSchema.parse(produto)).toThrow();
  });
});
