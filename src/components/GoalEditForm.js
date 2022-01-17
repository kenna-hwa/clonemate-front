import { Button, Grid, Box, TextField } from "@mui/material";
import React, { useState } from "react";


export default function GoalEditForm(props){

    /* props 선언 시작 */

    const editGoal = props.editGoal;

    /* props 선언 끝 */


    /* Hook 선언 시작 */

    let [editGoalItem, editGoalItemChange] = useState({item : { id: '' , title : '' }});

    /* Hook 선언 끝 */


    /* 함수 선언 시작 */

    function onInputChange(e) {
        const editItem = editGoalItem.item; // editGoalItem state copy
        editItem.title = e.target.value;  // TextField에서 받아온 value
        editItem.id = e.target.id;  // TextField에서 받아온 id
        console.log('editItem ', editItem)
        editGoalItemChange({item : editItem})
    }

    function onButtonClick(){
        editGoal(editGoalItem.item);
    }

    function enterKeyEventHandler(e){
        onButtonClick();
    }

    /* 함수 선언 끝 */



    return(
        <Box style={{ margin : 16, padding: 16, position:'relative' }}>
            <p>수정</p>
            <Grid container>
                <Grid xs={11} md={11} item style={{paddingRight: 12}}>
                    <p className="goaleditform_title" style={{fontSize: '12px', color: '#aeaeae'}}>제목</p>
                    <TextField fullWidth id="goaleditform_textfield" variant="standard" onChange={onInputChange} /> 
                </Grid>
                <Grid xs={1} md={1} item >
                    <Button fullWidth color="secondary" onClick={onButtonClick} 
                    value={editGoalItem.item.title} onKeyPress={enterKeyEventHandler}
                    style={{position:'relative', top: '-85px',  fontSize: '14px', fontWeight: '600', color: '#111'}} >
                        확인
                    </Button>    
                </Grid>
            </Grid>
        </Box>
    )

}