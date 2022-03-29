import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { mainNav } from "./navigation";
import { makeStyles } from "@mui/styles";

const drawerWidth = 200;
const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
  },
  drawerLink: {
    textDecoration: "none",
    lineHeight: "50px",
    fontFamily: " 'Poppins', sans-serif;font-family: 'Montserrat', sans-serif",
  },
  active: {
    color: "red",
  },
});
const DrawerContainer = ({ open, onClose }) => {
  const classes = useStyles();
  return (
    <Box>
      <Drawer
        open={open}
        onClose={onClose}
        classes={{ paper: classes.drawer }}
        className={classes.drawerLink}
      >
        <List>
          {mainNav?.map((nav, index) => (
            <ListItem key={index}>
              <ListItemIcon>{nav.icons}</ListItemIcon>
              <ListItemText primary={nav.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default DrawerContainer;
