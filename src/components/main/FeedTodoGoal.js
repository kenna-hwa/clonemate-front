import React from "react";
import { Button } from "@mui/material";
import { useRecoilValue } from "recoil";

import { GoalsDataState, TodosDataState } from "../../api/apiCommunicate";

export default function FeedTodoGoal() {
  const goalState = useRecoilValue(GoalsDataState);
  const TodoState = useRecoilValue(TodosDataState);

  return (
    <div className="goals-list-box">
      {goalState.map((goal, i) => {
        const goalTextColor = {
          color: goal.color,
        };
        return (
          <div className="goal-list">
            <Button
              key={goal.id}
              id={"goal" + goal.id}
              className={"feed_goal_" + goal.id}
              data-type={goal.id}
              data-order={goal.orderNo}
              data-privacy={goal.privacy}
              style={goalTextColor}
            >
              <span className="goals-list-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.5 36">
                  <path
                    data-name="Icon open-document"
                    d="M0 0v36h31.5V18h-18V0Zm18 0v13.5h13.5ZM4.5 9H9v4.5H4.5Zm0 9H9v4.5H4.5Zm0 9h18v4.5h-18Z"
                  />
                </svg>
              </span>
              {goal.contents}
              <span className="goals-add-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  w="14"
                  h="14"
                >
                  <g
                    data-name="Icon feather-plus"
                    fill="none"
                    stroke="#292929"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                  >
                    <path data-name="패스 2078" d="M12 1.5v21" />
                    <path data-name="패스 2079" d="M1.5 12h21" />
                  </g>
                </svg>
              </span>
            </Button>
            <ul className="todos-list-cont">
              {TodoState[i].map((todos) => {
                return (
                  <li
                    className={"todos" + todos.id}
                    data-goalId={todos.goalId}
                    data-order={todos.orderNo}
                  >
                    <input name={'todo'+todos.id} type="checkbox" checked={todos.isChecked} value={todos.isChecked}/>
                    <label for={'todo'+todos.id}></label>
                    {todos.contents}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
