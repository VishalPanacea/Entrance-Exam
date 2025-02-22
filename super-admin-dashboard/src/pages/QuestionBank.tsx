import React, { useState } from "react";
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

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const theme = useTheme();

  // Handle File Upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      setQuestions(sheet);
    };
    reader.readAsArrayBuffer(file);
  };

  // Handle Delete Question
  const handleDelete = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // Handle Toggle Active/Inactive
  const toggleStatus = (index) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === index ? { ...q, Status: q.Status === "Active" ? "Inactive" : "Active" } : q
      )
    );
  };

  return (
    <Box sx={{ p: 0, mt: 0 }}>

      {/* <Typography variant="h5" fontWeight="bold" gutterBottom>
        Question Bank
      </Typography> */}

      {/* Pagination on Top */}
      {questions.length > 0 && (
        <Pagination
          count={Math.ceil(questions.length / rowsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{ mb: 2, display: "flex", justifyContent: "center" }}
        />
      )}

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

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3, height:"78vh" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.light }}>
              {[
                "Qstn ID",
                "Description",
                "Entrance Exam",
                "Category",
                "Sub-Category",
                "Response Options",
                "Correct Answer",
                "Marks",
                "Complexity",
                "Negative Score",
                "Status",
                "Actions",
              ].map((head) => (
                <TableCell key={head} sx={{ fontWeight: "bold", color: theme.palette.primary.contrastText }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center" sx={{ py: 4, fontSize: "1.1rem", color: "#888" }}>
                  No questions available. Upload an Excel file to add questions.
                </TableCell>
              </TableRow>
            ) : (
              questions.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((question, index) => (
                <TableRow key={index} sx={{ "&:nth-of-type(even)": { backgroundColor: "#f9f9f9" } }}>
                  <TableCell>{question["Qstn ID"]}</TableCell>
                  <TableCell>{question["Qstn Description"]}</TableCell>
                  <TableCell>{question["Entrance Exam"]}</TableCell>
                  <TableCell>{question["Qstn Category"]}</TableCell>
                  <TableCell>{question["Qstn Sub-Category"]}</TableCell>
                  <TableCell>{question["Response Options"]}</TableCell>
                  <TableCell>{question["Correct answer index"]}</TableCell>
                  <TableCell>{question["Qstn Marks"]}</TableCell>
                  <TableCell>{question["Complexity"]}</TableCell>
                  <TableCell>{question["Negative Score"]}</TableCell>
                  <TableCell
                    sx={{
                      color: question.Status === "Active" ? theme.palette.success.main : theme.palette.error.main,
                      fontWeight: "bold",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => toggleStatus(index)}
                  >
                    {question.Status}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(index)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default QuestionBank;
