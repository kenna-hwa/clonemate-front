import React , { useState } from 'react';
import { appendErrors, useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

import { postUserJoin } from '../../api/apiCommunicate'
import '../../stylesheets/Login.scss';
import axios from 'axios';

export default function Join(){

    const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: "onChange" });
    const [result, setResult] = useState("");
    console.log("watch",watch())

    const onSubmit = async () => {
      // setResult(JSON.stringify(data));
      //axios
      const data = {
        "userId": "test5",
        "email": "test5@gmail.com",
        "name": "이메일테스트",
        "password": "1234",
        "introText": "im test"
    };

      try {
        const result = await axios.post('http://13.125.221.64:8080/users', data);

        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    const onError = (error) => {
      console.log(error)
    };

    return (

    <form onSubmit={handleSubmit(onSubmit,onError)}>
      <TextField
      {...register("userId", {required: true, message: "아이디를 입력해주세요."})} //값을 불러오기 위한 이름
        id="standard-user-id-input"
        label="아이디"
        type="text"
        autoComplete="current-id"
        variant="standard"
        helperText="Please enter Account"
        margin="dense"
        fullWidth 
      />
      {errors.userId?.type === "required" &&  <span className='error_message'>아이디를 입력해주세요.</span>}
      <TextField
      {...register("email", {required: true, message: "인증용 이메일을 입력해주세요."})} //값을 불러오기 위한 이름
        id="standard-email-input"
        label="이메일"
        type="email"
        autoComplete="current-email"
        variant="standard"
        helperText="Please enter Email"
        margin="dense"
        fullWidth 
      />
      {errors.email?.type === "required" &&  <span className='error_message'>인증용 이메일을 입력해주세요.</span>}
      <TextField
       {...register("password", {required: true, minLength:{ value: 3, message: "비밀번호는 4자 이상으로 입력해주세요."}})}  //값을 불러오기 위한 이름
        id="standard-password-input"
        label="비밀번호"
        type="password"
        autoComplete="current-password"
        variant="standard"
        helperText="Please enter Password"
        margin="dense"
        fullWidth 
      />
      {errors.password?.type === "required" &&  <span className='error_message'>비밀번호는 4자 이상으로 입력해주세요.</span>}
      {errors.password?.type === "maxLength" && errors.password.message}
      <TextField
       {...register("name", {required: true, minLength:{ value: 2, message: "이름을 입력해주세요"}})}  //값을 불러오기 위한 이름
        id="standard-name-input"
        label="이름"
        type="name"
        autoComplete="current-name"
        variant="standard"
        helperText="Please enter Name"
        margin="dense"
        fullWidth 
      />
      {errors.name?.type === "required" &&  <span className='error_message'>이름을 입력해주세요</span>}
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
       {errors.introText?.type === "required" &&  <span className='error_message'>자기소개를 입력해주세요.</span>}
      <Button type="submit" id="submit_btn">확인</Button>
      
      <div className='join_txt'>
          <p>
          가입하면: <br />
          • 다른 기기에서 로그인 가능합니다.<br />
          • 다른 사용자들과 함께 할 수 있습니다.
          </p>
          <p>가입 시 다음 사항에 동의하는 것으로 간주합니다. &nbsp;
          <Link to="/termUse" className='termOfUse'>이용약관</Link>과 <Link className='policy' to="/policy">개인정보 정책</Link>
          </p>
      </div>
      </form>
)

}

