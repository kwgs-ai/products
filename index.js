const express = require('express');

const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));

let dataString = "";

app.get('/', (req, res) => {
  res.render('top.ejs', { data: dataString });
});

app.post('/', (req, res) => {
  dataString = req.body.data;
  res.render('top.ejs', { data: dataString });
});

app.listen(process.env.PORT || PORT);