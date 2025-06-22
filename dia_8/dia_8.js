"use strict";
/**
 * ✅ 1. TypeScript + Node.js / Express
 * 🗂 Estrutura de projeto comum:
 * /src
  ├─ controllers/
  ├─ routes/
  ├─ services/
  ├─ models/
  ├─ types/
  └─ index.ts
 */
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
exports.getUsers = void 0;
exports.Botao = Botao;
var users = [];
var getUsers = function (req, res) {
    res.json(users);
};
exports.getUsers = getUsers;
function Botao(_a) {
    var texto = _a.texto, onClick = _a.onClick;
    return onClick;
    {
        onClick;
    }
     > { texto: texto } < /button>;
}
/**
 * 🧠 Dica: use React.FC<Props> quando quiser inferência automática de children.
 */
var Card = function (_a) {
    var titulo = _a.titulo, children = _a.children;
    return ({ titulo: titulo } < /h2>
        < div > { children: children } < /div>
        < /div>);
};
function buscarPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/posts")];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
/**
 * ✅ 5. Validação com Zod
 * Zod é uma lib de validação de dados com tipagem automática:
 */
var zod_1 = require("zod");
var schemaUsuario = zod_1.z.object({
    nome: zod_1.z.string(),
    idade: zod_1.z.number().int().positive(),
});
/**
 * 🧪 Exemplo de validação:
 */
var entrada = { nome: "Gabriel", idade: 28 };
var resultado = schemaUsuario.safeParse(entrada);
if (!resultado.success) {
    console.error(resultado.error);
}
function listarUsuarios() {
    return [
        { id: 1, nome: "Gabriel", email: "" }
    ];
}
var schemaExUsuario = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    nome: zod_1.z.string(),
    email: zod_1.z.string(),
});
var exEntrada = { id: 1, nome: "Gabriel", email: "" };
var exResultado = schemaExUsuario.safeParse(exEntrada);
if (!exResultado.success) {
    console.error(exResultado.error);
}
