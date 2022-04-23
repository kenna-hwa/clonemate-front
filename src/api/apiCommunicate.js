import axios from 'axios';


export async function getTodosData () {

  //axios
  await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 


//[axios] 데이터 get 통신 예시 
export default async function axiosGetDataWithoutParam () {
  await axios.get('api url')
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 
//[axios] 데이터 get 통신 예시 
export async function axiosGetDataWithParam () {
  await axios.get('api url', {
    params: {
      foo: 'bar'
    }
  })
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 
//[axios] 데이터 post 통신 예시 
export async function axiosPostDataWithoutParam () {
  await axios.post('api url')
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 
//[axios] 데이터 post 통신 예시 
export async function axiosPostDataWithParam () {
  await axios.post('api url', {
    params: {
      foo: 'bar'
    }
  })
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 

//[fetch] 데이터 get 통신 예시
export const fetchGetDataWithParam = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Test",
      body: "I am testing!",
      userId: 1,
    }),
  })
  .then((response) => console.log(response))
  .catch(err => console.log(err));
}

//[fetch] 데이터 post 통신 예시
export const fetchPostDataWithParam = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Test",
      body: "I am testing!",
      userId: 1,
    }),
  })
  .then((response) => console.log(response))
  .catch(err => console.log(err));
}


//POST 메서드로 전송할 데이터
// let formData = new FormData(); 
// formData.append('key', value); // key-value (키-값)의 형태로 데이터 추가함

/* 캘린더 API 통신 시작 */

//GET 캘린더 데이터 가져오기
//dateYm=yyyy-mm
export async function axiosGetTodoDataForCalendar (date) {
  //axios
  await axios.get(`/todos/overview/${date}`)
  .then((Response)=>{
    //Response의 success가 true 일 때 data를
    return Response.success ? Response.data : console.log(Response.errorMessage);
  })
  .catch((Error)=>{console.log(Error)})
} 


/* 캘린더 API 통신 시작 */



/* 목표 API 통신 시작 */

