import React, { Suspense, useEffect } from "react";
import { useRecoilState } from "recoil";
import MainNavBar from "../nav/MainNavBar";
import CalendarBox from './CalendarBox';
import Feed from "./Feed";

import { objFeedCalendarOverview } from "../../atoms/todoData";


import { Avatar, Stack } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';


export default function Main() {

  /* props 선언 시작 */

  let [atomCalendarData, setAtomCalendarDate] = useRecoilState(objFeedCalendarOverview)

  /* props 선언 끝 */

  /* 함수 선언 시작 */

  let calendarData = atomCalendarData;
     //목표 생성 페이지 이동
    function moveExForm(){
        window.location.replace("/exploreSearch")
    }

  return (

    <section id="main">
      <MainNavBar />
      <section id="content">
        <section
          id="Explore"
          sx={{
            position: "relative",
            width: "24vw",
            top: 0,
            padding: "2em",
          }}
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
