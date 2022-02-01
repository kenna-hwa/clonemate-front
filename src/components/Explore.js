import React from 'react';
import Box from '@mui/material/Box';
import CalendarBox from './CalendarBox';
import { Avatar } from '@mui/material';

export default function Explore(props) {

    let calendarData = props.calendarData;


    return (
        <Box className='explore-wrap' sx={{ position: 'relative', width: '24vw', minWidth: '350px', top: 0, padding: '2em'}} >        
            <Avatar sx={{ backgroundColor: '#fff', color: '#111', fontWeight: 'bold', border: '2px solid #222' }}>N</Avatar>
            <h1 className='nickname'>Nickname</h1>
            <CalendarBox calendarData={calendarData} />       
        </Box>
    );
}