import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

import { objTodosDataResult, objDatesData  } from "../../atoms/todoData";

import { TodoModal } from "./TodoModal";
import { Button } from "@mui/material";

 export default function FeedTodoData(props) {


    /* hook 선언 시작 */
    // let todo_input = useRef([]);

    // useEffect(() => {
    // const inputElement = todo_input.current;
    //   },[]);
    /* hook 선언 종료 */
    

    /* atom 선언 시작 */

    let [dtTodos, setDtTodos] = useRecoilState(objTodosDataResult);
    let todoDataArray = JSON.parse(JSON.stringify(dtTodos));

    /* atom 선언 종료 */

    /* state 선언 시작 */
  
    const todos = props.todos; 
    const index = props.todos.todoId;

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

      //Todo checkbox 핸들러
    const onClickTodoCheckYn = (e) => {
      e.stopPropagation(); 
      const goal_id = parseInt(e.currentTarget.dataset.goalid);
      const todo_id = parseInt(e.currentTarget.dataset.todoid);

      todoDataArray.map(data=>
          data.todos.map(todo=>{
              if(todo.goalId === goal_id && todo.id === todo_id){
                  todo.checkYn === 'Y' ? todo.checkYn = 'N' : todo.checkYn = 'Y'
                  console.log("todo.checkYn " , todo.checkYn)
              }
          })
      )
      setDtTodos(todoDataArray) ;//setDtTodos 이용해 state 변경
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
                if(todo.goalId === goal_id && todo.id === todo_id){
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
                    <CheckBoxIcon data-goalid={todos.goalId} data-todoid={todos.todoId} className="todos-list-check-icon" data-check={todos.checkYn} onClick={onClickTodoCheckYn}
                    /> : 
                    <CheckBoxOutlineBlankIcon data-goalid={todos.goalId} data-todoid={todos.todoId} className="todos-list-check-icon"
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

    const todos = props.todos;
    const readOnly = props.readOnly;
    const activeHandler = props.activeHandler;
    const todoInputChangeHandler = props.todoInputChangeHandler;
    const inputLostFocusEventHandler = props.inputLostFocusEventHandler;
    const enterKeyEventHandler = props.enterKeyEventHandler;

    return (
        <div className="todos-list-wrap">
            <input
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
            />
                {/* 만약 계정 주인이면 좋아요 누른 사람 보여주고, 다른 계정 유저면 좋아요 클릭되기 */}
            <Button className="todos-list-like-btn" onClick={(e)=>{console.log(e)}}><ThumbUpAltIcon  /><span className="todos-list-like-num">{todos.likes.length}</span></Button>
        </div>
        )
})