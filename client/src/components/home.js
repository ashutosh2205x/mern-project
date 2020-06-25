import React, { useEffect, useState } from "react";
import PostCard from "./card";
import NavBar from "./navbar";

const Home = () => {
  function deletePost(id) {
    console.log(id);
    // if (window.confirm("Confirm?")) {
    //   console.log(id);
    //   fetch("/delete/:id", {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       _id: id,
    //     }),
    //   }).then((res) => {
    //     res.json().then((data) => {
    //       console.log(data);
    //       ()=>Dodelete(true);
    //     });
    //   });
    // } else console.log("Not deleted");
  }

  const [post, setPosts] = useState([]);
  useEffect(() => {
    fetch("all").then((data) =>
      data.json().then((data) => setPosts(data.posts))
    );
  }, []);

  if (post.length === 0) {
    return (
      <>
        <NavBar />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          No posts available
        </div>
      </>
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
            return (
              <PostCard
                post={singlepost}
                deletepost={deletePost(singlepost._id)}
                key={index}
              />
            );
          })}
        </div>
      </>
    );
};

export default Home;
