const fs = require("node:fs/promises");

//const { promisify } = require("node:util");
//const readFilePromise = promisify(fs.readFile); //solo usar cuando no tenga un metodo nativo de promesas

console.log("Leyendo el primer archivo...");
fs.readFile("./archivo.txt", "utf-8")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

console.log("Hacer cosas mientras lee el archivo");

console.log("Leyendo el segundo archivo...");
const textSecond = fs.readFile("./archivo2.txt", "utf-8").then((data) => {
  console.log(data);
});
