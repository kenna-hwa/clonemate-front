import React from 'react';
import Box from '@mui/material/Box';

import MainNavBar from '../nav/MainNavBar';
import Content from './Content';

export default function Main() {


      /* props 선언 시작 */

    /* props 선언 끝 */

  
    return (
        <Box className='main-wrap' sx={{ position: 'relative'}}>
        <MainNavBar />
        <Content />
        </Box>
    );
}