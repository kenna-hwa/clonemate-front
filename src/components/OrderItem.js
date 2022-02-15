import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { DragDropContext, Droppable, Draggable, resetServerContext, } from "react-beautiful-dnd";

import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

import { goalsData, todoData, datesData } from "../atoms/todoData";

import "../stylesheets/OrderItem.css";

export default function OrderItem() {
  /* Hook 선언 시작 */

  /* atom 시작 */
  let dateData = useRecoilValue(datesData);
  let [goal, setGoal] = useRecoilState(goalsData);
  let [todo, setTodo] = useRecoilState(todoData);

  /* Hook 선언 끝 */

  /* 함수 선언 시작 */

  function goalDragEndEventHandler(result) {
    if (!result.destination) return;
    console.log("origin goal", goal);

    /* 220213 생성 */

    const currentOrder = JSON.parse(JSON.stringify(goal));
    const draggingItemIndex = result.source.index;
    const afterDragItemIndex = result.destination.index;
    const removeGoal = currentOrder.splice(draggingItemIndex, 1);

    currentOrder.splice(afterDragItemIndex, 0, removeGoal[0]);
    setGoal(currentOrder);
  }

function todoDragEndEventHandler(result) {
    if (!result.destination) return;
    console.log("result", result);

    // const currentOrder = JSON.parse(JSON.stringify(todo));
    // const draggingItemIndex = result.source.index;
    // const afterDragItemIndex = result.destination.index;
    // const removeTodo = currentOrder.splice(draggingItemIndex, 1);

    // currentOrder.splice(afterDragItemIndex, 0, removeTodo[0]);
    // setTodo(currentOrder);

  }
  resetServerContext();

  /* 함수 선언 끝 */
 

  return (
    <DragDropContext onDragEnd={goalDragEndEventHandler}>
    <Droppable  droppableId="GOALS" type="GOALS">
    {(provided, snapshot) => (
    <div className="order-box" {...provided.droppableProps}
    ref={provided.innerRef}>


            {goal.map((goal, index) => { //goal.map
            return (
                <Draggable key={`goal` + goal.goal_id} draggableId={goal.goal_id.toString()} index={index} >
                    {(provided) => {return (
                        <ListItem className="goals-listItem" id={goal.goal_id} key={goal.goal_id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}> {/* 드래그 해야할 요소 goal */}

                        <div className="goals-listItem-text-wrap"  data-index={index} >
                        <LibraryBooksIcon className="goals-listItem-icon" />
                                <ListItemText className="goals-listItem-text" name={goal.goal_id} sx={{ color:goal.title_color }}  >{goal.title}</ListItemText>
                            <ListItemText className="goals-listItem-add-icon" ><span>+</span></ListItemText>
                        </div>

{/* 
                        <TodoList goal={goal} todo={todo} /> */}

                        </ListItem>
                    )}}
                </Draggable>
            )
                              
            })}  {/* goal.map */}
    </div> /* order-box */
    )}
    </Droppable>
    </DragDropContext>


  ) //최상단 return 
    
}

export function TodoList (props) {

    const goal = props.goal;
    const todo = props.todo;


    
function todoDragEndEventHandler(result) {
    if (!result.destination) return;
    console.log("result", result);

    // const currentOrder = JSON.parse(JSON.stringify(todo));
    // const draggingItemIndex = result.source.index;
    // const afterDragItemIndex = result.destination.index;
    // const removeTodo = currentOrder.splice(draggingItemIndex, 1);

    // currentOrder.splice(afterDragItemIndex, 0, removeTodo[0]);
    // setTodo(currentOrder);

  }

    return(
        
    <DragDropContext onDragEnd={todoDragEndEventHandler} >
        {/* 드래그 놓을 수 있는 영역 (드롭 영역) Droppable */}
        <Droppable droppableId="TODOS"  type="TODOS">
        {/* 드래그 Div 생성 */}
        {(provided, snapshot) => (
        <div className="todo-box" {...provided.droppableProps} ref={provided.innerRef}>
        <List className="todo-list-wrap">
        {todo.map((todo,index)=>{ //todo.map
            return ( //todo.map return
               // 드래그 영역 DragDrapContext
                <Draggable key={`todo-${todo.goal_id}-goal-${todo.todo_id}`} draggableId={todo.todo_id.toString()} index={index}>
                    {(provided) => {return ( 
                    <div className="goals-todo-input-list-Box" key={`todo`+index} data-index={index} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {goal.goal_id === parseInt(todo.goal_id) ? (
                                <div className="goals-todo-input-list-check-wrap">
                                {todo.check_yn === 'Y' ?  <CheckBoxIcon className="goals-todo-list-input-check-icon" data-index={index} /> : <CheckBoxOutlineBlankIcon className="goals-todo-list-input-check-icon" data-index={index} /> }
                                    <p key={`todo${index}`} id="todo-input" className="goals-todo-list" 
                                    name={todo.title} data-index={index} >{todo.title} </p>
                                </div>
                        ) : null} 
                    </div>
                    )}}
                </Draggable>
            ) //todo.map return
        }) /* todo.map */}
        </List>
            </div>          
            )}
            </Droppable>
            </DragDropContext>
        
        
    )

}