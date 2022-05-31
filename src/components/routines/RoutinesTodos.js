import React, {  useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";


import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import EditRoutinesForm from './EditRoutinesForm';


export default function RoutinesTodos (props) {


    const todos = props.todos; 
    const index = props.todos.todoId;
    const isTodoSelected = props.isTodoSelected;
    const [readOnly, setReadOnly] = useState(true);

      
    //엔터키 인식 readonly 변경
    const enterKeyEventHandler = (e) => {
        if(e.key === 'Enter' || e.code === 'NumpadEnter'){ 
            setReadOnly(true)
        }
    }
  
    // const readOnlyHandler = (index) => {
    //     if (index === modalActiveIndex) {
    //       setModalActiveIndex(null);
    //     } else {
    //       setModalActiveIndex(index);
    //     }
    //   }

    return (
        <div className="todos-list-box" data-todos={todos} key={index}>
                    <div className="goals-listItem-text-wrap">
                        {todos.check_yn === 'y' ?  <CheckBoxIcon className="todos-list-check-icon" /> : <CheckBoxOutlineBlankIcon className="todos-list-check-icon" /> }
                        <TodoList 
                        todos={todos} 
                        index={index}
                        readOnly={readOnly}
                        setReadOnly={setReadOnly}
                        isTodoSelected={isTodoSelected}
                        enterKeyEventHandler={enterKeyEventHandler} />
                        
                    </div>
                    {!readOnly ? (<>
                    <EditRoutinesForm todos={todos} goalId={todos.goalId} todoId={todos.id} set
                    ReadOnly={setReadOnly} /> 
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
    const isTodoSelected = props.isTodoSelected;
    
    const todoSelectedHandler = () => {
      setReadOnly(false)
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
        value={todos.contents} 
        readOnly={readOnly}
        onClick={todoSelectedHandler}
        />
        
        </>
        )
})