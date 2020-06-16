const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const { MONGO_URI } = require("./server/keys");
const authRoutes = require("./server/routes/auth");

app.use(express.json());

app.use(authRoutes);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo!");
});

mongoose.connection.on("error", (err) => {
  console.log("Error! : ", err);
});

app.listen(PORT, () => {
  console.log("SERVER READY");
});
