const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const { MONGO_URI } = require("./keys");
const routes = require("./routes/auth");
const posts = require("./routes/post");

require("./models/user");
require("./models/post");

app.use(express.json()); //middleware that only parses JSON
app.use(routes);
app.use(posts);

mongoose.connect(MONGO_URI, {
  //CONNECTING TO CLOUD MONGO DB ON ATLAS.
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  //CHECKING CONNECTION
  console.log("connected to mongo!");
});

mongoose.connection.on("error", (err) => {
  console.log("Error! : ", err);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log("SERVER READY");
});
