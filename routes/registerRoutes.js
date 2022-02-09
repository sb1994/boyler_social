const express = require("express");
const app = express();
const router = express.Router();
//used to validate the body of the request
const bcrypt = require("bcryptjs");
const { body } = require("express-validator");
const User = require("../models/User");
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

router.post("/", async (req, res) => {
  const errors = {};
  body("firstName", "").trim().escape();
  body("lastName", "").trim().escape();
  body("username", "").trim().escape();
  body("email", "").trim().escape();
  body("password", "").escape();

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const fullName = `${req.body.firstName} ${req.body.lastName}`;

  console.log(req.body);

  const user = await User.findOne({
    $or: [{ username: username }, { email: email }],
  }).catch((err) => {
    console.log(err);

    // send an error
  });

  if (user == null) {
    // no user exists so a new user can be created
    console.log(user);
    const data = {
      firstName,
      lastName,
      username,
      email,
      password,
      fullName,
    };
    data.password = await bcrypt.hash(password, 10);
    User.create(data).then((user) => {
      console.log(user);
      return res.status(200).send(user);
    });
  } else {
    // check exactly what already exists
    if (email === user.email) {
      // email in use, send error message
      res.status(200).send("Email already in use.");
      console.log("email in use");
    } else {
      // username in use, send error message
      res.status(200).send("Username already in use.");
      console.log("username in use");
    }
  }
});

module.exports = router;
