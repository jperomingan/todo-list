const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const mongoSessionStore = require("connect-mongo");
const MongoStore = mongoSessionStore(session);
require("./config/passport");

var app = express();
const PORT = process.env.PORT || 3000;
dotenv.config({ path: "./config/config.env" });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: mongoose.connection }),
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use(require("./routes/todo"));

app.listen(PORT, console.log(`listening at ${PORT}`));
