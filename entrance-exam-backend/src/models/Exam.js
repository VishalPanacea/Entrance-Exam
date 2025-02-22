const mongoose = require('mongoose');

const entranceExamSchema = new mongoose.Schema({
  examName: { type: String, required: true },
  examDateRange: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  qualificationEligibility: [{ type: String }], // e.g., ["BTech", "BCA"]
  instructions: {
    duration: { type: Number, required: true }, // in minutes
    questionsCount: { type: Number, required: true },
    maxMarks: { type: Number, required: true },
    negativeMarks: { type: Boolean, required: true },
  },
  activeStatus: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});

module.exports = mongoose.model('EntranceExam', entranceExamSchema);