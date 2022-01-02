import React, { useState } from "react";
import "../stylesheets/App.css";
import { Button  } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Switch, Route, useHistory } from "react-router-dom";
import Signin from "./Signin";
import Join from "./Join";
import BasicNavBar from "./BasicNavBar";
import Goals from "./Goals";
import Main from "./Main";


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
    },
    main: {
      main: '#e4f2b4'
    },
    content: {
      main: '#23fa43'
    },
    explore: {
      main: '#2a5dc9'
    },
    feed: {
      main: '#f66a55'
    },
    calendar: {
      main: '#9f4cd6'
    },
  },
});

function App() {
  let history = useHistory();

  // 목표goals 페이지 goal 아이템
  let [goal, goalChange] = useState(
    [
          { 
            id : 0,
            title: '목표 만들기',
            done: true
          },
          {
            id: 1,
            title: '목표 만들기 2',
            done: false
          },
          {
            id: 2,
            title: '목표 만들기 3',
            done: false
          },
    
    ]
  )

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
          <Goals goal={goal} key={goal.id} />
        </Route>
        </Switch>
    </ThemeProvider>
  );
}

export default App;
