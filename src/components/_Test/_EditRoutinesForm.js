import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Box, Button } from "@mui/material";

import { goalsData, todoData, datesData, dateCalendarOpen, endRepeatDateCalendarOpen, selectedNewDate, selectedNewEndDate, repeatDayCalendarOpen, createRepeatDay } from "../../atoms/todoData";

// 할 일 클릭 - 수정 모달 - input 생성
export default function EditRoutinesForm(props) {

    /* Hook 선언 시작 */
    const todo_id = props.todo_id;
    const goal_id = props.goal_id;
    console.log("todo", todo_id, "goal", goal_id)

    /* atom 시작 */

    let goal = useRecoilValue(goalsData);
    let [todo, setTodo] = useRecoilState(todoData);
    console.log("todo index", todo[todo_id])
    let [dayChecked, setDayChecked] = useRecoilState(createRepeatDay);

    /* Hook 선언 끝 */
    const dayENGKOR =  {
        "SUN": "일", //y 면 일요일 반복, n 이면 반복 x
        "MON": "월",
        "TUE": "화",
        "WED": "수",
        "THU": "목",
        "FRI": "금",
        "SAT": "토",
}
    let checkedArr = [];
    //요일 배열화
    const dayCheckedArr = Object.entries(dayChecked);
    const dayENGKORArr = Object.entries(dayENGKOR);

    dayCheckedArr.filter((day)=>{
    let name = day[0].toString();
       if(day[1] === 'Y') return checkedArr.push(dayENGKOR[name])
    })


    /* 함수 선언 시작 */

    /* 함수 선언 끝 */

    return  (
            <Box className="edit-routines-input-Box">
                <div className="routines-input-startdate-field">
                <span>시작 날짜</span>
                <input id="start-date-input" className="routines-startdate-input"  type="text" value={''} readOnly /> 
                </div>
                <div className="routines-input-enddate-field">
                    <span>종료 날짜</span>
                    <input   id="end-date-input" className="routines-enddate-input" type="text" value={''} readOnly /> 
                </div>
                <div className="routines-input-day-field" >
                    <span>반복 요일</span>
                    <div className="routines-day-text-wrap">
                    {
                    checkedArr.length != 7? (checkedArr.map((data)=>{
                        return (<i className="routines-day-text">{data}</i>)
                    })) : (<i className="routines-day-text">매일</i>)
                    }
                    </div>
                </div>
                <input id="routines-goal-id-input" className="routines-goal-create-id" type="hidden" value={''} readOnly/> 
                <Button type="submit" className="routines-input-btn" >등록</Button>
            
            </Box>
            )
}
