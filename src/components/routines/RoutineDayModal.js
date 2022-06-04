import React, { useEffect, useState, useRef } from "react";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Modal, } from "@mui/material";

import { createRepeatDay } from "../../atoms/todoData";

import '../../stylesheets/CalendarBox.css';

export default function RoutineDayModal(props) {


    const dayActiveBoolean = props.dayActiveBoolean;
    const setDayActiveBoolean = props.setDayActiveBoolean;
    const createRoutinesState = props.createRoutinesState;
    const copy_createRoutinesState = {...createRoutinesState}
    const setCreatRoutinesState = props.setCreatRoutinesState;
    const editRoutinesState = props.editRoutinesState;
    const copy_editRoutinesState = {...editRoutinesState}
    const setEditRoutinesState = props.setEditRoutinesState;
    const position = props.position;

    console.log("position",position)

    const checkedHandler = (e) => {
        const clickedDay = e.currentTarget.value;

        if(position === 'edit'){
            copy_editRoutinesState[clickedDay] === false ? copy_editRoutinesState[clickedDay] = true : copy_editRoutinesState[clickedDay] = false;
            console.log("copy_editRoutinesState", copy_editRoutinesState)
            setEditRoutinesState(copy_editRoutinesState)

        } else if(position === 'create'){

            copy_createRoutinesState[clickedDay] === false ? copy_createRoutinesState[clickedDay] = true : copy_createRoutinesState[clickedDay] = false;
            setCreatRoutinesState(copy_createRoutinesState)
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
        // setCreatRoutinesState(copy_createRoutinesState)
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
                                <label key={'isRepeatMon'}>
                                <input type="checkbox" name={'MON'} value={'isRepeatMon'} id={'isRepeatMon'} checked={editRoutinesState['isRepeatMon'] === false ? false : true} onChange={checkedHandler}/>월
                                </label>
                                <label key={'isRepeatTue'}>
                                <input type="checkbox" name={'TUE'} value={'isRepeatTue'} id={'isRepeatTue'} checked={ editRoutinesState['isRepeatTue']  === false ? false : true} onChange={checkedHandler}/>화
                                </label>
                                <label key={'isRepeatWen'}>
                                <input type="checkbox" name={'WEN'} value={'isRepeatWen'} id={'isRepeatWen'} checked={editRoutinesState['isRepeatWen']  === false ? false : true} onChange={checkedHandler}/>수
                                </label>
                                <label key={'isRepeatThu'}>
                                <input type="checkbox" name={'THU'} value={'isRepeatThu'} id={'isRepeatThu'} checked={editRoutinesState['isRepeatThu']  === false ? false : true} onChange={checkedHandler}/>목
                                </label>
                                <label key={'isRepeatFri'}>
                                <input type="checkbox" name={'FRI'} value={'isRepeatFri'} id={'isRepeatFri'} checked={editRoutinesState['isRepeatFri']  === false ? false : true} onChange={checkedHandler}/>금
                                </label>
                                <label key={'isRepeatSat'}>
                                <input type="checkbox" name={'SAT'} value={'isRepeatSat'} id={'isRepeatSat'} checked={editRoutinesState['isRepeatSat']  === false ? false : true} onChange={checkedHandler}/>토
                                </label>
                                <label key={'isRepeatSun'}>
                                <input type="checkbox" name={'SUN'} value={'isRepeatSun'} id={'isRepeatSun'} checked={editRoutinesState['isRepeatSun']  === false ? false : true} onChange={checkedHandler}/>일
                                </label>
                            </React.Fragment>
                            ) : ( <React.Fragment>
                                <label key={'isRepeatMon'}>
                                <input type="checkbox" name={'MON'} value={'isRepeatMon'} id={'isRepeatMon'} checked={copy_createRoutinesState['isRepeatMon'] === false ? false : true} onChange={checkedHandler}/>월
                                </label>
                                <label key={'isRepeatTue'}>
                                <input type="checkbox" name={'TUE'} value={'isRepeatTue'} id={'isRepeatTue'} checked={copy_createRoutinesState['isRepeatTue'] === false ? false : true} onChange={checkedHandler}/>화
                                </label>
                                <label key={'isRepeatWen'}>
                                <input type="checkbox" name={'WEN'} value={'isRepeatWen'} id={'isRepeatWen'} checked={copy_createRoutinesState['isRepeatWen'] === false ? false : true} onChange={checkedHandler}/>수
                                </label>
                                <label key={'isRepeatThu'}>
                                <input type="checkbox" name={'THU'} value={'isRepeatThu'} id={'isRepeatThu'} checked={copy_createRoutinesState['isRepeatThu'] === false ? false : true} onChange={checkedHandler}/>목
                                </label>
                                <label key={'isRepeatFri'}>
                                <input type="checkbox" name={'FRI'} value={'isRepeatFri'} id={'isRepeatFri'} checked={copy_createRoutinesState['isRepeatFri'] === false ? false : true} onChange={checkedHandler}/>금
                                </label>
                                <label key={'isRepeatSat'}>
                                <input type="checkbox" name={'SAT'} value={'isRepeatSat'} id={'isRepeatSat'} checked={copy_createRoutinesState['isRepeatSat'] === false ? false : true} onChange={checkedHandler}/>토
                                </label>
                                <label key={'isRepeatSun'}>
                                <input type="checkbox" name={'SUN'} value={'isRepeatSun'} id={'isRepeatSun'} checked={copy_createRoutinesState['isRepeatSun'] === false ? false : true} onChange={checkedHandler}/>일
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

