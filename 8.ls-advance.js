const fs = require("node:fs/promises");

const folder = process.argv[2] ?? "."; //el ?? es para que si no se le pasa un argumento, tome el valor de "."

async function ls(directory) {
  try {
    const files = await fs.readdir(directory);
  } catch {
    console.log("Error al leer el directorio");
    process.exit(1);
  }
}

fs.readdir(folder, (err, files) => {
  if (err) {
    console.log(err);
    return;
  } else {
    files.forEach((element) => {
      const filePath = path.join(folder, element);

      fs.stat(filePath);
      console.log(element);
    });
  }
});
