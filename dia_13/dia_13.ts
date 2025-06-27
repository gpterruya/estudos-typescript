/**
 * 🎯 Objetivo do Dia 13:
 * 1. Criar tipos recursivos e deep readonly/partial
 * 2. Manipular template literal types de forma avançada
 * 3. Usar inference com fallback e lógica condicional complexa
 * 4. Trabalhar com nomes dinâmicos de campos (as, infer, remapeamento)
 * 5. Criar intellisense customizado com descrições
 */

/**
 * ✅ 1. Tipos recursivos
 * Crie transformações profundas:
 * DeepReadonly
 */

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};

type Usuario = {
  nome: string;
  endereco: {
    rua: string;
    cidade: string;
  };
};

type UsuarioRO = DeepReadonly<Usuario>;
// readonly nome: string
// readonly endereco: { readonly rua: string; readonly cidade: string }

/**
 * ✅ 2. Template literal types avançado
 * Mapeando nomes com prefixos:
 */

type Campos = "nome" | "idade";

type QueryParams = {
  [K in Campos as `query_${K}`]: string;
};

// query_nome: string
// query_idade: string

/**
 * Adicionando sufixo:
 */

type Flags<T> = {
  [K in keyof T as `${K & string}Flag`]: boolean;
};

type Config = {
  darkMode: boolean;
  notifications: boolean;
};

type ConfigFlags = Flags<Config>;
// darkModeFlag: boolean
// notificationsFlag: boolean

/**
 * ✅ 3. Inferência condicional com fallback
 * - Se for uma função, extrai o tipo de retorno, senão retorna never:
 */

type RetornoOuNada<T> = T extends (...args: any[]) => infer R ? R : never;

type A = RetornoOuNada<() => string>; // string
type B = RetornoOuNada<string>; // never

/**
 * ✅ 4. Nomes de campos dinâmicos com as + infer
 * - Extraindo nomes de métodos com on*:
 */

type Eventos = {
  onClick(): void;
  onChange(): void;
  nome: string;
};

type NomesDeEventos<T> = {
  [K in keyof T as K extends `on${string}` ? K : never]: T[K];
};

type ApenasEventos = NomesDeEventos<Eventos>;
// onClick(): void
// onChange(): void

/**
 * ✅ 5. Intellisense personalizado com descrição
 * - TypeScript não suporta comentário de tooltip em tipos, mas você pode forçar com tags JSDoc em interfaces e funções:
 */

/**
 * Representa um produto à venda.
 */
interface Produto {
  /** Nome visível do produto */
  nome: string;
  /** Valor em reais */
  preco: number;
}

/**
 * Isso ativa tooltips no VS Code!
 * E se quiser documentação programática, use Zod ou TJS (typescript-json-schema).
 */

//  🧪 Exercício do Dia 13:
//  1. Crie um tipo DeepPartial<T> que torne todos os campos opcionais recursivamente
//  2. Crie um tipo ChavesComPrefixo<T, P> que mapeia chaves adicionando prefixo
//  3. Crie uma função com tipo condicional: se o tipo de entrada for função, retorna seu retorno; senão, null
//  4. Crie um tipo ExtrairEventos<T> que pega somente chaves que começam com on
//  5. Escreva uma interface com /** descrição */ para gerar dicas de VS Code

type DeepPartial<T> = {
    [K in keyof T]: T[K] extends object
    ? DeepPartial<T[K]>
    : Partial<T[K]>;
}

type ChavesComPrefixo<T, P extends string> = {
    [K in keyof T as `${P}${Capitalize<string & K>}`]: T[K];
}

type RetornoSeFuncao<T> = T extends (...args: any[]) => infer R ? R : null;

type ExtrairEventos<T> = {
  [K in keyof T as K extends `on${string}` ? K : never]: T[K];
};

/**
 * Representa um produto no sistema.
 */
interface Produto {
  /** Nome do produto visível ao usuário */
  nome: string;

  /** Preço do produto em reais */
  preco: number;

  /** Indica se o produto está em estoque */
  emEstoque: boolean;
}
