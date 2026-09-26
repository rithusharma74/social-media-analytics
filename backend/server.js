const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Keep your secret API key on the server, never in index.html.
const API_KEY = process.env.API_KEY || "";

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/api/status", (req,res) => {
  res.json({
    ok: true,
    mode: API_KEY ? "api-configured" : "demo-mode",
    message: API_KEY ? "Backend is ready for API integration." : "Running with prototype demo data."
  });
});

// Generic integration endpoint. Replace the provider request below
// once you identify the API provider and its endpoint/schema.
app.post("/api/analyze", async (req,res) => {
  if (!API_KEY) return res.json({mode:"demo", message:"No API key configured; use demo analytics."});
  res.json({mode:"api-configured", message:"API key detected. Add provider-specific request here."});
});

app.listen(PORT, () => console.log(`SocialPulse AI running at http://localhost:${PORT}`));
