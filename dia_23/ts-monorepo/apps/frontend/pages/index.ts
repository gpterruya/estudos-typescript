import type { Usuario } from "@app/types";
import { sdk } from "@app/sdk";

const user: Usuario = {
  id: 1,
  nome: "Gabriel"
};

export default function Home() {
  return <h1>Olá, {user.nome}!</h1>;
}

sdk.getUsuario().then(u => console.log(u.nome));