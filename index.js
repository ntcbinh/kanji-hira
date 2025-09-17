import express from "express";
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

const app = express();
app.use(express.json());

const kuroshiro = new Kuroshiro();
await kuroshiro.init(new KuromojiAnalyzer());

// POST /hiragana  { "text": "漢字" }
app.post("/hiragana", async (req, res) => {
  try {
    const { text, mode = "hiragana" } = req.body;
    if (!text) return res.status(400).json({ error: "Missing text" });

    const result = await kuroshiro.convert(text, { to: mode });
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));
