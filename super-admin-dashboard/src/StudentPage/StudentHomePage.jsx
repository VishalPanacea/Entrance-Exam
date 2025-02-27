import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, 
  CardMedia, CardActions, TextField, InputAdornment, Avatar, Box, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, 
  ListItemIcon, ListItemText, Radio, RadioGroup, FormControl, FormControlLabel,
  ListItemButton, CircularProgress, IconButton, Drawer
} from '@mui/material';
import { 
  Search as SearchIcon, 
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Info as InfoIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Explore as ExploreIcon,
  Timer as TimerOutlined,
  Quiz as QuizOutlined,
  Stars as StarsOutlined,
  Close as CloseIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { format } from 'date-fns';
import AppHeader from './components/Layout/AppHeader';
import Sidebar from './components/Layout/Sidebar';
import StudentProfile from './components/Dashboard/StudentProfile';
import ExamCard from './components/Exam/ExamCard';
import LoginDialog from './components/Auth/LoginDialog';
import SignupDialog from './components/Auth/SignupDialog';
import EnrolledExams from './components/Dashboard/EnrolledExams';
import TestDialog from './components/Exam/TestDialog';
import InstructionsDialog from './components/Exam/InstructionsDialog';
import axios from 'axios';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50',
    },
    secondary: {
      main: '#3498db',
    },
  },
});

// Drawer width
const drawerWidth = 240;

// Add API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005/api';

