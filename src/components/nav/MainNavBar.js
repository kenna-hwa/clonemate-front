import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import '../../stylesheets/Nav.css';

export default function MainNavBar() {
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
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 235}} //가로 길이
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <section className='snb_user_info_wrap' style={{'background': 'red'}}>
        {/* 유저 정보 저장 */}
        {/* 로그인 하면 유저 정보 표시 */}
        {/* 로그인 안되어 있으면 Me 표시 */}

        {/* if 로그인 안된 경우 */}
        <img src="" alt='유저 아이콘' />
        <h1 className='snb_user_info_title'>me</h1>
        <p></p>
        <button>가입하기</button>


        {/* if 로그인 된 경우 */}
        <img src="" alt='유저 아이콘'/>
        <h1 className='snb_user_info_title'>유저 닉네임</h1>
        <p>유저 이메일</p>
      </section>
      <section className='snb_user_follow_info_wrap'
      style={{'background': 'gray'}}
      >
        <p className='snb_user_follower'>{`숫자`}팔로워</p>
        <p className='snb_user_following'>{`숫자`}팔로잉</p>
      </section>
      <Divider />
      <section className='snb_goal_wrap'
      style={{'background': 'blue'}}
      >
        <h2 className='snb_goal_title'>목표</h2>
      </section>
      <Divider />
      <section className='snb_routine_wrap'
      style={{'background': 'green'}}>
        <h2 className='snb_routine_title'>기한이 있는 할  일</h2>
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
