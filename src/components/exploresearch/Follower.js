import React from "react";
import axios from 'axios';

import '../../stylesheets/Follow.css';
import { testFollowerData } from "../../atoms/todoData";
import { useRecoilState } from "recoil";

import FollowerList from './FollowerList';



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
                <FollowerList data={data} key={data.id}/>
            )})}</React.Fragment> : <div className="null-text">목록 없음</div> }

        </div>
    )
}