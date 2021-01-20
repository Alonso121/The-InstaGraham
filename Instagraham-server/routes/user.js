const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/RequireLogin");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get("/profile/:id", requireLogin, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user: user, posts: posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found" });
    });
});

router.put("/follow", requireLogin, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body.followId },

    {
      $push: { followers: req.user._id },
    },
    {
      useFindAndModify: false,
      fields: { _id: 1, name: 1, email: 1, followers: 1, following: 1 },
      new: true,
    },
    (err, followedUser) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: { following: req.body.followId },
        },
        {
          useFindAndModify: false,
          fields: { _id: 1, name: 1, email: 1, followers: 1, following: 1 },
          new: true,
        }
      )

        .then((loggedInUser) => {
          res.json({ followedUser, loggedInUser });
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

router.put("/unfollow", requireLogin, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body.followId },
    {
      $pull: { followers: req.user._id },
    },
    {
      useFindAndModify: false,
      fields: { _id: 1, name: 1, email: 1, followers: 1, following: 1 },
      new: true,
    },
    (err, followedUser) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { following: req.body.followId },
        },
        {
          useFindAndModify: false,
          fields: { _id: 1, name: 1, email: 1, followers: 1, following: 1 },
          new: true,
        }
      )
        .then((loggedInUser) => {
          res.json({ followedUser, loggedInUser });
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

module.exports = router;
