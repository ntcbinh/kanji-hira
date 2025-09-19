import express from "express";
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const kuroshiro = new Kuroshiro.default();
const analyzer = new KuromojiAnalyzer({
  dictPath: join(__dirname, "./kuromoji_dict"),
});
const ready = kuroshiro.init(analyzer);

app.post("/", async (req, res) => {
  try {
    await ready;
    const { text, mode } = req.body;
    const result = await kuroshiro.convert(text, {
      to: mode || "hiragana",
    });
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
