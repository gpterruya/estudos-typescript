/**
 * 🎯 Objetivo do Dia 9:
 * 1. Escrever testes automatizados com TypeScript (Jest)
 * 2. Lidar com funções assíncronas e tipar corretamente async/await
 * 3. Criar tipos personalizados para erros
 * 4. Entender e aplicar princípios de arquitetura com TypeScript (como Inversão de Dependência)
 */

/**
 * ✅ 1. Testes com TypeScript (Jest + TS)
 * 📦 Instalação:
 * npm install --save-dev jest ts-jest @types/jest
 * npx ts-jest config:init
 */


/**
 * 🧪 Exemplo de teste com TypeScript:
 * 📁 dia_9/somar.ts
 */

export function somar(a: number, b: number): number {
  return a + b;
}

/**
 * 📁 __tests__/somar.test.ts
 */

import { somar as somarImportado } from "./somar";

test("soma dois números", () => {
  expect(somarImportado(2, 3)).toBe(5);
});

/**
 * Rodar com:
 * npx jest
 */

/**
 * ✅ 2. Tipagem em funções assíncronas
 */

async function buscarUsuario(id: number): Promise<Usuario> {
  const res = await fetch(`/api/usuarios/${id}`);
  const data = await res.json();
  return data as Usuario;
}

/**
 * Sempre tipar o retorno da função assíncrona. O TypeScript infere, mas é uma boa prática ser explícito.
 */

/**
 * ✅ 3. Erros com tipos personalizados
 * Criando um tipo de erro customizado:
 */

class ErroDeNegocio extends Error {
  constructor(public codigo: string, mensagem: string) {
    super(mensagem);
  }
}

/**
 * Usando:
 */

function processar(pontos: number) {
  if (pontos < 0) {
    throw new ErroDeNegocio("PONTOS_INVALIDOS", "Pontos não podem ser negativos.");
  }
}

/**
 * Capturando com segurança:
 */

try {
  processar(-10);
} catch (e) {
  if (e instanceof ErroDeNegocio) {
    console.log(e.codigo); // "PONTOS_INVALIDOS"
  }
}

/**
 * ✅ 4. Arquitetura: Inversão de Dependência com TS
 * Problema:
 */

class EmailService {
  enviar(email: string, mensagem: string) {
    console.log(`Enviando e-mail para ${email}: ${mensagem}`);
  }
}

class UsuarioController {
  constructor(private emailService: EmailService) {}

  cadastrar(email: string) {
    // lógica de cadastro...
    this.emailService.enviar(email, "Bem-vindo!");
  }
}

/**
 * Solução (boas práticas):
 * 1. Criar uma interface:
 */

interface INotificador {
  enviar(destino: string, conteudo: string): void;
}

/**
 * 2. Implementar:
 */

// class EmailService implements INotificador {
//   enviar(destino: string, conteudo: string): void {
//     console.log(`E-mail enviado para ${destino}: ${conteudo}`);
//   }
// }

/**
 * 3. Injetar dependência via interface:
 */

// class UsuarioController {
//   constructor(private notificador: INotificador) {}

//   cadastrar(email: string) {
//     this.notificador.enviar(email, "Bem-vindo!");
//   }
// }

/**
 * Agora o controller pode usar qualquer serviço que implemente INotificador: e-mail, SMS, push, etc.
 */

/**
 * 🧪 Exercício do Dia 9:
 * 1. Crie uma interface ICalculadora com um método somar(a: number, b: number): number
 * 2. Crie uma classe CalculadoraSimples que implementa essa interface
 * 3. Crie um teste unitário para garantir que somar(5, 7) retorna 12
 * 4. Crie uma função buscarDados que simula um fetch com async/await e retorna um tipo Dados
 * 5. Crie uma classe de erro ErroAPI com código e mensagem, e um try/catch que captura isso
 */

interface ICalculadora {
    somar(a: number, b: number): number
}

export class CalculadoraSimples implements ICalculadora {
    somar(a: number, b: number): number {
        return a + b
    }
}

interface Dados {
  nome: string;
  idade: number;
}

async function buscarDados(id: number): Promise<Dados> {
    try {
  const res = await fetch(`/api/dados/${id}`);
  const data = await res.json();
  return data as Dados;
} catch (e) {
  if (e instanceof Error) {
    console.log(e.message);
  }
  throw e 
 }
}

class ErroAPI extends Error {
  constructor(public codigo: string, mensagem: string) {
    super(mensagem);
  }
}

(async () => {
  try {
    const dados = await buscarDados(1);
    console.log(dados);
  } catch (e) {
    if (e instanceof ErroAPI) {
      console.log("Erro:", e.codigo, e.message);
    }
  }
})();