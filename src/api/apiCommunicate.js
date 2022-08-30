import axios from 'axios';
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { objFeedCalendarOverview , objDatesData} from "../atoms/todoData";


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


/* ------------------------------------예시 종료---------------------------------------- */

/* state 관리 */

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

//수정 중
//유저 정보
export const userInfoState = atom({
  key: "userInformation",
  default: { userId : 'test', date : '2022-07-11' }
});

//default Goal Atom
export const GoalsDataState = atom({
  key: 'atom/goals-data',
  default:[
    {
        "id": 1,
        "orderNo": 1,
        "contents": "목표 1",
        "privacy": "PUBLIC",
        "color": "#cccccc",
        "todos": [
            {
                "id": 1,
                "goalId": 1,
                "orderNo": 1,
                "contents": "목표1의 투두1",
                "date": "2022-05-11",
                "startRepeatDate": null,
                "endRepeatDate": null,
                "repeatDays": {
                    "THU": false,
                    "TUE": true,
                    "WED": false,
                    "SAT": false,
                    "FRI": true,
                    "MON": false,
                    "SUN": false
                },
                "isChecked": false,
                "likes": null
            },
            {
                "id": 2,
                "goalId": 1,
                "orderNo": 2,
                "contents": "목표1의 투두2",
                "date": "2022-05-11",
                "startRepeatDate": null,
                "endRepeatDate": null,
                "repeatDays": {
                    "THU": false,
                    "TUE": false,
                    "WED": false,
                    "SAT": false,
                    "FRI": false,
                    "MON": false,
                    "SUN": false
                },
                "isChecked": false,
                "likes": null
            },
            {
                "id": 6,
                "goalId": 1,
                "orderNo": 3,
                "contents": "목표1의 투두6",
                "date": "2022-03-29",
                "startRepeatDate": "2022-03-29",
                "endRepeatDate": "2022-03-29",
                "repeatDays": {
                    "THU": false,
                    "TUE": false,
                    "WED": false,
                    "SAT": false,
                    "FRI": false,
                    "MON": false,
                    "SUN": false
                },
                "isChecked": false,
                "likes": null
            },
            {
                "id": 7,
                "goalId": 1,
                "orderNo": 4,
                "contents": "목표1의 투두7",
                "date": "2022-05-29",
                "startRepeatDate": "2022-05-29",
                "endRepeatDate": "2022-05-29",
                "repeatDays": {
                    "THU": false,
                    "TUE": false,
                    "WED": false,
                    "SAT": false,
                    "FRI": false,
                    "MON": false,
                    "SUN": false
                },
                "isChecked": false,
                "likes": null
            }
        ]
    },
    {
        "id": 2,
        "orderNo": 2,
        "contents": "목표 2",
        "privacy": "PUBLIC",
        "color": "#cccccc",
        "todos": [
            {
                "id": 1,
                "goalId": 2,
                "orderNo": 1,
                "contents": "목표2의 투두1",
                "date": "2022-05-11",
                "startRepeatDate": null,
                "endRepeatDate": null,
                "repeatDays": {
                    "THU": false,
                    "TUE": true,
                    "WED": false,
                    "SAT": false,
                    "FRI": true,
                    "MON": false,
                    "SUN": false
                },
                "isChecked": false,
                "likes": null
            },
            {
                "id": 2,
                "goalId": 2,
                "orderNo": 2,
                "contents": "목표2의 투두2",
                "date": "2022-05-11",
                "startRepeatDate": null,
                "endRepeatDate": null,
                "repeatDays": {
                    "THU": false,
                    "TUE": false,
                    "WED": false,
                    "SAT": false,
                    "FRI": false,
                    "MON": false,
                    "SUN": false
                },
                "isChecked": false,
                "likes": null
            },
            {
                "id": 3,
                "goalId": 2,
                "orderNo": 3,
                "contents": "목표2의 투두3",
                "date": "2022-03-29",
                "startRepeatDate": "2022-03-29",
                "endRepeatDate": "2022-03-29",
                "repeatDays": {
                    "THU": false,
                    "TUE": false,
                    "WED": false,
                    "SAT": false,
                    "FRI": false,
                    "MON": false,
                    "SUN": false
                },
                "isChecked": false,
                "likes": null
            }
        ]
    },
    {
        "id": 3,
        "orderNo": 3,
        "contents": "목표 3",
        "privacy": "PUBLIC",
        "color": "#cccccc",
        "todos": [
            {
                "id": 2,
                "goalId": 3,
                "orderNo": 1,
                "contents": "목표2의 투두2",
                "date": "2022-05-11",
                "startRepeatDate": null,
                "endRepeatDate": null,
                "repeatDays": {
                    "THU": false,
                    "TUE": true,
                    "WED": false,
                    "SAT": false,
                    "FRI": true,
                    "MON": false,
                    "SUN": false
                },
                "isChecked": false,
                "likes": null
            },
            {
                "id": 4,
                "goalId": 3,
                "orderNo": 2,
                "contents": "목표3의 투두4",
                "date": "2022-05-11",
                "startRepeatDate": null,
                "endRepeatDate": null,
                "repeatDays": {
                    "THU": false,
                    "TUE": false,
                    "WED": false,
                    "SAT": false,
                    "FRI": false,
                    "MON": false,
                    "SUN": false
                },
                "isChecked": false,
                "likes": null
            },
            {
                "id": 5,
                "goalId": 3,
                "orderNo": 3,
                "contents": "목표3의 투두5",
                "date": "2022-03-29",
                "startRepeatDate": "2022-03-29",
                "endRepeatDate": "2022-03-29",
                "repeatDays": {
                    "THU": false,
                    "TUE": false,
                    "WED": false,
                    "SAT": false,
                    "FRI": false,
                    "MON": false,
                    "SUN": false
                },
                "isChecked": false,
                "likes": null
            }
        ]
    }
]
});

