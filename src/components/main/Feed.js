import React from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { getTodoData } from "../../atoms/todoData";
import FeedTodoGoal from "../main/FeedTodoGoal";

export default function Feed() {
  /* hook 선언 시작 */

  let history = useHistory();

  /* hook 선언 종료 */

  /* state 선언 시작 */

  const [userTodoData, setUserTodoData] = useRecoilState(getTodoData);
  console.log('userTodoData: ', userTodoData);
 
  /* state 선언 종료 */

  /* 함수 선언 시작 */

  /* 함수 선언 끝 */

  return (
  <section id="Feed">
        <FeedTodoGoal />
    </section>
  );
}
