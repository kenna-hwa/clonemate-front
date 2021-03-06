import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { ko } from "date-fns/locale";
import { Box, Button, Modal } from "@mui/material";

import { objDatesData, selectedNewDate } from "../../atoms/todoData";


export default function CreateRoutinesEndDate(props) {

    const endDateCalenderBoolean = props.endDateCalenderBoolean;
    const setEndDateCalendarBoolean = props.setEndDateCalendarBoolean;
    const handleEndDateCalendarClose = props.handleEndDateCalendarClose;
    const calendarOnChangeEndRepeatDate = props.calendarOnChangeEndRepeatDate;

    let dateData = useRecoilValue(objDatesData);
    let [newDate, setNewDate] = useState(dateData.selectedNewDate);

    let dtToday = dateData.dtToday;
    let dtTomorrow = dateData.dtTomorrow;
    const week = new Array('일', '월', '화', '수', '목', '금', '토');
    const todoId = props.todoId;

    //선택된 날짜
    const selectedDate = props.selectedDate;
   

    let selectedYear = newDate.getFullYear();
    let selectedMonth = newDate.getMonth()+1;
    let selectedDay = newDate.getDate();
    let selectedLabel = newDate.getDay();
    let todayLabel = week[selectedLabel];


    useEffect(()=>{
    },[])


    
    return (
        <Modal open={endDateCalenderBoolean}
        onClose={handleEndDateCalendarClose} 
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
                <CalendarPicker className="todo-modal-datePicker" date={newDate} onChange={(date) => setNewDate(date)} />
                <div className="todo-modal-datePicker-btn-wrap">
                <Button className="todo-modal-datePicker-btn" data-index={todoId} data-day={selectedDate} onClick={calendarOnChangeEndRepeatDate}>확인</Button> <Button className="todo-modal-datePicker-btn" onClick={handleEndDateCalendarClose}>취소</Button>
                </div>
            </LocalizationProvider>
        </Box>
        </Modal>  
    )


}

