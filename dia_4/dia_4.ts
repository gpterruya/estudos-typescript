/**
 * 🎯 Objetivo do Dia 4:
 * 1. Criar e usar classes com TypeScript.
 * 2. Entender construtores, métodos e propriedades.
 * 3. Aprender sobre modificadores de acesso (public, private, protected).
 * 4. Usar interfaces com classes (implements).
 * 5. Usar herança com extends
 */

/**
 * ✅ 1. O que é uma Classe?
 * Uma classe é como um "molde" para criar objetos com propriedades e comportamentos (métodos).
 * Exemplo básico:
 */

class Pessoa {
  nome: string;
  idade: number;

  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }

  apresentar(): string {
    return `Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`;
  }
}

const gabriel = new Pessoa("Gabriel", 28);
console.log(gabriel.apresentar());

/**
 * ✅ 2. Modificadores de Acesso
 * - public: visível por qualquer parte do código (padrão)
 * - private: visível apenas dentro da própria classe
 * - protected: visível dentro da classe e de classes filhas
 */

class ContaBancaria {
  public nome: string;
  private saldo: number;

  constructor(nome: string, saldoInicial: number) {
    this.nome = nome;
    this.saldo = saldoInicial;
  }

  public verSaldo(): number {
    return this.saldo;
  }

  public depositar(valor: number): void {
    this.saldo += valor;
  }

  // método interno
  private logInterno(): void {
    console.log("Log interno de auditoria.");
  }
}

const conta = new ContaBancaria("Gabriel", 1000);
conta.depositar(500);
console.log(conta.verSaldo()); // 1500
// conta.saldo -> ERRO: saldo é privado!

/**
 * ✅ 3. Interface com implements
 * Você pode exigir que uma classe implemente uma interface:
 */

interface Animal {
  nome: string;
  emitirSom(): void;
}

class Cachorro implements Animal {
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  emitirSom(): void {
    console.log("Au au!");
  }
}

const rex = new Cachorro("Rex");
rex.emitirSom(); // Au au!

/**
 * ✅ 4. Herança com extends
 */

class Animal {
  constructor(public nome: string) {}

  emitirSom(): void {
    console.log("Som genérico");
  }
}

class Gato extends Animal {
  emitirSom(): void {
    console.log("Miau!");
  }
}

const felix = new Gato("Felix");
felix.emitirSom(); // Miau!

/**
 * ✅ 5. super() e protected
 * super() serve para chamar o construtor da classe base.
 * protected permite que filhos tenham acesso a campos/métodos da classe mãe.
 */

class Veiculo {
  protected tipo: string;

  constructor(tipo: string) {
    this.tipo = tipo;
  }

  protected descrever(): string {
    return `Tipo do veículo: ${this.tipo}`;
  }
}

class Moto extends Veiculo {
  constructor() {
    super("Moto");
  }

  mostrar(): void {
    console.log(this.descrever());
  }
}

const moto = new Moto();
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

class Funcionario {
    public nome: string
    private salario: number

    constructor(nome: string, salario: number) {
    this.nome = nome;
    this.salario = salario;
  }
    aumentarSalario(percentual: number): void {
        this.salario += this.salario * (percentual/100)
    }

    mostrarSalario(): number {
        return this.salario
    }
}

class Gerente extends Funcionario{
    constructor(nome: string, salario: number){
        super(nome, salario)
    }

   darBonus(valor: number): void {
    const salarioAtual = this.mostrarSalario();

    const percentual = (valor / salarioAtual) * 100;
    this.aumentarSalario(percentual);
  }
}