const router = require("express").Router();
const { Users, Posts } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((posts) => posts.get({ plain: true }));

    res.render("home", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: Users,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.get({ plain: true });

    res.render("post", {
      ...posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/post");
    return;
  }

  res.render("login");
});
