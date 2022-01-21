import React, { useRef, useState } from "react";
import "../stylesheets/App.css";
import { Button  } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Switch, Route, useHistory } from "react-router-dom";
import Signin from "./Signin";
import Join from "./Join";
import BasicNavBar from "./BasicNavBar";
import Goals from "./Goals";
import Main from "./Main";
import GoalForm from "./GoalForm";
import GoalEditForm from "./GoalEditForm";
import More from "./More";
import MorePolicy from "./MorePolicy";
import MoreAnnounce from "./MoreAnnounce";

const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
  typography: {
    Link: {
      color: '#222',
    },
    bolder: {
      fontWeight: 600,
    },
    button: {

    },
  },
  palette: {
    btn: {
      main: "#f2f2f2",
      contrastText: "#111",
    },
    basicnav: {
      main: "#fefefe",
      contrastText: "#111",
    },
    mainnav: {
      main: '#FAFAFA'
    }
  },
});

function App() {
  
  /* Hook 선언 시작 */
  
  let history = useHistory();
  let [readOnly, readOnlyChange] = useState('read');
  

 

  /* Dummy State 시작 */

  // 목표goals 페이지 goal 아이템
  let [goal, goalChange] = useState(
     { 
       items: [{
          title: '첫번째',
          id: 'ID-0',
        },
        {           
          title: '두번째',
          id: 'ID-1',

      }]
    }
  );

  /* Dummy State 끝 */

  /* Hook 선언 끝 */


  /* 함수 선언 시작 */


  //목표 추가 함수
  function addGoal(item){

    const thisItems = goal.items; // goal State 원본 카피
    item.id = 'ID-' + thisItems.length; //key를 위한 id 추가
    thisItems.push(item) // 카피한 goal 리스트에 아이템 추가
    goalChange({items: thisItems}); //goalChange를 이용해 state 변경
    document.querySelector("#goalform_textfield").value = '';
    console.log('add items :', goal.items)
  }

  //목표 GoalForm으로 보내기 함수
  function editToGoalForm(id){
    const thisItems = goal.items; // goal State 원본 카피
    const currentEditItems = thisItems.filter(e => e.id === id)
    TextFieldControl(currentEditItems);
  }

  //TextField id, value 변경 함수

  function TextFieldControl(currentEditItems) {
    const TextField = document.querySelector("#goaleditform_textfield");
    TextField.value = currentEditItems[0].title;
    TextField.id = currentEditItems[0].id;
  }

  //목표 수정 함수
  function editGoal(e){

    const thisItems = goal.items; // goal State 원본 카피
    
    let idx  = thisItems.findIndex((item)=>{ return item.id === e.id })//findIndex 사용
    thisItems[idx].title = e.title;
    goalChange( {items : thisItems } ); //goalChange를 이용해 state 변경
    document.querySelector(`#ID-${idx}`).value = '';
    console.log('edit items :', goal.items)
  }

  //목표 삭제 함수
  function deleteGoal(targetId, item){

    const thisItems = item; // goal State 원본 카피
    console.log('Before Update Items :', item );
    const newItems = thisItems.filter(e => e.id !== targetId)
    goalChange({items: newItems})
  }

  /* 함수 선언 끝 */


  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <div className="header">
              <img className="main_img" src="images/todomate.jpg" />
              <h1>todo mate</h1>
              <h3>할 일을 작성, 계획, 관리하세요.</h3>
            </div>
            <div className="start_btn">
              <Button 
                className="join_btn" 
                color="btn"
                variant="contained" 
                sx={{ boxShadow: 'none'}}
                onClick={() => {
                  history.push("/join");
                }}
              >
                가입하기
              </Button>
              <Button
                className="signin_btn"
                color="btn"
                variant="contained"
                sx={{ boxShadow: 'none'}}
                onClick={() => {
                  history.push("/signin");
                }}
              >
                로그인
              </Button>
            </div>
          </div>
        </Route>
        <Route exact path="/main">
          <Main/>
        </Route>
        <Route exact path="/join">
        <BasicNavBar/>
          <Join />
        </Route>
        <Route exact path="/signin">
        <BasicNavBar/>
          <Signin />
        </Route>
        <Route exact path="/goals">
        <BasicNavBar/>
        {
          readOnly === 'read' ? <GoalForm addGoal={addGoal} /> : <GoalEditForm editGoal={editGoal} />
        }
          <Goals goal={goal.items} addGoal={addGoal} deleteGoal={deleteGoal} editToGoalForm={editToGoalForm} readOnly={readOnly} readOnlyChange={readOnlyChange}  />
        </Route>
        <Route exact path="/text/use">
        <BasicNavBar/>
          <More />
        </Route>
        <Route exact path="/text/policy">
        <BasicNavBar/>
          <MorePolicy />
        </Route>
        <Route exact path="/announcements">
        <BasicNavBar/>
          <MoreAnnounce />
        </Route>
        </Switch>
    </ThemeProvider>
  );
}

export default App;
