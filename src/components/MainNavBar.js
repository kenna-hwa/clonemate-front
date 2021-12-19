import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DehazeIcon from '@material-ui/icons/Dehaze';

export default function MainNavBar () {
  return (
    <Box>
      <AppBar position="static" color="mainnav" sx={{ boxShadow:"none", flexDirection:"row-reverse", height: '90px', borderTop: '1px solid #CCCDCD', boxSizing:'border-box' }}>
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 2 }}
          >
         <DehazeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
