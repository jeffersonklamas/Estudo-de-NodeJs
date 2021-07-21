// Incluindo a biblioteca http
const http = require('http');
const url = require('url');
const queryString = require('query-string');

// Definição do endereço e o ip a porta a ser utilizada.
const hostname = '127.0.0.1';  // localhost
const port = 3000;

// Bloco da implementação da regra de negócio
const server = http.createServer((req, res) => {

  // Pegar a pergunta na url
  const params = queryString.parse(url.parse(req.url, true).search);
  
  // Verificar a pergunta e selecionar uma resposta
  let resposta;
  if (params.pergunta == 'Melhor-filme') {
    resposta = 'Star Trek';
  }
  else if(params.pergunta == 'melhor-tecnologia-backend'){
    resposta = 'Node.js';
  }
  else {
    resposta = 'Nao sei a resposta, desculpe.... :(';
  }

  // Retornar a resposta escolhida
  res.statusCode = 200; // Informa ao navegador que está tudo ok, o 404 é erro.
  res.setHeader('Content-Type', 'text/plain');  // Header de codificação
  res.end(resposta);
});

// Bloco de execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});