import { Usuario } from "@app/types";

export const sdk = {
  getUsuario: async (): Promise<Usuario> => {
    return fetch("/api/usuario").then(res => res.json());
  }
};
