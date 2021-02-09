const express = require("express");
const passport = require("passport");
const pool = require("./pool");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Reached /login endpoint");
  console.log(req.body);

  res.status(201).json({
    success: true,
    message: "Successfully authenticated",
    user: req.user,
  });
});

router.post("/logout", (req, res) => {
  req.logout();

  res.status(201).json({
    success: true,
    message: "Successfully logged out",
  });
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // if field is missing
  if (!username || !email || !password) {
    res.send({ success: false, message: "Please fill in all fields." });
  }

  // hash password
  try {
    bcrypt.hash(password, 10, async (err, password) => {
      const newAccount = await pool.query(
        "INSERT INTO users (t_email, t_password, t_name_user) VALUES ($1,$2,$3) ON CONFLICT (t_email) DO NOTHING;",
        [email, password, username]
      );

      if (newAccount.rowCount) {
        res.send({ success: true, message: "Account successfully created." });
      } else {
        res.send({
          success: false,
          meewssage: "An account with that email already exists.",
        });
      }
    });
  } catch (err) {
    throw err;
  }
});

router.get("/sessions", (req, res) => {
  res.status(201).json(req.sessionStore.sessions);
});
module.exports = router;
