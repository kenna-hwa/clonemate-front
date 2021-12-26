import React from 'react';
import Box from '@mui/material/Box';

import MainNavBar from './MainNavBar';
import Content from './Content';

export default function Main() {
  
    return (
        <Box className='main-wrap' backgroundColor='#e4f2b4' sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <MainNavBar />
        <Content />
        </Box>
    );
}