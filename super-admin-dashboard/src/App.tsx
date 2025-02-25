import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import StudentSignup from "./auth/signup";
import LoginPage from "./auth/login";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
       {/* <Routes>
      <Route path="/" element={<StudentSignup />} />
      <Route path="/login" element={<LoginPage />} />
      </Routes> */}
       

        <Navbar />
        <Box sx={{ display: "flex", mt: 8 }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <AppRoutes />
          </Box>
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;




