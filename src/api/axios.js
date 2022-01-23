import axios from 'axios';

export function getData(url){
    axios.get(url)
  .then((Response)=>{console.log(Response.data)})
  .catch((Error)=>{console.log(Error)})
}