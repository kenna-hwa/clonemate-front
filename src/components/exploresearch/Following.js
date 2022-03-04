import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


import "../../stylesheets/Follow.css";

//  ** 할일 **
// 유저 버튼 -> 언팔로우 시 => isfollowing:false 로 변경 이 아니고 !
// 유저 버튼 -> 해당 유저를 불러온 데이터에서 제외하고, update된 usestate의 데이터 갱신 
// 각 유저 클릭 -> 해당 유저 feed로 이동 



const FollowingData = [
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



export default function Following() {


/* atom 시작 */
//let [following, setFollowing] = useRecoilState(followData); // 팔로우data
let [following, setFollowing] = useState(FollowingData);


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

      const thisData = [...following];
      let newFollowing = thisData.filter(item => item.strUserId !== userId)

      setFollowing(newFollowing);
      console.log(newFollowing)

      setOpen(false);
      //window.location.replace(`/exploreSearch/`);
      
  };


    return (
        <Box 
            sx={{ width: '100%', bgcolor: 'background.paper' }} 
            textAlign='center' 
            style={{ position:'relative'}}>

        {following.map((data => data.strUserId.length > 0 ? (
             
                <List
        
                sx={{ width: '100%'}}
                style={{position:'relative'}} 
        
                component="div" disablePadding>
        

                {/* Button click 효과 및 css 수정 */}
                 <div className="container" key={data.strUserId} > 
                    {/* 왜 div 하나 차이로 레이아웃이 달라지는지 모르겠음 */}
                    <ListItemButton>
                        <Stack>
                            <ListItemText
                                className="button">   
                                {data.strUserName}
                            </ListItemText> 
                
                             {/*{data.dtTodo.map(e => {
                                    return e.ynComplete === "Y" ? 
                                     <React.Fragment>
                                            <ListItemText
                                              secondary={e.todo_title}>  
                                         </ListItemText> 
                                        </React.Fragment> : null}
                             )} */}

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
                         <Button autoFocus data-index={data.strUserId} onClick={handleFollowingChange} color="error">언팔로우</Button>
                         <Button onClick={handleClose}>취소</Button>
                     </Stack>
               
                    </Dialog>

                 
                </List> ) : <p>"목록 없음"</p> )
             
           )}
     
        </Box>
    
    )} 