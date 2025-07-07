import { describe, it, expect } from "vitest";
import { Usuario } from "@app/types";
import { sdk } from "./index";

describe("SDK getUsuario", () => {
  it("deve retornar um usuário com tipo correto", async () => {
    // Simula o fetch (mock) ou use um fetch real
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ id: 1, nome: "Gabriel" }),
        ok: true,
      } as Response)
    );

    const usuario: Usuario = await sdk.getUsuario();

    expect(usuario.id).toBe(1);
    expect(usuario.nome).toBe("Gabriel");

    // Teste de tipo estático (TS) - o editor sinaliza erro se os tipos forem incompatíveis
    // @ts-expect-error
    // const errado: Usuario = { id: "abc", nome: 123 };
  });
});