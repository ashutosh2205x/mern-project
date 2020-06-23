const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: "No Post",
  },
  photo: {
    type: String,
    default: "No Post",
  },
  video: {
    type: String,
    default: "No Post",
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});

mongoose.model("Post", postSchema);
