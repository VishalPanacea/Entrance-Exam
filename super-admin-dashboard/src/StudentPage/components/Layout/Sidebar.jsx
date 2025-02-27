import React from 'react';
import PropTypes from 'prop-types';
import { Box, Avatar, Typography, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard as DashboardIcon, Explore as ExploreIcon } from '@mui/icons-material';

const Sidebar = ({ isLoggedIn, currentUser, currentPage, setCurrentPage }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {isLoggedIn && (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Avatar 
            src={currentUser?.photo} 
            alt={currentUser?.name}
            sx={{ width: 64, height: 64, mx: 'auto', mb: 1 }}
          />
          <Typography variant="subtitle1">
            {currentUser?.name}
          </Typography>
        </Box>
      )}
      <List>
        {isLoggedIn && (
          <ListItemButton 
            selected={currentPage === 'dashboard'}
            onClick={() => setCurrentPage('dashboard')}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        )}
        <ListItemButton 
          selected={currentPage === 'explore'}
          onClick={() => setCurrentPage('explore')}
        >
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Explore Exams" />
        </ListItemButton>
      </List>
    </Box>
  );
};

Sidebar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.string
  }),
  currentPage: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired
};

Sidebar.defaultProps = {
  currentUser: null
};

export default Sidebar; 