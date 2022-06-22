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


export default function Follower() {

    let [testFollower, setTestFollower] = useRecoilState(testFollowerData);
    //let testarray = JSON.parse(JSON.stringify(testFollower));
    //const followerId = testarray.id;
    //console.log('testarray', typeof testFollower);
    //console.log('testarray type', typeof testarray);
    //console.log('testarray following data', testarray.following);
    console.log('testarray length', testFollower.length);
    const isThereFollower = testFollower.length;


//-----------------------------------------------------//


    return (
        
        <div className="follow-follow-list-wrap" >

        { isThereFollower ? 
        
        <React.Fragment>

        { testFollower.map((data) => {
            return (
                <FollowerTest data={data}/>
            )})}</React.Fragment> : <div className="null-text">목록 없음</div> }

        </div>
    )
}