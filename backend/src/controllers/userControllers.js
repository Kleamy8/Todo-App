const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "supersecretKey";
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "something went wrong ", error });
  }
};
const postUser = async (req, res) => {
  try {
    const { email, password, name, age } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "both email and password are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name, age });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "3h",
    });
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        age: newUser.age,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "something went wrongs", error });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "3h" });

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
const updateInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const uptadedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        age,
      },
      { new: true }
    ).select("-password");
    res.status(200).json(uptadedUser);
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error });
  }
};

module.exports = { getUser, postUser, loginUser, updateInfo };
