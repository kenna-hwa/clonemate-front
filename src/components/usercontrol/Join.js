import React , { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

import axiosRegisterUser from '../../api/apiCommunicate'
import '../../stylesheets/Signin.css';

export default function Join(){

    const { register, handleSubmit, errors, watch } = useForm({ mode: "onChange" });
    const [result, setResult] = useState("");
    console.log("watch",watch())


    const onSubmit = (data) => {
      setResult(JSON.stringify(data));
      console.log(result)
      // axiosRegisterUser(result)
    }
    const onError = (error) => {
      console.log(error);
    };

    return (

    <form onSubmit={handleSubmit(onSubmit,onError)}>
      <TextField
      {...register("userId", {required: true,})} //값을 불러오기 위한 이름
        id="standard-email-input"
        label="아이디"
        type="text"
        autoComplete="current-id"
        variant="standard"
        helperText="Please enter Id"
        margin="dense"
        fullWidth 
      />
    <TextField
      {...register("email", {required: true,})} //값을 불러오기 위한 이름
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
       {...register("password", {required: true, minLength:{ value: 5, message: "비밀번호는 5자 이상으로 입력해주세요."}})}  //값을 불러오기 위한 이름
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
       {...register("name", {required: true, minLength:{ value: 2, message: "이름은 중복될 수 없습니다."}})}  //값을 불러오기 위한 이름
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
       {...register("introText", {required: true, message: "자기소개를 입력해주세요."})}  //값을 불러오기 위한 이름
        id="standard-intro-input"
        label="자기소개"
        type="text"
        autoComplete="current-intro"
        variant="standard"
        helperText="Please enter Intro"
        margin="dense"
        fullWidth 
      />
      <Button type="submit" id="submit_btn">확인</Button>
      
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

