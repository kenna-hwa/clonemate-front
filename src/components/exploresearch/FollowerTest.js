import React, { useEffect, useState } from "react";
import axios from 'axios';

import List from '@mui/material/List';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';

import '../../stylesheets/Follow.css';



export default function FollowerTest(data, index, deleteArr) {

    // state 테스트 더미 데이터 시작 

    console.log('test id', data.index);
    //console.log('index', index);
   

    const getAPI = () => {

        axios.get("https://clonetodo.herokuapp.com/api/v1/todos/1").then(
            (response) => {
                console.log(response);
            }
        );
    };

  
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (e) => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    
   

    return (
        <>
         {/* <div><button onClick={getAPI}>getAPI</button></div> */}
         
        
                    <React.Fragment>

                        <List // 넓이 조정 
                        sx={{ width: '100%' }}
                        style={{ position: 'relative' }}
                        key={data.data.id} disablePadding id={data.data.id} >

                        {/* isfollowing 값을 true/false ? -> 문법 오류 해결 */}


                        <div className="follow-list-box" key={data.data.account} id={data.data.id} >

                            <div className='setting-settings-list-wrap' id={data.data.id} name={data.data.name} >
                                <div className="setting-list-box" >


                                    <div className="settings-list-text" sx={{ color: "black" }}><p>{data.data.name}</p></div>
                                    <div className="follow-list-name-icon-wrap" onClick={handleClickOpen} sx={{ color: "black" }}>
                                        <MoreHorizIcon color="disabled" className="follow-list-name-icon" /></div>

                                </div>
                                
                                        <div className="follows-list-box" id={data.data.id}>
                                            <div className="follow-list-button" id={data.data.id}>

                                                <p className="follow-list-text" >{data.data.introText}</p>

                                            </div> 
                                        </div>
           
                            </div>




                            {/* 마우스 호버 변경, Dialog 위치 조정, height 등 style 변경 */}
                            <Dialog
                                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 432 } }}
                                maxWidth="sm" index={index}
                                open={open}
                            >
                                <Stack spacing={1}>
                                    <Button autoFocus index={index} id={data.data.id} 
                                    onChange={()=>deleteArr(data.index) } color="error">팔로워 삭제</Button>
                                    <Button onClick={handleClose}>취소</Button>
                                </Stack>

                            </Dialog>
                        </div>

                    </List></React.Fragment> 
                                   
        </>
    )
}