import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Input } from "@mui/material";
import { Link } from "react-router-dom";

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    qualification: "",
    photo: null
  });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const sendOtp = () => {
    if (!formData.mobile) {
      alert("Please enter your mobile number.");
      return;
    }
    setIsOtpSent(true);
    alert("OTP sent to " + formData.mobile);
  };

  const verifyOtp = () => {
    if (otp === "1234") {
      setIsOtpVerified(true);
      alert("OTP Verified!");
    } else {
      alert("Invalid OTP");
    }
  };

  const handleSubmit = () => {
    if (!isOtpVerified) {
      alert("Please verify OTP first.");
      return;
    }
    alert("Signup Successful!");
    // Here, you can send the formData to the backend
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ padding: 3, width: "100%", maxWidth: 400, borderRadius: 2, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2} color="primary">
          Student Signup
        </Typography>

        <TextField label="Name" name="name" fullWidth margin="normal" onChange={handleChange} required />
        <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} required />
        <TextField label="Mobile" name="mobile" fullWidth margin="normal" onChange={handleChange} required />
        <TextField label="Date of Birth" name="dob" type="date" fullWidth margin="normal" onChange={handleChange} InputLabelProps={{ shrink: true }} required />
        <TextField label="Qualification" name="qualification" fullWidth margin="normal" onChange={handleChange} required />

        {/* Photo Upload */}
        <Input type="file" name="photo" fullWidth margin="normal" onChange={handleChange} />

        {!isOtpSent ? (
          <Button variant="contained" fullWidth sx={{ mt: 2, borderRadius: 2, fontSize: "16px" }} onClick={sendOtp} disabled={!formData.mobile}>
            Send OTP
          </Button>
        ) : (
          <>
            <TextField label="Enter OTP" fullWidth margin="normal" onChange={(e) => setOtp(e.target.value)} required />
            <Button variant="contained" fullWidth sx={{ mt: 2, borderRadius: 2, fontSize: "16px", bgcolor: "green", "&:hover": { bgcolor: "darkgreen" } }} onClick={verifyOtp}>
              Verify OTP
            </Button>
          </>
        )}

        {/* Submit Button */}
        <Button variant="contained" fullWidth sx={{ mt: 2, borderRadius: 2, fontSize: "16px" }} onClick={handleSubmit} disabled={!isOtpVerified}>
          Signup
        </Button>

        {/* Link to Login Page */}
        <Typography textAlign="center" mt={2}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "blue", textDecoration: "none", fontWeight: "bold" }}>
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default StudentSignup;
