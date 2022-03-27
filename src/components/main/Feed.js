import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { ko } from "date-fns/locale";
import FeedTodoGoal from './FeedTodoGoal';
import '../../stylesheets/Feed.css'

import {  Modal, } from "@mui/material";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import BackspaceIcon from '@material-ui/icons/Backspace';

import { objTodosDataResult, objDatesData } from "../../atoms/todoData";
import CreateTodoForm from "./CreateTodoForm";

export default function Feed() {

/* hook 선언 시작 */

let history = useHistory();

/* hook 선언 종료 */

/* state 선언 시작 */

    //all todos 수정 모달 onoff
    const [allTodoModalActive, setAllTodoModalActive] = useState(false);

    //수정 모달에서 캘린더 onoff
    const [allTodoCalendarActive, setAllTodoCalendarActive] = useState(false);

    //캘린더로 선택한 날짜
    const [selectedDate, setSelectedDate] = useState(new Date())


/* atom 시작 */

    // atom에서 goal+todo 데이터 가져오기
    let [dtTodos, setDtTodos] = useRecoilState(objTodosDataResult);
    let todoDataArray = JSON.parse(JSON.stringify(dtTodos));
    let dtDate = useRecoilValue(objDatesData);

/* atom 종료 */

//날짜 정보값 dtToday 오늘 dtTomorrow 내일 dtFeedCalendarDate 캘린더에서 선택한 날짜

//목표 클릭 여부 확인 배열 생성
let [isGoalSelected, setIsGoalSelected] = useState(Array(todoDataArray.length).fill(false) );


/* state 선언 종료 */

/* 함수 선언 시작 */

//Goal 클릭 핸들러 
const onClickGoalHandler = (e) => {
    const index = e.currentTarget.dataset.index;
    const clicked_arr = Array(todoDataArray.length).fill(false) ;
    clicked_arr[index] = true;
    setIsGoalSelected(clicked_arr)
}

//createTodoForm에 값 없을 때 사라지게
const createTodoFieldReset = (e) => {
    const clicked_arr = Array(todoDataArray.length).fill(false) ;
    setIsGoalSelected(clicked_arr);
}

//모달 내부 함수 시작

//미완료 할 일 오늘 하기
const checkNdoitToday = () => {
    todoDataArray.map(data=>
        data.todos.map((todo)=>{
           todo.date = dtDate.dtTomorrow
        })
    )
    setDtTodos(todoDataArray);
    //그런데 endRepeatDate가 내일 보다 작으면? 의 처리가 필요하다..
}


//할 일 다른 날 하기 캘린더 on
const checkNdoitCalendarOn = (e) => {
    setAllTodoCalendarActive(true)
}

//미완료 할 일 다른 날 하기 확인 클릭
const submitDoitOtherDay = (selectedDate) => {
   
}

//미완료 할 일 삭제

const checkNdelete = (e) => {

const new_arr = todoDataArray.map(data=>
    data.todos.map((todo)=>{
        
    })
)
   


}

//모든 할 일 다른 날 하기

const allTodoDoitOtherDay = (selectedDate) => {
    console.log("todoDataArray",todoDataArray)
    const new_date = selectedDate.toJSON().substring(0, 10);
    todoDataArray.map(data=>
        data.todos.map((todo)=>{
           todo.date = new_date;
           todo.end_repeat_date = new_date;

        })
    )
    setDtTodos(todoDataArray);

}

//모든 할 일 삭제

const allTodoDelete = () => {

    todoDataArray.map(data=>
        console.log(data.todos)
        
    )
}


/* 함수 선언 끝 */

    return (
        <div className='feed-wrap'>
            <AllTodoCalendar 
            selectedDate={selectedDate} setSelectedDate={setSelectedDate}
            allTodoCalendarActive={allTodoCalendarActive} setAllTodoCalendarActive={setAllTodoCalendarActive} submitDoitOtherDay={submitDoitOtherDay} allTodoDoitOtherDay={allTodoDoitOtherDay} />

            <AllTodoEditModal 
            allTodoModalActive={allTodoModalActive} 
            setAllTodoModalActive={setAllTodoModalActive}
            checkNdoitToday={checkNdoitToday}
            checkNdoitCalendarOn={checkNdoitCalendarOn}
            checkNdelete={checkNdelete}
            allTodoDoitOtherDay={allTodoDoitOtherDay}
            allTodoDelete={allTodoDelete}
            dtDate={dtDate} />
            <h2 className="feed-title">Feed</h2>
            <div className="goals-list-wrap" >
                {
                    todoDataArray.map((data, idx) => {

                        return (<React.Fragment key={data.goalId}>
                        <FeedTodoGoal 
                        data={data} idx={idx}
                        onClickGoalHandler={onClickGoalHandler}
                        />
                        {isGoalSelected[idx] ? <CreateTodoForm 
                        dtDate={dtDate} goalId={data.goalId} 
                        todoLength={data.todos.length}
                        createTodoFieldReset={createTodoFieldReset}
                        /> :null}
                        </React.Fragment>
                        )
                    })
                    
                }
            </div>
            <button className="feed-day-all-todo-edit" title="현재 날짜의 모든 할 일 수정" onClick={()=>{setAllTodoModalActive(true)}}><MoreHorizIcon /></button>
            <button className="feed-move-to-routines" title="기간이 있는 할 일 작성하기" onClick={()=>{history.push("/routines")}}><BorderColorIcon /></button>
        </div>
    );
}

