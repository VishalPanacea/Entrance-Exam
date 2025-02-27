import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box
} from '@mui/material';
import {
  Timer as TimerOutlined,
  Quiz as QuizOutlined,
  Stars as StarsOutlined
} from '@mui/icons-material';

const InstructionsDialog = ({ open, onClose, exam, onStartTest }) => {
  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        Test Instructions - {exam?.examName}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="h6" gutterBottom>
            Important Instructions
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><TimerOutlined /></ListItemIcon>
              <ListItemText 
                primary={`Duration: ${exam?.instructions.duration} minutes`}
                secondary="Test will automatically submit when time expires"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><QuizOutlined /></ListItemIcon>
              <ListItemText 
                primary={`Total Questions: ${exam?.instructions.questionsCount}`}
                secondary="All questions are multiple choice"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><StarsOutlined /></ListItemIcon>
              <ListItemText 
                primary={`Maximum Marks: ${exam?.instructions.maxMarks}`}
                secondary={exam?.instructions.negativeMarks ? "Negative marking applicable" : "No negative marking"}
              />
            </ListItem>
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button 
          variant="contained" 
          color="primary"
          onClick={onStartTest}
        >
          Start Test
        </Button>
      </DialogActions>
    </Dialog>
  );
};

InstructionsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  exam: PropTypes.object,
  onStartTest: PropTypes.func.isRequired
};

export default InstructionsDialog; 