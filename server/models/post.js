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
  url: {
    type: String,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  date_created: {
    type: Date,
  },
});

mongoose.model("Post", postSchema);
