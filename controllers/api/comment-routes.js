const router = require("express").Router();
const { Users, Posts, Comments } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const newComment = await Comments.create({
      user_id: userId,
      post_id: req.body.post_id,
      comment_body: req.body.comment_body,
    });

    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
