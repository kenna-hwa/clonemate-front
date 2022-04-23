import { Modal } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { ko } from "date-fns/locale";


import EditIcon from '@material-ui/icons/Edit';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import WrapTextIcon from '@material-ui/icons/WrapText';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { objTodosDataResult, objDatesData } from "../../atoms/todoData";


export function TodoModal (props) {

    /* hook 선언 시작 */

    const history = useHistory();

    /* hook 선언 종료 */

    /* state 선언 시작 */

    /* atom 선언 시작 */

    let dtDate = useRecoilValue(objDatesData);
    let [dtTodos, setDtTodos] = useRecoilState(objTodosDataResult);
    let todoDataArray = JSON.parse(JSON.stringify(dtTodos));

    /* atom 선언 종료 */

    const index = props.index;
    const todos = props.todos;
    const [calendarActiveIndex, setCalendarActiveIndex] = useState(null);


    /* 함수 선언 시작 */

    //모달 onoff 핸들러
    const modalActive = props.modalActive;

    //캘린더 onoff 핸들러
    const setModalActiveIndex = props.setModalActiveIndex;

    //모달 수정 클릭 핸들러
    const todoModalEditHandler = props.todoModalEditHandler;


    //모달 내일하기 클릭 핸들러 
    const todoModalDelayHandler = (e) => {
    const goal_id = parseInt(e.currentTarget.dataset.goalid);
    const todo_id = parseInt(e.currentTarget.dataset.todoid);
        todoDataArray.map(data=>
            data.todos.map(todo=>{
                if(todo.goalId === goal_id && todo.todoId === todo_id && todo.date === todo.endRepeatDate){
                todo.date = dtDate.dtTomorrow;
                todo.endRepeatDate = dtDate.dtTomorrow;
                }
            })
        )
        setModalActiveIndex(null)
    }
    
    //모달 순서 변경 클릭 핸들러
    const todoModalOrderHandler = (e) => {
        console.log(e.currentTarget)
        history.push('/orderitem');
    }

    //모달 삭제 클릭 핸들러
    const todoModalDeleteHandler = (e) => {
        const goal_id = parseInt(e.currentTarget.dataset.goalid);
        const todo_id = parseInt(e.currentTarget.dataset.todoid);

        todoDataArray.map(data=>
            data.todos.map((todo, index)=>{
                if(todo.goalId === goal_id && todo.todoId === todo_id)  data.todos.splice(index, 1)
            })
        )
        setDtTodos(todoDataArray) ;//setDtTodos 이용해 state 변경
        setModalActiveIndex();
    }

    /* 함수 선언 종료 */

    return(
        <>
        {/* {console.log("todos.date", todos.date)} */}
        <DatePickerCalender 
        calendarActiveIndex={calendarActiveIndex} 
        setCalendarActiveIndex={setCalendarActiveIndex}
        setModalActiveIndex={setModalActiveIndex}
        todos={todos}
        calendarActive={index === calendarActiveIndex? true : false}
        /> 

        <Modal open={modalActive}
        onClose={()=>{setModalActiveIndex(null)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="feed-todo-modal-box"
         >
        
            <div className="feed-todo-modal-wrap" >
                <p className="feed-todo-modal-head">{todos.title}</p>
                <div className="feed-todo-modal-icon-wrap">
                    <button className="feed-todo-modal-icon feed-todo-edit-icon" 
                    data-goalid={todos.goalId} data-todoid={todos.id} 
                    onClick={todoModalEditHandler}
                     >
                        <EditIcon className="feed-modal-icon" /><span>수정</span>
                    </button>
                    <button className="feed-todo-modal-icon feed-todo-delay-icon" 
                    data-goalid={todos.goalId} data-todoid={todos.id} 
                    onClick={todoModalDelayHandler}
                    >
                        <SkipNextIcon className="feed-modal-icon" /><span>내일 하기</span>
                    </button>
                    <button className="feed-todo-modal-icon feed-todo-date-change-icon" 
                    data-goalid={todos.goalId} data-todoid={todos.id} 
                    onClick={()=>{
                        setCalendarActiveIndex(todos.id)
                        //  console.log(todos.todoId, calendarActiveIndex)
                        }}
                    >
                        <SyncAltIcon className="feed-modal-icon" /><span>날짜 바꾸기</span>
                    </button>
                    <button className="feed-todo-modal-icon feed-todo-order-change-icon" 
                    onClick={todoModalOrderHandler}
                    >
                        <WrapTextIcon className="feed-modal-icon" /><span>순서 변경</span>
                    </button>
                    <button className="feed-todo-modal-icon feed-todo-delete-icon" 
                    data-goalid={todos.goalId} data-todoid={todos.id} 
                    onClick={todoModalDeleteHandler}
                    >
                        <DeleteOutlineIcon className="feed-modal-icon" /><span>삭제</span>
                    </button>
                </div>
            </div>

        </Modal>  
        </>
    )
}

export function DatePickerCalender(props) {

    let [dtTodos, setDtTodos] = useRecoilState(objTodosDataResult);
    let todoDataArray = JSON.parse(JSON.stringify(dtTodos));
    const todos = props.todos;
    const new_date = new Date(todos.date);
    let [newDate, setNewDate] = useState(new_date);

    const week = new Array('일', '월', '화', '수', '목', '금', '토');

    const calendarActive = props.calendarActive;
    const setCalendarActiveIndex = props.setCalendarActiveIndex;


    //모달 내 선택한 날짜 상단 표시
    const selectedDate = newDate.toJSON().substring(0,10);

    let selectedYear = newDate.getFullYear();
    let selectedMonth = newDate.getMonth()+1;
    let selectedDay = newDate.getDate();
    let selectedLabel = newDate.getDay();
    let todayLabel = week[selectedLabel];


        //모달 날짜 바꾸기 캘린더 확인 핸들러
        const todoModalDateChangeHandler = (e) => {
            const goal_id = parseInt(e.currentTarget.dataset.goalid);
            const todo_id = parseInt(e.currentTarget.dataset.todoid);
            todoDataArray.map((data)=>
                data.todos.map((todo)=> {
                    if(todo.goalId === goal_id && todo.id === todo_id && todo.date === todo.endRepeatDate){
                    todo.date = selectedDate;
                    todo.endRepeatDate = selectedDate;
                    }
                })
            )
            setCalendarActiveIndex(null)
        }


    return (
        <Modal open={calendarActive}
        onClose={()=>{setCalendarActiveIndex(null)}}
        aria-labelledby="calendar-title"
        aria-describedby="calendar-description"
        className="calendar-wrap"
         >
        <div className="calendar-box">
            <LocalizationProvider locale={ko} dateAdapter={AdapterDateFns}>
                <div className="calendar-title-wrap">
                    <p>선택한 날짜</p>
                    <span>{selectedYear +`년 `+ selectedMonth +`월 `+ selectedDay+ `일 ` + todayLabel + `요일`}</span>
                </div>
                <CalendarPicker className="calendar-picker" date={newDate} onChange={(newDate) => setNewDate(newDate)} />
                <div className="calendar-btn-box">
                    <button className="calendar-ok-btn" 
                    data-goalid={todos.goalId}
                    data-todoid={todos.id}
                    data-selecteddate={selectedDate} 
                    onClick={todoModalDateChangeHandler}>
                        확인
                    </button> 
                    <button className="calendar-cancel-btn" 
                    onClick={()=>{setCalendarActiveIndex(null)}}>
                        취소
                </button>
                </div>
            </LocalizationProvider>
        </div>
        </Modal>  
    )


}