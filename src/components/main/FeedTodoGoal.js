import React from "react";
import { Button } from "@mui/material";
import { useRecoilValue } from "recoil";

import { GoalsDataState, TodosDataState } from "../../api/apiCommunicate";

export default function FeedTodoGoal() {
  const goalState = useRecoilValue(GoalsDataState);
  const TodoState = useRecoilValue(TodosDataState);

  return (
    <div className="goals-list-box">
        {goalState.map(goal => {
            return <Button>{goal.contents
            
            }</Button>
        })
        }

{TodoState.map((todo)=>{ console.log("todo",todo)})}

      <div className="todos-list-cont">

      </div>
    </div>
  );
}
