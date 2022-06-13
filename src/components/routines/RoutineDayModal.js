import React, { useEffect, useState, useRef } from "react";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Modal, } from "@mui/material";

import { createRepeatDay } from "../../atoms/todoData";

import '../../stylesheets/CalendarBox.css';

export default function RoutineDayModal(props) {


    const dayActiveBoolean = props.dayActiveBoolean;
    const setDayActiveBoolean = props.setDayActiveBoolean;
    const createRoutinesState = props.createRoutinesState;

    const setCreateRoutinesState = props.setCreateRoutinesState;
    const editRoutinesState = props.editRoutinesState;
    const setEditRoutinesState = props.setEditRoutinesState;
    const position = props.position;

    console.log("position",position)

    const checkedHandler = (e) => {
        
        const clickedDay = e.currentTarget.value;

        if(position === "edit"){
            const copy_editRoutinesState = JSON.parse(JSON.stringify(editRoutinesState));
            console.log("copy_editRoutinesState", copy_editRoutinesState)

            copy_editRoutinesState.repeatDays[clickedDay] === false ? copy_editRoutinesState.repeatDays[clickedDay] = true : copy_editRoutinesState.repeatDays[clickedDay] = false;

            setEditRoutinesState(copy_editRoutinesState)

        } else if(position === "create"){
            const copy_createRoutinesState = JSON.parse(JSON.stringify(createRoutinesState));
            
            copy_createRoutinesState.repeatDays[clickedDay] === false ? copy_createRoutinesState.repeatDays[clickedDay] = true : copy_createRoutinesState.repeatDays[clickedDay] = false;
            setCreateRoutinesState(copy_createRoutinesState)
        }
        
        
    }
    const resetHandler = () => {
        //아래 전체 리셋은 굳이 안해도 되네요
        // copy_createRoutinesState = {
        //     "isRepeatMon":"n",
        //     "isRepeatTue":"n",
        //     "isRepeatWen":"n",
        //     "isRepeatThu":"n",
        //     "isRepeatFri":"n",
        //     "isRepeatSat":"n",
        //     "isRepeatSun":"n",
        // }
        // setCreateRoutinesState(copy_createRoutinesState)
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
                        { 
                            position === 'edit' ? ( <React.Fragment>
                                <label key={"isRepeatMon"}>
                                <input type="checkbox" name={'MON'} value={'MON'} id={"isRepeatMon"} checked={editRoutinesState.repeatDays['MON'] === false ? false : true} onChange={checkedHandler}/>월
                                </label>
                                <label key={"isRepeatTue"}>
                                <input type="checkbox" name={'TUE'} value={'TUE'} id={"isRepeatTue"} checked={ editRoutinesState.repeatDays['TUE'] === false ? false : true} onChange={checkedHandler}/>화
                                </label>
                                <label key={"isRepeatWen"}>
                                <input type="checkbox" name={'WEN'} value={'WED'} id={"isRepeatWen"} checked={editRoutinesState.repeatDays['WED']  === false ? false : true} onChange={checkedHandler}/>수
                                </label>
                                <label key={"isRepeatThu"}>
                                <input type="checkbox" name={'THU'} value={'THU'} id={"isRepeatThu"} checked={editRoutinesState.repeatDays['THU'] === false ? false : true} onChange={checkedHandler}/>목
                                </label>
                                <label key={"isRepeatFri"}>
                                <input type="checkbox" name={'FRI'} value={'FRI'} id={"isRepeatFri"} checked={editRoutinesState.repeatDays['FRI']  === false ? false : true} onChange={checkedHandler}/>금
                                </label>
                                <label key={"isRepeatSat"}>
                                <input type="checkbox" name={'SAT'} value={'SAT'} id={"isRepeatSat"} checked={editRoutinesState.repeatDays['SAT']  === false ? false : true} onChange={checkedHandler}/>토
                                </label>
                                <label key={"isRepeatSun"}>
                                <input type="checkbox" name={'SUN'} value={'SUN'} id={"isRepeatSun"} checked={editRoutinesState.repeatDays['SUN']  === false ? false : true} onChange={checkedHandler}/>일
                                </label>
                            </React.Fragment>
                            ) : ( <React.Fragment>
                                <label key={"isRepeatMon"}>
                                <input type="checkbox" name={'MON'} value={'MON'} id={"isRepeatMon"} checked={createRoutinesState.repeatDays['MON'] === false ? false : true} onChange={checkedHandler}/>월
                                </label>
                                <label key={"isRepeatTue"}>
                                <input type="checkbox" name={'TUE'} value={'TUE'} id={"isRepeatTue"} checked={createRoutinesState.repeatDays['TUE'] === false ? false : true} onChange={checkedHandler}/>화
                                </label>
                                <label key={"isRepeatWen"}>
                                <input type="checkbox" name={'WEN'} value={'WED'} id={"isRepeatWen"} checked={createRoutinesState.repeatDays['WED'] === false ? false : true} onChange={checkedHandler}/>수
                                </label>
                                <label key={"isRepeatThu"}>
                                <input type="checkbox" name={'THU'} value={'THU'} id={"isRepeatThu"} checked={createRoutinesState.repeatDays['THU'] === false ? false : true} onChange={checkedHandler}/>목
                                </label>
                                <label key={"isRepeatFri"}>
                                <input type="checkbox" name={'FRI'} value={'FRI'} id={"isRepeatFri"} checked={createRoutinesState.repeatDays['FRI'] === false ? false : true} onChange={checkedHandler}/>금
                                </label>
                                <label key={"isRepeatSat"}>
                                <input type="checkbox" name={'SAT'} value={'SAT'} id={"isRepeatSat"} checked={createRoutinesState.repeatDays['SAT'] === false ? false : true} onChange={checkedHandler}/>토
                                </label>
                                <label key={"isRepeatSun"}>
                                <input type="checkbox" name={'SUN'} value={'SUN'} id={"isRepeatSun"} checked={createRoutinesState.repeatDays['SUN'] === false ? false : true} onChange={checkedHandler}/>일
                                </label>
                            </React.Fragment>
                        )
                        }
                    </div>
                   <div className="dayPicker-btn-wrap">
                    <Button className="dayPicker-btn" onClick={()=>{setDayActiveBoolean(false)}}>확인</Button>
                    <Button className="dayPicker-btn" onClick={resetHandler}>취소</Button>
                    </div>  
            </div>
           
        </Modal>  
    )


}

