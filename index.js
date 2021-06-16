const express = require("express");
const mongoose = require("mongoose");

const app = express();

// connection to mongodb
mongoose.connect("mongodb://localhost/todo_express", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// server configurations...
app.listen(3000, () => console.log("Server started listening on port: 3000"));
