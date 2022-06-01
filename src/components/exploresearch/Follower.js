import React from "react";
import axios from 'axios';

import '../../stylesheets/Follow.css';
import { testFollowerData } from "../../atoms/todoData";
import { useRecoilState } from "recoil";

import FollowerTest from './FollowerTest';


//  ** 할일 **
// 팔로워 의 설정 버튼 팝업 확인하기 
// 팔로워 관련 함수  ex) 차단, 혹은 삭제 등 

// style : 화면의 넓이, font, fontsize 조정 

//https://jsonplaceholder.typicode.com/todos/1
//https://clonetodo.herokuapp.com/users?page=2

/* const login = () => {
  
    const data = {
        account: "test",
        "password":"1234"
    }
    axios.defaults.withCredentials = true;

    axios.post("https://clonetodo.herokuapp.com/login", data).then(
        (response) => {
            console.log(response);
        }
    );
}; */

const getAPI = () => {

    axios.get("https://jsonplaceholder.typicode.com/todos/1").then(
        (response) => {
            console.log(response);
        }
    );
};


export default function Follower() {

    let [testFollower, setTestFollower] = useRecoilState(testFollowerData);
    let testarray = JSON.parse(JSON.stringify(testFollower));
    console.log('testarray2', testarray.index);
    console.log('array length2', testarray.length);
    const isThereFollower = testarray.length;

    const deleteArr = index => {
        const removeArr = [...testarray].filter(data => data.index !== index);

        //const copy_Arr= [...testarray]
        //copy_goal.splice(originID-1, 1, copy_editGoalState)
        //setGoal(copy_goal);
        setTestFollower(removeArr); //setGoal를 이용해 state 변경
        console.log('newarray', testFollower);
        //deleteGoalData(originID); //deleteGoalData를 이용해 api를 변경
        //window.location.replace(`/goals/`);//목표로 돌아가기
    }

    //const deleteArr(index) {
        //let removeArr = testarray.map(data => {
            //if (data.index === index) {
                //data.splice(index, 1);
            //}
            //return data;
    //});
    //setTestFollower(removeArr);
//};


    return (
        
        <div className="follow-follow-list-wrap" >

        { isThereFollower ? 
        
        <React.Fragment>

        { testarray.map((data, index) => {

            return (
                <FollowerTest data={data} index={index} deleteArr={deleteArr} />
            )})}</React.Fragment> : <div className="null-text">목록 없음</div> }


        </div>
    )
}