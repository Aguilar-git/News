const Sequelize = require("sequelize");

const sequelize = new Sequelize("URLShotener", "root", "root", {
  dialect: "sqlite",
  storage: "db/database.sqlite3",
  define: { timestamps: false },
});

module.exports = {
  sequelize,
  Sequelize,
};
