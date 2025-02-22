const express = require("express");
const { importQuestions, getAllQuestions } = require("../controllers/questionController");

const router = express.Router();

// Route to receive JSON questions
router.post("/import", importQuestions);
router.get("/questions", getAllQuestions);

module.exports = router;
