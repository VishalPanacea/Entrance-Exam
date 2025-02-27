import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Grid, Box, Avatar, Chip } from '@mui/material';
import { format } from 'date-fns';

const StudentProfile = ({ currentUser }) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Your Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}>
            <Avatar 
              src={currentUser.photo} 
              alt={currentUser.name}
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <Typography variant="h6">{currentUser.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {currentUser.email}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Mobile
              </Typography>
              <Typography variant="body1">
                {currentUser.mobile}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Date of Birth
              </Typography>
              <Typography variant="body1">
                {format(new Date(currentUser.dob), 'PP')}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Qualification
              </Typography>
              <Typography variant="body1">
                {currentUser.qualification}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Counseling Status
              </Typography>
              <Chip 
                label={currentUser.counselingStatus}
                color={
                  currentUser.counselingStatus === 'Scheduled' 
                    ? 'primary' 
                    : 'default'
                }
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Exam Status
              </Typography>
              <Chip 
                label={currentUser.examStatus}
                color={
                  currentUser.examStatus === 'Attempted' 
                    ? 'success' 
                    : 'warning'
                }
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                System Access
              </Typography>
              <Chip 
                label={currentUser.systemAccessStatus}
                color={
                  currentUser.systemAccessStatus === 'Active' 
                    ? 'success' 
                    : 'error'
                }
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

StudentProfile.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    dob: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    qualification: PropTypes.string.isRequired,
    examStatus: PropTypes.string.isRequired,
    systemAccessStatus: PropTypes.string.isRequired,
    counselingStatus: PropTypes.string.isRequired
  }).isRequired
};

export default StudentProfile; 