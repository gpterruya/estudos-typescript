// sdk/index.ts
import { ApiClient } from "./client";

export function createSDK(baseUrl: string) {
  const client = new ApiClient(baseUrl);

  return {
    pet: {
      buscar: (id: number) => client.getPet(id),
      listar: () => client.listPets(),
      criar: (dados: any) => client.addPet(dados),
    },
    // Você pode expandir para outras rotas: usuário, store, etc.
  };
}
