const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/User");
const { body } = require("express-validator");
router.get("/test", (req, res) =>
  res.json({ msg: "Users Works but the rest dont" })
);

module.exports = (io) => {
  // router.get("/search/:username", async (req, res) => {
  //   const username = req.params.username;

  //   const user = await User.findOne({ username: username }).select("-password");

  //   if (user == null) {
  //     return res.sendStatus(404);
  //   } else {
  //     return res.send(user);
  //   }
  // });
  router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const errors = [];

    // Check if firstName is filled out
    if (!firstName) {
      errors.push("First name is required");
    }

    // Check if lastName is filled out
    if (!lastName) {
      errors.push("Last name is required");
    }

    // Check if email is filled out
    if (!email) {
      errors.push("Email is required");
    }

    // Check if password is filled out
    if (!password) {
      errors.push("Password is required");
    }

    // If any errors are present, send the errors array in the response
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const user = await User.findOne({ email }).select("-password");

    if (user == null) {
      // Hash the password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;

        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;

          // Create a new user
          const newUser = new User({
            firstName,
            lastName,
            email,
            password: hash,
            profile_pic: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
          });
          // res.json(newUser);

          console.log(newUser);
          // // Save the user to the database
          newUser
            .save()
            .then(() => res.send("User registered successfully"))
            .catch((err) => {
              console.log(err);
              return res.status(500).send(err);
            });
        });
      });
    } else {
      return res.send("user already exists");
    }
  });
  router.get("/", async (req, res) => {
    const users = await User.find().select("-password");

    if (users == null) {
      return res.sendStatus(404);
    } else {
      return res.send(users);
    }
  });
  router.post("/login", async (req, res) => {
    body("email", "").trim().escape();
    body("password", "").escape();

    const { email, password } = req.body;

    console.log(req.body);

    if (email !== "" && password !== "") {
      // // //find user by email
      const user = await User.findOne({
        email,
      });
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
            { expiresIn: 3600 * 1000 * 1000 * 1000 },
            (err, token) => {
              res.json({
                success: true,
                token: `${token}`,
                user,
              });
            }
          );
          // io.
        } else {
          return res.status(200).json({ msg: "password failed" });
        }
      });
    } else {
      console.log("please enter an email and password");
    }
  });
  // Add Buddie
  router.post(
    "/addBuddie/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const user = await User.findById(req.user._id);
        const buddyToAdd = await User.findById(req.params.id);

        if (!buddyToAdd) {
          return res.status(400).json({ error: "User not found" });
        }

        if (user.buddies.includes(buddyToAdd._id)) {
          return res
            .status(400)
            .json({ error: "User already added as a buddy" });
        }

        user.buddies.push(buddyToAdd._id);
        await user.save();

        return res
          .status(200)
          .json({ success: true, message: "Buddy added successfully" });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
      }
    }
  );
  router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      // console.log(req);
      const user = await User.findById(req.user._id);
      res.json(user);
    }
  );

  return router;
};
