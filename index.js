import express from "express";
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const kuroshiro = new Kuroshiro.default();
const analyzer = new KuromojiAnalyzer({
  dictPath: path.join(__dirname, "../node_modules/kuromoji/dict"),
});
const ready = kuroshiro.init(analyzer);

app.post("/hiragana", async (req, res) => {
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
