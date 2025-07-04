// sdk/exemplo.ts
import { createSDK } from "./index";

const sdk = createSDK("https://petstore3.swagger.io/api/v3");

async function main() {
  try {
    const lista = await sdk.pet.listar();
    console.log("🐶 Pets disponíveis:", lista);

    const novo = await sdk.pet.criar({
      id: 0,
      name: "Rex",
      photoUrls: [],
      status: "available",
    });
    console.log("📦 Pet criado:", novo);

    const pet = await sdk.pet.buscar(novo.id!);
    console.log("🔍 Pet buscado:", pet);
  } catch (err) {
    console.error("❌ Erro:", err);
  }
}

main();