export function AllTodoEditModal (props) {

    const allTodoModalActive = props.allTodoModalActive;
    const setAllTodoModalActive = props.setAllTodoModalActive;
    const checkNdoitToday = props.checkNdoitToday;
    const checkNdoitCalendarOn = props.checkNdoitCalendarOn;
    const checkNdelete = props.checkNdelete;
    const allTodoDoitOtherDay = props.allTodoDoitOtherDay;
    const allTodoDelete = props.allTodoDelete;

    return (
        <Modal open={allTodoModalActive}
        onClose={()=>{setAllTodoModalActive(false)}}
        aria-labelledby="all-todo-modal-title"
        aria-describedby="all-modal-description"
        className="all-todo-modal-box"
         >
        
            <div className="all-todo-modal-wrap" >
                <p className="all-todo-modal-head">현재 날짜의 모든 할 일 수정</p>
                <div className="all-todo-modal-icon-wrap">
                    <button className="all-todo-modal-icon" onClick={checkNdoitToday}>
                       <EventAvailableIcon className="feed-modal-icon" /><span>미완료 할 일<br/>전부 완료 하기</span>
                    </button>
                    <button className="all-todo-modal-icon" onClick={()=>{checkNdoitCalendarOn()}}>
                       <EventNoteIcon className="feed-modal-icon" /><span>미완료 할 일<br/>다른 날 하기</span>
                    </button>
                    <button className="all-todo-modal-icon" onClick={checkNdelete}>
                       <EventBusyIcon className="feed-modal-icon" /><span>미완료 할 일<br/>삭제</span>
                    </button>
                    <button className="all-todo-modal-icon" onClick={()=>{checkNdoitCalendarOn()}}>
                       <FileCopyIcon className="feed-modal-icon" /><span>모든 할 일<br/>다른 날 하기</span>
                    </button>
                    <button className="all-todo-modal-icon" onClick={allTodoDelete}>
                       <BackspaceIcon className="feed-modal-icon" /><span>모든 할 일<br/>삭제</span>
                    </button>
                </div>
            </div>

        </Modal>  
    )
}

export function AllTodoCalendar (props) {

    const selectedDate = props.selectedDate;
    const setSelectedDate = props.setSelectedDate;
    const allTodoCalendarActive = props.allTodoCalendarActive;
    const setAllTodoCalendarActive = props.setAllTodoCalendarActive; 
    const week = new Array('일', '월', '화', '수', '목', '금', '토');

    let selectedYear = selectedDate.getFullYear();
    let selectedMonth = selectedDate.getMonth()+1;
    let selectedDay = selectedDate.getDate();
    let selectedLabel = selectedDate.getDay();
    let todayLabel = week[selectedLabel];

    return (
        <Modal open={allTodoCalendarActive}
        onClose={()=>{setAllTodoCalendarActive(false)}} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="todo-modal-datePicker-wrap"
         >
        <div className="todo-modal-datePicker-box">
            <LocalizationProvider locale={ko} dateAdapter={AdapterDateFns}>
                <div className="todo-modal-datePicker-box-title-wrap">
                    <p>선택한 날짜</p>
                    <span>{selectedYear +`년 `+ selectedMonth +`월 `+ selectedDay+ `일 ` + todayLabel + `요일`}</span>
                </div>
                <CalendarPicker className="todo-modal-datePicker" date={selectedDate} onChange={(date) => setSelectedDate(date)} />
                <div className="todo-modal-datePicker-btn-wrap">
                <button className="todo-modal-datePicker-btn" data-day={selectedDate} onClick={()=>{console.log("확인 클릭")}}>확인</button> <button className="todo-modal-datePicker-btn" onClick={()=>{setAllTodoCalendarActive(false)}}>취소</button>
                </div>
            </LocalizationProvider>
        </div>
        </Modal>  
    )
}