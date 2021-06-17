const router = require("express").Router();
const Todo_model = require("../models/todo");

// Get all the user todo's
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

// Method for deleting the todo.
router.get("/delete/todo/:_id", (req, res) => {
  const { _id } = req.params;
  Todo_model.deleteOne({ _id })
    .then(() => {
      console.log("deleted");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

// Method to mark todo as done.
router.get("/update/todo/:_id", (req, res) => {
  const { _id } = req.params;
  const info = Todo_model.find();
  console.log(info);
  Todo_model.updateOne({ _id }, { done: "1" })
    .then(() => {
      console.log("deleted");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

module.exports = router;
