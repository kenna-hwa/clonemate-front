import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Calendar from '@toast-ui/react-calendar';
// import 'tui-calendar/dist/tui-calendar.css';


// date-fns
import DateAdapter from '@mui/lab/AdapterDateFns';


import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';

export default function CalendarBox() {

  const [value, setValue] = useState(new Date());

    return(
        //<Box className='calendar-wrap' backgroundColor="#9f4cd650" sx={{ position: 'absolute', width: '25vw', height: '80vh', minWidth: '300px', top: '15vh', border: '4px solid #ddd', boxSizing: 'border-box'}}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              orientation="landscape"
              openTo="day"
              value={value}
              shouldDisableDate={isWeekend}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
       // </Box>
    );
}

// const calendarOptions = {
//   // sort of option properties.
// };

// class CalendarBox extends React.Component {
//   calendarRef = React.createRef();

//   handleClickNextButton = () => {
//     const calendarInstance = this.calendarRef.current.getInstance();

//     calendarInstance.next();
//   };

//   handleClickButton = () => {
//     this.calendarRef.current.getRootElement().classList.add('calendar-root');
//   };

//   handleClickDayname = (ev) => {
//     // view : week, day
//     console.group('onClickDayname');
//     console.log(ev.date);
//     console.groupEnd();
//   };

//   render() {
//     return (
//       <>
//         <Calendar
//           ref={this.calendarRef}
//           {...calendarOptions}
//           onClickDayname={this.handleClickDayname}
//         />
//         <button onClick={this.handleClickNextButton}>Go next!</button>
//       </>
//     );
//   }
// }
// export default CalendarBox;