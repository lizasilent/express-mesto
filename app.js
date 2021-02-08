const express = require('express');

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

app.use(express.static(__dirname, 'public'));

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(BASE_PATH);
})
