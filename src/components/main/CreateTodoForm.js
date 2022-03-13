import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { objTodosDataResult } from "../../atoms/todoData";


export default function CreateTodoForm (props) {

    /* hook 선언 시작 */

    let createInput = useRef();

    const { register, handleSubmit, errors, watch } = useForm({ mode: "onChange" });
    useEffect(() => {
        const inputElement = createInput.current;
        inputElement.focus();
      }, []);

    /* hook 선언 종료 */

    /* atom 시작 */
    let [dtTodos, setDtTodos] = useRecoilState(objTodosDataResult);

    /* atom 종료 */

    /* state 선언 시작 */

    const dtDate = props.dtDate;
    const new_goal_id = props.goalId;
    const new_todo_id = props.todoLength+1;
    const new_order_no = props.todoLength+1;
    const copy_dtTodos = [...dtTodos];


    let id = props.id;

    let createTodoState = {
        goalId: new_goal_id,
        todoId: new_todo_id,
        orderNo: new_order_no,
        title: "",
        date: dtDate.dtToday,
        endRepeatDate: dtDate.dtToday,
        repeatDays: {
          THU: "N",
          WEN: "N",
          TUE: "N",
          SAT: "N",
          FRI: "N",
          MON: "N",
          SUN: "N"
        },
        checkYn: "N"
    };

    /* state 선언 종료 */

    /* 함수 선언 시작 */

    //dtTodo에 반영
    const createTodo =  (e) => { 
        console.log("copy_dtTodos", copy_dtTodos)
   

    }
    //엔터 클릭 시 createTodo 실행
    const onKeyPressHandler = (e) => {
        if(e.key === 'Enter' || e.code === 'NumpadEnter') createTodo(e)
    }

    const onChangeCreateTodofield = (e) => {
        createTodoState.title = e.currentTarget.value;
    }

    /* 함수 선언 종료 */

    return (
        <div className="create-todo-form">
                <CheckBoxOutlineBlankIcon className="create-todo-check-icon"/>
                <input  ref={createInput} id="todo-input" className="create-todo-field"  placeholder="할 일을 입력해주세요." type="text" maxLength="50" 
                size={createInput.value.length}
                onChange={onChangeCreateTodofield}
                onBlur={createTodo}
                onKeyPress={onKeyPressHandler} 
                /> 

                <input id="create-todo-id" className="create-todo-id" type="hidden" value={id} /> 
                <button type="submit" className="create-todo-btn"></button>
        </div>
    )
}