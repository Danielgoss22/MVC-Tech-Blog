const router = require("express").Router();
const { Users, Posts } = require("../models");

//send all posts to the homepage
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
    console.log(err);
    res.status(500).json(err);
  }
});

//send a user's own posts to their dashboard
router.get("/", async (req, res) => {
  try {
    const postData = await Posts.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = postData.map((posts) => posts.get({ plain: true }));

    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
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
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/dashboard", (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  }
  if (req.session.logged_in) {
    res.render("dashboard", {
      logged_in: req.session.logged_in,
    });
  }
});

module.exports = router;
