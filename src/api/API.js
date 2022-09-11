import axios from 'axios';

export const getTodosDataSample = async () => {

    //axios
    await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then((Response)=>{console.log(Response.data)})
    .then((result)=>{console.log(result)})
    .catch((Error)=>{console.log(Error)})
  
    return Response.data
  } 
  
  
  /* 공통 변수 선언 */
  
  const headers = {
    "Content-Type": "application/json",
    "Connection": "keep-alive",
    "X-Requested-With": "XMLHttpRequest"
  }
  
  const userHost = 'https://clonetodo.herokuapp.com';
  const todoHost = 'https://clonetodo.herokuapp.com/api/v1';
  