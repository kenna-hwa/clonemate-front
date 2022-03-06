import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { ko } from "date-fns/locale";


import {  Button, List, ListItem, ListItemText, Modal, } from "@mui/material";
import { Box } from "@mui/system";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import EditIcon from '@material-ui/icons/Edit';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import WrapTextIcon from '@material-ui/icons/WrapText';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import BorderColorIcon from '@material-ui/icons/BorderColor';

import '../../stylesheets/Feed.css'
import { objTodosDataResult, goalsData, todoData, datesData, selectedNewDate } from "../../atoms/todoData";
import { blue } from "@mui/material/colors";


export default function Feed() {


/* Hook 선언 시작 */

/* atom 시작 */

    let dateData = useRecoilValue(datesData);

    // atom에서 goal+todo 데이터 가져오기
    let [dtTodos, setDtTodos] = useRecoilState(objTodosDataResult);
    let todoDataArray = [...dtTodos];


    //날짜 관련
    let dtToday = dateData.dtToday;
    let dtTomorrow = dateData.dtTomorrow;


    //모달, 캘린더 on/off 정보
    const [modalOpen, setModalOpen] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);

    //목표 클릭 여부 확인 배열 생성
    let [isGoalSelected, setIsGoalSelected] = useState(Array(todoDataArray.length).fill(false) );

    let [readOnly, setReadOnly] = useState(true);
    // console.log("todoReadOnly", readOnly)

    //선택한 todo의 정보 저장
    let [selectedTodoData, setSelectedTodoData] = useState({});
    let [selectedInputIndex, setSelectedInputIndex] = useState("");


    let history = useHistory();

/* Hook 선언 끝 */

/* 함수 선언 시작 */

//목표 클릭 시 새로운 투두 작성 이벤트 핸들러
const clickCreateTodoHandler = (e) => {
    const index = e.currentTarget.dataset.index;
    const newArr = Array(todoDataArray.length).fill(false) ;
    newArr[index] = true;
    setIsGoalSelected(newArr)
}

/* 모달 on off 관련 */

//투두 클릭 시 모달 등장 이벤트 핸들러
const clickTodoModalHandler = (e) => {
    if(readOnly === false) return false;
    
    const goal_index = e.currentTarget.dataset.goalid-1;
    const todo_index = e.currentTarget.dataset.todoid-1;

    //모달열기 -> selectedTodoData에 클릭한 todo 정보 넣기 -> todo index 전달하기
    console.log(e.currentTarget.dataset)

    handleTodoModalOpen()
    setSelectedTodoData(todoDataArray[goal_index].todos[todo_index])
    setSelectedInputIndex(todo_index);
}

// 투두 클릭시 모달 노출 on off
const handleTodoModalOpen = () => setModalOpen(true);
const handleTodoModalClose = () => setModalOpen(false);

// 투두 클릭시 캘린더 노출 on off
const handleCalendarModalOpen = () => setCalendarOpen(true);
const handleCalendarModalClose = () => setCalendarOpen(false);



/* 투두 수정 이벤트 관련 함수 */

//엔터키 인식 readonly 변경
const enterKeyEventHandler = (e) => {
    if(e.key === 'Enter'){ 
        inputLostFocusEventHandler()
     }
}

//외부 클릭 readonly 변경
const inputLostFocusEventHandler = (e) => {
    setReadOnly(true)
}

//투두 수정 버튼 클릭 이벤트 핸들러
const clickTodoEditHandler = (e) => {
    readOnly === false ? setReadOnly(true) : setReadOnly(false);
    handleTodoModalClose();
}

//투두 input onchange 이벤트
// 방법 1 인덱스 사용
// const onChangetodoEditEventHandler = (e) => {
//     console.log("입력 정보 ", e.currentTarget.value)
//     const goal_index = e.currentTarget.dataset.goalid-1;
//     const todo_index = e.currentTarget.dataset.todoid-1;

//     let current_value = e.currentTarget.value;
//     const copy_todoDataArray = JSON.parse(JSON.stringify(todoDataArray)); // todoDataArray의 todo State 원본 카피

//     copy_todoDataArray[goal_index].todos[todo_index].title = current_value;
//     setDtTodos(copy_todoDataArray) ;//setDtTodos 이용해 state 변경
// }


// 방법 2 map 에 이중 조건문 사용

const onChangetodoEditEventHandler = (e) => {
    // console.log("입력 정보 ", e.currentTarget.value)

    const goal_id = parseInt(e.currentTarget.dataset.goalid);
    const todo_id = parseInt(e.currentTarget.dataset.todoid);


    let current_value = e.currentTarget.value;
    const copy_todoDataArray = JSON.parse(JSON.stringify(todoDataArray));

    copy_todoDataArray.map((data)=>{
        data.todos.map((todo)=>{
            if(todo.goalId === goal_id){
                    if(todo.todoId === todo_id){
                        todo.title = current_value;
                        console.log("todo, " , todo.title)
                    }
            }
        })
    })
    setDtTodos(copy_todoDataArray) ;//setDtTodos 이용해 state 변경
}

