import axios from 'axios';

export default async function getResources () {

  //axios
  await axios.get('api url')
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
} 


export async function getTodoDataForCalendar () {

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
