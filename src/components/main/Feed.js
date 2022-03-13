import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { ko } from "date-fns/locale";
import FeedTodoGoal from './FeedTodoGoal';
import '../../stylesheets/Feed.css'

import {  Button, List, ListItem, ListItemText, Modal, } from "@mui/material";
import BorderColorIcon from '@material-ui/icons/BorderColor';


import { objTodosDataResult, datesData } from "../../atoms/todoData";
import CreateTodoForm from "./CreateTodoForm";

export default function Feed() {

/* hook 선언 시작 */

let history = useHistory();

/* hook 선언 종료 */

/* state 선언 시작 */

/* atom 시작 */

    // atom에서 goal+todo 데이터 가져오기
    let [dtTodos, setDtTodos] = useRecoilState(objTodosDataResult);
    let todoDataArray = JSON.parse(JSON.stringify(dtTodos));
    let dtDate = useRecoilValue(datesData);

/* atom 종료 */

//날짜 정보값 dtToday 오늘 dtTomorrow 내일 dtFeedCalendarDate 캘린더에서 선택한 날짜

//목표 클릭 여부 확인 배열 생성
let [isGoalSelected, setIsGoalSelected] = useState(Array(todoDataArray.length).fill(false) );


/* state 선언 종료 */

/* 함수 선언 시작 */

/* 모달 on/off 함수 시작 */


/* 모달 on/off 함수 종료 */

//Todo checkbox 핸들러
const onClickTodoCheckYn = (e) => {
    console.log(e.target)
}

//Goal 클릭 핸들러 
const onClickGoalHandler = (e) => {
    const index = e.currentTarget.dataset.index;
    const clicked_arr = Array(todoDataArray.length).fill(false) ;
    clicked_arr[index] = true;
    setIsGoalSelected(clicked_arr)

}


/* 함수 선언 끝 */

    return (
        <div className='feed-wrap'>
            <h2 className="feed-title">Feed</h2>
            <div className="goals-list-wrap" >
                {
                    todoDataArray.map((data, idx) => {
                        // console.log("data[idx].todos.length", data.todos.length)
                        
                        return <>
                        
                        <FeedTodoGoal 
                        data={data} idx={idx}
                        onClickGoalHandler={onClickGoalHandler}
                        onClickTodoCheckYn={onClickTodoCheckYn} 
                        />
                        {isGoalSelected[idx] ? <CreateTodoForm 
                        dtDate={dtDate} goalId={data.goalId} 
                        todoLength={data.todos.length}
                        /> :null}
                        </>
                    })
                    
                }
            </div>
            <button className="feed-move-to-routines" title="기간이 있는 할 일 작성하기" onClick={()=>{history.push("/routines")}}><BorderColorIcon /></button>
        </div>
    );
}
