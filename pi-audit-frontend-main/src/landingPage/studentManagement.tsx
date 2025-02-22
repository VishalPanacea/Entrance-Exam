import React, { useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TextField,
  Button,
  Modal,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const dummyStudents = [
  {
    id: 1,
    name: "John Doe",
    dob: "2002-05-15",
    email: "john.doe@example.com",
    registeredDate: "2025-01-10",
    examStatus: "Passed",
    systemAccess: "Active",
    photo: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Jane Smith",
    dob: "2001-08-22",
    email: "jane.smith@example.com",
    registeredDate: "2025-02-01",
    examStatus: "Failed",
    systemAccess: "Inactive",
    photo: "https://via.placeholder.com/150",
  },
];

const StudentManagement = () => {
  const [students, setStudents] = useState(dummyStudents);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.email.includes(search) ||
      student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <TextField
        label="Search by Name or Email"
        variant="outlined"
        fullWidth
      
        sx={{ mb: 1  }}
        value={search}
        onChange={handleSearch}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>DOB</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Registered Date</strong></TableCell>
              <TableCell><strong>Exam Status</strong></TableCell>
              <TableCell><strong>System Access</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.dob}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.registeredDate}</TableCell>
                <TableCell>{student.examStatus}</TableCell>
                <TableCell sx={{ color: student.systemAccess === "Active" ? "green" : "red" }}>
                  {student.systemAccess}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => setSelectedStudent(student)}
                  >
                    View Profile
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Student Profile */}
      <Modal open={!!selectedStudent} onClose={() => setSelectedStudent(null)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            p: 3,
          }}
        >
          <Card sx={{ maxWidth: 400, p: 3, borderRadius: 3, boxShadow: 5 }}>
            {selectedStudent && (
              <CardContent>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <img
                    src={selectedStudent?.photo}
                    alt="Student"
                    style={{ width: "120px", height: "120px", borderRadius: "50%", boxShadow: "0px 4px 10px rgba(0,0,0,0.3)" }}
                  />
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                    {selectedStudent.name}
                  </Typography>
                </Box>
                <Typography><strong>DOB:</strong> {selectedStudent?.dob}</Typography>
                <Typography><strong>Email:</strong> {selectedStudent?.email}</Typography>
                <Typography><strong>Registered Date:</strong> {selectedStudent.registeredDate}</Typography>
                <Typography><strong>Exam Status:</strong> {selectedStudent.examStatus}</Typography>
                <Typography><strong>System Access:</strong> {selectedStudent.systemAccess}</Typography>
                <Button
                  sx={{ mt: 3, width: "100%" }}
                  variant="contained"
                  color="primary"
                  onClick={() => setSelectedStudent(null)}
                >
                  Close
                </Button>
              </CardContent>
            )}
          </Card>
        </Box>
      </Modal>
    </Box>
  );
};

export default StudentManagement;
