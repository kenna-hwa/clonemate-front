import React from 'react';

import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

import '../../stylesheets/Setting.css';


export default function FeedSetting() {

/* 함수 시작 */

  //컴포넌트로 이동 함수 (파라미터 추가)
  const moveTermuse = (e) => {
    window.location.replace(`/`)
  }
  const movePolicy = (e) => {
    window.location.replace(`/`)
  }
  const moveAnnouncements = (e) => {
    window.location.replace(`/`)
  }

 /* 함수 종료 */

 const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#333333' : '#333333',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#333333',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

    
    return (
        <div className='setting-settings-list-wrap' >
            <Button className="setting-list-box" sx={{ color: "black" }}>
                
                <div className="setting-list-button" >

                    <div className="settings-list-text"><p>달력에서 일요일부터 시작</p>
                    </div>

                </div>
                <IOSSwitch sx={{ m: 1 }} defaultChecked />
            
            </Button>
            <Divider light="true"/>
            
            <Button className="setting-list-box" sx={{ color: "black" }}>
                <div className="setting-list-button" >
                    
                    <div className="settings-list-text">피드에서 좋아요 보이기
                    </div>
                    
                </div>
                <IOSSwitch sx={{ m: 1 }} defaultChecked />
            </Button>
            <Divider light="true"/>

            <Button className="setting-list-box" sx={{ color: "black" }}>
                <div className="setting-list-button" >
                    
                    <div className="settings-list-text"><p>다크모드</p>
                    </div>
                    
                </div>
                <IOSSwitch sx={{ m: 1 }} />
            </Button>
            <Divider light="true"/>


        </div>
    )

}