import React from 'react';
import Box from '@mui/material/Box';
import { Tabs, Tab } from '@mui/material';
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';
import Search from "./Search";
import Follower from "./Follower";
import Following from "./Following";

import '../../stylesheets/Search.css';

export default function ExploreSearch() {

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ "&.MuiBox-root": { paddingTop: "8px"} , p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
    
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      };
      
    function a11yProps(index) {
        return {
          id: `vertical-tab-${index}`,
          'aria-controls': `vertical-tabpanel-${index}`,
        };
      }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    return (
        //BasicNavBar 위치 조정
        
        <Box 
        sx={{ width: '100%', bgcolor: 'background.paper'}}  
        position="static">
           
            {/* Tabs fontweight 변경, 팔로워 length 추가 */}
            <Tabs 
            sx= {{borderBottom: "1px solid #CCCDCD", '& .MuiTab-root': { borderBottomColor: 'red' } }}
            variant="fullWidth" TabIndicatorProps={{ style: { background: "#080808"} }} value={value} onChange={handleChange}>
                <Tab sx={{paddingRight:"2px", "&.Mui-selected": { color: "black", fontWeight: 800} }} label="검색" {...a11yProps(0)} />
                <Tab sx={{ "&.Mui-selected": { color: "black", fontWeight: 800} }} label="팔로워" {...a11yProps(1)} />
                <Tab sx={{ "&.Mui-selected": { color: "black", fontWeight: 800} }} label="팔로잉" {...a11yProps(2)} />
            </Tabs>
           
           {/* 각각 TabPanel에 users 정보 불러오기 */}
            <TabPanel value={value} index={0}>
                <Search/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Follower/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Following/>
            </TabPanel>
        </Box>
        
    );
}