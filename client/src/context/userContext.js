import React, { createContext } from "react";

export const UserContext = React.createContext({
  USER_STATE: {},
  SET_USER_STATE: () => {},
});
