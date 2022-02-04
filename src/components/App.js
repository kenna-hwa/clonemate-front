import React, { useRef, useState } from "react";
import { Button  } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { koKR } from '@mui/material/locale';
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
import Explore from "./Explore";
import ExploreSearch from "./ExploreSearch";

import "../stylesheets/App.css";

import { goalsData } from "../atoms/todoData";


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
  koKR,

});

function App() {
  
  /* Hook 선언 시작 */
  
  let history = useHistory();


  /* Hook 선언 끝 */


  /* 함수 선언 시작 */


  /* 함수 선언 끝 */


  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <div className="header">
              <img className="main_img" src="./images/todomate.jpg" />
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
          <Main />
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
          <Goals  />
        </Route>
        <Route exact path="/goalForm">
         <BasicNavBar/> 
         <GoalForm />  
        </Route>
        <Route exact path="/goalEditForm/:originID">
        <BasicNavBar/> 
         <GoalEditForm />  
        </Route>
        <Route exact path="/explore">
        <BasicNavBar/>
          <Explore />
        </Route>
        <Route exact path="/exploreSearch">
        <BasicNavBar/>
          <ExploreSearch />
        </Route>
        <Route exact path="/text/use" component={More}/>
        <Route exact path="/text/policy" component={MorePolicy}/>
        <Route exact path="/announcements" component={MoreAnnounce}/>
        <Route exact path="/text/use">
        <BasicNavBar/>
          <More />
        </Route>

        <Route exact path="/text/policy">
        <BasicNavBar/>
          <MorePolicy />
        </Route>
        </Switch>
    </ThemeProvider>
  );
}

export default App;
