import express from "express";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", async (req, res) => {
  const sl = req.query.sl;
  const tl = req.query.tl;
  const text = req.query.text;

  const response = await fetch(
    `https://${process.env.DEEPL_BASE_URL}/v2/translate?source_lang=${sl}&target_lang=${tl}&text=${text}`,
    {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      },
    }
  );
  const json = await response.json();

  res.json({
    translation: json,
  });
});

app.listen(8000, () => {
  console.log("started");
});
