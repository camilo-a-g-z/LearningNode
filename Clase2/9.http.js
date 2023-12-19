const http = require("node:http");

const desiredPort = process.env.PORT ?? 3000;

const procesRequest = (req, res) => {
  if (req.url === "/") {
    res.statusCode = 200; // OK
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end("<h1>Bienevenido a mi página de inicio</h1>");
  } else if (req.url === "/contacto") {
    res.statusCode = 200; // OK
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end("<h1>Bienevenido a mi página de contacto</h1>");
  } else {
    res.statusCode = 404; // Not Found
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end("<h1>Página no encontrada</h1>");
  }
};

const server = http.createServer(procesRequest);

server.listen(desiredPort, () => {
  console.log(`Servidor escuchando en el puerto ${desiredPort}`);
});
