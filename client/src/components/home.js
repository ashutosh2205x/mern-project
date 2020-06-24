import React, { useEffect, useState } from "react";
import PostCard from "./card";
import NavBar from "./navbar";

const Home = () => {
  const [post, setPosts] = useState([]);
  useEffect(() => {
    fetch("all").then((data) =>
      data.json().then((data) => setPosts(data.posts))
    );
  }, []);

  if (post.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        Loading
      </div>
    );
  } else
    return (
      <>
        <NavBar />
        <div
          className="posts"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {post.map((singlepost, index) => {
            return <PostCard post={singlepost} />;
          })}
        </div>
      </>
    );
};

export default Home;
