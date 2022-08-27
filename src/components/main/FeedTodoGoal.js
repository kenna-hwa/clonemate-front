import React from "react";
import { Button } from "@mui/material";
import { useRecoilValue } from "recoil";

import { GoalsDataState, TodosDataState } from "../../api/apiCommunicate";

export default function FeedTodoGoal() {
  const goalState = useRecoilValue(GoalsDataState);
  const TodoState = useRecoilValue(TodosDataState);
    // const goalList = goalState.map((goal) => <li>{ goal.contents }</li>);
        
    return (
        <div className="goals-list-box">
            <Button className="goals-list-button">
                
            </Button>
            <div className="todos-list-cont">
               
            </div>
        </div>
    )


}
