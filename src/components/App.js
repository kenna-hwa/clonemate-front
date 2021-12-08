import '../stylesheets/App.css';
import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    btn:{
      main: '#f2f2f2',
      contrastText: '#111',
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>

    <div className="App">
      <div className="header">
        <img className="main_img" src="images/todomate.jpg" />
        <h1>todo mate</h1>
        <h3>할 일을 작성, 계획, 관리하세요.</h3>
      </div>

      <div className="start_btn">
        <Button className="join_btn" variant="contained" color="btn" >가입하기</Button>
        <Button className="signin_btn" color="btn" variant="contained" >로그인</Button>
      </div>

    </div>
    </ThemeProvider>

  );
}

export default App;
