import React, { useEffect, useState } from "react";
import PostCard from "./card";
import NavBar from "./navbar";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
}));

const Home = () => {
  const [post, setPosts] = useState([]);
  useEffect(() => {
    fetch("all").then((data) =>
      data.json().then((data) => {
        setPosts(data.posts);
      })
    );
  }, []);

  return (
    <>
      <NavBar />
      {post.length === 0 ? (
        <Template />
      ) : (
        <Allposts posts={post} key={post._id} />
      )}
    </>
  );
};

export default Home;

const Template = () => {
  return (
    <div
      className="home"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      No posts
    </div>
  );
};

const Allposts = (posts) => {
  const [filteredSearch, FillSearch] = useState("");
  let filteredPosts = posts.posts.filter((post) => {
    return (
      post.title.toLowerCase().indexOf(filteredSearch.toLowerCase()) !== -1
    );
  });

  console.log("search", filteredPosts);
  const classes = useStyles();

  return (
    <div
      className="posts"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => FillSearch(e.target.value)}
        />
      </div>
      {filteredPosts.map((singlepost, index) => {
        return <PostCard post={singlepost} key={index} />;
      })}
    </div>
  );
};
