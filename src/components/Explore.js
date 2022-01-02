import React from 'react';
import Box from '@mui/material/Box';
import CalendarBox from './CalendarBox';
import { Avatar } from '@mui/material';

export default function Explore() {

    return (
        <Box className='explore-wrap' backgroundColor='#2a5dc950' sx={{ position: 'relative', width: '25vw', height: '15vh', minWidth: '300px', top: 0 }} >        
        <Avatar sx={{ backgroundColor: '#fff', color: '#111', fontWeight: 'bold', border: '2px solid #222' }}>N</Avatar>
        <h1 className='nickname'>Nickname</h1>
        <CalendarBox />       
        </Box>
    );
}