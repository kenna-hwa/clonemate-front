import axios from 'axios';




export const getTodosData = async () => {

  //axios
  await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  .then((Response)=>{console.log(Response.data)})
  .then((result)=>{console.log(result)})
  .catch((Error)=>{console.log(Error)})

  return Response.data
} 


/* ------------------------------------예시 종료---------------------------------------- */

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

/* 캘린더 API 통신 종료 */



/* 유저 관련 통신 시작 */

//회원가입
export const postUserJoin = async (data) => {

  //axios
  await axios({
    method: `get`,
    url: `${userHost}/join`,
    params: {
      data
    }
  })
  .then(res => res.data)
  .then(res => !res.success ? alert("아이디와 비밀번호를 확인해주세요") : 
   window.location.reload(`/signin`))
} 



//로그인

export const postUserLogin = async (data) => {

  //axios
  await axios({
    method: `get`,
    url: `${userHost}/login`,
    params: {
      data
    }
  })
  .then(res => res.data)
  .then(res => !res.success ? alert("아이디와 비밀번호를 확인해주세요") : 
   window.location.reload(`/main`))
} 


/* 유저 관련 통신 종료 */



/* 목표 API 통신 시작 */

//GET 목표 배열 가져오기

//POST 목표 등록하기

//PATCH 목표 수정하기

//DELETE 목표 삭제하기

/* 목표 API 통신 끝 */



/* 투두 API 통신 시작 */

//GET objTodosDataResult id 값으로 받아오기

//GET objTodosDataResult 캘린더 날짜로 받아오기
//date=yyyy-mm-dd

//POST objTodosDataResult 추가하기

//PATCH objTodosDataResult id값으로 수정하기

//PATCH objTodosDataResult 날짜로 수정하기
//date=yyyy-mm-dd
//checkYn=y or n

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
