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
    default: [ {
              "numTodoYear": 2022,          //연도
              "numTodoMonth": 2,            //월
              "numMonthTodoCount": 11,      //해당 월 투두 개수
              "arrTodoInfo": [
                {
                  "numTodoDay": 2,             //일
                  "numTodoCount": 1,            //해당 연월일 투두 개수
                  "ynComplete": "Y",            //해당 연원일 투두 전부 완료 여부
                },
              ]
          },
          {
            "numTodoYear": 2022,          //연도
            "numTodoMonth": 2,            //월
            "numMonthTodoCount": 11,      //해당 월 투두 개수
            "arrTodoInfo": [
              {
                "numTodoDay": 23,             //일
                "numTodoCount": 5,            //해당 연월일 투두 개수
                "ynComplete": "N",            //해당 연원일 투두 전부 완료 여부
              },
            ]
        } ,
        ]
  });// default value (aka initial value)

// todo 더미데이터 수정 220304

// todo api
export const objTodosDataResult = atom({
  key: 'objTodosDataResult',
  default: [
  {
  "id": 1,
  "orderNo" : 1,
  "title" : "첫 번째 목표",
  "privacy": "PUB",
  "titleColor" : "#ff0000",
  "todos" : [
        {
          "id": 1,
          "date": "2022-02-13",
          "startRepeatDate":"2022-02-13", 
          "endRepeatDate": "2022-02-13",
          "checkYn": "N",
          "orderNo": 1,
          "title": "첫 번째 목표의 첫 번째 할 일",
          "goalId": 1,
          "repeatDays": {
            "THU": "N",
            "WEN": "N",
            "TUE": "N",
            "SAT": "N",
            "FRI": "N",
            "MON": "N",
            "SUN": "N"
          },
          "likes": [
            {
              "id": 3,
              "user": {
                "email": "test2@test.com",
                "account": "test2",
                "introText": "클론짱2의 투두메이트",
                "name": "클론짱2",
                "id": 2
              }
            },
            {
              "id": 4,
              "user": {
                "email": "test3@test.com",
                "account": "test3",
                "introText": "클론짱3의 투두메이트",
                "name": "클론짱3",
                "id": 3
              }
            }
          ],
        },
        {
          "id": 2,
          "date": "2022-02-13",
          "startRepeatDate":"2022-02-13",
          "endRepeatDate": "2022-02-14",
          "checkYn": "N",
          "orderNo": 2,
          "title": "첫 번째 목표의 두 번째 할 일",
          "goalId": 1,
          "repeatDays": {
            "THU": "N",
            "WEN": "N",
            "TUE": "N",
            "SAT": "N",
            "FRI": "N",
            "MON": "N",
            "SUN": "N"
          },
          "likes": [
						{
							"id": 3,
							"user": {
								"email": "test2@test.com",
								"account": "test2",
								"introText": "클론짱2의 투두메이트",
								"name": "클론짱2",
								"id": 2
							}
						},
						{
							"id": 4,
							"user": {
								"email": "test3@test.com",
								"account": "test3",
								"introText": "클론짱3의 투두메이트",
								"name": "클론짱3",
								"id": 3
							}
						}
					],
      },
      {
        "id": 3,
        "date": "2022-02-13",
        "startRepeatDate":"2022-02-13",
        "endRepeatDate": "2022-02-17",
        "checkYn": "N",
        "orderNo": 3,
        "title": "첫 번째 목표의 세 번째 할 일",
        "goalId": 1,
        "repeatDays": {
          "THU": "N",
          "WEN": "Y",
          "TUE": "N",
          "SAT": "N",
          "FRI": "Y",
          "MON": "N",
          "SUN": "N"
        },
        "likes": [
          {
            "id": 3,
            "user": {
              "email": "test2@test.com",
              "account": "test2",
              "introText": "클론짱2의 투두메이트",
              "name": "클론짱2",
              "id": 2
            }
          },
          {
            "id": 4,
            "user": {
              "email": "test3@test.com",
              "account": "test3",
              "introText": "클론짱3의 투두메이트",
              "name": "클론짱3",
              "id": 3
            }
          }
        ],
      },
  ]},
  {
    "title" : "두 번째 목표",
    "id": 2,
    "orderNo" : 2,
    "titleColor" : "#ff873d",
    "todos" : [
          {
            "id": 1,
            "date": "2022-02-13",
            "startRepeatDate":"2022-02-13",
            "endRepeatDate": "2022-02-13",
            "checkYn": "N",
            "orderNo": 1,
            "title": "두 번째 목표의 첫 번째 할 일",
            "goalId": 2,
            "repeatDays": {
              "THU": "N",
              "WEN": "N",
              "TUE": "N",
              "SAT": "N",
              "FRI": "N",
              "MON": "N",
              "SUN": "N"
            },
            "likes": [
              {
                "id": 3,
                "user": {
                  "email": "test2@test.com",
                  "account": "test2",
                  "introText": "클론짱2의 투두메이트",
                  "name": "클론짱2",
                  "id": 2
                }
              },
              {
                "id": 4,
                "user": {
                  "email": "test3@test.com",
                  "account": "test3",
                  "introText": "클론짱3의 투두메이트",
                  "name": "클론짱3",
                  "id": 3
                }
              }
            ],
          },
          {
            "id": 2,
            "date": "2022-02-11",
            "startRepeatDate":"2022-02-11", 
            "endRepeatDate": "2022-02-15",
            "checkYn": "N",
            "orderNo": 2,
            "title": "두 번째 목표의 두 번째 할 일",
            "goalId": 2,
            "repeatDays": {
              "THU": "N",
              "WEN": "N",
              "TUE": "N",
              "SAT": "N",
              "FRI": "N",
              "MON": "N",
              "SUN": "N"
            },
            "likes": [
              {
                "id": 3,
                "user": {
                  "email": "test2@test.com",
                  "account": "test2",
                  "introText": "클론짱2의 투두메이트",
                  "name": "클론짱2",
                  "id": 2
                }
              },
              {
                "id": 4,
                "user": {
                  "email": "test3@test.com",
                  "account": "test3",
                  "introText": "클론짱3의 투두메이트",
                  "name": "클론짱3",
                  "id": 3
                }
              }
            ],
        },
    ]},
    {
      "title" : "세 번째 목표",
      "id": 3,
      "orderNo" : 3,
      "titleColor" : "#0119cb",
      "todos" : [
           {
              "id": 1,
              "date": "2022-02-16",
              "startRepeatDate":"2022-02-16", 
              "endRepeatDate": "2022-02-16",
              "checkYn": "N",
              "orderNo": 1,
              "title": "세 번째 목표의 첫 번째 할 일",
              "goalId": 3,
              "repeatDays": {
                "THU": "N",
                "WEN": "N",
                "TUE": "N",
                "SAT": "N",
                "FRI": "N",
                "MON": "N",
                "SUN": "N"
              },
              "likes": [
                {
                  "id": 3,
                  "user": {
                    "email": "test2@test.com",
                    "account": "test2",
                    "introText": "클론짱2의 투두메이트",
                    "name": "클론짱2",
                    "id": 2
                  }
                },
                {
                  "id": 4,
                  "user": {
                    "email": "test3@test.com",
                    "account": "test3",
                    "introText": "클론짱3의 투두메이트",
                    "name": "클론짱3",
                    "id": 3
                  }
                }
              ],
            },
            {
              "id": 2,
              "date": "2022-02-13",
              "startRepeatDate":"2022-02-13",
              "endRepeatDate": "2022-02-19",
              "checkYn": "N",
              "orderNo": 2,
              "title": "세 번째 목표의 두 번째 할 일",
              "goalId": 3,
              "repeatDays": {
                "THU": "N",
                "WEN": "N",
                "TUE": "N",
                "SAT": "N",
                "FRI": "N",
                "MON": "N",
                "SUN": "N"
              },
              "likes": [
                {
                  "id": 3,
                  "user": {
                    "email": "test2@test.com",
                    "account": "test2",
                    "introText": "클론짱2의 투두메이트",
                    "name": "클론짱2",
                    "id": 2
                  }
                },
                {
                  "id": 4,
                  "user": {
                    "email": "test3@test.com",
                    "account": "test3",
                    "introText": "클론짱3의 투두메이트",
                    "name": "클론짱3",
                    "id": 3
                  }
                },
                {
                  "id": 5,
                  "user": {
                    "email": "test2@test.com",
                    "account": "test2",
                    "introText": "클론짱4의 투두메이트",
                    "name": "클론짱4",
                    "id": 2
                  }
                },
              ],
          },
      ]},
      {
        "title" : "네 번째 목표",
        "id": 4,
        "orderNo" : 4,
        "titleColor" : "#77ab59",
        "todos" : [
             {
                "id": 1,
                "date": "2022-02-16",
                "startRepeatDate":"2022-02-16",
                "endRepeatDate": "2022-02-16",
                "checkYn": "N",
                "orderNo": 1,
                "title": "네 번째 목표의 첫 번째 할 일",
                "goalId": 4,
                "repeatDays": {
                  "THU": "N",
                  "WEN": "N",
                  "TUE": "N",
                  "SAT": "N",
                  "FRI": "N",
                  "MON": "N",
                  "SUN": "N"
                },
                "likes": [
                  {
                    "id": 3,
                    "user": {
                      "email": "test2@test.com",
                      "account": "test2",
                      "introText": "클론짱2의 투두메이트",
                      "name": "클론짱2",
                      "id": 2
                    }
                  },
                ],
              },
        ]},
]
})



export const goalsData = atom({ // 로딩 시 모든 목표 뿌리기
  key: "goalsData",
  default: [
    {
      "id" : 1,
      "orderNo" : 1,
      "title" : "첫 번째 목표",
      "privacy" : "PUBLIC",
      "titleColor" : "#cccccc"
    },
    {
      "id" : 2,
      "orderNo" : 2,
      "title" : "두 번째 목표",
      "privacy" : "PRIVACY",
      "titleColor" : "#cccccc"
    },
    {
      "id" : 3,
      "orderNo" : 3,
      "title" : "세 번째 목표",
      "privacy" : "FOLLOWING",
      "titleColor" : "#cccccc"
    },
    {
      "id" : 4,
      "orderNo" : 4,
      "title" : "네 번째 목표",
      "privacy" : "HIDDEN",
      "titleColor" : "#cccccc"
    }
  ]
})


export const createRepeatDay = atom({
  key: "createRepeatDay",
  default: {
  "SUN": "N", //y 면 일요일 반복, n 이면 반복 x
  "MON": "N",
  "TUE": "N",
  "WED": "N",
  "THU": "N",
  "FRI": "N",
  "SAT": "N",
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