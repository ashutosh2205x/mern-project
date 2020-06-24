const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const loginmiddleware = require("../middlewares/loginmiddleware");
require("../models/post");
const Post = mongoose.model("Post");

//TO CREATE POST
router.post("/create", loginmiddleware, (req, res) => {
  const { title, body, url } = req.body;

  if (!title || !body) {
    return res.status(422).json({ Error: "Please fill all the fields" });
  }
  const newpost = new Post({
    title,
    body,
    url,
    postedBy: req.user,
  });

  newpost
    .save()
    .then((response) => {
      res.json({ post: response, message: "Post successfully created !" });
    })
    .catch((Err) => {
      console.log(Err);
    });
});

//GET ALL POST
router.get("/all", (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then((allposts) => {
      res.json({ posts: allposts });
    })
    .catch((err) => {
      console.log(err);
    });
});

//GET MY POSTS
router.get("/myposts", loginmiddleware,(req, res) => {
    console.log()
  Post.find({ postedBy: req.user._id })
    .populate("PostedBy", "_id name")
    .then((mypost) => {
      res.json({ posts: mypost });
    }).catch(Err=>{
        console.log(Err)
    });
});
module.exports = router;
