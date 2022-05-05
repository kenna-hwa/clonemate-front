import React, { useEffect, useState, useRef } from "react";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Modal, } from "@mui/material";

import { createRepeatDay } from "../../atoms/todoData";

import '../../stylesheets/CalendarBox.css';

export default function RoutineDayModal(props) {


    const dayActiveBoolean = props.dayActiveBoolean;
    const setDayActiveBoolean = props.setDayActiveBoolean;
    const dayArr = props.dayArr;
    const createRoutinesState = props.createRoutinesState;
    const copy_createRoutinesState = {...createRoutinesState}
    const setCreatRoutinesState = props.setCreatRoutinesState;
    const editRoutinesState = props.editRoutinesState;
    const copy_editRoutinesState = {...editRoutinesState}
    const setEditRoutinesState = props.setEditRoutinesState;
    const position = props.position;
    console.log("position",position)
    console.log("copy_createRoutinesState",copy_createRoutinesState)


    const checkedHandler = (e) => {
        const id = e.currentTarget.id;
        const name = e.currentTarget.name;
   
        if(position === 'edit'){
            copy_editRoutinesState.repeatDays[name] === 'N' ? copy_editRoutinesState.repeatDays[name] = 'Y' : copy_editRoutinesState.repeatDays[name] = 'N';
            setEditRoutinesState(copy_editRoutinesState)
        } else if(position === 'create'){
            console.log("id", id)
            copy_createRoutinesState[id] === 'n' ? copy_createRoutinesState[id] = 'y' : copy_createRoutinesState[id] = 'n';
            setCreatRoutinesState(copy_createRoutinesState)
        }
        
        
    }
    const resetHandler = () => {
        //아래 전체 리셋은 굳이 안해도 되네요
        // copy_createRoutinesState = {
        //     "repeatMonYn":"n",
        //     "repeatTueYn":"n",
        //     "repeatWenYn":"n",
        //     "repeatThuYn":"n",
        //     "repeatFriYn":"n",
        //     "repeatSatYn":"n",
        //     "repeatSunYn":"n",
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
                                <label key={'repeatMonYn'}>
                                <input type="checkbox" name={'MON'} value={'repeatMonYn'} id={'repeatMonYn'} checked={editRoutinesState.repeatDays['MON'] === 'N' ? false : true} onChange={checkedHandler}/>월
                                </label>
                                <label key={'repeatTueYn'}>
                                <input type="checkbox" name={'TUE'} value={'repeatTueYn'} id={'repeatTueYn'} checked={ editRoutinesState.repeatDays['TUE'] === 'N' ? false : true} onChange={checkedHandler}/>화
                                </label>
                                <label key={'repeatWenYn'}>
                                <input type="checkbox" name={'WEN'} value={'repeatWenYn'} id={'repeatWenYn'} checked={editRoutinesState.repeatDays['WEN'] === 'N' ? false : true} onChange={checkedHandler}/>수
                                </label>
                                <label key={'repeatThuYn'}>
                                <input type="checkbox" name={'THU'} value={'repeatThuYn'} id={'repeatThuYn'} checked={editRoutinesState.repeatDays['THU'] === 'N' ? false : true} onChange={checkedHandler}/>목
                                </label>
                                <label key={'repeatFriYn'}>
                                <input type="checkbox" name={'FRI'} value={'repeatFriYn'} id={'repeatFriYn'} checked={editRoutinesState.repeatDays['FRI'] === 'N' ? false : true} onChange={checkedHandler}/>금
                                </label>
                                <label key={'repeatSatYn'}>
                                <input type="checkbox" name={'SAT'} value={'repeatSatYn'} id={'repeatSatYn'} checked={editRoutinesState.repeatDays['SAT'] === 'N' ? false : true} onChange={checkedHandler}/>토
                                </label>
                                <label key={'repeatSunYn'}>
                                <input type="checkbox" name={'SUN'} value={'repeatSunYn'} id={'repeatSunYn'} checked={editRoutinesState.repeatDays['SUN'] === 'N' ? false : true} onChange={checkedHandler}/>일
                                </label>
                            </React.Fragment>
                            ) : ( <React.Fragment>
                                <label key={'repeatMonYn'}>
                                <input type="checkbox" name={'MON'} value={'repeatMonYn'} id={'repeatMonYn'} checked={copy_createRoutinesState['repeatMonYn'] === 'n' ? false : true} onChange={checkedHandler}/>월
                                </label>
                                <label key={'repeatTueYn'}>
                                <input type="checkbox" name={'TUE'} value={'repeatTueYn'} id={'repeatTueYn'} checked={copy_createRoutinesState['repeatTueYn'] === 'n' ? false : true} onChange={checkedHandler}/>화
                                </label>
                                <label key={'repeatWenYn'}>
                                <input type="checkbox" name={'WEN'} value={'repeatWenYn'} id={'repeatWenYn'} checked={copy_createRoutinesState['repeatWenYn'] === 'n' ? false : true} onChange={checkedHandler}/>수
                                </label>
                                <label key={'repeatThuYn'}>
                                <input type="checkbox" name={'THU'} value={'repeatThuYn'} id={'repeatThuYn'} checked={copy_createRoutinesState['repeatThuYn'] === 'n' ? false : true} onChange={checkedHandler}/>목
                                </label>
                                <label key={'repeatFriYn'}>
                                <input type="checkbox" name={'FRI'} value={'repeatFriYn'} id={'repeatFriYn'} checked={copy_createRoutinesState['repeatFriYn'] === 'n' ? false : true} onChange={checkedHandler}/>금
                                </label>
                                <label key={'repeatSatYn'}>
                                <input type="checkbox" name={'SAT'} value={'repeatSatYn'} id={'repeatSatYn'} checked={copy_createRoutinesState['repeatSatYn'] === 'n' ? false : true} onChange={checkedHandler}/>토
                                </label>
                                <label key={'repeatSunYn'}>
                                <input type="checkbox" name={'SUN'} value={'repeatSunYn'} id={'repeatSunYn'} checked={copy_createRoutinesState['repeatSunYn'] === 'n' ? false : true} onChange={checkedHandler}/>일
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

