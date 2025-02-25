import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  Typography,
  Pagination,
  useTheme,
} from "@mui/material";
import { Delete, UploadFile } from "@mui/icons-material";
import * as XLSX from "xlsx";
import axios from "axios";

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const theme = useTheme();

  // Fetch Questions from Backend
  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/questions/questions");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handle File Upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

      const formattedQuestions = sheet.slice(1).map((row) => ({
        questionDescription: row[0],
        entranceExam: row[1] ? row[1].split(", ") : [],
        questionCategory: row[2] ? row[2].split(", ") : [],
        questionSubCategory: row[3] ? row[3].split(", ") : [],
        responseOptions: row.slice(4, 8),
        correctAnswerIndex: parseInt(row[8], 10),
        questionMarks: parseInt(row[9], 10),
        complexity: row[10],
        negativeScore: parseFloat(row[11]),
        status: "Active",
      }));

      try {
        await axios.post("http://localhost:5005/api/questions/import", { questions: formattedQuestions });
        fetchQuestions();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Question Bank
      </Typography>

      {/* File Upload Button */}
      <Button
        variant="contained"
        component="label"
        startIcon={<UploadFile />}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: "#fff",
          mb: 2,
          "&:hover": { backgroundColor: theme.palette.primary.dark },
        }}
      >
        Import Questions
        <input type="file" hidden accept=".xlsx, .xls" onChange={handleFileUpload} />
      </Button>

      {/* Question Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3, height: "78vh" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.light }}>
              {["Qstn ID", "Description", "Entrance Exam", "Category", "Sub-Category", "Response Options", "Correct Answer", "Marks", "Complexity", "Negative Score", "Actions"].map((head) => (
                <TableCell key={head} sx={{ fontWeight: "bold", color: theme.palette.primary.contrastText }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} align="center" sx={{ py: 4, fontSize: "1.1rem", color: "#888" }}>
                  No questions available. Upload an Excel file to add questions.
                </TableCell>
              </TableRow>
            ) : (
              questions.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((question, index) => (
                <TableRow key={index} sx={{ "&:nth-of-type(even)": { backgroundColor: "#f9f9f9" } }}>
                  <TableCell>{question._id}</TableCell>
                  <TableCell>{question.questionDescription}</TableCell>
                  <TableCell>{question.entranceExam.join(", ")}</TableCell>
                  <TableCell>{question.questionCategory.join(", ")}</TableCell>
                  <TableCell>{question.questionSubCategory.join(", ")}</TableCell>
                  <TableCell>{question.responseOptions.join(", ")}</TableCell>
                  <TableCell>{question.responseOptions[question.correctAnswerIndex]}</TableCell>
                  <TableCell>{question.questionMarks}</TableCell>
                  <TableCell>{question.complexity}</TableCell>
                  <TableCell>{question.negativeScore}</TableCell>
                  <TableCell>
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {questions.length > 0 && (
        <Pagination
          count={Math.ceil(questions.length / rowsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{ mt: 2, display: "flex", justifyContent: "center" }}
        />
      )}
    </Box>
  );
};

export default QuestionBank;
