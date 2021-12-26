import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function MainNavBar() {
  //하위
  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  //list 표시 나중에 별도로 빼야할듯!
  const SNB = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 228 }} //가로 길이
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box sx={{padding: "10px"}}>
        <h3>Me</h3>
        <p>todo mate</p>
        <button>가입하기</button>
      </Box>
      <List>
        <ListItem>
          <ListItemIcon></ListItemIcon>
          <ListItemText />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Box>
            <AppBar
              position="static"
              color="mainnav"
              sx={{
                boxShadow: "none",
                flexDirection: "row-reverse",
                height: "90px",
                borderTop: "1px solid #CCCDCD",
                boxSizing: "border-box",
              }}
            >
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="back"
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer(anchor, true)}
                >
                  <DehazeIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </Box>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {SNB(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}
