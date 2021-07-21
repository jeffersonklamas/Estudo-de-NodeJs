// Importando as bibliotecas
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'query-string';
import * as url from 'url';
import { writeFile } from 'fs';

// Criando porta e servidor
const port = 5000

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    const urlparse = url.parse(request.url ? request.url : '', true);

    var resposta;

    // Receber informações do usuario
    const params = parse(urlparse.search ? urlparse.search : '');

    // Criar um usuario e Atualizar um usuario
    if (urlparse.pathname == "/criar-atualizar-usuario") {
      // Salvar informacoes
      writeFile(
        "users/" + params.id + ".txt",
        JSON.stringify(params),
        function (err: any) {
          if (err) throw err;
          console.log("Saved!");

          resposta = "Usuario Criado/Atualizado Com Sucesso";

          // Retornar a resposta escolhida
          response.statusCode = 200; // Informa ao navegador que está tudo ok, o 404 é erro.
          response.setHeader("Content-Type", "text/plain"); // Header de codificação
          response.end(resposta);
        }
      );
    }

    // response.end('Olá, Jefferson Klamas'); 
});

// Execucao
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// localhost:5000/criar-atualizar-usuario?id=1&nome=Jefferson&sexo=masculino
// localhost:5000/criar-atualizar-usuario?id=2&nome=Juliana&sexo=feminino