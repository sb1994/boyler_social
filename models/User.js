const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
    default:
      "http://www.culpepperandassociates.com/wp-content/uploads/2014/08/dummy-avatar.png",
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  description: { type: String, trim: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
  shares: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
  // buddies: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  joined: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
