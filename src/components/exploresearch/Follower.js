import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";


import List from '@mui/material/List';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import API from '../../api/API';
import axios from 'axios';

import '../../stylesheets/Follow.css';

//  ** 할일 **
// 팔로워 의 설정 버튼 팝업 확인하기 
// 팔로워 관련 함수  ex) 차단, 혹은 삭제 등 

// style : 화면의 넓이, font, fontsize 조정 

//https://jsonplaceholder.typicode.com/todos/1
//https://clonetodo.herokuapp.com/users?page=2

/* const login = () => {
  
    const data = {
        account: "test",
        "password":"1234"
    }
    axios.defaults.withCredentials = true;

    axios.post("https://clonetodo.herokuapp.com/login", data).then(
        (response) => {
            console.log(response);
        }
    );
}; */

const getAPI = () => {
  
    axios.get("https://clonetodo.herokuapp.com/api/v1/goals/1").then(
        (response) => {
            console.log(response);
        }
    );
};


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
          "ynComplete": "Y",
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
    let newFollower = thisData.filter(item => item.strUserId !== userId)

    setFollower(newFollower);
    console.log('newFollwer', newFollower);

    setOpen(false);
    //window.location.replace(`/exploreSearch/`);
    
};


    return (


        <div className="follow-follow-list-wrap" >
            {/* <div><button onClick={login}>login</button></div> 
            <div><button onClick={getAPI}>getAPI</button></div>*/}
       
            {/* useRecoilState 로는 작동하는 false의 목록없음이 dummy data 로는 작동 X 왜?? */}
            {follower.map((data =>
             data.strUserId.length > 0 ? (
                 
                    <List // 넓이 조정 
                        sx={{ width: '100%'}}
                        style={{position:'relative'}} 
                        key={data.strUserName}  disablePadding>
                            
                                {/* isfollowing 값을 true/false ? -> 문법 오류 해결 */}
                        
                         
            
                                    <div className="follow-list-box" key={data.strUserId}> 
                                    
                                        <div className='setting-settings-list-wrap' id={data.strUserName} name={data.strUserName}>
                                            <div className="setting-list-box" >
                
                                        
                                            <div className="settings-list-text" sx={{ color:"black"}}><p>{data.strUserName}</p></div>
                                            <div className="follow-list-name-icon-wrap"  onClick={handleClickOpen} sx={{ color:"black"}}>
                                                <MoreHorizIcon color="disabled" className="follow-list-name-icon"/></div>
            
                                            </div>
                                            {data.dtTodo.map(e => {
                                                return e.ynComplete === "Y" ? 
                                                    <div className="follows-list-box" id={e.goal_id}>
                                                        <div  className="follow-list-button" id={e.goal_id}>
                                                            
                                                            <p className="follow-list-text" >{e.todo_title}</p>
                                                                
                                                        </div> 
                                                    </div>: null}
                                      
                                            )}

                                        </div>

                                        
                                    

                                    {/* 마우스 호버 변경, Dialog 위치 조정, height 등 style 변경 */}
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
                                    </div> 
                              
                                
                            
                         
                            
                    </List> ) : <p>"목록 없음"</p> )
            )}
     
        </div>
  )
 }