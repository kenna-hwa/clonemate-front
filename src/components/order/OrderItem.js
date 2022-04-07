import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd";

import ReceiptIcon from "@material-ui/icons/Receipt";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

import {
  objTodosDataResult,
  goalsData,
  todoData,
  objDatesData,
} from "../../atoms/todoData";

import "../../stylesheets/OrderItem.css";

export default function OrderItem() {
  /* Hook 선언 시작 */

  /* Hook 선언 종료 */

  /* state 선언 시작 */

  /* state 선언 종료 */

  /* atom 시작 */
  let dateData = useRecoilValue(objDatesData);
  // atom에서 goal+todo 데이터 가져오기
  let [dtTodos, setDtTodos] = useRecoilState(objTodosDataResult);
  const todoDataArray = JSON.parse(JSON.stringify(dtTodos));
  console.log("dtTodos", dtTodos)

  /* atom 종료 */

  /* 함수 선언 시작 */

  const onDragEnd = (res) => {
    if (!res.destination) return;
    //드래그 하는 sourced의 index
    const sourceGoalOrderNo = res.source.index;
    //드래그 해서 내려놓은 destination의 index
    const destinationGoalOrderNo = res.destination.index;
  console.log("sourceGoalOrderNo", sourceGoalOrderNo)
  todoDataArray.map((goal)=>{
      if(goal.goalOrderNo === sourceGoalOrderNo){
        goal.goalOrderNo = destinationGoalOrderNo;
      }
    })
    setDtTodos(todoDataArray)
}

  const onDragEndGoal = (result) => {
    if (!result.destination) return;

    
    const draggingItemIndex = result.source.index-1;
    const afterDragItemIndex = result.destination.index-1;
    const removeTag = todoDataArray.splice(draggingItemIndex, 1);

    todoDataArray.splice(afterDragItemIndex, 0, removeTag[0]);

    setDtTodos(todoDataArray);
  }

  /* 함수 선언 종료 */

  return (
    <DragDropContext onDragEnd={onDragEndGoal}>
      <Droppable droppableId="Goal">
      {provided =>  (
        <div className="goals-list-wrap" {...provided.droppableProps} ref={provided.innerRef}>
          {todoDataArray.map((data, index) => {
            return (
              <Draggable draggableId={String(data.goalOrderNo)} index={data.goalOrderNo} key={index}>
               {provided => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <OrderTodoGoal data={data} index={index}  id={data.goalId} todoDataArray={todoDataArray} setDtTodos={setDtTodos} />
                  </div>
                )}  
              </Draggable>
            )
          })}
          {provided.placeholder}
        </div>
      )}
      </Droppable>
    </DragDropContext>
  )

  // return (
  //   <div className="feed-wrap">
  //     <div className="goals-list-wrap">
  //       {todoDataArray.map((data, idx) => {
  //           return <OrderTodoGoal data={data} idx={idx} key={data.goalId} />
  //         })}
          
  //     </div>
  //   </div>
  // )
}

export const OrderTodoGoal = (props) => {

  const data = props.data;
  const index = props.index;
  const goal_id = props.id;
  const todoDataArray = props.todoDataArray;
  const setDtTodos = props.setDtTodos;
  /* 함수 선언 시작 */

  const onDragEnd = (res) => {
    if (!res.destination) return;
     //드래그 하는 sourced의 index
     const sourceTodoOrderNo = res.source.index;
  console.log("sourceTodoOrderNo", sourceTodoOrderNo)
  //드래그 해서 내려놓은 destination의 index
     const destinationTodoOrderNo = res.destination.index;

     todoDataArray.map((goal)=>{
        if(goal.goalId === goal_id){
          goal.todos.map((todo)=>{
            console.log("todo.orderNo", todo.orderNo)
            console.log("sourceTodoOrderNo", sourceTodoOrderNo)

            if(todo.orderNo === sourceTodoOrderNo){todo.orderNo = destinationTodoOrderNo}
            // !!! 변경은 되나 ... 여러개일때 순서가 바뀌지 않는다...?
            // !!! 1->3 으로 가면 1번이 3번이 되면서 나머지 2번이 1번이 되고 3번이 2번이 되어야 하는데
            // !!! 이 방식은 ...큐..?
          })
        }
     })
     setDtTodos(todoDataArray);
  }


  // const onDragEndTodo = (result) => {
  //   if (!result.destination) return;

    
  //   const draggingItemIndex = result.source.index-1;
  //   const afterDragItemIndex = result.destination.index-1;
  //   const removeTag = todoDataArray.splice(draggingItemIndex, 1);

  //   todoDataArray.todos.splice(afterDragItemIndex, 0, removeTag[0]);

  //   setDtTodos(todoDataArray);
  // }

  /* 함수 선언 종료 */

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="Todo">
      {provided =>  (
        <div className="goals-list-box" key={data.goalOrderNo} ref={provided.innerRef} {...provided.droppableProps}>
          {/* Goal 컴포넌트 시작 */}
          <Button className="goals-list-button" data-index={index} data={data}>
            <ReceiptIcon className="goals-list-icon" />
            <div className="goals-list-text" id={data.goalOrderNo} name={data.goalOrderNo} style={{ color: data.goalTitleColor }}>
              <p>{data.goalTitle}</p>
            </div>
            <p className="goals-list-plus-icon-wrap">
              <AddCircleIcon className="goals-list-plus-icon" />
            </p>
          </Button>
          {/* Goal 컴포넌트 종료 */}
          {/* Todo 컴포넌트 map 시작 */}
          <div className="todos-list-wrap">
            {data.todos.map((data, index) => {
              return (
                <Draggable draggableId={"todo" + index} index={data.orderNo} key={data.todoId}>
                  {provided => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                      <FeedTodoData todos={data} index={index}/> 
                    </div>
                 )}
                </Draggable>
              );
            })}
          </div>
          {/* Todo 컴포넌트 map 종료 */}
          {provided.placeholder} 
        </div>
      )}
      </Droppable>
    </DragDropContext>
  );
};



export const FeedTodoData = (props) => {
  const todos = props.todos;
  const index = props.todos.todoId;

  return (
    <div className="todos-list-box" data-todos={todos}>
      <div
        className="goals-listItem-text-wrap"
        id={todos.todoId}
        data-index={todos.orderNo}
      >
        {todos.checkYn === "Y" ? (
          <CheckBoxIcon
            data-goalid={todos.goalId}
            data-todoid={todos.todoId}
            className="todos-list-check-icon"
            data-check={todos.checkYn}
          />
        ) : (
          <CheckBoxOutlineBlankIcon
            data-goalid={todos.goalId}
            data-todoid={todos.todoId}
            className="todos-list-check-icon"
            data-check={todos.checkYn}
          />
        )}
        <TodoList todos={todos} />
      </div>
    </div>
  );
};

const TodoList = React.forwardRef((props, ref) => {
  const inputRef = useRef(null);

  const todos = props.todos;

  return (
    <input
      className="todos-list-input"
      key={todos.todoId}
      id="todo-input"
      type="text"
      maxLength="50"
      size={inputRef.current?.value.length}
      ref={inputRef}
      name={todos.title}
      data-orderno={todos.orderNo}
      data-goalid={todos.goalId}
      data-todoid={todos.todoId}
      value={todos.title}
      readOnly
    />
  );
});
