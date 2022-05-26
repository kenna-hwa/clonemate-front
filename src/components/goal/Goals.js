import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {  Button, List  } from "@mui/material";
import ReceiptIcon from '@material-ui/icons/Receipt';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';import '../../stylesheets/Goal.css';

import { getGoalsData } from "../../api/apiCommunicate";
import { objTodosDataResult } from "../../atoms/todoData";


export default function Goals() {

  
  /* Hook 선언 시작 */

   /* atom 시작 */
  
  let [dtTodos, setDtTodos] = useRecoilState(objTodosDataResult);// 목표goals 아이템
  let todoDataArray = JSON.parse(JSON.stringify(dtTodos));

  console.log("todoDataArray", todoDataArray)

  /* Dummy State 끝 */
  
  useEffect(()=>{
    // recoil 에서 정보 갱신이 되었으면 하는데..?
    const goalItems = getGoalsData();
    setDtTodos(goalItems)
    // goalItems = useRecoilState(goalsData)
  },[dtTodos])



  /* Hook 선언 끝 */
 



  /* 함수 시작 */


  //목표수정 컴포넌트로 이동 함수 (파라미터 추가)
  const moveEditGoalForm = (e) => {
    window.location.replace(`/goals/goalEditForm/`+e.target.id)
  }

  
  // //목표 수정 이벤트핸들러 함수
  // async function clickGoaltoEdit(e){
  //   const { id } = e.target;
  //   await moveEditGoalForm(id)
  // }


/* 함수 끝 */


  return (
      <div className="goal-goals-list-wrap" >
            {
            todoDataArray.map((data, idx) => {
              return (
                <React.Fragment key={data.id}>
                  <div className="goals-list-box" key={data.goalOrderNo}>
                    <Button className="goals-list-button" id={data.id} name={data.id} data={data} onClick={moveEditGoalForm} >
                        <ReceiptIcon className="goals-list-icon" />
                        <div className="goals-list-text" id={data.goalOrderNo} name={data.goalOrderNo} style={{ color:data.titleColor }}  ><p>{data.title}</p>
                        </div>
                    </Button>
                    <NavigateNextIcon className="goal-list-arrow" />
                  </div>

                </React.Fragment>
              )
            })
          }
      </div>
  );
}
