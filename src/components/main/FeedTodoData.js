import React, { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { Button } from "@mui/material";

import { TodoModal } from "./TodoModal";
import { LikeListModal } from "./LikeListModal";

import { objTodosDataResult } from "../../atoms/todoData";
import {
  patchChangeContentsTodo,
  patchChangeCheckedTodo,
} from "../../api/apiCommunicate";

export default function FeedTodoData(props) {
  /* hook 선언 시작 */
  // let todo_input = useRef([]);
  let history = useHistory();

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
  const [modalActiveIndex, setModalActiveIndex] = useState(false);
  const [likeModalActiveIndex, setLikeModalActiveIndex] = useState(false);
  const [calendarActiveIndex, setCalendarActiveIndex] = useState(false);

  /* state 선언 종료 */

  /* 함수 선언 시작 */

  //투두 클릭 모달 onoff 핸들러
  const activeHandler = () => {
    setModalActiveIndex(true);
  };

  //좋아요 모달 onoff 핸들러
  const likeActiveHandler = () => {
    setLikeModalActiveIndex(true);
  };

  const readOnlyHandler = (index) => {
    if (index === modalActiveIndex) {
      setModalActiveIndex(false);
    } else {
      setModalActiveIndex(index);
    }
  };

  //Todo checkbox 핸들러
  const onClickTodoisChecked = (e) => {
    e.stopPropagation();
    const goal_id = parseInt(e.currentTarget.dataset.goalid);
    const todo_id = parseInt(e.currentTarget.dataset.todoid);
    let checkedData;
    todoDataArray.map((data) =>
      data.todos.map((todo) => {
        if (todo.goalId === goal_id && todo.id === todo_id) {
            checkedData = todo.isChecked === true
            ? (todo.isChecked = false)
            : (todo.isChecked = true);
        }
      })
    );

    //api로 전달
    patchChangeCheckedTodo(todo_id, checkedData);
    setDtTodos(todoDataArray); //setDtTodos 이용해 state 변경
  };

  //모달 수정 클릭 핸들러들

  //엔터키 인식 readonly 변경
  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter" || e.code === "NumpadEnter") {
      setReadOnly(true);
    }
  };

  //외부 클릭 readonly 변경
  const inputLostFocusEventHandler = (e) => {
    setReadOnly(true);
  };

  //투두 수정 버튼 클릭 이벤트 핸들러
  const todoModalEditHandler = (e) => {
    readOnly === false ? setReadOnly(true) : setReadOnly(false);
    setModalActiveIndex(false);
  };

  //모달 수정 클릭 핸들러
  const todoInputChangeHandler = (e) => {
    // console.log("입력 정보 ", e.currentTarget.value)

    const goal_id = parseInt(e.currentTarget.dataset.goalid);
    const todo_id = parseInt(e.currentTarget.dataset.todoid);

    let current_value = e.currentTarget.value;

    todoDataArray.map((data) =>
      data.todos.map((todo) => {
        if (todo.goalId === goal_id && todo.id === todo_id) {
          todo.contents = current_value;
        }
      })
    );
    //api로 전달
    patchChangeContentsTodo(current_value);
    setDtTodos(todoDataArray); //setDtTodos 이용해 state 변경
  };

  /* 함수 선언 종료 */

  return (
    <div className="todos-list-box" data-todos={todos}>
      <TodoModal
        index={index}
        modalActive={modalActiveIndex}
        todos={todos}
        setModalActiveIndex={setModalActiveIndex}
        readOnlyHandler={readOnlyHandler}
        todoModalEditHandler={todoModalEditHandler}
        calendarActiveIndex={calendarActiveIndex}
        setCalendarActiveIndex={setCalendarActiveIndex}
      />
      {todos.likes === null ? null : (
        <LikeListModal
          index={index}
          likeModalActive={likeModalActiveIndex}
          likeModalActiveIndex={likeModalActiveIndex}
          setLikeModalActiveIndex={setLikeModalActiveIndex}
          likesUser={todos.likes}
        />
      )}
      {/* <LikeListModal index={index} likeModalActive={likeModalActiveIndex}
            likeModalActiveIndex={likeModalActiveIndex} setLikeModalActiveIndex={setLikeModalActiveIndex} likesUser={todos.likes} /> */}
      <div
        className="goals-listItem-text-wrap"
        id={todos.todoId}
        data-index={todos.orderNo}
      >
        {todos.isChecked === true ? (
          <CheckBoxIcon
            data-goalid={todos.goalId}
            data-todoid={todos.id}
            className="todos-list-check-icon"
            data-check={todos.isChecked}
            onClick={onClickTodoisChecked}
          />
        ) : (
          <CheckBoxOutlineBlankIcon
            data-goalid={todos.goalId}
            data-todoid={todos.id}
            className="todos-list-check-icon"
            data-check={todos.isChecked}
            onClick={onClickTodoisChecked}
          />
        )}

        <TodoList
          todos={todos}
          readOnly={readOnly}
          // ref={inputElement}
          activeHandler={activeHandler}
          likeActiveHandler={likeActiveHandler}
          todoInputChangeHandler={todoInputChangeHandler}
          inputLostFocusEventHandler={inputLostFocusEventHandler}
          enterKeyEventHandler={enterKeyEventHandler}
        />
      </div>
    </div>
  );
}

const TodoList = React.forwardRef((props, ref) => {
  const inputRef = useRef(null);

  const todos = props.todos;
  const readOnly = props.readOnly;
  const activeHandler = props.activeHandler;
  const likeActiveHandler = props.likeActiveHandler;
  const todoInputChangeHandler = props.todoInputChangeHandler;
  const inputLostFocusEventHandler = props.inputLostFocusEventHandler;
  const enterKeyEventHandler = props.enterKeyEventHandler;

  return (
    <div className="todos-list-wrap">
      <input
        className="todos-list-input"
        key={todos.id}
        id="todo-input"
        type="text"
        maxLength="100"
        size={inputRef.current?.value.length}
        ref={inputRef}
        name={todos.contents}
        data-orderno={todos.orderNo}
        data-goalid={todos.goalId}
        data-todoid={todos.id}
        value={todos.contents}
        style={{ width: inputRef.current?.value.length * 13 + "px" }}
        readOnly={readOnly}
        onClick={() => activeHandler(todos.id)}
        onChange={todoInputChangeHandler}
        onBlur={inputLostFocusEventHandler}
        onKeyDown={enterKeyEventHandler}
      />
      {/* 만약 계정 주인이면 좋아요 누른 사람 보여주고, 다른 계정 유저면 좋아요 클릭되기 */}
      <Button
        className="todos-list-like-btn"
        onClick={() => {
          likeActiveHandler(todos.id);
        }}
      >
        <ThumbUpAltIcon />
        {todos.likes === null ? null : (
          <span className="todos-list-like-num">{todos.likes.length}</span>
        )}
        {/* <span className="todos-list-like-num">{todos.likes.length}</span> */}
      </Button>
    </div>
  );
});
