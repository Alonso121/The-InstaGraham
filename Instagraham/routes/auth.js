const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWTSecret } = require("../config");

router.post("/signup", (req, res) => {
  const { name, email, password, profilepic } = req.body;
  if (!name || !email || !password || !profilepic) {
    return res.status(422).json({ error: "Please provide all fields!" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "There is already a user with that email!" });
    }
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          email,
          password: hashedPassword,
          name,
          profilepic,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "Missing email or password" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid email or password" });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            const {
              _id,
              name,
              email,
              followers,
              following,
              profilepic,
            } = savedUser;
            const token = jwt.sign({ _id: savedUser._id }, JWTSecret);
            res.json({
              token,
              _id,
              name,
              email,
              followers,
              following,
              profilepic,
            });
          } else {
            return res.status(422).json({ error: "Invalid email or password" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
