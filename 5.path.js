const path = require("node:path");

//unir rutas de forma incorrecta
// '/home/usuario/Documentos/curso-nodejs/5.path.js'
//saber el separador de rutas
console.log(path.sep);
//unir rutas con el metodo join
const filePath = path.join(
  "home/usuario",
  "Documentos",
  "curso-nodejs",
  "5.path.js"
);
console.log(filePath);

const base = path.basename("/home/usuario/Documentos/curso-nodejs/5.path.js");
console.log(base);

const fileName = path.basename("5.path.txt", ".txt");
console.log(fileName);

const extension = path.extname("5.path.js");
console.log(extension);
