import { atom } from "recoil";

export const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});


export const calendarData = atom({ // 로딩 시 현재 달의 데이터 전부 // <> 클릭하면 다시 데이터 받기
    key: 'calendarData', // unique ID (with respect to other atoms/selectors)
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


export const goalsData = atom({ // 로딩 시 모든 목표 뿌리기
  key: "goalsData",
  default: [
    {
      "goal_id": 0,
      "next_goal_id": 1,
      "title": "첫 번째 목표",
      "privacy": "PUB",
      "box_color": "",
      "title_color": "#3CB371"
    },
    {
      "goal_id": 1,
      "next_goal_id": 2,
      "title": "두 번째 목표",
      "privacy": "PRI",
      "box_color": "",
      "title_color": "#C71585"
    }
  ]
})

export const goalReadOnly = atom({
  key: "goalReadOnly",
  default: "read"
})

export const todoData = atom({ // 로딩 시 오늘 값 받아오기 // 캘린더에서 날짜 클릭하면 해당 날짜로 값 받아오기 // 더미 데이터는 2022-02-05
  key: "todoData",
  default: [
    {
    "todo_id": 0,
    "goal_id": 0, //묶여있는 goal id
    "next_todo_id": 1, //다음 todo id (순서지정용)
    "title": "첫 번째 목표의 할 일 0",
    "date": "2022-02-05",
    "end_repeat_date": "2022-02-05", //반복 종료 일자. 반복 없으면 date 와 값이 같거나 없음
    "repeat_days": {
        "sun": "N", //y 면 일요일 반복, n 이면 반복 x
        "mon": "N",
        "tue": "N",
        "wed": "N",
        "thu": "N",
        "fri": "N",
        "sat": "N",
    },
    "check_yn" : "N" //달성여부
  },
  {
    "todo_id": 1,
    "goal_id": 0, //묶여있는 goal id
    "next_todo_id": 2, //다음 todo id (순서지정용)
    "title": "첫 번째 목표의 할 일 1",
    "date": "2022-02-05",
    "end_repeat_date": "2022-02-05", //반복 종료 일자. 반복 없으면 date 와 값이 같거나 없음
    "repeat_days": {
        "sun": "N", //y 면 일요일 반복, n 이면 반복 x
        "mon": "N",
        "tue": "N",
        "wed": "N",
        "thu": "N",
        "fri": "N",
        "sat": "N",
    },
    "check_yn" : "N" //달성여부
  },
  {
    "todo_id": 0,
    "goal_id": 1, //묶여있는 goal id
    "next_todo_id": 1, //다음 todo id (순서지정용)
    "title": "두 번째 목표의 할 일 1",
    "date": "2022-02-05",
    "end_repeat_date": "2022-02-05", //반복 종료 일자. 반복 없으면 date 와 값이 같거나 없음
    "repeat_days": {
        "sun": "N", //y 면 일요일 반복, n 이면 반복 x
        "mon": "N",
        "tue": "N",
        "wed": "N",
        "thu": "N",
        "fri": "N",
        "sat": "N",
    },
    "check_yn" : "N" //달성여부
  }
]
})

export const todoReadOnly = atom({
  key: "todoReadOnly",
  default: true
})