const http = require("node:http");

const procesRequest = (req, res) => {};

const server = http.createServer(procesRequest);

server.listen(3000, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:3000`);
});
