import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { ko } from "date-fns/locale";
import { Box, Button, Modal } from "@mui/material";

import { objDatesData } from "../../atoms/todoData";


export default function RoutineDateModal(props) {

  
    const [dtDate, setDtDate] = useRecoilState(objDatesData)
    const dateActiveBoolean = props.dateActiveBoolean;
    const setDateActiveBoolean = props.setDateActiveBoolean;
    const createRoutinesState = props.createRoutinesState;
    const setCreateRoutinesState = props.setCreateRoutinesState;
    const editRoutinesState = props.editRoutinesState;
    const setEditRoutinesState = props.setEditRoutinesState;
    const location = props.location;    
    const position = props.position;    
    const dtSelectedDate = dtDate.selectedNewDate;
    const copy_dtDate = {...dtDate};
    const copy_createRoutinesState = {...createRoutinesState};
    const copy_editRoutinesState = {...editRoutinesState};


    const week = new Array('일', '월', '화', '수', '목', '금', '토');

    //선택된 날짜  

    let selectedYear = dtSelectedDate.getFullYear();
    let selectedMonth = dtSelectedDate.getMonth()+1;
    let selectedDay = dtSelectedDate.getDate();
    let selectedLabel = dtSelectedDate.getDay();
    let todayLabel = week[selectedLabel];

    const saveSelectedNewDate = (date) => {
        copy_dtDate.selectedNewDate = date;
        setDtDate(copy_dtDate)
    }

    const calendarOnChangeDate = (e) => {
        if(position === "edit"){
            console.log("copy_editRoutinesState", copy_editRoutinesState)

            const destination = e.currentTarget.dataset.destination;
            copy_editRoutinesState[destination] = dtSelectedDate.toJSON().substring(0, 10);
            console.log(dtSelectedDate.toJSON().substring(0, 10))
            setEditRoutinesState(copy_editRoutinesState)
            setDateActiveBoolean(false)

        } else if(position === "create"){
            console.log("copy_createRoutinesState", copy_createRoutinesState)

            const destination = e.currentTarget.dataset.destination;
            copy_createRoutinesState[destination] = dtSelectedDate.toJSON().substring(0, 10);
            console.log(dtSelectedDate.toJSON().substring(0, 10))
            setCreateRoutinesState(copy_createRoutinesState)
            setDateActiveBoolean(false)
        }
        
    }
    
    return (
        <Modal open={dateActiveBoolean}
        onClose={setDateActiveBoolean} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="todo-modal-datePicker-wrap"
         >
        <Box className="todo-modal-datePicker-box">
            <LocalizationProvider locale={ko} dateAdapter={AdapterDateFns}>
                <div className="todo-modal-datePicker-box-title-wrap">
                    <p>선택한 날짜</p>
                    <span>{selectedYear +`년 `+ selectedMonth +`월 `+ selectedDay+ `일 ` + todayLabel + `요일`}</span>
                </div>
                <CalendarPicker className="todo-modal-datePicker" date={dtSelectedDate} onChange={(date) => saveSelectedNewDate(date)} />
                <div className="todo-modal-datePicker-btn-wrap">
                <Button className="todo-modal-datePicker-btn"
                data-destination={location} onClick={calendarOnChangeDate}>확인</Button> <Button className="todo-modal-datePicker-btn" onClick={()=>{setDateActiveBoolean(false)}}>취소</Button>
                </div>
            </LocalizationProvider>
        </Box>
        </Modal>  
    )


}

