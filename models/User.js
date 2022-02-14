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
  fullName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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
  admin: Boolean,
  description: { type: String, trim: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
  shares: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
  followers: [
    {
      user: { type: Schema.Types.ObjectId, ref: "users" },
    },
  ],
  following: [
    {
      user: { type: Schema.Types.ObjectId, ref: "users" },
    },
  ],
  joined: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
