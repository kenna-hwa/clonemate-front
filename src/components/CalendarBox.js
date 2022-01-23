import React, { useState, useEffect } from 'react';
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import {Paper, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { ko } from "date-fns/locale";
import format from "date-fns/format";

import '../stylesheets/CalendarBox.css';
import * as apiAxios from '../api/axios';

// import CalendarPicker from '@mui/lab/CalendarPicker';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';


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

//서버에서 값 받아오는 경우

export async function fetchPostInfo (param) {
    const getTodoDataForCalendar = await apiAxios.getData(param);
    // console.log(getTodoDataForCalendar);

}


//ajax 통신을 통해 받아온 값 (theDayhasTodo, todoNum, todoChecked)
const getTodoDataForCalendar = [ { theDayhasTodo: '2022-01-08', todoNum: 2, todoChecked: 'n' }, { theDayhasTodo: '2022-01-14', todoNum: 4, todoChecked: 'n', }, { theDayhasTodo: '2022-01-27', todoNum: 6, todoChecked: 'y' } ];



export default function CalendarBox() {


    //컴포넌트 실행 시 서버에서 처음 값 받아오기

    // useEffect(() => {
    //     getTodoDataForCalendar();
    // }, []);

    const today = new Date(); // 오늘 날짜 객체
    const classes = styles(); // import those CSS
    const [selectedDate, setselectedDate] = useState(new Date()); //현재 선택된 날짜 state -> Feed 불러낼 때 사용
    let todoObj = {};

    // 데이터가 있는 날
    const theDayhasTodoArr = getTodoDataForCalendar.map(item => parseInt(item.theDayhasTodo.split('-')[2]));
    // 데이터가 있는 날 : todo 갯수 / 데이터가 모두 완료된 날 
    getTodoDataForCalendar.map(item =>  todoObj[parseInt(item.theDayhasTodo.split('-')[2])] = item.todoChecked!=='y'? item.todoNum : '✓');


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
        return dateTile
    }

  

    return(
          <MuiPickersUtilsProvider locale={ko} utils={DateFnsUtils} >
              <span className='yearMM'>{`${today.getFullYear()}년 ${today.getMonth()+1}월`}</span>
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

/* renderDay props로 함수가 필요함
day: Date,
selectedDate : Date,
isInCrrentMonth: boolean,
dayComponent: Element

이 props를 입력한 다음 날짜 타일로 렌더링 할 수 있는 요소를 반환한다.
DatePicker는 이 함수를 표시된 모든 날짜로 호출

필요한 경우
- 투두가 없는 날 : normal date tile
- 투두가 있는 날 : todo date tile (갯수)
- 투두를 모두 완료한 날 : complete date tile(색상, check✔)

만든 함수를 enderDate 요소에 지정
그러면 DatePicker가 날짜를 렌더링 하고 날짜 타일을 요청할 때마다 호출해준다. 만든 함수가 날짜를 확인하고 적절한 날짜 타일을 반환한다.

따라서 데이터는 
- 투두가 있는 날 theDayhasTodo
- 투두가 있는 날의 투두 갯수 todoNum
- 투두가 있는 날의 투두 완료 정보 (해당 날짜의 checked 의 값이 모두 y인가?) todoChecked

 투두 있으면 -> dateTile에 투두가 있는 날의 투두 갯수 넣음
     투두가 모두 완료 되면 -> 투두 갯수가 v 표시로 변환됨
*/ 
