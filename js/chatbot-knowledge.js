/**
 * BIM Chatbot Centralized Knowledge Base & FAQ Rules
 * 
 * Compatible with BOTH Node.js/TypeScript backend (server.ts) and browser <script> tag!
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
    // 1. Core Greeting & Smalltalk
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
      suggestions: ["Explore Services", "View Projects", "Point Cloud to BIM", "MEP BIM & Coordination", "Request a Quote"]
    },
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
      id: "gratitude",
      category: "Smalltalk",
      keywords: ["thank", "thx", "thanks", "ধন্যবাদ", "থ্যাঙ্কস", "থ্যাংকস", "shukriya"],
      title: "Thank You Response",
      answerBangla: "আপনাকে অসংখ্য ধন্যবাদ! আপনার প্রজেক্ট বা মডেলিং রিকোয়ারমেন্টস নিয়ে আরও কোনো প্রশ্ন থাকলে নির্দ্বিধায় জিজ্ঞাসা করুন।",
      answerEnglish: "You're very welcome! If you have any other questions about Revit modeling, LOD requirements, or want to discuss a new project, feel free to ask anytime.",
      suggestions: ["View Projects", "Request a Quote", "Explore Services"]
    },

    // 2. Suggestion: "Explore Services"
    {
      id: "explore_services",
      category: "Services",
      keywords: [
        "explore services", "services", "service", "what services", "what do you do",
        "সার্ভিস", "সার্ভিসসমূহ", "সেবা", "কি কি কাজ করেন"
      ],
      title: "Explore BIM Services",
      answerBangla: "মির্জা রিয়াদের প্রধান BIM সার্ভিসসমূহ:\n\n1. **Scan-to-BIM (Point Cloud to Revit)**: ৩ডি লেজার স্ক্যান ডাটা (.rcp/.e57) থেকে নিখুঁত As-Built Revit মডেল তৈরি (LOD 200–350)।\n2. **MEP BIM Modeling & Coordination**: HVAC ডাক্টিং, পাইপিং, ইলেকট্রিক্যাল এবং Navisworks-এ ক্ল্যাশ ডিটেকশন ও সমাধান (LOD 300–400)।\n3. **Architectural BIM (2D to 3D)**: 2D CAD DWG/PDF থেকে প্যারামেট্রিক 3D Revit মডেল ও কনস্ট্রাকশন ড্রয়িং শিট।\n4. **Custom Revit Families**: আর্কিটেকচারাল ও MEP কম্পোনেন্টের প্যারামেট্রিক ফ্যামিলি তৈরি।\n\nআপনি কোন সার্ভিসটি সম্পর্কে বিস্তারিত জানতে চান?",
      answerEnglish: "Overview of Mirja Riyadh's Core BIM Services:\n\n1. **Scan-to-BIM (Point Cloud to Revit)**: Converting 3D laser scan data (.rcp/.e57) into accurate As-Built Revit models (LOD 200–350).\n2. **MEP BIM Modeling & Coordination**: HVAC ductwork, piping/plumbing, electrical systems & Navisworks clash resolution (LOD 300–400).\n3. **Architectural BIM (2D to 3D)**: Transforming 2D CAD/PDF drawings into detailed 3D Revit models & construction sheets.\n4. **Custom Revit Families**: Parametric Architectural and MEP components tailored to specifications.\n\nWhich service would you like to explore in detail?",
      suggestions: ["Point Cloud to BIM", "MEP BIM & Coordination", "Architectural BIM", "View Projects", "Request a Quote"]
    },

    // 3. Suggestion: "View Projects" / "All Projects"
    {
      id: "view_projects",
      category: "Portfolio",
      keywords: [
        "view projects", "all projects", "view portfolio projects", "projects", "portfolio", "project samples",
        "প্রজেক্ট", "প্রজেক্ট দেখুন", "পোর্টফোলিও", "কাজের স্যাম্পল"
      ],
      title: "View Portfolio Projects",
      answerBangla: "পোর্টফোলিওতে বিভিন্ন ক্যাটাগরির আন্তর্জাতিক BIM প্রজেক্ট রয়েছে:\n\n🏢 **Point Cloud to BIM**: Heritage Facade As-Built, Commercial Facade, MEP Plant Room Scan-to-Revit\n⚡ **MEP Coordination**: Hospital HVAC & Medical Gas, High-Rise Commercial Tower MEP Clash Detection\n🏛️ **Architectural BIM**: Multi-story Residential CAD-to-BIM, Modern Commercial Complex\n\nকোন ধরনের প্রজেক্ট স্যাম্পল দেখতে চান?",
      answerEnglish: "Here are the verified BIM project categories in the portfolio:\n\n🏢 **Point Cloud to BIM**: Historic As-Built, Commercial Facade, Industrial Plant Room Scan-to-Revit\n⚡ **MEP Coordination**: Hospital HVAC & Med-Gas, Commercial Tower Multi-trade Clash Resolution\n🏛️ **Architectural BIM**: Residential CAD-to-BIM, Mixed-Use Commercial Complex Documentation\n\nWhich category would you like to review?",
      suggestions: ["View Point Cloud Projects", "View MEP Projects", "View Architecture Projects", "Request a Quote"]
    },

    // 4. Suggestion: "Point Cloud to BIM"
    {
      id: "point_cloud_scan_to_bim",
      category: "Services",
      keywords: [
        "point cloud to bim", "scan to bim", "laser scan", "scan", "pointcloud", "point cloud",
        "rcp", "e57", "পয়েন্ট ক্লাউড", "স্ক্যান", "স্ক্যান টু বিআইএম"
      ],
      title: "Scan-to-BIM (Point Cloud to Revit)",
      answerBangla: "পয়েন্ট ক্লাউড টু বিআইএম (Scan-to-BIM) সার্ভিসে ৩ডি লেজার স্ক্যান ফাইল (.e57, .rcp, .rcs, Faro, Leica) থেকে উচ্চমানের প্যারামেট্রিক অটোডেস্ক রেভিট মডেল (LOD 200–350) তৈরি করা হয়।\n\nমূল সুবিধাসমূহ:\n• নিখুঁত As-Built জ্যামিতি ও ডেভিয়েশন ভেরিফিকেশন (±3mm থেকে ±10mm)\n• আর্কিটেকচারাল এনভেলপ, স্ট্রাকচারাল ফ্রেম ও এক্সপোজড MEP পাইপিং মডেলিং\n• কনস্ট্রাকশন ড্রয়িং ও এক্সিস্টিং কন্ডিশন ফ্লোর প্ল্যান/সেকশন প্রস্তুতকরণ",
      answerEnglish: "Scan-to-BIM converts raw 3D laser scan data (.e57, .rcp, .rcs from Leica, Faro, Trimble) into high-precision, parametric Autodesk Revit models (LOD 200–350).\n\nKey Highlights:\n• Precise As-Built geometry with deviation verification (±3mm to ±10mm tolerance)\n• Architectural envelope, structural framing & exposed MEP modeling\n• Existing condition floor plans, elevations, sections & schedules",
      suggestions: ["Scan-to-BIM Workflow", "View Point Cloud Projects", "Request a Quote", "Explore Services"]
    },

    // 5. Suggestion: "Scan-to-BIM Workflow"
    {
      id: "scan_to_bim_workflow",
      category: "Workflow",
      keywords: [
        "scan-to-bim workflow", "scan workflow", "point cloud workflow",
        "পয়েন্ট ক্লাউড ধাপ", "স্ক্যান ওয়ার্কফ্লো", "স্ক্যান ধাপ"
      ],
      title: "Scan-to-BIM Detailed Workflow",
      answerBangla: "আমাদের Scan-to-BIM কাজের ৫টি ধারাবাহিক ধাপ:\n\n1. **Data Ingestion & QC**: Recap Pro-তে পয়েন্ট ক্লাউড ফাইল (.rcp/.e57) ক্লিনআপ, কোঅর্ডিনেট সিস্টেম ও ওরিয়েন্টেশন ভেরিফাই করা।\n2. **Revit Level & Grid Setup**: স্ক্যান ডাটার সাপেক্ষে ফ্লোর লেভেল ও গ্রিড লাইন লক করা।\n3. **Parametric BIM Modeling**: নির্ধারিত LOD অনুযায়ী দেয়াল, কলাম, বিম, সিলিং, দরজা-জানালা ও MEP রুট মডেলিং।\n4. **Deviation & QA Check**: স্ক্যান ও মডেলের মধ্যে সারফেস ডেভিয়েশন চেক (Tolerance: ±3mm থেকে ±10mm)।\n5. **Sheets & Deliverables**: .rvt মডেল ফাইল, DWG এক্সপোর্ট, এবং As-Built শিট ডেলিভারি।",
      answerEnglish: "Our 5-Step Scan-to-BIM Delivery Workflow:\n\n1. **Data Ingestion & QC**: Clean and inspect .rcp/.e57 point clouds in Autodesk Recap Pro with coordinate verification.\n2. **Revit Setup**: Establish real-world datum, shared coordinates, levels, and grid intersections.\n3. **Parametric Modeling**: Construct architectural, structural, or MEP geometry to target LOD (200/300/350).\n4. **Deviation Analysis & QA**: Overlay point cloud on Revit elements to verify tolerances (within ±3mm to ±10mm).\n5. **Deliverables Extraction**: Provide clean .RVT model, CAD exports, schedules, and PDF sheet sets.",
      suggestions: ["View Point Cloud Projects", "Prepare Requirements", "Request a Quote", "Explore Services"]
    },

    // 6. Suggestion: "View Point Cloud Projects"
    {
      id: "view_point_cloud_projects",
      category: "Portfolio",
      keywords: [
        "view point cloud projects", "point cloud projects", "scan projects", "pointcloud projects",
        "স্ক্যান প্রজেক্ট", "পয়েন্ট ক্লাউড প্রজেক্ট"
      ],
      title: "Point Cloud to BIM Projects",
      answerBangla: "আমাদের উল্লেখযোগ্য Scan-to-BIM প্রজেক্টসমূহ:\n\n• **Historic Facade & Heritage As-Built (LOD 350)**: লেজার স্ক্যান থেকে জটিল আর্চ, মোল্ডিং ও স্টোন মেসনারি মডেলিং।\n• **Industrial Plant Room Scan-to-Revit (LOD 350)**: পাম্প, ভালভ, বয়লার ও পাইপ নেটওয়ার্কের নিখুঁত ৩ডি মডেল।\n• **Commercial Retrofit As-Built**: অফিস ভবনের ইন্টেরিয়র ও স্ট্রাকচারাল ফ্রেম রেনোভেশন মডেল।\n\nআপনি সাইটের 'Point Cloud' মেনুতে গিয়ে সম্পূর্ণ ইন্টারেক্টিভ প্রিভিউ দেখতে পারেন।",
      answerEnglish: "Featured Scan-to-BIM Projects in the Portfolio:\n\n• **Historic Heritage As-Built (LOD 350)**: High-detail facade modeling capturing intricate arches, moldings & stone masonry.\n• **Industrial Plant Room Scan-to-Revit (LOD 350)**: High-density piping, valves, boilers & MEP plant equipment.\n• **Commercial Office Retrofit**: Existing condition modeling for interior refurbishment and space planning.\n\nYou can navigate to the 'Point Cloud' portfolio page to see interactive case studies and screenshots.",
      suggestions: ["Scan-to-BIM Workflow", "Request a Quote", "View MEP Projects", "All Projects"]
    },

    // 7. Suggestion: "MEP BIM & Coordination"
    {
      id: "mep_bim_coordination",
      category: "Services",
      keywords: [
        "mep bim & coordination", "mep bim", "mep coordination", "mep", "hvac", "plumbing",
        "electrical", "clash", "duct", "piping", "navisworks", "পাইপিং", "ইলেকট্রিক্যাল", "ক্ল্যাশ", "এমইপি"
      ],
      title: "MEP BIM Modeling & 3D Coordination",
      answerBangla: "সম্পূর্ণ MEP BIM মডেলিং এবং থ্রি-ডি কোঅর্ডিনেশন (LOD 300–400):\n\n• **HVAC Mechanical**: ডাক্টওয়ার্ক, ডিফইউজার, AHU, চিলার, VAV বক্স লেআউট\n• **Plumbing & Piping**: ওয়াটার সাপ্লাই, ড্রেনেজ, ফায়ার প্রোটেকশন স্প্রিংকলার ও মেডিক্যাল গ্যাস লাইন\n• **Electrical**: ক্যাবল ট্রে, কন্ডুইট ও প্যানেল বোর্ড মডেলিং\n• **Navisworks Clash Resolution**: ট্রেড-টু-ট্রেড ক্ল্যাশ চিহ্নিতকরণ ও সমাধান",
      answerEnglish: "Comprehensive MEP BIM Modeling & 3D Coordination (LOD 300–400):\n\n• **HVAC Mechanical**: Duct routing, diffusers, AHUs, chillers, VAV boxes\n• **Plumbing & Fire Protection**: Domestic water, drainage, sprinkler piping & medical gas systems\n• **Electrical Systems**: Primary cable trays, conduit routing & electrical distribution equipment\n• **Multi-Trade Clash Resolution**: Identifying and resolving hard/soft clashes in Navisworks Manage.",
      suggestions: ["Clash Detection Process", "View MEP Projects", "Request a Quote", "Explore Services"]
    },

    // 8. Suggestion: "Clash Detection Process"
    {
      id: "clash_detection_process",
      category: "Workflow",
      keywords: [
        "clash detection process", "clash detection", "clash resolution", "navisworks clash",
        "ক্ল্যাশ ডিটেকশন প্রসেস", "ক্ল্যাশ সমাধান", "ক্ল্যাশ প্রসেস"
      ],
      title: "MEP Clash Detection & Resolution Process",
      answerBangla: "Navisworks Manage দিয়ে ক্ল্যাশ ডিটেকশন ও সমাধানের ধাপসমূহ:\n\n1. **Model Aggregation**: Revit থেকে Architecture, Structure ও MEP মডেল NWC ফরম্যাটে Navisworks-এ ইমপোর্ট।\n2. **Matrix Setup**: ট্রেডভিত্তিক ক্ল্যাশ টেস্ট ম্যাট্রিক্স তৈরি (যেমন: HVAC Duct vs Structural Beams, Gravity Pipe vs Electrical Cable Trays)।\n3. **Clash Grouping & Review**: ডুপ্লিকেট ও মাইনর ক্ল্যাশ ফিল্টার করে রিয়েল কনস্ট্রাকশন ইস্যু গ্রুপ করা।\n4. **Revit Model Resolution**: Revit মডেলে পাইপ/ডাক্টের ইনভার্ট এলিভেশন ও রুট রি-অ্যালাইন করা এবং বিল্ডার্স ওপেনিং ড্রয়িং তৈরি।\n5. **Clash Report Deliverables**: ক্ল্যাশ-ফ্রি কনস্ট্রাকশন কোঅর্ডিনেটেড মডেল এবং বিশদ HTML/PDF রিপোর্ট ডেলিভারি।",
      answerEnglish: "Our Navisworks Clash Detection & Coordination Protocol:\n\n1. **Model Aggregation**: Import federated Architectural, Structural, and MEP models into Autodesk Navisworks Manage.\n2. **Test Matrix Setup**: Run systematic clash batches (e.g., Duct vs. Structural Beams, Drainage Slope vs. Cable Trays).\n3. **Intelligent Grouping**: Eliminate false positives and group clashes by floor zone and trade.\n4. **Revit Resolution**: Adjust pipe slopes, duct offsets, and coordinate builder's work wall/slab penetrations.\n5. **Deliverables**: Clash-free federated models, PDF/HTML clash matrices, and resolved spool/coordination sheets.",
      suggestions: ["View MEP Projects", "Prepare Requirements", "Request a Quote", "All Projects"]
    },

    // 9. Suggestion: "View MEP Projects"
    {
      id: "view_mep_projects",
      category: "Portfolio",
      keywords: [
        "view mep projects", "mep projects", "mep project", "hvac projects",
        "এমইপি প্রজেক্ট", "এমইপি প্রজেক্ট দেখুন"
      ],
      title: "MEP Coordination Projects",
      answerBangla: "পোর্টফোলিওর সেরা MEP কোঅর্ডিনেশন প্রজেক্টসমূহ:\n\n• **Multi-Specialty Hospital MEP Coordination (LOD 400)**: জটিল HVAC ডাক্ট, মেডিক্যাল গ্যাস পাইপিং ও ড্রেনেজ সিস্টেমের জিরো-ক্ল্যাশ সমাধান।\n• **High-Rise Commercial Tower MEP Layout (LOD 350)**: রাইজার শ্যাফ্ট ও কনজেস্টেড সিলিং স্পেস কোঅর্ডিনেশন।\n• **Shopping Mall Central HVAC Plant**: চিলার ও পাম্প রুমের পাইপিং ও ইকুইপমেন্ট লেআউট মডেলিং।\n\nসাইটের 'MEP' পেজে গিয়ে বিস্তারিত কেস স্টাডি দেখতে পারেন।",
      answerEnglish: "Featured MEP BIM & Coordination Projects in the Portfolio:\n\n• **Multi-Specialty Hospital MEP Coordination (LOD 400)**: Zero-clash routing for HVAC ducts, medical gas, and gravity drainage.\n• **High-Rise Commercial Tower MEP Layout (LOD 350)**: Riser shaft coordination and congested ceiling plenum optimization.\n• **Commercial Mall Central Cooling Plant**: Chilled water piping, valve stations, and pump skid 3D coordination.\n\nVisit the 'MEP' menu tab on this website to inspect coordination drawings and 3D views.",
      suggestions: ["Clash Detection Process", "Request a Quote", "View Point Cloud Projects", "All Projects"]
    },

    // 10. Suggestion: "Architectural BIM" / "View Architecture Projects"
    {
      id: "architecture_cad_to_bim",
      category: "Services",
      keywords: [
        "architectural bim", "view architecture projects", "architecture", "architectural", "revit",
        "cad to revit", "2d to 3d", "autocad", "dwg", "নকশা", "মডেলিং", "আর্কিটেকচার", "আর্কিটেকচারাল প্রজেক্ট"
      ],
      title: "Architectural BIM & 2D to 3D Conversion",
      answerBangla: "আর্কিটেকচারাল BIM সার্ভিসের মধ্যে রয়েছে 2D CAD DWG বা PDF ড্রয়িং থেকে নিখুঁত 3D Revit মডেল তৈরি, প্যারামেট্রিক ফ্যামিলি তৈরি, কনস্ট্রাকশন ড্রয়িং শিট এবং শিডিউল/BOQ প্রস্তুত করা।\n\nমূল কাজসমূহ:\n• 2D CAD/PDF to Revit 3D Conversion\n• এক্সটেরিয়র ও ইন্টেরিয়র প্যারামেট্রিক মডেলিং\n• পারমিট ও কনস্ট্রাকশন ড্রয়িং সেট\n\nআপনি কি আর্কিটেকচারাল কেস স্টাডি দেখতে চান?",
      answerEnglish: "Architectural BIM services include transforming 2D CAD DWG or PDF drawings into detailed 3D Revit models, parametric family creation, construction documentation, and schedule extraction.\n\nKey Disciplines:\n• 2D CAD/PDF to Revit 3D Conversion\n• Exterior & Interior Parametric Modeling\n• Construction & Permit Drawing Sets\n\nWould you like to explore Architectural case studies?",
      suggestions: ["CAD to BIM Details", "View Architecture Projects", "Request a Quote", "Explore Services"]
    },

    // 11. Suggestion: "CAD to BIM Details"
    {
      id: "cad_to_bim_details",
      category: "Workflow",
      keywords: [
        "cad to bim details", "cad to bim", "cad to revit", "2d to 3d details",
        "ক্যাড টু বিআইএম", "2d থেকে 3d"
      ],
      title: "2D CAD to Revit 3D Conversion Details",
      answerBangla: "2D CAD থেকে Revit 3D তৈরির বিস্তারিত প্রক্রিয়া:\n\n1. **DWG Clean-up & Layer Audit**: CAD ড্রয়িংয়ের লেয়ার ও স্কেল অডিট করা।\n2. **Revit Family & Type Configuration**: দেয়ালের থিকনেস, উইন্ডো/ডোর টাইপ ও ফিনিশিং স্পেসিফিকেশন সেটআপ।\n3. **Intelligent 3D Modeling**: লেভেল-বাই-লেভেল ফ্লোর, ওয়াল, সিলিং, ছাদ ও রুম বাউন্ডারি মডেলিং।\n4. **Automated Schedules & Sheets**: এরিয়া শিডিউল, ম্যাটেরিয়াল টেকঅফ ও প্রেজেন্টেশন শিট এক্সপোর্ট।",
      answerEnglish: "Our 2D CAD/PDF to Revit 3D Conversion Process:\n\n1. **CAD Audit & Layer Prep**: Clean DWG layers, verify dimensional accuracy and origin points.\n2. **Type Catalog Setup**: Configure custom wall assemblies, floor build-ups, door/window styles, and materials.\n3. **Intelligent Modeling**: Construct floors, multi-layer walls, ceiling grids, roofs, and room area volumes.\n4. **Automated Schedules & Sheets**: Generate parametric room tags, area schedules, and print-ready sheet sets.",
      suggestions: ["View Architecture Projects", "Prepare Requirements", "Request a Quote", "Explore Services"]
    },

    // 12. Suggestion: "Prepare Requirements"
    {
      id: "prepare_requirements",
      category: "Commercial",
      keywords: [
        "prepare requirements", "requirements", "project requirements", "how to prepare",
        "প্রস্তুত রাখুন", "প্রজেক্টের তথ্য", "কি কি লাগবে", "রিকোয়ারমেন্টস"
      ],
      title: "How to Prepare Your Project Requirements",
      answerBangla: "দ্রুত ও নির্ভুল কোটেশনের জন্য নিচের তথ্যগুলো প্রস্তুত রাখুন:\n\n1. **Building Type & Area**: ভবনের ধরন (Residential, Commercial, Hospital) ও আনুমানিক আয়তন (sq.ft বা m²)।\n2. **Source Files**: প্রাপ্ত ফাইল (2D CAD DWG, PDF ড্রয়িং, অথবা .e57/.rcp Point Cloud ফাইল)।\n3. **Scope of Work**: Architectural, Structural, MEP, নাকি অল-ইনক্লুসিভ কোঅর্ডিনেশন।\n4. **Required LOD**: LOD 200 (ম্যাস), LOD 300 (ডিজাইন), LOD 350 (কোঅর্ডিনেশন), নাকি LOD 400 (ফ্যাব্রিকেশন)।\n5. **Timeline**: আপনার প্রয়োজনীয় ডেলিভারি ডেডলাইন।\n\nতথ্য প্রস্তুত থাকলে সরাসরি কোটেশন রিকোয়েস্ট সাবমিট করুন।",
      answerEnglish: "Checklist to Prepare for a Fast & Accurate Project Quote:\n\n1. **Building Type & Total Area**: E.g. Residential Villa, 10-story Commercial, Hospital; Approx. sq.ft or m².\n2. **Input File Format**: Available source drawings (CAD .DWG, PDF sets, or 3D Laser Scan .e57/.rcp).\n3. **Scope & Disciplines**: Architectural, Structural, MEP modeling, or full clash coordination.\n4. **Target LOD**: LOD 200 (Schematic), LOD 300 (Design), LOD 350 (Coordination), or LOD 400 (Spool/Fab).\n5. **Delivery Timeline**: Target milestone or deadline.\n\nReady to get started? Click below to request a quote.",
      suggestions: ["Request a Quote", "Explore Services", "About Mirja Riyadh"]
    },

    // 13. Suggestion: "Request a Quote"
    {
      id: "hire_contact_quote",
      category: "Commercial",
      keywords: [
        "request a quote", "quote", "hire", "contact", "inquiry", "order", "proposal", "get a quote",
        "যোগাযোগ", "হায়ার", "কোটেশন", "কাজ দিতে চাই", "অর্ডার", "রিকোয়েস্ট কোট"
      ],
      title: "Request a Quote & Hire",
      answerBangla: "প্রজেক্ট কোটেশন পেতে আপনি সরাসরি আমাদের কন্টাক্ট ও কোটেশন ফর্ম পূরণ করতে পারেন।\n\nফর্মটি সাবমিট করলে মির্জা রিয়াদ ১ ঘণ্টার মধ্যে আপনার রিকোয়ারমেন্টস রিভিউ করে কাস্টম টাইমলাইন ও প্রপোজাল পাঠাবেন।\n\nঅন-স্ক্রিন ফর্মটি খুলতে নিচের বাটনে ক্লিক করুন বা সরাসরি ইমেইল করুন: `mirja.riyadh@gmail.com`",
      answerEnglish: "To request a tailored proposal and timeline for your BIM project, submit your scope through our interactive quote form.\n\nMirja Riyadh typically responds within 1 hour during business hours with a detailed scope review and estimated turnaround.\n\nYou can also reach out directly via email at: `mirja.riyadh@gmail.com`",
      suggestions: ["Prepare Requirements", "View Projects", "About Mirja Riyadh"]
    },

    // 14. Suggestion: "Pricing & Rates"
    {
      id: "pricing_cost_rates",
      category: "Commercial",
      keywords: [
        "cost", "price", "pricing", "rate", "rates", "fee", "charge",
        "কত টাকা", "খরচ", "রেট", "প্রাইস", "টাকা", "বাজেট", "প্রাইসিং"
      ],
      title: "Project Pricing & Estimation",
      answerBangla: "প্রজেক্টের খরচ মূলত বিল্ডিংয়ের আয়তন (স্কয়ার ফিট বা বর্গমিটার), রিকোয়ার্ড LOD (200–350+), সোর্স ড্রয়িংয়ের অবস্থা (CAD/PDF/Point Cloud) এবং ডেলিভারি সময়ের ওপর নির্ভর করে।\n\nসঠিক ও দ্রুত খরচের হিসাব পেতে আপনার প্রজেক্টের ফাইল বা তথ্য দিয়ে কোটেশন ফর্ম পূরণ করতে পারেন।",
      answerEnglish: "Project pricing depends on building type, total area (sq.ft / m²), required Level of Development (LOD 200–350+), source drawing quality (CAD/PDF/Point Cloud), and target timeline.\n\nTo get a fast and accurate quote, you can share your project scope or submit an inquiry through our quote form.",
      suggestions: ["Request a Quote", "Prepare Requirements", "View Projects", "About Mirja Riyadh"]
    },

    // 15. Suggestion: "About Mirja Riyadh"
    {
      id: "about_mirja_riyadh",
      category: "Profile",
      keywords: [
        "about mirja riyadh", "who are you", "about", "mirja", "riyadh", "experience", "experience & skills",
        "কে", "অভিজ্ঞতা", "পরিচয়", "প্রোফাইল", "মির্জা রিয়াদ সম্পর্কে"
      ],
      title: "About Mirja Riyadh",
      answerBangla: "মির্জা রিয়াদ একজন সিনিয়র BIM স্পেশালিস্ট ও রেভিট মডেলিস্ট। আন্তর্জাতিক প্রজেক্টে ৭+ বছরের অভিজ্ঞতাসম্পন্ন।\n\nবিশেষত্ব:\n• Scan-to-BIM (Point Cloud to Revit LOD 200–350)\n• MEP 3D Modeling & Navisworks Clash Resolution (LOD 300–400)\n• Architectural 2D-to-3D Revit Modeling & Documentation\n• Tools: Autodesk Revit, Navisworks Manage, AutoCAD, Recap Pro, Dynamo\n\nবিশ্বব্যাপী ইউএসএ, ইউকে, ইউরোপ, অস্ট্রেলিয়া ও মধ্যপ্রাচ্যের ক্লায়েন্টদের সফলতার সাথে মডেলিং সাপোর্ট দিয়ে আসছেন।",
      answerEnglish: "Mirja Riyadh is a Senior BIM Specialist & Revit Modeler with 7+ years of international AEC project delivery experience.\n\nKey Expertise:\n• Scan-to-BIM: Converting point clouds to parametric Revit models (LOD 200–350)\n• MEP 3D Modeling & Navisworks Coordination (LOD 300–400)\n• Architectural CAD-to-BIM & Construction Documentation\n• Software: Autodesk Revit, Navisworks Manage, AutoCAD, Recap Pro, Dynamo\n\nDelivering high-accuracy BIM models for clients across the USA, UK, EU, UAE, and Australia.",
      suggestions: ["Explore Services", "View Projects", "Request a Quote"]
    }
  ];

  var DEFAULT_RESPONSE = {
    answerBangla: "আমি মির্জা রিয়াদের BIM সার্ভিস সংক্রান্ত তথ্য দিয়ে সাহায্য করতে পারি:\n\n• **Scan-to-BIM**: লেজার স্ক্যান (.e57/rcp) থেকে Revit 3D মডেল (LOD 200–350)\n• **MEP BIM & Coordination**: HVAC, পাইপিং, ইলেকট্রিক্যাল ও ক্ল্যাশ সমাধান\n• **Architectural BIM**: 2D CAD/PDF থেকে 3D মডেল ও ড্রয়িং শিট\n• **Revit Families**: কাস্টম প্যারামেট্রিক কম্পোনেন্ট\n\nআপনার নির্দিষ্ট কোনো প্রশ্ন থাকলে নিচে সিলেক্ট করুন বা লিখুন!",
    answerEnglish: "I can help you explore Mirja Riyadh's BIM services, find relevant portfolio projects, understand workflows, or prepare a project inquiry.\n\n• **Scan-to-BIM**: Converting point clouds (.e57/rcp) to Revit models (LOD 200–350)\n• **MEP BIM & Coordination**: HVAC, plumbing, electrical & clash detection\n• **Architectural BIM**: 2D CAD/PDF to Revit 3D, CD sets, BOQ extraction\n\nWhat can I help you with today?",
    suggestions: ["Explore Services", "View Projects", "Point Cloud to BIM", "MEP BIM & Coordination", "Request a Quote"]
  };

  /**
   * Intelligently match user query or suggestion click to the best knowledge item
   */
  function matchQuery(userText) {
    if (!userText) return { reply: DEFAULT_RESPONSE.answerEnglish, suggestions: DEFAULT_RESPONSE.suggestions };
    
    var cleanQuery = (userText || '').toLowerCase().trim().replace(/[?!.,;:#*]/g, '');
    var isBangla = /[\u0980-\u09FF]/.test(userText);

    // Pass 1: Check for exact match with Item ID, Title, or Keyword (Priority for suggestion clicks)
    for (var i = 0; i < CHATBOT_KNOWLEDGE_ITEMS.length; i++) {
      var item = CHATBOT_KNOWLEDGE_ITEMS[i];
      if (cleanQuery === item.title.toLowerCase()) {
        return {
          reply: (isBangla && item.answerBangla) ? item.answerBangla : item.answerEnglish,
          suggestions: item.suggestions
        };
      }
      for (var k = 0; k < item.keywords.length; k++) {
        var keyword = item.keywords[k].toLowerCase();
        if (cleanQuery === keyword) {
          return {
            reply: (isBangla && item.answerBangla) ? item.answerBangla : item.answerEnglish,
            suggestions: item.suggestions
          };
        }
      }
    }

    // Pass 2: Substring or includes match
    for (var j = 0; j < CHATBOT_KNOWLEDGE_ITEMS.length; j++) {
      var itm = CHATBOT_KNOWLEDGE_ITEMS[j];
      for (var x = 0; x < itm.keywords.length; x++) {
        var kw = itm.keywords[x].toLowerCase();
        if (cleanQuery.indexOf(kw) !== -1 || kw.indexOf(cleanQuery) !== -1) {
          return {
            reply: (isBangla && itm.answerBangla) ? itm.answerBangla : itm.answerEnglish,
            suggestions: itm.suggestions
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
