/**
 * BIM Chatbot Centralized Knowledge Base
 * 
 * Simple structure:
 * {
 *   id: "my_custom_topic",
 *   keywords: ["My Suggestion Name", "my suggestion"],
 *   answer: "Write the English detailed response here...",
 *   suggestions: ["Next Step 1", "Next Step 2", "Request a Quote"]
 * }
 */

(function (global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else {
    global.BIM_KNOWLEDGE_BASE = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var CHATBOT_KNOWLEDGE_ITEMS = [

  // 1. Greetings & Smalltalk
  {
    id: "greetings_welcome",
    keywords: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening", "welcome", "salam", "assalamualaikum"],
    answer: "Hello! Welcome to Mirja Riyadh's BIM portfolio assistant. I can help you explore verified BIM projects, learn about Scan-to-BIM and MEP workflows, or prepare a project estimate.\n\nWhat type of project are you planning?",
    suggestions: ["Explore Services", "View Projects", "Point Cloud to BIM", "MEP BIM & Coordination", "Request a Quote"]
  },
  {
    id: "greetings_how_are_you",
    keywords: ["how are you", "how r u", "how do you do", "whats up", "what's up", "how is it going", "how are u"],
    answer: "I'm doing well, thank you for asking! I'm here and ready to help you explore Mirja Riyadh's BIM, Revit modeling, and Scan-to-BIM portfolio.\n\nHow can I assist you with your project today?",
    suggestions: ["Explore Services", "View Projects", "Point Cloud to BIM", "Request a Quote"]
  },
  {
    id: "gratitude",
    keywords: ["thank", "thx", "thanks", "thank you", "appreciate it", "great help", "awesome"],
    answer: "You're very welcome! If you have any other questions about Revit modeling, LOD requirements, or want to discuss a new project, feel free to ask anytime.",
    suggestions: ["View Projects", "Request a Quote", "Explore Services"]
  },
  {
    id: "help_menu",
    keywords: ["help", "menu", "options", "what can you do", "start over", "main menu", "topics", "list"],
    answer: "Here's a quick directory of everything I can help with:\n\n🧰 **Services**: Explore Services, Point Cloud to BIM, MEP BIM & Coordination, Architectural BIM\n📁 **Portfolio**: View Projects, View Point Cloud Projects, View MEP Projects, View Architecture Projects\n⚙️ **Process**: Scan-to-BIM Workflow, Clash Detection Process, CAD to BIM Details, Prepare Requirements\n💬 **Business**: Request a Quote, Pricing & Rates, Payment Terms, Turnaround Time, Revisions Policy\n🔒 **Trust**: Data Privacy & NDA, About Mirja Riyadh, Testimonials\n\nWhat would you like to explore?",
    suggestions: ["Explore Services", "View Projects", "Request a Quote", "About Mirja Riyadh"]
  },
  {
    id: "goodbye_farewell",
    keywords: ["bye", "goodbye", "see you", "exit", "close chat", "talk later", "gtg", "leaving"],
    answer: "Thanks for stopping by! If you'd like to move forward, you can request a quote anytime, or just come back and say hi. Have a great day!",
    suggestions: ["Request a Quote", "View Projects", "About Mirja Riyadh"]
  },
  {
    id: "complaint_negative_feedback",
    keywords: ["complaint", "not happy", "issue", "problem with", "bad experience", "disappointed", "unsatisfied", "not satisfied"],
    answer: "I'm sorry to hear that — that's not the experience we want you to have. Please email the specifics to mirja.riyadh@gmail.com and it will be reviewed personally and addressed promptly.\n\nIs there anything I can clarify or help resolve right now?",
    suggestions: ["Request a Quote", "About Mirja Riyadh", "Revisions Policy"]
  },

  // 2. Explore Services
  {
    id: "explore_services",
    keywords: ["explore services", "services", "service", "what services", "what do you do", "capabilities", "skills"],
    answer: "Overview of Mirja Riyadh's Core BIM Services:\n\n1. **Architectural BIM**: High-precision 3D architectural modeling, custom Revit families, facade curtain walls & building envelopes.\n2. **MEP Systems & Clash**: HVAC ducting, domestic plumbing, fire sprinklers, electrical trays & Navisworks hard-clash detection/resolution matrix.\n3. **Point Cloud to BIM**: 3D laser scan registration (.e57/.rcp) into accurate as-built digital twins.\n4. **Documentation & AutoCAD Services**: Permit set production, shop drawings, municipal sets & PDF-to-CAD conversion.\n5. **Structural BIM**: Structural framing, rebar detailing & coordination models.\n6. **Custom Revit Families**: Parametric Architectural and MEP components tailored to specifications.\n7. **4D/5D BIM & Quantity Takeoff**: Construction sequencing and BOQ/cost estimation support.\n\nWhich service would you like to explore in detail?",
    suggestions: ["Point Cloud to BIM", "MEP BIM & Coordination", "Architectural BIM", "Documentation & CAD Services", "Custom Revit Families"]
  },

  // 3. View Projects / Portfolio
  {
    id: "view_projects",
    keywords: ["view projects", "all projects", "view portfolio projects", "projects", "portfolio", "project samples", "case studies"],
    answer: "The portfolio currently features 24 verified case studies across these categories:\n\n🏛️ **Architectural BIM** — high-precision 3D modeling, custom families, facades & envelopes\n⚡ **MEP Systems & Clash** — HVAC ducting, plumbing, fire sprinklers, electrical trays & Navisworks clash resolution\n☁️ **Point Cloud to BIM** — registered .e57/.rcp scan data converted to accurate as-built digital twins\n📐 **AutoCAD / Documentation** — permit sets, shop drawings, municipal sets & PDF-to-CAD conversion\n\nProjects span Commercial, Healthcare, Industrial/Pharmaceutical, Residential, Hospitality, Infrastructure, and Renovation building types. Which category would you like to review?",
    suggestions: ["View Point Cloud Projects", "View MEP Projects", "View Architecture Projects", "Documentation & CAD Services"]
  },

  // 4. Point Cloud to BIM
  {
    id: "point_cloud_scan_to_bim",
    keywords: ["point cloud to bim", "scan to bim", "laser scan", "scan", "pointcloud", "point cloud", "rcp", "e57"],
    answer: "Scan-to-BIM converts raw 3D laser scan data (.e57, .rcp, .rcs from Leica, Faro, Trimble) into high-precision, parametric Autodesk Revit models (LOD 200–350).\n\nKey Highlights:\n• Precise As-Built geometry with deviation verification (±3mm to ±10mm tolerance)\n• Architectural envelope, structural framing & exposed MEP modeling\n• Existing condition floor plans, elevations, sections & schedules",
    suggestions: ["Scan-to-BIM Workflow", "View Point Cloud Projects", "Point Cloud Accuracy", "Request a Quote"]
  },

  // 5. Scan-to-BIM Workflow
  {
    id: "scan_to_bim_workflow",
    keywords: ["scan-to-bim workflow", "scan workflow", "point cloud workflow", "scan steps", "workflow"],
    answer: "Our 5-Step Scan-to-BIM Delivery Workflow:\n\n1. **Data Ingestion & QC**: Clean and inspect .rcp/.e57 point clouds in Autodesk Recap Pro with coordinate verification.\n2. **Revit Setup**: Establish real-world datum, shared coordinates, levels, and grid intersections.\n3. **Parametric Modeling**: Construct architectural, structural, or MEP geometry to target LOD (200/300/350).\n4. **Deviation Analysis & QA**: Overlay point cloud on Revit elements to verify tolerances (within ±3mm to ±10mm).\n5. **Deliverables Extraction**: Provide clean .RVT model, CAD exports, schedules, and PDF sheet sets.",
    suggestions: ["View Point Cloud Projects", "Prepare Requirements", "Request a Quote", "Explore Services"]
  },

  // 6. View Point Cloud Projects
  {
    id: "view_point_cloud_projects",
    keywords: ["view point cloud projects", "point cloud projects", "scan projects", "pointcloud projects"],
    answer: "Featured Scan-to-BIM Projects in the Portfolio:\n\n• **Historic Heritage As-Built (LOD 350)**: High-detail facade modeling capturing intricate arches, moldings & stone masonry.\n• **Industrial Plant Room Scan-to-Revit (LOD 350)**: High-density piping, valves, boilers & MEP plant equipment.\n• **Commercial Office Retrofit**: Existing condition modeling for interior refurbishment and space planning.\n\nYou can navigate to the 'Point Cloud' portfolio page to see interactive case studies and screenshots.",
    suggestions: ["Scan-to-BIM Workflow", "Request a Quote", "View MEP Projects", "All Projects"]
  },

  // 7. MEP BIM & Coordination
  {
    id: "mep_bim_coordination",
    keywords: ["mep bim & coordination", "mep bim", "mep coordination", "mep", "hvac", "plumbing", "electrical", "clash", "duct", "piping", "navisworks"],
    answer: "Comprehensive MEP BIM Modeling & 3D Coordination (LOD 300–400):\n\n• **HVAC Mechanical**: Duct routing, diffusers, AHUs, chillers, VAV boxes\n• **Plumbing & Fire Protection**: Domestic water, drainage, sprinkler piping & medical gas systems\n• **Electrical Systems**: Primary cable trays, conduit routing & electrical distribution equipment\n• **Multi-Trade Clash Resolution**: Identifying and resolving hard/soft clashes in Navisworks Manage.",
    suggestions: ["Clash Detection Process", "View MEP Projects", "Request a Quote", "Explore Services"]
  },

  // 8. Clash Detection Process
  {
    id: "clash_detection_process",
    keywords: ["clash detection process", "clash detection", "clash resolution", "navisworks clash", "clash steps"],
    answer: "Our Navisworks Clash Detection & Coordination Protocol:\n\n1. **Model Aggregation**: Import federated Architectural, Structural, and MEP models into Autodesk Navisworks Manage.\n2. **Test Matrix Setup**: Run systematic clash batches (e.g., Duct vs. Structural Beams, Drainage Slope vs. Cable Trays).\n3. **Intelligent Grouping**: Eliminate false positives and group clashes by floor zone and trade.\n4. **Revit Resolution**: Adjust pipe slopes, duct offsets, and coordinate builder's work wall/slab penetrations.\n5. **Deliverables**: Clash-free federated models, PDF/HTML clash matrices, and resolved spool/coordination sheets.",
    suggestions: ["View MEP Projects", "Prepare Requirements", "Model Federation & IFC", "Request a Quote"]
  },

  // 9. View MEP Projects
  {
    id: "view_mep_projects",
    keywords: ["view mep projects", "mep projects", "mep project", "hvac projects"],
    answer: "Featured MEP BIM & Coordination Projects in the Portfolio:\n\n• **Multi-Specialty Hospital MEP Coordination (LOD 400)**: Zero-clash routing for HVAC ducts, medical gas, and gravity drainage.\n• **High-Rise Commercial Tower MEP Layout (LOD 350)**: Riser shaft coordination and congested ceiling plenum optimization.\n• **Commercial Mall Central Cooling Plant**: Chilled water piping, valve stations, and pump skid 3D coordination.\n\nVisit the 'MEP' menu tab on this website to inspect coordination drawings and 3D views.",
    suggestions: ["Clash Detection Process", "Request a Quote", "View Point Cloud Projects", "All Projects"]
  },

  // 10. Architectural BIM
  {
    id: "architecture_cad_to_bim",
    keywords: ["architectural bim", "architecture", "architectural", "revit", "cad to revit", "2d to 3d", "autocad", "dwg"],
    answer: "Architectural BIM services include transforming 2D CAD DWG or PDF drawings into detailed 3D Revit models, parametric family creation, construction documentation, and schedule extraction.\n\nKey Disciplines:\n• 2D CAD/PDF to Revit 3D Conversion\n• Exterior & Interior Parametric Modeling\n• Construction & Permit Drawing Sets\n\nWould you like to explore Architectural case studies?",
    suggestions: ["CAD to BIM Details", "View Architecture Projects", "Request a Quote", "Explore Services"]
  },

  // 11. CAD to BIM Details
  {
    id: "cad_to_bim_details",
    keywords: ["cad to bim details", "cad to bim", "cad to revit details", "2d to 3d details"],
    answer: "Our 2D CAD/PDF to Revit 3D Conversion Process:\n\n1. **CAD Audit & Layer Prep**: Clean DWG layers, verify dimensional accuracy and origin points.\n2. **Type Catalog Setup**: Configure custom wall assemblies, floor build-ups, door/window styles, and materials.\n3. **Intelligent Modeling**: Construct floors, multi-layer walls, ceiling grids, roofs, and room area volumes.\n4. **Automated Schedules & Sheets**: Generate parametric room tags, area schedules, and print-ready sheet sets.",
    suggestions: ["View Architecture Projects", "Prepare Requirements", "Request a Quote", "Explore Services"]
  },

  // 12. View Architecture Projects  (NEW — closes the gap: this button existed before but had no dedicated project list)
  {
    id: "view_architecture_projects",
    keywords: ["view architecture projects", "architecture projects", "architectural projects", "cad to bim projects"],
    answer: "Featured Architectural BIM Projects in the Portfolio:\n\n• **Residential Villa CAD-to-BIM**: Full 2D DWG-to-Revit conversion with interior detailing and furniture layout.\n• **Mixed-Use Commercial Complex Documentation**: Multi-level 3D model with complete construction & permit sheet sets.\n• **Boutique Hotel Renovation**: Existing-to-proposed comparison modeling with material schedules.\n\nVisit the 'Architecture' menu tab on this website to browse renders, plans, and sheet sets.",
    suggestions: ["CAD to BIM Details", "Request a Quote", "View MEP Projects", "All Projects"]
  },

  // 12.5 Documentation & AutoCAD Services (NEW — matches the site's dedicated "AutoCAD Services" page)
  {
    id: "documentation_autocad_services",
    keywords: ["documentation & cad services", "autocad services", "documentation", "pdf to cad", "shop drawings", "permit sets", "permit", "municipal sets", "cad drafting", "2d drafting"],
    answer: "Documentation & AutoCAD Services:\n\n• **PDF to CAD Conversion**: Turning scanned/rasterized 2D PDF blueprints into clean, layered AutoCAD .DWG drawings.\n• **Permit & Municipal Sets**: Drawing packages prepared to meet local permitting and approval requirements.\n• **Construction / Shop & GA Drawings**: Structural shop drawings, spool sheets, and general arrangement drawings.\n• **Detailed Architectural Drawings**: Clean, dimensioned 2D documentation extracted from or supporting 3D Revit models.\n\nThis is treated as a distinct service track alongside Architectural BIM, MEP Coordination, and Point Cloud to BIM.",
    suggestions: ["CAD to BIM Details", "File Formats Accepted", "Request a Quote", "Explore Services"]
  },

  // 13. Prepare Requirements
  {
    id: "prepare_requirements",
    keywords: ["prepare requirements", "requirements", "project requirements", "how to prepare", "project details", "scope"],
    answer: "Checklist to Prepare for a Fast & Accurate Project Quote:\n\n1. **Building Type & Total Area**: E.g. Residential Villa, 10-story Commercial, Hospital; Approx. sq.ft or m².\n2. **Input File Format**: Available source drawings (CAD .DWG, PDF sets, or 3D Laser Scan .e57/.rcp).\n3. **Scope & Disciplines**: Architectural, Structural, MEP modeling, or full clash coordination.\n4. **Target LOD**: LOD 200 (Schematic), LOD 300 (Design), LOD 350 (Coordination), or LOD 400 (Spool/Fab).\n5. **Delivery Timeline**: Target milestone or deadline.\n\nReady to get started? Click below to request a quote.",
    suggestions: ["Request a Quote", "File Formats Accepted", "Understanding LOD", "About Mirja Riyadh"]
  },

  // 14. Request a Quote / Hire
  {
    id: "hire_contact_quote",
    keywords: ["request a quote", "quote", "hire", "contact", "inquiry", "order", "proposal", "get a quote", "email"],
    answer: "To request a tailored proposal and timeline for your BIM project, submit your scope through the interactive 'Request BIM Quote' form on the website. It asks for your project type, expected deliverables (RVT / IFC / NWD / DWG / clash audit), preferred contact method, and project details — plus a link for large file transfers (WeTransfer/Google Drive/Dropbox) for scans or drawings.\n\nMirja Riyadh typically responds within 1 hour during business hours with a detailed scope review and estimated turnaround.\n\nYou can also reach out directly via email at mirja.riyadh@gmail.com or WhatsApp at +8801717144566.",
    suggestions: ["Prepare Requirements", "View Projects", "Payment Terms", "About Mirja Riyadh"]
  },

  // 15. Pricing & Rates
  {
    id: "pricing_cost_rates",
    keywords: ["pricing & rates", "cost", "price", "pricing", "rate", "rates", "fee", "charge", "budget", "how much"],
    answer: "Project pricing depends on building type, total area (sq.ft / m²), required Level of Development (LOD 200–350+), source drawing quality (CAD/PDF/Point Cloud), and target timeline.\n\nTo get a fast and accurate quote, you can share your project scope or submit an inquiry through our quote form.",
    suggestions: ["Request a Quote", "Prepare Requirements", "Discounts & Bulk Pricing", "Payment Terms"]
  },

  // 16. About Mirja Riyadh
  {
    id: "about_mirja_riyadh",
    keywords: ["about mirja riyadh", "who are you", "about", "mirja", "riyadh", "experience", "experience & skills", "bio"],
    answer: "Mirja Riyadh is a BIM Specialist & Revit Modeler based in Dhaka, Bangladesh, with a strong track record delivering accurate Building Information Models for architectural, structural, and MEP engineering projects.\n\nKey Expertise:\n• Scan-to-BIM: Converting point clouds to parametric Revit models\n• MEP 3D Modeling (HVAC, Plumbing & Electrical) & Navisworks Clash Coordination\n• Architectural, PDF/Sketch/Image-to-3D Revit modeling & Construction Documentation\n• Custom Revit Family creation with formula-driven parameters\n• Software: Autodesk Revit, AutoCAD, Navisworks Manage, ReCap Pro, SketchUp Pro\n\nRated ★★★★★ on both Fiverr and Upwork, available for remote BIM projects worldwide. You can also reach out directly on WhatsApp at +8801717144566.",
    suggestions: ["Testimonials & Reviews", "Software & Tools Used", "View Projects", "Request a Quote"]
  },

  // 17. Understanding LOD
  {
    id: "understanding_lod",
    keywords: ["understanding lod", "lod", "level of development", "what is lod", "lod 200", "lod 300", "lod 350", "lod 400", "lod meaning"],
    answer: "**Level of Development (LOD)** defines how much detail and reliability a Revit element carries:\n\n• **LOD 200**: Generic shapes with approximate size/location (schematic design).\n• **LOD 300**: Accurate size, shape, location, and orientation — ready for design coordination.\n• **LOD 350**: Includes interfaces with other systems — used for multi-trade clash coordination.\n• **LOD 400**: Fabrication-ready detail — spool drawings, exact connections, shop-level accuracy.\n\nMost coordination projects target LOD 300–350; fabrication/spool work targets LOD 400.",
    suggestions: ["Prepare Requirements", "Scan-to-BIM Workflow", "Request a Quote"]
  },

  // 18. Software & Tools Used
  {
    id: "software_tools_used",
    keywords: ["software & tools used", "software", "tools", "which software", "revit version", "autocad version", "what software do you use", "programs"],
    answer: "Industry-Standard BIM Software & Tools:\n\n• **Autodesk Revit**: Architecture, MEP & custom parametric family creation\n• **Navisworks Manage**: Hard & soft clash detection and matrix reports\n• **Autodesk ReCap Pro**: Point cloud registration & mesh decimation\n• **AutoCAD**: 2D shop drawings, spool sheets & layer sets\n• **SketchUp Pro**: 3D reference modeling\n• **openBIM / IFC**: IFC 2x3 / IFC4 multi-discipline interoperability\n• Also proficient in MS Excel, MS PowerPoint, Adobe Photoshop & Adobe Acrobat DC for data handling and documentation\n\nModels are delivered in the Revit version and exchange format that best matches your project standard.",
    suggestions: ["File Formats Accepted", "Model Federation & IFC", "Explore Services"]
  },

  // 19. File Formats Accepted
  {
    id: "file_formats_accepted",
    keywords: ["file formats accepted", "file format", "input format", "accepted files", "what files do you need", "e57 rcp dwg", "source files", "input files"],
    answer: "Accepted Input File Formats:\n\n• **Laser Scan Data**: .e57, .rcp, .las (Leica, Faro, Trimble, Matterport exports)\n• **2D Drawings**: .dwg, .dxf, .pdf, or hand sketches (vector-based preferred for accuracy)\n• **Reference Models**: .rvt, .nwc, .ifc (for coordination or existing model updates)\n• **Images**: Site photos or sketch/image references are welcome for as-built accuracy.\n\nDeliverables are provided as .RVT, .DWG, .IFC, .NWC/NWD, and PDF sheet sets depending on scope.",
    suggestions: ["Prepare Requirements", "Point Cloud Accuracy", "Request a Quote"]
  },

  // 20. Turnaround Time / Delivery
  {
    id: "turnaround_time",
    keywords: ["turnaround", "delivery time", "how long", "timeline", "duration", "how many days", "how fast"],
    answer: "Typical turnaround depends on project size and LOD, but general ranges are:\n\n• **Small residential / single-floor**: 3–5 business days\n• **Mid-size commercial (LOD 300)**: 1–2 weeks\n• **Large-scale / multi-trade MEP coordination (LOD 350–400)**: 2–4 weeks\n\nRush delivery is available for urgent projects — mention your deadline when requesting a quote for an accurate estimate.",
    suggestions: ["Request a Quote", "Prepare Requirements", "Revisions Policy"]
  },

  // 21. Revisions Policy
  {
    id: "revisions_policy",
    keywords: ["revisions policy", "revision", "revisions", "changes", "edit after delivery", "free revision", "modification policy"],
    answer: "Revisions Policy:\n\n• Minor revisions aligned with the original scope (dimension fixes, missed elements, tagging corrections) are included free within a defined review window.\n• Scope changes (added floors, new disciplines, LOD upgrades) are quoted separately as a change order.\n• Fast turnaround on revision requests — typically 1–3 business days depending on scope.",
    suggestions: ["Request a Quote", "Payment Terms", "Prepare Requirements"]
  },

  // 22. Custom Revit Families
  {
    id: "custom_revit_families",
    keywords: ["custom revit families", "families", "parametric family", "revit family creation", "family creation"],
    answer: "Custom Parametric Revit Family Creation:\n\n• **Architectural Families**: Doors, windows, furniture, fixtures, casework — built to manufacturer spec sheets.\n• **MEP Families**: AHUs, VAV boxes, pumps, valves, panels, fixtures with accurate connectors for MEP fabrication routing.\n• **Structural Families**: Custom connections, bracing, and proprietary structural components.\n\nAll families are built with type catalogs, shared parameters, and nested geometry for maximum reusability.",
    suggestions: ["Explore Services", "Request a Quote", "Software & Tools Used"]
  },

  // 23. Structural BIM
  {
    id: "structural_bim",
    keywords: ["structural bim", "structural modeling", "rebar", "structural revit", "structural coordination"],
    answer: "Structural BIM Modeling Services:\n\n• Structural framing (columns, beams, slabs, foundations) in Revit Structure\n• Rebar detailing and reinforcement schedules\n• Structural-to-MEP and structural-to-architectural clash coordination\n• Steel connection detailing for fabrication-level (LOD 400) deliverables",
    suggestions: ["Explore Services", "Clash Detection Process", "Request a Quote"]
  },

  // 24. 4D/5D BIM & Quantity Takeoff
  {
    id: "4d_5d_bim_qto",
    keywords: ["4d bim", "5d bim", "quantity takeoff", "boq", "cost estimation", "construction sequencing", "qto"],
    answer: "4D/5D BIM & Quantity Takeoff Support:\n\n• **4D BIM**: Linking the model to construction schedules for sequencing and phasing visualization.\n• **5D BIM**: Extracting quantities directly from the model for cost estimation and BOQ (Bill of Quantities).\n• Model-based takeoffs for concrete, steel, ductwork, piping, and finishes — reducing manual estimation errors.",
    suggestions: ["Explore Services", "Request a Quote", "Prepare Requirements"]
  },

  // 25. COBie & Facility Management
  {
    id: "cobie_facility_management",
    keywords: ["cobie", "facility management", "fm data", "asset data", "handover data"],
    answer: "COBie & Facility Management (FM) Data Delivery:\n\n• Structured asset data (equipment, room, and system information) embedded in the model.\n• COBie spreadsheet exports for handover to FM/CAFM systems.\n• Supports asset tagging, warranty tracking, and maintenance scheduling for owner/operator use post-construction.",
    suggestions: ["Explore Services", "BIM Execution Plan", "Request a Quote"]
  },

  // 26. BIM Execution Plan (BEP)
  {
    id: "bim_execution_plan",
    keywords: ["bim execution plan", "bep", "bim standards", "iso 19650", "bim protocol"],
    answer: "BIM Execution Plan (BEP) & Standards Compliance:\n\n• Models are developed following ISO 19650 principles for information management.\n• Custom BEPs can be followed per client/project (naming conventions, coordinate systems, LOD matrices, file exchange protocols).\n• Comfortable adapting to client-specific CDE (Common Data Environment) workflows such as BIM 360, ACC, or Trimble Connect.",
    suggestions: ["Model Federation & IFC", "Data Privacy & NDA", "Request a Quote"]
  },

  // 27. Point Cloud Accuracy
  {
    id: "point_cloud_accuracy",
    keywords: ["registration", "scan accuracy", "tolerance", "point cloud accuracy", "deviation"],
    answer: "Point Cloud Registration & Accuracy Standards:\n\n• Scan registration is verified prior to modeling (client-provided or third-party registered clouds are both accepted).\n• Modeled elements are cross-checked against the point cloud with deviation analysis, typically within **±3mm to ±10mm** tolerance depending on LOD and element type.\n• Deviation heat-map reports can be provided as a QA deliverable on request.",
    suggestions: ["Scan-to-BIM Workflow", "File Formats Accepted", "Request a Quote"]
  },

  // 28. Model Federation & IFC Exchange
  {
    id: "model_federation_ifc",
    keywords: ["model federation & ifc", "ifc", "model federation", "interoperability", "navisworks federation", "openbim"],
    answer: "Model Federation & IFC Exchange:\n\n• Architectural, Structural, and MEP models are federated using shared coordinates for accurate multi-discipline alignment.\n• IFC exports are provided for OpenBIM workflows and interoperability with non-Autodesk platforms.\n• NWC/NWD packages are prepared for Navisworks-based coordination review with all stakeholders.",
    suggestions: ["Clash Detection Process", "Software & Tools Used", "Request a Quote"]
  },

  // 29. BIM 360 / ACC / Cloud Collaboration
  {
    id: "cloud_collaboration",
    keywords: ["bim 360", "acc", "autodesk construction cloud", "cloud collaboration", "trimble connect"],
    answer: "Cloud Collaboration & CDE Support:\n\n• Comfortable working within Autodesk BIM 360 / Autodesk Construction Cloud (ACC), Trimble Connect, or client-hosted Common Data Environments (CDE).\n• Real-time model sharing, issue tracking, and version control on active coordination projects.\n• Can join your existing project cloud environment or work locally and package deliverables for upload.",
    suggestions: ["Model Federation & IFC", "BIM Execution Plan", "Request a Quote"]
  },

  // 30. Data Privacy & NDA
  {
    id: "data_privacy_nda",
    keywords: ["data privacy & nda", "nda", "confidentiality", "data privacy", "secure", "non-disclosure", "data security"],
    answer: "Data Privacy & Confidentiality:\n\n• All project files, drawings, and scan data are treated as strictly confidential.\n• Non-Disclosure Agreements (NDAs) are welcomed and can be signed prior to sharing sensitive project data.\n• Files are stored securely and are not shared, reused, or published without explicit client permission.",
    suggestions: ["Payment Terms", "Request a Quote", "About Mirja Riyadh"]
  },

  // 31. Payment Terms
  {
    id: "payment_terms",
    keywords: ["payment", "payment terms", "milestone payment", "invoice", "advance payment", "payment method"],
    answer: "Payment Terms:\n\n• Standard structure: a partial advance to begin work, with the balance due on delivery (milestone-based billing available for larger projects).\n• Accepted methods can be discussed based on client location (bank transfer, PayPal, or platform-based payment for freelance marketplace clients).\n• A written scope and price agreement is shared before any payment is requested.",
    suggestions: ["Request a Quote", "Revisions Policy", "Data Privacy & NDA"]
  },

  // 32. Working Hours & Availability
  {
    id: "working_hours_availability",
    keywords: ["working hours & availability", "working hours", "timezone", "availability", "response time", "office hours", "when are you available"],
    answer: "Working Hours & Availability:\n\n• Based in Dhaka, Bangladesh, and currently available for remote BIM projects worldwide — flexible with overlapping time zones for calls and check-ins.\n• Typical response time to inquiries is within 1 hour during business hours, and same-day otherwise.\n• Reachable via the website quote form, email, WhatsApp (+8801717144566), or a scheduled video call (Google Meet / Teams / Zoom) to review scope, coordinate models, or walk through deliverables.",
    suggestions: ["Request a Quote", "International Clients", "About Mirja Riyadh"]
  },

  // 33. International Clients / Remote Work
  {
    id: "international_remote_work",
    keywords: ["remote", "international clients", "usa uk", "outsourcing", "offshore", "work with international clients"],
    answer: "International & Remote Collaboration:\n\n• Extensive experience delivering BIM/Revit work remotely for clients across the USA, UK, EU, UAE, and Australia.\n• Comfortable working as an extension of your in-house team, an outsourced modeling partner, or a project-based freelancer.\n• All collaboration happens through cloud file sharing, video calls, and CDE platforms — no on-site presence required.",
    suggestions: ["Working Hours & Availability", "Team Size & Capacity", "Request a Quote"]
  },

  // 34. Team Size & Capacity
  {
    id: "team_size_capacity",
    keywords: ["team size & capacity", "team size", "how many people", "staff", "capacity", "bulk projects", "large volume"],
    answer: "Team Size & Project Capacity:\n\n• Core delivery is led personally by Mirja Riyadh, ensuring consistent quality and direct communication.\n• For larger or multi-discipline projects, a vetted network of specialist modelers can be brought in under direct supervision.\n• Bulk or recurring project volume can be discussed for dedicated capacity and priority scheduling.",
    suggestions: ["Discounts & Bulk Pricing", "Request a Quote", "About Mirja Riyadh"]
  },

  // 35. Testimonials & Reviews
  {
    id: "testimonials_reviews",
    keywords: ["testimonials & reviews", "testimonials", "reviews", "client feedback", "references", "ratings"],
    answer: "Client Feedback & Track Record — ★★★★★ 5.0 Star Rating:\n\n• **Fiverr Verified (Finland)**: A client praised the professional, polite, and patient working style, noting they were pleasantly surprised to receive a work sample before the offer was even finalized.\n• **Upwork Verified (Canada)**: A repeat client described the work as excellent, noting high demand for the skill level provided.\n• **Fiverr Verified (United Kingdom)**: A design consultancy highlighted strong professionalism, work that exceeded expectations, and smooth proactive communication.\n\nFull reviews are visible on the Fiverr and Upwork profiles linked on this portfolio.",
    suggestions: ["View Projects", "About Mirja Riyadh", "Request a Quote"]
  },

  // 36. Free Sample / Trial
  {
    id: "free_sample_trial",
    keywords: ["free sample", "trial project", "sample model", "test project", "sample work"],
    answer: "A small sample section (e.g., one floor plan area or a limited scan region) can often be modeled as a paid trial to demonstrate quality and workflow fit before committing to the full project — this can be discussed when you request a quote.",
    suggestions: ["Request a Quote", "Prepare Requirements", "View Projects"]
  },

  // 37. Discounts & Bulk Pricing
  {
    id: "discounts_bulk_pricing",
    keywords: ["discounts & bulk pricing", "discount", "bulk pricing", "long term contract", "subscription", "recurring projects discount"],
    answer: "Discounts & Long-Term Partnerships:\n\n• Volume discounts are available for large-area projects or multi-building portfolios.\n• Reduced rates can be arranged for long-term or recurring project partnerships (e.g., monthly retainer or ongoing outsourced modeling support).\n• Mention your expected volume/frequency when requesting a quote to get a tailored rate.",
    suggestions: ["Request a Quote", "Team Size & Capacity", "Pricing & Rates"]
  },

  // 38. Language Support
  {
    id: "language_support",
    keywords: ["language", "do you speak", "bangla", "english support", "which language"],
    answer: "Communication is available in English and Bangla (বাংলা). Project documentation and deliverables are provided in English by default, matching standard international AEC practice.",
    suggestions: ["Working Hours & Availability", "Request a Quote", "About Mirja Riyadh"]
  }
];

var DEFAULT_RESPONSE = {
  answer: "I can help you explore Mirja Riyadh's BIM services, find relevant portfolio projects, understand workflows, or prepare a project inquiry.\n\n• **Scan-to-BIM**: Converting point clouds (.e57/rcp) to Revit models (LOD 200–350)\n• **MEP BIM & Coordination**: HVAC, plumbing, electrical & clash detection\n• **Architectural BIM**: 2D CAD/PDF to Revit 3D, CD sets, BOQ extraction\n\nType 'help' anytime to see the full topic menu. What can I help you with today?",
  suggestions: ["Explore Services", "View Projects", "Point Cloud to BIM", "MEP BIM & Coordination", "Request a Quote"]
};



  /**
   * Directly match query or button click and return English answer
   */
  function matchQuery(userText) {
    if (!userText) {
      return {
        reply: DEFAULT_RESPONSE.answer,
        suggestions: DEFAULT_RESPONSE.suggestions
      };
    }
    
    var cleanQuery = (userText || '').toLowerCase().trim().replace(/[?!.,;:#*]/g, '');

    // 1. Exact match with ID or Keyword (instant match for suggestions or exact queries)
    for (var i = 0; i < CHATBOT_KNOWLEDGE_ITEMS.length; i++) {
      var item = CHATBOT_KNOWLEDGE_ITEMS[i];
      if (cleanQuery === item.id.toLowerCase()) {
        return {
          reply: item.answer,
          suggestions: item.suggestions
        };
      }
      for (var k = 0; k < item.keywords.length; k++) {
        if (cleanQuery === item.keywords[k].toLowerCase()) {
          return {
            reply: item.answer,
            suggestions: item.suggestions
          };
        }
      }
    }

    // 2. Substring / partial match
    for (var j = 0; j < CHATBOT_KNOWLEDGE_ITEMS.length; j++) {
      var itm = CHATBOT_KNOWLEDGE_ITEMS[j];
      for (var x = 0; x < itm.keywords.length; x++) {
        var kw = itm.keywords[x].toLowerCase();
        if (cleanQuery.indexOf(kw) !== -1 || kw.indexOf(cleanQuery) !== -1) {
          return {
            reply: itm.answer,
            suggestions: itm.suggestions
          };
        }
      }
    }

    // Default fallback
    return {
      reply: DEFAULT_RESPONSE.answer,
      suggestions: DEFAULT_RESPONSE.suggestions
    };
  }

  return {
    knowledgeItems: CHATBOT_KNOWLEDGE_ITEMS,
    defaultResponse: DEFAULT_RESPONSE,
    matchQuery: matchQuery
  };
});
