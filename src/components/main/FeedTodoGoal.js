import React, { useEffect, useState, useRef } from "react";
import { Box, Button } from "@mui/material";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import FeedTodoData  from "./FeedTodoData";
import { TodoModal } from "./TodoModal";


 export default function FeedTodoGoal(props) {

    const data = props.data; 
    const idx = props.idx;
    const modalOpen = props.modalOpen;
    const onClickTodoCheckYn = props.onClickTodoCheckYn;
    const onClickGoalHandler = props.onClickGoalHandler;


    return (
        <div className="goals-list-box" key={data.goalOrderNo}>
            <Button className="list-goal-button" id={idx} data-index={idx} data={data} onClick={onClickGoalHandler}>
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
                    <>

                    <FeedTodoData todos={data} modalOpen={modalOpen}
                    onClickTodoCheckYn={onClickTodoCheckYn}  
                    />
                    </>
                    )
                }) 
                }
            </div>
        </div>
    )

} 