import React, { useState,  useRef  } from "react";

import List from '@mui/material/List';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import API from '../../api/API';
import axios from 'axios';

import '../../stylesheets/Follow.css';

import { getTodosOverviewData } from '../../api/apiCommunicate'
import { getTodosDataSample } from '../../api/apiCommunicate'
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";

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

/* atom 시작 */

    // atom에서 goal+todo 데이터 가져오기
    //let [testDummy, setTestDummy] = useRecoilState(testDummyData);
    //let testDummyArray = JSON.parse(JSON.stringify(testDummy));
    //console.log("testDummy", testDummy)
    //console.log("testDummy", testDummyData)
/* atom 종료 */








export default function Follower() {


   


    return (
        

        <div className="follow-follow-list-wrap" >
            <FollowerTest />
            {/* <div><button onClick={getAPI}>login</button></div> */}

            
            
            
            {/* useRecoilState 로는 작동하는 false의 목록없음이 dummy data 로는 작동 X 왜?? */}
            
        
        </div>
    )
}

