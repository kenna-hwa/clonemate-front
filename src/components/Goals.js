import React from "react";
import {  Button, InputBase, List, ListItem  } from "@mui/material";

export default function Goals(props) {

  /* props 선언 시작 */

  let goalItems = props.goal;
  let deleteGoal = props.deleteGoal;
  let editToGoalForm = props.editToGoalForm;
  let readOnly = props.readOnly;
  let readOnlyChange = props.readOnlyChange;

  /* props 선언 끝 */


  /* 함수 시작 */
  
  //목표 수정 이벤트핸들러 함수
  async function editEventHandler(e){
    const { id } = e.target;
    await readOnlyChange(readOnly='edit');
    console.log(readOnly)
    await editToGoalForm(id)
  }

  //목표 삭제 이벤트핸들러 함수

    function deleteEventHandler(e) {
      let deleteId = e.target.id;
      console.log( 'id : ',  deleteId)
      deleteGoal(deleteId, goalItems)
    }

/* 함수 끝 */


  return (
    <List>
        {
        goalItems.map((item, idx) => {
         
        return ( <ListItem className="goals-wrap" id={item.id} key={idx} onClick={editEventHandler} > 
                    <InputBase id={item.id} name={item.id} value={item.title} fullWidth></InputBase>
                    <Button aria-label="Delete Todo" id={item.id} onClick={deleteEventHandler} sx={{ fontSize: '14px' }}>
                        삭제
                    </Button>
                </ListItem>
                );
            })
        }
    </List>
  );
}
