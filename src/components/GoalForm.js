import { Button, Grid, Box, TextField } from "@mui/material";
import React, { useState } from "react";


export default function GoalForm(props){

    /* props 선언 시작 */

    const addGoal = props.addGoal;

    /* props 선언 끝 */


    /* Hook 선언 시작 */

    let [newGoalItem, newGoalItemChange] = useState({item : { title : '' }});

    /* Hook 선언 끝 */


    /* 함수 선언 시작 */

    function onInputChange(e) {
        const newItem = newGoalItem.item;
        newItem.title = e.target.value;
        newGoalItemChange({item : newItem})
    }

    function onButtonClick(){
        addGoal(newGoalItem.item);
    }
    
    function enterKeyEventHandler(e){
        onButtonClick();
    }

    /* 함수 선언 끝 */


    return(
        <Box style={{ margin : 16, padding: 16, position:'relative' }}>
            <Grid container>
                <Grid xs={11} md={11} item style={{paddingRight: 12}}>
                    <p className="goalform_title" style={{fontSize: '12px', color: '#aeaeae'}}>제목</p>
                    <TextField fullWidth id="goalform_textfield" variant="standard" onChange={onInputChange} /> 
                </Grid>
                <Grid xs={1} md={1} item >
                    <Button fullWidth color="secondary" onClick={onButtonClick} 
                    value={newGoalItem.item.title} onKeyPress={enterKeyEventHandler}
                    style={{position:'relative', top: '-85px',  fontSize: '14px', fontWeight: '600', color: '#111'}} >
                        확인
                    </Button>    
                </Grid>
            </Grid>
        </Box>
    )

}