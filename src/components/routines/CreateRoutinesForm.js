import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

import RoutineDayModal from "./RoutineDayModal";
import RoutineDateModal from "./RoutineDateModal";

import { objDatesData, objTodosDataResult } from "../../atoms/todoData";
import { postTodoCreateData } from "../../api/apiCommunicate";

export default function CreateRoutinesForm(props) {
  /* atom 선언 시작 */
  const [dtDate, setDtDate] = useRecoilState(objDatesData);
  const [dtTodos, setDtTodos] = useRecoilState(objTodosDataResult);

  /* atom 선언 끝 */

  /* state 선언 시작 */

  const goal_Id = props.goalId;
  const todo_Id = props.todoId;
  const orderNo = props.orderNo;
  const setIsGoalSelected = props.setIsGoalSelected;
  const todoDataArray = props.todoDataArray;


  let [dayActiveBoolean, setDayActiveBoolean] = useState(false);
  let [dateActiveBoolean, setDateActiveBoolean] = useState(false);
  let [location, setLocation] = useState(null);
  //위의 location 처럼 create에서 작업한다는 신호
  let position = "create";

  let [createRoutinesState, setCreateRoutinesState] = useState({
    "id": todo_Id,
    "goalId": goal_Id,
    "orderNo": orderNo,
    "contents": "",
    "date": dtDate.dtToday,
    "startRepeatDate": dtDate.dtToday,
    "endRepeatDate": dtDate.dtToday,
    "repeatDays": {
        "THU": false,
        "TUE": false,
        "WED": false,
        "SAT": false,
        "FRI": false,
        "MON": false,
        "SUN": false
    }
  });

  // API로 보낼 data
  let translateSendData = {
    "goalId": createRoutinesState.goalId, //묶여있는 goal id
    "orderNo": createRoutinesState.orderNo,
    "contents": createRoutinesState.contents,
    "date": createRoutinesState.date,
    "startRepeatDate": createRoutinesState.startRepeatDate,
    "endRepeatDate": createRoutinesState.endRepeatDate, //반복 종료 일자. 반복 없으면 date 와 값이 같거나 없음
    "isRepeatMon": createRoutinesState.repeatDays["MON"],
    "isRepeatTue": createRoutinesState.repeatDays["TUE"],
    "isRepeatWen": createRoutinesState.repeatDays["WED"],
    "isRepeatThu": createRoutinesState.repeatDays["THU"],
    "isRepeatFri": createRoutinesState.repeatDays["FRI"],
    "isRepeatSat": createRoutinesState.repeatDays["SAT"],
    "isRepeatSun": createRoutinesState.repeatDays["SUN"],
  };

  const dayArr = [
    { dayEng : 'SUN', dayKor : '일', checkYn: createRoutinesState.repeatDays["SUN"]},
    { dayEng : 'MON', dayKor : '월', checkYn: createRoutinesState.repeatDays["MON"]},
    { dayEng : 'TUE', dayKor : '화', checkYn: createRoutinesState.repeatDays["TUE"]},
    { dayEng : 'WEN', dayKor : '수', checkYn: createRoutinesState.repeatDays["WEN"]},
    { dayEng : 'THU', dayKor : '목', checkYn: createRoutinesState.repeatDays["THU"]},
    { dayEng : 'FRI', dayKor : '금', checkYn: createRoutinesState.repeatDays["FRI"]},
    { dayEng : 'SAT', dayKor : '토', checkYn: createRoutinesState.repeatDays["SAT"]},
  ];

  /* state 선언 종료 */

  /* 함수 선언 시작 */

  const checkDate = dayArr.filter((data) => {
    if (data["checkYn"] === true) return data;
  });

  //routines 등록 버튼 클릭 시 함수 실행
  const routinesSubmit = (e) => {
    // createRoutines atom 보내는 로직
    const copy_todo_state = JSON.parse(JSON.stringify(dtTodos)); // dtTodos State 원본 카피
    copy_todo_state.map((data)=>{
        if(data.id === goal_Id){
            data.todos.push(createRoutinesState)
        }
    })
    setDtTodos(copy_todo_state)
    console.log("copy_todo_state 내부", copy_todo_state)

    // createRoutine API로 보내기
    // postTodoCreateData(translateSendData);

  //   const newArr = Array(todoDataArray.length).fill(false);
  //   setIsGoalSelected(newArr);
  console.log("dtTodos 내부", dtTodos)

  };
  console.log("createRoutinesState", createRoutinesState)
  /* 함수 선언 종료 */

  return (
    <div className="create-routines-input-Box">
      <RoutineDayModal
        dayActiveBoolean={dayActiveBoolean}
        setDayActiveBoolean={setDayActiveBoolean}
        dayArr={dayArr}
        createRoutinesState={createRoutinesState}
        setCreateRoutinesState={setCreateRoutinesState}
        position={position}
      />
      <RoutineDateModal
        dateActiveBoolean={dateActiveBoolean}
        setDateActiveBoolean={setDateActiveBoolean}
        createRoutinesState={createRoutinesState}
        setCreateRoutinesState={setCreateRoutinesState}
        location={location}
        position={position}
      />
      <div className="routines-input-title-field">
        <CheckBoxOutlineBlankIcon className="routines-input-check-icon" />
        <input
          id="todo-input"
          className="routines-input-field"
          placeholder="할 일을 입력해주세요."
          type="text"
          maxLength={"50"}
          onChange={(e) => {
            setCreateRoutinesState({
              ...createRoutinesState,
              contents: e.target.value,
            });
          }}
        />
      </div>
      <div
        className="routines-input-startdate-field"
        onClick={() => {
          setDateActiveBoolean(true);
          setLocation(`date`);
        }}
      >
        <span>시작 날짜</span>
        <input
          id="start-date-input"
          className="routines-startdate-input"
          type="text"
          value={createRoutinesState.date}
          readOnly
        />
      </div>
      <div
        className="routines-input-enddate-field"
        onClick={() => {
          setDateActiveBoolean(true);
          setLocation(`endRepeatDate`);
        }}
      >
        <span>종료 날짜</span>
        <input
          id="end-date-input"
          className="routines-enddate-input"
          type="text"
          value={createRoutinesState.endRepeatDate}
          readOnly
        />
      </div>
      <div
        className="routines-input-day-field"
        onClick={() => {
          setDayActiveBoolean(true);
        }}
      >
        <span className="routines-input-day-field-title">반복 요일</span>
        <div className="routines-day-text-wrap">
          {checkDate.map((data) => {
            return (
              <span className="routines-day-text" key={data.dayEng}>
                {data["dayKor"]}
              </span>
            );
          })}
        </div>
      </div>
      <Button
        type="submit"
        className="routines-input-btn"
        onClick={routinesSubmit}
      >
        등록
      </Button>
    </div>
  );
}
