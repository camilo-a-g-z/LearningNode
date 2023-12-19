const fs = require("node:fs");

fs.readdir("./", (err, files) => {
  if (err) {
    console.log(err);
    return;
  } else {
    files.forEach((element) => {
      console.log(element);
    });
  }
});
