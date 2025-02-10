const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb+srv://kca11tita:7OMjztVsmZUUKqov@cluster0.lr72j.mongodb.net/todo-api?retryWrites=true&w=majority", {
  useNewUrlParser: true,       // Nueva configuración recomendada
  useUnifiedTopology: true     // Habilitar el nuevo motor de descubrimiento
})
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch(err => console.error("Error conectando a MongoDB Atlas:", err));

const {
  taskPatch,
  taskPost,
  taskGet,
} = require("./controllers/taskController.js");

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));


// listen to the task request
app.get("/api/tasks", taskGet);
app.post("/api/tasks", taskPost);
app.patch("/api/tasks", taskPatch);
app.put("/api/tasks", taskPatch);


app.listen(3000, () => console.log(`Example app listening on port 3000!`))
