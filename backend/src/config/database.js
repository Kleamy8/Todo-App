const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Kleamo:gGLhnG7Fp1BhqT8w@skolprojekt.fgaefhj.mongodb.net/Todoapp"
    );
    console.log("mongodb connected");
  } catch {
    console.log("mongodb not connected");
  }
};

module.exports = connectDb;
