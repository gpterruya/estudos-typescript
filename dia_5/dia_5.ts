/**
 * 🎯 Objetivo do Dia 5:
 * 1. Entender e usar Genéricos (<T>)
 * 2. Aprender Union Types e Intersection Types
 * 3. Conhecer Tipos Utilitários (Partial, Readonly, Pick, Omit)
 * 4. Ver o conceito de Type Narrowing (refinamento de tipo)
 */

/**
 * ✅ 1. Genéricos (<T>)
 * O que é?
 * Genéricos são como tipos flexíveis e reutilizáveis. Você define um tipo "genérico" que será substituído por um tipo específico no momento do uso.
 * 
 * Exemplo básico:
 */

function identidade<T>(valor: T): T {
  return valor;
}

const numero = identidade<number>(42);
const texto = identidade<string>("Gabriel");

/**
 * Aqui o <T> pode ser qualquer tipo (number, string, boolean, Pessoa, etc).
 */

/**
 * Genéricos com Arrays:
 */

function primeiroElemento<T>(arr: T[]): T {
  return arr[0];
}

const primeiro = primeiroElemento(["a", "b", "c"]); // string

/**
 * Genérico com interface:
 */

interface Caixa<T> {
  valor: T;
}

const caixaNumero: Caixa<number> = { valor: 123 };
const caixaTexto: Caixa<string> = { valor: "alô" };

/**
 * ✅ 2. Union Types (|) e Intersection Types (&)
 * 
 * Union (|) — Um ou outro
 */

function imprimirId(id: number | string) {
  console.log("ID:", id);
}

imprimirId(123);
imprimirId("abc");

/**
 * Intersection (&) — Combinação de tipos
 */

interface Pessoa {
  nome: string;
}

interface Funcionario {
  cargo: string;
}

type PessoaFuncionario = Pessoa & Funcionario;

const joao: PessoaFuncionario = {
  nome: "João",
  cargo: "Dev",
};

/**
 * ✅ 3. Tipos utilitários (utility types)
 * TypeScript já traz atalhos prontos pra manipular tipos.
 * Partial<T>: Torna tudo opcional
 */

interface Usuario {
  nome: string;
  idade: number;
}

const usuarioParcial: Partial<Usuario> = {
  nome: "Ana", // idade pode ser omitida
};

/**
 * Readonly<T>: Torna tudo somente leitura
 */

const usuarioReadonly: Readonly<Usuario> = {
  nome: "Gabriel",
  idade: 28,
};

// usuarioReadonly.nome = "Outro"; ❌ Erro

/**
 * Pick<T, K>: Pega só alguns campos
 */

type NomeUsuario = Pick<Usuario, "nome">;

const user: NomeUsuario = { nome: "Gabriel" };

/**
 * Omit<T, K>: Remove certos campos
 */

type SemIdade = Omit<Usuario, "idade">;

const u: SemIdade = { nome: "Lucas" };

/**
 * ✅ 4. Type Narrowing (Refinamento de tipo)
 * Quando usamos typeof, in, ou instanceof para “estreitar” um tipo union.
 */

function mostrar(valor: string | number) {
  if (typeof valor === "string") {
    console.log("Texto:", valor.toUpperCase());
  } else {
    console.log("Número:", valor.toFixed(2));
  }
}

/**
 * 🧪 Exercício do Dia 5:
 * 1. Crie uma função criarCaixa<T> que receba um valor genérico e retorne um objeto { valor: T }.
 * 2. Crie um type chamado UsuarioCompleto com nome, email, idade.
 * 3. Use Partial<UsuarioCompleto> para criar uma função que receba atualizações parciais de um usuário.
 * 4. Crie uma função mostrarInfo que aceite um parâmetro string | number e imprima diferente para cada caso.
 */

function criarCaixa<T>(valor: T): { valor: T} {
    return { valor }
}

type UsuarioCompleto = {
    nome: string
    email: string
    idade: number
}

function atualizarUsuario(dados: Partial<UsuarioCompleto>) {
  console.log("Atualizando com:", dados);
}

function mostrarInfo(parametro: string | number) {
    if (typeof parametro === "string") {
    console.log("Texto:", parametro.toUpperCase());
  } else {
    console.log("Número:", parametro.toFixed(2));
  }
}