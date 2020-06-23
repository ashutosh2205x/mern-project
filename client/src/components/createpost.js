import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import NavBar from "./navbar";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "70vh",
    margin: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  media: {
    height: 140,
  },
});

export default function CreateCard() {
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <div
        className="create-card"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card className={classes.root}>
          <CardActionArea style={{ width: "-webkit-fill-available", paddingBottom: 20 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <TextField
                  id="standard-secondary"
                  label="Title"
                  color="secondary"
                  style={{ width: "-webkit-fill-available", paddingBottom: 20 }}
                />
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <TextField
                  id="outlined-multiline-static"
                  label="Write a story"
                  multiline
                  rows={6}
                  defaultValue="Default Value"
                  variant="outlined"
                  style={{ width: "-webkit-fill-available" }}
                />
              </Typography>
            </CardContent>
          </CardActionArea>
          <Button variant="contained" component="label">
            Upload File
            <input type="file" style={{ display: "none" }} />
          </Button>
          <CardActions>
            <Button size="small" color="primary">
              Share post
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
}
