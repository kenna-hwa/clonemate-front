import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import { objTodosData } from "../../atoms/todoData";
// import { postTodoCreateData } from "../../api/apiCommunicate";


export default function CreateTodoForm (props) {

    /* hook 선언 시작 */
    let history = useHistory();
    let createInput = useRef();

    const { register, handleSubmit, errors, watch } = useForm({ mode: "onChange" });
    useEffect(() => {
        const inputElement = createInput.current;
        inputElement.focus();
      }, []);

    /* hook 선언 종료 */

    /* atom 시작 */
    let [dtTodos, setDtTodos] = useRecoilState(objTodosData);
    let todoDataArray = JSON.parse(JSON.stringify(dtTodos));

    /* atom 종료 */

    /* state 선언 시작 */

    const dtDate = props.dtDate;
    const goal_id = props.goalId;
    const new_todo_id = props.todoLength+1;
    const new_order_no = props.todoLength+1;
    const createTodoFieldReset = props.createTodoFieldReset;

    let createTodoState = {
        "goalId": goal_id,
        "todoId": new_todo_id,
        "orderNo": new_order_no,
        "contents": "",
        "date": dtDate.dtToday,
        "startRepeatDate": dtDate.dtToday,
        "endRepeatDate": dtDate.dtToday,
        "isRepeatMon":false,
        "isRepeatTue":false,
        "isRepeatWen":false,
        "isRepeatThu":false,
        "isRepeatFri":false,
        "isRepeatSat":false,
        "isRepeatSun":false
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

    //field에 글자 입력 시 createTodoState 객체 contents 값 변경
    const onChangeCreateTodofield = (e) => {
        createTodoState.contents = e.currentTarget.value;
    }

    //새로운 todo 넣기 / goal객체 찾아서 todos에 push
    const createTodoStateSubmit = () => {
        //atom state 변화 없이 api 던져서 새로 받아오기 (atom의 dataset과 create state의 dataset이 서로 다름)
        console.log("투두 생성");
        // postTodoCreateData(createTodoState);
        createTodoFieldReset();
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