//투두 체크박스 클릭 이벤트 핸들러
const todoCheckBoxEventHandler = (e) => {
    e.stopPropagation(); 
    let index = parseInt(e.currentTarget.dataset.index);
    console.log("check click" , e.target.dataset.index)
    const originTodo = JSON.parse(JSON.stringify(todoDataArray)); // todoDataArray State 원본 카피
    // console.log("originTodo", originTodo)
    if(originTodo[index].check_yn === 'Y'){
        originTodo[index].check_yn = 'N'
    } else {
        originTodo[index].check_yn = 'Y'
    };
    setDtTodos(originTodo) ;//setOriginTodo를 이용해 state 변경
}

//투두 내일 하기 이벤트 핸들러 
const todoDelayNextDayEventHandler = (e) => {
    console.log(e.currentTarget)
    let index = parseInt(e.currentTarget.dataset.index);
    console.log(index)
    const originTodo = JSON.parse(JSON.stringify(todoDataArray)); // todoDataArray State 원본 카피
    originTodo[index].date = dtTomorrow;
    originTodo[index].end_repeat_date = dtTomorrow;
    setDtTodos(originTodo) ;//setOriginTodo를 이용해 state 변경
    handleTodoModalClose();
}

//투두 날짜 바꾸기 이벤트 핸들러
const todoChangeDateEventHandler = (e) => {
    let dtNewDate = e.currentTarget.dataset.day;
    let index = parseInt(e.currentTarget.dataset.index);
    const originTodo = JSON.parse(JSON.stringify(todoDataArray)); // todoDataArray State 원본 카피
    originTodo[index].date = dtNewDate;
    originTodo[index].end_repeat_date = dtNewDate;
    setDtTodos(originTodo) ;//setOriginTodo를 이용해 state 변경
    handleTodoModalClose();
    handleCalendarModalClose();
}

//투두 삭제 이벤트 핸들러 -> 나중에는 삭제가 아니라 바로 ajax로 Delete 메소드 던지는게 빠르지 않을까욧
const clickTodoDeleteHandler = (e) => {
    console.log("현재 인덱스 ", e.currentTarget.dataset.index)
    let index = parseInt(e.currentTarget.dataset.index);
    const originTodo = [...todoDataArray]; // todoDataArray State 원본 카피
    // console.log("originTodo",originTodo)
    originTodo.splice(index, 1) //원본 todoDataArray 배열에서 해당 index 찾아서 1개 삭제
    setDtTodos(originTodo) ;//setOriginTodo를 이용해 state 변경
    handleTodoModalClose();
}

/* 함수 선언 끝 */

    return (<>
        
        <Box className='feed-box'>
        <h2 className="feed-title">Feed</h2>
            <Box className="feed-goals-list-box">
                <List className="goals-list-wrap" >
                    {
                    todoDataArray.map((data, idx) => {
                        // console.log("Data", data)

                    return ( <ListItem className="goals-listItem" id={data.goalOrderNo} key={data.goalOrderNo} > 
                        <Button className="goals-listItem-text-wrap" isselected={isGoalSelected[idx]} id={data.goal_id} onClick={(e)=>{(clickCreateTodoHandler(e))}} data-index={idx} >
                        <LibraryBooksIcon className="goals-listItem-icon" />
                                <ListItemText className="goals-listItem-text" id={data.goalOrderNo} name={data.goalOrderNo} sx={{ color:data.goalTitleColor }}  >{data.goalTitle}</ListItemText>
                            <ListItemText className="goals-listItem-add-icon" ><span>+</span></ListItemText>
                        </Button>

                        {data.todos.map((todo,index)=>{
                            // {console.log("todo", todo)}
                            return (
                                <Box className="goals-todo-input-list-Box" key={index}>
                              
                                <div className="goals-todo-input-list-check-wrap"
                                >
                                {todo.checkYn === 'Y' ?  <CheckBoxIcon className="goals-todo-list-input-check-icon" onClick={todoCheckBoxEventHandler} data-todoid={todo.todoId} 
                                style={{ color: data.goalTitleColor }}
                                /> : 
                                <CheckBoxOutlineBlankIcon className="goals-todo-list-input-check-icon" 
                                onClick={todoCheckBoxEventHandler} data-index={todo.todoId} 
                                style={{ color: data.goalTitleColor }}
                                /> }
                                    <input key={`todo${index}`} id="todo-input" className="goals-todo-list-input"type="text" 
                                    name={todo.title} 
                                    data-index={index}
                                    data-goalid={todo.goalId} 
                                    data-todoid={todo.todoId} 
                                    value={todo.title} 
                                    onClick={clickTodoModalHandler} 
                                    onChange={onChangetodoEditEventHandler} onKeyDown={enterKeyEventHandler} 
                                    onBlur={inputLostFocusEventHandler}  
                                    readOnly={readOnly} 
                                    />
                                    
                                </div>
                                <Button className="goals-todo-list-input-btn" ><MoreHorizIcon className="goals-todo-list-input-btn-icon" /></Button>
                               
                                </Box>
                            )
                        })}
                        {isGoalSelected[idx] ? <CreateInput id={idx} isGoalSelected={isGoalSelected} setIsGoalSelected={setIsGoalSelected} dtToday={dtToday} />: null}
                    </ListItem>
                            )
                        })
                    }
                    

                </List>
            </Box>
            <button className="feed-move-to-routines" title="기간이 있는 할 일 작성하기" onClick={()=>{history.push("/routines")}}><BorderColorIcon /></button>
        </Box>

        {/* 모달 생성 */}
        <TodoModal modalOpen={modalOpen} handleTodoModalClose={handleTodoModalClose} selectedTodoData={selectedTodoData} clickTodoEditHandler={clickTodoEditHandler} clickTodoDeleteHandler={clickTodoDeleteHandler} selectedInputIndex={selectedInputIndex} todoDelayNextDayEventHandler={todoDelayNextDayEventHandler} calendarOpen={calendarOpen} handleCalendarModalOpen={handleCalendarModalOpen} handleCalendarModalClose={handleCalendarModalClose} todoChangeDateEventHandler={todoChangeDateEventHandler} />
        </>
    );
}

