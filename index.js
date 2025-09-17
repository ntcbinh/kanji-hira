import express from "express";
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

const app = express();
app.use(express.json());

const kuroshiro = new Kuroshiro();
let ready = kuroshiro.init(new KuromojiAnalyzer());

app.post("/hiragana", async (req, res) => {
  try {
    await ready;
    const { text, mode } = req.body;
    const result = await kuroshiro.convert(text, { to: mode || "hiragana" });
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
