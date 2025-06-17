/**
 * 🎯 Objetivo do Dia 3:
 * - Aprender a criar e tipar objetos.
 * - Entender o que são e como usar interfaces.
 * - Usar readonly, opcional (?), e boas práticas com interfaces.
 * Entender a diferença entre type e interface.
 */

/**
 * ✅ 1. Criando e Tipando Objetos
 * Exemplo simples:
 */

const pessoa: { nome: string; idade: number } = {
  nome: "Gabriel",
  idade: 28,
};

console.log(pessoa.nome); // Gabriel

/**
 * Aqui definimos o tipo do objeto diretamente na variável.
 * Mas quando temos objetos mais complexos ou que serão usados várias vezes, usamos interfaces.
 */

/**
 * ✅ 2. Criando uma Interface
 */

interface Pessoa {
  nome: string;
  idade: number;
  profissao?: string; // opcional
}

/**
 * Usando essa interface:
 */

const usuario: Pessoa = {
  nome: "Gabriel",
  idade: 28,
};

const outroUsuario: Pessoa = {
  nome: "Ana",
  idade: 30,
  profissao: "Designer",
};

/**
 * ✅ 3. Interface com readonly (somente leitura)
 */

interface Produto {
  readonly id: number;
  nome: string;
  preco: number;
}

const livro: Produto = {
  id: 1,
  nome: "Clean Code",
  preco: 99.9,
};

livro.nome = "Código Limpo"; // ✅ permitido
// livro.id = 2; ❌ ERRO! id é somente leitura

/**
 * ✅ 4. Diferença entre interface e type
 * Na prática, são parecidos. Ambos criam tipos personalizados:
 */

type Animal = {
  especie: string;
  patas: number;
};

/**
 * Mas:
 * 
 * interface
 * Pode ser extendida com extends
 * Mais comum para objetos e classes
 * 
 * type
 * Pode fazer união, `type A = B
 * Mais flexível (pode representar primitivos, tuplas etc.)
 */

/**
 * ✅ 5. Interface com função
 * Você também pode usar funções dentro da interface:
 */

interface Usuario {
  nome: string;
  dizerOi(): string;
}

const gabriel: Usuario = {
  nome: "Gabriel",
  dizerOi() {
    return `Oi, eu sou o ${this.nome}`;
  },
};

console.log(gabriel.dizerOi()); // "Oi, eu sou o Gabriel"

/**
 * 🧪 Exercício do Dia 3:
 * Crie uma interface chamada Carro, com os seguintes campos:
 * marca: string
 * modelo: string
 * ano: number
 * ligar(): void → método que apenas imprime "Carro ligado."
 * Depois crie um objeto meuCarro com base nessa interface e chame o método ligar().
 */

interface Carro {
    marca: string;
    modelo: string;
    ano: number;
    ligar(): void;
}

const meuCarro: Carro = {
    marca: "Hyundai",
    modelo: "HB20",
    ano: 2019,
    ligar() {
        return "Carro ligado."
    },
}

console.log(meuCarro.ligar());