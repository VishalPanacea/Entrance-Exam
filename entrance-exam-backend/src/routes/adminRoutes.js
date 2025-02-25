const express = require("express");
const { registerAdmin, loginAdmin, changePassword, getAllStudents, getAllAdmins } = require("../controllers/adminController");

const router = express.Router();
console.log("dsfghj......................???")

router.get("/students", getAllStudents); // GET request to fetch all students
router.post("/register", registerAdmin);  // Create Admin
router.get("/admins", getAllAdmins);  // Create Admin
router.post("/login", loginAdmin);        // Admin Login
router.put("/change-password", changePassword);  // Change Password (Protected)



module.exports = router;
