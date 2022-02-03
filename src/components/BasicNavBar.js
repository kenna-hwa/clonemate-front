import React from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import AddIcon from '@material-ui/icons/Add';

import '../stylesheets/Nav.css';


export default function BasicNavBar () {

  //useHistory 훅 사용
  let history = useHistory();


  /* 버튼 onClick 함수 */

  //목표 생성 페이지 이동
  function moveGoalForm(){
    window.location.replace("/goalForm")
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
          >
         <NavigateBeforeIcon onClick={history.goBack} />
          </IconButton>
          <Typography className="navbar_title" variant="h6" component="div">

          {/* 삼항연산자로 navbar 제목 붙이기 */}
          {
             urlPath === '/signin'? `로그인` : urlPath === '/join'?  `가입하기` 
             : urlPath === '/goals'? `목표` : urlPath === '/goalForm/'? `목표` 
             : urlPath === `/goalEditForm/${id}`? `목표` : urlPath === `/exploreSearch`? `팔로우` 
             : urlPath === `/text/use`? `이용약관` : urlPath === `/text/policy`? `개인정보 정책` 
             : urlPath === `/Announcements`? `공지사항` :null
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
             urlPath === '/goals'? <AddIcon onClick={moveGoalForm} /> : null
           }
        </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
