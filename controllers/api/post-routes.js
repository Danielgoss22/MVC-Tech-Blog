const router = require("express").Router();
const { Users, Posts, Comments } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Posts.create(req.body);

    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
