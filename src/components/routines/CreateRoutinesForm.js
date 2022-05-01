import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import RoutineDayModal from './RoutineDayModal';
import RoutineDateModal from './RoutineDateModal';

import { objDatesData, objTodosDataResult } from "../../atoms/todoData";

export default function CreateRoutinesForm (props) {

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

    console.log("create goal_Id", goal_Id, "todo_Id", todo_Id, "orderNo", orderNo)

    let [dayActiveBoolean, setDayActiveBoolean] = useState(false);
    let [dateActiveBoolean, setDateActiveBoolean] = useState(false);
    let [location, setLocation] = useState(null)
    //위의 location 처럼 create에서 작업한다는 신호
    let position = 'create'

    let [createRoutinesState, setCreatRoutinesState] = useState({
        "goalId": goal_Id, //묶여있는 goal id
        "id": todo_Id,
        "orderNo": orderNo,
        "title": "",
        "date": dtDate.dtToday,
        "startRepeatDate": dtDate.dtToday,
        "endRepeatDate": dtDate.dtToday, //반복 종료 일자. 반복 없으면 date 와 값이 같거나 없음
        "repeatMonYn":"n",
        "repeatTueYn":"n",
        "repeatWenYn":"n",
        "repeatThuYn":"n",
        "repeatFriYn":"n",
        "repeatSatYn":"n",
        "repeatSunYn":"n",
        "checkYn": "n"
      });
      const dayArr = [
        { dayEng : 'SUN', dayKor : '일', checkYn: createRoutinesState.repeatSunYn},
        { dayEng : 'MON', dayKor : '월', checkYn: createRoutinesState.repeatMonYn},
        { dayEng : 'TUE', dayKor : '화', checkYn: createRoutinesState.repeatTueYn},
        { dayEng : 'WEN', dayKor : '수', checkYn: createRoutinesState.repeatWenYn},
        { dayEng : 'THU', dayKor : '목', checkYn: createRoutinesState.repeatThuYn},
        { dayEng : 'FRI', dayKor : '금', checkYn: createRoutinesState.repeatFriYn},
        { dayEng : 'SAT', dayKor : '토', checkYn: createRoutinesState.repeatSatYn},
      ];

    /* state 선언 종료 */

    /* 함수 선언 시작 */

    const checkDate = dayArr.filter(data=>{
        if(data['checkYn'] === "y") return data
    })
    


    const routinesSubmit = (e) => {
        const copy_todo_state = JSON.parse(JSON.stringify(dtTodos)); // dtTodos State 원본 카피        
        copy_todo_state.map((data)=>{
            if(data.id === goal_Id){
                console.log(data.todos)
                data.todos.push(createRoutinesState)
            }
        })
        setDtTodos(copy_todo_state)
        const newArr = Array(todoDataArray.length).fill(false);
        setIsGoalSelected(newArr)
    }
    
    /* 함수 선언 종료 */

    return (
        <div className="create-routines-input-Box">
        <RoutineDayModal 
        dayActiveBoolean={dayActiveBoolean} 
        setDayActiveBoolean={setDayActiveBoolean} 
        dayArr={dayArr}
        createRoutinesState={createRoutinesState}
        setCreatRoutinesState={setCreatRoutinesState}
        position={position}

        />
        <RoutineDateModal 
        dateActiveBoolean={dateActiveBoolean}
        setDateActiveBoolean={setDateActiveBoolean}
        createRoutinesState={createRoutinesState}
        setCreatRoutinesState={setCreatRoutinesState}
        location={location}
        />
        <div className="routines-input-title-field">
                    <CheckBoxOutlineBlankIcon className="routines-input-check-icon"/>
                    <input id="todo-input" className="routines-input-field"  placeholder="할 일을 입력해주세요." type="text" maxLength={"50"} 
                    onChange={(e)=>{
                        setCreatRoutinesState({
                            ...createRoutinesState, title: e.target.value
                        })
                    }}
                    /> 
                </div>
                <div className="routines-input-startdate-field" onClick={()=>{
                    setDateActiveBoolean(true)
                    setLocation(`date`)
                    }}>
                    <span>시작 날짜</span>
                    <input id="start-date-input" className="routines-startdate-input"  type="text" value={createRoutinesState.date} readOnly /> 
                </div>
                <div className="routines-input-enddate-field"
                onClick={()=>{
                    setDateActiveBoolean(true)
                    setLocation(`endRepeatDate`)
                    }} >
                    <span>종료 날짜</span>
                    <input id="end-date-input" className="routines-enddate-input" type="text" value={createRoutinesState.endRepeatDate} readOnly /> 
                </div>
                <div className="routines-input-day-field" onClick={()=>{setDayActiveBoolean(true)}} >
                    <span className="routines-input-day-field-title">반복 요일</span>
                    <div className="routines-day-text-wrap">
                        {checkDate.map((data)=>{
                            return <span className="routines-day-text" key={data.dayEng}>{data['dayKor']}</span>
                        })}
                    </div>
                </div>
                <Button type="submit" className="routines-input-btn" onClick={routinesSubmit}>등록</Button>
        </div>
    )

}