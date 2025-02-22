// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   mobile: { type: String, required: true },
//   dob: { type: Date, required: true },
//   qualification: { type: String, required: true },
//   registeredDate: { type: Date, default: Date.now },
//   examStatus: { type: String, default: "Not Attempted" },
//   systemAccessStatus: { type: String, default: "Active" },
//   counselingStatus: { type: String, default: "Pending" },
//   photo: { type: String },
//   exams: [{
//     examId: { type: mongoose.Schema.Types.ObjectId, ref: 'EntranceExam' },
//     enrollmentDate: { type: Date },
//     result: { type: String },
//     score: { type: Number }
//   }]
// });

// module.exports = mongoose.model('Student', studentSchema);










const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  dob: { type: Date, required: true },
  qualification: { type: String, required: true },
  password: { type: String, required: true }, // Added password field
  registeredDate: { type: Date, default: Date.now },
  examStatus: { type: String, default: "Not Attempted" },
  systemAccessStatus: { type: String, default: "Active" },
  counselingStatus: { type: String, default: "Pending" },
  photo: { type: String },
  exams: [
    {
      examId: { type: mongoose.Schema.Types.ObjectId, ref: "EntranceExam" },
      enrollmentDate: { type: Date },
      result: { type: String },
      score: { type: Number },
    },
  ],
});

// Hash password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Student", studentSchema);



