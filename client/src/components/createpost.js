import React, { useState } from "react";
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
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file_name, setFileName] = useState("Upload File here");
  const [file, uploadFile] = useState("");
  const [url, setURL] = useState("");

  const classes = useStyles();

  function createPost() {
    console.log(title, text, file);

    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "socio-app");
      data.append("cloud_name", "ashutosh2205");
      fetch(`https://api.cloudinary.com/v1_1/ashtuosh2205/upload`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((api_data) => {
          console.log(api_data);
          setURL(api_data.url);
        })
        .catch((Err) => {
          console.log(Err);
        });
    }
  }

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
          <CardActionArea
            style={{ width: "-webkit-fill-available", paddingBottom: 20 }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <TextField
                  id="standard-secondary"
                  label="Title"
                  color="secondary"
                  style={{ width: "-webkit-fill-available", paddingBottom: 20 }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  style={{ width: "-webkit-fill-available" }}
                />
              </Typography>
            </CardContent>
          </CardActionArea>
          <Button variant="contained" component="label">
            {file_name.toLowerCase()}
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                uploadFile(e.target.files[0]);
                setFileName(e.target.files[0].name);
              }}
            />
          </Button>
          <CardActions>
            <Button size="small" color="primary" onClick={createPost}>
              Share post
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
}
