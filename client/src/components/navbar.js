import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles, fade } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Link, navigate } from "@reach/router";
import { InputBase } from "@material-ui/core";
import { UserContext } from "../context/userContext";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PublicIcon from "@material-ui/icons/Public";
import CreateIcon from "@material-ui/icons/Create";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  showname: {
    position: "absolute",
    right: 0,
    fontWeight: 600,
    color: "white",
    padding: 20,
  },
}));

export default function NavBar() {
  const [state, setState] = useState({
    left: false,
  });
  const classes = useStyles();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const deAuthorize = () => {
    localStorage.clear();
    alert("You have succesfully logged out!");
    navigate("signin");
  };

  return (
    <>
      <UserContext.Consumer>
        {(data) => {
          return (
            <div className={classes.root}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                  >
                    <MenuIcon onClick={toggleDrawer("left", true)} />
                  </IconButton>
                  <Drawer
                    anchor={"left"}
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}
                  >
                    {Object.keys(data).length === 0 ? (
                      <List>
                        {["SignIn", "Signup"].map((text, index) => (
                          <ListItem button key={text}>
                            <ListItemIcon>
                              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <Link to={`/${text.toLowerCase()}`}>
                              <ListItemText primary={text} />
                            </Link>
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <>
                        <List>
                          <ListItem button>
                            <ListItemIcon>
                              <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary={`Hello ${data.name} !`} />
                          </ListItem>

                          <ListItem button>
                            <ListItemIcon>
                              <PublicIcon />
                            </ListItemIcon>
                            <Link to={"/"}>
                              <ListItemText primary={"Home"} />
                            </Link>
                          </ListItem>

                          <ListItem button>
                            <ListItemIcon>
                              <HomeIcon />
                            </ListItemIcon>
                            <Link to={"/profile"}>
                              <ListItemText primary={"My profile"} />
                            </Link>
                          </ListItem>

                          <ListItem button>
                            <ListItemIcon>
                              <CreateIcon />
                            </ListItemIcon>
                            <Link to={"/create"}>
                              <ListItemText primary={"Create a post"} />
                            </Link>
                          </ListItem>
                        </List>
                        <Divider />
                        <ListItem button>
                          <ListItemIcon>
                            <ExitToAppIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={"Logout"}
                            onClick={deAuthorize}
                            style={{ color: "red" }}
                          />
                        </ListItem>
                      </>
                    )}
                  </Drawer>
                  
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.showname}
                  >
                    {data.name}
                  </Typography>
                </Toolbar>
              </AppBar>
            </div>
          );
        }}
      </UserContext.Consumer>
    </>
  );
}
