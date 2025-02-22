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
  Pagination,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import * as XLSX from "xlsx";

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

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
    <Box sx={{  justifyContent: "end", mb: 2  }}>
      <Button variant="contained" component="label">
        Import Questions
        <input type="file" hidden accept=".xlsx, .xls" onChange={handleFileUpload} />
      </Button>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              {["Qstn ID", "Description", "Entrance Exam", "Category", "Sub-Category", "Response Options", "Correct Answer", "Marks", "Complexity", "Negative Score", "Status", "Actions"].map((head) => (
                <TableCell key={head}><strong>{head}</strong></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((question, index) => (
              <TableRow key={index}>
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
                  sx={{ color: question.Status === "Active" ? "green" : "red", cursor: "pointer" }}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(questions.length / rowsPerPage)}
        page={page}
        onChange={(event, value) => setPage(value)}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default QuestionBank;