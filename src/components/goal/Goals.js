import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {  Button, List  } from "@mui/material";
import ReceiptIcon from '@material-ui/icons/Receipt';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';import '../../stylesheets/Goal.css';

import { objTodosDataResult, objGoalsData } from "../../atoms/todoData";


export default function Goals() {

  
  /* Hook 선언 시작 */
  let history = useHistory();

   /* atom 시작 */
  
  let [dtGoals, setDtGoals] = useRecoilState(objGoalsData);// 목표goals 아이템
  let goalDataArray = JSON.parse(JSON.stringify(dtGoals));

  console.log("goalDataArray", goalDataArray)

  /* Dummy State 끝 */
  
  useEffect(()=>{
    // recoil 에서 정보 갱신이 되었으면 하는데..?
    // const goalItems = getGoalsData();
    // typeof goalItems.data === 'object'? setDtGoals(goalItems.data) : console.log("goal 데이터가 업데이트 되지 못했어요.");
  },[setDtGoals]);

  /* Hook 선언 끝 */

  /* 함수 시작 */


  //목표수정 컴포넌트로 이동 함수 (파라미터 추가)
  const moveEditGoalForm = (e) => {
    history.push({pathname: "/goals/goalEditForm/"+e.currentTarget.id});
  };

/* 함수 끝 */


  return (
      <div className="goal-goals-list-wrap" >
            {
            goalDataArray.map((data, idx) => {
              return (
                <React.Fragment key={data.id}>
                  <div className="goals-list-box" key={data.orderNo}>
                    <Button className="goals-list-button" id={data.id} name={data.id} data={data} onClick={moveEditGoalForm} >
                        <ReceiptIcon className="goals-list-icon" />
                        <div className="goals-list-text" id={data.orderNo} name={data.orderNo} style={{ color:data.color }}  ><p>{data.contents}</p>
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
