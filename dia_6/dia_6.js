/**
 * 🎯 Objetivo do Dia 6:
 * 1. Usar keyof, typeof e as
 * 2. Trabalhar com tipos condicionais (extends, infer)
 * 3. Explorar tipos utilitários poderosos (Record, Exclude, Extract, ReturnType)
 * 4. Aplicar tudo isso com exemplos reais
 */
// "nome" | "idade"
/**
 * Você pode usar keyof para limitar parâmetros de funções:
 */
function obterValor(obj, chave) {
    return obj[chave];
}
var u = { nome: "Gabriel", idade: 28 };
console.log(obterValor(u, "idade")); // 28
/**
 * ✅ 2. typeof: criar tipos a partir de valores
 */
var usuarioExemplo = {
    nome: "Gabriel",
    ativo: true,
};
// { nome: string; ativo: boolean }
/**
 * ✅ 3. as: redefinir ou "forçar" um tipo
 */
var input = document.querySelector("input");
input.value = "Texto novo";
/**
 * Ou com enums e valores literais:
 */
var tipo = "admin";
var perfilAdmin = {
    leitura: true,
    escrita: true,
    execucao: true,
};
// "number"
/**
 * ReturnType<T>
 * Extrai o tipo de retorno de uma função:
 */
function saudacao() {
    return "Olá!";
}
function pegarCampo(pessoa, chave) {
    return pessoa[chave];
}
function criarRegistroPadrao() {
    return {
        maria: 10,
        joao: 5,
        ana: 8,
    };
}
function extrairTipoRetorno(fn) {
    return fn();
}
