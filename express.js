const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.post("/api/cities", async (req, res) => {
  const query = req.body.query;

  const key = req.body.key;
  const lang = req.body.lang;

  try {
    const response = await axios.get(
      "http://api.vk.com/method/database.getCities",
      {
        params: {
          access_token: key,
          v: "5.199",
          q: query,
          lang: lang,
          count: req.body.count,
          offset: req.body.offset,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Ошибка при обращении к VK API:", error);
    res.status(500).json({ error: "Произошла ошибка при выполнении запроса" });
  }
});

app.listen(port, () => {
  console.log(`Прокси-сервер запущен на http://localhost:${port}`);
});
