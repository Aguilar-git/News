const { sequelize, Sequelize } = require("./db.config");

const News = sequelize.define("News", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

const Tag = sequelize.define("Tags", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  tagName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const NewsTag = sequelize.define("NewsTags", {});

News.belongsToMany(Tag, { through: NewsTag });
Tag.belongsToMany(News, { through: NewsTag });

sequelize
  .sync()
  .then(() => {
    console.log("Tables have been created");
  })
  .catch((err) => console.log(err));

module.exports = {
  News,
  Tag,
  NewsTag,
};
