import React ,  { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

import { userLogin } from '../../api/apiCommunicate';
import '../../stylesheets/Signin.css';


function Signin(){

    const { register, handleSubmit, watch } = useForm();
    const [result, setResult] = useState("");
    const onSubmit = (data) => {
      userLogin(data)
    };
    console.log("watch",watch())

    return (

    <form onSubmit={
      handleSubmit(onSubmit)
      }>
    <TextField
    {...register("account")} 
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
      <TextField
       {...register("password")} 
        id="standard-password-input"
        label="비밀번호"
        type="password"
        autoComplete="current-password"
        variant="standard"
        helperText="Please enter Password"
        margin="dense"
        fullWidth 
      />
      <Button type="submit" id="submit_btn">확인</Button>

      <Link to="/"><p className='forgotPwd'>비밀번호를 잊었다면?</p></Link>
      </form>
      )

}

export default Signin;

