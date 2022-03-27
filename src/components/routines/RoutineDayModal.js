import React, { useEffect, useState, useRef } from "react";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Modal, } from "@mui/material";

import { createRepeatDay } from "../../atoms/todoData";

import '../../stylesheets/CalendarBox.css';

export default function RoutineDayModal(props) {


    const dayActiveBoolean = props.dayActiveBoolean;
    const setDayActiveBoolean = props.setDayActiveBoolean;
    const dayArr = props.dayArr;
    const createRoutinesState = props.createRoutinesState;
    const copy_repeatDays = {...createRoutinesState}
    const setCreactRoutinesState = props.setCreactRoutinesState;

    const checkedHandler = (e) => {
        const id = e.currentTarget.id;
        copy_repeatDays.repeatDays[id] === 'N' ? copy_repeatDays.repeatDays[id] = 'Y' : copy_repeatDays.repeatDays[id] = 'N';
        setCreactRoutinesState(copy_repeatDays)
    }
    const resetHandler = () => {
        copy_repeatDays.repeatDays = {
            THU: "N",
            WEN: "N",
            TUE: "N",
            SAT: "N",
            FRI: "N",
            MON: "N",
            SUN: "N"
        }
        setCreactRoutinesState(copy_repeatDays)
        setDayActiveBoolean(false)
    }

    return (
        <Modal open={dayActiveBoolean}
        onClose={setDayActiveBoolean} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="todo-modal-datePicker-wrap"
         >
            <div className="todo-modal-dayPicker-box">
                <h3 className="dayPicker-title">요일 선택</h3>
                    <div
                    aria-labelledby="dayPicker-label"
                    name="dayPicker-group"
                    id="dayPicker-checkbox-btn-wrap"
                    >
                    {dayArr.map((data)=>{
                        return (
                            <label key={data}>
                            <input type="checkbox" name={data['dayEng']} value={data['dayKor']} id={data['dayEng']} checked={data['checkYn'] === 'N' ? false : true} onChange={checkedHandler}/>{data['dayKor']} 
                            </label>
                        )
                    }
                    )}
                    </div>
                   <div className="dayPicker-btn-wrap">
                    <Button className="dayPicker-btn" onClick={()=>{setDayActiveBoolean(false)}}>확인</Button>
                    <Button className="dayPicker-btn" onClick={resetHandler}>취소</Button>
                    </div>  
            </div>
           
        </Modal>  
    )


}

