const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { body } = require("express-validator");
const { requireLogin } = require("../../utils/authMiddleware");
const passport = require("passport");
router.get("/test", (req, res) =>
  res.json({ msg: "Users Works but the rest dont" })
);

router.get("/search/:username", async (req, res) => {
  const username = req.params.username;

  const user = await User.findOne({ username: username });

  if (user == null) {
    return res.sendStatus(404);
  } else {
    return res.send(user);
  }
});
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // console.log(req);
    const user = await User.findById(req.user._id);
    res.json(user);
  }
);

module.exports = router;
