import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {  Button, List, ListItem  } from "@mui/material";
import { Box } from "@mui/system";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import '../../stylesheets/Goal.css';

import { goalsData } from "../../atoms/todoData";


export default function Goals() {

  
  /* Hook 선언 시작 */

   /* atom 시작 */
  
  let goal = useRecoilValue(goalsData);// 목표goals 아이템
  let [readOnly, readOnlyChange] = useState('read'); //목표 수정표시



  /* Dummy State 끝 */
  
  useEffect(()=>{
    // recoil 에서 정보 갱신이 되었으면 하는데..?
    // goalItems = useRecoilState(goalsData)
  })



  /* Hook 선언 끝 */
 



  /* 함수 시작 */


  //목표수정 컴포넌트로 이동 함수 (파라미터 추가)
  function editToGoalForm(id){
    window.location.replace(`/goals/goalEditForm/`+id)
  }

  
  //목표 수정 이벤트핸들러 함수
  async function clickGoaltoEdit(e){
    const { id } = e.target;
    await readOnlyChange(readOnly='edit');
    console.log("readOnly", readOnly, id )
    await editToGoalForm(id)
  }


/* 함수 끝 */


  return (
    <Box className="goals-list-box">
    <List className="goals-list-wrap" >
        {
        goal.map((item, idx) => {
        return ( <ListItem className="goals-list" id={item.goal_id} key={item.goal_id} > 
                    <Button className="goals-listItem-btn" id={item.goal_id} name={item.goal_id} sx={{ color:item.title_color }} onClick={clickGoaltoEdit} >{item.title}</Button >
                    <ArrowForwardIosIcon className="goals-clickToEdit-btn"/>
                </ListItem>
                );
            })
        }
    </List>
    </Box>
  );
}
