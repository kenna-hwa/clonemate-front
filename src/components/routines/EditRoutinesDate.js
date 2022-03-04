import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { ko } from "date-fns/locale";
import { Box, Button, Modal } from "@mui/material";


export default function EditRoutinesDate(props) {

    const selectedInputIndex = props.selectedInputIndex;
    const selectedNewDate = props.selectedNewDate;
    const setSelectedNewDate = props.setSelectedNewDate;
    const  week = new Array('일', '월', '화', '수', '목', '금', '토');
    const calendarOpen = props.calendarOpen;
    const handleCalendarModalClose = props.handleCalendarModalClose;
    const todoChangeDateEventHandler = props.todoChangeDateEventHandler;
    //선택된 날짜
    const selectedDate = props.selectedDate;
   

    let selectedYear = selectedNewDate.getFullYear();
    let selectedMonth = selectedNewDate.getMonth()+1;
    let selectedDay = selectedNewDate.getDate();
    let selectedLabel = selectedNewDate.getDay();
    let todayLabel = week[selectedLabel];


    useEffect(()=>{
        // handleTodoModalClose()
    },[])

    
    
    return (
        <Modal open={calendarOpen}
        onClose={handleCalendarModalClose}
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
                <CalendarPicker className="todo-modal-datePicker" date={selectedNewDate} onChange={(newDate) => setSelectedNewDate(newDate)} />
                <div className="todo-modal-datePicker-btn-wrap">
                <Button className="todo-modal-datePicker-btn" data-index={selectedInputIndex} data-day={selectedDate} onClick={todoChangeDateEventHandler}>확인</Button> <Button className="todo-modal-datePicker-btn" onClick={handleCalendarModalClose}>취소</Button>
                </div>
            </LocalizationProvider>
        </Box>
        </Modal>  
    )


}

