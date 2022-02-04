import { atom } from "recoil";

export const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});


export const calendarData = atom({
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


export const goalsData = atom({ 
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