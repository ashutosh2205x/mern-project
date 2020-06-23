const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { JWT_TOKEN } = require("../keys");
require("../models/user");
const User = mongoose.model("User");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ Error: "You must be logged in !" });
  }
  const _token = authorization.replace("Bearer ", "");
  jwt.verify(_token, JWT_TOKEN, (err, payload) => {
    if (err) {
      return res.status(401).json({ Error: "You must be logged in" });
    }

    const { _id } = payload;
    User.findById(_id).then((data) => {
      req.user = data;
      next();
    });
  });
};
