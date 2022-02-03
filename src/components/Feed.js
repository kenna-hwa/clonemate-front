import React, { useEffect } from "react";
import {  Button, List, ListItem, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { useRecoilState, useRecoilValue } from "recoil";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import '../stylesheets/Feed.css'

import { goalsData } from "../atoms/todoData";


export default function Feed() {


/* Hook 선언 시작 */

/* atom 시작 */

    let goal = useRecoilValue(goalsData);


/* Hook 선언 끝 */

/* 함수 선언 시작 */

function createTodoHandler(e){
    e.stopPropagation()
    console.log(e.target)
}

/* 함수 선언 끝 */



    return (
        <Box className='feed-box'>
        <h2 className="feed-title">Feed</h2>
        <Box className="feed-goals-list-box">
            <List className="goals-list-wrap" >
                {
                goal.map((item, idx) => {

                return ( <ListItem className="goals-listItem" id={item.goal_id} key={item.goal_id} > 
                <Button className="goals-listItem-text-wrap" id={item.goal_id} onClick={createTodoHandler}>
                    <LibraryBooksIcon className="goals-listItem-icon" />
                            <ListItemText className="goals-listItem-text" id={item.goal_id} name={item.goal_id} sx={{ color:item.title_color }}  >{item.title}</ListItemText>
                        <ListItemText className="goals-listItem-add-icon" ><span>+</span></ListItemText>
                    </Button>
                </ListItem>
                        );
                    })
                }
            </List>
        </Box>

        </Box>
    );
}