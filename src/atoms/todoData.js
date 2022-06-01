import { atom } from "recoil";

//아톰 예시 입니다.
export const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

// Goal, Todo 캘린더 모달용 날짜 state


const today = new Date();
const tomorrow = new Date(today);
const nextDay = new Date(tomorrow.setDate(today.getDate()+1))


//오늘 날짜, 내일 날짜
export const objDatesData = atom({
  key: 'objDatesData',
  default : {
    "dtToday" : today.toJSON().substring(0, 10),
    "dtTomorrow" : nextDay.toJSON().substring(0, 10),
    "dtFeedCalendarDate" : today,
    "selectedNewDate" : new Date(),
    "selectedNewEndDate" : new Date(),
  }

})

// Feed 좌측 캘린더 state -> CalendarBox 컴포넌트에서 dtFeedCalendarOverview 로 사용
export const objFeedCalendarOverview = atom({ // 로딩 시 현재 달의 데이터 전부 // <> 클릭하면 다시 데이터 받기
    key: 'objFeedCalendarOverview', // unique ID (with respect to other atoms/selectors)
    default: [ 
          {
            "numTodoDay": 11,
            "numTodoCount": 2,
            "isCompleted": false
          },
          {
            "numTodoDay": 29,
            "numTodoCount": 1,
            "isCompleted": false
          }
        ]
  });// default value (aka initial value)

// todo 더미데이터 수정 220304


// todo api
export const objTodosDataResult = atom({
  key: 'objTodosDataResult',
  default: [
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
                "contents": "오늘의 투두1",
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
                "id": 2,
                "goalId": 1,
                "orderNo": 2,
                "contents": "오늘의 투두2",
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
            }
        ]
    }
]
})



export const goalsData = atom({ // 로딩 시 모든 목표 뿌리기
  key: "goalsData",
  default: [
    {
      "contents": "첫 번째 목표",
      "orderNo": 1,
      "privacy": "PUBLIC",
      "color": "#ff0000",
      "id": 1
    },
    {
      "contents": "두 번째 목표",
      "orderNo": 2,
      "privacy": "PUBLIC",
      "color": "#ff873d",
      "id": 2
    },
    {
      "contents": "세 번째 목표",
      "orderNo": 3,
      "privacy": "FOLLOWING",
      "color": "#0119cb",
      "id": 3
    },
    {
      "contents": "네 번째 목표",
      "orderNo": 4,
      "privacy": "PRIVATE",
      "color": "#77ab59",
      "id": 4
    }
  ]
})


export const createRepeatDay = atom({
  key: "createRepeatDay",
  default: {
  "SUN": false, //y 면 일요일 반복, n 이면 반복 x
  "MON": false,
  "TUE": false,
  "WED": false,
  "THU": false,
  "FRI": false,
  "SAT": false,
}
});

// export const todoData = atom({ // 로딩 시 오늘 값 받아오기 // 캘린더에서 날짜 클릭하면 해당 날짜로 값 받아오기 // 더미 데이터는 2022-02-05
//   key: "todoData",
//   default: [
//     {
//     "todo_id": 0,
//     "goal_id": 0, //묶여있는 goal id
//     "next_todo_id": 1, //다음 todo id (순서지정용)
//     "title": "첫 번째 목표의 할 일 0",
//     "date": "2022-02-05",
//     "end_repeat_date": "2022-02-05", //반복 종료 일자. 반복 없으면 date 와 값이 같거나 없음
//     "repeat_days": {
//         "sun": "N", //y 면 일요일 반복, n 이면 반복 x
//         "mon": "N",
//         "tue": "N",
//         "wed": "N",
//         "thu": "N",
//         "fri": "N",
//         "sat": "N",
//     },
//     "check_yn" : "N" //달성여부
//   },
//   {
//     "todo_id": 1,
//     "goal_id": 0, //묶여있는 goal id
//     "next_todo_id": 2, //다음 todo id (순서지정용)
//     "title": "첫 번째 목표의 할 일 1",
//     "date": "2022-02-05",
//     "end_repeat_date": "2022-02-05", //반복 종료 일자. 반복 없으면 date 와 값이 같거나 없음
//     "repeat_days": {
//         "sun": "N", //y 면 일요일 반복, n 이면 반복 x
//         "mon": "N",
//         "tue": "N",
//         "wed": "N",
//         "thu": "N",
//         "fri": "N",
//         "sat": "N",
//     },
//     "check_yn" : "N" //달성여부
//   },
//   {
//     "todo_id": 0,
//     "goal_id": 1, //묶여있는 goal id
//     "next_todo_id": 1, //다음 todo id (순서지정용)
//     "title": "두 번째 목표의 할 일 1",
//     "date": "2022-02-05",
//     "end_repeat_date": "2022-02-05", //반복 종료 일자. 반복 없으면 date 와 값이 같거나 없음
//     "repeat_days": {
//         "sun": "N", //y 면 일요일 반복, n 이면 반복 x
//         "mon": "N",
//         "tue": "N",
//         "wed": "N",
//         "thu": "N",
//         "fri": "N",
//         "sat": "N",
//     },
//     "check_yn" : "N" //달성여부
//   }
// ]
// })

export const todoReadOnly = atom({
  key: "todoReadOnly",
  default: true
})

export const dateCalendarOpen = atom({
  key: "dateCalendarOpen",
  default: false
})

export const endRepeatDateCalendarOpen = atom({
  key: "endRepeatDateCalendarOpen",
  default: false
})

export const repeatDayCalendarOpen = atom({
  key: "repeatDayCalendarOpen",
  default: false
})

// User API 테스트 더미 
export const userIdInfo = atom({
  key: 'userIdInfo',
  default : [
    {
    "id": 2,
    "account": "test2",
    "email": "test2@test.com",
    "name": "클론짱2",
    "introText": "클론짱2의 투두메이트",
    }
  ]
})


// Followers 테스트 더미 
export const testFollowerData = atom({
  key: 'testFollowerData',
  default : [
    {
      "introText": "팔로우테스트1 투두입니다~~",
      "email": "77777@gmail.com",
      "account": "test1",
      "name": "팔로우테스트1",
      "id": 2
    },
    {
      "introText": "🥛팔로우테스트2 투두입니다~~",
      "email": "5555@gmail.com",
      "account": "test1",
      "name": "팔로우테스트2",
      "id": 3
    },
    {
      "introText": "팔로우테스트3 투두입니다~~",
      "email": "6666@gmail.com",
      "account": "test1",
      "name": "팔로우테스트3",
      "id": 4
    },
  ],
})

