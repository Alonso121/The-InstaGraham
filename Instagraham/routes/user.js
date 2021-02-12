const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/RequireLogin");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get("/profile/:id", requireLogin, (req, res) => {
  User.findOne({ _id: req.params.id }, {})
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        //.populate("postedBy", "_id name")
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
      fields: { password: 0 },
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
          fields: { password: 0 },
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
      fields: { password: 0 },
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
          fields: { password: 0 },
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

router.put("/changepic", (req, res) => {
  console.log(req.body.id, req.body.profilepic);
  User.findOneAndUpdate(
    { _id: req.body.id },

    {
      $set: { profilepic: req.body.profilepic },
    },
    {
      useFindAndModify: false,
      fields: { password: 0 },
      new: true,
    }
  )
    .then((loggedInUser) => {
      res.json({ loggedInUser });
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/delete-account/:userid", requireLogin, (req, res) => {
  console.log(req.params.userid);
  Post.deleteMany({
    postedBy: req.params.userid,
  }).catch((err) => {
    return res.status(422).json({ error: err });
  });
  Post.updateMany(
    {},
    {
      $pull: {
        comments: { postedBy: req.params.userid },
        likes: req.params.userid,
      },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "postId name")
    .populate("postedBy", { name: 1, profilepic: 1 })
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.updateMany(
        {},
        {
          $pull: {
            followers: req.params.userid,
            following: req.params.userid,
          },
        },
        {
          new: true,
        }
      )
        .populate("comments.postedBy", "postId name")
        .populate("postedBy", { name: 1, profilepic: 1 })
        .exec((err, result) => {
          if (err) {
            return res.status(422).json({ error: err });
          } else {
            res.json(result);
          }
        });
    });
  User.deleteOne({
    _id: req.params.userid,
  }).catch((err) => {
    return res.status(422).json({ error: err });
  });
});

module.exports = router;
