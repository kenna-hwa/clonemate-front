import React from 'react';

import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import '../../stylesheets/Setting.css';


export default function Text() {

/* 함수 시작 */

  //컴포넌트로 이동 함수 (파라미터 추가)
  const moveTermuse = (e) => {
    window.location.replace(`/termUse`)
  }
  const movePolicy = (e) => {
    window.location.replace(`/policy`)
  }

 /* 함수 종료 */

    
    return (
        <div className='setting-settings-list-wrap' >
            <Button className="setting-list-box" onClick={moveTermuse} sx={{ color: "black" }}>
                
                <div className="setting-list-button" >

                    <div className="settings-list-text"><p>이용약관</p>
                    </div>

                </div>
                <NavigateNextIcon className="setting-list-arrow" fontSize="small" sx={{ color: "lightgray" }} />
            
            </Button>
            <Divider light="true"/>
            
            <Button className="setting-list-box" onClick={movePolicy} sx={{ color: "black" }}>
                <div className="setting-list-button" >
                    
                    <div className="settings-list-text"><p>개인정보 정책</p>
                    </div>
                    
                </div>
                <NavigateNextIcon className="setting-list-arrow" fontSize="small" sx={{ color: "lightgray" }} />
            </Button>
            <Divider light="true"/>

            <Button className="setting-list-box" sx={{ color: "black" }}>
                <div className="setting-list-button" >
                    
                    <div className="settings-list-text"><p>오픈소스</p>
                    </div>
                    
                </div>
                
                <NavigateNextIcon className="setting-list-arrow" fontSize="small" sx={{ color: "lightgray" }} />
            </Button>
            <Divider light="true"/>

    

        </div>
    )

}