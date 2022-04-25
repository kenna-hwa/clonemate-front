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
    
    return (
        <div className='setting-settings-list-wrap' >
            <div className="setting-list-box" >
                
                <Button className="setting-list-button" >
                    <AccountCircleOutlinedIcon className="settings-list-icon" fontSize="medium" sx={{ color:"black"}} />
                    <div className="settings-list-text"><p>계정</p>
                    </div>
                    <NavigateNextIcon className="setting-list-arrow" fontSize="small" sx={{ color: "lightgray" }} />
                </Button>
                
            
            </div>
            <Divider/>
            
            <div className="setting-list-box" >
                <Button className="setting-list-button" >
                    <AodOutlinedIcon className="settings-list-icon" fontSize="medium" sx={{ color:"black"}} />
                    <div className="settings-list-text"><p>화면</p>
                    </div>
                    <NavigateNextIcon className="setting-list-arrow" fontSize="small" sx={{ color: "lightgray" }} />
                </Button>
                
            </div>
            <Divider/>

            <div className="setting-list-box" >
                <Button className="setting-list-button" >
                    <ArticleOutlinedIcon className="settings-list-icon" fontSize="medium" sx={{ color:"black"}} />
                    <div className="settings-list-text"><p>공지사항</p>
                    </div>
                    <NavigateNextIcon className="setting-list-arrow" fontSize="small" sx={{ color: "lightgray" }} />
                </Button>
                
            </div>
            <Divider />

            <div className="setting-list-box" >
                <Button className="setting-list-button" >
                    <InfoOutlinedIcon className="settings-list-icon" fontSize="medium" sx={{ color:"black"}} />
                    <div className="settings-list-text"><p>정보</p>
                    </div>
                    <NavigateNextIcon className="setting-list-arrow" fontSize="small" sx={{ color: "lightgray" }} />
                </Button>
                
            </div>
            <Divider />

        </div>
    )

}