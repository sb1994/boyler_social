const express = require("express");
const app = express();
const router = express.Router();
const { body } = require("express-validator");
const Post = require("../../models/Post");

router.get("/", async (req, res, next) => {
  const posts = await Post.find();

  if (posts == null) {
    return res.sendStatus(404);
  } else {
    return res.send(posts);
  }
});
router.get("/:id", async (req, res, next) => {
    console.log(req.params);
    
    const posts = await Post.find();
  
    if (posts == null) {
      return res.sendStatus(404);
    } else {
      return res.send(posts);
    }
  });
module.exports = router;
