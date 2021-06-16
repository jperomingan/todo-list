// require the just installed express app
var express = require("express");
var bodyParser = require("body-parser");

//then we call express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//takes us to the root(/) URL
app.get("/", function (req, res) {
  // when we visit the root URL express will respond with 'Hello World'
  //   res.send("Hello World!");
  res.render("index");
});

app.post("/addtask", function (req, res) {
  res.render("index");
});

//the task array with initial placeholders for added task
var task = ["buy socks", "practise with nodejs"];
//post route for adding new task
app.post("/addtask", function (req, res) {
  var newTask = req.body.newtask;
  //add the new task from the post route into the array
  task.push(newTask);
  //after adding to the array go back to the root route
  res.redirect("/");
});

app.post("/removetask", function (req, res) {
  var completeTask = req.body.check;
  //check for the "typeof" the different completed task, then add into the complete task
  if (typeof completeTask == "string") {
    complete.push(completeTask);
    //Check if the completed task already exists in the task when checked, then remove it
    task.splice(task.indexOf(completeTask), 1);
  } else if (typeof completeTask == "object") {
    for (var i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});

//render the ejs and display added task, task(index.ejs) = task(array)
app.get("/", function (req, res) {
  res.render("index", { task: task, complete: complete });
});

//the server is listening on port 3000 for connections
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
