// Incluindo a biblioteca http
const http = require('http');
const url = require('url');
const queryString = require('query-string');
const fs = require('fs');


// Definição do endereço e o ip a porta a ser utilizada.
const hostname = '127.0.0.1';  // localhost
const port = 3000;

// Bloco da implementação da regra de negócio
const server = http.createServer((req, res) => {
  
  let resposta;
  const urlparse = url.parse(req.url, true);
  // Receber informações do usuario
  const params = queryString.parse(urlparse.search);
  
  // Criar um usuario e Atualizar um usuario
  if (urlparse.pathname == '/criar-atualizar-usuario'){
    
    // Salvar informacoes
    fs.writeFile('users/'+ params.id +'.txt', JSON.stringify(params), function (err) {
      if (err) throw err;
      console.log('Saved!');

      resposta = 'Usuario Criado/Atualizado Com Sucesso';

      // Retornar a resposta escolhida
      res.statusCode = 200; // Informa ao navegador que está tudo ok, o 404 é erro.
      res.setHeader('Content-Type', 'text/plain');  // Header de codificação
      res.end(resposta);
    });
  }
  // Selecionar / Pesquisar um usuario
  else if (urlparse.pathname == '/selecionar-usuario') {
    fs.readFile('users/'+ params.id +'.txt', function(err, data) {
      resposta = data;

      // Retornar a resposta escolhida
      res.statusCode = 200; // Informa ao navegador que está tudo ok, o 404 é erro.
      res.setHeader('Content-Type', 'application/json');  // Header de codificação
      res.end(resposta);
    });
  }
  // Remover um usuario
  else if (urlparse.pathname == '/remover-usuario') {
    fs.unlink('users/'+ params.id +'.txt', function (err) {
      console.log('Filed Deleted!!!');
      
      resposta = err ? 'Usuario nao encontrado.' : 'Usuario excluido com Sucesso!!!'; // IF Ternario...

      res.statusCode = 200; // Informa ao navegador que está tudo ok, o 404 é erro.
      res.setHeader('Content-Type', 'text/plain');  // Header de codificação
      res.end(resposta);
    });
  }
});

// Bloco de execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// localhost:3000/criar-atualizar-usuario?nome=Anna&idade=5&id=4
// localhost:3000/criar-atualizar-usuario?nome=Anna-Joana&idade=35&id=4
// localhost:3000/selecionar-usuario?id=4
// localhost:3000/remover-usuario?id=4