import React from "react";
import PostCard from "./card";
import NavBar from "./navbar";

const Home = () => {
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
        <PostCard />
        <PostCard />

        <PostCard />

        <PostCard />
      </div>
    </>
  );
};

export default Home;
