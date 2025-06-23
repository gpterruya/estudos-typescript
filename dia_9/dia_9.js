"use strict";
/**
 * 🎯 Objetivo do Dia 9:
 * 1. Escrever testes automatizados com TypeScript (Jest)
 * 2. Lidar com funções assíncronas e tipar corretamente async/await
 * 3. Criar tipos personalizados para erros
 * 4. Entender e aplicar princípios de arquitetura com TypeScript (como Inversão de Dependência)
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculadoraSimples = void 0;
exports.somar = somar;
/**
 * ✅ 1. Testes com TypeScript (Jest + TS)
 * 📦 Instalação:
 * npm install --save-dev jest ts-jest @types/jest
 * npx ts-jest config:init
 */
/**
 * 🧪 Exemplo de teste com TypeScript:
 * 📁 dia_9/somar.ts
 */
function somar(a, b) {
    return a + b;
}
/**
 * 📁 __tests__/somar.test.ts
 */
var somar_1 = require("./somar");
test("soma dois números", function () {
    expect((0, somar_1.somar)(2, 3)).toBe(5);
});
/**
 * Rodar com:
 * npx jest
 */
/**
 * ✅ 2. Tipagem em funções assíncronas
 */
function buscarUsuario(id) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/usuarios/".concat(id))];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
/**
 * Sempre tipar o retorno da função assíncrona. O TypeScript infere, mas é uma boa prática ser explícito.
 */
/**
 * ✅ 3. Erros com tipos personalizados
 * Criando um tipo de erro customizado:
 */
var ErroDeNegocio = /** @class */ (function (_super) {
    __extends(ErroDeNegocio, _super);
    function ErroDeNegocio(codigo, mensagem) {
        var _this = _super.call(this, mensagem) || this;
        _this.codigo = codigo;
        return _this;
    }
    return ErroDeNegocio;
}(Error));
/**
 * Usando:
 */
function processar(pontos) {
    if (pontos < 0) {
        throw new ErroDeNegocio("PONTOS_INVALIDOS", "Pontos não podem ser negativos.");
    }
}
/**
 * Capturando com segurança:
 */
try {
    processar(-10);
}
catch (e) {
    if (e instanceof ErroDeNegocio) {
        console.log(e.codigo); // "PONTOS_INVALIDOS"
    }
}
/**
 * ✅ 4. Arquitetura: Inversão de Dependência com TS
 * Problema:
 */
var EmailService = /** @class */ (function () {
    function EmailService() {
    }
    EmailService.prototype.enviar = function (email, mensagem) {
        console.log("Enviando e-mail para ".concat(email, ": ").concat(mensagem));
    };
    return EmailService;
}());
var UsuarioController = /** @class */ (function () {
    function UsuarioController(emailService) {
        this.emailService = emailService;
    }
    UsuarioController.prototype.cadastrar = function (email) {
        // lógica de cadastro...
        this.emailService.enviar(email, "Bem-vindo!");
    };
    return UsuarioController;
}());
var CalculadoraSimples = /** @class */ (function () {
    function CalculadoraSimples() {
    }
    CalculadoraSimples.prototype.somar = function (a, b) {
        return a + b;
    };
    return CalculadoraSimples;
}());
exports.CalculadoraSimples = CalculadoraSimples;
function buscarDados(id) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/dados/".concat(id))];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    e_1 = _a.sent();
                    if (e_1 instanceof Error) {
                        console.log(e_1.message);
                    }
                    throw e_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
var ErroAPI = /** @class */ (function (_super) {
    __extends(ErroAPI, _super);
    function ErroAPI(codigo, mensagem) {
        var _this = _super.call(this, mensagem) || this;
        _this.codigo = codigo;
        return _this;
    }
    return ErroAPI;
}(Error));
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var dados, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, buscarDados(1)];
            case 1:
                dados = _a.sent();
                console.log(dados);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                if (e_2 instanceof ErroAPI) {
                    console.log("Erro:", e_2.codigo, e_2.message);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
