import axios from "axios";
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
export const objFeedCalendarDateData = atom({ // 로딩 시 현재 달의 데이터 전부 // <> 클릭하면 다시 데이터 받기
    key: 'objFeedCalendarDateData', // unique ID (with respect to other atoms/selectors)
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

// 할 일 todos data
export const objTodosData = atom({
  key: 'objTodosData',
  default: [
    {
      "id": 1,
      "orderNo": 1,      
      "contents": "첫 번째 목표",
      "privacy": "PUBLIC",
      "color": "#ff0000",
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
      "contents": "두 번째 목표",
      "privacy": "PUBLIC",
      "color": "#ff873d",
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
      "contents": "세 번째 목표",
      "privacy": "FOLLOWING",
      "color": "#0119cb",
      "todos": [
          {
              "id": 2,
              "goalId":3,
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
    },
    {
      "id": 4,
      "orderNo": 4,
      "contents": "네 번째 목표",
      "privacy": "PRIVATE",
      "color": "#77ab59",
      "todos": [
          {
              "id": 1,
              "goalId":4,
              "orderNo": 1,
              "contents": "목표4의 투두2",
              "date": "2022-05-31",
              "startRepeatDate": null,
              "endRepeatDate": null,
              "repeatDays": {
                  "THU": false,
                  "TUE": true,
                  "WED": true,
                  "SAT": true,
                  "FRI": true,
                  "MON": false,
                  "SUN": false
              },
              "isChecked": true,
              "likes": null
          },
          {
              "id": 4,
              "goalId": 4,
              "orderNo": 2,
              "contents": "목표4의 투두4",
              "date": "2022-05-11",
              "startRepeatDate": null,
              "endRepeatDate": null,
              "repeatDays": {
                  "THU": true,
                  "TUE": false,
                  "WED": true,
                  "SAT": false,
                  "FRI": false,
                  "MON": false,
                  "SUN": false
              },
              "isChecked": true,
              "likes": null
          },
          {
              "id": 5,
              "goalId": 4,
              "orderNo": 3,
              "contents": "목표4의 투두5",
              "date": "2022-09-11",
              "startRepeatDate": "2022-09-09",
              "endRepeatDate": "2022-09-29",
              "repeatDays": {
                  "THU": true,
                  "TUE": false,
                  "WED": false,
                  "SAT": true,
                  "FRI": false,
                  "MON": false,
                  "SUN": true
              },
              "isChecked": false,
              "likes": null
          }
      ]
    }
]
})

// 목표 goals data
export const objGoalsData = atom({
  key: "objGoalsData",
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

//반복 날짜 repeats days data
export const objRepeatDays = atom({
  key: "objRepeatDays",
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

/* ------------------------------------------------------------------ */


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

export const searchState = atom({
  key: "searchState",
  default: [
      {
        "id": 1,
        "userId": "test",
        "name": "test123",
        "introText": "hello",
        "emailSearchYn": "N",
        "randomYn": "Y"
      },
      {
        "id": 2,
        "userId": "test1",
        "name": "팔로우테스트1",
        "introText": "팔로우테스트1 투두입니다~~",
        "emailSearchYn": "Y",
        "randomYn": "Y"
      },
      {
        "id": 3,
        "userId": "test2",
        "name": "팔로우테스트2",
        "introText": "팔로우테스트2 투두입니다~~",
        "emailSearchYn": "Y",
        "randomYn": "Y"
      },
    ],
  });

export const selectedDataState = atom({
  key: "selectedDataSate",
  default: null,
});

// Followers 테스트 더미 
export const testFollowerData = atom({
  key: 'testFollowerData',
  default : [
    {
      "following": {
          "introText": "팔로우테스트1 투두입니다~~",
          "email": "77777@gmail.com",
          "account": "test1",
          "name": "팔로우테스트1",
          "id": 1
      },
      "id": 1
    },
    {
      "following": {
        "introText": "🥛팔로우테스트2 투두입니다~~",
        "email": "5555@gmail.com",
        "account": "test1",
        "name": "팔로우테스트2",
        "id": 2
      },
      "id": 2
    },
    {
      "following": {
         "introText": "팔로우테스트3 투두입니다~~",
          "email": "6666@gmail.com",
          "account": "test1",
          "name": "팔로우테스트3",
          "id": 3
      },
      "id": 3
    },
  ],
})

