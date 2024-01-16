const sequelize = require("../config/connection");
const { Users, Posts, Comments } = require("../models");
const commentData = require("./comment-seed");
const postData = require("./post-seed");
const userData = require("./user-seed");

const seedDb = async () => {
  await sequelize.sync({ force: true });

  const users = await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const posts of postData) {
    await Posts.create({
      ...posts,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  for (const comments of commentData) {
    await Comments.create({
      ...comments,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  process.exit(0);
};
//   console.log("\n----- DATABASE SYNCED -----\n");
//   await seedComment();
//   console.log("\n----- COMMENT SEEDED -----\n");
//   await seedPost();
//   console.log("\n----- POST SEEDED -----\n");
//   await seedUser();
//   console.log("\n----- USER SEEDED -----\n");

seedDb();
