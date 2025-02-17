
const express = require('express')
const { registerUser, loginUser, logoutUser, authMiddleware } = require("../../controllers/auth/auth-controller");
const { protect } = require("../../middleware/authMiddleware"); 

const router = express.Router();

router.post("/register", registerUser); 
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Your route handler for /check
router.get('/check', async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header
    if (!token) return res.status(401).json({ message: 'No token provided' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      const user = await User.findById(decoded.id); // Fetch user from DB
      if (!user) return res.status(401).json({ message: 'User not found' });
  
      res.json({ success: true, user });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  });

module.exports = router;