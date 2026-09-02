import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
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

// Portfolio Knowledge Base injected into System Instructions
const knowledgeBaseText = BIM_KNOWLEDGE_BASE.knowledgeItems.map((item: any) => `
Topic: ${item.title} (${item.category})
Keywords: ${item.keywords.join(", ")}
English Guidance: ${item.answerEnglish}
Bangla Guidance: ${item.answerBangla || ""}
`).join("\n");

const BIM_SYSTEM_INSTRUCTION = `You are an expert AI website assistant for https://mirjariyadh.com.bd/ belonging to Mirja Riyadh, a Senior BIM Specialist and Revit Modeler based in Bangladesh with extensive international project delivery experience.

SPECIALIST PROFILE:
- Name: ${BIM_KNOWLEDGE_BASE.profile.name}
- Title: ${BIM_KNOWLEDGE_BASE.profile.title}
- Experience: ${BIM_KNOWLEDGE_BASE.profile.experience}
- Core Tools: ${BIM_KNOWLEDGE_BASE.profile.tools.join(", ")}
- Disciplines: ${BIM_KNOWLEDGE_BASE.profile.disciplines.join(", ")}
- Standards: ${BIM_KNOWLEDGE_BASE.profile.standards.join(", ")}
- Working Hours: ${BIM_KNOWLEDGE_BASE.profile.workHours}

TRAINED TOPICS & FREQUENTLY ASKED QUESTIONS:
${knowledgeBaseText}

PORTFOLIO PROJECTS DATA SUMMARY (Actual verified projects on website):
- project-01: "High-End Healthcare 3D BIM Model" (Pharmaceutical, Architecture & MEP & AutoCAD, LOD 350, 60,000 sq.ft, cleanrooms, cable trays, HVAC) -> URL: project-details.html?id=project-01
- project-02: "MEP Coordination Project" (Residential, MEP & Architecture & Coordination, LOD 350, 4,200 sq.ft, plumbing & HVAC clash resolution) -> URL: project-details.html?id=project-02
- project-03: "Point Cloud to BIM: School Building" (Educational, Point Cloud & Architecture & Revit, LOD 300, Scan-to-BIM conversion) -> URL: project-details.html?id=project-03
- project-04: "Permit Set: Residential & Commercial" (Commercial/Residential, Architecture & MEP & AutoCAD, LOD 300, complete permit drawing set) -> URL: project-details.html?id=project-04
- project-05: "Complex Heritage Scan-to-BIM" (Point Cloud to BIM, Architecture, LOD 350, point cloud laser scan to 3D Revit) -> URL: project-details.html?id=project-05
- project-06: "Commercial Office Tower MEP BIM" (Commercial, MEP & Coordination, LOD 350, complex duct & piping routing) -> URL: project-details.html?id=project-06
- project-07: "Industrial Warehouse Revit Structural & Architectural" (Industrial, Architecture & AutoCAD, LOD 300) -> URL: project-details.html?id=project-07
- project-08: "Parametric Mechanical & Electrical Families" (Revit Family Creation, MEP, Parametric components) -> URL: project-details.html?id=project-08
- project-09: "Architectural Drawing Set & Construction Docs" (Residential/Commercial, Architecture & AutoCAD, LOD 300) -> URL: project-details.html?id=project-09
- project-20: "Architectural Renovation Project" (Residential, Architecture, LOD 300, existing building retrofit) -> URL: project-details.html?id=project-20
- project-21: "Architectural Model with Detail Roof Structure" (Residential, Architecture, LOD 350, complex framing & roof timber) -> URL: project-details.html?id=project-21
- project-26: "Ventilation Coordinate BIM Project" (Commercial/Industrial, MEP & Coordination, LOD 350, HVAC ductwork coordination) -> URL: project-details.html?id=project-26
- project-27: "Architectural Renovation Project From Point Cloud" (Point Cloud to BIM, Architecture, LOD 300) -> URL: project-details.html?id=project-27
- project-28: "Construction Permit Set & CD Drawings" (Commercial, Architecture & AutoCAD, LOD 300) -> URL: project-details.html?id=project-28
- project-29: "Point Cloud to Revit Model: Historic Facade" (Point Cloud to BIM, Architecture, LOD 350) -> URL: project-details.html?id=project-29
- project-30: "Architectural Renovation & Expansion BIM" (Residential, Architecture, LOD 300) -> URL: project-details.html?id=project-30

COMMUNICATION RULES & PERSONALITY:
- Tone: Professional, friendly, concise, helpful, confident, international-client friendly.
- Language: If visitor writes in Bangla, answer in Bangla. If English, answer in English. If mixed, reply naturally in the same style.
- Conversational Pleasantries: When the visitor asks casual questions like "How are you?", "What's up?", or greets you ("Good morning", "Hi", "Hello"), respond warmly and courteously first (e.g. "I'm doing well, thank you! How can I assist you today with your BIM, Revit, or Scan-to-BIM project?") before asking how you can help with their project.
- Brevity: Keep responses crisp and scannable (2 to 4 short paragraphs or bullet points). Use workflow arrows when explaining processes (e.g. Point Cloud → Revit Modeling → Quality Review → Documentation).
- Never Invent: Do NOT make up fake clients, fixed pricing, fake deadlines, or unverified claims. If data is unknown, politely direct them to submit project details for a custom assessment.
- Pricing Inquiry Rule: Explain that BIM pricing depends on square footage/scope, LOD required, source file condition (CAD/PDF/Point Cloud), and timeline, then invite them to request a formal quote.
- Project Qualification: When a visitor wants to start a project or inquiry, ask 2 to 3 friendly qualifying questions (e.g., building type, available source files like CAD/PDF/Laser Scan, required disciplines, and timeline).
- Call-to-Action (CTA): Suggest relevant actions like "[Request a Quote]", "[View Projects]", "[Explore Point Cloud]", "[Explore MEP]", or direct links to project detail pages (project-details.html?id=...).
`;

