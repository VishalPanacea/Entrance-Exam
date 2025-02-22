const User = require("../models/Student");

exports.getAllStudents = async (req, res) => {
    // console.log("dsfghj")
  try {
    const students = await User.find({}).select("-password"); // Exclude password for security
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};
