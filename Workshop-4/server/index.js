const express = require('express');
const app = express();
const mongoose = require("mongoose");

// Correct MongoDB connection string
const MONGO_URI = "mongodb+srv://kca11tita:7OMjztVsmZUUKqov@cluster0.lr72j.mongodb.net/todo-api?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB successfully!"))
  .catch(err => console.log("MongoDB connection error:", err));

const {
  taskPut,
  taskPost,
  taskGet,
  taskDelete
} = require("./controllers/taskController.js");

// Parser for request body
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// CORS configuration
const cors = require("cors");
app.use(cors({
  origin: "*",
  methods: "*"
}));

// API routes
app.get("/tasks", taskGet);
app.post("/tasks", taskPost);
app.put("/tasks", taskPut);
app.delete("/tasks", taskDelete);

// Start server
app.listen(3000, () => console.log(`Server running on port 3000!`));