//GET 목표 배열 가져오기
export async function axiosGetGoalsData () {
  //axios
  await axios.post('/goals')
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 

//POST 목표 등록하기
export async function axiosPostGoalsData () {
  //axios
  await axios.post('/goals',{
    body: {
      'orderNo' : 1,
      'title' : '목표2',
      'privacy' : 'PUBLIC',
      'titleColor' : '#cccccc',
    }
  })
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 

//PATCH 목표 수정하기
export async function axiosPatchGoalsData (id) {
  //axios
  await axios.post(`/goals/${id}`,{
    body: {
      'title' : '목표2',
      'privacy' : 'PRIVATE',
      'titleColor' : '#222222',
    }
  })
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 

//DELETE 목표 삭제하기
export async function axiosDeleteGoalsData (id) {
  //axios
  await axios.delete(`/goals/${id}`)
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 

/* 목표 API 통신 끝 */

/* 투두 API 통신 시작 */

//GET objTodosDataResult id 값으로 받아오기

export async function axiosGetTodoDataWithId (id) {
  //axios
  await axios.get(`/todos/${id}`)
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 


//GET objTodosDataResult 캘린더 날짜로 받아오기
//date=yyyy-mm-dd
export async function axiosGetTodoDataforCalendar (date) {

  //axios
  await axios.get(`http://{{host}}/today/todolist?date=/${date}`)
  .then((Response)=>{
    return Response.success ? Response.data : Response.errorMessage;
  })
  .catch((Error)=>{console.log(Error)})
} 


//POST objTodosDataResult 추가하기
export async function axiosPostTodoData () {

  //axios
  await axios.post(`http://{{host}}/todos`,{
    body: {
      "goalId": 1,
      "orderNo": 1,
      "title": "투두",
      "date":"2022-03-29",
      "startRepeatDate":"2022-03-29",
      "endRepeatDate":"2022-03-29",
      "repeatMonYn":"n",
      "repeatTueYn":"n",
      "repeatWenYn":"n",
      "repeatThuYn":"n",
      "repeatFriYn":"n",
      "repeatSatYn":"n",
      "repeatSunYn":"n",
      "checkYn": "n"
    }
  })
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 

//PATCH objTodosDataResult id값으로 수정하기
export async function axiosPatchTodoDataWithId (id) {

  //axios
  await axios.patch(`http://{{host}}/todos/${id}`,{
    body: {
      "goalId": 1,                   //옵션
      "orderNo": 1,                  //옵션
      "title": "투두수정",            //옵션
      "startRepeatDate":"2022-03-29", //옵션
      "endRepeatDate":"2022-03-31",   //옵션
      "repeatMonYn":"n",              //옵션
      "repeatTueYn":"n",              //옵션
      "repeatWenYn":"y",              //옵션
      "repeatThuYn":"n",              //옵션
      "repeatFriYn":"n",              //옵션
      "repeatSatYn":"y",              //옵션
      "repeatSunYn":"n",              //옵션
      "checkYn": "n"                  //옵션
    }
  })
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 

//PATCH objTodosDataResult 날짜로 수정하기
//date=yyyy-mm-dd
//checkYn=y or n
export async function axiosPatchTodoDataWithDate (date,checkYn) {

  //axios
  await axios.patch(`/todos/${date}/${checkYn}`,{
    body: {
      "goalId": 1,                   //옵션
      "orderNo": 1,                  //옵션
      "title": "투두수정",            //옵션
      "date": date,           //옵션
      "startRepeatDate":"2022-03-29", //옵션
      "endRepeatDate":"2022-03-31",   //옵션
      "repeatMonYn":"n",              //옵션
      "repeatTueYn":"n",              //옵션
      "repeatWenYn":"y",              //옵션
      "repeatThuYn":"n",              //옵션
      "repeatFriYn":"n",              //옵션
      "repeatSatYn":"y",              //옵션
      "repeatSunYn":"n",              //옵션
      "checkYn": checkYn              //옵션
    }
  })
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 

//DELETE objTodosDataResult 날짜로 모든 todo값 삭제하기
export async function axiosDeleteAllTodoData (date) {

  //axios
  await axios.delete(`/todos/${date}`,{
    body: {
      goalId: 1,
      orderNo: 1,
      title: "투두",
      date: "2022-02-13",
      endRepeatDate: "2022-02-14",
      repeatDays: {
        THU: "N",
        WEN: "N",
        TUE: "N",
        SAT: "N",
        FRI: "N",
        MON: "N",
        SUN: "N"
      },
    }
  })
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 
//DELETE objTodosDataResult 날짜로 모든 todo값 삭제하기
export async function axiosDeleteTodoData (id) {

  //axios
  await axios.delete(`/todos/${id}`)
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 

/* 투두 API 통신 끝 */

/* 투두 좋아요 API 통신 시작 */


//POST 투두 좋아요 클릭 +1 추가하기
export async function axiosPostTodoLikeData (todoId) {

  //axios
  await axios.post(`http://{{host}}/like/${todoId}`,{
    body: {
      
    }
  })
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 

//DELETE 투두 좋아요 클릭 -1 삭제하기
export async function axiosDeleteTodoLikeData (likeId) {

  //axios
  await axios.delete(`http://{{host}}/like/${likeId}`)
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 


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

export async function axiosPostEditFollower (user_id) {
  //axios
  await axios.post(`/follow/${user_id}`)
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 

//DELETE 팔로워 삭제하기

export async function axiosDeleteFollower (user_id) {
  //axios
  await axios.delete(`/follow/${user_id}`)
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 


/* 팔로우 API 통신 끝 */


/* 좋아요 API 통신 시작 */

//GET 좋아요 보내기

export async function axiosGetLike (todo_id) {
  //axios
  await axios.get(`/follow/${todo_id}`)
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 

//GET 지정 날짜 좋아요 보내기
//date=yyyy-mm-dd
export async function axiosGetLikeWithDate(date) {
  //axios
  await axios.get(`/like/${date}`)
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 

//POST 좋아요 수정하기

export async function axiosPostLike (todo_id) {
  //axios
  await axios.post(`/like/${todo_id}`)
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 

//DELETE 좋아요 삭제하기

export async function axiosDeleteLike (todo_id) {
  //axios
  await axios.delete(`/like/${todo_id}`)
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 


/* 좋아요 API 통신 끝 */
