const express = require("express");
const fetch = require("node-fetch");
const app = express();

const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImIzZTVkYzIwLWIwYmMtNDc0YS1hYmI5LTkyOTk4YmYzZTIxYiIsImlhdCI6MTc3Mzk5NDQyNSwic3ViIjoiZGV2ZWxvcGVyL2ZhYTg5ODY3LTMzNGYtNzU5MC0wMTkwLTUwNTY0NTgzNTMzMCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMDQuMjMuMjM3LjY1IiwiMTA0LjIzLjIwMi45MCIsIjE3Mi42NC4yMDUuOTkiLCIxOTguNDEuMjMwLjEwMCIsIjE3Mi42NC4xNDkuMTciXSwidHlwZSI6ImNsaWVudCJ9XX0.66as8tz8OP8jv6ObnTDco8nWakGrApXpz2sKejli4AAZXoyeK6HCq_nYQRYEbQ2LzrlIQ1eQR5kwcJnxPKE-2Q";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/proxy", async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).json({ error: "Falta url" });
  try {
    const response = await fetch(target, {
      headers: { "Authorization": "Bearer " + API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy corriendo en puerto " + PORT));
