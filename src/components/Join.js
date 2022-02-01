import React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import '../stylesheets/Signin.css';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';


function Join(){

    const { register, handleSubmit, errors, watch } = useForm({ mode: "onChange" });
    const [result, setResult] = useState("");
    const onSubmit = (data) => {
      setResult(JSON.stringify(data));
      console.log(result)
    }
    const onError = (error) => {
      console.log(error);
    };
    console.log(watch())

    return (

    <form onSubmit={handleSubmit(onSubmit,onError)}>
    <TextField
      {...register("userId")} //값을 불러오기 위한 이름
        id="standard-email-input"
        label="이메일"
        type="email"
        autoComplete="current-email"
        variant="standard"
        helperText="Please enter Email"
        margin="dense"
        fullWidth 
      />
      <TextField
       {...register("userPwd", {minLength:{ value: 5, message: "비밀번호는 5자 이상으로 입력해주세요."}})}  //값을 불러오기 위한 이름
        id="standard-password-input"
        label="비밀번호"
        type="password"
        autoComplete="current-password"
        variant="standard"
        helperText="Please enter Password"
        margin="dense"
        fullWidth 
      />
      <TextField
       {...register("userName", {minLength:{ value: 5, message: "이름은 중복될 수 없습니다."}})}  //값을 불러오기 위한 이름
        id="standard-name-input"
        label="이름"
        type="name"
        autoComplete="current-name"
        variant="standard"
        helperText="Please enter Name"
        margin="dense"
        fullWidth 
      />
      <TextField
       {...register("hiddenUserId")}  //값을 불러오기 위한 이름
        id="standard-id-input"
        type="hidden"
        autoComplete="current-id"
        variant="standard"
      />
      <input className="join_btn" type="submit" value={"확인"}/>
      
      <div className='join_txt'>
          <p>
          가입하면: <br />
          • 다른 기기에서 로그인 가능합니다.<br />
          • 다른 사용자들과 함께 할 수 있습니다.
          </p>
          <p>가입 시 다음 사항에 동의하는 것으로 간주합니다. &nbsp;
          <Link to="/text/use" className='termOfUse'>이용약관</Link>과 <Link className='policy' to="/text/policy">개인정보 정책</Link>
          </p>
      </div>
      </form>
)

}

export default Join;

