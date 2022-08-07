import React, { Suspense, useEffect } from "react";
import { useRecoilState } from "recoil";
import MainNavBar from "../nav/MainNavBar";
import CalendarBox from './CalendarBox';
import Feed from "./Feed";
import Explore from './Explore';

import { objFeedCalendarOverview } from "../../atoms/todoData";


import { Avatar, Stack } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';


export default function Main() {

  /* props 선언 시작 */

  let [atomCalendarData, setAtomCalendarDate] = useRecoilState(objFeedCalendarOverview)
  console.log('atomCalendarData: ', atomCalendarData);

  /* props 선언 끝 */

  /* 함수 선언 시작 */

  let calendarData = atomCalendarData;
  //목표 생성 페이지 이동
  function moveExForm() {
    window.location.replace("/exploreSearch")
  }

  return (
    <Suspense fallback={<div>Loading... </div>}>
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
            <Explore />
            <CalendarBox calendarData={calendarData} />
          </section>
          <Feed />
        </section>
      </section>
    </Suspense>
  );
}
