import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';

import '../../stylesheets/Follow.css';

//  ** 할일 **
// 팔로워 의 설정 버튼 팝업 확인하기 
// 팔로워 관련 함수  ex) 차단, 혹은 삭제 등 

// style : 화면의 넓이, font, fontsize 조정 


const FollowerData = [
    {
    "strUserName": "🍈메로나",
    "strUserId" : "merona",
    "strUserEmail": "useremail@email.com",
    "strUserInfo": "🍈메로나의 투두리스트입니다",
    "dtTodo": [{
          "goal_id": 1,
          "todo_id": 0,
          "bg_color": "#2121fe",
          "todo_title": "sample의 할 일",
          "ynComplete": "Y",
      },
    {
          "goal_id": 1,
          "todo_id": 1,
          "bg_color": "#2121fe",
          "todo_title": "sample의 할 일2",
          "ynComplete": "N",
      },
      {
          "goal_id": 1,
          "todo_id": 0,
          "bg_color": "#2121fe",
          "todo_title": "sample의 할 일",
          "ynComplete": "Y",
      }],
    "isFollower": true,
    "isFollowing": true,
  },
  
  {
    "strUserName": "두두",
    "strUserId" : "dodo",
    "strUserEmail": "useremail@email.com",
    "strUserInfo": "dodo의 투두리스트입니다",
    "dtTodo": [{
          "goal_id": 1,
          "todo_id": 0,
          "bg_color": "#2121fe",
          "todo_title": "sample의 할 일",
          "ynComplete": "Y",
      },
    {
          "goal_id": 1,
          "todo_id": 1,
          "bg_color": "#2121fe",
          "todo_title": "sample의 할 일2",
          "ynComplete": "N",
      },
      {
          "goal_id": 1,
          "todo_id": 0,
          "bg_color": "#2121fe",
          "todo_title": "sample의 할 일",
          "ynComplete": "Y",
      }],
    "isFollower": true,
    "isFollowing": true,
  },
  {
    "strUserName": "주영",
    "strUserId" : "주영",
    "strUserEmail": "useremail@email.com",
    "strUserInfo": "주영의 투두리스트입니다",
    "dtTodo": [{
          "goal_id": 1,
          "todo_id": 0,
          "bg_color": "#2121fe",
          "todo_title": "🥛우유마시기",
          "ynComplete": "Y",
      },
    {
          "goal_id": 1,
          "todo_id": 1,
          "bg_color": "#2121fe",
          "todo_title": "스터디카페가기",
          "ynComplete": "N",
      },
      {
          "goal_id": 1,
          "todo_id": 0,
          "bg_color": "#2121fe",
          "todo_title": "햄버거 냠냠🍔",
          "ynComplete": "Y",
      }],
    "isFollower": false,
    "isFollowing": true,
  }  
            
]




export default function Follower() {


 /* atom 시작 */
//let [following, setFollowing] = useRecoilState(followData);// 팔로우data
let [follower, setFollower] = useState(FollowerData);


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };



const handleFollowingChange = (e) => {
    
    let userId = e.target.dataset.index;
    console.log('current user', userId);

    const thisData = [...follower];
    let newFollowing = thisData.filter(item => item.strUserId !== userId)

    setFollower(newFollowing);
    console.log(newFollowing)

    setOpen(false);
    //window.location.replace(`/exploreSearch/`);
    
};


    return (
        <Box 
            sx={{ width: '100%', bgcolor: 'background.paper' }} 
            textAlign='center' 
            style={{ position:'relative'}}>

            {/* useRecoilState 로는 작동하는 false의 목록없음이 dummy data 로는 작동 X 왜?? */}
            {follower.map((data => data.strUserId.length > 0 ? (
                 
                    <List // 넓이 조정 
                        sx={{ width: '100%'}}
                        style={{position:'relative'}} 
                        key={data.strUserName} component="div" disablePadding>
                            
                                {/* isfollowing 값을 true/false ? -> 문법 오류 해결 */}
                           
                                 <React.Fragment>
                                {/* Button click 효과 및 css 수정 */}
                                    
                                    <div className="container" key={data.strUserId}> 
                                    {/* 왜 div 하나 차이로 레이아웃이 달라지는지 모르겠음 */}
                                     <ListItemButton>
                                        <Stack>
                                            <ListItemText
                                                className="button"
                                                primary={data.strUserName}>   
                                            </ListItemText> 

                                                {data.dtTodo.map(e => {
                                                    return e.ynComplete === "Y" ? 
                                                        <React.Fragment key={e.goal_id}>
                                                            <ListItemText
                                                                secondary={e.todo_title}>  
                                                            </ListItemText> 
                                                        </React.Fragment> : null}
                                                )}

                                        </Stack>
                                     </ListItemButton> 

                                     <Button  className="button1" onClick={handleClickOpen}>
                                        <MoreHorizIcon color="disabled"/> 
                                     </Button>
                                     
                                    </div> 

                                    {/* Dialog 위치 조정, height 등 style 변경 */}
                                    <Dialog
                                        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 432 } }}
                                        maxWidth="sm"
                                        open={open}
                                        >
                                        <Stack spacing={1} >
                                            <Button autoFocus data-index={data.strUserId} onClick={handleFollowingChange}  color="error">팔로워 삭제</Button>
                                            <Button onClick={handleClose}>취소</Button>
                                        </Stack>
                                       
                                    </Dialog>
                                 </React.Fragment>
                                
                            
                         
                            
                    </List> ) : <p>"목록 없음"</p> )
            )}
                
     
        </Box>
  )
 }