// sdk/client.ts
import { paths } from "./types";

export class ApiClient {
  constructor(private baseUrl: string) {}

  async getPet(petId: number): Promise<
    paths["/pet/{petId}"]["get"]["responses"]["200"]["content"]["application/json"]
  > {
    const res = await fetch(`${this.baseUrl}/pet/${petId}`);
    if (!res.ok) throw new Error("Erro ao buscar pet");
    return res.json();
  }

  async listPets(): Promise<
    paths["/pet/findByStatus"]["get"]["responses"]["200"]["content"]["application/json"]
  > {
    const res = await fetch(`${this.baseUrl}/pet/findByStatus?status=available`);
    if (!res.ok) throw new Error("Erro ao listar pets");
    return res.json();
  }

  async addPet(
    body: paths["/pet"]["post"]["requestBody"]["content"]["application/json"]
  ): Promise<
    paths["/pet"]["post"]["responses"]["200"]["content"]["application/json"]
  > {
    const res = await fetch(`${this.baseUrl}/pet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Erro ao adicionar pet");
    return res.json();
  }
}
