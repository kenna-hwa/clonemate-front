import React from 'react';
import Box from '@mui/material/Box';
import { Tabs, Tab } from '@mui/material';
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';
import Search from "./Search";
import Follower from "./Follower";
import Following from "./Following";

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
              <Box sx={{ p: 3 }}>
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
        sx={{ width: '95%', bgcolor: 'background.paper' }} 
        textAlign='center' 
        style={{ margin : 16, padding: 16, position:'relative'}}>
           
            {/* Tabs style 변경 */}
            <Tabs variant="fullWidth" value={value} onChange={handleChange} >
                <Tab  label="검색" {...a11yProps(0)} />
                <Tab  label="팔로워" {...a11yProps(1)} />
                <Tab  label="팔로잉" {...a11yProps(2)} />
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