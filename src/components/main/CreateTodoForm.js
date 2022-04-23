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
    let todoDataArray = JSON.parse(JSON.stringify(dtTodos));

    /* atom 종료 */

    /* state 선언 시작 */

    const dtDate = props.dtDate;
    const goal_id = props.goalId;
    const new_todo_id = props.todoLength+1;
    const new_order_no = props.todoLength+1;
    const createTodoFieldReset = props.createTodoFieldReset;
    const copy_dtTodos = [...dtTodos];

    let id = props.id;

    let createTodoState = {
        id: goal_id,
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

    //createTodoForm에 값 없을 때 사라지게
    const inputValueCheckHandler =  (e) => { 
        if(e.currentTarget.value === "") {
            createTodoFieldReset()
        } else {
            createTodoStateSubmit(e)
        }
    }
    //엔터 클릭 시 inputValueCheckHandler 실행
    const onKeyPressHandler = (e) => {
        if(e.key === 'Enter' || e.code === 'NumpadEnter') inputValueCheckHandler(e)
    }

    //field에 글자 입력 시 createTodoState 객체 title 값 변경
    const onChangeCreateTodofield = (e) => {
        createTodoState.title = e.currentTarget.value;
    }

    //새로운 todo 넣기 / goal객체 찾아서 todos에 push
    const createTodoStateSubmit = (e) => {
        todoDataArray.map(data=>{
                if(data.id === goal_id){
                    data.todos.push(createTodoState)
                }
            }
        )
        setDtTodos(todoDataArray)
        createTodoFieldReset()
    }

    /* 함수 선언 종료 */

    return (
        <div className="create-todo-form">
            <CheckBoxOutlineBlankIcon className="create-todo-check-icon"/>
            <input ref={createInput} id="todo-input" className="create-todo-field"  placeholder="할 일을 입력해주세요." type="text" maxLength="50" 
            onChange={onChangeCreateTodofield}
            onBlur={inputValueCheckHandler}
            onKeyPress={onKeyPressHandler} 
            /> 
        </div>
    )
}