import React, { useEffect, useState } from 'react';
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import {Paper, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { ko } from "date-fns/locale";
import { useRecoilState, useRecoilValue } from "recoil";

import '../../stylesheets/CalendarBox.css';
import { objFeedCalendarOverview , objDatesData, objTodosDataResult} from "../../atoms/todoData";
import { getTodosOverviewData, getTodosData } from "../../api/apiCommunicate";



export const styles = makeStyles(() => ({ //define CSS for different date types
    notInThisMonthDayPaper: {
        visibility: "hidden",
        width: "18px",
        height: "18px",
        backgroundColor: "#00000000",
        fontSize: "0.825em",
        textAlign: "center",
        margin: "11px",
        padding: "1px",
    },
    normalDayPaper: {
        width: "18px",
        height: "18px",
        backgroundColor: "#70707030",
        margin: "11px",
        padding: "1px",
        cursor: "pointer",
    },  
    normalDayNum: {
        fontSize: "0.5em",
        textAlign: "center",
        color: "#707070",
        position: "relative",
        top: "3em"
    },
    selectedDayPaper: {
        width: "18px",
        height: "18px",
        backgroundColor: "#70707030",
        margin: "11px",
        padding: "1px",
        cursor: "pointer",
    },
    selectedDayNum: {
        fontSize: "0.5em",
        fontWeight: "700",
        textAlign: "center",
        textDecoration: "underline",
        color: "#000",
        position: "relative",
        top: "3em"
    },
    hasTodoDayPaper: {
        width: "18px",
        height: "18px",
        backgroundColor: "#70707080",
        margin: "11px",
        padding: "1px",
        cursor: "pointer",
    },
    hasTodoDayNum: {
        fontSize: "0.5em",
        textAlign: "center",
        color: "#707070",
        position: "relative",
        top: "3em"
    },
    CheckedTodoDayPaper: {
        width: "18px",
        height: "18px",
        backgroundColor: "#21bdbd",
        margin: "11px",
        padding: "1px",
        cursor: "pointer",
    },
    CheckedTodoDayNum: {
        fontSize: "0.5em",
        fontWeight: "700",
        textAlign: "center",
        color: "#21bdbd90",
        position: "relative",
        top: "3em"
    },
    todayPaper: {
        width: "18px",
        height: "18px",
        backgroundColor: "#70707030",
        margin: "11px",
        padding: "1px",
        cursor: "pointer",
    },
    todayNum: {
        fontSize: "0.5em",
        fontWeight: "600",
        color: "#222",
        textAlign: "center",
        position: "relative",
        top: "3em"
    },


}));

export default function CalendarBox({ calendarData }) {

/* state ?????? ?????? */

//????????????
const USER_NUM_ID = process.env.REACT_APP_USER_NUM_ID;

const [objDate, setObjDate] = useRecoilState(objDatesData);
const copy_objDate = {...objDate};
let [dtFeedCalendarOverview, setDtFeedCalendarOverview] = useRecoilState(objFeedCalendarOverview);
let [dtObjTodosDataResult, setDtObjTodosDataResult] = useRecoilState(objTodosDataResult);

const today = new Date(); // ?????? ?????? ??????
const classes = styles(); // import those CSS
const [selectedDate, setselectedDate] = useState(new Date(objDate.dtFeedCalendarDate)); //?????? ????????? ?????? state -> Feed ????????? ??? ??????

let todoObj = {};

/* state ?????? ?????? */

/* hook ?????? ?????? */



useEffect(()=>{

    //selectedDate ????????? Tododata??? dtFeedCalendarDate
    copy_objDate.dtFeedCalendarDate = selectedDate;
    setObjDate(copy_objDate);
    const localeSelectedDate = selectedDate.toJSON().substring(0, 10);
    const localeSelectedDateYm = selectedDate.toJSON().substring(0, 7);


    //???????????? ?????? ??? ???????????? ??? ????????? Atom??? ????????????

    //??? ??? todo ?????? -> ????????? ????????? ?????? TODO ??? ????????????
    //objDate.dtFeedCalendarDate??? feed ?????? ?????? objTodosDataResult ???????????????
    const newTodoOverviewData = getTodosOverviewData(USER_NUM_ID, localeSelectedDateYm)
    //setDtFeedCalendarOverview(newTodoOverviewData);
    //?????? ?????? ????????? ???????????? ?????????????

    //?????? todo ???????????? -> ????????? Feed ?????? TODO ??? ????????????
    const newTodoData = getTodosData(USER_NUM_ID, localeSelectedDate)
    //setDtObjTodosDataResult(newTodoData)

},[selectedDate])
    
    
/* hook ?????? ?????? */

/* ?????? ?????? ?????? */





// ???????????? ?????? ???
// ???????????? ?????? ??? : todo ?????? / ???????????? ?????? ????????? ??? 

const theDayhasTodoArr = dtFeedCalendarOverview.map((data,i) => data.numTodoDay);
    
//ajax ????????? ?????? ????????? ??? (numCountTodo, numTodoCount, completeYn)
    dtFeedCalendarOverview.map((item, i) =>  todoObj[item.numTodoDay] = item.ynComplete!=='Y'? item.numTodoCount : '???');

    //?????? ?????? ?????? ??????
    function getDayElement(day, selectedDate, isInCurrentMonth, dayComponent) {

        //boolean ?????? ???????????? ??????
        //???????????? ?????? ??? (todoData = todo ???????????? ?????? ??????) -> true
        const isHasTodoData = theDayhasTodoArr.includes(day.getDate()); 
        //????????? ?????? 
        const isSelected = day.getDate() === selectedDate.getDate();
        //?????? ??????
        const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth();

        //dateTile ??????
        let dateTile
        if (isInCurrentMonth) { //????????? ?????? ??????
            if (isHasTodoData) { //HasTodoData??? ?????? ??? = todo??? ?????? ??? -> ?????? ?????? todoChecked??? y ??? ???????????? 

                let d = day.getDate();
                dateTile = (
                    <Paper className={isNaN(todoObj[d])? classes.CheckedTodoDayPaper : isHasTodoData? classes.hasTodoDayPaper : isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper } ref={isNaN(todoObj[d])? classes.CheckedTodoDayPaper : isHasTodoData? classes.hasTodoDayPaper : isSelected? classes.selectedDayPaper : isToday? classes.todayPaper : classes.normalDayPaper}>
                        <Grid className={isNaN(todoObj[d])? classes.CheckedTodoDayNum : isHasTodoData? classes.hasTodoDayNum : isSelected? classes.selectedDayNum : isToday? classes.todayNum : classes.normalDayNum}>
                            {day.getDate()}
                        </Grid>
                       {isHasTodoData? <span className='todoDataNum'>{todoObj[d]}</span> : null}
                    </Paper>
                    )
            } else {
                dateTile = (
                <Paper className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}>   
                    <Grid className={isSelected? classes.selectedDayNum : isToday? classes.todayNum : classes.normalDayNum}> {day.getDate()}</Grid>
                </Paper>)
            }
        } 
        else {
            dateTile = (<Paper className={classes.notInThisMonthDayPaper}>
                <Grid className={isSelected? classes.selectedDayNum : isToday? classes.todayNum : classes.normalDayNum}>
                    {day.getDate()}
                </Grid>
            </Paper>)

        }
        return dateTile;
    }

    /* ?????? ?????? ?????? */

    return(
          <MuiPickersUtilsProvider id='calendarBox' locale={ko} utils={DateFnsUtils} >
                <DatePicker
                    value={selectedDate}
                    onChange={setselectedDate} //???????????? selectedDate (????????? ????????? ??????)
                    variant="static"
                    inputFormat={"yyyy-MM-dd"}
                    mask={"____-__-__"}
                    //renderDay props??? getDayElement ??????
                    renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => getDayElement(day, selectedDate, isInCurrentMonth, dayComponent)}

                />
        </MuiPickersUtilsProvider>
    );
}

