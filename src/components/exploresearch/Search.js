import React, { useState } from 'react'

import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import '../../stylesheets/Search.css';

//  ** 할일 **
// ✔ filter 함수 : 입력받는 string에 매치되는 아이디 불러와 보여주기
// *** 검색어 입력 -> 엔터 뒤에 한번에 검색하기 로 로직 변경하기 

// 유저 리스트-> 유저 클릭 -> 유저 feed 이동 -> 팔로우 버튼 -> event: isfollowing: true 생성 또는 변경 

// 받아와야 하는 값 
// -user id 입력-> filter -> 출력 user nickname 

// < style 수정사항 >
// ✔ search 검색 input 높이 조절
// 항목 선택시 default 색 변경 

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
      <div className="search-search-list-wrap" >
            {/* textfield underline 색상 변경 */}
            <TextField 
                className="search-blank"
                fullWidth  
                hiddenLabel
                id="filled-basic"
                size="small"
                variant="filled"
                placeholder="email ,ID 검색"
                sx={{ boxShadow: 'none',
                '& .MuiFilledInput-root': {
                  backgroundColor:'#f5f5f5',
                  borderRadius: 2,
                  fontSize: 14,
                  color: '#080808',}
                }}    
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
        
                InputProps={{
                  disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" className="search-list-icon" />
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
                <React.Fragment key={data.todo_id}>
                  <div className="search-list-box" key={data.todo_id}>
                    <Button className="search-list-button" id={data.todo_id} name={data.todo_id}>
                        <div className="search-list-name" id={data.strUserName} name={data.strUserName}>
                          <p>{data.strUserName}</p>
                        </div>
                        <div className="search-list-text" id={data.title} name={data.title}>
                          <p>{data.title}</p>
                        </div>
                    </Button>
                  </div>

                </React.Fragment>
               
               );

              })}
                
    
      </div>
    
    )}