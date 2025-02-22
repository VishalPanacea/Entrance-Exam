const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Signup Student
exports.signupStudent = async (req, res) => {
    console.log("vishal")
  const { name, email, mobile, dob, qualification, password } = req.body;

  try {
    let student = await Student.findOne({ email });
    if (student) return res.status(400).json({ message: "Email already registered." });

    student = new Student({ name, email, mobile, dob, qualification, password });
    await student.save();

    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};




// Login Student
exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: "Invalid Email or Password" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Email or Password" });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

// Logout Student (Clear Token)
exports.logoutStudent = async (req, res) => {
  res.json({ message: "Logout successful!" });
};

// Change Password
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const student = await Student.findById(req.student.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const isMatch = await bcrypt.compare(oldPassword, student.password);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(newPassword, salt);
    await student.save();

    res.json({ message: "Password changed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};
