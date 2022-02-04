import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Grid, Box, TextField, RadioGroup, FormLabel, FormControlLabel, Radio } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { useRecoilState } from "recoil";

import '../stylesheets/GoalForm.css';

import { goalsData } from "../atoms/todoData";


export default function GoalForm(){

    /* Hook 선언 시작 */

    /* atom 시작 */
    
    let [goal, setGoal] = useRecoilState(goalsData);// 목표goals 아이템

    const { register, handleSubmit, errors, watch } = useForm({ mode: "onChange" });


    let [createGoalState, setCreactGoalState] = useState({"goal_id": "",
                                                    "next_goal_id": "",
                                                    "title": "",
                                                    "privacy": "PUBLIC",
                                                    "bg_color": "",
                                                    "title_color": "#000000"});

    let [privacyDialogOpen, setPrivacyDialogOpen] = useState(false);
    let [colorDialogOpen, setColorDialogOpen] = useState(false);

    let [colorList, setColorList] = useState([
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
        ])



    /* Hook 선언 끝 */

    /* 함수 선언 시작 */

    
    //목표 추가 함수
    function addGoal(item){
        const thisItems = [...goal]; // goal State 원본 카피
        // console.log("additem1", thisItems)
        item.goal_id = thisItems.length; //key를 위한 id 추가
        item.next_goal_id = (thisItems.length+1 ); //key를 위한 id 추가
        thisItems.push(item);
        // console.log("additem2", thisItems)
        setGoal(thisItems, console.log(thisItems)) ;//setGoal를 이용해 state 변경
    }
    // console.log(goal)//react-form-hook submit 함수
    const onSubmit = (data) => { 
        setCreactGoalState(JSON.stringify(createGoalState));
        addGoal(createGoalState);
        window.location.replace("/goals")
    }

    const onError = (error) => {
    console.log(error);
    };




    const handlePrivacyDialogOpen = () => {
        setPrivacyDialogOpen(true);
    };

    const handlePrivacyDialogClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setPrivacyDialogOpen(false);
        }
    };

    const handleColorDialogOpen = () => {
        setColorDialogOpen(true);
    };

    const handleColorDialogClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setColorDialogOpen(false);
        }
    };
    const handlePrivacyChange = (e) => {
        const new_goal_item = createGoalState;
        new_goal_item.privacy = e.target.value;
        setCreactGoalState(new_goal_item);
    };
    const handleColorChange = (e) => {
        const new_goal_item = createGoalState;
        new_goal_item.title_color = e.target.value;
        setCreactGoalState(new_goal_item);
    };


    function onInputChange(e) {

        const new_goal_item = createGoalState;
        new_goal_item.title = e.target.value;
        setCreactGoalState(new_goal_item)
    }

    /* 함수 선언 끝 */


    return(
        <Box className="goals-form-dialog-box">
            <form onSubmit={handleSubmit(onSubmit,onError)} className="goals-form">
                <Grid container spacing={1} className="goals-form-grid-wrap">
                <Grid item xs={12} className="goals-form-text-wrap">
                    <TextField id="goalform_textfield" variant="standard" placeholder={'목표 입력'} onChange={onInputChange} /> 
                </Grid>
                <Grid item xs={12} className="goals-form-privacy-wrap" > 
                   <Button className="goals-form-privacy" onClick={handlePrivacyDialogOpen}><p>공개 설정 </p><span> {createGoalState.privacy ==='HID'? '🙄 숨기기' : createGoalState.privacy === 'PRI'? '😎 나만보기' : createGoalState.privacy === 'FOL'? '🤫 일부공개' : createGoalState.privacy === 'PUB'? '🤗 전체공개' : '🤗 전체공개'} ▾ </span></Button>
                </Grid>
                <Grid item xs={12} className="goals-form-color-wrap" > 
                   <Button className="goals-form-color" onClick={handleColorDialogOpen}><p>색상 </p><span> <i style={{ position: 'absolute', display: 'inline-block', width: '20px', height: '20px', border: '1px solid #000', borderRadius: '50%', top: '20px', right: '30px', background: `${createGoalState.title_color}`}}></i>▾ </span></Button>
                </Grid>
                {/* 확인은 임시 css */}
                <Grid item xs={12} className="goals-form-submit">
                    <Button color="secondary" className="goals-form-submit-btn" type="submit" >
                        확인
                    </Button>    
                </Grid>
                </Grid>
            </form>

            {/* Dialog for privacy */}
            <Dialog disableEscapeKeyDown open={privacyDialogOpen} onClose={handlePrivacyDialogClose} className="group-dialog-wrap" >
                <DialogTitle className="group-dialog-title" >공개 설정</DialogTitle>
                <DialogContent className="group-dialog">
                <Box component="form" className="group-dialog-box">
                    <FormControl className="group-dialog-form-box">
                    <FormLabel id="radio-buttons-group-dialog-label" sx={{display:'none' }}>공개 설정 Privacy</FormLabel>
                        <RadioGroup
                            className="group-privacy-wrap"
                            aria-labelledby="radio-buttons-group-privacy-label"
                            defaultValue={"PUBLIC"}
                            name="radio-buttons-group-privacy"
                            onChange={handlePrivacyChange}
                        >
                            <FormControlLabel value="HID" control={<Radio  />} label="숨기기" />
                            <FormControlLabel value="PRI" control={<Radio />} label="나만보기" />
                            <FormControlLabel value="FOL" control={<Radio />} label="일부공개" />
                            <FormControlLabel value="PUB" control={<Radio />} label="전체공개" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                </DialogContent>
                <DialogActions>

                <Button className="group-dialog-button" onClick={handlePrivacyDialogClose}>Ok</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for privacy */}
               <Dialog disableEscapeKeyDown open={colorDialogOpen} onClose={handleColorDialogClose} className="group-dialog-wrap" >
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