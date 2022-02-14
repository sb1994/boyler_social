const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/:username", async (req, res, next) => {
  const username = req.params.username;

  const user = await User.findOne({ username: username });

  if (user == null) {
    return res.sendStatus(404);
  } else {
    return res.send(user);
  }
});

module.exports = router;
