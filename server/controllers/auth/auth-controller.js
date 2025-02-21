// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../../models/User");
require('dotenv').config();

// Register User
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ userName, email, password: hashPassword });

    await newUser.save();
    res.status(201).json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  console.log("Login request received:", req.body);

  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(401).json({ success: false, message: "User doesn't exist! Please register first" });
    }

    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password! Please try again" });
    }

    // console.log("JWT Secret:", process.env.JWT_SECRET);
    // const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    // console.log("Generated Token:", token);

    res.json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log("Login error:", e);
    res.status(500).json({ success: false, message: "Some error occurred" });
  }
};

// Logout User
const logoutUser = (req, res) => {
  res.json({ success: true, message: "Logged out" });
};

module.exports = { registerUser, loginUser, logoutUser };