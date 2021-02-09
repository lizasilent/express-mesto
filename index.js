const express = require('express');
const app = express();
const path = require("path");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");


const PORT = 3000;

app.listen(PORT, () => {
  console.log(PORT);

});



app.use("/users", usersRouter);
app.use("/cards", cardsRouter);


// app.use((req, res) => {
//   res(req);
// });


app.use(express.static(path.join(__dirname, 'public')));