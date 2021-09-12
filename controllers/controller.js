const { News, Tag, NewsTag } = require("../db/models");

// news: {
//     title: "",
//     description: "",
//     date: "",
//     tags: ["", ""]
// }
async function CreateNews(news) {
  const newsId = await News.findOne({ where: { title: news.title } }).then(
    (foundNews) => {
      if (foundNews) return foundNews.id;
      return News.create({
        title: news.title,
        description: news.description,
        date: news.date,
      })
        .then((newNews) => {
          news.tags.forEach((item) => {
            Tag.findOne({ where: { tagName: item } }).then((tag) => {
              if (tag) {
                newNews.addTag(tag.dataValues.id);
              } else {
                newNews.createTag({ tagName: item });
              }
            });
          });
          return newNews;
        })
        .then((res) => res.id);
    }
  );
  return newsId;
}

function GetAllNews() {
  const result = News.findAll({ include: Tag }).then((news) => {
    return news.map((item) => {
      return {
        id: item.dataValues.id,
        title: item.dataValues.title,
        description: item.dataValues.description,
        date: item.dataValues.date,
        tags: item.dataValues.Tags.map((item) => item.tagName),
      };
    });
  });

  return result;
}

function GetNewsByTitle(title) {
  const result = News.findOne({ where: { title: title }, include: Tag }).then(
    (news) => {
      return {
        id: news.dataValues.id,
        title: news.dataValues.title,
        description: news.dataValues.description,
        date: news.dataValues.date,
        tags: news.dataValues.Tags.map((item) => item.tagName),
      };
    }
  );

  return result;
}

function DeleteNews(title) {
  const result = News.destroy({ where: { title: title } });
  return result;
}

async function UpdateNews(news) {
  const result = News.update(
    {
      title: news.title,
      description: news.description,
      date: news.date,
    },
    { where: { id: news.id } }
  );

  return result;
}

module.exports = {
  CreateNews,
  GetAllNews,
  GetNewsByTitle,
  DeleteNews,
  UpdateNews,
};
