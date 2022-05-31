import { Modal } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";


export function LikeListModal (props) {

    /* hook 선언 시작 */

    const history = useHistory();

    /* hook 선언 종료 */

    /* state 선언 시작 */


    /* atom 선언 시작 */


    /* atom 선언 종료 */

    const index = props.index;
    const likesUser = props.likesUser;
    const likeModalActiveIndex = props.likeModalActiveIndex;
    const setLikeModalActiveIndex = props.setLikeModalActiveIndex;

    /* 함수 선언 시작 */

    //모달 onoff 핸들러
    const modalActive = props.modalActive;

    //캘린더 onoff 핸들러
    const setModalActiveIndex = props.setModalActiveIndex;

    /* 함수 선언 종료 */

    return(
        <>
        <Modal open={likeModalActiveIndex}
        onClose={()=>{setLikeModalActiveIndex(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="feed-todo-modal-box"
         >
        
            <ul className="like-todo-modal-wrap" >
            <h1>좋아요</h1>

                {likesUser.map((data)=>{
                    const userInfo = data.user
                    const uriParams = userInfo.account
                    return (
                        <li className="like-todo-modal-data">
                            <Link to={uriParams}>
                                <p>{userInfo.name}</p>
                                <p>{userInfo.introText}</p>
                            </Link>
                        </li>
                    )
                })}
            </ul>

        </Modal>  
        </>
    )
}
