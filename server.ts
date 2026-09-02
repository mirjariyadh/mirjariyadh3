import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
const BIM_SYSTEM_INSTRUCTION = `You are an expert AI website assistant for https://mirjariyadh.com.bd/ belonging to Mirja Riyadh, a Senior BIM Specialist and Revit Modeler based in Bangladesh with extensive international project delivery experience.

CORE SERVICES:
1. Architectural BIM Modeling (Revit 3D models, existing condition modeling, architectural drawing sheets, design development, LOD 200-350)
2. MEP BIM Modeling (HVAC ducting & equipment, mechanical systems, plumbing & drainage piping, electrical cable trays & lighting, LOD 300-400)
3. MEP Coordination & Clash Detection (Navisworks Manage clash reports, zero-clash hard/soft clash resolution, constructability reviews)
4. Point Cloud to BIM / Scan-to-BIM (Point cloud registration data e57/rcp/rcs to high-precision Revit architectural & MEP models, LOD 200-350)
5. AutoCAD / PDF to BIM (Conversion of legacy 2D CAD DWG and scanned PDF blueprints into parametric 3D Revit models)
6. Revit Family Creation (Custom parametric BIM components, MEP fixtures, mechanical equipment, schedule-driven families)
7. BIM Documentation & Deliverables (Permit sets, construction drawing sets, schedules, material quantities BOQ, IFC / openBIM deliverables, Navisworks NWD/NWC)

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
- Brevity: Keep responses crisp and scannable (2 to 4 short paragraphs or bullet points). Use workflow arrows when explaining processes (e.g. Point Cloud → Revit Modeling → Quality Review → Documentation).
- Never Invent: Do NOT make up fake clients, fixed pricing, fake deadlines, or unverified claims. If data is unknown, politely direct them to submit project details for a custom assessment.
- Pricing Inquiry Rule: Explain that BIM pricing depends on square footage/scope, LOD required, source file condition (CAD/PDF/Point Cloud), and timeline, then invite them to request a formal quote.
- Project Qualification: When a visitor wants to start a project or inquiry, ask 2 to 3 friendly qualifying questions (e.g., building type, available source files like CAD/PDF/Laser Scan, required disciplines, and timeline).
- Call-to-Action (CTA): Suggest relevant actions like "[Request a Quote]", "[View Projects]", "[Explore Point Cloud]", "[Explore MEP]", or direct links to project detail pages (project-details.html?id=...).
`;