// Fallback rule-based response generator using centralized knowledge base
function generateSmartFallbackResponse(userMessage: string): { reply: string; suggestions: string[] } {
  return BIM_KNOWLEDGE_BASE.matchQuery(userMessage);
}

// POST /api/chat
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Invalid or empty messages array" });
    }

    const latestUserMsg = messages[messages.length - 1]?.content || "";
    const ai = getGenAI();

    // If Gemini API is available, call the gemini-3.7-flash model
    if (ai) {
      try {
        // Filter out initial welcome if it's the very first message or clean empty content
        const validMsgs = messages.filter((m: { role: string; content?: string }) => m && m.content && m.content.trim().length > 0);

        // Ensure alternating roles and valid content format for Gemini API
        // In Gemini API, multi-turn history must start with a 'user' turn
        const formattedContents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];
        
        let previousRole: string | null = null;
        for (const m of validMsgs) {
          const role = m.role === "assistant" || m.role === "model" ? "model" : "user";
          
          // If first message is model (like initial welcome greeting), prepend a context primer or skip
          if (formattedContents.length === 0 && role === "model") {
            // Prepend a user greeting to maintain strict user-first turn structure
            formattedContents.push({
              role: "user",
              parts: [{ text: "Hello! Tell me about Mirja Riyadh's BIM services." }],
            });
          }

          // If consecutive same role, combine parts
          if (role === previousRole && formattedContents.length > 0) {
            formattedContents[formattedContents.length - 1].parts.push({ text: m.content });
          } else {
            formattedContents.push({
              role,
              parts: [{ text: m.content }],
            });
            previousRole = role;
          }
        }

        // Make sure the last turn is from the user
        if (formattedContents.length === 0 || formattedContents[formattedContents.length - 1].role !== "user") {
          formattedContents.push({
            role: "user",
            parts: [{ text: latestUserMsg || "Hello" }],
          });
        }

        let response;
        try {
          // Attempt 1: gemini-3.7-flash with LOW thinking level for fastest response
          response = await ai.models.generateContent({
            model: "gemini-3.7-flash",
            contents: formattedContents,
            config: {
              systemInstruction: BIM_SYSTEM_INSTRUCTION,
              temperature: 0.6,
              thinkingConfig: {
                thinkingLevel: ThinkingLevel.LOW,
              },
            },
          });
        } catch (primaryModelErr: any) {
          console.warn("Primary model gemini-3.7-flash unavailable/busy, falling back to gemini-3.6-flash:", primaryModelErr?.message || primaryModelErr);
          // Attempt 2: gemini-3.6-flash fallback for high-demand spikes (503 / 429)
          response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: formattedContents,
            config: {
              systemInstruction: BIM_SYSTEM_INSTRUCTION,
              temperature: 0.6,
            },
          });
        }

        const replyText = response.text || "I am ready to assist with your BIM, Revit, and point cloud modeling requirements.";

        // Generate contextual quick action chips based on content & language
        const suggestions: string[] = [];
        const lowerReply = replyText.toLowerCase();
        const lowerUser = latestUserMsg.toLowerCase();

        if (lowerReply.includes("point cloud") || lowerUser.includes("scan") || lowerUser.includes("point cloud") || lowerUser.includes("স্ক্যান")) {
          suggestions.push("View Point Cloud Projects", "Scan-to-BIM Workflow");
        } else if (lowerReply.includes("mep") || lowerUser.includes("mep") || lowerUser.includes("hvac") || lowerUser.includes("clash") || lowerUser.includes("পাইপিং")) {
          suggestions.push("View MEP Projects", "Clash Detection");
        } else if (lowerReply.includes("architecture") || lowerUser.includes("architecture") || lowerUser.includes("cad") || lowerUser.includes("নকশা") || lowerUser.includes("মডেল")) {
          suggestions.push("View Architecture Projects", "CAD to BIM Conversion");
        } else if (lowerUser.includes("price") || lowerUser.includes("cost") || lowerUser.includes("খরচ") || lowerUser.includes("টাকা")) {
          suggestions.push("Request a Quote", "Prepare Requirements");
        } else {
          suggestions.push("Explore Services", "View Projects");
        }

        if (!suggestions.includes("Request a Quote")) {
          suggestions.push("Request a Quote");
        }

        return res.json({
          reply: replyText,
          suggestions: suggestions.slice(0, 4),
        });
      } catch (geminiError) {
        console.error("Gemini API Error, utilizing smart fallback:", geminiError);
        const fallback = generateSmartFallbackResponse(latestUserMsg);
        return res.json(fallback);
      }
    } else {
      // Fallback when GEMINI_API_KEY is not configured or in local mode
      const fallback = generateSmartFallbackResponse(latestUserMsg);
      return res.json(fallback);
    }
  } catch (error) {
    console.error("Server /api/chat error:", error);
    const fallback = generateSmartFallbackResponse(req.body?.messages?.[req.body.messages.length - 1]?.content || "");
    res.json(fallback);
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