// input 생성
export function CreateInput(props) {


    let id = props.id;
    const dtToday = props.dtToday;
    const isGoalSelected = props.isGoalSelected;
    const setIsGoalSelected = props.setIsGoalSelected;

    /* Hook 선언 시작 */

    /* atom 시작 */
    const { register, handleSubmit, errors, watch } = useForm({ mode: "onChange" });
    let [todoDataArray, setTodo] = useRecoilState(todoData);
    let [createTodoState, setCreactTodoState] = useState({
        "todo_id": "",
        "goal_id": "", //묶여있는 goal id
        "next_todo_id": "", //다음 todoDataArray id (순서지정용)
        "title": "",
        "date": "",
        "end_repeat_date": "", //반복 종료 일자. 반복 없으면 date 와 값이 같거나 없음
        "repeat_days": {
            "sun": "N", //y 면 일요일 반복, n 이면 반복 x
            "mon": "N",
            "tue": "N",
            "wed": "N",
            "thu": "N",
            "fri": "N",
            "sat": "N",
        },
        "check_yn" : "N" //달성여부
      });

    let createInput = useRef();

    useEffect(() => {
        const inputElement = createInput.current;
        inputElement.focus();
      }, []);
    /* Hook 선언 끝 */

    /* 함수 선언 시작 */

    //input 함수
    const onChangeTitleEventHandler = (e) => {
        setCreactTodoState({...createTodoState, title: e.target.value})
        // console.log(createTodoState)
    }
    
    //todoDataArray 추가 함수
    const addTodo = (data, id) => {
        const copy_todo_state = [...todoDataArray];
        //추가되는 state 'todo_id', 'goal_id', 'next_todo_id', 'date', 'end_repeat_date'
        // 'repeat_days'와 'check_yn'은 default 값 "N" , 
        data.todo_id = copy_todo_state.length;
        data.goal_id = parseInt(id); //key를 위한 id 추가
        data.next_todo_id = copy_todo_state.length+1;
        data.date = dtToday;
        data.end_repeat_date = dtToday;
        copy_todo_state.push(data);
        setTodo(copy_todo_state, console.log(copy_todo_state))
    }

    const onSubmit =  (data) => { 
        const index = data.goal_id
        const newArr = [...isGoalSelected];
        setIsGoalSelected(newArr[index] = false)
        setCreactTodoState(JSON.stringify(createTodoState));
        addTodo(createTodoState, index);
    }

    const onError = (error) => {
        console.log(error);
        };



    /* 함수 선언 끝 */

    return  (
            <Box className="goals-todo-input-create-Box">
                <form onSubmit={handleSubmit(onSubmit,onError)}>
                    <div className="goals-todo-input-create-wrap">
                    <CheckBoxOutlineBlankIcon className="goals-todo-input-create-check-icon"/>
                    <input {...register("title")} ref={createInput} id="todo-input" className="goals-todo-input-create-field"  placeholder="할 일을 입력해주세요." type="text" maxLength={"35"} onChange={onChangeTitleEventHandler} onBlur={handleSubmit(onSubmit, onError)} /> 
                    <input {...register("goal_id")} id="todo-goal-id-input" className="todo-goal-create-id" type="hidden" value={id} /> 
                    <Button type="submit" className="goals-todo-input-btn"><MoreHorizIcon className="goals-todo-list-input-btn-icon" /></Button>
                    </div>
                </form>
            </Box>
            )
}


