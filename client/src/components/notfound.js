import React from "react";
import NavBar from "./navbar";

const NotFound = () => {
  return (
    <>
      <NavBar />
      <div
        className="home"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        Page not found
      </div>
    </>
  );
};

export default NotFound;
