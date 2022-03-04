import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const Data = [
  { "strUserName": "주영", "todo_id": "0", "title": "🥛우유마시기" },
  { "strUserName": "🍈미친메론", "todo_id": "1", "title": "공부하기" },
  { "strUserName": "두두", "todo_id": "5", "title": "스터디카페가기" },
  { "strUserName": "나야", "todo_id": "7", "title": "8시간 자기" }
]
console.log(Data);

export default function Search() {

    const styleInfo = {
      paddingRight:'10px',
      position:'relative',
      left:'10vh'
      };
  
     
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    
    const handleSearch = e => {
      let target = e.target;
      setFilterFn({
          fn: items => {
              if (target.value === "")
                  return items;
              else
                  return items.filter(x => x.fullname.toLowerCase().includes(target.value))
          }
      })
    }

    const items = Data.map(data=>{
      return(
      /* <div>
        <ul>
          <li style={{position:'relative',left:'10vh'}}>
            <span style={styleInfo}>
                {data.strUserName}<br/>
                {data.title}</span>
          </li>
        </ul>
      </div> */

        <ListItem style={{position:'relative'}} key={data.todo_id} component="div" disablePadding>
            <ListItemButton>
                    <ListItemText 
                    primary={data.strUserName}
                    secondary={data.title} />
                </ListItemButton>
            </ListItem>
        );

    } ) 

    
    return (
        <Box 
        sx={{ width: '100%', bgcolor: 'background.paper' }} 
        textAlign='center' 
        style={{ position:'relative'}}>
        
          {/* - 입력받는 string에 매치되는 아이디,할일,email 리스트로 불러와 보여주기
                받아와야 하는 값 
                -user nickname
                -매치된 할일 의 단어
                -참고) 설정한 색  
            - style 수정사항
                -search 검색 input 높이 조절
                -항목 선택시 default 색 변경 */}
            <TextField 
                fullWidth  
                variant="filled"
                size="small"
                id="filled-basic"
                placeholder="email ,ID 또는 할 일 검색"
                sx={{ boxShadow: 'none'}}    
                onChange={handleSearch}
                
                InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            >
            </TextField>
            {items}
                
        </Box>
    );
}  