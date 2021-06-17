const router = require("express").Router();
const Todo_model = require("../models/todo");

//
router.get("/add/todo", (req, res) => {
  const { todo } = req.body;
  const newTodo = new Todo_model({ todo, email_: req.user.email, done: "0" });
  if (todo == "") {
    res.redirect("/");
  }
  newTodo
    .save()
    .then(() => {
      console.log("done");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});
