import React, { useState } from 'react';
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import '../stylesheets/CalendarBox.css';
import {Paper, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


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
        backgroundColor: "#707070",
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
        backgroundColor: "#707070",
        margin: "11px",
        padding: "1px",
        cursor: "pointer",
    },
    selectedDayNum: {
        fontSize: "0.5em",
        fontWeight: "500",
        textAlign: "center",
        textDecoration: "underline",
        color: "#222",
        position: "relative",
        top: "3em"
    },
    todayPaper: {
        width: "18px",
        height: "18px",
        backgroundColor: "#707070",
        margin: "11px",
        padding: "1px",
        cursor: "pointer",
    },
    todayNum: {
        fontSize: "0.5em",
        fontWeight: "600",
        color: "blue",
        textAlign: "center",
        position: "relative",
        top: "3em"
    },


}));



export default function CalendarBox() {

  const today = new Date(); // 오늘 날짜 객체
  const classes = styles(); // import those CSS
  const [selectedDate, setselectedDate] = useState(new Date()); //현재 선택된 날짜 state

    const resultArray = [ { date: 1, todoNum: 2}, { date: 15, todoNum: 4}, { date: 27, todoNum: 6} ];
      

    const todoData = resultArray.map(a => a.date); // 데이터가 있는 날
    console.log(todoData);
    const todoDataNum = '2';

  //날짜 타일 변경 함수

  function getDayElement(day, selectedDate, isInCurrentMonth, dayComponent) {
    //generate boolean 
    const isHasTodoData = todoData.includes(day.getDate()); 
    //데이터가 있을 때 (todoData = todo 데이터가 있는 날짜) 
    const howManyTodoData = todoDataNum.includes(day.getDate())
    console.log('howManyTodoData', howManyTodoData)

    const isSelected = day.getDate() === selectedDate.getDate();
    const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth();

    let dateTile
    if (isInCurrentMonth) { //conditionally return appropriate Element of date tile.
        if (isHasTodoData) {
            dateTile = (
                <Paper className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}>
                    <Grid className={isSelected? classes.selectedDayNum : isToday? classes.todayNum : classes.normalDayNum}>
                        {day.getDate()}
                    </Grid>
                    <span className="todoDataNum">{todoDataNum}</span>
                </Paper>)
        } else {
            dateTile = (
              <Paper className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}>   
                <Grid className={isSelected? classes.selectedDayNum : isToday? classes.todayNum : classes.normalDayNum}> {day.getDate()}</Grid>
            </Paper>)
        }

    } else {
        dateTile = (<Paper className={classes.notInThisMonthDayPaper}>
            <Grid className={isSelected? classes.selectedDayNum : isToday? classes.todayNum : classes.normalDayNum}>
                {day.getDate()}
            </Grid>
        </Paper>)
    }
    return dateTile
}

  

    return(
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    value={selectedDate}
                    onChange={setselectedDate}
                    variant="static"

                    //만든 함수 props로 전달
                    renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => getDayElement(day, selectedDate, isInCurrentMonth, dayComponent)}

                />
            </MuiPickersUtilsProvider>
    );
}

/* renderDate props로 함수가 필요함
day: Date,
selectedDate : Date,
isInCrrentMonth: boolean,
dayComponenssh st: Element

이 props를 입력한 다음 날짜 타일로 렌더링 할 수 있는 요소를 반환한다.
DatePicker는 이 함수를 표시된 모든 날짜로 호출

필요한 경우
- 투두가 없는 날 : normal date tile
- 투두가 있는 날 : todo date tile (갯수)
- 투두를 모두 완료한 날 : complete date tile(색상, check✔)

만든 함수를 enderDate 요소에 지정
그러면 DatePicker가 날짜를 렌더링 하고 날짜 타일을 요청할 때마다 호출해준다. 만든 함수가 날짜를 확인하고 적절한 날짜 타일을 반환한다.
*/ 
