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
  const { query, key, lang } = req.body;

  try {
    const response = await fetch(
      `https://api.vk.com/method/database.getCities?access_token=${key}&v=5.199&q=${query}&lang=${lang}`
    );
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.json({
      error: {
        error_code: 777,
        error_msg: "Fetch error on proxy",
      },
    });
  }
});

app.listen(port, () => {
  console.log(`Прокси-сервер запущен на http://localhost:${port}`);
});
