/**
 * 📚 Revisão rápida do Dia 1:
 * - O que é TypeScript.
 * - Como ele adiciona tipagem estática ao JavaScript.
 * - Como declarar variáveis com tipos básicos: string, number, boolean, etc.
 */
/**
 * 🧠 Objetivo do Dia 2:
 * Hoje você vai aprender a:
 * - Declarar e usar funções com TypeScript.
 * - Tipar parâmetros e retornos de funções.
 * - Usar tipos opcionais e valores padrão.
 * - Criar funções anônimas e arrow functions com tipos.
 */
/**
 * ✅ 1. Funções com Tipos
 * 🧪 Exemplo básico:
 */
function saudacao(nome) {
    return "Ol\u00E1, ".concat(nome, "!");
}
console.log(saudacao("Gabriel")); // Olá, Gabriel!
/**
 * Explicando:
 * - nome: string → parâmetro nome deve ser uma string.
 * - : string após o parêntese → o retorno da função também é string.
 * - Se tentar passar um número, TypeScript vai reclamar!
 */
/**
 * ✅ 2. Função com múltiplos parâmetros
 */
function soma(a, b) {
    return a + b;
}
console.log(soma(5, 3)); // 8
/**
 * ✅ 3. Parâmetros opcionais
 * Use ? para indicar que o parâmetro é opcional:
 */
function apresentar(nome, idade) {
    if (idade) {
        return "Ol\u00E1, me chamo ".concat(nome, " e tenho ").concat(idade, " anos.");
    }
    return "Ol\u00E1, me chamo ".concat(nome, ".");
}
console.log(apresentar("Gabriel"));
console.log(apresentar("Gabriel", 27));
/**
 * ✅ 4. Parâmetros com valor padrão
 */
function multiplicar(a, b) {
    if (b === void 0) { b = 2; }
    return a * b;
}
console.log(multiplicar(4)); // 8
console.log(multiplicar(4, 3)); // 12
/**
 * ✅ 5. Funções anônimas e arrow functions
 */
var dividir = function (a, b) {
    return a / b;
};
console.log(dividir(10, 2)); // 5
/**
 * ✅ 6. Função que não retorna nada (void)
 */
function logMensagem(mensagem) {
    console.log("Mensagem: ".concat(mensagem));
}
/**
 * ✅ Exercício 2 (pra você praticar):
 * Crie uma função chamada descreverPessoa que:
 * - Recebe:
 * -- nome: string
 * -- idade: number
 * -- profissao: string (opcional)
 * Retorna uma frase descrevendo a pessoa.
 * Se a profissão for passada, inclua na frase. Se não, apenas nome e idade.
 */
function descreverPessoa(nome, idade, profissao) {
    if (profissao) {
        return "".concat(nome, " tem ").concat(idade, " anos e trabalha como ").concat(profissao, ".");
    }
    return "".concat(nome, " tem ").concat(idade, " anos.");
}
/**
 * Exemplo esperado:
 */
descreverPessoa("Gabriel", 28, "Desenvolvedor");
// → "Gabriel tem 28 anos e trabalha como Desenvolvedor."
descreverPessoa("Lucas", 25);
// → "Lucas tem 25 anos."
