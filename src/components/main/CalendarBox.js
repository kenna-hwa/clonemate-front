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

/* state 선언 시작 */

//환경변수
const USER_NUM_ID = process.env.REACT_APP_USER_NUM_ID;

const [objDate, setObjDate] = useRecoilState(objDatesData);
const copy_objDate = {...objDate};
let [dtFeedCalendarOverview, setDtFeedCalendarOverview] = useRecoilState(objFeedCalendarOverview);
let [dtObjTodosDataResult, setDtObjTodosDataResult] = useRecoilState(objTodosDataResult);

const today = new Date(); // 오늘 날짜 객체
const classes = styles(); // import those CSS
const [selectedDate, setselectedDate] = useState(new Date(objDate.dtFeedCalendarDate)); //현재 선택된 날짜 state -> Feed 불러낼 때 사용

let todoObj = {};

/* state 선언 종료 */

/* hook 선언 시작 */



useEffect(()=>{

    //selectedDate 변경시 Tododata의 dtFeedCalendarDate
    copy_objDate.dtFeedCalendarDate = selectedDate;
    setObjDate(copy_objDate);
    const localeSelectedDate = selectedDate.toJSON().substring(0, 10);
    const localeSelectedDateYm = selectedDate.toJSON().substring(0, 7);


    //컴포넌트 실행 시 서버에서 값 받아서 Atom에 업데이트

    //한 달 todo 조회 -> 아톰에 캘린더 표시 TODO 값 업데이트
    //objDate.dtFeedCalendarDate로 feed 에서 쓰는 objTodosDataResult 받아와주기
    const newTodoOverviewData = getTodosOverviewData(USER_NUM_ID, localeSelectedDateYm)
    //setDtFeedCalendarOverview(newTodoOverviewData);
    //만약 값이 바뀌면 업데이트 해야하나?

    //당일 todo 조회하기 -> 아톰에 Feed 표시 TODO 값 업데이트
    const newTodoData = getTodosData(USER_NUM_ID, localeSelectedDate)
    //setDtObjTodosDataResult(newTodoData)

},[selectedDate])
    
    
/* hook 선언 종료 */

/* 함수 선언 시작 */





// 데이터가 있는 날
// 데이터가 있는 날 : todo 갯수 / 데이터가 모두 완료된 날 

const theDayhasTodoArr = dtFeedCalendarOverview.map((data,i) => data.numTodoDay);
    
//ajax 통신을 통해 받아온 값 (numCountTodo, numTodoCount, completeYn)
    dtFeedCalendarOverview.map((item, i) =>  todoObj[item.numTodoDay] = item.ynComplete!=='Y'? item.numTodoCount : '✓');

    //날짜 타일 변경 함수
    function getDayElement(day, selectedDate, isInCurrentMonth, dayComponent) {

        //boolean 으로 바꿔주는 작업
        //데이터가 있을 때 (todoData = todo 데이터가 있는 날짜) -> true
        const isHasTodoData = theDayhasTodoArr.includes(day.getDate()); 
        //클릭된 날짜 
        const isSelected = day.getDate() === selectedDate.getDate();
        //오늘 날짜
        const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth();

        //dateTile 생성
        let dateTile
        if (isInCurrentMonth) { //데이터 타일 반환
            if (isHasTodoData) { //HasTodoData가 있을 때 = todo가 있는 날 -> 갯수 표시 todoChecked가 y 면 색상변환 

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

    /* 함수 선언 종료 */

    return(
          <MuiPickersUtilsProvider locale={ko} utils={DateFnsUtils} >
                <DatePicker
                    value={selectedDate}
                    onChange={setselectedDate} //클릭하면 selectedDate (선택한 날짜로 보냄)
                    variant="static"
                    inputFormat={"yyyy-MM-dd"}
                    mask={"____-__-__"}
                    //renderDay props로 getDayElement 전달
                    renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => getDayElement(day, selectedDate, isInCurrentMonth, dayComponent)}

                />
        </MuiPickersUtilsProvider>
    );
}

