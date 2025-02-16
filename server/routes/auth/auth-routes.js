
const express = require('express')
const { registerUser, loginUser, logoutUser, authMiddleware } = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser); 

module.exports = router;