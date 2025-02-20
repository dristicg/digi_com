
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../../models/User");
// require('dotenv').config(); // Add this at the top of your file

// //register

// const registerUser = async (req, res) => {
//   const { userName, email, password } = req.body;

//   try {
//     const checkUser = await User.findOne({ email });
//     if (checkUser)
//       return res.json({
//         success: false,
//         message: "User Already exists with the same email! Please try again",
//       });

//     const hashPassword = await bcrypt.hash(password, 12);
//     const newUser = new User({
//       userName,
//       email,
//       password: hashPassword,
//     });

//     await newUser.save();
//     res.status(200).json({
//       success: true,
//       message: "Registration successful",
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured",
//     });
//   }
// };
 

// //login

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const checkUser = await User.findOne({ email });
//     if (!checkUser)
//       return res.json({
//         success: false,
//         message: "User doesn't exist! Please register first",
//       });

//     const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
//     if (!checkPasswordMatch)
//       return res.json({
//         success: false,
//         message: "Incorrect password! Please try again",
//       });

//     const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.cookie("token", token, { httpOnly: true, secure: false }).json({
//       success: true,
//       message: "Logged in successfully",
//       token,   // ✅ Send token in response
//       user: {
//         email: checkUser.email,
//         role: checkUser.role,
//         id: checkUser._id,
//         userName: checkUser.userName,
//       },
//     });

//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred",
//     });
//   }
// };



// // const loginUser = async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ success: false, message: "User not found" });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ success: false, message: "Invalid credentials" });
// //     }

// //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

// //     // Set token in HTTP-only cookie
// //     res.cookie("token", token, { httpOnly: true, secure: false }); // Secure should be true in production

// //     res.status(200).json({
// //       success: true,
// //       message: "Login successful",
// //       user: { id: user._id, userName: user.userName, email: user.email },
// //     });
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // };

// module.exports = { registerUser, loginUser };


// //logout

// const logoutUser = (req, res) => {
//   res.clearCookie("token").json({
//     success: true,
//     message: "Logged out successfully!",
//   });
// };

// // auth middleware
// const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token)
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorised user!",
//     });

//   try {
//     const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: "Unauthorised user!",
//     });
//   }
// };

// module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
// //  


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
require("dotenv").config();

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
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   console.log("Login request body:", req.body); // Debugging

//   try {
//     const checkUser = await User.findOne({ email });
//     if (!checkUser)
//       return res.status(400).json({ success: false, message: "User not found" });

//     const isMatch = await bcrypt.compare(password, checkUser.password);
//     if (!isMatch)
//       return res.status(400).json({ success: false, message: "Incorrect password" });

//     // Generate JWT Token
//     const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Set token in HTTP-only cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "Strict",
//     });

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token, // ✅ Send token in response
//       user: {
//         id: checkUser._id,
//         userName: checkUser.userName,
//         email: checkUser.email,
//         role: checkUser.role,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

const loginUser = async (req, res) => {
  console.log("Login request received:", req.body); // ✅ Debug request body

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

    // Debug JWT Secret
    console.log("JWT Secret:", process.env.JWT_SECRET);

    const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("Generated Token:", token); // ✅ Debug generated token

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      token,
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
  res.clearCookie("token").json({ success: true, message: "Logged out" });
};

module.exports = { registerUser, loginUser, logoutUser };
