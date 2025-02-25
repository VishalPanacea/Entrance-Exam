
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Student");

console.log("dsfghj...............")
const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({}).select("-password"); // Exclude password for security
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};



// Generate JWT Token
const generateToken =async  (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
 
// Register New Admin
console.log("asdfghjk")
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const adminExists = await Admin.findOne({ email });
    if (adminExists) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ name, email, password: hashedPassword });

    res.status(201).json({
      _id: newAdmin._id,
      name: newAdmin.name,
      email: newAdmin.email,
      token: generateToken(newAdmin._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Change Password
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const adminId = req.user.id; // From authMiddleware

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};





// Get All Admins
const getAllAdmins = async (req, res) => {
    console.log("vishu")
    try {
      const admins = await Admin.find().select("-password"); // Exclude password for security
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).json({ message: "Error fetching admins", error });
    }
  };





module.exports = { registerAdmin, loginAdmin, changePassword, getAllStudents, getAllAdmins };
