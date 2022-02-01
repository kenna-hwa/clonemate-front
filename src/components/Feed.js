import React, { useEffect } from "react";
import {  Button, List, ListItem  } from "@mui/material";
import { Box } from "@mui/system";
import { useRecoilState, useRecoilValue } from "recoil";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { goalsData } from "../atoms/todoData";


export default function Feed() {


 /* Hook 선언 시작 */

   /* atom 시작 */

      let goal = useRecoilValue(goalsData);


  /* Hook 선언 끝 */

      



    return (
        <Box className='feed-wrap' sx={{ position: 'relative', width: '75vw', height: '100vh', top: '0', right: '0' }}>
        <p>feed</p>
        <Box className="goals-list-box">
            <List className="goals-list-wrap" >
                {
                goal.map((item, idx) => {
                return ( <ListItem className="goals-list" id={item.goal_id} key={item.goal_id} > 
                            <Button className="goals-listItem-btn" id={item.goal_id} name={item.goal_id} sx={{ color:item.title_color }}  >{item.title}</Button >
                            <ArrowForwardIosIcon className="goals-clickToEdit-btn"/>
                        </ListItem>
                        );
                    })
                }
            </List>
        </Box>

        </Box>
    );
}