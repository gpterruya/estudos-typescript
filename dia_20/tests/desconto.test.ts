import { describe, it, expect } from "vitest";
import { desconto } from "../desconto";

describe("Função desconto", () => {
  it("calcula o desconto corretamente", () => {
    expect(desconto(100, 10)).toBe(90);
    expect(desconto(200, 25)).toBe(150);
  });

  it("erro se tipo for inválido", () => {
    // @ts-expect-error
    desconto("100", 10);

    // @ts-expect-error
    desconto(100, "10");
  });
});