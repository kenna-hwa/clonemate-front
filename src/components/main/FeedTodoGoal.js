import React from "react";
import { Button } from "@mui/material";
import { useRecoilValue } from "recoil";

import { GoalsDataState }from '../../api/apiCommunicate'

 export default function FeedTodoGoal() {

    const goalState = useRecoilValue(GoalsDataState);
    console.log('goalState: ', goalState.goal_1);
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