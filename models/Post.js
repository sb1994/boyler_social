const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema(
  {
    content: { type: String, trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    pinned: Boolean,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    sharedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    sharedPostData: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
  },
  { timestamps: true }
);

module.exports = Post = mongoose.model("Post", PostSchema);
