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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="basicnav" sx={{ boxShadow:"none" }}>
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
          <Typography className="navbar_title" variant="h6" component="div" color="inherit" fontSize={16} fontWeight={600} sx={{ margin: "auto", transform: "translateX(-50%)" }}>

          {/* 삼항연산자로 navbar 제목 붙이기 */}
          {
             urlPath === '/signin'? `로그인` : urlPath === '/join'?  `가입하기` : urlPath === '/goals'? `목표` : urlPath === '/goalForm/'? `목표` : urlPath === `/goalEditForm/${id}`? `목표` : null
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
