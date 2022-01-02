import React from "react";
import { Checkbox, InputBase, ListItem, ListItemText } from "@mui/material";

export default function Goals(props) {
  console.log(props.goal);
  let goalItems = props.goal;
  return (
    <>
      {goalItems.map((item, idx) => {
        return (
          <ListItem className="goals-wrap">
            <Checkbox checked={item.done} />
            <ListItemText>
              <InputBase
                inputProps={{ "aria-label": "naked" }}
                type="text"
                id={item.id}
                name={item.id}
                value={item.title}
                multiline={true}
                fullWidth={true}
              />
            </ListItemText>
          </ListItem>
        );
      })}
    </>
  );
}
