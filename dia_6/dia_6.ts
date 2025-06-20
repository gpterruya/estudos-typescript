/**
 * 🎯 Objetivo do Dia 6:
 * 1. Usar keyof, typeof e as
 * 2. Trabalhar com tipos condicionais (extends, infer)
 * 3. Explorar tipos utilitários poderosos (Record, Exclude, Extract, ReturnType)
 * 4. Aplicar tudo isso com exemplos reais
 */

/**
 * ✅ 1. keyof: pega as chaves de um tipo
 */

interface Usuario {
  nome: string;
  idade: number;
}

type ChavesUsuario = keyof Usuario;
// "nome" | "idade"

/**
 * Você pode usar keyof para limitar parâmetros de funções:
 */

function obterValor(obj: Usuario, chave: keyof Usuario) {
  return obj[chave];
}

const u: Usuario = { nome: "Gabriel", idade: 28 };
console.log(obterValor(u, "idade")); // 28

/**
 * ✅ 2. typeof: criar tipos a partir de valores
 */

const usuarioExemplo = {
  nome: "Gabriel",
  ativo: true,
};

type TipoUsuario = typeof usuarioExemplo;
// { nome: string; ativo: boolean }

/**
 * ✅ 3. as: redefinir ou "forçar" um tipo
 */

const input = document.querySelector("input") as HTMLInputElement;
input.value = "Texto novo";

/**
 * Ou com enums e valores literais:
 */

const tipo: "admin" | "user" = "admin" as const;

/**
 * ✅ 4. Tipos condicionais
 */

type EhString<T> = T extends string ? "Sim" : "Não";

type Teste1 = EhString<string>; // "Sim"
type Teste2 = EhString<number>; // "Não"

/**
 * ✅ 5. infer: extrair tipos automaticamente
 */

type Retorno<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = () => number;
type Resultado = Retorno<Fn>; // number

/**
 * ✅ 6. Tipos utilitários avançados
 * Record<Keys, Type>
 * Cria um objeto com chaves e tipo:
 */

type Permissoes = "leitura" | "escrita" | "execucao";
type Perfil = Record<Permissoes, boolean>;

const perfilAdmin: Perfil = {
  leitura: true,
  escrita: true,
  execucao: true,
};

/**
 * Exclude<Union, Remover>
 * Remove membros de um tipo union:
 */

type Status = "ativo" | "inativo" | "banido";
type Visivel = Exclude<Status, "banido">;
// "ativo" | "inativo"

/**
 * Extract<Union, Manter>
 * Mantém apenas os tipos desejados:
 */

type Tipo = "string" | "number" | "boolean";
type Numerico = Extract<Tipo, "number">;
// "number"

/**
 * ReturnType<T>
 * Extrai o tipo de retorno de uma função:
 */

function saudacao() {
  return "Olá!";
}

type SaudacaoTipo = ReturnType<typeof saudacao>; // string

/**
 * 🧪 Exercício do Dia 6:
 * 1. Crie um tipo Pessoa com nome, email, idade
 * 2. Crie um tipo ChavePessoa que usa keyof
 * 3. Crie uma função pegarCampo que recebe uma Pessoa e uma chave válida e retorna o valor
 * 4. Crie uma função criarRegistroPadrao que usa Record<string, number> para gerar um mapa de pontuações (ex: { "maria": 10, "joao": 5 })
 * 5. Crie uma função extrairTipoRetorno que usa ReturnType para extrair o tipo de retorno de uma função qualquer
 */

type Pessoa = {
    nome: string
    email: string
    idade: number
}

type ChavePessoa = keyof Pessoa

function pegarCampo(pessoa: Pessoa, chave: ChavePessoa) {
    return pessoa[chave]
}

function criarRegistroPadrao(): Record<string, number> {
    return {
    maria: 10,
    joao: 5,
    ana: 8,
  };
}

function extrairTipoRetorno<T extends (...args: any[]) => any>(fn: T): ReturnType<T> {
  return fn() as ReturnType<T>;
}