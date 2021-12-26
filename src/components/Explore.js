import React from 'react';
import Box from '@mui/material/Box';
import Calendar from './Calendar';

export default function Explore() {

    return (
        <Box className='explore-wrap' backgroundColor='#2a5dc950' sx={{ position: 'relative', width: '25vw', height: '15vh', minWidth: '300px', top: 0 }} >        
        <p>explore</p> 
        <Calendar />       
        </Box>
    );
}