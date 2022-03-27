import React from 'react';
import Box from '@mui/material/Box';

import Explore from './Explore';
import Feed from './Feed';

export default function Content() {


    return (
        <Box className='content-wrap' sx={{ position: 'relative', display: 'flex', height: '100vh'}}>
        
        <Explore />
        <Feed />

        </Box>
    );
}