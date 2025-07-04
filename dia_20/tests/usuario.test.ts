import { describe, it, expect } from "vitest";
import { buscarUsuario } from "../usuario";

describe("API buscarUsuario", () => {
  it("retorna um usuário válido", async () => {
    const usuario = await buscarUsuario(1);
    expect(usuario).toHaveProperty("id", 1);
    expect(typeof usuario.nome).toBe("string");
  });
});
