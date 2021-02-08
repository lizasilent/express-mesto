const express = require('express');
const app = express();
const path = require("path")

const PORT = 3000;

app.listen(PORT, () => {
  console.log(PORT);
  console.log("ghbdt")

})

app.use(express.static(path.join(__dirname, 'public')));