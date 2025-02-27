import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Logout as LogoutIcon, Menu as MenuIcon } from '@mui/icons-material';

const AppHeader = ({ 
  isLoggedIn, 
  drawerWidth, 
  handleDrawerToggle, 
  setOpenLoginDialog, 
  setOpenSignupDialog,
  handleLogout 
}) => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ml: { sm: `${drawerWidth}px` },
        width: { sm: `calc(100% - ${drawerWidth}px)` }
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Student Exam Portal
        </Typography>
        
        {isLoggedIn ? (
          <Button 
            color="inherit" 
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button 
              color="inherit" 
              onClick={() => setOpenLoginDialog(true)}
            >
              Login
            </Button>
            <Button 
              color="inherit" 
              onClick={() => setOpenSignupDialog(true)}
            >
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

AppHeader.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  setOpenLoginDialog: PropTypes.func.isRequired,
  setOpenSignupDialog: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default AppHeader; 