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
    "introText": "팔로우테스트1 투두입니다~~",
    "email": "77777@gmail.com",
    "account": "test1",
    "name": "팔로우테스트1",
    "id": 1
  },
  {
    "introText": "🥛팔로우테스트2 투두입니다~~",
    "email": "5555@gmail.com",
    "account": "test1",
    "name": "팔로우테스트2",
    "id": 2
  },
  {
    "introText": "팔로우테스트3 투두입니다~~",
    "email": "6666@gmail.com",
    "account": "test1",
    "name": "팔로우테스트3",
    "id": 3
  },
            
]



export default function Following() {

// state 테스트 더미 데이터 시작 
// usestate 생성 -> 팔로워 삭제 시 화면에서만 일시적으로 저장되도록 우선 구현 

//let [following, setFollowing] = useRecoilState(followData); // 팔로우data
let [following, setFollowing] = useState(FollowingData);

let testarray = JSON.parse(JSON.stringify(following));
const isThereFollower = testarray.length;

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
      <div className="follow-follow-list-wrap" >

      { isThereFollower ?

      <React.Fragment>

      {testarray.map((data) => { 
           return (
           
              <List // 넓이 조정 
                  sx={{ width: '100%'}}
                  style={{position:'relative'}} 
                  key={data.strUserName}  disablePadding>
                      
                          {/* isfollowing 값을 true/false ? -> 문법 오류 해결 */}
                  
                      
                              <div className="follow-list-box" key={data.id}> 
                               
                              <div className='setting-settings-list-wrap' id={data.name} name={data.name}>
                                            <div className="setting-list-box" >
                
                                        
                                            <div className="settings-list-text" ><p>{data.name}</p></div>
                                            <div className="follow-list-name-icon-wrap"  onClick={handleClickOpen} sx={{ color:"black"}}>
                                                <MoreHorizIcon color="disabled" className="follow-list-name-icon"/></div>
            
                                            </div>
                                            
                                                    <div className="follows-list-box" id={data.id}>
                                                        <div  className="follow-list-button" id={data.id}>
                                                            
                                                            <p className="follow-list-text" >{data.introText}</p>
                                                                
                                                        </div> 
                                                    </div>
                                      
                                         

                                        </div>

                
                              {/* 마우스 호버 변경, Dialog 위치 조정, height 등 style 변경 */}
                              <Dialog
                                  sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 432 } }}
                                  maxWidth="sm"
                                  open={open}
                                  >
                                  <Stack spacing={1} >
                                      <Button autoFocus data-index={data.strUserId} onClick={handleFollowingChange}  color="error">언팔로우</Button>
                                      <Button onClick={handleClose}>취소</Button>
                                  </Stack>
                                 
                              </Dialog>
                              </div> 
                           
                          
                      
                   
                      
              </List>  )})}</React.Fragment> : <div className="null-text">목록 없음</div> }

  </div>

    
    )} 