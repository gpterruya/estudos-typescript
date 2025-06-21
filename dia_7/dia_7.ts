/**
 * 🎯 Objetivo do Dia 7:
 * 1. Usar Template Literal Types
 * 2. Criar tipos mapeados com [K in keyof T]
 * 3. Aplicar modificadores em tipos (readonly, ?, -)
 * 4. Criar tipos utilitários personalizados
 * 5. Entender e aplicar regras de transformação de tipos
 */

/**
 * ✅ 1. Template Literal Types
 * Você pode combinar strings em tipos!
 */

type Cor = "vermelho" | "azul";
type Estilo = "claro" | "escuro";

type Tema = `${Cor}-${Estilo}`;
// "vermelho-claro" | "vermelho-escuro" | "azul-claro" | "azul-escuro"

/**
 * Exemplo prático:
 */

type Tamanhos = "P" | "M" | "G";
type ProdutoID = `produto-${Tamanhos}`;
// "produto-P" | "produto-M" | "produto-G"

/**
 * ✅ 2. Tipos Mapeados [K in keyof T]
 * Permite transformar tipos existentes:
 */

type Usuario = {
  nome: string;
  idade: number;
};

type SomenteLeitura<T> = {
  readonly [K in keyof T]: T[K];
};

type UsuarioReadonly = SomenteLeitura<Usuario>;

/**
 * Isso é equivalente a:
 */

type UsuarioReadonly = {
  readonly nome: string;
  readonly idade: number;
};

/**
 * ✅ 3. Modificadores: readonly, ?, -
 * Você pode adicionar ou remover modificadores de propriedades:
 */

/**
 * ➕ Tornar tudo opcional:
 */

type Parcial<T> = {
  [K in keyof T]?: T[K];
};

/**
 * ➖ Remover o readonly:
 */

type Mutavel<T> = {
  -readonly [K in keyof T]: T[K];
};

/**
 * ➖ Remover a opcionalidade:
 */

type Obrigatorio<T> = {
  [K in keyof T]-?: T[K];
};

/**
 * ✅ 4. Criando tipos utilitários personalizados
 * Você já viu Partial, Pick, Omit... agora você pode criar os seus.
 * Exemplo: Selecionar<T, U>
 */

type Selecionar<T, U extends keyof T> = {
  [K in U]: T[K];
};

type Usuario = {
  nome: string;
  idade: number;
  email: string;
};

type UsuarioPublico = Selecionar<Usuario, "nome" | "idade">;

/**
 * ✅ 5. Desafio real: transformar campos
 * Você pode até modificar os tipos dos campos!
 */

type ParaBooleano<T> = {
  [K in keyof T]: boolean;
};

type Permissoes = {
  criar: "sim" | "não";
  editar: "sim" | "não";
};

type PermissoesBooleanas = ParaBooleano<Permissoes>;
// { criar: boolean; editar: boolean }

/**
 * 🧪 Exercício do Dia 7:
 * 1. Dado o tipo:
 */

type Produto = {
  nome: string;
  preco: number;
  estoque?: number;
};

/**
 * Faça:
 * - Um tipo ProdutoSomenteLeitura que torne tudo readonly.
 * - Um tipo ProdutoCompleto que remova o ? de estoque.
 * - Um tipo ProdutoFlags que transforme todos os campos em boolean.
 * 2. Crie um tipo Mensagem<T> que produza "Erro: ${T}" (usando template literal types).
 * 3. Crie um tipo ChavesComoStrings<T> que transforme as chaves do tipo em strings literais ("nome" | "preco" | "estoque").
 */

type ProdutoSomenteLeitura<Produto> = {
  readonly [K in keyof Produto]: Produto[K];
};

type ProdutoCompleto<Produto> = {
    [K in keyof Produto]-?: Produto[K];
} 

type ProdutoFlags<Produto> = {
    [K in keyof Produto]: boolean;
}

type Mensagem<T> = `Erro: ${T}`;

type ChavesComoString<T> = keyof T & string;