import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "@reach/router";

export function Copyright() {
  return (
    <>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
         Socio App &nbsp;
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}
