const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
// Conexion a base de datos
mongoose.connect(
  "mongodb+srv://enuila:enuila1325@atlascluster.m2rreiy.mongodb.net/"
);

// listening on port 3000
app.listen(3000, function () {
  console.log("Servidor corriendo en puerto 3000");
});

app.get("/", function (req, res) {
  res.send("Express funciona")
});
