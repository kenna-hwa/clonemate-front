import React, { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import ReceiptIcon from '@material-ui/icons/Receipt';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import FeedTodoData  from "./FeedTodoData";


 export default function FeedTodoGoal(props) {

    const data = props.data; 
    const idx = props.idx;
    const modalOpen = props.modalOpen;
    const onClickGoalHandler = props.onClickGoalHandler;


    return (
        <div className="goals-list-box" key={data.goalOrderNo}>
            <Button className="goals-list-button" id={idx} data-index={idx} data={data} onClick={onClickGoalHandler}>
                <ReceiptIcon className="goals-list-icon" />
                <p className="goals-list-text" id={data.goalOrderNo} name={data.goalOrderNo} style={{ color:data.goalTitleColor }}  ><p>{data.goalTitle}</p>
                </p>
                <p className="goals-list-plus-icon-wrap">
                <AddCircleIcon className="goals-list-plus-icon"/>
                </p>
            </Button>
            <div className="todos-list-wrap">
                {data.todos.map((data, idx)=>{
                    return (
                    <React.Fragment key={data.todoId}>
                    <FeedTodoData todos={data} modalOpen={modalOpen}
                    />
                    </React.Fragment>
                    )
                }) 
                }
            </div>
        </div>
    )

} 