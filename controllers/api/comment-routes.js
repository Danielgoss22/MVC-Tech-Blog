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

router.put("/:id", withAuth, async (req, res) => {
  try {
    const updateComment = await Comments.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateComment[0]) {
      res.status(404).json({ message: "comment not found" });
    }
    res.status(200).json(updateComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deleteComment = await Comments.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteComment) {
      res.status(404).json({ message: "comment not found" });
    }

    res.status(200).json(deleteComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
