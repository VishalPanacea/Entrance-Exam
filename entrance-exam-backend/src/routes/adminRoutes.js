const express = require("express");
const { getAllStudents } = require("../controllers/adminController");

const router = express.Router();
// console.log("dsfghj")
router.get("/", getAllStudents); // GET request to fetch all students

module.exports = router;
