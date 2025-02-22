
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import QstnrAdmin from "./QstnrAdmin/qstnrAdmin";
// import Signup from "./signUp/SignUp";
// import Login from "./login/Login";
import Landing from "./landingPage/LandingPage";
// import StudentSignup from "./auth/signup";
// import StudentLogin from "./auth/login";
// import SignupForm from "./auth/signup";
// import CreateAccount from "./auth/signup";
import StudentSignup from "./auth/signup";
import LoginPage from "./auth/login";
// import ClientManagement from "./ClientManagement/ClientManagement";
// import ConfirmPhone from "./signUp/ConfirmPhone";
// import Confirmation from "./signUp/Confirmation";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentSignup />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/client" element={<ClientManagement />} /> */}
          {/* <Route path="/Signup" element={<Signup />} /> */}
          {/* <Route path="/ConfirmPhone" element={<ConfirmPhone />} />
          <Route path="/Confirmation" element={<Confirmation onClose={undefined} />} />
          <Route path="/Login" element={<Login />} /> */}
          {/* <Route path="/login" element={<Login />} />*/}
          <Route path="/landing/*" element={<Landing />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
