import React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import '../stylesheets/Signin.css';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';

function Signin(){

    const { register, handleSubmit } = useForm();
    const [result, setResult] = useState("");
    const onSubmit = (data) => setResult(JSON.stringify(data));
  

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <TextField
    {...register("Email")} 
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
       {...register("Password")} 
        id="standard-password-input"
        label="비밀번호"
        type="password"
        autoComplete="current-password"
        variant="standard"
        helperText="Please enter Password"
        margin="dense"
        fullWidth 
      />
      <input className="login_btn" type="submit" value={"로그인"}/>
      <Link to="/"><p className='forgotPwd'>비밀번호를 잊었다면?</p></Link>
      </form>)

}

export default Signin;

