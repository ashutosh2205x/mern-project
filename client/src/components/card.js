import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "95vh",
    minWidth: "80vh",
    minHeight: "55vh",
    margin: "20px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PostCard(props) {
  let { body, postedBy, title, url, _id, date_created } = props.post;
  // console.log(props.post)
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [isDeleted, Dodelete] = React.useState(false);

  function deletePost(id) {
    if (window.confirm("Confirm?")) {
      console.log(id);
      fetch("/delete/:id", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      }).then((res) => {
        res.json().then((data) => {
          console.log(data);
          return () => Dodelete((isDeleted) => true);
        });
      });
    } else console.log("Not deleted");
  }
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
        }
        title={title}
        subheader={postedBy.name ? postedBy.name : `By You` + date_created}
      />
      {url && url.toString().includes(".mp4") ? (
        <CardMedia component="iframe" title="video" src={url} />
      ) : (
        <CardMedia className={classes.media} image={url} />
      )}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {window.location.pathname === "/profile" ? (
          <IconButton aria-label="delete" onClick={() => deletePost(_id)}>
            <DeleteOutlinedIcon />
          </IconButton>
        ) : (
          ""
        )}
      </CardActions>
    </Card>
  );
}
