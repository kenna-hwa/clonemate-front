import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import CreateRoutinesEndDate from "./CreateRoutinesEndDate";
import CreateRoutinesDate from "./CreateRoutinesDate";
import CreateRoutinesDay from "./CreateRoutinesDay";

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import { goalsData, todoData, objDatesData, dateCalendarOpen, endRepeatDateCalendarOpen, repeatDayCalendarOpen, createRepeatDay } from "../../atoms/todoData";

// input 생성
export default function CreateRoutinesForm(props) {



    /* Hook 선언 시작 */

    const { register, handleSubmit, errors, watch } = useForm({ mode: "onChange" });

    /* atom 시작 */
    

    let goal = useRecoilValue(goalsData);
    let [todo, setTodo] = useRecoilState(todoData);

    let [dayChecked, setDayChecked] = useRecoilState(createRepeatDay);
    let dateData = useRecoilValue(objDatesData);
    let dtToday = dateData.dtToday;
    let [dateCalenderBoolean, setDateCalendarBoolean] = useRecoilState(dateCalendarOpen);
    let [endDateCalenderBoolean, setEndDateCalendarBoolean] = useRecoilState(endRepeatDateCalendarOpen);
    let [repeatDayCalenderBoolean, setRepeatDayCalendarBoolean] = useRecoilState(repeatDayCalendarOpen);

    let [newDate, setNewDate] = useState(dateData.selectedNewDate);
    let [newEndDate, setNewEndDate] = useState(dateData.selectedNewEndDate);


    /* 변수 선언 시작 */
    
    const setIsGoalSelected = props.setIsGoalSelected;
    const selectedGoalId = props.goalId;
    const matchedGoal = todo.filter((data)=>{
        return (data.goalId === selectedGoalId) ;
    }).length;

    let [createRoutinesState, setCreactRoutinesState] = useState({
        "goalId": "", //묶여있는 goal id
        "todoId": "",
        "orderNo": "",
        "title": "",
        "date": "",
        "endRepeatDate": "", //반복 종료 일자. 반복 없으면 date 와 값이 같거나 없음
        "repeatDays":{
            THU: "N",
            WEN: "N",
            TUE: "N",
            SAT: "N",
            FRI: "N",
            MON: "N",
            SUN: "N"
          },
        "checkYn" : "N" //달성여부
      });
      const dayENGKOR =  {
        "SUN": "일", //y 면 일요일 반복, n 이면 반복 x
        "MON": "월",
        "TUE": "화",
        "WED": "수",
        "THU": "목",
        "FRI": "금",
        "SAT": "토",
}

    // let checkedArr = [];
    // //요일 배열화
    // const dayCheckedArr = Object.entries(dayChecked);
    // const dayENGKORArr = Object.entries(dayENGKOR);

    // dayCheckedArr.filter((day)=>{
    // let name = day[0].toString();
    //    if(day[1] === 'Y') return checkedArr.push(dayENGKOR[name])
    // })

      //첫 시작 시 key default 정보 입력
      useEffect(()=>{
        setCreactRoutinesState({...createRoutinesState, goalId: selectedGoalId, todo_id: (matchedGoal+1), next_todo_id: (matchedGoal+2), date: dtToday, endRepeatDate: dtToday, })
      },[])

    /* Hook 선언 끝 */

    /* 함수 선언 시작 */

    //title 작성 시 createState 수정
    const onChangeTitleEventHandler = (e) => {
        setCreactRoutinesState({...createRoutinesState, title: e.target.value})
    }

    // 시작 날짜 클릭 시 Date캘린더 노출 on off
    const handleDateCalendarOpen = () => setDateCalendarBoolean(true);
    const handleDateCalendarClose = () => setDateCalendarBoolean(false);

    // 종료 날짜 클릭 시 EndDate캘린더 노출 on off
    const handleEndDateCalendarOpen = () => setEndDateCalendarBoolean(true);
    const handleEndDateCalendarClose = () => setEndDateCalendarBoolean(false);

    // 반복 요일 클릭 시 Date캘린더 노출 on off
    const handleDayCalendarOpen = () => setRepeatDayCalendarBoolean(true);
    const handleDayCalendarClose = () => setRepeatDayCalendarBoolean(false);

    //캘린더 생성 후 날짜 선택 date 

    const calendarOnChangeDate = (e) => {
        console.log("클릭 후 date", newDate)
        const dtDate = newDate.toJSON().substring(0,10);
        setCreactRoutinesState({...createRoutinesState, date: dtDate })
        handleDateCalendarClose();
    }

    //캘린더 생성 후 날짜 선택 endRepeatDate
    
    const calendarOnChangeEndRepeatDate = () => {
        console.log("클릭 후 newEndDate", newDate)
        const dtDate = newDate.toJSON().substring(0,10);
        if(dtDate<createRoutinesState.date){
            alert("시작 날짜 이후 날짜를 선택해주세요.")
            return false;
        }

        setCreactRoutinesState({...createRoutinesState, endRepeatDate: dtDate })
        handleEndDateCalendarClose();
    }

    //캘린더 생성 후 요일 선택 repeat_day

    const calendarOnChangeRepeatDays = (e) => {
        setCreactRoutinesState({...createRoutinesState, repeatDays: dayChecked })
        handleDayCalendarClose();
    }

    const calendarRoutinesSubmit = (e) => {
        const copy_todo_state = [...todo]; // todo State 원본 카피        
        copy_todo_state.push(createRoutinesState);
        setTodo(copy_todo_state, console.log(copy_todo_state)) ;//setTodo 이용해 state 변경
        const newArr = Array(goal.length).fill(false) ;
        setIsGoalSelected(newArr)
    }

    /* 함수 선언 끝 */

    return  (
            <Box className="create-routines-input-Box">
            <CreateRoutinesDate dateCalenderBoolean={dateCalenderBoolean} setDateCalendarBoolean={setDateCalendarBoolean} todoId={createRoutinesState.todo_id} handleDateCalendarOpen={handleDateCalendarOpen} handleDateCalendarClose={handleDateCalendarClose} calendarOnChangeDate={calendarOnChangeDate} /> 
            <CreateRoutinesEndDate endDateCalenderBoolean={endDateCalenderBoolean} setEndDateCalendarBoolean={setEndDateCalendarBoolean} todoId={createRoutinesState.todo_id} handleEndDateCalendarOpen={handleEndDateCalendarOpen} handleEndDateCalendarClose={handleEndDateCalendarClose} calendarOnChangeEndRepeatDate={calendarOnChangeEndRepeatDate} /> 
            <CreateRoutinesDay repeatDayCalenderBoolean={repeatDayCalenderBoolean} handleDayCalendarClose={handleDayCalendarClose} calendarOnChangeRepeatDays={calendarOnChangeRepeatDays} dayENGKOR={dayENGKOR} /> 
            
                <div className="routines-input-title-field">
                    <CheckBoxOutlineBlankIcon className="routines-input-check-icon"/>
                    <input id="todo-input" className="routines-input-field"  placeholder="할 일을 입력해주세요." type="text" maxLength={"35"} onChange={onChangeTitleEventHandler} /> 
                </div>
                <div className="routines-input-startdate-field" onClick={handleDateCalendarOpen}>
                    <span>시작 날짜</span>
                    <input id="start-date-input" className="routines-startdate-input"  type="text" value={createRoutinesState.date} readOnly /> 
                </div>
                <div className="routines-input-enddate-field" onClick={handleEndDateCalendarOpen}>
                    <span>종료 날짜</span>
                    <input   id="end-date-input" className="routines-enddate-input" type="text" value={createRoutinesState.endRepeatDate} readOnly /> 
                </div>
                <div className="routines-input-day-field" onClick={handleDayCalendarOpen}>
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
                <Button type="submit" className="routines-input-btn" onClick={calendarRoutinesSubmit}>등록</Button>
            
            </Box>
            )
}
