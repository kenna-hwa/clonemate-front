import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, CircularProgress, Snackbar, TextField } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import "../../stylesheets/Login.scss";
import axios from "axios";

function Login() {

  // let history = useHistory();

  const { register, handleSubmit } = useForm();
  const [isLogging, setIsLogging] = useState(false);
  const history = useHistory();

  console.log('isLoading: ', isLogging);

  const onSubmit = async (data) => {

    if(data){
      setIsLogging(true); 
    }
    //axios
    try {
      const result = await axios.post('/api/login', data);
      console.log('result: ', result);
        if(result.status === 200){
          alert("로그인 완료");
          console.log("로그인 완료 / 유저 id" , result.data.data.id)
          setIsLogging(false);
          sessionStorage.setItem("user", result.data.data.id);
          history.push("/main");
        }else{
          setIsLogging(true);
          alert("로그인 실패!", result.statusText);
          console.log("error", result.status)
        }
    } catch (error) {
      console.error(error);
      alert("로그인 실패!", error);
      setIsLogging(false);
    }
  };
  // isLoading 값이 바뀌면 실행
  useEffect(() => {
    if(isLogging){
      console.log('isLoading: ', isLogging);
      <Snackbar
      open={isLogging}
      autoHideDuration={3000}
      message="로그인 중"
      />
    }
  }, [isLogging]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("account", { required: true })}
        id="standard-user-id-input"
        className="user-control-input"
        label="로그인 아이디"
        type="text"
        autoComplete="current-user-id"
        variant="standard"
        helperText="Please enter Account"
        margin="dense"
        fullWidth
      />
      {/* {errors.account?.type === "required" && (
        <span className="error_message">아이디를 입력해주세요.</span>
      )} */}
      <TextField
        {...register("password", { required: true })}
        id="standard-password-input"
        label="비밀번호"
        type="password"
        autoComplete="current-password"
        variant="standard"
        helperText="Please enter Password"
        margin="dense"
        fullWidth
      />
      {/* {errors.password?.type === "required" && (
        <span className="error_message">비밀번호를 입력해주세요.</span>
      )} */}
        {isLogging ? 
        <Button type="submit" id="submit_btn" disabled>
        <CircularProgress className="logging-progress"
        sx={{
          width: '12px',
          color: 'gray',
        }}/> 
        </Button>
        : 
        <Button type="submit" id="submit_btn">
        확인
        </Button>
        
        }
      <Link to="/">
        <p className="forgotPwd">비밀번호를 잊었다면?</p>
      </Link>
    </form>
  );
}

export default Login;
