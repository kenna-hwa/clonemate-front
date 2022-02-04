import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {  Button, List, ListItem, ListItemText, InputBase, getBottomNavigationUtilityClass } from "@mui/material";
import { Box } from "@mui/system";
import { constSelector, useRecoilState, useRecoilValue } from "recoil";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import '../stylesheets/Feed.css'

import { goalsData } from "../atoms/todoData";


export default function Feed() {


/* Hook 선언 시작 */

/* atom 시작 */
    let goal = useRecoilValue(goalsData);

    let [isGoalSelected, setIsGoalSelected] = useState( Array(goal.length).fill(false) );
    const inputRef = useRef();
    const buttonRef = useRef();


/* Hook 선언 끝 */

/* 함수 선언 시작 */


//목표 클릭 시 이벤트 핸들러
function clickTodoHandler(e){
    const id= e.currentTarget.id;
    const index = e.currentTarget.dataset.index;
    const newArr = Array(goal.length).fill(false) ;
    newArr[index] = true;
    setIsGoalSelected(newArr)
    // createTodo(id)
}

function createTodo(id) {

    return <InputBase className="goals-listItem-input" placeholder="Placeholder"  />

}

/* 함수 선언 끝 */



    return (
        <Box className='feed-box'>
        <h2 className="feed-title">Feed</h2>
        <Box className="feed-goals-list-box">
            <List className="goals-list-wrap" >
                {
                goal.map((item, index) => {

                return ( <ListItem className="goals-listItem" id={item.goal_id} key={item.goal_id} > 
                    <Button className="goals-listItem-text-wrap" isselected={isGoalSelected[index].toString()} id={item.goal_id} onClick={(e)=>{(clickTodoHandler(e))}} ref={buttonRef} data-index={index} >
                    <LibraryBooksIcon className="goals-listItem-icon" />
                            <ListItemText className="goals-listItem-text" id={item.goal_id} name={item.goal_id} sx={{ color:item.title_color }}  >{item.title}</ListItemText>
                        <ListItemText className="goals-listItem-add-icon" ><span>+</span></ListItemText>
                    </Button>
                    {isGoalSelected[index] ? <CreateInput id={item.goal_id} />: null}
                </ListItem>
                        );
                    })
                }
                

            </List>
        </Box>

        </Box>
    );
}

export function CreateInput(props) {


    let id = props.id;
    let defaultDate = new Date().toJSON().substring(0,10);

    console.log('date', defaultDate)
    /* Hook 선언 시작 */

    /* atom 시작 */
    const { register, handleSubmit, errors, watch } = useForm({ mode: "onChange" });
    let [createTodoState, setCreactTodoState] = useState({
        "todo_id": "",
        "goal_id": "", //묶여있는 goal id
        "next_todo_id": "", //다음 todo id (순서지정용)
        "title": "",
        "date": `${defaultDate}`,
        "end_repeat_date": "", //반복 종료 일자. 반복 없으면 date 와 값이 같거나 없음
        "repeat_days": {
            "sun": "", //y 면 일요일 반복, n 이면 반복 x
            "mon": "",
            "tue": "",
            "wed": "",
            "thu": "",
            "fri": "",
            "sat": "",
        },
        "check_yn" : "N" //달성여부
 }
    );

    /* Hook 선언 끝 */

    /* 함수 선언 시작 */

    // console.log(goal)//react-form-hook submit 함수
    const onSubmit = (data) => { 

        setCreactTodoState(JSON.stringify(createTodoState));
        console.log(createTodoState)
        // setCreactGoalState(JSON.stringify(createGoalState));
        // addGoal(createGoalState);
        // window.location.replace("/goals")
    }

    const onError = (error) => {
    console.log(error);
    };

    function onInputChange(e) {
        const new_todo_item = createTodoState;
        new_todo_item.title = e.target.value;
        setCreactTodoState(new_todo_item)
    }

    /* 함수 선언 끝 */

    return  (
            <Box>
                <form onSubmit={handleSubmit(onSubmit,onError)} className="todo-form">
                    <InputBase {...register("title")} id="todo-input" className="todo-title-input"  placeholder="Placeholder" onChange={onInputChange} /> 
                    <InputBase {...register("goal_id")} id="todo-goal-id-input" className="todo-goal-id-input" type="hidden" value={id} /> 
                    <input className="todo_btn" type="submit" value={"확인"} />
                </form>
            </Box>
            )
}