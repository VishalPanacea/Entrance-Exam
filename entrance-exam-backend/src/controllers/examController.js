const EntranceExam = require("../models/Exam");

// ✅ Create Entrance Exam
exports.createExam = async (req, res) => {
    try {
      const { examName, examDateRange, qualificationEligibility, instructions, activeStatus, adminId } = req.body;
      const image = req.file ? req.file.path : null; // Handle image if uploaded
  
      // No need to JSON.parse() since req.body already contains parsed JSON
      const newExam = new EntranceExam({
        examName,
        examDateRange, 
        qualificationEligibility,
        instructions,
        activeStatus,
        image,
        createdBy: adminId // Store the admin who created the exam
      });
  
      await newExam.save();
      res.status(201).json({ success: true, exam: newExam });
    } catch (error) {
      console.error("Error creating exam:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// ✅ Get all exams
exports.getExams = async (req, res) => {
  try {
    const exams = await EntranceExam.find().populate("createdBy", "name email");
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get exam by ID
exports.getExamById = async (req, res) => {
  try {
    const exam = await EntranceExam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    res.status(200).json(exam);
  } catch (error) {
    console.error("Error fetching exam:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Exam
exports.updateExam = async (req, res) => {
  try {
    const updatedExam = await EntranceExam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExam) return res.status(404).json({ message: "Exam not found" });

    res.status(200).json(updatedExam);
  } catch (error) {
    console.error("Error updating exam:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Exam
exports.deleteExam = async (req, res) => {
  try {
    const deletedExam = await EntranceExam.findByIdAndDelete(req.params.id);
    if (!deletedExam) return res.status(404).json({ message: "Exam not found" });

    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    console.error("Error deleting exam:", error);
    res.status(500).json({ message: error.message });
  }
};
