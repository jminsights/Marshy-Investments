// ============================================================
// routes/chat.js — /api/chat  (POST)
// Proxies the chat conversation to Anthropic.
// The API key never leaves the server.
// ============================================================
const express = require("express");
const router  = express.Router();

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL             = "claude-sonnet-4-20250514";
const MAX_TOKENS        = 800;

const SYSTEM_PROMPT = `You are Spoke, a friendly assistant for Marshy Investments — a bicycle shop at Shop 62, Chinhoyi Street, Harare (Cnr Chinhoyi & Abercorn St), opposite Usman Fabric.

SHOP INFO:
- WhatsApp: 0771687216
- Hours: Monday–Saturday, 8am–5pm
- Payments: USD cash, EcoCash, Zipit
- Address: Shop 62 Chinhoyi St, Cnr Abercorn, Harare. Opposite Usman Fabric.

KIDS BIKES: Tricycle $25, 12" $45–$50 (age 2–5), 16" $50–$65 (age 4–8), 20" $60–$85 (age 6–11), 20" TJX $90 (age 6–13), 20" BMX $90.
ADULT/MTB: 26" MTB entry $80, 26" MTB+carrier $85–$90, 26" MTB Shimano $100, 26" MTB Shimano premium $130, Buffalo type $120.
FOLDING: 26" Folding Shimano $120, 26" Folding double shock $130, 26" Folding Meg $160.
PARTS: Tyres $3–$15, Inner tubes $2–$3, Pumps $2–$5, Brake set $5, Disc brake $6, Gear levers $6, Cassette $4, Derailleurs $2–$4, Cranksets $5–$10, Wheel rim $13, MTB fork 26" $12 / 29" $18, Headset $5, Saddle $4, Mudguards $2–$5, Cable lock $2, Phone holder $10, Speaker light $7, Training wheels $5.

Be warm, helpful, concise. Always end by inviting them to visit or WhatsApp 0771687216. Never invent prices.`;

router.post("/", async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY is not set in .env");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type":         "application/json",
        "x-api-key":            apiKey,
        "anthropic-version":    "2023-06-01",
      },
      body: JSON.stringify({
        model:      MODEL,
        max_tokens: MAX_TOKENS,
        system:     SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      return res.status(502).json({ error: "Upstream API error" });
    }

    const data  = await response.json();
    const reply = data.content?.map(b => b.text || "").join("") ||
                  "Sorry, I couldn't generate a response. Please WhatsApp us on 0771687216.";

    return res.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
