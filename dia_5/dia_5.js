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
function identidade(valor) {
    return valor;
}
var numero = identidade(42);
var texto = identidade("Gabriel");
/**
 * Aqui o <T> pode ser qualquer tipo (number, string, boolean, Pessoa, etc).
 */
/**
 * Genéricos com Arrays:
 */
function primeiroElemento(arr) {
    return arr[0];
}
var primeiro = primeiroElemento(["a", "b", "c"]); // string
var caixaNumero = { valor: 123 };
var caixaTexto = { valor: "alô" };
/**
 * ✅ 2. Union Types (|) e Intersection Types (&)
 *
 * Union (|) — Um ou outro
 */
function imprimirId(id) {
    console.log("ID:", id);
}
imprimirId(123);
imprimirId("abc");
var joao = {
    nome: "João",
    cargo: "Dev",
};
var usuarioParcial = {
    nome: "Ana", // idade pode ser omitida
};
/**
 * Readonly<T>: Torna tudo somente leitura
 */
var usuarioReadonly = {
    nome: "Gabriel",
    idade: 28,
};
var user = { nome: "Gabriel" };
var u = { nome: "Lucas" };
/**
 * ✅ 4. Type Narrowing (Refinamento de tipo)
 * Quando usamos typeof, in, ou instanceof para “estreitar” um tipo union.
 */
function mostrar(valor) {
    if (typeof valor === "string") {
        console.log("Texto:", valor.toUpperCase());
    }
    else {
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
function criarCaixa(valor) {
    return { valor: valor };
}
function atualizarUsuario(dados) {
    console.log("Atualizando com:", dados);
}
function mostrarInfo(parametro) {
    if (typeof parametro === "string") {
        console.log("Texto:", parametro.toUpperCase());
    }
    else {
        console.log("Número:", parametro.toFixed(2));
    }
}
