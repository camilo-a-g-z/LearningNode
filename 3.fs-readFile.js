const fs = require("node:fs");

console.log("Leyendo el primer archivo...");
fs.readFile("./archivo.txt", "utf-8", (err, data) => {
  console.log(data);
});

console.log("Hacer cosas mientras lee el archivo");

console.log("Leyendo el segundo archivo...");
const textSecond = fs.readFile("./archivo2.txt", "utf-8", (err, data) => {
  console.log(data);
});
