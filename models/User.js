var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username not provided "],
    unique: [true, "username already exists in database!"],
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
