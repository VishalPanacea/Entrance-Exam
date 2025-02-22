import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./styles/LandingPage.module.css";
import LPHeader from "./LPHeader";
import LPSideMenuBar from "./LPSideMenuBar";
import LPMainAreaContainer from "./LPMainAreaContainer";
import Dashboard from "./Dashboard"; 
import SuperAdminDashboard from "./components/superadminDashboard";
import QuestionBank from "./components/QuestionBank";
import StudentManagement from "./studentManagement";
import ExamStats from "./ExamStats";
// import PLQSA from "../ProjectListForQSA/PLQSA";

const LandingPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <LPHeader />
      <div className={styles.mainContent}>
        <LPSideMenuBar />
        <div className={styles.mainArea}>
          <Routes>
            {/* <Route path="/" element={<LPMainAreaContainer />}> */}
              <Route index element={<Dashboard />} />
              <Route path="/admin"  element={<SuperAdminDashboard />} />
              <Route path="/questions"  element={<QuestionBank />} />
              <Route path="/student"  element={<StudentManagement />} />
              <Route path="/exam"  element={<ExamStats />} />
           
           
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
