/**
 * 🎯 Objetivo do Dia 4:
 * 1. Criar e usar classes com TypeScript.
 * 2. Entender construtores, métodos e propriedades.
 * 3. Aprender sobre modificadores de acesso (public, private, protected).
 * 4. Usar interfaces com classes (implements).
 * 5. Usar herança com extends
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * ✅ 1. O que é uma Classe?
 * Uma classe é como um "molde" para criar objetos com propriedades e comportamentos (métodos).
 * Exemplo básico:
 */
var Pessoa = /** @class */ (function () {
    function Pessoa(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
    Pessoa.prototype.apresentar = function () {
        return "Ol\u00E1, meu nome \u00E9 ".concat(this.nome, " e tenho ").concat(this.idade, " anos.");
    };
    return Pessoa;
}());
var gabriel = new Pessoa("Gabriel", 28);
console.log(gabriel.apresentar());
/**
 * ✅ 2. Modificadores de Acesso
 * - public: visível por qualquer parte do código (padrão)
 * - private: visível apenas dentro da própria classe
 * - protected: visível dentro da classe e de classes filhas
 */
var ContaBancaria = /** @class */ (function () {
    function ContaBancaria(nome, saldoInicial) {
        this.nome = nome;
        this.saldo = saldoInicial;
    }
    ContaBancaria.prototype.verSaldo = function () {
        return this.saldo;
    };
    ContaBancaria.prototype.depositar = function (valor) {
        this.saldo += valor;
    };
    // método interno
    ContaBancaria.prototype.logInterno = function () {
        console.log("Log interno de auditoria.");
    };
    return ContaBancaria;
}());
var conta = new ContaBancaria("Gabriel", 1000);
conta.depositar(500);
console.log(conta.verSaldo()); // 1500
var Cachorro = /** @class */ (function () {
    function Cachorro(nome) {
        this.nome = nome;
    }
    Cachorro.prototype.emitirSom = function () {
        console.log("Au au!");
    };
    return Cachorro;
}());
var rex = new Cachorro("Rex");
rex.emitirSom(); // Au au!
/**
 * ✅ 4. Herança com extends
 */
var Animal = /** @class */ (function () {
    function Animal(nome) {
        this.nome = nome;
    }
    Animal.prototype.emitirSom = function () {
        console.log("Som genérico");
    };
    return Animal;
}());
var Gato = /** @class */ (function (_super) {
    __extends(Gato, _super);
    function Gato() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Gato.prototype.emitirSom = function () {
        console.log("Miau!");
    };
    return Gato;
}(Animal));
var felix = new Gato("Felix");
felix.emitirSom(); // Miau!
/**
 * ✅ 5. super() e protected
 * super() serve para chamar o construtor da classe base.
 * protected permite que filhos tenham acesso a campos/métodos da classe mãe.
 */
var Veiculo = /** @class */ (function () {
    function Veiculo(tipo) {
        this.tipo = tipo;
    }
    Veiculo.prototype.descrever = function () {
        return "Tipo do ve\u00EDculo: ".concat(this.tipo);
    };
    return Veiculo;
}());
var Moto = /** @class */ (function (_super) {
    __extends(Moto, _super);
    function Moto() {
        return _super.call(this, "Moto") || this;
    }
    Moto.prototype.mostrar = function () {
        console.log(this.descrever());
    };
    return Moto;
}(Veiculo));
var moto = new Moto();
moto.mostrar(); // Tipo do veículo: Moto
/**
 * 🧪 Exercício do Dia 4:
 * 1. Crie uma classe Funcionario com:
 * - nome: string
 * - salario: number (privado)
 * - aumentarSalario(percentual: number): void
 * - mostrarSalario(): number
 *
 * 2. Crie uma subclasse Gerente que:
 * - Usa o construtor do pai.
 * - Tem um método darBonus(valor: number) que aumenta o salário diretamente.
 */
var Funcionario = /** @class */ (function () {
    function Funcionario(nome, salario) {
        this.nome = nome;
        this.salario = salario;
    }
    Funcionario.prototype.aumentarSalario = function (percentual) {
        this.salario += this.salario * (percentual / 100);
    };
    Funcionario.prototype.mostrarSalario = function () {
        return this.salario;
    };
    return Funcionario;
}());
var Gerente = /** @class */ (function (_super) {
    __extends(Gerente, _super);
    function Gerente(nome, salario) {
        return _super.call(this, nome, salario) || this;
    }
    Gerente.prototype.darBonus = function (valor) {
        var salarioAtual = this.mostrarSalario();
        var percentual = (valor / salarioAtual) * 100;
        this.aumentarSalario(percentual);
    };
    return Gerente;
}(Funcionario));
