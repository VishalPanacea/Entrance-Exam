import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/admin/students"); // Make sure the backend is running
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.email.includes(search) ||
      student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, backgroundColor: "#1E293B", minHeight: "100vh", borderRadius: "10px", width: "130%" }}>
      <Typography variant="h5" sx={{ mb: 3, color: "#E2E8F0", fontWeight: "bold" }}>
        Student Management 👩‍🎓👨‍🎓
      </Typography>

      <TextField
        label="Search by Name or Email"
        variant="outlined"
        fullWidth
        sx={{
          mb: 2,
          backgroundColor: "#334155",
          borderRadius: "8px",
          input: { color: "#E2E8F0" },
          label: { color: "#E2E8F0" },
        }}
        value={search}
        onChange={handleSearch}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress sx={{ color: "#E2E8F0" }} />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: "#334155", borderRadius: "10px" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#475569" }}>
              <TableRow>
                <TableCell sx={{ color: "#E2E8F0", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "#E2E8F0", fontWeight: "bold" }}>DOB</TableCell>
                <TableCell sx={{ color: "#E2E8F0", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "#E2E8F0", fontWeight: "bold" }}>Registered Date</TableCell>
                <TableCell sx={{ color: "#E2E8F0", fontWeight: "bold" }}>Exam Status</TableCell>
                <TableCell sx={{ color: "#E2E8F0", fontWeight: "bold" }}>System Access</TableCell>
                <TableCell sx={{ color: "#E2E8F0", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student._id} sx={{ "&:hover": { backgroundColor: "#475569" } }}>
                  <TableCell sx={{ color: "#E2E8F0" }}>{student.name}</TableCell>
                  <TableCell sx={{ color: "#E2E8F0" }}>{new Date(student.dob).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ color: "#E2E8F0" }}>{student.email}</TableCell>
                  <TableCell sx={{ color: "#E2E8F0" }}>{new Date(student.registeredDate).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ color: student.examStatus === "Passed" ? "#22C55E" : "#EF4444" }}>
                    {student.examStatus}
                  </TableCell>
                  <TableCell sx={{ color: student.systemAccessStatus === "Active" ? "#22C55E" : "#EF4444" }}>
                    {student.systemAccessStatus}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#6366F1",
                        "&:hover": { backgroundColor: "#4F46E5" },
                      }}
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
      )}

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
          <Card sx={{ maxWidth: 400, p: 3, borderRadius: 3, boxShadow: 5, backgroundColor: "#1E293B" }}>
            {selectedStudent && (
              <CardContent>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <img
                    src={selectedStudent.photo || "https://via.placeholder.com/150"}
                    alt="Student"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                    }}
                  />
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color: "#E2E8F0" }}>
                    {selectedStudent.name}
                  </Typography>
                </Box>
                <Typography sx={{ color: "#E2E8F0" }}><strong>DOB:</strong> {new Date(selectedStudent.dob).toLocaleDateString()}</Typography>
                <Typography sx={{ color: "#E2E8F0" }}><strong>Email:</strong> {selectedStudent.email}</Typography>
                <Typography sx={{ color: "#E2E8F0" }}><strong>Registered Date:</strong> {new Date(selectedStudent.registeredDate).toLocaleDateString()}</Typography>
                <Typography sx={{ color: "#E2E8F0" }}><strong>Exam Status:</strong> {selectedStudent.examStatus}</Typography>
                <Typography sx={{ color: selectedStudent.systemAccessStatus === "Active" ? "#22C55E" : "#EF4444" }}>
                  <strong>System Access:</strong> {selectedStudent.systemAccessStatus}
                </Typography>
                <Button
                  sx={{
                    mt: 3,
                    width: "100%",
                    backgroundColor: "#EF4444",
                    "&:hover": { backgroundColor: "#DC2626" },
                  }}
                  variant="contained"
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
