const router = require("express").Router();
const { Users, Posts, Comments } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const allUsers = await Users.findAll();

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const oneUser = await Users.findByPk({
      where: {
        id: req.params.id,
      },
      include: {
        model: Posts,
        model: Comments,
      },
    });
    res.status(200).json(oneUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await Users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteUser = await Users.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