//default Todo Atom
export const TodosDataStates = atom({
  key: 'atom/todos-data',
  default: [
    [
        {
            "id": 1,
            "goalId": 1,
            "orderNo": 1,
            "contents": "목표1의 투두1",
            "date": "2022-05-11",
            "startRepeatDate": null,
            "endRepeatDate": null,
            "repeatDays": {
                "THU": false,
                "TUE": true,
                "WED": false,
                "SAT": false,
                "FRI": true,
                "MON": false,
                "SUN": false
            },
            "isChecked": false,
            "likes": null
        },
        {
            "id": 2,
            "goalId": 1,
            "orderNo": 2,
            "contents": "목표1의 투두2",
            "date": "2022-05-11",
            "startRepeatDate": null,
            "endRepeatDate": null,
            "repeatDays": {
                "THU": false,
                "TUE": false,
                "WED": false,
                "SAT": false,
                "FRI": false,
                "MON": false,
                "SUN": false
            },
            "isChecked": false,
            "likes": null
        },
        {
            "id": 6,
            "goalId": 1,
            "orderNo": 3,
            "contents": "목표1의 투두6",
            "date": "2022-03-29",
            "startRepeatDate": "2022-03-29",
            "endRepeatDate": "2022-03-29",
            "repeatDays": {
                "THU": false,
                "TUE": false,
                "WED": false,
                "SAT": false,
                "FRI": false,
                "MON": false,
                "SUN": false
            },
            "isChecked": false,
            "likes": null
        },
        {
            "id": 7,
            "goalId": 1,
            "orderNo": 4,
            "contents": "목표1의 투두7",
            "date": "2022-05-29",
            "startRepeatDate": "2022-05-29",
            "endRepeatDate": "2022-05-29",
            "repeatDays": {
                "THU": false,
                "TUE": false,
                "WED": false,
                "SAT": false,
                "FRI": false,
                "MON": false,
                "SUN": false
            },
            "isChecked": false,
            "likes": null
        }
    ],
    [
        {
            "id": 1,
            "goalId": 2,
            "orderNo": 1,
            "contents": "목표2의 투두1",
            "date": "2022-05-11",
            "startRepeatDate": null,
            "endRepeatDate": null,
            "repeatDays": {
                "THU": false,
                "TUE": true,
                "WED": false,
                "SAT": false,
                "FRI": true,
                "MON": false,
                "SUN": false
            },
            "isChecked": false,
            "likes": null
        },
        {
            "id": 2,
            "goalId": 2,
            "orderNo": 2,
            "contents": "목표2의 투두2",
            "date": "2022-05-11",
            "startRepeatDate": null,
            "endRepeatDate": null,
            "repeatDays": {
                "THU": false,
                "TUE": false,
                "WED": false,
                "SAT": false,
                "FRI": false,
                "MON": false,
                "SUN": false
            },
            "isChecked": false,
            "likes": null
        },
        {
            "id": 3,
            "goalId": 2,
            "orderNo": 3,
            "contents": "목표2의 투두3",
            "date": "2022-03-29",
            "startRepeatDate": "2022-03-29",
            "endRepeatDate": "2022-03-29",
            "repeatDays": {
                "THU": false,
                "TUE": false,
                "WED": false,
                "SAT": false,
                "FRI": false,
                "MON": false,
                "SUN": false
            },
            "isChecked": false,
            "likes": null
        }
    ],
    [
        {
            "id": 2,
            "goalId": 3,
            "orderNo": 1,
            "contents": "목표2의 투두2",
            "date": "2022-05-11",
            "startRepeatDate": null,
            "endRepeatDate": null,
            "repeatDays": {
                "THU": false,
                "TUE": true,
                "WED": false,
                "SAT": false,
                "FRI": true,
                "MON": false,
                "SUN": false
            },
            "isChecked": false,
            "likes": null
        },
        {
            "id": 4,
            "goalId": 3,
            "orderNo": 2,
            "contents": "목표3의 투두4",
            "date": "2022-05-11",
            "startRepeatDate": null,
            "endRepeatDate": null,
            "repeatDays": {
                "THU": false,
                "TUE": false,
                "WED": false,
                "SAT": false,
                "FRI": false,
                "MON": false,
                "SUN": false
            },
            "isChecked": false,
            "likes": null
        },
        {
            "id": 5,
            "goalId": 3,
            "orderNo": 3,
            "contents": "목표3의 투두5",
            "date": "2022-03-29",
            "startRepeatDate": "2022-03-29",
            "endRepeatDate": "2022-03-29",
            "repeatDays": {
                "THU": false,
                "TUE": false,
                "WED": false,
                "SAT": false,
                "FRI": false,
                "MON": false,
                "SUN": false
            },
            "isChecked": false,
            "likes": null
        }
    ]
]
});


