import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd";

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
  let [originTodo, setOriginTodo] = useRecoilState(todoData);
  let todo = [...originTodo];

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

  function todoFragEndEventHandler(result) {
    if (!result.destination) return;
    console.log("result", result);
  }
  resetServerContext();

  return (
    // 드래그 영역 DragDrapContext
    <DragDropContext onDragEnd={goalDragEndEventHandler}>
      {/* 드래그 놓을 수 있는 영역 (드롭 영역) Droppable */}
      <Droppable droppableId="goals">
        {/* 드래그 Div 생성 */}
        {(provided, snapshot) => (
          <div className="order-box" {...provided.droppableProps} ref={provided.innerRef}>
            <div className="order-goals-list-box">
              <List className="goals-list-wrap">
                {goal.map((goal, index) => {
                  return (
                    <DragDropContext onDragEnd={todoFragEndEventHandler}>
                      <Draggable key={`goal` + goal.goal_id} draggableId={goal.goal_id.toString()} index={index} >
                        {(provided) => {
                          return (
                            <ListItem className="goals-listItem" key={`goal-` + index} data-index={index} index={index} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                              <ListItemText className="goals-listItem-text-wrap" id={goal.goal_id} index={index}>
                                {/* <LibraryBooksIcon className="goals-listItem-icon" /> */}
                                <ListItemText className="goals-listItem-text" id={goal.goal_id} name={goal.goal_id} sx={{ color: goal.title_color }} readOnly>
                                  {goal.title}
                                </ListItemText>
                              </ListItemText>
                              <Droppable droppableId="todos">
                                {(provided) => (
                                  <div className="todos-box" {...provided.droppableProps}ref={provided.innerRef}>
                                    {todo.map((todo, index) => {
                                      return (
                                        <Draggable key={`todo-${todo.goal_id}-goal-${todo.todo_id}`} draggableId={todo.todo_id.toString()} index={index}>
                                          {(provided) => {
                                              return (
                                            <ListItemText className="goals-todo-input-list-Box" key={`todo-` + index} data-index={index} index={index} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                              {goal.goal_id === parseInt(todo.goal_id) ? ( 
                                                  <div className="goals-todo-input-list-check-wrap">
                                                    {todo.check_yn === "Y" ? (
                                                      <CheckBoxIcon
                                                        className="goals-todo-list-input-check-icon"
                                                        data-index={index}
                                                      />
                                                    ) : (
                                                      <CheckBoxOutlineBlankIcon
                                                        className="goals-todo-list-input-check-icon"
                                                        data-index={index}
                                                      />
                                                    )}
                                                    <input
                                                      key={`todo-${todo.goal_id}-goal-${todo.todo_id}`}
                                                      id="todo-input"
                                                      className="goals-todo-list-input"
                                                      type="text"
                                                      maxLength={"80"}
                                                      name={todo.title}
                                                      data-index={index}
                                                      value={todo.title}
                                                      readOnly
                                                    />
                                                  </div>
                                               
                                              ) : null}
                                            </ListItemText>
                                          )}
                                          }
                                        </Draggable>
                                      ); // return 끝
                                    })}
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                            </ListItem>
                          );
                        }}
                      </Draggable>
                    </DragDropContext>
                  );
                })}
                {provided.placeholder}
              </List>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
