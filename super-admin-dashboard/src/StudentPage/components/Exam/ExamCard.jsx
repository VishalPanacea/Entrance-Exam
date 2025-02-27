import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardActions, Typography, Button, Box, Chip } from '@mui/material';
import { CalendarToday as CalendarIcon } from '@mui/icons-material';
import { format } from 'date-fns';

const ExamCard = ({ exam, onEnroll }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {exam.examName}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {format(new Date(exam.examDateRange.startDate), 'PP')} - 
            {format(new Date(exam.examDateRange.endDate), 'PP')}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Duration: {exam.instructions.duration} minutes | 
          Questions: {exam.instructions.questionsCount} | 
          Max Marks: {exam.instructions.maxMarks}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          {exam.qualificationEligibility.map((qual, index) => (
            <Chip key={index} label={qual} size="small" />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          variant="contained"
          onClick={() => onEnroll(exam._id)}
        >
          Enroll Now
        </Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

ExamCard.propTypes = {
  exam: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    examName: PropTypes.string.isRequired,
    examDateRange: PropTypes.shape({
      startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
      endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired
    }).isRequired,
    instructions: PropTypes.shape({
      duration: PropTypes.number.isRequired,
      questionsCount: PropTypes.number.isRequired,
      maxMarks: PropTypes.number.isRequired
    }).isRequired,
    qualificationEligibility: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onEnroll: PropTypes.func.isRequired
};

export default ExamCard; 