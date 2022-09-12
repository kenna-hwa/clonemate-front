import React, { Suspense, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import MainNavBar from "../nav/MainNavBar";
import CalendarBox from './CalendarBox';
import Feed from "./Feed";

import { objTodosData, objFeedCalendarDateData } from "../../atoms/todoData";


import { Avatar, Stack } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';

import "../../stylesheets/Main.scss"
import axios from "axios";


export default function Main() {

  /* props 선언 시작 */

  let [atomCalendarData] = useRecoilValue(objFeedCalendarDateData);
  let [atomTodosData, setAtomTodosData] = useRecoilState(objTodosData);
  console.log('atomTodosData: ', atomTodosData);

  /* props 선언 끝 */

  /* 함수 선언 시작 */

  let calendarData = atomCalendarData;


    //목표 생성 페이지 이동
  function moveExForm(){
      window.location.replace("/exploreSearch")
  }



  /* 서버 통신 시작 */

  //캘린더 objFeedCalendarDateData atom에 업데이트 
  const getCalendarData = () => {

  }

  //투두 objTodosData atom에 업데이트
  const getTodosData = async () => {
    //axios
    try {
      const result = await axios.get(`/api/api/v1/todos?userId=1`);
        if(result.status === 200){
          console.log(result.data.data);
          let gettingData = result.data.data;
          setAtomTodosData(gettingData);
          console.log('atomTodosData change: ', atomTodosData);
        }else{
          console.log('통신 실패 : ',result)

          console.log("error", result.status)
        }
    } catch (error) {
      console.error(error);
      console.log('통신 실패 : ', error)
    }
  }


  useEffect(()=>{
    getTodosData()
  })


  return (

    <section id="Main">
      <MainNavBar />
      <section id="Content">
        <section
          id="Explore"
        >
          <Stack direction="row" spacing={1}>
            {/* Following users data 필요 */}
            <Avatar
              sx={{
                backgroundColor: "#fff",
                color: "#111",
                fontWeight: "bold",
                border: "2px solid #222",
              }}
            >
              N
            </Avatar>
            <Avatar
              sx={{
                backgroundColor: "#fff",
                color: "#111",
                fontWeight: "bold",
                border: "2px solid #222",
              }}
            >
              <AddIcon onClick={moveExForm} />
            </Avatar>
          </Stack>
          <h1 className="explore-user-nickname">Nickname</h1>
          <p className="explore-user-info">프로필에 자기소개를 입력해보세요</p>
          <CalendarBox calendarData={calendarData} />
        </section>
        <Feed />
      </section>
    </section>
  );
}