function StudentHomePage() {
  // State for authentication and user
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openSignupDialog, setOpenSignupDialog] = useState(false);
  
  // State for navigation and content
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // State for exams
  const [availableExams, setAvailableExams] = useState([]);
  const [enrolledExams, setEnrolledExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for test taking
  const [showInstructions, setShowInstructions] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [currentExam, setCurrentExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add API error state
  const [error, setError] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Fetch available exams
  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/exams`);
        setAvailableExams(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch available exams');
        console.error('Error fetching exams:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Fetch enrolled exams for logged-in user
  useEffect(() => {
    const fetchEnrolledExams = async () => {
      if (!isLoggedIn || !currentUser) return;

      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/students/enrolled-exams`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setEnrolledExams(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch enrolled exams');
        console.error('Error fetching enrolled exams:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledExams();
  }, [isLoggedIn, currentUser]);

  // Test taking handlers
  const handleTakeTest = async (exam) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/exams/${exam._id}/questions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setQuestions(response.data);
      setCurrentExam(exam);
      setShowInstructions(true);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch exam questions');
      console.error('Error fetching exam questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = () => {
    setShowInstructions(false);
    setShowTest(true);
    setTimeRemaining(currentExam.instructions.duration * 60);
    // Mock questions fetch
    setQuestions([
      {
        questionDescription: "What is 2 + 2?",
        responseOptions: ["3", "4", "5", "6"],
        correctAnswerIndex: 1,
        questionMarks: 4,
        complexity: "Simple",
        negativeScore: 1
      },
      {
        questionDescription: "What is the capital of France?",
        responseOptions: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswerIndex: 2,
        questionMarks: 4,
        complexity: "Simple",
        negativeScore: 1
      }
    ]);
    setCurrentQuestion(0); // Reset current question
    setAnswers({}); // Reset answers
  };

  const handleCompleteTest = (result) => {
    setShowTest(false);
    // Update the exam status and score
    const updatedExams = enrolledExams.map(exam => 
      exam.examId._id === currentExam._id 
        ? { ...exam, result: 'Completed', score: result.correct * 4 }
        : exam
    );
    setEnrolledExams(updatedExams);
    alert(`Test completed! Score: ${result.correct * 4}/${result.totalQuestions * 4}`);
  };

  const handleAnswerSelect = (answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleSubmitTest = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/exams/${currentExam._id}/submit`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const result = response.data;
      setShowTest(false);
      
      // Refresh enrolled exams to show updated status
      const enrolledResponse = await axios.get(`${API_BASE_URL}/students/enrolled-exams`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEnrolledExams(enrolledResponse.data);
      
      alert(`Test completed! Score: ${result.score}/${result.totalMarks}`);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit test');
      console.error('Error submitting test:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle login logic
  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/students/login`, {
        email,
        password
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setCurrentUser(user);
      setIsLoggedIn(true);
      setOpenLoginDialog(false);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle signup logic
  const handleSignup = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/students/signup`, userData);
      setOpenSignupDialog(false);
      // Show success message and redirect to login
      alert('Signup successful! Please login to continue.');
      setOpenLoginDialog(true);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter exams based on search term
  const filteredExams = availableExams.filter(exam => 
    exam.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = async (examId) => {
    if (!isLoggedIn) {
      setOpenLoginDialog(true);
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${API_BASE_URL}/student/enroll-exam/${examId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Refresh enrolled exams after successful enrollment
      const response = await axios.get(`${API_BASE_URL}/student/enrolled-exams`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEnrolledExams(response.data);
      setError(null);
      alert('Successfully enrolled in the exam!');
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Exam not found or enrollment is not available');
      } else {
        setError(err.response?.data?.message || 'Failed to enroll in the exam');
      }
      console.error('Enrollment error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/students/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setCurrentUser(null);
      setCurrentPage('explore');
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <AppHeader 
          isLoggedIn={isLoggedIn}
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
          setOpenLoginDialog={setOpenLoginDialog}
          setOpenSignupDialog={setOpenSignupDialog}
          handleLogout={handleLogout}
        />

        {/* Show loading indicator */}
        {loading && (
          <Box
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* Show error message if any */}
        {error && (
          <Box
            sx={{
              position: 'fixed',
              top: 16,
              right: 16,
              zIndex: 9999,
              backgroundColor: 'error.main',
              color: 'white',
              padding: 2,
              borderRadius: 1
            }}
          >
            {error}
            <IconButton
              size="small"
              sx={{ ml: 1, color: 'white' }}
              onClick={() => setError(null)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <Sidebar 
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Drawer>
          
          {/* Desktop drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            <Sidebar 
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Drawer>
        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            mt: 8,
            backgroundColor: '#f5f6fa'
          }}
        >
          {currentPage === 'dashboard' && isLoggedIn ? (
            <>
              {/* Welcome Section */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#2c3e50', mb: 1 }}>
                  Welcome back, {currentUser?.name || 'Student'}!
                </Typography>
                <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
                  Track your progress and manage your upcoming exams
                </Typography>
              </Box>

              {/* Stats Section */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    sx={{
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      bgcolor: '#3498db',
                      color: 'white',
                      borderRadius: 2
                    }}
                  >
                    <QuizOutlined sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {enrolledExams.length}
                    </Typography>
                    <Typography variant="body2">Enrolled Exams</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    sx={{
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      bgcolor: '#2ecc71',
                      color: 'white',
                      borderRadius: 2
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {enrolledExams.filter(exam => exam.result === 'Completed').length}
                    </Typography>
                    <Typography variant="body2">Completed Exams</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    sx={{
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      bgcolor: '#e74c3c',
                      color: 'white',
                      borderRadius: 2
                    }}
                  >
                    <TimerOutlined sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {enrolledExams.filter(exam => exam.result === 'Pending').length}
                    </Typography>
                    <Typography variant="body2">Pending Exams</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    sx={{
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      bgcolor: '#f1c40f',
                      color: 'white',
                      borderRadius: 2
                    }}
                  >
                    <StarsOutlined sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {enrolledExams.reduce((acc, exam) => acc + (exam.score || 0), 0) / 
                       (enrolledExams.filter(exam => exam.score !== null).length || 1)}%
                    </Typography>
                    <Typography variant="body2">Average Score</Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Enrolled Exams Section */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, color: '#2c3e50', fontWeight: 600 }}>
                  Your Enrolled Exams
                </Typography>
                <EnrolledExams 
                  enrolledExams={enrolledExams}
                  onTakeTest={handleTakeTest}
                  setCurrentPage={setCurrentPage}
                />
              </Box>
            </>
          ) : (
            <>
              {/* Search and Filter Section */}
              <Box sx={{ width: '100%' }}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h4" sx={{ mb: 3, color: '#2c3e50', fontWeight: 600 }}>
                    Available Exams
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      mb: 4,
                      borderRadius: 2,
                      backgroundColor: 'white',
                      border: '1px solid rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="standard"
                      placeholder="Search exams by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon sx={{ color: '#95a5a6' }} />
                          </InputAdornment>
                        ),
                        disableUnderline: true,
                        sx: { fontSize: '1rem' }
                      }}
                    />
                  </Paper>
                </Box>

                {/* Available Exams Grid */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  {filteredExams.map((exam) => (
                    <Grid item xs={12} sm={6} lg={4} key={exam._id}>
                      <Card 
                        elevation={0}
                        sx={{ 
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: '16px',
                          backgroundColor: 'white',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
                          }
                        }}
                      >
                        <Box
                          sx={{
                            position: 'relative',
                            p: 3,
                            pb: 2,
                            borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Typography 
                              variant="h6" 
                              component="h2"
                              sx={{ 
                                fontWeight: 600,
                                color: '#2c3e50',
                                fontSize: '1.1rem',
                                lineHeight: 1.4,
                                height: '2.8em',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical'
                              }}
                            >
                              {exam.examName}
                            </Typography>
                            <Chip
                              icon={exam.activeStatus === 'Active' ? <CheckCircleIcon sx={{ fontSize: '0.9rem !important' }} /> : <CancelIcon sx={{ fontSize: '0.9rem !important' }} />}
                              label={exam.activeStatus}
                              size="small"
                              sx={{ 
                                height: '24px',
                                backgroundColor: exam.activeStatus === 'Active' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(149, 165, 166, 0.1)',
                                color: exam.activeStatus === 'Active' ? '#27ae60' : '#7f8c8d',
                                border: 'none',
                                '& .MuiChip-icon': {
                                  color: 'inherit'
                                }
                              }}
                            />
                          </Box>
                          
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarIcon sx={{ color: '#95a5a6', mr: 1.5, fontSize: '1.1rem' }} />
                              <Typography variant="body2" sx={{ color: '#7f8c8d', fontSize: '0.875rem' }}>
                                {format(new Date(exam.examDateRange.startDate), 'MMM d')} - {format(new Date(exam.examDateRange.endDate), 'MMM d, yyyy')}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <TimerOutlined sx={{ color: '#95a5a6', mr: 1.5, fontSize: '1.1rem' }} />
                              <Typography variant="body2" sx={{ color: '#7f8c8d', fontSize: '0.875rem' }}>
                                Duration: {exam.instructions.duration} minutes
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <QuizOutlined sx={{ color: '#95a5a6', mr: 1.5, fontSize: '1.1rem' }} />
                              <Typography variant="body2" sx={{ color: '#7f8c8d', fontSize: '0.875rem' }}>
                                {exam.instructions.questionsCount} Questions
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ p: 3, pt: 2 }}>
                          <Button
                            fullWidth
                            variant="contained"
                            onClick={() => handleEnroll(exam._id)}
                            disabled={exam.activeStatus !== 'Active'}
                            sx={{
                              py: 1.25,
                              textTransform: 'none',
                              fontSize: '0.9rem',
                              fontWeight: 500,
                              borderRadius: '8px',
                              backgroundColor: exam.activeStatus === 'Active' ? '#3498db' : '#e0e0e0',
                              '&:hover': {
                                backgroundColor: exam.activeStatus === 'Active' ? '#2980b9' : '#e0e0e0'
                              },
                              '&.Mui-disabled': {
                                backgroundColor: '#e0e0e0',
                                color: '#9e9e9e'
                              }
                            }}
                          >
                            {exam.activeStatus === 'Active' ? 'Enroll Now' : 'Not Available'}
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          )}

          {/* Dialogs */}
          <LoginDialog 
            open={openLoginDialog}
            onClose={() => setOpenLoginDialog(false)}
            onLogin={handleLogin}
          />

          <SignupDialog
            open={openSignupDialog}
            onClose={() => setOpenSignupDialog(false)}
            onSignup={handleSignup}
          />

          <InstructionsDialog
            open={showInstructions}
            onClose={() => setShowInstructions(false)}
            exam={currentExam}
            onStartTest={handleStartTest}
          />

          <TestDialog
            open={showTest}
            onClose={() => {
              if (window.confirm('Are you sure you want to exit the test? Your progress will be lost.')) {
                setShowTest(false);
                setCurrentExam(null);
                setQuestions([]);
                setAnswers({});
              }
            }}
            exam={currentExam}
            currentQuestion={currentQuestion}
            questions={questions}
            answers={answers}
            timeRemaining={timeRemaining}
            setTimeRemaining={setTimeRemaining}
            onAnswerSelect={handleAnswerSelect}
            onSubmit={handleSubmitTest}
            onNext={() => setCurrentQuestion(prev => prev + 1)}
            onPrevious={() => setCurrentQuestion(prev => prev - 1)}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default StudentHomePage;