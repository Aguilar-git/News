const express = require("express");
const app = express();
const db = require("./controllers/controller");
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const port = 1337;

app.post("/news/create", async (req, res) => {
  try {
    const result = await db.CreateNews(req.body);

    res.json(result);
  } catch (error) {
    res.status(400);
  }
});

app.get("/news", async (req, res) => {
  try {
    const result = await db.GetAllNews();

    res.json(result);
  } catch (error) {
    res.status(400);
  }
});

app.get("/news/:title", async (req, res) => {
  try {
    const result = await db.GetNewsByTitle(req.params.title);
    if (!result) {
      res.status(204).send();
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(400);
  }
});

app.delete("/news/:title", async (req, res) => {
  try {
    const result = await db.DeleteNews(req.params.title);
    res.json(result);
  } catch (error) {
    res.status(400);
  }
});

app.put("/news/edit", async (req, res) => {
  try {
    console.log(req.body);
    const result = await db.UpdateNews(req.body);
    res.json(result);
  } catch (error) {
    res.status(400);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
