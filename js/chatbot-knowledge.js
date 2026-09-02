/**
 * BIM Chatbot Centralized Knowledge Base & FAQ Rules
 * 
 * Compatible with BOTH Node.js/TypeScript backend and browser <script> tag!
 */

(function (global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else {
    global.BIM_KNOWLEDGE_BASE = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var SPECIALIST_PROFILE = {
    name: "Mirja Riyadh",
    title: "Senior BIM Specialist & Revit Modeler",
    experience: "7+ years international project experience",
    tools: ["Autodesk Revit (2020-2026)", "Navisworks Manage", "AutoCAD", "Recap Pro", "Dynamo"],
    disciplines: [
      "Scan-to-BIM (Point Cloud to Revit)",
      "MEP BIM Modeling & 3D Coordination",
      "Architectural 2D-to-3D BIM",
      "Custom Revit Families (LOD 200–400)"
    ],
    standards: [
      "LOD 200–400 (BIMForum standards)",
      "ISO 19650 compliant layer & naming standards"
    ],
    workHours: "Monday – Saturday (Flexible international timezone coverage for USA, UK, EU, UAE, Australia)",
    responseRate: "Under 1 hour during business hours"
  };

  var CHATBOT_KNOWLEDGE_ITEMS = [
    {
      id: "greetings_how_are_you",
      category: "Smalltalk",
      keywords: [
        "how are you", "how r u", "how do you do", "whats up", "what's up",
        "how is it going", "how are u", "কেমন আছেন", "কেমন আছো", "কি খবর", "কি অবস্থা", "ভালো আছেন"
      ],
      title: "Pleasantries & How are you",
      answerBangla: "আলহামদুলিল্লাহ, আমি ভালো আছি! আমি মির্জা রিয়াদের BIM অ্যাসিস্ট্যান্ট।\n\nআজ আপনাকে কীভাবে সাহায্য করতে পারি? আর্কিটেকচারাল নকশা, MEP কোঅর্ডিনেশন বা পয়েন্ট ক্লাউড (Scan-to-BIM) প্রজেক্ট সংক্রান্ত যেকোনো প্রশ্ন করতে পারেন।",
      answerEnglish: "I'm doing well, thank you for asking! I'm here and ready to help you explore Mirja Riyadh's BIM, Revit modeling, and Scan-to-BIM portfolio.\n\nHow can I assist you with your project today?",
      suggestions: ["Explore Services", "View Projects", "Point Cloud to BIM", "Request a Quote"]
    },
    {
      id: "greetings_welcome",
      category: "Smalltalk",
      keywords: [
        "hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening",
        "হাই", "হ্যালো", "salam", "সালাম", "নমস্কার", "শুভ সকাল"
      ],
      title: "General Greeting",
      answerBangla: "হ্যালো! মির্জা রিয়াদের BIM অ্যাসিস্ট্যান্ট-এ আপনাকে স্বাগতম। আমি আপনাকে BIM সার্ভিস, পোর্টফোলিও প্রজেক্ট ও মডেলিং ওয়ার্কফ্লো সংক্রান্ত তথ্য দিয়ে সাহায্য করতে পারি।\n\nআপনি কোন ধরনের প্রজেক্ট পরিকল্পনা করছেন?",
      answerEnglish: "Hello! Welcome to Mirja Riyadh's BIM portfolio assistant. I can help you explore verified BIM projects, learn about Scan-to-BIM and MEP workflows, or prepare a project estimate.\n\nWhat type of project are you planning?",
      suggestions: ["Explore Services", "View Projects", "Point Cloud to BIM", "Request a Quote"]
    },
    {
      id: "gratitude",
      category: "Smalltalk",
      keywords: ["thank", "thx", "thanks", "ধন্যবাদ", "থ্যাঙ্কস", "থ্যাংকস", "shukriya"],
      title: "Thank You Response",
      answerBangla: "আপনাকে অসংখ্য ধন্যবাদ! আপনার প্রজেক্ট বা মডেলিং রিকোয়ারমেন্টস নিয়ে আরও কোনো প্রশ্ন থাকলে নির্দ্বিধায় জিজ্ঞাসা করুন।",
      answerEnglish: "You're very welcome! If you have any other questions about Revit modeling, LOD requirements, or want to discuss a new project, feel free to ask anytime.",
      suggestions: ["View Projects", "Request a Quote", "Explore Services"]
    },
    {
      id: "point_cloud_scan_to_bim",
      category: "Services",
      keywords: ["point cloud", "scan to bim", "laser scan", "scan", "pointcloud", "rcp", "e57", "পয়েন্ট ক্লাউড", "স্ক্যান"],
      title: "Scan-to-BIM (Point Cloud to Revit)",
      answerBangla: "পয়েন্ট ক্লাউড টু বিআইএম (Scan-to-BIM) সার্ভিসে ৩ডি লেজার স্ক্যান ফাইল (.e57, .rcp, .rcs) থেকে উচ্চমানের প্যারামেট্রিক অটোডেস্ক রেভিট মডেল (LOD 200–350) তৈরি করা হয়।\n\nওয়ার্কফ্লো:\nPoint Cloud Registration → Revit Modeling → As-Built Deviation Check → Documentation & Sheets\n\nআপনি কি পয়েন্ট ক্লাউড প্রজেক্ট স্যাম্পল দেখতে চান নাকি কোটেশনের জন্য ফাইল প্রস্তুত করতে চান?",
      answerEnglish: "Point Cloud to BIM (Scan-to-BIM) converts 3D laser scanner data (.e57, .rcp, .rcs) into high-accuracy, parametric Autodesk Revit models (LOD 200–350).\n\nTypical Scan-to-BIM Workflow:\nPoint Cloud Registration → Revit BIM Modeling → As-Built Deviation Check → Documentation & Sheets\n\nYou can explore verified Scan-to-BIM case studies on the portfolio. Would you like to review project samples or prepare your scan files for an estimate?",
      suggestions: ["View Point Cloud Projects", "Scan-to-BIM Workflow", "Request a Quote", "Explore Services"]
    },
    {
      id: "mep_bim_coordination",
      category: "Services",
      keywords: ["mep", "hvac", "plumbing", "electrical", "clash", "duct", "piping", "navisworks", "পাইপিং", "ইলেকট্রিক্যাল", "ক্ল্যাশ", "এমইপি"],
      title: "MEP BIM Modeling & 3D Coordination",
      answerBangla: "মির্জা রিয়াদ সম্পূর্ণ MEP BIM মডেলিং এবং থ্রি-ডি কোঅর্ডিনেশন (HVAC ডাক্টিং, প্লাম্বিং পাইপিং, ক্যাবল ট্রে, ইকুইপমেন্ট লেআউট) LOD 300–400 মানে প্রোভাইড করেন।\n\nমূল সুবিধাসমূহ:\n• Navisworks Manage-এ মাল্টি-ট্রেড ক্ল্যাশ ডিটেকশন ও সমাধান\n• কনস্ট্রাক্টেবিলিটি রেজোলিউশন ও স্পুল ড্রয়িং\n• আর্কিটেকচার ও স্ট্রাকচারের সাথে ওপেনিং কোঅর্ডিনেশন\n\nআপনি কি আমাদের MEP প্রজেক্ট দেখতে চান?",
      answerEnglish: "Mirja Riyadh provides comprehensive MEP BIM Modeling & 3D Coordination across HVAC ducting, piping/plumbing, electrical cable trays, and equipment layouts (LOD 300–400).\n\nKey Capabilities:\n• Multi-trade clash detection in Navisworks Manage\n• Constructability resolution & spool drawings\n• Builder's work opening coordination with Architecture\n\nWould you like to see our MEP coordination projects?",
      suggestions: ["View MEP Projects", "Clash Detection Process", "Request a Quote", "All Projects"]
    },
    {
      id: "pricing_cost_rates",
      category: "Commercial",
      keywords: ["cost", "price", "pricing", "rate", "fee", "charge", "কত টাকা", "খরচ", "রেট", "প্রাইস", "টাকা", "বাজেট"],
      title: "Project Pricing & Estimation",
      answerBangla: "প্রজেক্টের খরচ মূলত বিল্ডিংয়ের আয়তন (স্কয়ার ফিট বা বর্গমিটার), রিকোয়ার্ড LOD (200–350+), সোর্স ড্রয়িংয়ের অবস্থা (CAD/PDF/Point Cloud) এবং ডেলিভারি সময়ের ওপর নির্ভর করে।\n\nসঠিক ও দ্রুত খরচের হিসাব পেতে আপনার প্রজেক্টের ফাইল বা তথ্য দিয়ে কোটেশন ফর্ম পূরণ করতে পারেন।",
      answerEnglish: "Project pricing depends on building type, total area (sq.ft / m²), required Level of Development (LOD 200–350+), source drawing quality (CAD/PDF/Point Cloud), and target timeline.\n\nTo get a fast and accurate quote, you can share your project scope or submit an inquiry through our quote form.",
      suggestions: ["Request a Quote", "Prepare Requirements", "View Projects", "About Mirja Riyadh"]
    },
    {
      id: "permit_set_drawings",
      category: "Services",
      keywords: [
        "permit set", "permit", "building permit", "permit drawings", "permit documentation", 
        "city approval", "construction permit", "পারমিট সেট", "অনুমোদন ড্রয়িং", "পৌরসভা নকশা"
      ],
      title: "Permit Set Drawings & Documentation",
      answerBangla: "মির্জা রিয়াদ স্থানীয় কোড এবং নিয়মনীতি মেনে নিখুঁত Permit Set বা অনুমোদন ড্রয়িং তৈরি করে থাকেন। এর মধ্যে আর্কিটেকচারাল প্ল্যান, সাইট প্ল্যান, এলিভেশন এবং প্রয়োজনীয় সেকশন অন্তর্ভুক্ত থাকে—যা সিটি কাউন্সিল বা লোকাল অথরিটির অনুমোদনের জন্য প্রয়োজন।\n\nআপনার প্রজেক্টের পারমিট সেটের কাজ নিয়ে আলোচনা করতে চান?",
      answerEnglish: "Mirja Riyadh specializes in creating accurate Permit Sets and documentation that comply with local building codes and zoning bylaws. This includes architectural floor plans, site plans, elevations, and structural detailing required for city approval.\n\nWould you like to discuss the permit drawings for your project?",
      suggestions: ["Permit Set Pricing", "View Sample Permit", "Required Documents", "Contact Mirja"]
    },
    {
      id: "architecture_cad_to_bim",
      category: "Services",
      keywords: ["architecture", "architectural", "revit", "cad to revit", "2d to 3d", "autocad", "dwg", "নকশা", "মডেলিং", "আর্কিটেকচার"],
      title: "Architectural BIM & 2D to 3D Conversion",
      answerBangla: "আর্কিটেকচারাল BIM সার্ভিসের মধ্যে রয়েছে 2D CAD DWG বা PDF ড্রয়িং থেকে নিখুঁত 3D Revit মডেল তৈরি, প্যারামেট্রিক ফ্যামিলি তৈরি, কনস্ট্রাকশন ড্রয়িং শিট এবং শিডিউল/BOQ প্রস্তুত করা।\n\nমূল কাজসমূহ:\n• 2D CAD/PDF to Revit 3D Conversion\n• এক্সটেরিয়র ও ইন্টেরিয়র প্যারামেট্রিক মডেলিং\n• পারমিট ও কনস্ট্রাকশন ড্রয়িং সেট\n\nআপনি কি আর্কিটেকচারাল কেস স্টাডি দেখতে চান?",
      answerEnglish: "Architectural BIM services include transforming 2D CAD DWG or PDF drawings into detailed 3D Revit models, parametric family creation, construction documentation, and schedule extraction.\n\nKey Disciplines:\n• 2D CAD/PDF to Revit 3D Conversion\n• Exterior & Interior Parametric Modeling\n• Construction & Permit Drawing Sets\n\nWould you like to explore Architectural case studies?",
      suggestions: ["View Architecture Projects", "CAD to BIM Details", "Request a Quote", "Explore Services"]
    },
    {
      id: "hire_contact_quote",
      category: "Commercial",
      keywords: ["quote", "hire", "contact", "inquiry", "order", "proposal", "যোগাযোগ", "হায়ার", "কোটেশন", "কাজ দিতে চাই", "অর্ডার"],
      title: "Request a Quote & Hire",
      answerBangla: "আপনি সরাসরি আপনার প্রজেক্টের রিকোয়ারমেন্টস পাঠিয়ে বিস্তারিত প্রপোজাল ও টাইমলাইন জেনে নিতে পারেন।\n\nপ্রস্তুত রাখার মতো তথ্য:\n১. বিল্ডিংয়ের ধরন ও আনুমানিক আয়তন\n২. সোর্স ফাইল (CAD, PDF, বা Point Cloud)\n৩. প্রয়োজনীয় বিষয় (Architecture, MEP, নাকি উভয়ই)\n৪. টার্গেট ডেডলাইন ও LOD\n\nনিচের বাটনে ক্লিক করে ফর্মটি ওপেন করতে পারেন।",
      answerEnglish: "You can directly submit your project scope for a detailed proposal and turnaround estimate.\n\nKey details to prepare:\n1. Building type & approximate area\n2. Available inputs (CAD, PDF, or Point Cloud)\n3. Required disciplines (Architecture, MEP, or both)\n4. Target deadline & LOD\n\nClick below to open the project quote form.",
      suggestions: ["Request a Quote", "View Portfolio Projects", "About Mirja Riyadh"]
    },
    {
      id: "about_mirja_riyadh",
      category: "Profile",
      keywords: ["who are you", "about", "mirja", "riyadh", "experience", "কে", "অভিজ্ঞতা", "পরিচয়", "প্রোফাইল"],
      title: "About Mirja Riyadh",
      answerBangla: "মির্জা রিয়াদ একজন প্রফেশনাল সিনিয়র BIM স্পেশালিস্ট ও রেভিট মডেলিস্ট। আন্তর্জাতিক আর্কিটেকচারাল, MEP এবং Scan-to-BIM প্রজেক্ট ডেলিভারিতে তাঁর ৭+ বছরের কাজের অভিজ্ঞতা রয়েছে।\n\nতিনি Revit, Navisworks, AutoCAD, Recap Pro দিয়ে LOD 200–400 মডেল তৈরিতে পারদর্শী।\n\nআপনি কি তাঁর পোর্টফোলিও প্রজেক্ট দেখতে চান নাকি সরাসরি যোগাযোগ করতে চান?",
      answerEnglish: "Mirja Riyadh is a professional Senior BIM Specialist and Revit Modeler with extensive hands-on experience in international Architectural, MEP, and Scan-to-BIM project delivery.\n\nSpecialized in Revit, Navisworks, AutoCAD, and Recap Pro delivering LOD 200–400 BIM models.\n\nWould you like to check out verified portfolio projects or get in touch?",
      suggestions: ["View Projects", "Explore Services", "Request a Quote"]
    }
  ];

  var DEFAULT_RESPONSE = {
    answerBangla: "আমি মির্জা রিয়াদের BIM সার্ভিস সংক্রান্ত তথ্য দিয়ে সাহায্য করতে পারি:\n\n• **Scan-to-BIM**: লেজার স্ক্যান (.e57/rcp) থেকে Revit 3D মডেল (LOD 200–350)\n• **MEP BIM & Coordination**: HVAC, পাইপিং, ইলেকট্রিক্যাল ও ক্ল্যাশ সমাধান\n• **Architectural BIM**: 2D CAD/PDF থেকে 3D মডেল ও ড্রয়িং শিট\n• **Revit Families**: কাস্টম প্যারামেট্রিক কম্পোনেন্ট\n\nআপনার নির্দিষ্ট কোনো প্রশ্ন থাকলে নিচে সিলেক্ট করুন বা লিখুন!",
    answerEnglish: "I can help you explore Mirja Riyadh's BIM services, find relevant portfolio projects, understand workflows, or prepare a project inquiry.\n\n• **Scan-to-BIM**: Converting point clouds (.e57/rcp) to Revit models (LOD 200–350)\n• **MEP BIM & Coordination**: HVAC, plumbing, electrical & clash detection\n• **Architectural BIM**: 2D CAD/PDF to Revit 3D, CD sets, BOQ extraction\n\nWhat can I help you with today?",
    suggestions: ["Explore Services", "View Projects", "Point Cloud to BIM", "MEP BIM & Coordination", "Request a Quote"]
  };

  function matchQuery(userText) {
    if (!userText) return { reply: DEFAULT_RESPONSE.answerEnglish, suggestions: DEFAULT_RESPONSE.suggestions };
    
    var cleanQuery = (userText || '').toLowerCase().trim().replace(/[?!.,;:]/g, '');
    var isBangla = /[\u0980-\u09FF]/.test(userText);

    for (var i = 0; i < CHATBOT_KNOWLEDGE_ITEMS.length; i++) {
      var item = CHATBOT_KNOWLEDGE_ITEMS[i];
      for (var k = 0; k < item.keywords.length; k++) {
        var keyword = item.keywords[k].toLowerCase();
        if (cleanQuery.indexOf(keyword) !== -1 || cleanQuery === keyword) {
          return {
            reply: (isBangla && item.answerBangla) ? item.answerBangla : item.answerEnglish,
            suggestions: item.suggestions
          };
        }
      }
    }

    return {
      reply: isBangla ? DEFAULT_RESPONSE.answerBangla : DEFAULT_RESPONSE.answerEnglish,
      suggestions: DEFAULT_RESPONSE.suggestions
    };
  }

  return {
    profile: SPECIALIST_PROFILE,
    knowledgeItems: CHATBOT_KNOWLEDGE_ITEMS,
    defaultResponse: DEFAULT_RESPONSE,
    matchQuery: matchQuery
  };
});
