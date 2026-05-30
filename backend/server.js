// ============================================================
// server.js — Marshy Investments Express backend
// ============================================================
require("dotenv").config();

const express = require("express");
const cors    = require("cors");
const path    = require("path");
const chatRoutes = require("./routes/chat");

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Serve the frontend static files ────────────────────────
// Adjust the path if your folder structure differs
app.use(express.static(path.join(__dirname, "../frontend")));

// ── API routes ──────────────────────────────────────────────
app.use("/api/chat", chatRoutes);

// ── Catch-all: return the frontend for any unmatched route ──
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Marshy Investments server running → http://localhost:${PORT}`);
});
