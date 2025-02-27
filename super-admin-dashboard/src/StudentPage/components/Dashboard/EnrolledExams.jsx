import React from 'react';
import PropTypes from 'prop-types';
import { 
  Paper, 
  Typography, 
  TableContainer, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell,
  Button,
  Chip,
  Box
} from '@mui/material';
import { format } from 'date-fns';
import { 
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const EnrolledExams = ({ enrolledExams, onTakeTest, setCurrentPage }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Your Enrolled Exams
      </Typography>
      {enrolledExams.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Exam Name</TableCell>
                <TableCell>Date Range</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action/Result</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrolledExams.map((exam) => (
                <TableRow key={exam.examId._id}>
                  <TableCell>{exam.examId.examName}</TableCell>
                  <TableCell>
                    {format(new Date(exam.examId.examDateRange.startDate), 'PP')} - 
                    {format(new Date(exam.examId.examDateRange.endDate), 'PP')}
                  </TableCell>
                  <TableCell>
                    {exam.examId.instructions.duration} mins
                  </TableCell>
                  <TableCell>
                    {exam.result}
                  </TableCell>
                  <TableCell>
                    {exam.result === 'Pending' ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onTakeTest(exam.examId)}
                      >
                        Take Test
                      </Button>
                    ) : (
                      <Chip 
                        label={exam.result}
                        color={
                          exam.result === 'Passed' 
                            ? 'success' 
                            : exam.result === 'Failed'
                              ? 'error'
                              : 'warning'
                        }
                        icon={
                          exam.result === 'Passed' 
                            ? <CheckCircleIcon /> 
                            : exam.result === 'Failed'
                              ? <CancelIcon />
                              : <InfoIcon />
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {exam.score !== null ? exam.score : 'Not available'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="textSecondary">
            You haven&apos;t enrolled in any exams yet.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => setCurrentPage('explore')}
          >
            Explore Available Exams
          </Button>
        </Box>
      )}
    </Paper>
  );
};

EnrolledExams.propTypes = {
  enrolledExams: PropTypes.arrayOf(
    PropTypes.shape({
      examId: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        examName: PropTypes.string.isRequired,
        examDateRange: PropTypes.shape({
          startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
          endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired
        }).isRequired,
        instructions: PropTypes.shape({
          duration: PropTypes.number.isRequired
        }).isRequired
      }).isRequired,
      result: PropTypes.string.isRequired,
      score: PropTypes.number
    })
  ).isRequired,
  onTakeTest: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired
};

export default EnrolledExams; 