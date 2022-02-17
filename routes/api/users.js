const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { requireLogin } = require("../../utils/authMiddleware");

router.get("/:username",requireLogin, async (req, res, next) => {
  const username = req.params.username;

  const user = await User.findOne({ username: username });

  if (user == null) {
    return res.sendStatus(404);
  } else {
    return res.send(user);
  }
});

module.exports = router;
