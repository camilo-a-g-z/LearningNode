const express = require("express");
const ditto = require("./ditto.json");
const app = express();
app.disable("x-powered-by");

const PORT = process.env.PORT || 3000;
app.use(express.json());
/*
//FORMA LARGA

//tambien puede ser por direcciones
// app.use("/pokemon/*", (req, res, next) => { -> /pokemon/1
app.use((req, res, next) => {
  if (req.method !== "POST") return next();
  if (req.headers["content-type"] !== "application/json") return next();
  //solo se ejecuta si es un post y si el content-type es json
  let body = "";
  //escuchar el evento data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const data = JSON.parse(body);
    //llamara a una base de datos para guardar la info
    data.timestamp = Date.now();
    //mutar la request y meter la info en el req.body
    req.body = data;
    next();
  });
});
*/
app.get("/", (req, res) => {
  res.json({ message: "Hola mundo" });
});

app.get("/pokemon/ditto", (req, res) => {
  res.json(ditto);
});

app.post("/pokemon", (req, res) => {
  res.status(201).json(req.body);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});

app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});
