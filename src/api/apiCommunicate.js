import axios from 'axios';
import { useRecoilState, useRecoilValue } from "recoil";
import { objFeedCalendarOverview , objDatesData} from "../atoms/todoData";


export const getTodosDataSample = async () => {

  //axios
  await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  .then((Response)=>{console.log(Response.data)})
  .then((result)=>{console.log(result)})
  .catch((Error)=>{console.log(Error)})

  return Response.data
} 


/* ------------------------------------예시 종료---------------------------------------- */

/* state 관리 */


/* 공통 변수 선언 */

const headers = {
  "Content-Type": "application/json",
  "Connection": "keep-alive",
  "X-Requested-With": "XMLHttpRequest"
}

const userHost = 'https://clonetodo.herokuapp.com';
const todoHost = 'https://clonetodo.herokuapp.com/api/v1';

//POST 메서드로 전송할 데이터
// let formData = new FormData(); 
// formData.append('key', value); // key-value (키-값)의 형태로 데이터 추가함

/* 캘린더 API 통신 시작 */

//GET 캘린더 데이터 가져오기
//dateYm=yyyy-mm
export const getTodosOverviewData = async (numUserId,localDate) => {

  //axios
  await axios({
    method: `GET`,
    url: `${todoHost}/todos/overview`,
    params: {
      userId: numUserId,
      dateYm: localDate
    },
    header: {
      headers
    }
  })
  .then(Response => Response.data)
  .then(Response => !Response.success ? alert("데이터를 받아오지 못했습니다.") : null)
  .catch((Error)=>{console.log(Error)})
  
    //완료 되면 res.data가 success true 인지 확인하고 null 부분에 todoData에 objFeedCalendarOverview 값을 바꿔줘야 한다
  return Response.data;
} 

/* 캘린더 API 통신 종료 */



/* 유저 관련 통신 시작 */

//회원가입
export const postUserJoin = async (data) => {

  //axios
  await axios({
    method: `POST`,
    url: `${userHost}/join`,
    params: {
      data
    },
    headers:{
      headers
    }
  })
  .then(res => res.data)
  .then(res => res.data.success ? sessionStorage.setItem("userId", res.data.userId) : console.log("회원가입 실패"))
  .then(res => !res.success ? alert("회원가입에 실패했습니다. 연결을 확인해주세요") : window.location.reload(`/signin`))
  
} 



//로그인

export const postUserLogin = async (data) => {

  //axios
  await axios({
    method: `POST`,
    url: `${userHost}/login`,
    params: {
      data
    },
    headers:{
      headers
    },
    withCredentials: true
  })
  .then(res => res.data)
  .then(res => !res.success ? alert("아이디와 비밀번호를 확인해주세요") : 
   window.location.reload(`/main`))
} 


/* 유저 관련 통신 종료 */



/* 목표 API 통신 시작 */

//GET 목표 배열 가져오기

export const getGoalsData = async () => {

  //axios
  await axios({
   method: `GET`,
   url: `${todoHost}/goals`
 })
 .then(Response => Response.data)
 .then(Response => !Response.success ? alert("데이터를 받아오지 못했습니다.") : null)
 .catch((Error)=>{console.log(Error)})

 return Response.data;
}

//POST 목표 등록하기

export const postGoalRegister = async (data) => {

  //axios
  await axios({
   method: `POST`,
   url: `${todoHost}/goals`,
   params: {
    data
  },
  headers:{
    headers
  }
 })
 .then(Response => Response.data)
 .then(Response => !Response.success ? alert("데이터를 등록하지 못했습니다.") : null)
 .catch((Error)=>{console.log(Error)})

 return Response.data;
}

//PATCH 목표 수정하기
export const patchGoalEdit = async (goalId, data) => {

  //axios
  await axios({
   method: `PATCH`,
   url: `${todoHost}/goals/${goalId}`,
   params: {
    data
  },
  headers:{
    headers
  }
 })
 .then(Response => Response.data)
 .then(Response => !Response.success ? alert("데이터를 수정하지 못했습니다.") : null)
 .catch((Error)=>{console.log(Error)})

 return Response.data;
}

//DELETE 목표 삭제하기

export const deleteGoalData = async (goalId) => {

  //axios
  await axios({
   method: `DELETE`,
   url: `${todoHost}/goals/${goalId}`,
  headers:{
    headers
  }
 })
 .then(Response => Response.data)
 .then(Response => !Response.success ? alert("데이터를 삭제하지 못했습니다.") : null)
 .catch((Error)=>{console.log(Error)})

 return Response.data;
}

/* 목표 API 통신 끝 */



/* 투두 API 통신 시작 */

//GET objTodosDataResult id 값으로 받아오기

//GET objTodosDataResult 캘린더 날짜로 받아오기
//date=yyyy-mm-dd
export const getTodosData = async (numUserId,localDate) => {

   //axios
   await axios({
    method: `GET`,
    url: `${todoHost}/todos/overview`,
    params: {
      userId: sessionStorage.getItem("userId"),
      dateYm: localDate
    }
  })
  .then(Response => Response.data)
  .then(Response => !Response.success ? alert("데이터를 받아오지 못했습니다.") : null)
  .catch((Error)=>{console.log(Error)})
  
    //완료 되면 res.data가 success true 인지 확인하고 null 부분에 todoData에 objFeedCalendarOverview 값을 바꿔줘야 한다
  return Response.data

} 

//POST objTodosDataResult 추가하기

export const postTodoCreateData = async (data) => {
  //axios
  await axios({
    method: `POST`,
    url: `${todoHost}/todos`,
    body: {
      data
    }
  })
  .then(Response => console.log("res", Response.data))
  .then(Error => console.log("error : ", Error))

}

//PATCH objTodosDataResult id값으로 수정하기

//PATCH objTodosDataResult 날짜로 수정하기
//date=yyyy-mm-dd
export const patchTodoEditData = async (todoId, data) => {
  console.log("data", data)
  //axios
  await axios({
    method: `PATCH`,
    url: `${todoHost}/todos`,
    params:{
      id : todoId 
    },
    body: {
      data
    }
  })
  .then(Response => Response.data)

}



//DELETE objTodosDataResult 날짜로 모든 todo값 삭제하기

//DELETE objTodosDataResult 날짜로 모든 todo값 삭제하기

/* 투두 API 통신 끝 */




/* 투두 좋아요 API 통신 시작 */

//POST 투두 좋아요 클릭 +1 추가하기

//DELETE 투두 좋아요 클릭 -1 삭제하기

/* 투두 좋아요 API 통신 끝 */



/* 팔로우 API 통신 시작 */

//GET followers 가져오기

export async function axiosGetFollowers () {
  //axios

  await axios.get(`/follow/followers`)
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 

//GET following 가져오기

export async function axiosGetFollowing () {
  //axios

  await axios.get(`/follow/followings`)
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 

//POST 팔로워 수정하기

//DELETE 팔로워 삭제하기

/* 팔로우 API 통신 끝 */



/* 좋아요 API 통신 시작 */

//GET 좋아요 보내기

//GET 지정 날짜 좋아요 보내기
//date=yyyy-mm-dd

//POST 좋아요 수정하기


//DELETE 좋아요 삭제하기


/* 좋아요 API 통신 끝 */
