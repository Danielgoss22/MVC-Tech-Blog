const sequelize = require("../config/connection");
const seedComment = require("./comment-seed");
const seedPost = require("./post-seed");
const seedUser = require("./user-seed");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  await seedComment();
  console.log("\n----- COMMENT SEEDED -----\n");
  await seedPost();
  console.log("\n----- POST SEEDED -----\n");
  await seedUser();
  console.log("\n----- USER SEEDED -----\n");

  process.exit(0);
};
seedAll();
