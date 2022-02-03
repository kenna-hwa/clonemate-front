import React from 'react';
import Box from '@mui/material/Box';

import MainNavBar from './MainNavBar';
import Content from './Content';

export default function Main(props) {


      /* props 선언 시작 */

     let goalItems = props.goal;
     let calendarData = props.calendarData;


    /* props 선언 끝 */

  
    return (
        <Box className='main-wrap' sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <MainNavBar />
        <Content goal={goalItems} calendarData={calendarData} />
        </Box>
    );
}