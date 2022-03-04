import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import AddIcon from '@material-ui/icons/Add';

import '../../stylesheets/Nav.css';


export default function BasicNavBar () {

  //useHistory 훅 사용
  let history = useHistory();


  /* 버튼 onClick 함수 */

  //목표 생성 페이지 이동
  function moveGoalForm(){
    window.location.replace("/goals/goalForm")
  }

  //url pathname 변수화
  let urlPath = window.location.pathname;
  let { id } = useParams();

  return (
    <Box className="basic_nav_box">
      <AppBar className="basic_nav_appbar" >
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 2 }}
            onClick={history.goBack} 
          >
         <NavigateBeforeIcon />
          </IconButton>
          <Typography className="navbar_title" variant="h6" component="div">

          {/* 삼항연산자로 navbar 제목 붙이기 */}
          {
             urlPath.includes(`signin`)? `로그인` : urlPath.includes(`join`)?  `가입하기` 
             : urlPath.includes(`goals`)? `목표` : urlPath.includes(`exploreSearch`)? `팔로우` 
             : urlPath.includes(`use`)? `이용약관` : urlPath.includes(`policy`)? `개인정보 정책` 
             : urlPath.includes(`announcements`)? `공지사항` : urlPath.includes(`routines`) ? `기한이 있는 할 일 설정` : null
           }
          </Typography>
          
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 2 }}
          >
           {
             urlPath ===`/goals`? <AddIcon onClick={moveGoalForm} /> : null
           }
        </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
