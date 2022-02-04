import React, { useEffect, useState, useRef } from "react";
import {  Button, List, ListItem, ListItemText, InputBase } from "@mui/material";
import { Box } from "@mui/system";
import { useRecoilState, useRecoilValue } from "recoil";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import '../stylesheets/Feed.css'

import { goalsData } from "../atoms/todoData";


export default function Feed() {


/* Hook 선언 시작 */

/* atom 시작 */

    let goal = useRecoilValue(goalsData);

    let [isClicked, setIsClicked] = useState(false);
    const inputRef = useRef();
    const buttonRef = useRef();


/* Hook 선언 끝 */

/* 함수 선언 시작 */


//목표 클릭 시 이벤트 핸들러
function clickTodoHandler(e){
    e.stopPropagation()
    e.preventDefault()
    const id = e.currentTarget.id;
    console.log(buttonRef.current.id)
    createTodo(id)
}

function createTodo(id) {
    console.log('id', id)
    
    isClicked? setIsClicked(isClicked=false) : setIsClicked(isClicked=true)
    console.log('isClicked', isClicked)

    return <InputBase className="goals-listItem-input" placeholder="Placeholder"  />

}

/* 함수 선언 끝 */



    return (
        <Box className='feed-box'>
        <h2 className="feed-title">Feed</h2>
        <Box className="feed-goals-list-box">
            <List className="goals-list-wrap" >
                {
                goal.map((item) => {

                return ( <ListItem className="goals-listItem" id={item.goal_id} key={item.goal_id} > 
                    <Button className="goals-listItem-text-wrap" id={item.goal_id} onClick={clickTodoHandler} ref={buttonRef}>
                    <LibraryBooksIcon className="goals-listItem-icon" />
                            <ListItemText className="goals-listItem-text" id={item.goal_id} name={item.goal_id} sx={{ color:item.title_color }}  >{item.title}</ListItemText>
                        <ListItemText className="goals-listItem-add-icon" ><span>+</span></ListItemText>
                    </Button>
                    {isClicked && buttonRef.current.id === 1? <InputBase className="goals-listItem-input" placeholder="Placeholder" ref={inputRef} /> : null}
                </ListItem>
                        );
                    })
                }
                

            </List>
        </Box>

        </Box>
    );
}