const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const taskModel = require("./models/task");

app.use("/static", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Conexion a base de datos
mongoose.connect(
  "mongodb+srv://enuila:enuila1325@atlascluster.m2rreiy.mongodb.net/"
);

// CRUD

// Create
app.post("/", async (req, res) => {
  const task = new taskModel({
    content: req.body.content,
  });
  try {
    await task.save();
    res.redirect("/");
  } catch (err) {
    res.redirect("/");
  }
});
// Read
app.get("/", function (req, res) {
  taskModel.find().then((data) => {
    res.render("mainPage.ejs", { tareas: data });
  });
});

// delete individually each task
app.route("/remove/:id").get((req, res) => {
  const id = req.params.id;
  taskModel.findByIdAndDelete(id).then(() => {
    res.redirect("/");
  });
});

// delete all
app.route("/removeAll").get((req, res) => {
  taskModel.deleteMany({}).then(() => {
    res.redirect("/");
  });
});

// update (marcar como realizada)
app.route("/edit/:id").get((req, res) => {
  const id = req.params.id;
  taskModel.findByIdAndUpdate(id, { state: "Done" }).then(() => {
    res.redirect("/");
  });
});

//delete only marked ones as "Done"
app.route("/removeMarked").get((req, res) => {
  taskModel.deleteMany({ state: "Done" }).then(() => {
    res.redirect("/");
  });
});

// listening on port 3000
app.listen(3000, function () {
  console.log("Servidor corriendo en puerto 3000");
});
