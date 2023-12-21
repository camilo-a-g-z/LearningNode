const http = require("node:http");
const fs = require("node:fs");

const desiredPort = process.env.PORT ?? 3000;

const procesRequest = (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  if (req.url === "/") {
    res.end("<h1>Bienevenido a mi página de inicio</h1>");
  } else if (req.url === "/imagen.png") {
    fs.readFile("./Clase2/Imagen.png", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("<h1>Error interno</h1>");
      } else {
        res.setHeader("Content-Type", "image/png");
        res.end(data);
      }
    });
  } else if (req.url === "/contacto") {
    res.end("<h1>Bienevenido a mi página de contacto</h1>");
  } else {
    res.statusCode = 404; // Not Found
    res.end("<h1>Página no encontrada</h1>");
  }
};

const server = http.createServer(procesRequest);

server.listen(desiredPort, () => {
  console.log(`Servidor escuchando en el puerto ${desiredPort}`);
});
