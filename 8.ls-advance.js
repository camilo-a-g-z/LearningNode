const fs = require("node:fs/promises");
const path = require("node:path");
const pc = require("picocolors"); //dependencia de produccion se nececita para que funcione el color en la consola
//las dependencia de desarrollo son las que se usan para el desarrollo del proyecto

const folder = process.argv[2] ?? "."; //el ?? es para que si no se le pasa un argumento, tome el valor de "."

async function ls(directory) {
  let files;
  try {
    files = await fs.readdir(directory);
  } catch {
    console.log(pc.red("❌Error al leer el directorio"));
    process.exit(1);
  }
  const filesPromises = files.map(async (file) => {
    const filePath = path.join(directory, file);
    let stats;
    try {
      stats = await fs.stat(filePath); //stat es una funcion que devuelve un objeto con informacion del archivo
    } catch {
      console.log("Error al leer el archivo");
      process.exit(1);
    }
    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? "d" : "-";
    const filesSize = stats.size;
    const fileModified = stats.mtime.toLocaleString();
    return `${fileType} ${pc.blue(file.padEnd(20))} ${pc
      .green(filesSize)
      .toString()
      .padStart(10)} ${pc.yellow(fileModified)} `;
  });
  const fileInfo = await Promise.all(filesPromises);

  fileInfo.forEach((file) => {
    console.log(file);
  });
}

ls(folder);
