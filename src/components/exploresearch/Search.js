import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

//  ** 할일 **
// ✔ filter 함수 : 입력받는 string에 매치되는 아이디 불러와 보여주기
// 유저 리스트-> 유저 클릭 -> 유저 feed 이동 -> 팔로우 버튼 -> event: isfollowing: true 생성 또는 변경 

// 받아와야 하는 값 
// -user id 입력-> filter -> 출력 user nickname 

// < style 수정사항 >
// -search 검색 input 높이 조절
// -항목 선택시 default 색 변경 


const Data = [
  { "strUserName": "주영", "todo_id": "0", "title": "🥛우유마시기" },
  { "strUserName": "🍈메로나", "todo_id": "1", "title": "공부하기" },
  { "strUserName": "두두", "todo_id": "5", "title": "스터디카페가기" },
  { "strUserName": "나야", "todo_id": "7", "title": "8시간 자기" }
]
//console.log(Data);

export default function Search() {

    const [searchTerm, setSearchTerm] = useState("");
  
    return (
        <Box 
        sx={{ width: '100%', bgcolor: 'background.paper' }} 
        textAlign='center' 
        style={{ position:'relative'}}>
        
            <TextField 
                fullWidth  
                variant="filled"
                size="small"
                id="filled-basic"
                placeholder="email ,ID 검색"
                sx={{ boxShadow: 'none'}}    
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
                
                InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            >
            </TextField>
            

            {Data.filter((data)=> {
              if (searchTerm === "") {
                return data
              } else if (data.strUserName.toLowerCase().includes(searchTerm.toLowerCase())) {
                return data
              } else if (data.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return data
              }
            }).map(data=>{
              return(
                <ListItem style={{position:'relative'}} key={data.todo_id} component="div" disablePadding>
                  <ListItemButton>
                    <ListItemText 
                      primary={data.strUserName}
                      secondary={data.title} />
                   </ListItemButton>
                </ListItem>
               );

              })}
                
        </Box>
    
    )}