// import { Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "../pages/Dashboard";
// import Students from "../pages/Students";
// // import Results from "../pages/Results";
// // import Questions from "../pages/Questions";
// // import Admins from "../pages/Admins";
// import Unauthorized from "../pages/Unauthorized";
// import { useAuth } from "../context/AuthContext";
// import ExamStats from "../pages/ExamStats";
// import StudentManagement from "../pages/StudentManagement";
// import QuestionBank from "../pages/QuestionBank";
// import SuperAdminDashboard from "../pages/SuperadminDashboard";

// const AppRoutes = () => {
//   const { role } = useAuth();

//   return (
//     <Routes>
//       <Route path="/" element={<Dashboard />} />
//       {/* {role === "superadmin" && <Route path="/admins" element={<Admins />} />}
//       {role !== null ? ( */}
//         <>
//           <Route path="/students" element={<Students />} />
//           {/* <Route path="/results" element={<Results />} />
//           <Route path="/questions" element={<Questions />} /> */}
//             <Route path="/admin"  element={<SuperAdminDashboard />}  />
//               <Route path="/questions"  element={<QuestionBank />} /> 
//               <Route path="/student"  element={<StudentManagement />} />
//               <Route path="/exam"  element={<ExamStats />} />
           
//         </>
//       {/* ) : (
//         <Route path="*" element={<Unauthorized />} />
//       )} */}
//     </Routes>
//   );
// };

// export default AppRoutes;
















import { Routes, Route, Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Unauthorized from "../pages/Unauthorized";
import ExamStats from "../pages/ExamStats";
import StudentManagement from "../pages/StudentManagement";
import QuestionBank from "../pages/QuestionBank";
import SuperAdminDashboard from "../pages/SuperadminDashboard";
import StudentSignup from "../auth/signup";
import LoginPage from "../auth/login";

const AppRoutes = () => {
//   const { user } = useAuth(); // Check if the user is authenticated

  return (
    <Routes>
      {!true ? (
        <>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<StudentSignup />} />
          <Route path="/login" element={<LoginPage />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/students" element={<Students />} /> */}
          <Route path="/admin" element={<SuperAdminDashboard />} />
          <Route path="/questions" element={<QuestionBank />} />
          <Route path="/student" element={<StudentManagement />} />
          <Route path="/exam" element={<ExamStats />} />
          <Route path="*" element={<Unauthorized />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