//default Todo Atom
export const TodosDataState = atom({
  key: 'atom/todos-data',
  default: {},
});

//Todo 받아오기
export const getTodoData = selector({
  key: "get/todo-data",
  get: async ({ get }) => {
    try{
      const { userId, date } = get(userInfoState);
      if (!userId || !date) return;
      const result = await axios.get(`${todoHost}/todos`);
      return result?.data;
    } catch (err) {
    	throw err;
    }
  },

  set: ({set}, todos) => {
    const todosCopy = [...todos];
    set(
      GoalsDataState,
      ()=>{
        for(let i = 0; i < todosCopy.length; i++){
          let todos = todosCopy[i].todos
          GoalsDataState.push(todosCopy[i]);
          TodosDataState[i] = todos;
        }
      }
    );
  }
});


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
  return Response.data;
} 

//POST objTodosDataResult 추가하기
export const postTodoCreateData = async (param) => {
  //axios
  await axios({
    method: `POST`,
    url: `${todoHost}/todos`,
    params: {
      param
    }
  })
  .then(Response => console.log("res", Response.data))
  .then(Error => console.log("error : ", Error))

}

//PATCH objTodosDataResult 날짜로 수정하기
//date=yyyy-mm-dd
//isChecked bool

//미완료 할 일 오늘 하기
export const PatchTodosAllChecked = async (date) => {
  //axios
  await axios({
    method: `PATCH`,
    url: `${todoHost}/todos?date=${date}&isChecked=true`,
  })
  .then(Response => console.log("res", Response.data))
};

