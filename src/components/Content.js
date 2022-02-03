import React from 'react';
import CalendarBox from './CalendarBox';
import Explore from './Explore';
import Feed from './Feed';
import Box from '@mui/material/Box';


export default function Content(props) {


    return (
        <Box className='content-wrap' sx={{ position: 'relative', display: 'flex', width: '100vw', height: '100vh' }}>
        
        <Explore />
        <Feed />

        </Box>
    );
}