import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "@mui/material";

import { objDatesData, objTodosData } from "../../atoms/todoData";
// import { patchTodosChangeDate } from "../../api/apiCommunicate";

import RoutineDayModal from './RoutineDayModal';
import RoutineDateModal from './RoutineDateModal';



// 할 일 클릭 - 수정 모달 - input 생성
export default function EditRoutinesForm(props) {

        /* atom 선언 시작 */
        const [dtDate, setDtDate] = useRecoilState(objDatesData);
        const [dtTodos, setDtTodos] = useRecoilState(objTodosData);
        /* atom 선언 종료 */

        /* state 선언 시작 */

        const todos = props.todos;
        const setReadOnly = props.setReadOnly;
        const editContents = props.editContents;
        // location 변수로 날짜 선택 캘린더 모달 등장 시 입력할 날짜 정보가 어디인지 (date, endRepeatDate)
        let [location, setLocation] = useState(null);
        //위의 location 처럼 edit에서 작업한다는 신호
        let position = 'edit';

        let [editRoutinesState, setEditRoutinesState] = useState({
            "id": todos.id,
            "goalId": todos.goalId,
            "orderNo": todos.orderNo,
            "contents": editContents,
            "date": todos.date,
            "startRepeatDate": todos.startRepeatDate,
            "endRepeatDate": todos.endRepeatDate,
            "repeatDays": todos.repeatDays,
            "isChecked": todos.isChecked,
            "likes": todos.likes
        });

        // API로 보낼 data
        let translateSendData = {
            "goalId": editRoutinesState.goalId, //묶여있는 goal id
            "orderNo": editRoutinesState.orderNo,
            "contents": editContents,
            "date": editRoutinesState.date,
            "startRepeatDate": editRoutinesState.startRepeatDate,
            "endRepeatDate": editRoutinesState.endRepeatDate, //반복 종료 일자. 반복 없으면 date 와 값이 같거나 없음
            "isRepeatMon":editRoutinesState.repeatDays[`MON`],
            "isRepeatTue":editRoutinesState.repeatDays[`TUE`],
            "isRepeatWen":editRoutinesState.repeatDays[`WEN`],
            "isRepeatThu":editRoutinesState.repeatDays[`THU`],
            "isRepeatFri":editRoutinesState.repeatDays[`FRI`],
            "isRepeatSat":editRoutinesState.repeatDays[`SAT`],
            "isRepeatSun":editRoutinesState.repeatDays[`SUN`]
        };

        let [dayActiveBoolean, setDayActiveBoolean] = useState(false);
        let [dateActiveBoolean, setDateActiveBoolean] = useState(false);

        const dayArr = [
            { dayEng : 'SUN', dayKor : '일', checkYn: editRoutinesState.repeatDays[`SUN`]},
            { dayEng : 'MON', dayKor : '월', checkYn: editRoutinesState.repeatDays[`MON`]},
            { dayEng : 'TUE', dayKor : '화', checkYn: editRoutinesState.repeatDays[`TUE`]},
            { dayEng : 'WEN', dayKor : '수', checkYn: editRoutinesState.repeatDays[`WEN`]},
            { dayEng : 'THU', dayKor : '목', checkYn: editRoutinesState.repeatDays[`THU`]},
            { dayEng : 'FRI', dayKor : '금', checkYn: editRoutinesState.repeatDays[`FRI`]},
            { dayEng : 'SAT', dayKor : '토', checkYn: editRoutinesState.repeatDays[`SAT`]},
        ];

        /* state 선언 종료 */

        /* 함수 선언 시작 */

        const checkDate = dayArr.filter(data=>{
            if(data['checkYn'] === true) return data
        })

    //routines 등록 버튼 클릭 시 수정 함수 실행
    const editRoutineSubmit = () => 
        {
            // createRoutines atom 보내는 로직
            const copy_todo_state = JSON.parse(JSON.stringify(dtTodos)); // dtTodos State 원본 카피
            copy_todo_state.map((data)=>{
                if(data.id === todos.id){
                    data = editRoutinesState;
                }
            })
            setDtTodos(copy_todo_state);

            // createRoutine API로 보내기
            // patchTodosChangeDate(todos.id, translateSendData);
            
            // form 종료
            setReadOnly(true)
        }

        /* 함수 선언 종료 */

    return(
        <div className="edit-routines-input-Box">
        <RoutineDayModal 
        dayActiveBoolean={dayActiveBoolean} 
        setDayActiveBoolean={setDayActiveBoolean} 
        dayArr={dayArr}
        editRoutinesState={editRoutinesState}
        setEditRoutinesState={setEditRoutinesState}
        position={position}
        />
        <RoutineDateModal 
        dateActiveBoolean={dateActiveBoolean}
        setDateActiveBoolean={setDateActiveBoolean}
        editRoutinesState={editRoutinesState}
        setEditRoutinesState={setEditRoutinesState}
        location={location}
        position={position}
        />
        <div className="routines-input-title-field">
            <div className="routines-input-startdate-field" onClick={()=>{
                setDateActiveBoolean(true)
                setLocation(`date`)
                }}>
                <span>시작 날짜</span>
                <input id="start-date-input" className="routines-startdate-input"  type="text" value={editRoutinesState.date} readOnly /> 
            </div>
            <div className="routines-input-enddate-field"
            onClick={()=>{
                setDateActiveBoolean(true)
                setLocation(`endRepeatDate`)
                }} >
                <span>종료 날짜</span>
                <input id="end-date-input" className="routines-enddate-input" type="text" value={editRoutinesState.endRepeatDate} readOnly /> 
            </div>
            <div className="routines-input-day-field" onClick={()=>{setDayActiveBoolean(true)}} >
                <span className="routines-input-day-field-title">반복 요일</span>
                <div className="routines-day-text-wrap">
                    {checkDate.map((data)=>{
                        return <span className="routines-day-text" key={data.dayEng}>{data['dayKor']}</span>
                    })}
                </div>
            </div>
            <Button type="submit" className="routines-input-btn" onClick={editRoutineSubmit}>등록</Button>
        </div>
    </div>

    )

}