export function TodoModal (props) {

    const modalOpen = props.modalOpen;
    const handleTodoModalClose = props.handleTodoModalClose;
    const selectedTodoData = props.selectedTodoData;
    const clickTodoEditHandler = props.clickTodoEditHandler;
    const selectedInputIndex = props.selectedInputIndex;
    const clickTodoDeleteHandler = props.clickTodoDeleteHandler;
    const todoDelayNextDayEventHandler = props.todoDelayNextDayEventHandler;
    const calendarOpen = props.calendarOpen;
    const handleCalendarModalOpen = props.handleCalendarModalOpen;
    const handleCalendarModalClose = props.handleCalendarModalClose;
    const todoChangeDateEventHandler = props.todoChangeDateEventHandler;


    return(
        <>
        <DatePickerCalender calendarOpen={calendarOpen} handleCalendarModalOpen={handleCalendarModalOpen} selectedInputIndex={selectedInputIndex} handleCalendarModalClose={handleCalendarModalClose} handleTodoModalClose={handleTodoModalClose} todoChangeDateEventHandler={todoChangeDateEventHandler} /> 

        <Modal open={modalOpen}
        onClose={handleTodoModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="feed-todo-modal-box"
         >
            <Box className="feed-todo-modal-wrap" >
                <p className="feed-todo-modal-head">{selectedTodoData.title}</p>
                <Box className="feed-todo-modal-icon-wrap">
                    <button className="feed-todo-edit-icon" data-index={selectedInputIndex} onClick={clickTodoEditHandler} ><EditIcon className="feed-modal-icon" /><span>수정</span></button>
                    <button className="feed-todo-delay-icon" data-index={selectedInputIndex} onClick={todoDelayNextDayEventHandler} ><SkipNextIcon className="feed-modal-icon" /><span>내일 하기</span></button>
                    <button className="feed-todo-date-change-icon" data-index={selectedInputIndex} ><SyncAltIcon className="feed-modal-icon" onClick={handleCalendarModalOpen} /><span>날짜 바꾸기</span></button>
                    <button className="feed-todo-order-change-icon" data-index={selectedInputIndex} ><WrapTextIcon className="feed-modal-icon" /><span>순서 변경</span></button>
                    <button className="feed-todo-delete-icon" data-index={selectedInputIndex} onClick={clickTodoDeleteHandler}  ><DeleteOutlineIcon className="feed-modal-icon" /><span>삭제</span></button>
                </Box>
            </Box>

        </Modal>  
        </>
    )
}

export function DatePickerCalender(props) {

    const selectedInputIndex = props.selectedInputIndex;
    const [selectedNewDate, setSelectedNewDate] = useState(new Date());
    const  week = new Array('일', '월', '화', '수', '목', '금', '토');
    const calendarOpen = props.calendarOpen;
    const handleCalendarModalClose = props.handleCalendarModalClose;
    const handleTodoModalClose = props.handleTodoModalClose;
    const todoChangeDateEventHandler = props.todoChangeDateEventHandler;
    const selectedDate = selectedNewDate.toJSON().substring(0,10);

    let selectedYear = selectedNewDate.getFullYear();
    let selectedMonth = selectedNewDate.getMonth()+1;
    let selectedDay = selectedNewDate.getDate();
    let selectedLabel = selectedNewDate.getDay();
    let todayLabel = week[selectedLabel];


    useEffect(()=>{
        handleTodoModalClose()
    },[])
    
    return (
        <Modal open={calendarOpen}
        onClose={handleCalendarModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="todo-modal-datePicker-wrap"
         >
        <Box className="todo-modal-datePicker-box">
            <LocalizationProvider locale={ko} dateAdapter={AdapterDateFns}>
                <div className="todo-modal-datePicker-box-title-wrap">
                    <p>선택한 날짜</p>
                    <span>{selectedYear +`년 `+ selectedMonth +`월 `+ selectedDay+ `일 ` + todayLabel + `요일`}</span>
                </div>
                <CalendarPicker className="todo-modal-datePicker" date={selectedNewDate} onChange={(newDate) => setSelectedNewDate(newDate)} />
                <div className="todo-modal-datePicker-btn-wrap">
                <Button className="todo-modal-datePicker-btn" data-index={selectedInputIndex} data-day={selectedDate} onClick={todoChangeDateEventHandler}>확인</Button> <Button className="todo-modal-datePicker-btn" onClick={handleCalendarModalClose}>취소</Button>
                </div>
            </LocalizationProvider>
        </Box>
        </Modal>  
    )


}