const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); //TO MAKE A HASHED PASS OUT OF USER PASS
const jwt = require("jsonwebtoken"); //TO SECURE THE LOGGED IN USER FEATURES
const { JWT_TOKEN } = require("../keys");
require("../models/user");
const User = mongoose.model("User");
const loginmiddleware = require("../middlewares/loginmiddleware");

router.get("/protected", loginmiddleware, (req, res) => {
  res.send("Protected route");
});
//REGISTER ROUTE
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(422).json({
      error: " Please fill all the fields",
    });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "User already registered!" });
      }

      bcrypt.hash(password, 10).then((hasedpass) => {
        const user = new User({
          email: email,
          password: hasedpass,
          name: name,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "User succesfully saved" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//SIGN IN ROUTE
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ Error: "Email or password field is empty" });
  }
  User.findOne({ email: email }).then((saveduser) => {
    if (!saveduser) {
      return res.status(422).send({ Warning: "Invalid email or password" });
    }
    bcrypt
      .compare(password, saveduser.password)
      .then((isMatched) => {
        if (isMatched) {
          //CREATING A JWT SIGNATURE with user_id AND RANDDOM STRING AND SENDING IT TO USER
          const token = jwt.sign({ _id: saveduser._id }, JWT_TOKEN);
          res.json({
            Message: "Successfully logged in ! ",
            token: token,
            userdata: {
              name: saveduser.name,
              email: saveduser.email,
              _id: saveduser._id,
            },
          });
        } else {
          return res.status(422).send({ Warning: "Invalid password !" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
