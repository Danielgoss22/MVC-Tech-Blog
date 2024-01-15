const router = require("express").Router();
const { Users, Posts, Comments } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const newPost = await Posts.create({
      user_id: userId,
      post_title: req.body.post_title,
      post_body: req.body.post_body,
    });

    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatePost = await Posts.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatePost) {
      res.status(404).json({ message: "No post found!" });
      return;
    }
    res.status(200).json(updatePost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