// Fallback rule-based response generator when offline or no API key
function generateSmartFallbackResponse(userMessage: string): { reply: string; suggestions: string[] } {
  const query = (userMessage || "").toLowerCase().trim();

  // 1. Point Cloud / Scan-to-BIM
  if (query.includes("point cloud") || query.includes("scan to bim") || query.includes("laser scan") || query.includes("scan") || query.includes("পয়েন্ট ক্লাউড") || query.includes("স্ক্যান")) {
    return {
      reply: `Point Cloud to BIM (Scan-to-BIM) converts 3D laser scanner data (.e57, .rcp, .rcs) into high-accuracy, parametric Autodesk Revit models (LOD 200–350).\n\nTypical Scan-to-BIM Workflow:\nPoint Cloud Registration → Revit BIM Modeling → As-Built Deviation Check → Documentation & Sheets\n\nYou can explore verified Scan-to-BIM case studies on the portfolio. Would you like to review project samples or prepare your scan files for an estimate?`,
      suggestions: ["View Point Cloud Projects", "Scan-to-BIM Workflow", "Request a Quote", "Explore Services"]
    };
  }

  // 2. MEP BIM / Coordination / Clash Detection
  if (query.includes("mep") || query.includes("hvac") || query.includes("plumbing") || query.includes("electrical") || query.includes("clash") || query.includes("duct") || query.includes("পাইপিং") || query.includes("ইলেকট্রিক্যাল") || query.includes("ক্ল্যাশ")) {
    return {
      reply: `Mirja Riyadh provides comprehensive MEP BIM Modeling & 3D Coordination across HVAC ducting, piping/plumbing, electrical cable trays, and equipment layouts (LOD 300–400).\n\nKey Capabilities:\n• Multi-trade clash detection in Navisworks Manage\n• Constructability resolution & spool drawings\n• Builder's work opening coordination with Architecture\n\nWould you like to see our MEP coordination projects?`,
      suggestions: ["View MEP Projects", "Clash Detection Process", "Request a Quote", "All Projects"]
    };
  }

  // 3. Pricing / Cost / Rates
  if (query.includes("cost") || query.includes("price") || query.includes("pricing") || query.includes("rate") || query.includes("fee") || query.includes("charge") || query.includes("কত টাকা") || query.includes("খরচ") || query.includes("রেট") || query.includes("প্রাইস")) {
    return {
      reply: `Project pricing depends on building type, total area (sq.ft / m²), required Level of Development (LOD 200–350+), source drawing quality (CAD/PDF/Point Cloud), and target timeline.\n\nTo get a fast and accurate quote, you can share your project scope or submit an inquiry through our quote form.`,
      suggestions: ["Request a Quote", "Prepare Requirements", "View Projects", "About Mirja Riyadh"]
    };
  }

  // 4. Architecture / 2D to 3D / Revit Modeling
  if (query.includes("architecture") || query.includes("architectural") || query.includes("revit") || query.includes("cad to revit") || query.includes("2d to 3d") || query.includes("autocad") || query.includes("dwg") || query.includes("নকশা") || query.includes("মডেলিং") || query.includes("আর্কিটেকচার")) {
    return {
      reply: `Architectural BIM services include transforming 2D CAD DWG or PDF drawings into detailed 3D Revit models, parametric family creation, construction documentation, and schedule extraction.\n\nKey Disciplines:\n• 2D CAD/PDF to Revit 3D Conversion\n• Exterior & Interior Parametric Modeling\n• Construction & Permit Drawing Sets\n\nWould you like to explore Architectural case studies?`,
      suggestions: ["View Architecture Projects", "CAD to BIM Details", "Request a Quote", "Explore Services"]
    };
  }

  // 5. Contact / Hire / Quote / Order
  if (query.includes("quote") || query.includes("hire") || query.includes("contact") || query.includes("inquiry") || query.includes("order") || query.includes("proposal") || query.includes("যোগাযোগ") || query.includes("হায়ার") || query.includes("কোটেশন") || query.includes("কাজ দিতে চাই")) {
    return {
      reply: `You can directly submit your project scope for a detailed proposal and turnaround estimate.\n\nKey details to prepare:\n1. Building type & approximate area\n2. Available inputs (CAD, PDF, or Point Cloud)\n3. Required disciplines (Architecture, MEP, or both)\n4. Target deadline & LOD\n\nClick below to open the project quote form.`,
      suggestions: ["Request a Quote", "View Portfolio Projects", "About Mirja Riyadh"]
    };
  }

  // 6. About Mirja Riyadh / Experience / Skills
  if (query.includes("who are you") || query.includes("about") || query.includes("mirja") || query.includes("riyadh") || query.includes("experience") || query.includes("কে") || query.includes("অভিজ্ঞতা") || query.includes("পরিচয়")) {
    return {
      reply: `Mirja Riyadh is a professional Senior BIM Specialist and Revit Modeler with extensive hands-on experience in international Architectural, MEP, and Scan-to-BIM project delivery.\n\nSpecialized in Revit, Navisworks, AutoCAD, and Recap Pro delivering LOD 200–400 BIM models.\n\nWould you like to check out verified portfolio projects or get in touch?`,
      suggestions: ["View Projects", "Explore Services", "Request a Quote"]
    };
  }

  // 7. Greeting / Hi / Hello
  if (query === "hi" || query === "hello" || query === "hey" || query.includes("হাই") || query.includes("হ্যালো") || query.includes("কেমন আছেন") || query.includes("salam") || query.includes("সালাম")) {
    return {
      reply: `Hello! I'm Mirja Riyadh's BIM Assistant. I can help you explore BIM services, find relevant portfolio projects (Architecture, MEP, Point Cloud), explain modeling workflows, or prepare a project estimate.\n\nWhat type of project are you planning?`,
      suggestions: ["Explore Services", "View Projects", "Point Cloud to BIM", "Request a Quote"]
    };
  }

  // 8. Default dynamic response
  return {
    reply: `I can assist you with Mirja Riyadh's BIM services, including:\n\n• **Scan-to-BIM**: Converting point clouds (.e57/rcp) to Revit models (LOD 200–350)\n• **MEP BIM & Coordination**: HVAC, plumbing, electrical & clash detection\n• **Architectural BIM**: 2D CAD/PDF to Revit 3D, CD sets, BOQ extraction\n• **Custom Revit Families**: Parametric BIM components\n\nFeel free to ask a specific question or select a topic below!`,
    suggestions: ["Explore Services", "View Projects", "Point Cloud to BIM", "MEP BIM & Coordination", "Request a Quote"]
  };
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

        const response = await ai.models.generateContent({
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
