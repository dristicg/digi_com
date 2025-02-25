const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  // let token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // if (!token) {
  //   return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
  // }

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
