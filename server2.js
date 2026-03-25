import express from "express";

// const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 8081;
// app.listen(PORT, () => console.log("health server http://localhost:" + PORT + "/health"));



const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/healthcheckcat.duckdns.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/healthcheckcat.duckdns.org/fullchain.pem'),
};

https.createServer(options, app).listen(443, () => {
  console.log('HTTPS Express server running on port 443');
});