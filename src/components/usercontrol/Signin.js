import React ,  { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

import { postUserLogin } from '../../api/apiCommunicate';
import '../../stylesheets/Signin.css';


function Signin(){

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [result, setResult] = useState("");
    console.log("watch",watch())

    const onSubmit = (data) => {
      const parseData = JSON.stringify(data);
      postUserLogin(parseData);
    };

    const onError = (error) => {
      console.log(error)
    };


    return (

    <form onSubmit={
      handleSubmit(onSubmit)
      }>
    <TextField
    {...register("account", {required: true})} 
        id="standard-user-id-input"
        className='user-control-input'
        label="로그인 아이디"
        type="text"
        autoComplete="current-user-id"
        variant="standard"
        helperText="Please enter Account"
        margin="dense"
        fullWidth 
      />
      {errors.account?.type === "required" &&  <span className='error_message'>아이디를 입력해주세요.</span>}
      <TextField
       {...register("password", {required: true})} 
        id="standard-password-input"
        label="비밀번호"
        type="password"
        autoComplete="current-password"
        variant="standard"
        helperText="Please enter Password"
        margin="dense"
        fullWidth 
      />
      {errors.password?.type === "required" &&  <span className='error_message'>비밀번호를 입력해주세요.</span>}
      <Button type="submit" id="submit_btn">확인</Button>

      <Link to="/"><p className='forgotPwd'>비밀번호를 잊었다면?</p></Link>
      </form>
      )

}

export default Signin;