//미완료 할 일 다른 날 하기
// params 로 날짜를 지정하는걸까?
// 그러면 date 만 바꿔주면 될까?

export const patchTodosChangeDate = async (date, newDate) => {
  console.log("todayDate", date, "newDate", newDate);
  //axios
  await axios({
    method: `PATCH`,
    url: `${todoHost}/todos?date=${date}&isChecked=false`,
    body: {
      'date': newDate
    }
  })
  .then(Response => Response.data);
}

//미완료 할 일 삭제
export const DeleteTodosNotChecked = async (date) => {
  //axios
  await axios({
    method: `DELETE`,
    url: `${todoHost}/todos?date=${date}&isChecked=false`,
  })
  .then(Response => console.log("res", Response.data));
};


//DELETE objTodosDataResult 날짜로 모든 todo값 삭제하기
//모든 할 일 삭제
export const DeleteTodosAll = async (date) => {
  //axios
  await axios({
    method: `DELETE`,
    url: `${todoHost}/todos?date=${date}`,
  })
  .then(Response => console.log("res", Response.data));
};

//할 일 checkbox 클릭하기
export const patchChangeCheckedTodo = async (id,isChecked) => {
  await axios({
    method: `PATCH`,
    url: `${todoHost}/todos/${id}`,
    body: {
      'isChecked	': isChecked,
    }
  })
  .then(Response => Response.data);
}

//할 일 클릭해서 contents 수정하기
export const patchChangeContentsTodo = async (id, contents) => {  //axios
  await axios({
    method: `PATCH`,
    url: `${todoHost}/todos/${id}`,
    body: {
      'contents': contents,
    }
  })
  .then(Response => Response.data);
}

//할 일 클릭해서 내일 하기
export const patchTomorrowTodo = async (id, newDate) => {
  //axios
  await axios({
    method: `PATCH`,
    url: `${todoHost}/todos/${id}`,
    body: {
      'date': newDate,
      'endRepeatDate': newDate
    }
  })
  .then(Response => Response.data);
}

//할 일 클릭해서 날짜 바꾸기
export const patchChangeDateTodo = async (id, newDate) => {
  //axios
  await axios({
    method: `PATCH`,
    url: `${todoHost}/todos/${id}`,
    body: {
      'date': newDate,
      'endRepeatDate': newDate
    }
  })
  .then(Response => Response.data);
}


//할 일 클릭해서 1개 삭제
//목표는 설정 안해도 될까요ㅠㅠ
export const DeleteTodo = async (id) => {
  //axios
  await axios({
    method: `DELETE`,
    url: `${todoHost}/todos/${id}`,
  })
  .then(Response => console.log("res", Response.data));
}


/* 투두 API 통신 끝 */




/* 투두 좋아요 API 통신 시작 */

//POST 투두 좋아요 클릭 +1 추가하기

//DELETE 투두 좋아요 클릭 -1 삭제하기

/* 투두 좋아요 API 통신 끝 */



/* 팔로우 API 통신 시작 */

//GET followers 가져오기
export const getFollowersData = async () => {

  //axios
  await axios({
   method: `GET`,
   url: `${todoHost}/follows/followers`
 })
 .then(Response => Response.data)
 .then(Response => !Response.success ? alert("데이터를 받아오지 못했습니다.") : null)
 .catch((Error)=>{console.log(Error)})

 return Response.data;
}



//GET following 가져오기

export const getFollowingsData = async () => {

  //axios
  await axios({
   method: `GET`,
   url: `${todoHost}/follow/followings`
 })
 .then(Response => Response.data)
 .then(Response => !Response.success ? alert("데이터를 받아오지 못했습니다.") : null)
 .catch((Error)=>{console.log(Error)})

 return Response.data;
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
