import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Box from '@mui/material/Box';
import MainNavBar from '../nav/MainNavBar';
import Content from './Content';
import axios from 'axios';


export default function Main() {


let [calendarData, setCalendarData] = useState([]);
let [todoData, setTodoData] = useState([]);
let userId = sessionStorage.getItem("userId")
let todayDate = new Date().toJSON().substring(0, 10);



//GET 캘린더 데이터 가져오기
//dateYm=yyyy-mm
const getTodosOverviewData = (numUserId,localDate) => {
    //axios
     axios({
      method: `GET`,
      url: `https://clonetodo.herokuapp.com/api/v1/todos/overview`,
      params: {
        userId: 1,
        dateYm: "2022-07-11"
      },
      header: {
        "Content-Type": "application/json",
      }
    })
    .then(res => setCalendarData(res.data))
    .catch(Error=>{console.log(Error)})
  } 


//GET 캘린더 데이터 가져오기
//dateYm=yyyy-mm
const getTodosData = (numUserId,localDate) => {
    //axios
     axios({
      method: `GET`,
      url: `https://clonetodo.herokuapp.com/api/v1/todos`,
      params: {
        userId: 1,
        dateYm: "2022-07-11"
      },
      header: {
        "Content-Type": "application/json",
      }
    })
    .then(res => setTodoData(res.data))
    .catch(Error=>{console.log(Error)})
  } 


  useEffect(()=>{
    getTodosOverviewData(userId, todayDate);
    getTodosData(userId, todayDate)
  },[])
  
    return (
        <Box className='main-wrap' sx={{ position: 'relative'}}>
        <MainNavBar />
        <Content calendarData={calendarData} todoData={todoData} />
        </Box>
    );
}