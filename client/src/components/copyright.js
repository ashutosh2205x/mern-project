import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "@reach/router";

export function Copyright() {
  return (
    <>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link to="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}
