export interface Usuario {
  id: number;
  nome: string;
}

export async function buscarUsuario(id: number): Promise<Usuario> {
  // simulação de requisição
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id, nome: "Gabriel" }), 50)
  );
}
