import React from 'react';
import Box from '@mui/material/Box';

export default function Calendar() {

    return (
        <Box className='calendar-wrap' backgroundColor="#9f4cd650" sx={{ position: 'absolute', width: '25vw', height: '80vh', minWidth: '300px', top: '15vh', border: '4px solid #ddd', boxSizing: 'border-box'}}>
            <p>calendar</p>
        </Box>
    );
}