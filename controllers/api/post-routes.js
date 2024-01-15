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

module.exports = router;
