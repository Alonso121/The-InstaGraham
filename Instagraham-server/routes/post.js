const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/RequireLogin");
const Post = mongoose.model("Post");

router.get("/allposts", requireLogin, (req, res) => {
  Post.find()
    .populate("comments.postedBy", "postId name")
    .populate("postedBy", { name: 1 })
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createpost", requireLogin, (req, res) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    return res.status(422).json({ error: "Please add all fields" });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/myposts", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((myposts) => {
      res.json({ myposts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/like", requireLogin, (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.body.postId },
    {
      $push: { likes: req.user._id },
    },
    {
      useFindAndModify: false,
      new: true,
    }
  )
    .populate("comments.postedBy", "postId name")
    .populate("postedBy", { name: 1 })
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/unlike", requireLogin, (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.body.postId },
    {
      $pull: { likes: req.user._id },
    },
    {
      useFindAndModify: false,
      new: true,
    }
  )
    .populate("comments.postedBy", "postId name")
    .populate("postedBy", { name: 1 })
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };

  Post.findOneAndUpdate(
    { _id: req.body.postId },
    {
      $push: { comments: comment },
    },
    {
      useFindAndModify: false,
      new: true,
    }
  )
    .populate("comments.postedBy", "postId name")
    .populate("postedBy", { name: 1 })
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.delete("/deletepost/:postId", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        res.status(422).json({ error: err });
      } else if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

router.put("/deletecomment/:postId/:commentId", requireLogin, (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.postId },
    {
      $pull: { comments: { commentId: req.params.commentId } },
    },
    {
      useFindAndModify: false,
      new: true,
    }
  )
    .populate("comments.postedBy", "postId name")
    .populate("postedBy", { name: 1 })
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

module.exports = router;
