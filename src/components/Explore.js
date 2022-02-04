import React from 'react';
import Box from '@mui/material/Box';
import CalendarBox from './CalendarBox';
import { Avatar, Stack } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';

export default function Explore(props) {

    let calendarData = props.calendarData;
     //목표 생성 페이지 이동
    function moveExForm(){
        window.location.replace("/exploreSearch")
    }
    let urlPath = window.location.pathname;

    return (
        <Box className='explore-wrap' sx={{ position: 'relative', width: '24vw', minWidth: '350px', top: 0, padding: '2em'}} >        
            <Stack direction="row" spacing={1}>
                {/* Following users data 필요 */}
                <Avatar sx={{ backgroundColor: '#fff', color: '#111', fontWeight: 'bold', border: '2px solid #222' }}>N</Avatar>
                <Avatar sx={{ backgroundColor: '#fff', color: '#111', fontWeight: 'bold', border: '2px solid #222' }}>
                    <AddIcon onClick={moveExForm} />
                </Avatar>
            </Stack>
            <h1 className='explore-user-nickname'>Nickname</h1>
            <p className='explore-user-info'>프로필에 자기소개를 입력해보세요</p>
            <CalendarBox calendarData={calendarData} />       
        </Box>
    );
}