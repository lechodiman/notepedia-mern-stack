const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});
UserSchema.methods.follow = function(userId) {
  if (this.following.indexOf(userId) === -1) {
    this.following.push(userId);
  }
  return this.save();
};
UserSchema.methods.addFollower = function(follower) {
  this.followers.push(follower);
};
module.exports = User = mongoose.model("user", UserSchema);
