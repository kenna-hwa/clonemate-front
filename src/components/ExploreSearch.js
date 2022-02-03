import React from 'react';
import Box from '@mui/material/Box';
import { TextField, Tabs, Tab } from '@mui/material';

export default function ExploreSearch() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        //BasicNavBar 위치 조정
        <Box sx={{ width: '95%', bgcolor: 'background.paper' }} textAlign='center' style={{ margin : 16, padding: 16, position:'relative'}}>
            <Tabs variant="fullWidth" value={value} onChange={handleChange}>
            {/* 각각의 Tab -> search, follower, following data  */}
            <Tab label="검색" />
            <Tab label="팔로워" />
            <Tab label="팔로잉" />
            </Tabs>
            <TextField fullWidth  variant="standard" label="email ,ID 또는 할 일 검색" sx={{ boxShadow: 'none'}} /> 
        </Box>
    );
}