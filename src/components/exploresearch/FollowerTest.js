import React, { useEffect, useState } from "react";
<<<<<<< Updated upstream
import { useParams } from "react-router-dom";
=======
>>>>>>> Stashed changes


import { useRecoilState, useRecoilValue } from "recoil";
import { testDummyData, testFollowerData } from "../../atoms/todoData";
import '../../stylesheets/Follow.css';

import List from '@mui/material/List';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import axios from 'axios';
<<<<<<< Updated upstream
=======
import Box from '@mui/material/Box';
>>>>>>> Stashed changes


export default function FollowerTest() {

    // state 테스트 더미 데이터 시작 
<<<<<<< Updated upstream
    const [testDummy, setTestDummy] = useRecoilState(testDummyData);
    let testDataArray = JSON.parse(JSON.stringify(testDummy));
    //console.log("test", testDummy)

    let [testFollower, setTestFollower] = useRecoilState(testFollowerData);
    let testFollowerArray = JSON.parse(JSON.stringify(testFollower));

=======

    let [testFollower, setTestFollower] = useRecoilState(testFollowerData);
    let testFollowerArray = JSON.parse(JSON.stringify(testFollower));
    console.log('test follower', testFollowerArray);
    console.log('test follower length', testFollowerArray.length);
    let [isThereFollower, setIsThereFollower] = useState(Array(testFollowerArray.length).fill(false) );
    const isFollowers = testFollowerArray.length;

    const getAPI = () => {

        axios.get("https://clonetodo.herokuapp.com/api/v1/todos/1").then(
            (response) => {
                console.log(response);
            }
        );
    };
>>>>>>> Stashed changes

    // state 테스트 더미 데이터 끝
    
    //let [follower, setFollower] = useState(FollowerData);
    //let [testdata, settestdata] = useState(getTodosOverviewData);

<<<<<<< Updated upstream
=======
    


>>>>>>> Stashed changes
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



<<<<<<< Updated upstream
    const handleFollowingChange = (e) => {

        let userId = e.target.dataset.index;
=======
    const deleteFollower = (e) => {

        //팔로워 삭제 함수
        //const copy_follower = [...testFollower]
        //let newFollowerArr = copy_follower.filter(follower =>  follower.id != originID
        //)
        //setTestFollower(newFollowerArr); //setTestFollower를 이용해 state 변경
        //deleteFollowerData(originID); //deleteFollowerData를 이용해 api를 변경
        //setOpen(false);
    
        let userId = e.target.dataset.index;
        console.log('current target', e.target);
        console.log('current dataset', e.target.dataset);
>>>>>>> Stashed changes
        console.log('current user', userId);

        const thisData = [...testFollowerArray];
        let newFollower = thisData.filter(item => item.id !== userId)

        setTestFollower(newFollower);
        console.log('newFollwer', newFollower);

        setOpen(false);
        //window.location.replace(`/exploreSearch/`);

    };

<<<<<<< Updated upstream
    return (
        <>
        {/* <div><button onClick={getAPI}>getAPI</button></div> */}
            {testFollowerArray.map((data =>
                data.account.length > 0 ? (

                    <List // 넓이 조정 
=======
   

    return (
        <>
         {/* <div><button onClick={getAPI}>getAPI</button></div> */}
         { isFollowers ? 
        
                    <React.Fragment>

                    { testFollowerArray.map((data => (


                        <List // 넓이 조정 
>>>>>>> Stashed changes
                        sx={{ width: '100%' }}
                        style={{ position: 'relative' }}
                        key={data.id} disablePadding>

                        {/* isfollowing 값을 true/false ? -> 문법 오류 해결 */}


                        <div className="follow-list-box" key={data.id}>

                            <div className='setting-settings-list-wrap' id={data.name} name={data.name}>
                                <div className="setting-list-box" >


                                    <div className="settings-list-text" sx={{ color: "black" }}><p>{data.name}</p></div>
                                    <div className="follow-list-name-icon-wrap" onClick={handleClickOpen} sx={{ color: "black" }}>
                                        <MoreHorizIcon color="disabled" className="follow-list-name-icon" /></div>

                                </div>
                                
                                        <div className="follows-list-box" id={data.id}>
                                            <div className="follow-list-button" id={data.id}>

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
<<<<<<< Updated upstream
                                    <Button autoFocus data-index={data.id} onClick={handleFollowingChange} color="error">팔로워 삭제</Button>
=======
                                    <Button autoFocus data-index={data.id} onClick={deleteFollower} color="error">팔로워 삭제</Button>
>>>>>>> Stashed changes
                                    <Button onClick={handleClose}>취소</Button>
                                </Stack>

                            </Dialog>
                        </div>





<<<<<<< Updated upstream
                    </List>) : <p>"목록 없음"</p>)
            )}





            {testDataArray.map((data, idx)=>{
                    return (
                      <div key={data.userId}  id={idx} className="test-box">
                            <p key={data.userId}  className="test-text">
                                {data.title}</p>
                      </div>
                      
                    )
                }) 
                }
    
=======
                    </List>)))}</React.Fragment> : <Box><p>목록 없음</p></Box> }
                        
            
>>>>>>> Stashed changes
           
        </>
    )
}
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
