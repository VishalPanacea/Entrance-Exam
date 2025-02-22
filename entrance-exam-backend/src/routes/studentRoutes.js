const express = require("express");
const { signupStudent, loginStudent, logoutStudent, changePassword } = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signupStudent);
router.post("/login", loginStudent);
router.post("/logout", logoutStudent);
router.post("/change-password", authMiddleware, changePassword);

module.exports = router;
