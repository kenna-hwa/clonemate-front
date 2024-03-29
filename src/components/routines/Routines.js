import React, {  useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import {  Button } from "@mui/material";
import ReceiptIcon from '@material-ui/icons/Receipt';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { objDatesData, objTodosData, } from "../../atoms/todoData";
import '../../stylesheets/Routines.css';

import RoutinesTodos from "./RoutinesTodos";
import CreateRoutinesForm from "./CreateRoutinesForm";

export default function Routines () {

/* Hook 선언 시작 */

let history = useHistory();

/* Hook 선언 종료 */

/* atom 시작 */

let [dtTodos, setDtTodos] = useRecoilState(objTodosData);
let todoDataArray = JSON.parse(JSON.stringify(dtTodos));
let dtDate = useRecoilValue(objDatesData);

/* atom 종료 */

/* state 선언 시작 */

let [isGoalSelected, setIsGoalSelected] = useState(Array(todoDataArray.length).fill(false) );
let [isTodoSelected, setIsTodoSelected] = useState(Array(todoDataArray.length).fill(false) );



/* state 선언 종료 */

/* 함수 선언 시작 */

const goalSelectedHandler = (e) => {
    const idx = e.currentTarget.dataset.id;
    const newArr = Array(todoDataArray.length).fill(false);
    newArr[idx] = true;
    setIsGoalSelected(newArr);
}
/* 함수 선언 끝 */

return (
<>
    <div className="routines-wrap">
        {  
            todoDataArray.map((data, index) => {
                return ( 
                    <div className="goals-list-box" key={data.id}> 
                        <Button className="goals-list-button" id={data.id} data-id={index} 
                        onClick={goalSelectedHandler}
                        >
                            <ReceiptIcon className="goals-list-icon" />
                                <div className="goals-list-text" id={data.id} name={data.id} style={{ color:data.color }}><p>{data.contents}</p>
                                </div>
                                <p className="goals-list-plus-icon-wrap">
                                <AddCircleIcon className="goals-list-plus-icon"/>
                                </p>
                        </Button>
                        
                    <div className="todos-list-cont">
                    {data.todos.map((data,index)=>{
                        return(
                            <React.Fragment key={data.id}>
                                <RoutinesTodos todos={data} 
                                setIsGoalSelected={setIsGoalSelected} 
                                todoDataArray={todoDataArray}
                                />
                            </React.Fragment>
                            
                        )
                    })}
                    {isGoalSelected[index]? <CreateRoutinesForm 
                    goalId={data.id} 
                    todoId={data.todos.length+1} 
                    orderNo={data.todos.length+1} 
                    setIsGoalSelected={setIsGoalSelected} 
                    todoDataArray={todoDataArray} />: null}
                    </div>
                    </div>
                )
            })
        }
        
    </div>

</>
);
}
