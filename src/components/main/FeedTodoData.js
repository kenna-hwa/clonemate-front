import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {  Button, List, ListItem, ListItemText, Modal, } from "@mui/material";
import { Box } from "@mui/system";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import { objTodosDataResult, datesData  } from "../../atoms/todoData";

import { TodoModal } from "./TodoModal";
import hoursToSeconds from "date-fns/hoursToSeconds/index.js";

 export default function FeedTodoData(props) {


    /* hook 선언 시작 */
    // let todo_input = useRef([]);

    // useEffect(() => {
    // const inputElement = todo_input.current;
    //   },[]);
    /* hook 선언 종료 */
    
    /* state 선언 시작 */

    /* atom 선언 시작 */


    /* atom 선언 종료 */

    let [dtTodos, setDtTodos] = useRecoilState(objTodosDataResult);
    let todoDataArray = JSON.parse(JSON.stringify(dtTodos));
    const todos = props.todos; 
    const index = props.todos.todoId;
    const onClickTodoCheckYn = props.onClickTodoCheckYn;
    

    const [readOnly, setReadOnly] = useState(true);
    const [modalActiveIndex, setModalActiveIndex] = useState(0);


    /* state 선언 종료 */

    /* 함수 선언 시작 */

    const activeHandler = (index) => {
      if (index === modalActiveIndex) {
        setModalActiveIndex(null);
      } else {
        setModalActiveIndex(index);
      }
    }

    const readOnlyHandler = (index) => {
        if (index === modalActiveIndex) {
          setModalActiveIndex(null);
        } else {
          setModalActiveIndex(index);
        }
      }

    //모달 수정 클릭 핸들러들


    //엔터키 인식 readonly 변경
    const enterKeyEventHandler = (e) => {
        if(e.key === 'Enter' || e.code === 'NumpadEnter'){ 
            setReadOnly(true)
        }
    }

    //외부 클릭 readonly 변경
    const inputLostFocusEventHandler = (e) => {
        setReadOnly(true)
    }

    //투두 수정 버튼 클릭 이벤트 핸들러
    const todoModalEditHandler = (e) => {
        readOnly === false ? setReadOnly(true) : setReadOnly(false);
        setModalActiveIndex(null);
    }

    //모달 수정 클릭 핸들러
    const todoInputChangeHandler = (e) => {
        // console.log("입력 정보 ", e.currentTarget.value)
    
        const goal_id = parseInt(e.currentTarget.dataset.goalid);
        const todo_id = parseInt(e.currentTarget.dataset.todoid);
    
    
        let current_value = e.currentTarget.value;
    
        todoDataArray.map(data=>
            data.todos.map(todo=>{
                if(todo.goalId === goal_id && todo.todoId === todo_id){
                    todo.title = current_value;
                    console.log("todo, " , todo.title)
                }
            })
        )
        setDtTodos(todoDataArray) ;//setDtTodos 이용해 state 변경
    }


    /* 함수 선언 종료 */

    return (
        <div className="todos-list-box" data-todos={todos}>
            <TodoModal index={index} modalActive={index === modalActiveIndex? true : false} todos={todos} setModalActiveIndex={setModalActiveIndex} 
            readOnlyHandler={readOnlyHandler} todoModalEditHandler={todoModalEditHandler}
            /> 
            <div className="goals-listItem-text-wrap" 
            id={todos.todoId}
            data-index={todos.orderNo}>
                    {todos.checkYn === 'Y' ?  
                    <CheckBoxIcon className="todos-list-check-icon" data-check={todos.checkYn} onClick={onClickTodoCheckYn}
                    /> : 
                    <CheckBoxOutlineBlankIcon className="todos-list-check-icon"
                    data-check={todos.checkYn} onClick={onClickTodoCheckYn}
                    /> }
            <TodoList todos={todos} 
            readOnly={readOnly}
            // ref={inputElement}
            activeHandler={activeHandler}
            todoInputChangeHandler={todoInputChangeHandler} inputLostFocusEventHandler={inputLostFocusEventHandler} enterKeyEventHandler={enterKeyEventHandler} />
            </div>

        </div>
    )

} 

const TodoList = React.forwardRef((props, ref) => {
    const inputRef = useRef(null);

    console.log("ref", inputRef)
    console.log("length", inputRef.current?.value.length)


    // const ref = props.ref;
    const todos = props.todos;
    const readOnly = props.readOnly;
    const activeHandler = props.activeHandler;
    const todoInputChangeHandler = props.todoInputChangeHandler;
    const inputLostFocusEventHandler = props.inputLostFocusEventHandler;
    const enterKeyEventHandler = props.enterKeyEventHandler;

    return (<input
        className="todos-list-input" key={todos.todoId} id="todo-input" type="text" 
        maxLength="50"
        size={inputRef.current?.value.length}
        ref={inputRef}
        name={todos.title} 
        data-orderno={todos.orderNo}
        data-goalid={todos.goalId} 
        data-todoid={todos.todoId} 
        value={todos.title} 
        readOnly={readOnly}
        onClick={()=>activeHandler(todos.todoId)}
        onChange={todoInputChangeHandler}
        onBlur={inputLostFocusEventHandler}
        onKeyDown={enterKeyEventHandler}
        />)
})