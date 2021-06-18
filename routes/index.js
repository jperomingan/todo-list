const router = require("express").Router();
const Todo_model = require("../models/todo");
//importing middleware
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureGuest, (req, res) => {
  res.render("login");
});

router.get("/log", ensureAuth, async (req, res) => {
  res.render("index", { todo: user, userinfo: req.user });
});
module.exports = router;
