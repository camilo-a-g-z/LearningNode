// process
//Argumentos de entrada
console.log(process.argv);
//controlar el proceso y su salida
//process.exit(0);->termina el proceso con exito
//process.exit(1);->termina el proceso con error

//controlar eventos del proceso
//process.on("exit", () => {
//  console.log("El proceso termino");
//});

//current working directory ->desde donde estamos ejecutando el proceso
console.log(process.cwd());

//variables de entorno
console.log(process.env.PEPITO);
