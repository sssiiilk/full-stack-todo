import express from "express";

const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log("health server http://localhost:" + PORT + "/health"));
