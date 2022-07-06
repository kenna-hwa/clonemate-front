import React from 'react';
import Box from '@mui/material/Box';
import { Avatar, Stack } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import CalendarBox from './CalendarBox';

import { userIdInfo, testFollowerData } from "../../atoms/todoData";
import { useRecoilState } from "recoil";

export default function Explore(props) {

    // MainNavBar에 있는 로그인한 유저 임시 정보 -> 파라미터 
    // 팔로잉 한 유저 리스트 불러와서 -> 철자의 앞자만 표현하기 

    let [testFollower, setTestFollower] = useRecoilState(testFollowerData);
    let testarray = JSON.parse(JSON.stringify(testFollower));

    let [dtUser, setDtUser] = useRecoilState(userIdInfo);
    let userData = JSON.parse(JSON.stringify(dtUser));
    
    // const 를 사용으로 map 데이터를 받고 변수로 받아오는 함수는 생성하고 
    // 함수를 return 안에 적용하기 
    
    //const name = testarray.following.name;
    //const nickName = name.charAt(0);
    //console.log(nickName);
   


    let calendarData = props.calendarData;
     //목표 생성 페이지 이동
    function moveExForm(){
        window.location.replace("/exploreSearch")
    }

    return (
        <Box className='explore-wrap' 
        sx={{ position: 'relative', width: '24vw', minWidth: '350px', top: 0, padding: '2em'}} >        
            <Stack direction="row" spacing={1}>
                {/* Following users data 필요 */}
                { testarray.map((data, idx)=>{
                    return (
                        <React.Fragment >
                            <Avatar id={idx} 
                            sx={{ backgroundColor: '#fff', color: '#111', fontWeight: 'bold', border: '2px solid #222', zIndex: 1 }}>{data.following.name}</Avatar>
                        </React.Fragment>
                     
                    )
                }) 
                }
                <Avatar sx={{ backgroundColor: '#fff', color: '#111', fontWeight: 'bold', border: '2px solid #222' }}>N</Avatar>
                <Avatar sx={{ backgroundColor: '#fff', color: '#111', fontWeight: 'bold', border: '2px solid #222' }}>
                    <NavigateNextIcon onClick={moveExForm} />
                </Avatar>
            </Stack>
            { userData.map((data, idx)=>{
                    return (
                        <React.Fragment >
                            <h1 className='explore-user-nickname' id={idx} >{data.name}</h1>
                        </React.Fragment>
                     
                    )
                }) 
                }
            <CalendarBox calendarData={calendarData} />       
        </Box>
    );
}