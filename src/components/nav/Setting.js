import React from 'react';

import {  Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AodOutlinedIcon from '@mui/icons-material/AodOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import '../../stylesheets/Setting.css';


export default function Setting() {

    /* 함수 시작 */

  //컴포넌트로 이동 함수 (파라미터 추가)
  const moveText = (e) => {
    window.location.replace(`/text`)
  }
  const moveAnnouncements = (e) => {
    window.location.replace(`/announcements`)
  }
  // 오픈소스 부분 추가 


 /* 함수 종료 */
    
    return (
        <div className='setting-settings-list-wrap' >
            <div className="setting-list-box" >
                
                <Button className="setting-list-button">
                    <div className='setting-list-button-wrap'>
                        <AccountCircleOutlinedIcon className="settings-list-icon" fontSize="medium" sx={{ color:"black"}} />
                        <div className="settings-list-text"><p>계정</p>
                        </div>
                    </div>
                    <NavigateNextIcon className="setting-list-arrow" fontSize="small" sx={{ color: "lightgray" }} />
                </Button>
                
            
            </div>
            <Divider/>
            
            <div className="setting-list-box" >
                <Button className="setting-list-button" >
                    <div className='setting-list-button-wrap'>
                        <AodOutlinedIcon className="settings-list-icon" fontSize="medium" sx={{ color:"black"}} />
                        <div className="settings-list-text"><p>화면</p>
                        </div>
                    </div>
                    <NavigateNextIcon className="setting-list-arrow" fontSize="small" sx={{ color: "lightgray" }} />
                </Button>
                
            </div>
            <Divider/>

            <div className="setting-list-box" >
                <Button className="setting-list-button" onClick={moveAnnouncements}>
                    <div className='setting-list-button-wrap'>
                        <ArticleOutlinedIcon className="settings-list-icon" fontSize="medium" sx={{ color:"black"}} />
                        <div className="settings-list-text"><p>공지사항</p>
                        </div>
                    </div>
                    <NavigateNextIcon className="setting-list-arrow" fontSize="small" sx={{ color: "lightgray" }} />
                </Button>
                
            </div>
            <Divider />

            <div className="setting-list-box" >
                <Button className="setting-list-button" onClick={moveText}>
                    <div className='setting-list-button-wrap'>
                        <InfoOutlinedIcon className="settings-list-icon" fontSize="medium" sx={{ color:"black"}} />
                        <div className="settings-list-text"><p>정보</p>
                        </div>
                    </div>
                    <NavigateNextIcon className="setting-list-arrow" fontSize="small" sx={{ color: "lightgray" }} />
                </Button>
                
            </div>
            <Divider />

        </div>
    )

}