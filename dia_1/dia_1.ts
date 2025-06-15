/**
 * Aula 1: Introdução ao TypeScript
 * 
 * ✅ O que é TypeScript?
 * TypeScript é uma linguagem de programação criada pela Microsoft.
 * 
 * É um "superconjunto" do JavaScript, ou seja, tudo que é JavaScript também é TypeScript.
 * 
 * A grande diferença é que o TypeScript adiciona tipagem estática.
 * Você pode (e deve) dizer qual tipo de dado está usando — string, número, booleano etc.
 * 
 * Isso ajuda a evitar erros e torna o código mais seguro e fácil de manter.
 */

/**
 * ✅ Por que usar TypeScript?
 * - Evita erros comuns
 * - Facilita o autocompletar e a documentação automática
 * - Deixa o código mais organizado
 * - Ajuda a trabalhar em equipe
 */

/**
 * ✅ Como funciona o TypeScript?
 * - Você escreve código em `.ts` (TypeScript)
 * - O TypeScript é "compilado" para `.js` (JavaScript)
 * - O navegador ou Node.js executa o JavaScript normalmente
 */

/**
 * ✅ Como instalar o TypeScript?
 * Se quiser praticar na sua máquina, basta ter o Node.js instalado. Depois:
 * $ npm install -g typescript
 * Para verificar a instalação:
 * $ tsc --version
 */

/** ✅ Nosso primeiro código TypeScript:
 * Exemplo:
 */
let nome: string = 'Maria';
let idade: number = 30;
let estudando: boolean = true;

console.log(`Nome: ${nome}, Idade: ${idade}, Estudando: ${estudando}`);

// ✅ O que acontece se errar a tipagem?
// nome = 123; // ERRO! TypeScript avisa que nome deve ser uma string

/**
 * ✅ Tipos básicos do TypeScript:
 * - string → 'Olá', "Mundo"
 * - number → 10, 3.14
 * - boolean → true, false
 * - any → qualquer coisa (evite usar!)
 * - void → sem retorno (em funções)
 * - null / undefined → ausência de valor
 * - array → number[] ou Array<number>
 * - tuple → [string, number]
 * - enum → Enumeração de valores fixos
 */

/**
 * ✅ Exercício 1
 * Crie variáveis:
 * - meuNome → tipo string
 * - minhaIdade → tipo number
 * - estouAprendendo → tipo boolean
 */

let meuNome: string = 'Gabriel';
let minhaIdade: number = 25;
let estouAprendendo: boolean = true;

console.log(`Nome: ${meuNome}, Idade: ${minhaIdade}, Aprendendo TypeScript: ${estouAprendendo}`);