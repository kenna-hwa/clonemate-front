import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Grid, Box, TextField, RadioGroup, FormLabel, FormControlLabel, Radio } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { useRecoilState } from "recoil";

import '../../stylesheets/GoalForm.css';

import { objGoalsData } from "../../atoms/todoData";
import { useHistory } from "react-router-dom";

export default function GoalForm(){

    /* Hook 선언 시작 */
    let history = useHistory();
    /* atom 시작 */
    
    let [goal, setGoal] = useRecoilState(objGoalsData);// 목표goals 아이템

    let [createGoalState, setCreactGoalState] = useState(
        {
            "orderNo" : goal.length+1,
            "contents" : "",
            "privacy" : "PUBLIC",
            "color" : "#000000"
        }

    );
    const copy_createGoalState = {...createGoalState};

    let [privacyDialogActive, setPrivacyDialogActive] = useState(false);
    let [colorDialogActive, setColorDialogActive] = useState(false);

    let colorList = [
        "#000000",
        "#272727",
        "#565656",
        "#868686",//black
        "#a70000",
        "#ff0000",
        "#ff5252",
        "#ff7b7b",//red
        "#d73d00",
        "#ff7b00",
        "#ff873d",
        "#f7ae48",//orange    
        "#000b5e",
        "#021496",
        "#0119cb",
        "#001be7",//blue
        "#8d0a9d",
        "#9c0fbf",
        "#9e36d2",
        "#ca69e3",//purple
        "#234d20",
        "#36802d",
        "#77ab59",
        "#c9df8a",//green
        ];

    const privacyObj = {
        'HIDDEN' : '숨기기 🙄' ,
        'PRIVATE' : '나만보기 😎' ,
        'FOLLOWING' : '일부공개 🤫' ,
        'PUBLIC' : '전체공개 🤗' ,
    }


    /* Hook 선언 끝 */

    /* 함수 선언 시작 */

    //목표 타이틀 수정 함수
    const changeGoalTitle = (e) => {
        copy_createGoalState.contents = e.target.value;
        setCreactGoalState(copy_createGoalState)
    }

    const handlePrivacyDialogClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setPrivacyDialogActive(false);
        }
    };

    const handleColorDialogClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setColorDialogActive(false);
        }
    };


    //privacy dialog onChange 이벤트
    const handlePrivacyChange = (e) => {
        copy_createGoalState.privacy = e.target.value;
        setCreactGoalState(copy_createGoalState);
    };
    const handleColorChange = (e) => {
        copy_createGoalState.color = e.target.value;
        setCreactGoalState(copy_createGoalState);
    };

    // 확인 클릭 함수 실행 함수
    const clickOkbtn = (data) => { //react-form-hook submit 함수
        setGoal(createGoalState);
        // postGoalRegister(createGoalState);
        window.location.replace("/goals")
    }


    /* 함수 선언 끝 */


    return(
        <Box className="goals-form-dialog-box">
            <div className="goals-form">
                <Grid container spacing={1} className="goals-form-grid-wrap">
                <Grid item xs={12} className="goals-form-text-wrap">
                    <TextField id="goalform_textfield" variant="standard" placeholder={'목표 입력'} onChange={changeGoalTitle} /> 
                </Grid>
                <Grid item xs={12} className="goals-form-privacy-wrap" > 
                   <Button className="goals-form-privacy" onClick={()=>{setPrivacyDialogActive(true)}}><p>공개 설정 </p><span> 
                       { privacyObj[createGoalState.privacy] } ▾ </span></Button>
                </Grid>
                <Grid item xs={12} className="goals-form-color-wrap" > 
                   <Button className="goals-form-color" onClick={()=>{setColorDialogActive(true)}}><p>색상 </p><span> <i style={{ position: 'absolute', display: 'inline-block', width: '20px', height: '20px', border: '1px solid #000', borderRadius: '50%', top: '20px', right: '30px', background: `${createGoalState.color}`}}></i>▾ </span></Button>
                </Grid>
                {/* 확인은 임시 css */}
                <Grid item xs={12} className="goals-form-submit">
                    <Button color="secondary" className="goals-form-submit-btn" 
                    onClick={clickOkbtn} >
                        확인
                    </Button>    
                </Grid>
                </Grid>
            </div>

            {/* Dialog for privacy */}
            <Dialog disableEscapeKeyDown open={privacyDialogActive} onClose={handlePrivacyDialogClose} className="group-dialog-wrap" >
                <DialogTitle className="group-dialog-title" >공개 설정</DialogTitle>
                <DialogContent className="group-dialog">
                <Box component="form" className="group-dialog-box">
                    <FormControl className="group-dialog-form-box">
                    <FormLabel id="radio-buttons-group-dialog-label" sx={{display:'none' }}>공개 설정 Privacy</FormLabel>
                        <RadioGroup
                            className="group-privacy-wrap"
                            aria-labelledby="radio-buttons-group-privacy-label"
                            name="radio-buttons-group-privacy"
                            onChange={handlePrivacyChange}
                            defaultChecked={'PUBLIC'}
                            defaultValue={'PUBLIC'}

                        >
                            <FormControlLabel value="HIDDEN" control={<Radio  />} label={privacyObj['HIDDEN']} />
                            <FormControlLabel value="PRIVACY" control={<Radio />}  label={privacyObj['PRIVATE']}  />
                            <FormControlLabel value="FOLLOWING" control={<Radio />}  label={privacyObj['FOLLOWING']}  />
                            <FormControlLabel value="PUBLIC" control={<Radio />}  label={privacyObj['PUBLIC']}  />
                        </RadioGroup>
                    </FormControl>
                </Box>
                </DialogContent>
                <DialogActions>

                <Button className="group-dialog-button" onClick={handlePrivacyDialogClose}>Ok</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for color */}
               <Dialog disableEscapeKeyDown open={colorDialogActive} onClose={handleColorDialogClose} className="group-dialog-wrap" >
                <DialogTitle className="group-dialog-title" >색상</DialogTitle>
                <DialogContent className="group-dialog">
                <Box component="form" className="group-dialog-box">
                    <FormControl className="group-dialog-form-box">
                    <FormLabel id="radio-buttons-group-color-label" sx={{display:'none'}}>목표 텍스트 색상 Color</FormLabel>
                        <RadioGroup
                            className="group-color-wrap"
                            aria-labelledby="radio-buttons-group-color-label"
                            defaultValue={"#1C1C1C"}
                            name="radio-buttons-group-color"
                            onChange={handleColorChange}
                        >
                            {colorList.map((color)=>{return (<FormControlLabel value={color} key={color}
                            control={<Radio style={{ backgroundColor: `${color}`, width: '50px', height: '50px', marginRight: '10px', marginBottom: '6px' }} />} label="" />)
                            })}
                        </RadioGroup>
                    </FormControl>
                </Box>
                </DialogContent>
                <DialogActions>
                <Button className="group-dialog-button"  onClick={handleColorDialogClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )

}