import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip
} from '@mui/material';
import { Timer as TimerOutlined } from '@mui/icons-material';

const TestDialog = ({
  open,
  onClose,
  exam,
  currentQuestion,
  questions,
  answers,
  timeRemaining,
  setTimeRemaining,
  onAnswerSelect,
  onSubmit,
  onNext,
  onPrevious
}) => {
  useEffect(() => {
    let timer;
    if (open && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            onSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [open, onSubmit, setTimeRemaining]);

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{exam?.examName}</Typography>
          <Chip
            icon={<TimerOutlined />}
            label={`${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')}`}
            color={timeRemaining < 300 ? "error" : "default"}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Question {currentQuestion + 1} of {questions.length}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {questions[currentQuestion]?.questionDescription}
          </Typography>
          <RadioGroup
            value={answers[currentQuestion] || ''}
            onChange={(e) => onAnswerSelect(parseInt(e.target.value, 10))}
          >
            {questions[currentQuestion]?.responseOptions.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onPrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        {currentQuestion === questions.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Submit Test
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={onNext}
          >
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

TestDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  exam: PropTypes.object,
  currentQuestion: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  answers: PropTypes.object.isRequired,
  timeRemaining: PropTypes.number.isRequired,
  setTimeRemaining: PropTypes.func.isRequired,
  onAnswerSelect: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired
};

export default TestDialog; 