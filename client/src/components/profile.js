import React, { useEffect, useState } from "react";
import CreateCard from "./createpost";

const Profile = () => {
  const [userId, setuserId] = useState("");

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user_data"));
    console.log(userId);
    setuserId(user._id);
    if (userId !== "") {
       fetch("myposts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      }).then((data) =>  data.json().then((data) => console.log(data)));
    }
  }, [userId]);
  return (
    <>
      <CreateCard />
    </>
  );
};

export default Profile;
