import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";

import { Button, Grid, Box, TextField, RadioGroup, FormLabel, FormControlLabel, Radio } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';

import '../../stylesheets/GoalForm.css';

import { objGoalsData } from "../../atoms/todoData";
// import { patchGoalEdit, deleteGoalData } from "../../api/apiCommunicate";

export default function GoalEditForm(){

    /* Hook 선언 시작 */
    let history = useHistory();

    /* atom 선언 시작 */
    
     let [goal, setGoal] = useRecoilState(objGoalsData);// 목표goals 아이템

    /* atom 선언 종료 */

     /* state 선언 시작 */
    let { originID } = useParams();//url Params 따오기
    const [editGoalState, setEditGoalState] = useState('');
    const copy_editGoalState = {...editGoalState}
    let [editGoalData, setEditGoalData] = useState(
        {
            "contents" : ``,
            "privacy" : `PUBLIC`,
            "color" : `#000000`
        }
    );
    const copy_editGoalData = {...editGoalData}


     useEffect(()=>{
         let originGoalArr = [...goal]; //원본 goal 가지고 옴
         originGoalArr.filter((data)=>{
             if (data.id === parseInt(originID)) return setEditGoalState(data) 
          })
     },[goal, originID])
 
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
             "HIDDEN" : "숨기기 🙄" ,
             "PRIVATE" : "나만보기 😎" ,
             "FOLLOWING" : "일부공개 🤫" ,
             "PUBLIC" : "전체공개 🤗" ,
         }
     
    /* state 선언 종료 */

    /* Hook 선언 끝 */


    /* 함수 선언 시작 */
    
    //목표 수정 함수
    function editGoal(item){
        const copy_goal = [...goal]
        copy_goal.splice(originID-1, 1, copy_editGoalState)
        setGoal(copy_goal); //setGoal를 이용해 state 변경
        // patchGoalEdit(originID, editGoalData) //patchGoalEdit을 이용해 apu 변경
        window.location.replace(`/goals/`);//목표로 돌아가기
    }

    //목표 삭제 함수
    function deleteGoal(e){
        const copy_goal = [...goal]
        let newGoalArr = copy_goal.filter(goal =>  goal.id != originID
        )
        setGoal(newGoalArr); //setGoal를 이용해 state 변경
        // deleteGoalData(originID); //deleteGoalData를 이용해 api를 변경
        history.push({pathname: "/goals/"});//목표로 돌아가기
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
    //목표 타이틀 수정 함수
    const changeEditGoalContents = (e) => {
        copy_editGoalState.contents = e.target.value;
        copy_editGoalData.contents = e.target.value;
        setEditGoalState(copy_editGoalState);
        setEditGoalData(copy_editGoalData);
    };
    //목표 공개 범위 수정 함수
    const handlePrivacyChange = (e) => {
        copy_editGoalState.privacy = e.target.value;
        copy_editGoalData.privacy = e.target.value;
        setEditGoalState(copy_editGoalState);
        setEditGoalData(copy_editGoalData);
    };
    //목표 색상 수정 함수
    const handleColorChange = (e) => {
        copy_editGoalState.color = e.target.value;
        copy_editGoalData.color = e.target.value;
        setEditGoalState(copy_editGoalState);
        setEditGoalData(copy_editGoalData);
    };

    /* 함수 선언 끝 */

    return(
        <Box className="goals-form-dialog-box">
            <div className="goals-form">
            <Grid container spacing={1} className="goals-form-grid-wrap">
            <Grid item xs={12} className="goals-form-text-wrap">
                <TextField id="goalform_textfield" variant="standard" value={editGoalState.contents || ''} onChange={changeEditGoalContents} /> 
                </Grid>
                <Grid item xs={12} className="goals-form-privacy-wrap" > 
                   <Button className="goals-form-privacy" onClick={()=>{setPrivacyDialogActive(true)}}><p>공개 설정 </p><span> 
                       { privacyObj[editGoalState.privacy] } ▾ </span></Button>
                </Grid>
                <Grid item xs={12} className="goals-form-color-wrap" > 
                   <Button className="goals-form-color" onClick={()=>{setColorDialogActive(true)}}><p>색상 </p><span> <i style={{ position: 'absolute', display: 'inline-block', width: '20px', height: '20px', border: '1px solid #000', borderRadius: '50%', top: '20px', right: '30px', background: `${editGoalState.color}`}}></i>▾ </span></Button>
                </Grid>
                {/* 확인은 임시 css */}
                <Grid item xs={12} className="goals-form-submit">
                    <Button color="secondary"
                    className="goals-form-submit-btn" onClick={editGoal} >
                        확인
                    </Button>    
                </Grid>
                <Button className="goals-listItem-delete-btn" aria-label="Delete Todo" id={editGoalState.id} onClick={deleteGoal} >
                       삭제
                </Button>
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
                            defaultValue={editGoalState.privacy}
                        >
                            <FormControlLabel value="HIDDEN" control={<Radio  />} label={privacyObj["HIDDEN"]} />
                            <FormControlLabel value="PRIVACY" control={<Radio />}  label={privacyObj["PRIVATE"]}  />
                            <FormControlLabel value="FOLLOWING" control={<Radio />}  label={privacyObj["FOLLOWING"]}  />
                            <FormControlLabel value="PUBLIC" control={<Radio />}  label={privacyObj["PUBLIC"]}  />
                        </RadioGroup>
                    </FormControl>
                </Box>
                </DialogContent>
                <DialogActions>

                <Button className="group-dialog-button" onClick={handlePrivacyDialogClose}>Ok</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for privacy */}
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