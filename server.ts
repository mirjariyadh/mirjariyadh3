import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const BIM_KNOWLEDGE_BASE = require("./js/chatbot-knowledge.js");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Lazy GoogleGenAI client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Direct local knowledge base handler (instant response from js/chatbot-knowledge.js, no online processing)
app.post("/api/chat", (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    const latestUserMsg = (messages && Array.isArray(messages) && messages.length > 0)
      ? (messages[messages.length - 1]?.content || "")
      : "";

    // Instantly matches knowledge items from js/chatbot-knowledge.js
    const result = BIM_KNOWLEDGE_BASE.matchQuery(latestUserMsg);
    return res.json(result);
  } catch (error) {
    console.error("Server /api/chat error:", error);
    return res.json(BIM_KNOWLEDGE_BASE.defaultResponse);
  }
});

// API health endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BIM Portfolio & Gemini Assistant Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
