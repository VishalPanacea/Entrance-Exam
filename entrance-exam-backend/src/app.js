require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const questionRoutes = require("./routes/questionRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 5005;

connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.use("/api/students", studentRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/students", adminRoutes); // Add the student routes


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




