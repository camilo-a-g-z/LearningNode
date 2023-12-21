const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hola mundo" });
});

app.post("/pokemon", (req, res) => {
  let body = "";

  //escuchar el evento data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const data = JSON.parse(body);
    //llamara a una base de datos para guardar la info
    data.timestamp = Date.now();
    res.status(201).json(data);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
