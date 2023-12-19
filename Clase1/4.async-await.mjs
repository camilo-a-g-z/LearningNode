//const { promisify } = require("node:util");
//const readFilePromise = promisify(fs.readFile); //solo usar cuando no tenga un metodo nativo de promesas
import { readFile } from "node:fs/promises";
console.log("Leyendo el primer archivo...");
const text = await readFile("./archivo.txt", "utf-8");
console.log(text);
console.log("Hacer cosas mientras lee el archivo");

console.log("Leyendo el segundo archivo...");
const textSecond = await readFile("./archivo2.txt", "utf-8");
console.log(textSecond);
