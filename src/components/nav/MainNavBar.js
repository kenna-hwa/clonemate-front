import React, { useState } from 'react';
import { useRecoilState } from "recoil";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import SettingsIcon from '@mui/icons-material/Settings';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import { objTodosDataResult, userIdInfo, testFollowerData } from "../../atoms/todoData";

import '../../stylesheets/Nav.css';


export default function MainNavBar() {

  /* atom 시작 */

    // atom에서 goal+todo 데이터 가져오기
    let [dtTodos, setDtTodos] = useRecoilState(objTodosDataResult);
    let todoDataArray = JSON.parse(JSON.stringify(dtTodos));
    const isThereGoal = todoDataArray.length;


    let [dtUser, setDtUser] = useRecoilState(userIdInfo);
    let userData = JSON.parse(JSON.stringify(dtUser));
    //console.log(userData)

    let [testFollower, setTestFollower] = useRecoilState(testFollowerData);
    //let testarray = JSON.parse(JSON.stringify(testFollower));
    const isThereFollower = testFollower.length;

/* atom 종료 */


 /* 함수 시작 */

  //컴포넌트로 이동 함수 (파라미터 추가)
  const moveSetting = (e) => {
    window.location.replace(`/setting`)
  }
  const moveFollowing = (e) => {
    window.location.replace(`/exploreSearch`)
  }
  const moveGoals = (e) => {
    window.location.replace(`/goals`)
  }
  const moveRoutines = (e) => {
    window.location.replace(`/routines`)
  }

 /* 함수 종료 */

  //하위
  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  //list 표시 나중에 별도로 빼야할듯!
  const SNB = (anchor) => (
    <Box
    className='snb_wrap'
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250}} //가로 길이
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* } <section className='snb_user_info_wrap' style={{'background': 'red'}}> */}
        {/* 유저 정보 저장 */}
        {/* 로그인 하면 유저 정보 표시 */}
        {/* 로그인 안되어 있으면 Me 표시 */}

        {/* if 로그인 안된 경우 */}
       {/* <img src="" alt='유저 아이콘' />
        <h1 className='snb_user_info_title'>me</h1>
        <p></p>
        <button>가입하기</button> */}

        <section className='snb_user_info_wrap' style={{'background': ''}}>
        {/* if 로그인 된 경우 */}
        <Box display="flex" justifyContent="flex-end" >
          <IconButton onClick={moveSetting} size="small" edge="end" aria-label="back" style={{ marginRight: "0px" }}>
            <SettingsIcon fontSize="small" sx={{ color:"white", stroke: "black", strokeWidth:1.5 }} />
          </IconButton>
        </Box>
          {/*<button className='snb_user_setting_btn'><SettingsIcon fontSize="small" /></button>*/}
          <div className="snb-user-info-box" display="flex" justifyContent="flex-start">
            {userData.map((data, idx)=>{
                    return (
                        <React.Fragment >
                          <div className="snb-user-info-text" id={idx}>
                            <p className='snb-user-info-name'>{data.name}</p>
                            <p className='snb-user-info-mail'>{data.email}</p>
                          </div>
                        </React.Fragment>
                     
                    )
                }) 
                }
          </div>
          {/* <h2 className='snb_user_info_title'>유저 닉네임</h2>
          <p>유저 이메일</p> */}
        </section>
       
        <section className='snb_user_follow_info_wrap'>
          {/* Box -> hover 옵션 추가 or Button-> CSS 변경 */}
          <div className='snb-follow-box' display="flex" justifyContent="flex-start" onClick={moveFollowing} fontSize="small">
            
            <p className='snb-follow-title' style={{paddingRight: "20px" }}>{isThereFollower} 팔로워</p>
            <p className='snb-follow-title'>{isThereFollower} 팔로잉</p>
                 
          </div>  
          
        </section>
       

        {/* 할일 : divider 스타일 opacity 변경  */}
        <Divider  />
      
        <section className='snb-goal-wrap'>
          <Box display="flex" justifyContent="space-between">
            <p className='snb-goal-title'>목표</p>
            <IconButton onClick={moveGoals} size="small" edge="end" color="inherit" aria-label="back">
              <NavigateNextIcon className='snb-title-nav-icon' />
            </IconButton>
          </Box>

        
        { isThereGoal ? 
        
        <div className="snb-goals-list-box">
            {todoDataArray.map((data, idx)=>{
                    return (
                      <div id={idx} className="snb-list-button" data-index={idx} data={data}>
                          <div className="snb-goals-list-text" id={data.orderNo} name={data.orderNo} 
                              style={{ color:data.color }} >
                            <p>{data.contents}</p>
                          </div>
                      </div>
                    )
                }) 
                }
          
          </div> : <div className="snb-goals-null-text">목표를 등록하세요</div> }

          </section>
        <Divider />

        <section className='snb_routine_wrap'>
          <Box display="flex" justifyContent="space-between" style={{ height: "42px" }}>
            <p className='snb-goal-title'>기한이 있는 할 일 </p>
            <IconButton onClick={moveRoutines} size="small" edge="end" color="inherit" aria-label="back" >
              <NavigateNextIcon className='snb-title-nav-icon' />
            </IconButton>
          </Box>
          {/* 기한있는 할일-> 오늘날짜보다 뒤의 날짜설정? y */}
          <React.Fragment>
            {todoDataArray.map((data, idx)=>{
                    return (
                     
                      
                      <div className="snb-todo-list-box" id={data.orderNo} name={data.orderNo} style={{ color: 'gray' }}>
                        {data.todos.map((todos)=>{
                           {/* enddate? , feed의 check icon 각 할일에 추가 */}
                          return (

                            
                              <div className="goals-listItem-text-wrap" 
                                  id={todos.goalId}
                                  data-index={todos.goalId}>
                            {/*}  {todos.checkYn === 'Y' ?  
                            <CheckBoxIcon data-goalid={todos.goalId} data-todoid={todos.id} className="todos-list-check-icon" data-check={todos.checkYn} onClick={onClickTodoCheckYn}
                              /> : </> */}
                               
                                <CheckBoxOutlineBlankIcon 
                                  data-goalid={todos.goalId} data-todoid={todos.id} className="todos-list-check-icon"/> 
                                <p key={todos.orderNo}>{todos.contents}</p>
                              </div>
                            )
                          }) 
                        } 
                      </div>
                    )
                  }) 
                }
          </React.Fragment>     
        </section>
    </Box>
  );

  return (
    <>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor} >
          <Box >
            <AppBar
              
              position="static"
              sx={{
                boxShadow: "none",
                flexDirection: "row-reverse",
                height: "90px",
                borderTop: "1px solid #CCCDCD",
                boxSizing: "border-box",
              }}
            >
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="back"
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer(anchor, true)}
                >
                  <DehazeIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </Box>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {SNB(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}