import React, {  useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import EditRoutinesForm from './EditRoutinesForm';
import { objTodosDataResult } from "../../atoms/todoData";


export default function RoutinesTodos (props) {
    
    let [dtTodos, setDtTodos] = useRecoilState(objTodosDataResult);


    const todos = props.todos; 
    const index = props.todos.todoId;
    const [readOnly, setReadOnly] = useState(true);
    // contents를 editRoutinesForm으로 보내 전체 수정 유도
    const [editContents, setEditContents] = useState(todos.contents);

    //엔터키 인식 readonly 변경
    const enterKeyEventHandler = (e) => {
        if(e.key === 'Enter' || e.code === 'NumpadEnter'){ 
            setReadOnly(true)
        }
    }
  

    return (
        <div className="todos-list-box" data-todos={todos} key={index}>
                    <div className="goals-listItem-text-wrap">
                        {todos.check_yn === 'y' ?  <CheckBoxIcon className="todos-list-check-icon" /> : <CheckBoxOutlineBlankIcon className="todos-list-check-icon" /> }
                        <TodoList 
                        todos={todos} 
                        index={index}
                        readOnly={readOnly}
                        setReadOnly={setReadOnly}
                        editContents={editContents} 
                        setEditContents={setEditContents}
                        enterKeyEventHandler={enterKeyEventHandler} />
                        
                    </div>
                    {!readOnly ? (<>
                    <EditRoutinesForm todos={todos} goalId={todos.goalId} todoId={todos.id} 
                    // editContents로 contents를 보냄
                    editContents={editContents} setReadOnly={setReadOnly} /> 
                    </>) :
                    null} 
                    
        </div>
    )
}

const TodoList = React.forwardRef((props, ref) => {
  
    const inputRef = useRef(null);
    const todos = props.todos;
    const index = parseInt(props.index-1);
    const readOnly = props.readOnly;
    const setReadOnly = props.setReadOnly;
    const editContents = props.editContents;
    const setEditContents = props.setEditContents;

    const todoSelectedHandler = () => {
      setReadOnly(false)
    }

    // routines contents 부분 단독 수정 처리 
    const editRoutinesContents = (e) => {
        const copy_editContents = e.target.value;
        setEditContents(copy_editContents);
    }

    return (
        <>
        <input
        className="todos-list-input" key={todos.id} id="todo-input" type="text" 
        maxLength="50"
        size={inputRef.current?.value.length}
        ref={inputRef}
        name={todos.contents} 
        data-index={index}
        data-orderno={todos.orderNo}
        data-goalid={todos.goalId} 
        data-todoid={todos.id} 
        value={editContents} 
        readOnly={readOnly}
        onClick={todoSelectedHandler}
        onChange={editRoutinesContents}
        />
        
        </>
        )
})