import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Controller } from "react-hook-form";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Modal, } from "@mui/material";

import { createRepeatDay } from "../../atoms/todoData";

import '../../stylesheets/CalendarBox.css';

export default function CreateRoutinesDay(props) {

    console.log("props.", props)

    const repeatDayCalenderBoolean = props.repeatDayCalenderBoolean;
    const handleDayCalendarClose = props.handleDayCalendarClose;
    const calendarOnChangeRepeatDays = props.calendarOnChangeRepeatDays;
    const dayENGKOR = props.dayENGKOR;
    const dayNameArr = {
        
            "SUN": "일", //y 면 일요일 반복, n 이면 반복 x
            "MON": "월",
            "TUE": "화",
            "WED": "수",
            "THU": "목",
            "FRI": "금",
            "SAT": "토",
    
    }

    // console.log("dayENGKOR", dayENGKOR)

    let [dayChecked, setDayChecked] = useRecoilState(createRepeatDay);



    const clickEventHandler = (e) => {
        console.log("e", e.target)
        
        let key = e.target.value;
        let id = e.target.id;


        const copyDayChecked = {...dayChecked};
        if(copyDayChecked[id] === 'Y'){
            copyDayChecked[id] = 'N';
        }else if(copyDayChecked[id] === 'N'){
            copyDayChecked[id] = 'Y';
        }
        setDayChecked(copyDayChecked)      
    };


    const todoId = props.todoId;
 
    return (
        <Modal open={repeatDayCalenderBoolean}
        onClose={handleDayCalendarClose} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="todo-modal-datePicker-wrap"
         >
            <Box className="todo-modal-datePicker-box">
            <FormControl className="todo-modal-dayPicker">
                <FormLabel id="dayPicker-label">요일 선택</FormLabel>
                    <FormGroup
                    aria-labelledby="dayPicker-label"
                    name="dayPicker-group"
                    id="dayPicker-checkbox-btn-wrap"
                    >
                    {dayNameArr.map((data, index)=>{
                        const key = data[0];
                        console.log("dayChecked[key]", dayChecked)
                        return (
                            <FormControlLabel control={<Checkbox value={index} id={data[0]} checked={dayChecked[key] == 'N'? false : true} onClick={clickEventHandler} />} label={data[1]} />
                        )
                    }
                    )}
                    </FormGroup>
                    <div className="todo-modal-datePicker-btn-wrap">
                    <Button className="todo-modal-datePicker-btn" data-index={todoId} onClick={calendarOnChangeRepeatDays} >확인</Button> <Button className="todo-modal-datePicker-btn" onClick={handleDayCalendarClose}>취소</Button>
                    </div>
            </FormControl>
            </Box>
           
        </Modal>  
    )


}

