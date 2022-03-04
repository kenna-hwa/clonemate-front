import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
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
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import '../../stylesheets/Routines.css';
import { goalsData, todoData, datesData, dateCalendarOpen, selectedNewDate } from "../../atoms/todoData";

import EditRoutinesForm from './EditRoutinesForm';
import CreateRoutinesForm from "./CreateRoutinesForm";
import CreateRoutinesDate from "./CreateRoutinesDate";
import EditRoutinesDate from "./EditRoutinesDate";

export default function Routines () {


/* Hook 선언 시작 */

/* atom 시작 */

let dateData = useRecoilValue(datesData);
let goal = useRecoilValue(goalsData);
let [originTodo, setOriginTodo] = useRecoilState(todoData);
let [routinesCalendarOpen, setRoutinesCalendarOpen] = useRecoilState(dateCalendarOpen);
let [newDate, setNewDate] = useRecoilState(selectedNewDate);

console.log("selectedNewDate 현재 선택된 날짜", newDate)
let todo = [...originTodo];
let [isGoalSelected, setIsGoalSelected] = useState(Array(goal.length).fill(false) );
let [isTodoSelected, setIsTodoSelected] = useState(Array(todo.length).fill(true) );
console.log("isTodoSelected", isTodoSelected)

/* Hook 선언 끝 */

/* 함수 선언 시작 */

//목표 클릭 시 이벤트 핸들러
const clickCreateRoutinesHandler = (e) => {
    console.log("목표 클릭 연결")
    const index = e.currentTarget.dataset.index;
    const newArr = Array(goal.length).fill(false) ;
    newArr[index] = true;
    setIsGoalSelected(newArr)
}

//투두 클릭 시 모달 등장 이벤트 핸들러
const clickEditRoutinesHandler = (e) => {
    console.log("todo 클릭 연결");
    const index = e.currentTarget.dataset.index;
    const newArr = Array(todo.length).fill(true) ;
    newArr[index] = false;
    setIsTodoSelected(newArr)
    console.log("isTodoSelected", isTodoSelected)
}


/* 함수 선언 끝 */

return (<>
    <Box className="routines-box">
        <Box className="routines-goals-list-box">
            <List className="routines-goals-list-wrap">
                {
                goal.map((goal, index) => {
                return ( <ListItem className="goals-listItem" id={goal.goal_id} key={goal.goal_id} > 
                    <Button className="goals-listItem-text-wrap" id={goal.goal_id} data-index={index} onClick={clickCreateRoutinesHandler} >
                    <LibraryBooksIcon className="goals-listItem-icon" />
                            <ListItemText className="goals-listItem-text" id={goal.goal_id} name={goal.goal_id} sx={{ color:goal.title_color }}>{goal.title}</ListItemText>
                        <ListItemText className="goals-listItem-add-icon" ><span>+</span></ListItemText>
                    </Button>
                    {todo.map((todo,index)=>{
                        return (
                            <Box className="goals-todo-input-list-Box" key={index} data-index={index} onClick={clickEditRoutinesHandler}>
                            {goal.goal_id === parseInt(todo.goal_id) ? (<>
                            <div className="goals-todo-input-list-check-wrap">
                            {todo.check_yn === 'Y' ?  <CheckBoxIcon className="goals-todo-list-input-check-icon" data-index={index} /> : <CheckBoxOutlineBlankIcon className="goals-todo-list-input-check-icon"  data-index={index} /> }
                                <input key={`todo${index}`} id="todo-input" className="goals-todo-list-input" type="text" maxLength={"80"} 
                                name={todo.title} data-index={index} value={todo.title} readOnly={isTodoSelected[index]} />
                            </div>
                            {/* {!isTodoSelected[index] ? (<>
                                <EditRoutinesForm goal_id={goal.goal_id} todo_id={index}  /> 
                                </>) :
                            null}  */}
                            </>
                            ) : null} 
                            </Box>
                        )
                    })}
                    {isGoalSelected[index] ? <CreateRoutinesForm goal_id={index} setIsGoalSelected={setIsGoalSelected}  />: null}
                </ListItem>
                        )
                    })
                }
                

            </List>
        </Box>
    </Box>

    {/* 모달 생성 */}
    {/* <EditRoutinesTodoModal /> */}
    </>
);
}

//할 일 클릭 - 메뉴 모달 
// export function EditRoutinesTodoModal (props) {

//     const modalOpen = props.modalOpen;
//     const handleTodoModalClose = props.handleTodoModalClose;
//     const selectedTodo = props.selectedTodo;
//     const clickTodoEditHandler = props.clickTodoEditHandler;
//     const selectedInputIndex = props.selectedInputIndex;
//     const clickTodoDeleteHandler = props.clickTodoDeleteHandler;
//     const todoDelayNextDayEventHandler = props.todoDelayNextDayEventHandler;


//     return(
//         <>

                
//         <Modal open={modalOpen}
//         onClose={handleTodoModalClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         className="routines-todo-modal-box"
//          >
//             <Box className="routines-todo-modal-wrap" >
//                 <p className="routines-todo-modal-head">{selectedTodo.title}</p>
//                 <Box className="routines-todo-modal-icon-wrap">
//                     <button className="routines-todo-edit-icon" data-index={selectedInputIndex} onClick={clickTodoEditHandler} ><EditIcon className="routines-modal-icon" /><span>수정</span></button>
//                     <button className="routines-todo-delete-icon" data-index={selectedInputIndex} onClick={clickTodoDeleteHandler}  ><DeleteOutlineIcon className="routines-modal-icon" /><span>삭제</span></button>
//                 </Box>
//             </Box>

//         </Modal>  
//         </>
//     )
// } 
