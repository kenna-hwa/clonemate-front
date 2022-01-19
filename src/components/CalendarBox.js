import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Calendar from '@toast-ui/react-calendar';
// import 'tui-calendar/dist/tui-calendar.css';


// date-fns

import CalendarPicker from '@mui/lab/CalendarPicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


const minDate = new Date('2020-01-01T00:00:00.000');
const maxDate = new Date('2034-01-01T00:00:00.000');


export default function CalendarBox() {

  const [date, setDate] = useState(new Date());

    return(

      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />      
      </LocalizationProvider>
    );
}

