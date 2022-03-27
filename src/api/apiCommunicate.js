import axios from 'axios';

export default async function getResources () {

  //axios
  await axios.get('api url')
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 


export async function postData () {

  //axios
  await axios.post('api url')
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 

/* 캘린더 API 통신 시작 */

//캘린더 데이터 가져오기
export async function getTodoDataForCalendar () {

  //axios
  await axios.get('api url')
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 




/* 캘린더 API 통신 시작 */



/* 목표 API 통신 시작 */

//POST 메서드로 전송할 데이터
// let formData = new FormData(); 
// formData.append('key', value); // key-value (키-값)의 형태로 데이터 추가함


export const postGoalsData = async () => {

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



/* 목표 API 통신 끝 */


/* 투두 API 통신 시작 */


//objTodosDataResult 캘린더 날짜로 받아오기

export async function getTodosData () {

  //axios
  await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 





/* 투두 API 통신 시작 */



