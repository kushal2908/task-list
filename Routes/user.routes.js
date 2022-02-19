const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser } = require("../Controllers/user.controller");
const { protect } = require("../Middleware/authMiddleware");

// User Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, getUser);

module.exports = router;
