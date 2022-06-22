import React, { useEffect, useState } from "react";
import axios from 'axios';

import List from '@mui/material/List';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';

import '../../stylesheets/Follow.css';
import { testFollowerData } from "../../atoms/todoData";
import { useRecoilState } from "recoil";


export default function FollowerTest(data) {

    let [testFollower, setTestFollower] = useRecoilState(testFollowerData);
    let testarray = JSON.parse(JSON.stringify(testFollower));
    //let followerData = JSON.parse(JSON.stringify(data));

// state 테스트 더미 데이터 시작 
// usestate 생성 -> 팔로워 삭제 시 화면에서만 일시적으로 저장되도록 우선 구현 

    //const follower = Object.values(data);
    const followerId = parseInt(data.data.id);
    const followerList = data.data;
    console.log('testarray type', typeof data.data);
    console.log('testarray id', followerId);
    //console.log('data', followerList);
   
    function deleteArr(e) {
        //const copy_data = Array.from(data);
        //const copy_data = Object.values(data);
        const copy_data = [...testarray]
        console.log('copydata type', typeof copy_data); // obejct
        console.log('data', copy_data);
        
        let selectedId = e.target.id;
        console.log('e', e.target.id)
        //console.log('data with index', copy_data[id]) // undefined
        //const removeArr = copy_data.splice(copy_data[selectedId], 1)
       
        const removeArr = copy_data.filter(followers => followers.id !== parseInt(selectedId));

        setTestFollower(removeArr); //setTestFollower를 이용해 state 변경
        console.log('newarray', removeArr);
        //deleteGoalData(originID); //deleteGoalData를 이용해 api를 변경
        setOpen(false);
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (e) => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
            <React.Fragment>

                <List // 넓이 조정 
                    sx={{ width: '100%' }}
                        style={{ position: 'relative' }}
                    key={followerList.id} disablePadding id={followerList.id} >

                        {/* isfollowing 값을 true/false ? -> 문법 오류 해결 */}

                        <div className="follow-list-box" key={followerList.following.account} id={followerList.following.id} >

                            <div className='setting-settings-list-wrap' id={followerList.following.id} name={followerList.following.name} >
                                <div className="setting-list-box" >
                                    <div className="settings-list-text" sx={{ color: "black" }}><p>{followerList.following.name}</p></div>
                                    <div className="follow-list-name-icon-wrap" onClick={handleClickOpen} sx={{ color: "black" }}>
                                        <MoreHorizIcon color="disabled" className="follow-list-name-icon" /></div>
                                </div>
                                
                                <div className="follows-list-box" id={followerList.following.id}>
                                    <div className="follow-list-button" id={followerList.following.id}>
                                        <p className="follow-list-text" >{followerList.following.introText}</p>
                                    </div> 
                                </div>
           
                            </div>


                            {/* 마우스 호버 변경, Dialog 위치 조정, height 등 style 변경 */}
                            <Dialog
                                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 432 } }}
                                maxWidth="sm" 
                                open={open}>
                                <Stack spacing={1}>
                                    <Button autoFocus  id={followerList.following.id} key={followerList.following.id}
                                    onClick={deleteArr} color="error">팔로워 삭제</Button>
                                    <Button onClick={handleClose}>취소</Button>
                                </Stack>
                            </Dialog>

                        </div>

            </List></React.Fragment> 
    )
}