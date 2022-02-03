import { atom } from "recoil";

export const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});


export const calendarData = atom({
    key: 'calendarData', // unique ID (with respect to other atoms/selectors)
    default:  [ 
      { numTodoDay: 8, numCountTodo: 2, completeYn: 'n' }, 
      { numTodoDay: 13, numCountTodo: 4, completeYn: 'n', }, 
      { numTodoDay: 29, numCountTodo: 6, completeYn: 'y' } ] // default value (aka initial value)
  });


export const goalsData = atom({ 
  key: "goalsData",
  default: [
    {
      "goal_id": 0,
      "next_goal_id": 1,
      "title": "첫 번째 목표",
      "privacy": "PUBLIC",
      "bg_color": "",
      "title_color": "#3CB371"
    },
    {
      "goal_id": 1,
      "next_goal_id": 2,
      "title": "두 번째 목표",
      "privacy": "PRIVATE",
      "bg_color": "",
      "title_color": "#C71585"
    }
  ]
})

export const goalReadOnly = atom({
  key: "goalReadOnly",
  default: "read"
})