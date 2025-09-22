const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  email: { type: String },
  password: { type: String },
});
module.exports = mongoose.model("User", UserSchema);
