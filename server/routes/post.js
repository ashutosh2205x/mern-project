const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const loginmiddleware = require("../middlewares/loginmiddleware");
require("../models/post");
const Post = mongoose.model("Post");

//TO CREATE POST
router.post("/create", loginmiddleware, (req, res) => {
  const { title, body, url, date_created } = req.body;
  if (!title || !body) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  const newpost = new Post({
    title,
    body,
    url: url,
    date_created: new Date().toLocaleString(),
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
router.get("/myposts", loginmiddleware, (req, res) => {
  console.log(req.body);
  Post.find({ postedBy: req.user._id })
    .populate("PostedBy", "_id name")
    .then((mypost) => {
      res.json({ posts: mypost, body: req.body });
    })
    .catch((Err) => {
      console.log(Err);
    });
});

//DELETE MY POST
router.delete("/delete/:post_id", (req, res) => {
  Post.deleteOne({ _id: req.body._id })
    .then(
      res.send({ message: `post deleted ${req.body._id}` }),
      res.render("home.js")
    )
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
