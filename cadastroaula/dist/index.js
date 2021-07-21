"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importando as bibliotecas
var http_1 = require("http");
var query_string_1 = require("query-string");
var url = __importStar(require("url"));
var fs_1 = require("fs");
// Criando porta e servidor
var port = 5000;
var server = http_1.createServer(function (request, response) {
    var urlparse = url.parse(request.url ? request.url : '', true);
    var resposta;
    // Receber informações do usuario
    var params = query_string_1.parse(urlparse.search ? urlparse.search : '');
    // Criar um usuario e Atualizar um usuario
    if (urlparse.pathname == "/criar-atualizar-usuario") {
        // Salvar informacoes
        fs_1.writeFile("users/" + params.id + ".txt", JSON.stringify(params), function (err) {
            if (err)
                throw err;
            console.log("Saved!");
            resposta = "Usuario Criado/Atualizado Com Sucesso";
            // Retornar a resposta escolhida
            response.statusCode = 200; // Informa ao navegador que está tudo ok, o 404 é erro.
            response.setHeader("Content-Type", "text/plain"); // Header de codificação
            response.end(resposta);
        });
    }
    // response.end('Olá, Jefferson Klamas'); 
});
// Execucao
server.listen(port, function () {
    console.log("Server running on port " + port);
});
// localhost:5000/criar-atualizar-usuario?id=1&nome=Jefferson&sexo=masculino
// localhost:5000/criar-atualizar-usuario?id=2&nome=Juliana&sexo=feminino
