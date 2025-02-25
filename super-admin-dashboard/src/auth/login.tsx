import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    alert(`Logging in as ${role} with email: ${formData.email}`);
    // Add authentication logic here
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ padding: 2, width: "100%", maxWidth: 450, borderRadius: 1, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2} color="primary">
          Login
        </Typography>

        {/* Role Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Login As</InputLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />

        <Button 
          variant="contained" 
          fullWidth 
          sx={{ mt: 2, borderRadius: 2, fontSize: "16px" }} 
          onClick={handleLogin}
          disabled={!formData.email || !formData.password}
        >
          Login
        </Button>

        {/* Links */}
        <Typography textAlign="center" mt={2}>
          <Link to="/forgot-password" style={{ color: "blue", textDecoration: "none", fontWeight: "bold" }}>
            Forgot Password?
          </Link>
        </Typography>

        {role === "student" && (
          <Typography textAlign="center" mt={1}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "blue", textDecoration: "none", fontWeight: "bold" }}>
              Sign up here
            </Link>
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default LoginPage;
