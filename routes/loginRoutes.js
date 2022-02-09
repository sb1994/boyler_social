const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const { body } = require("express-validator");
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

router.post("/", (req, res) => {
  body("email", "").trim().escape();
  body("password", "").escape();

  const { email, password } = req.body;

  if (email !== "" && password !== "") {
    // // //find user by email
    User.findOne({
      email,
    }).then((user) => {
      if (!user) {
        return res.status(404).json({ email: "User Not Found" });
      }
      console.log(user);
      // //check the password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          // user matched create the payload taht will
          // be sent in the token
          const payload = {
            _id: user.id,
            name: user.name,
            profile_pic: user.profile_pic,
            email: user.email,
          };
          jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: 3600 * 1000 * 1000 * 20 },
            (err, token) => {
              res.json({
                success: true,
                token: `${token}`,
                user,
              });
            }
          );
        } else {
          return res.status(200).json({ msg: "password failed" });
        }
      });
    });
  } else {
    console.log("please enter an email and password");
  }
});

module.exports = router;
