const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("mongodb").MongoClient;
require("./config/passport");
mongoose.Promise = global.Promise;

var app = express();
const PORT = process.env.PORT || 5000;

dotenv.config({ path: "./config/config.env" });

mongoose.connect(process.env.MONGO_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Local database
const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected: ", process.env.MONGO_LOCAL);
});

db.on("error", (_) => {
  console.log("connection error: ", err);
});

// Passport config
require("./config/passport")(passport);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// app.use(
//   session({
//     secret: "my-secret",
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({ mongoUrl: "mongodb://127.0.0.1:27017/Todo_List" }),
//   })
// );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use(require("./routes/todo"));

app.listen(PORT, console.log(`listening at ${PORT}`));
