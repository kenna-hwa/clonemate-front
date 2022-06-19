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
import { patchTomorrowTodo, DeleteTodo, } from "../../api/apiCommunicate";

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


    /* 함수 선언 시작 */

    //모달 onoff 핸들러
    const modalActive = props.modalActive;
    const setModalActiveIndex = props.setModalActiveIndex;

    //캘린더 onoff 핸들러
    const calendarActiveIndex = props.calendarActiveIndex;
    const setCalendarActiveIndex = props.setCalendarActiveIndex;

    //모달 수정 클릭 핸들러
    const todoModalEditHandler = props.todoModalEditHandler;



    //모달 내일하기 클릭 핸들러 
    const todoModalDelayHandler = (e) => {
    const todayDate = dtDate.dtFeedCalendarDate;
    const tomorrowDate = new Date(todayDate);
    tomorrowDate.setDate(todayDate.getDate()+1)


    console.log("tomorrowDate" , tomorrowDate)
    const goal_id = parseInt(e.currentTarget.dataset.goalid);
    const todo_id = parseInt(e.currentTarget.dataset.todoid);
        todoDataArray.map(data=>
            data.todos.map(todo=>{
                if(todo.goalId === goal_id && todo.todoId === todo_id && todo.date === todo.endRepeatDate){
                    todo.date = tomorrowDate;
                    todo.endRepeatDate = tomorrowDate;
                } else if(todo.goalId === goal_id && todo.todoId === todo_id && todo.date != todo.endRepeatDate){
                    todo.date = tomorrowDate;
                }
            })
        );

        //api로 전달
        patchTomorrowTodo(todo_id, tomorrowDate);
        setModalActiveIndex(false);
    }


    //모달 날짜 바꾸기 클릭 모달 onoff 핸들러
    const todoModalDateChangeModalHandler = () => {
        setCalendarActiveIndex(true)
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
        const findIdx = todoDataArray.map(data=>{
            return data.id === goal_id ? data.todos.findIndex(todo => todo.id === todo_id) : null;
        })
        todoDataArray.map(data=>
            data.todos.map((todo)=>{
                if(todo.goalId === goal_id && todo.id === todo_id)  data.todos.splice(findIdx.toString(), 1)
        })
        )

        //api로 전달
        DeleteTodo(todo_id);
        setDtTodos(todoDataArray) ;//setDtTodos 이용해 state 변경
        setModalActiveIndex(false);
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
        /> 

        <Modal open={modalActive}
        onClose={()=>{setModalActiveIndex(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="feed-todo-modal-box"
         >
        
            <div className="feed-todo-modal-wrap" >
                <p className="feed-todo-modal-head">{todos.contents}</p>
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
                    onClick={todoModalDateChangeModalHandler}
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

    const calendarActiveIndex = props.calendarActiveIndex;
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
            //api로 전달
            patchTomorrowTodo(todo_id, selectedDate);
            setCalendarActiveIndex(false)
        }


    return (
        <Modal open={calendarActiveIndex}
        onClose={()=>{setCalendarActiveIndex(false)}}
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
                    onClick={()=>{setCalendarActiveIndex(false)}}>
                        취소
                </button>
                </div>
            </LocalizationProvider>
        </div>
        </Modal>  
    )


}