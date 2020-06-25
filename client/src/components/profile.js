import React, { useEffect, useState } from "react";
import CreateCard from "./createpost";
import PostCard from "./card";

const Profile = () => {
  const [userId, setuserId] = useState("");
  const [post, setPosts] = useState([]);
  useEffect(() => {
    setuserId(JSON.parse(localStorage.getItem("user_token")));
    if (userId)
      fetch("myposts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      }).then((data) => data.json().then((data) => setPosts(data.posts)));
  }, [userId]);
  return (
    <>
      <CreateCard />
      {post.length === 0 ? <Template /> : <MyPosts post={post} />}
    </>
  );
};

export default Profile;

const Template = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      You haven't posted in a while
    </div>
  );
};

const MyPosts = (post) => {
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
      {post.post.map((singlepost, index) => {
        return (
          <PostCard
            post={singlepost}
            key={index}
          />
        );
      })}
    </div>
  );
};
