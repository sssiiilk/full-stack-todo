import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const { Pool } = pg;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const pool = new Pool({
  host: process.env.PGHOST ?? "localhost",
  port: process.env.PGPORT ?? 5434,
  user: process.env.PGUSER ?? "postgres",
  password: process.env.PGPASSWORD ?? "",
  database: process.env.PGDATABASE ?? "postgres",
});

pool
  .query("CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, text TEXT NOT NULL)")
  .catch((error) => {
    console.error("Ошибка создания таблицы:", error.message);
  });

app.use(express.json());

app.get("/api/todos", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM todos ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "DB error" });
  }
});

app.post("/api/todos", async (req, res) => {
  const text = (req.body?.text ?? "").trim();
  if (!text) return res.status(400).json({ error: "Text is required" });
  try {
    const { rows } = await pool.query(
      "INSERT INTO todos (text) VALUES ($1) RETURNING *",
      [text],
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "DB error" });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM todos WHERE id = $1", [req.params.id]);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "DB error" });
  }
});

app.use(express.static(__dirname));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("http://localhost:" + PORT));
