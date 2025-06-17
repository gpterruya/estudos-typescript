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
var pessoa = {
    nome: "Gabriel",
    idade: 28,
};
console.log(pessoa.nome); // Gabriel
/**
 * Usando essa interface:
 */
var usuario = {
    nome: "Gabriel",
    idade: 28,
};
var outroUsuario = {
    nome: "Ana",
    idade: 30,
    profissao: "Designer",
};
var livro = {
    id: 1,
    nome: "Clean Code",
    preco: 99.9,
};
livro.nome = "Código Limpo"; // ✅ permitido
var gabriel = {
    nome: "Gabriel",
    dizerOi: function () {
        return "Oi, eu sou o ".concat(this.nome);
    },
};
console.log(gabriel.dizerOi()); // "Oi, eu sou o Gabriel"
var meuCarro = {
    marca: "Hyundai",
    modelo: "HB20",
    ano: 2019,
    ligar: function () {
        return "Carro ligado.";
    },
};
console.log(meuCarro.ligar());
