const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongodb connected");
  } catch {
    console.log("mongodb not connected");
  }
};

module.exports = connectDb;
