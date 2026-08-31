/**
 * Portfolio Projects Data
 * Full Projects list with structured metadata
 * 
 * category: Slugs for filtering ["architecture", "mep", "point-cloud", "autocad"]
 * discipline: Disciplines ["architecture", "mep", "point-cloud", "autocad", "coordination"]
 * buildingType: ["pharmaceutical", "residential", "commercial", "industrial", "hospitality", "healthcare", "educational"]
 * categoryName: Display text shown on website UI
 * 
 * Gallery Grouping Options (shown with group headings in project details page):
 * Option A (Image object group field):
 *   "images": [
 *     {"url": "./src/assets/images/projects/example/p0.webp", "caption": "Floor Plan", "group": "Architectural Plans"},
 *     {"url": "./src/assets/images/projects/example/p1.webp", "caption": "HVAC Duct Layout", "group": "MEP Coordination"}
 *   ]
 * 
 * Option B (galleryGroups structure):
 *   "galleryGroups": [
 *     {
 *       "name": "Architectural Plans",
 *       "images": [
 *         {"url": "./src/assets/images/projects/example/p0.webp", "caption": "Floor Plan"}
 *       ]
 *     }
 *   ]
 * 
 * buildingType
 *  "pharmaceutical" 
 *  "residential" 
 *  "commercial" 
 *  "industrial" 
 *  "hospitality" 
 *  "healthcare" 
 *  "educational"
 * 
 * discipline/category
 * "architecture"
 * "mep"
 * "point-cloud"
 * "autocad"
 * "coordination"
 */

var PORTFOLIO_PROJECTS = [
  {
    "id": "project-01",
    "title": "High-End Healthcare 3D BIM Model",
    "category": [
      "architecture",
      "mep",
      "autocad"
    ],
    "discipline": ["architecture", "mep", "autocad", "coordination"],
    "buildingType": "pharmaceutical",
    "thumbnail": "./src/assets/images/projects/dbl/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/dbl/p1.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "Architectural Plans/3D Model/Section"},
      {"url": "./src/assets/images/projects/dbl/p2.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "Architectural Plans/3D Model/Section"},
      {"url": "./src/assets/images/projects/dbl/p3.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "Architectural Plans/3D Model/Section"},
      {"url": "./src/assets/images/projects/dbl/p4.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "Architectural Plans/3D Model/Section"},
      {"url": "./src/assets/images/projects/dbl/p5.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "Architectural Plans/3D Model/Section"},
      {"url": "./src/assets/images/projects/dbl/p6.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "MEP Detail Modeling"},
      {"url": "./src/assets/images/projects/dbl/p7.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "MEP Detail Modeling"},
      {"url": "./src/assets/images/projects/dbl/p8.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "MEP Detail Modeling"},
      {"url": "./src/assets/images/projects/dbl/p9.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "MEP Detail Modeling"},
      {"url": "./src/assets/images/projects/dbl/p11.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "MEP 3D Floor Plan"},
      {"url": "./src/assets/images/projects/dbl/p12.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "MEP 3D Floor Plan"},
      {"url": "./src/assets/images/projects/dbl/p13.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "Clean Water Spool Drawing"},
      {"url": "./src/assets/images/projects/dbl/p14.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "Clean Water Spool Drawing"},
      {"url": "./src/assets/images/projects/dbl/p16.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "HVAC Detail Coordination"},
      {"url": "./src/assets/images/projects/dbl/p17.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "HVAC Detail Coordination"},
      {"url": "./src/assets/images/projects/dbl/p18.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "HVAC Detail Coordination"},
      {"url": "./src/assets/images/projects/dbl/p20.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "Utility Room Industrial Cable Tray Modeling"},
      {"url": "./src/assets/images/projects/dbl/p21.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "Utility Room Industrial Cable Tray Modeling"},
      {"url": "./src/assets/images/projects/dbl/p24.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "Electrical Lighting Distribution"},
      {"url": "./src/assets/images/projects/dbl/p26.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "Schedule and Reports"},
      {"url": "./src/assets/images/projects/dbl/p27.webp", "caption": "Overall 3D Revit Architectural Render with Curtain Wall Details", "group": "Schedule and Reports"}
    ],
    "shortDesc": "Complete 3D Revit Architectural and MEP model (LOD 350) for a 60,000 sq.ft pharmaceutical facility, featuring parametric facade elements and material schedules.",
    "fullDesc": "Modeled from 2D CAD architectural blueprints into high-precision Autodesk Revit 3D environment. Includes comprehensive parametric family creation, material takeoffs, room tagging, elevation extraction, and 3D walkthrough views prepared for high-end pharmaceutical development.",
    "lod": "LOD 350",
    "softwareUsed": [
      "Autodesk Revit",
      "Navisworks Manage",
      "AutoCAD"
    ],
    "clientRegion": "Bangladesh (Dhaka)",
    "completionDate": "June 2020",
    "areaSqFt": "60,000 sq.ft",
    "keyFeatures": [
      "Parametric glass curtain wall system with dynamic shading fins",
      "Extracted accurate Bill of Quantities (BOQ) and schedule tables",
      "Zero-clash structural alignment with architectural, MEP layouts",
      "High-detail interior joinery modeling and ceiling plans",
      "Phamaceutical cleanroom layout with MEP integration and compliance with ISO standards",
      "Equipment and fixture placement with manufacturer specifications and 3D coordination"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Architecture Modeling • MEP Systems • AutoCAD Services"
  },


  {
    "id": "project-02",
    "title": "MEP Coordination Project (Residential)",
    "category": [
      "mep"
    ],
    "discipline": ["mep", "coordination"],
    "buildingType": "commercial",
    "thumbnail": "./src/assets/images/projects/rhg-dunblame/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/rhg-dunblame/p0.webp", "caption": "Cover page for MEP Coordination Project", "group": "Cover Sheet"},
      {"url": "./src/assets/images/projects/rhg-dunblame/p1.webp", "caption": "Containment Layout", "group": "MEP Coordinated Layout"},
      {"url": "./src/assets/images/projects/rhg-dunblame/p2.webp", "caption": "Lighting distribution Layout", "group": "MEP Coordinated Layout"},
      {"url": "./src/assets/images/projects/rhg-dunblame/p3.webp", "caption": "Small Power distribution Layout", "group": "MEP Coordinated Layout"},
      {"url": "./src/assets/images/projects/rhg-dunblame/p4.webp", "caption": "Fire Alarm distribution Layout", "group": "MEP Coordinated Layout"},
      {"url": "./src/assets/images/projects/rhg-dunblame/p5.webp", "caption": "Air Conditioning Layout", "group": "MEP Coordinated Layout"},
      {"url": "./src/assets/images/projects/rhg-dunblame/p6.webp", "caption": "Heating Elements/Piping distribution Layout", "group": "MEP Coordinated Layout"},
      {"url": "./src/assets/images/projects/rhg-dunblame/p7.webp", "caption": "Ventilation Layout", "group": "MEP Coordinated Layout"},
      {"url": "./src/assets/images/projects/rhg-dunblame/p8.webp", "caption": "Water Distribution Layout", "group": "MEP Coordinated Layout"},
      {"url": "./src/assets/images/projects/rhg-dunblame/p9.webp", "caption": "Drainage System Layout", "group": "MEP Coordinated Layout"},
      {"url": "./src/assets/images/projects/rhg-dunblame/p10.webp", "caption": "Plant room distribution", "group": "MEP Coordination System"},
      {"url": "./src/assets/images/projects/rhg-dunblame/p11.webp", "caption": "General Installation - Ventilation", "group": "MEP Coordination System"},
      {"url": "./src/assets/images/projects/rhg-dunblame/p12.webp", "caption": "General Installation - Ventilation", "group": "MEP Coordination System"},
      {"url": "./src/assets/images/projects/rhg-dunblame/p13.webp", "caption": "General Installation - Ventilation", "group": "MEP Coordination System"}
    ],
    "shortDesc": "Coordinated MEP BIM modeling for HVAC, plumbing, Water services, electrical, and fire protection systems.",
    "fullDesc": "Detailed MEP modeling integrated with the architectural model, focused on accurate system routing, clash detection, and construction coordination.",
    "lod": "LOD 350",
    "softwareUsed": [
      "Autodesk Revit",
      "Navisworks Manage"
    ],
    "clientRegion": "United Kingdom",
    "completionDate": "Apr 2026",
    "areaSqFt": "25,000 sq.ft",
    "keyFeatures": [
      "HVAC, Plumbing, Electrical & Fire Protection",
      "MEP & Architectural Coordination",
      "Clash Detection & Resolution",
      "Construction-Ready BIM Model"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "MEP Systems • Full Coordination"
  },


  {
    "id": "project-03",
    "title": "Point Cloud to BIM Revit (School)",
    "category": [
      "point-cloud"
    ],
    "discipline": ["point-cloud", "autocad"],
    "buildingType": "educational",
    "thumbnail": "./src/assets/images/projects/point-cloud-p5/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/point-cloud-p5/p0.webp", "caption": "Point Cloud Raw Data for Gymnazium-Nad-Kavalirkou", "group": "Comparison"},
      {"url": "./src/assets/images/projects/point-cloud-p5/p1.webp", "caption": "3D BIM Model for Gymnazium-Nad-Kavalirkou", "group": "Comparison"},
      {"url": "./src/assets/images/projects/point-cloud-p5/p2.webp", "caption": "3D Render for Gymnazium-Nad-Kavalirkou", "group": "3D Views"},
      {"url": "./src/assets/images/projects/point-cloud-p5/p3.webp", "caption": "3D Floor plan for Gymnazium-Nad-Kavalirkou", "group": "3D Views"},
      {"url": "./src/assets/images/projects/point-cloud-p5/p4.webp", "caption": "3D BIM Model for Gymnazium-Nad-Kavalirkou", "group": "3D Views"},
      {"url": "./src/assets/images/projects/point-cloud-p5/p5.webp", "caption": "Under Ground Floor Plan for Gymnazium-Nad-Kavalirkou", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p5/p6.webp", "caption": "Ground Floor Plan for Gymnazium-Nad-Kavalirkou", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p5/p7.webp", "caption": "1st Floor Plan for Gymnazium-Nad-Kavalirkou", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p5/p8.webp", "caption": "2nd Floor Plan for Gymnazium-Nad-Kavalirkou", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p5/p9.webp", "caption": "3rd Floor Plan for Gymnazium-Nad-Kavalirkou", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p5/p10.webp", "caption": "4th Floor for Gymnazium-Nad-Kavalirkou", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p5/p11.webp", "caption": "Roof Plan for Gymnazium-Nad-Kavalirkou", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p5/p12.webp", "caption": "Section A for Gymnazium-Nad-Kavalirkou", "group": "Sections"},
      {"url": "./src/assets/images/projects/point-cloud-p5/p13.webp", "caption": "Section B for Gymnazium-Nad-Kavalirkou", "group": "Sections"},
      {"url": "./src/assets/images/projects/point-cloud-p5/p14.webp", "caption": "East and West Elevation for Gymnazium-Nad-Kavalirkou", "group": "Elevations"},
      {"url": "./src/assets/images/projects/point-cloud-p5/p15.webp", "caption": "North Elevation for Gymnazium-Nad-Kavalirkou", "group": "Elevations"},
      {"url": "./src/assets/images/projects/point-cloud-p5/p16.webp", "caption": "South Elevation for Gymnazium-Nad-Kavalirkou", "group": "Elevations"},
      {"url": "./src/assets/images/projects/point-cloud-p5/p17.webp", "caption": "IFC 3D Model for Gymnazium-Nad-Kavalirkou", "group": "3D Views"}
    ],
    "shortDesc": "Point cloud scan data converted into a detailed 3D Revit model for a school building.",
    "fullDesc": "Converted high-density laser scan data into a highly detailed 3D Revit model for a school building, capturing accurate as-built architectural and structural elements for educational facility management.",
    "lod": "LOD 300",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk AutoCAD",
      "Navisworks"
    ],
    "clientRegion": "Czech Republic",
    "completionDate": "Feb 2024",
    "areaSqFt": "35,000 sq.ft",
    "keyFeatures": [
      "Transformed complex school point cloud data into a Point Cloud-verified 3D Revit model",
      "Captured detailed institutional layouts, structural elements, and large-scale architectural features",
      "Documented existing conditions precisely to eliminate manual surveying errors across multiple campus blocks",
      "Provided a high-fidelity as-built BIM baseline optimized for school renovation and facility management"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Point Cloud to BIM"
  },


  {
    "id": "project-04",
    "title": "Permit Set (Architectural & MEP 3D BIM Model)",
    "category": [
      "architecture",
      "mep"
    ],
    "thumbnail": "./src/assets/images/projects/4601-s-university-ave/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/4601-s-university-ave/p0.webp", "caption": "Cover Sheet for 4601 S University Ave Architectural & MEP 3D BIM Model", "group": "Cover Sheet"},
      {"url": "./src/assets/images/projects/4601-s-university-ave/p1.webp", "caption": "Informations & Symbols", "group": "Supporting and Details"},
      {"url": "./src/assets/images/projects/4601-s-university-ave/p2.webp", "caption": "Site Plans", "group": "Supporting and Details"},
      {"url": "./src/assets/images/projects/4601-s-university-ave/p3.webp", "caption": "Accessibility", "group": "Supporting and Details"},
      {"url": "./src/assets/images/projects/4601-s-university-ave/p4.webp", "caption": "Accessibility", "group": "Supporting and Details"},
      {"url": "./src/assets/images/projects/4601-s-university-ave/p5.webp", "caption": "Life Safety Plan", "group": "Parmit Plans"},
      {"url": "./src/assets/images/projects/4601-s-university-ave/p6.webp", "caption": "Floor Plan", "group": "Parmit Plans"},
      {"url": "./src/assets/images/projects/4601-s-university-ave/p7.webp", "caption": "Roof Plan", "group": "Parmit Plans"},
      {"url": "./src/assets/images/projects/4601-s-university-ave/p8.webp", "caption": "Architectural Elevations", "group": "Section & Elevations"},
      {"url": "./src/assets/images/projects/4601-s-university-ave/p9.webp", "caption": "Architectural Sections", "group": "Section & Elevations"},
      {"url": "./src/assets/images/projects/4601-s-university-ave/p10.webp", "caption": "Rest Room Details", "group": "Architectural Details"},
      {"url": "./src/assets/images/projects/4601-s-university-ave/p11.webp", "caption": "Door Schedule, Partition & Windows", "group": "Architectural Details"},
      {"url": "./src/assets/images/projects/4601-s-university-ave/p12.webp", "caption": "Water Supply Plan", "group": "Water System"},
      {"url": "./src/assets/images/projects/4601-s-university-ave/p13.webp", "caption": "Waste Water Plan", "group": "Water System"}
    ],
    "shortDesc": "2D CAD Concept into Permit set Revit BIM model (Architectual and MEP system.)",
    "fullDesc": "Transformed conceptual designs into a fully coordinated, permit-ready 3D Revit model, featuring precise architectural and MEP system dimensions, piping layouts, and installation-ready construction details.",
    "lod": "LOD 350",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk Autocad"
    ],
    "clientRegion": "United States",
    "completionDate": "Sep 2024",
    "areaSqFt": "8,700 sq.ft",
    "keyFeatures": [
      "Developed a code-compliant 3D BIM model integrating architectural structures with detailed MEP piping and equipment layouts.",
      "Converted conceptual schematics into precise, parametric 3D components meeting local building and safety regulations.",
      "Generated comprehensive technical annotations, accurate equipment schedules, and material take-offs required for agency plan review",
      "Conducted automated clash detection to eliminate spatial conflicts, ensuring a seamless field installation and local code adherence."
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Architectural & MEP Permit Set"
  },


  {
    "id": "project-27",
    "title": "Point Cloud to BIM - Complete Architecture Renovation & Permit Set",
    "category": [
      "architecture",
      "point-cloud"
    ],
    "discipline": ["architecture", "point-cloud", "autocad"],
    "buildingType": "residential",
    "thumbnail": "./src/assets/images/projects/1290-delaware-ave/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/1290-delaware-ave/t1.webp", "caption": "Point Cloud", "group": "Comparison"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/t2.webp", "caption": "BIM Model", "group": "Comparison"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p1.webp", "caption": "Cover Sheet", "group": "Cover"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p2.webp", "caption": "Basement Floor Plan", "group": "Floor Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p3.webp", "caption": "1st Floor Plan", "group": "Floor Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p4.webp", "caption": "2nd Floor Plan", "group": "Floor Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p5.webp", "caption": "3rd Floor Plan", "group": "Floor Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p6.webp", "caption": "4th Floor Plan", "group": "Floor Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p7.webp", "caption": "5th Floor Plan", "group": "Floor Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p8.webp", "caption": "6th Floor Plan", "group": "Floor Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p9.webp", "caption": "7th Floor Plan", "group": "Floor Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p10.webp", "caption": "8th Floor Plan", "group": "Floor Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p11.webp", "caption": "Roof Plan", "group": "Floor Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p12.webp", "caption": "Basement Ceiling Plan", "group": "Ceiling Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p13.webp", "caption": "1st Floor Ceiling Plan", "group": "Ceiling Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p14.webp", "caption": "2nd Floor Ceiling Plan", "group": "Ceiling Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p15.webp", "caption": "3rd Floor Ceiling Plan", "group": "Ceiling Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p16.webp", "caption": "4th Floor Ceiling Plan", "group": "Ceiling Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p17.webp", "caption": "5th Floor Ceiling Plan", "group": "Ceiling Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p18.webp", "caption": "6th Floor Ceiling Plan", "group": "Ceiling Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p19.webp", "caption": "7th Floor Ceiling Plan", "group": "Ceiling Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p20.webp", "caption": "8th Floor Ceiling Plan", "group": "Ceiling Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p21.webp", "caption": "Enlarged Kitchen Plan, Elevations & Schedule", "group": "Enlarged Kitchen Plan, Elevation & Schedule"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p22.webp", "caption": "Enlarged Kitchen Plan, Elevations & Schedule", "group": "Enlarged Kitchen Plan, Elevation & Schedule"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p23.webp", "caption": "Enlarged Kitchen Plan, Elevations & Schedule", "group": "Enlarged Kitchen Plan, Elevation & Schedule"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p24.webp", "caption": "Enlarged Kitchen Plan, Elevations & Schedule", "group": "Enlarged Kitchen Plan, Elevation & Schedule"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p25.webp", "caption": "Enlarged Bathroom Plan, Elevation & Schedule", "group": "Enlarged Bathroom Plan, Elevation & Schedule"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p26.webp", "caption": "Enlarged Bathroom Plan, Elevation & Schedule", "group": "Enlarged Bathroom Plan, Elevation & Schedule"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p27.webp", "caption": "Enlarged Bathroom Plan, Elevation & Schedule", "group": "Enlarged Bathroom Plan, Elevation & Schedule"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p28.webp", "caption": "Enlarged Bathroom Plan, Elevation & Schedule", "group": "Enlarged Bathroom Plan, Elevation & Schedule"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p29.webp", "caption": "Building North Elevations", "group": "Building Elevations"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p30.webp", "caption": "Building South Elevations", "group": "Building Elevations"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p31.webp", "caption": "Building East & West Elevations", "group": "Building Elevations"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p32.webp", "caption": "Detail Sections", "group": "Building Section & Schedule"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p33.webp", "caption": "Finish Work Schedule", "group": "Building Section & Schedule"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p34.webp", "caption": "Door Window Schedule", "group": "Building Section & Schedule"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p35.webp", "caption": "Basement Demo Plan", "group": "Demo Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p36.webp", "caption": "1st Floor Demo Plan", "group": "Demo Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p37.webp", "caption": "2nd Floor Demo Plan", "group": "Demo Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p38.webp", "caption": "3rd Floor Demo Plan", "group": "Demo Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p39.webp", "caption": "4th Floor Demo Plan", "group": "Demo Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p40.webp", "caption": "5th Floor Demo Plan", "group": "Demo Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p41.webp", "caption": "6th Floor Demo Plan", "group": "Demo Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p42.webp", "caption": "7th Floor Demo Plan", "group": "Demo Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p43.webp", "caption": "8th Floor Demo Plan", "group": "Demo Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p44.webp", "caption": "Roof Demo Plan", "group": "Demo Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p45.webp", "caption": "Basement Demo Ceiling Plan", "group": "Demo Ceiling Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p46.webp", "caption": "1st Demo Ceiling Plan", "group": "Demo Ceiling Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p47.webp", "caption": "2nd Demo Ceiling Plan", "group": "Demo Ceiling Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p48.webp", "caption": "3rd Demo Ceiling Plan", "group": "Demo Ceiling Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p49.webp", "caption": "4th Demo Ceiling Plan", "group": "Demo Ceiling Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p50.webp", "caption": "5th Demo Ceiling Plan", "group": "Demo Ceiling Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p51.webp", "caption": "6th Demo Ceiling Plan", "group": "Demo Ceiling Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p52.webp", "caption": "7th Demo Ceiling Plan", "group": "Demo Ceiling Plan"},
      {"url": "./src/assets/images/projects/1290-delaware-ave/p53.webp", "caption": "8th Demo Ceiling Plan", "group": "Demo Ceiling Plan"}
    ],
    "shortDesc": "Scan-to-BIM renovation with demolition, new builds, and permit sets.",
    "fullDesc": "Complete architectural renovation workflow utilizing point cloud data. Features seamless demolition planning, new construction phases, and delivery of a ready-to-submit city permit drawing set.",
    "lod": "LOD 300",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk Autocad"
    ],
    "clientRegion": "United States",
    "completionDate": "Jan 2025",
    "areaSqFt": "9x8,000 sq.ft",
    "keyFeatures": [
      "High-precision architectural modeling generated directly from raw point cloud data data.",
      "Clearly segregated phases mapping out both demolition and new construction zones.",
      "Comprehensive drawing sets fully compliant with local city building codes.",
      "Proactive identification of spatial conflicts to eliminate costly on-site errors."
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Architecture & BIM Services"
  },


  {
    "id": "project-30",
    "title": "Concept to Complete Architecture Renovation & Permit Set",
    "category": [
      "architecture",
      "autocad"
    ],
    "discipline": ["architecture", "autocad"],
    "buildingType": "residential",
    "thumbnail": "./src/assets/images/projects/renovation-p2/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/renovation-p2/p1.webp", "caption": "Concept", "group": "Client Concept"},
      {"url": "./src/assets/images/projects/renovation-p2/p2.webp", "caption": "3D View 1", "group": "3D Views"},
      {"url": "./src/assets/images/projects/renovation-p2/p3.webp", "caption": "3D View 2", "group": "3D Views"},
      {"url": "./src/assets/images/projects/renovation-p2/p4.webp", "caption": "Cover Sheet", "group": "Informations"},
      {"url": "./src/assets/images/projects/renovation-p2/p5.webp", "caption": "Site Plan", "group": "Informations"},
      {"url": "./src/assets/images/projects/renovation-p2/p6.webp", "caption": "UG Demolition Plan", "group": "Demolition Plan"},
      {"url": "./src/assets/images/projects/renovation-p2/p7.webp", "caption": "EG Demolition Plan", "group": "Demolition Plan"},
      {"url": "./src/assets/images/projects/renovation-p2/p8.webp", "caption": "DG Demolition Plan", "group": "Demolition Plan"},
      {"url": "./src/assets/images/projects/renovation-p2/p9.webp", "caption": "Section DD Demolition", "group": "Sections and Elevations Demolition"},
      {"url": "./src/assets/images/projects/renovation-p2/p10.webp", "caption": "Section EE Demolition", "group": "Sections and Elevations Demolition"},
      {"url": "./src/assets/images/projects/renovation-p2/p11.webp", "caption": "North and South Elevation Demolition", "group": "Sections and Elevations Demolition"},
      {"url": "./src/assets/images/projects/renovation-p2/p12.webp", "caption": "East and West Elevation Demolition", "group": "Sections and Elevations Demolition"},
      {"url": "./src/assets/images/projects/renovation-p2/p13.webp", "caption": "UG Existing Plan", "group": "Existing Plan"},
      {"url": "./src/assets/images/projects/renovation-p2/p14.webp", "caption": "EG Existing Plan", "group": "Existing Plan"},
      {"url": "./src/assets/images/projects/renovation-p2/p15.webp", "caption": "DG Existing Plan", "group": "Existing Plan"},
      {"url": "./src/assets/images/projects/renovation-p2/p16.webp", "caption": "RF Existing Plan", "group": "Existing Plan"},
      {"url": "./src/assets/images/projects/renovation-p2/p17.webp", "caption": "UG Complete Plan", "group": "Complete Plan"},
      {"url": "./src/assets/images/projects/renovation-p2/p18.webp", "caption": "EG Complete Plan", "group": "Complete Plan"},
      {"url": "./src/assets/images/projects/renovation-p2/p19.webp", "caption": "DG & RF Complete Plan", "group": "Complete Plan"},
      {"url": "./src/assets/images/projects/renovation-p2/p20.webp", "caption": "Section AA Complete", "group": "Section and Elevation Complete"},
      {"url": "./src/assets/images/projects/renovation-p2/p21.webp", "caption": "Section BB Complete", "group": "Section and Elevation Complete"},
      {"url": "./src/assets/images/projects/renovation-p2/p22.webp", "caption": "North and South Elevation Complete", "group": "Section and Elevation Complete"},
      {"url": "./src/assets/images/projects/renovation-p2/p23.webp", "caption": "East and West Elevation Complete", "group": "Section and Elevation Complete"}
    ],
    "shortDesc": "Residential renovation taken from site survey to a fully coordinated LOD 300 BIM model.",
    "fullDesc": "A single-family home renovation in Bad Mergentheim, Germany, developed from archival permits and site survey through a coordinated LOD 300 BIM model to client-ready photorealistic visualization.",
    "lod": "LOD 300",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk Autocad"
    ],
    "clientRegion": "Germany",
    "completionDate": "Oct 2024",
    "areaSqFt": "5,326.00 sq.ft",
    "keyFeatures": [
      "Full site survey and permit archive digitized",
      "LOD 300 BIM model: accurate size, shape, location",
      "Structural and MEP coordination across levels",
      "Photorealistic renders for client presentation"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Architecture & BIM Services"
  },
  

  {
    "id": "project-05",
    "title": "Point Cloud to Revit Conversion for Barvirska Main Building",
    "category": [
      "point-cloud"
    ],
    "thumbnail": "./src/assets/images/projects/point-cloud-p7/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/point-cloud-p7/p0.webp", "caption": "Point Cloud Model", "group": "3D Views"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p1.webp", "caption": "Revit BIM Model", "group": "3D Views"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p2.webp", "caption": "3D Floor Plans", "group": "3D Views"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p3.webp", "caption": "Ground Floor Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p4.webp", "caption": "1st Floor Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p5.webp", "caption": "2nd Floor Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p6.webp", "caption": "3rd Floor Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p7.webp", "caption": "4th Floor Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p8.webp", "caption": "5th Floor Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p9.webp", "caption": "6th Floor Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p10.webp", "caption": "7th Floor Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p11.webp", "caption": "8th Floor Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p12.webp", "caption": "9th Floor Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p13.webp", "caption": "10th Floor Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p14.webp", "caption": "11th Floor Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p15.webp", "caption": "Roof Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p16.webp", "caption": "Section A", "group": "Elevations & Sections"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p17.webp", "caption": "Section B", "group": "Elevations & Sections"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p18.webp", "caption": "Section C", "group": "Elevations & Sections"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p19.webp", "caption": "East Elevation", "group": "Elevations & Sections"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p20.webp", "caption": "West Elevation", "group": "Elevations & Sections"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p21.webp", "caption": "North Elevation", "group": "Elevations & Sections"},
      {"url": "./src/assets/images/projects/point-cloud-p7/p22.webp", "caption": "South Elevation", "group": "Elevations & Sections"}
    ],
    "shortDesc": "Point cloud scan data converted into a detailed 3D Revit model for a hospital building.",
    "fullDesc": "Converted high-density point cloud scan data into a highly detailed 3D Revit model for a hospital building, capturing complex as-built architectural layouts and critical healthcare infrastructure.",
    "lod": "LOD 300",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk AutoCAD",
      "Navisworks"
    ],
    "clientRegion": "Czech Republic",
    "completionDate": "Mar 2024",
    "areaSqFt": "20,000 sq.ft",
    "keyFeatures": [
      "Transformed massive hospital laser scan data into a Point Cloud-verified 3D Revit as-built model",
      "Captured complex medical layouts, specialized healthcare partitions, and structural frameworks precisely",
      "Documented existing facility conditions without disrupting ongoing medical operations or active patient zones",
      "Provided a high-fidelity BIM baseline optimized for complex healthcare renovations, MEP coordination, and facility management"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Point Cloud to BIM"
  },


  {
    "id": "project-26",
    "title": "Ventilation/HVAC Coordinate BIM Project",
    "category": [
      "mep"
    ],
    "thumbnail": "./src/assets/images/projects/hvac1/p1.webp",
    "images": [
      {"url": "./src/assets/images/projects/hvac1/p1.webp", "caption": "Ventilation/HVAC Floor Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/hvac1/p2.webp", "caption": "Ventilation/HVAC 3D View", "group": "3D Views"},
      {"url": "./src/assets/images/projects/hvac1/p3.webp", "caption": "Ventilation?HVAC Clean 3D View", "group": "3D Views"}
    ],
    "shortDesc": "2D CAD Concept into 3D installation-ready Revit model for a HVAC system, including ductwork, piping, and equipment layout with LOD 350.",
    "fullDesc": "Fully developed a 3D Revit model for a HVAC system, integrating ductwork, piping, and equipment layout with precise dimensions and installation-ready details. The model was created from 2D CAD drawings and includes detailed annotations, schedules, and clash detection to ensure seamless construction.",
    "lod": "LOD 350",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk Autocad",
      "Navisworks"
    ],
    "clientRegion": "United Kingdom (London)",
    "completionDate": "Aug 2023",
    "areaSqFt": "20,000 sq.ft",
    "keyFeatures": [
      "Developed a detailed 3D Revit model integrating all HVAC ductwork, piping, and equipment layouts",
      "Converted 2D CAD drawings into precise, installation-ready 3D parametric components",
      "Included comprehensive technical annotations, accurate equipment schedules, and material take-offs",
      "Conducted automated clash detection to resolve spatial conflicts before on-site construction"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "MEP Systems HVAC Modeling"
  },

  
  {
    "id": "project-14",
    "title": "Eco Park Architectural Residential 3D BIM Model",
    "category": [
      "architecture"
    ],
    "thumbnail": "./src/assets/images/projects/eco-park/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/eco-park/t0.webp", "caption": "Architectural Residential Revit Model"},
      {"url": "./src/assets/images/projects/eco-park/p0.webp", "caption": "Architectural Residential Revit Model"},
      {"url": "./src/assets/images/projects/eco-park/p1.webp", "caption": "Architectural Residential Revit Model"},
      {"url": "./src/assets/images/projects/eco-park/p2.webp", "caption": "Architectural Residential Revit Model"},
      {"url": "./src/assets/images/projects/eco-park/p3.webp", "caption": "Architectural Residential Revit Model"},
      {"url": "./src/assets/images/projects/eco-park/p4.webp", "caption": "Architectural Residential Revit Model"}
    ],
    "shortDesc": "SketchUp models into a Revit As-Built model (LOD 300) to deliver high-fidelity parametric components and coordinated construction documentation",
    "fullDesc": "This process transforms static SketchUp geometry into intelligent, metadata-rich Revit models at LOD 300. By replacing shapes with parametric components, teams secure reliable coordination, automated scheduling, and flawless construction documentation.",
    "lod": "LOD 300",
    "softwareUsed": [
      "Autodesk Revit",
      "Sketchup",
      "AutoCAD"
    ],
    "clientRegion": "Malaysia (Kuala Lumpur)",
    "completionDate": "March 2024",
    "areaSqFt": "7,200 sq.ft",
    "keyFeatures": [
      "ranslates static SketchUp meshes into intelligent, dimensionally flexible Revit system and loadable families",
      "Embeds precise geometric data and critical non-graphical metadata for accurate construction verification",
      "Enables automated, clash-free floor plans, dynamic material schedules, and reliable building lifecycles"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Architecture Modeling"
  },


  {
    "id": "project-29",
    "title": "Point Cloud to Revit BIM Model",
    "category": [
      "point-cloud"
    ],
      "discipline": ["architecture", "point-cloud"],
      "buildingType": "residential",
    "thumbnail": "./src/assets/images/projects/twinworks-richmond/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/twinworks-richmond/p1.webp", "caption": "Point Cloud RCP File", "group": "3D Views"},
      {"url": "./src/assets/images/projects/twinworks-richmond/p2.webp", "caption": "3D BIM Model Revit Birds-eye View", "group": "3D Views"},
      {"url": "./src/assets/images/projects/twinworks-richmond/p3.webp", "caption": "3D BIM Model Revit Camera View", "group": "3D Views"},
      {"url": "./src/assets/images/projects/twinworks-richmond/p4.webp", "caption": "3D BIM Render View", "group": "3D Views"},
      {"url": "./src/assets/images/projects/twinworks-richmond/p5.webp", "caption": "IFC Export", "group": "3D Views"},
      {"url": "./src/assets/images/projects/twinworks-richmond/p6.webp", "caption": "Architectural Layout", "group": "Layout & Elevations"},
      {"url": "./src/assets/images/projects/twinworks-richmond/p7.webp", "caption": "Architectural Elevations", "group": "Layout & Elevations"},
      {"url": "./src/assets/images/projects/twinworks-richmond/p8.webp", "caption": "Architectural 3D Views", "group": "3D Views"}
    ],
    "shortDesc": "Accurate Scan-to-BIM conversion of point cloud data into detailed architectural Revit models.",
    "fullDesc": "High-precision Scan-to-BIM services transforming raw laser scan point cloud data into parametric, data-rich architectural Revit models. Deliverables include accurate as-built floor plans, walls, structures, and building components that reflect real-world conditions for renovation or facility management.",
    "lod": "LOD 300",
    "softwareUsed": [
      "Autodesk Revit",
      "AutoCAD"
    ],
    "clientRegion": "United States",
    "completionDate": "Sep 2025",
    "areaSqFt": "2,200 sq.ft",
    "keyFeatures": [
      "Transforming raw laser scan data into accurate as-built Revit models",
      "Intelligent architectural components with embedded data attributes",
      "Verification of model accuracy against original point cloud data",
      "Perfect foundational models for retrofits, extensions, and facility management"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Architecture Modeling"
  },


  {
    "id": "project-25",
    "title": "Healthcare Facility 3D BIM Model",
    "category": [
      "architecture",
      "mep",
      "autocad"
    ],
    "thumbnail": "./src/assets/images/projects/hlsl/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/hlsl/p0.webp", "caption": "Healthcare Facility 3D BIM Model"},
      {"url": "./src/assets/images/projects/hlsl/p1.webp", "caption": "Healthcare Facility 3D BIM Model"},
      {"url": "./src/assets/images/projects/hlsl/p2.webp", "caption": "Healthcare Facility 3D BIM Model"},
      {"url": "./src/assets/images/projects/hlsl/p3.webp", "caption": "Healthcare Facility 3D BIM Model"},
      {"url": "./src/assets/images/projects/hlsl/p4.webp", "caption": "Healthcare Facility 3D BIM Model"},
      {"url": "./src/assets/images/projects/hlsl/p5.webp", "caption": "Healthcare Facility 3D BIM Model"},
      {"url": "./src/assets/images/projects/hlsl/p6.webp", "caption": "Healthcare Facility 3D BIM Model"},
      {"url": "./src/assets/images/projects/hlsl/p7.webp", "caption": "Healthcare Facility 3D BIM Model"},
      {"url": "./src/assets/images/projects/hlsl/p8.webp", "caption": "Healthcare Facility 3D BIM Model"},
      {"url": "./src/assets/images/projects/hlsl/p9.webp", "caption": "Healthcare Facility 3D BIM Model"},
      {"url": "./src/assets/images/projects/hlsl/p10.webp", "caption": "Healthcare Facility 3D BIM Model"},
      {"url": "./src/assets/images/projects/hlsl/p11.webp", "caption": "Healthcare Facility 3D BIM Model"}
    ],
    "shortDesc": "2D CAD Concept to 3D Revit Architectural and MEP model (LOD 350) for a 65,000 sq.ft healthcare facility, featuring parametric facade elements and material schedules.",
    "fullDesc": "Developed a comprehensive 3D BIM model for a healthcare facility, integrating architectural and MEP systems with parametric facade elements and detailed material schedules.",
    "lod": "LOD 350",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk Autocad",
      "Navisworks"
    ],
    "clientRegion": "Bangladesh (Chittagong)",
    "completionDate": "Feb 2024",
    "areaSqFt": "65,000 sq.ft",
    "keyFeatures": [
      "2D CAD Concept to 3D Revit Architectural and MEP model (LOD 350)",
      "Phamaceutical cleanroom layout with MEP integration and compliance with ISO standards",
      "|Accurate Bill of Quantities (BOQ) and schedule tables",
      "Prepared model for retrofitting modern HVAC ductwork"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Architecture Modeling • MEP Systems • AutoCAD Services"
  },


  {
    "id": "project-28",
    "title": "Construction Drawing for a Restaurant",
    "category": [
      "architecture",
      "autocad"
    ],
    "discipline": ["architecture", "autocad"],
    "buildingType": "residential",
    "thumbnail": "./src/assets/images/projects/sazon-restaurant/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/sazon-restaurant/p1.webp", "caption": "Cover Sheet", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p2.webp", "caption": "Code Plan", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p3.webp", "caption": "Code Plan Cont.", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p4.webp", "caption": "Site Plan", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p5.webp", "caption": "Proposed Floor Plan", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p6.webp", "caption": "Proposed Roof Plan", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p7.webp", "caption": "Life Safety Plan", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p8.webp", "caption": "First Floor Kitchen Details", "group": "Details"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p9.webp", "caption": "First Floor Bar Details", "group": "Details"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p10.webp", "caption": "North and East Elevation", "group": "Elevation & Sections"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p11.webp", "caption": "South and West Elevation", "group": "Elevation & Sections"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p12.webp", "caption": "Building Section", "group": "Elevation & Sections"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p13.webp", "caption": "Building Section", "group": "Elevation & Sections"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p14.webp", "caption": "Wall and Footing Details", "group": "Details"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p15.webp", "caption": "Connection Details", "group": "Details"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p16.webp", "caption": "Window Schedule", "group": "Schedules"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p17.webp", "caption": "Door Schedule", "group": "Schedules"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p18.webp", "caption": "Interior Details", "group": "Details"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p19.webp", "caption": "Proposed Building Materials", "group": "Proposed Building"},
      {"url": "./src/assets/images/projects/sazon-restaurant/p20.webp", "caption": "Proposed Area Plan", "group": "Proposed Building"}
    ],
    "shortDesc": "Complete architectural construction plans detailing restaurant layouts, finishes, and structures.",
    "fullDesc": "A comprehensive architectural construction drawing set for a restaurant. This package features detailed dimensioned floor plans, precise dining seating layouts, interior wall elevations, millwork details, finish schedules, and life safety egress routes tailored for commercial food service.",
    "lod": "LOD 300",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk Autocad"
    ],
    "clientRegion": "United States",
    "completionDate": "Jul 2025",
    "areaSqFt": "6,000 sq.ft",
    "keyFeatures": [
      "Dimensioned layouts mapping out the dining area, bar, and restrooms.",
      "Optimized tables and pathways to maximize capacity and guest comfort",
      "Detailed wall treatments, built-in cabinetry, and millwork designs",
      "Architectural ceiling designs coordinating lighting and finish materials"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Architecture Modeling • Construction Drawing • Permit Set"
  },


  {
    "id": "project-16",
    "title": "Full Hotel Resort 3D BIM Model (Architectural & MEP",
    "category": [
      "architecture",
      "mep"
    ],
    "discipline": ["architecture", "autocad", "mep", "coordination"],
    "buildingType": "hospitality",
    "thumbnail": "./src/assets/images/projects/spa-lodge/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/spa-lodge/p1.webp", "caption": "3D BIM Model", "group": "Architectural 3D Views"},
      {"url": "./src/assets/images/projects/spa-lodge/p2.webp", "caption": "Cover Sheet", "group": "Architectural 3D Views"},
      {"url": "./src/assets/images/projects/spa-lodge/p3.webp", "caption": "First Floor Plan", "group": "Architectural Floor Plans"},
      {"url": "./src/assets/images/projects/spa-lodge/p4.webp", "caption": "Second Floor Plan", "group": "Architectural Floor Plans"},
      {"url": "./src/assets/images/projects/spa-lodge/p5.webp", "caption": "Architectural Elevations", "group": "Architectural Elevations"},
      {"url": "./src/assets/images/projects/spa-lodge/p6.webp", "caption": "Architectural Roof Plans", "group": "Architectural Floor Plans"},
      {"url": "./src/assets/images/projects/spa-lodge/p7.webp", "caption": "MEP Coordinations", "group": "MEP 3D Views"},
      {"url": "./src/assets/images/projects/spa-lodge/p8.webp", "caption": "Electrical Lighting Distributions", "group": "MEP Plans"},
      {"url": "./src/assets/images/projects/spa-lodge/p9.webp", "caption": "Heating Layout", "group": "MEP Plans"},
      {"url": "./src/assets/images/projects/spa-lodge/p10.webp", "caption": "Cold Water Supply Layout", "group": "MEP Plans"},
      {"url": "./src/assets/images/projects/spa-lodge/p11.webp", "caption": "Ventilation/HVAC Layout", "group": "MEP Plans"}
    ],
    "shortDesc": "Transformed 2D CAD drawings into a full functional 3D BIM model (LOD 350) for a hotel resort.",
    "fullDesc": "Developed a detailed drawing set and documentation report for a hotel resort project.",
    "lod": "LOD 350",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk Autocad",
      "Navisworks"
    ],
    "clientRegion": "United Kingdom (London)",
    "completionDate": "Jul 2024",
    "areaSqFt": "2,300 sq.ft",
    "keyFeatures": [
      "Hotel Resort 3D BIM Model with LOD 350",
      "Architectural and MEP coordination for efficient space utilization and system integration",
      "As built verification and clash detection to ensure design accuracy and constructability"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Architecture Modeling"
  },
  {
    "id": "project-24",
    "title": "Hotel Resort MEP 3D BIM Model",
    "category": [
      "mep"
    ],
    "thumbnail": "./src/assets/images/projects/spa-lodge-mep/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/spa-lodge-mep/p1.webp", "caption": "Hotel Resort 3D BIM Model"},
      {"url": "./src/assets/images/projects/spa-lodge-mep/p2.webp", "caption": "Hotel Resort 3D BIM Model"},
      {"url": "./src/assets/images/projects/spa-lodge-mep/p3.webp", "caption": "Hotel Resort 3D BIM Model"},
      {"url": "./src/assets/images/projects/spa-lodge-mep/p4.webp", "caption": "Hotel Resort 3D BIM Model"},
      {"url": "./src/assets/images/projects/spa-lodge-mep/p5.webp", "caption": "Hotel Resort 3D BIM Model"}
    ],
    "shortDesc": "Transformed 2D CAD drawings into a full functional MEP 3D BIM model (LOD 350) for a hotel resort.",
    "fullDesc": "Developed a detailed drawing set and documentation report for a hotel resort project.",
    "lod": "LOD 350",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk Autocad",
      "Navisworks"
    ],
    "clientRegion": "United Kingdom (London)",
    "completionDate": "Jul 2024",
    "areaSqFt": "2,300 sq.ft",
    "keyFeatures": [
      "Hotel Resort 3D BIM Model with LOD 350",
      "MEP coordination for efficient space utilization and system integration",
      "As built verification and clash detection to ensure design accuracy and constructability"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "MEP Modeling"
  },
  {
    "id": "project-06",
    "title": "East MC Kinny Architectural Residential 3D BIM Model",
    "category": [
      "architecture",
      "autocad"
    ],
    "thumbnail": "./src/assets/images/projects/east-mc-kinny/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/east-mc-kinny/p0.webp", "caption": "Architectural Residential Revit Model"},
      {"url": "./src/assets/images/projects/east-mc-kinny/p1.webp", "caption": "Architectural Residential Revit Model"},
      {"url": "./src/assets/images/projects/east-mc-kinny/p2.webp", "caption": "Architectural Residential Revit Model"},
      {"url": "./src/assets/images/projects/east-mc-kinny/p3.webp", "caption": "Architectural Residential Revit Model"},
      {"url": "./src/assets/images/projects/east-mc-kinny/p4.webp", "caption": "Architectural Residential Revit Model"},
      {"url": "./src/assets/images/projects/east-mc-kinny/p5.webp", "caption": "Architectural Residential Revit Model"},
      {"url": "./src/assets/images/projects/east-mc-kinny/p6.webp", "caption": "Architectural Residential Revit Model"},
      {"url": "./src/assets/images/projects/east-mc-kinny/p7.webp", "caption": "Architectural Residential Revit Model"},
      {"url": "./src/assets/images/projects/east-mc-kinny/p8.webp", "caption": "Architectural Residential Revit Model"},
      {"url": "./src/assets/images/projects/east-mc-kinny/p9.webp", "caption": "Architectural Residential Revit Model"},
      {"url": "./src/assets/images/projects/east-mc-kinny/p10.webp", "caption": "Architectural Residential Revit Model"}
    ],
    "shortDesc": "Transformed 3D Faro point cloud scan data into a Point Cloud-verified Revit As-Built model (LOD 400) for historic renovation.",
    "fullDesc": "Processed over 18GB of point cloud scan data (.e57 format) using Autodesk Recap Pro and imported into Revit. Reconstructed irregular historical brick masonry, tilted columns, original timber roof trusses, and exposed pipework with strict tolerance limits (<5mm deviation).",
    "lod": "LOD 400",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk ReCap Pro",
      "Faro Scene",
      "Navisworks"
    ],
    "clientRegion": "United States (Florida)",
    "completionDate": "March 2024",
    "areaSqFt": "4,000 sq.ft",
    "keyFeatures": [
      "Conceptual modeling is used for early-stage spatial programming, massing studies, and site analysis alignment",
      "Detailed design establishes precise multi-layered wall, floor, and roof assemblies with parametric components",
      "Multidisciplinary coordination federates architectural elements with structural and MEP models to run clash detection",
      "Construction documentation automatically generates dimensioned drawing packages, detailed component schedules, and standardized IFC/PDF exports"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Architecture Modeling • AutoCAD Services"
  },
  {
    "id": "project-07",
    "title": "HVAC 3D BIM Model for Office Building",
    "category": [
      "mep"
    ],
    "thumbnail": "./src/assets/images/projects/hvac2/p1.webp",
    "images": [
      {"url": "./src/assets/images/projects/hvac2/p1.webp", "caption": "HVAC 3D BIM Model for Office Building"},
      {"url": "./src/assets/images/projects/hvac2/p2.webp", "caption": "HVAC 3D BIM Model for Office Building"},
      {"url": "./src/assets/images/projects/hvac2/p3.webp", "caption": "HVAC 3D BIM Model for Office Building"}
    ],
    "shortDesc": "Concept to 3D Revit model for a HVAC system in an office building, including ductwork, piping, and equipment layout.",
    "fullDesc": "Developed a coordinated 3D Revit model from conceptual HVAC layouts for an office building, integrating precise ductwork, piping, and equipment layouts for construction readiness.",
    "lod": "LOD 300",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk Autocad",
      "Navisworks"
    ],
    "clientRegion": "United Kingdom (London)",
    "completionDate": "Aug 2023",
    "areaSqFt": "3,000 sq.ft",
    "keyFeatures": [
      "Developed a coordinated 3D Revit HVAC model for a commercial office building",
      "Integrated precise layouts for all ductwork, piping, and mechanical equipment",
      "Converted initial schematic concepts into detailed, installation-ready parametric components",
      "Optimized spatial routing to ensure seamless multidisciplinary coordination and construction readiness"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "MEP Systems"
  },
  {
    "id": "project-08",
    "title": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical",
    "category": [
      "architecture",
      "mep"
    ],
    "thumbnail": "./src/assets/images/projects/incepta/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/incepta/p1.webp", "caption": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical"},
      {"url": "./src/assets/images/projects/incepta/p2.webp", "caption": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical"},
      {"url": "./src/assets/images/projects/incepta/p3.webp", "caption": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical"},
      {"url": "./src/assets/images/projects/incepta/p4.webp", "caption": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical"},
      {"url": "./src/assets/images/projects/incepta/p5.webp", "caption": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical"},
      {"url": "./src/assets/images/projects/incepta/p6.webp", "caption": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical"},
      {"url": "./src/assets/images/projects/incepta/p7.webp", "caption": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical"},
      {"url": "./src/assets/images/projects/incepta/p8.webp", "caption": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical"},
      {"url": "./src/assets/images/projects/incepta/p9.webp", "caption": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical"},
      {"url": "./src/assets/images/projects/incepta/p10.webp", "caption": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical"},
      {"url": "./src/assets/images/projects/incepta/p11.webp", "caption": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical"},
      {"url": "./src/assets/images/projects/incepta/p12.webp", "caption": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical"},
      {"url": "./src/assets/images/projects/incepta/p13.webp", "caption": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical"},
      {"url": "./src/assets/images/projects/incepta/p15.webp", "caption": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical"},
      {"url": "./src/assets/images/projects/incepta/p16.webp", "caption": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical"},
      {"url": "./src/assets/images/projects/incepta/p17.webp", "caption": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical"},
      {"url": "./src/assets/images/projects/incepta/p18.webp", "caption": "Architectural & MEP 3D BIM Model for Incepta Pharmaceutical"}
    ],
    "shortDesc": "2D CAD Concept into 3D Revit model for a pharmaceutical facility, including architectural clean room and MEP systems.",
    "fullDesc": "Converted 2D CAD concepts into a high-fidelity 3D Revit model for a pharmaceutical facility, integrating specialized architectural cleanroom layouts with fully coordinated MEP systems to meet strict regulatory and construction compliance.",
    "lod": "LOD 400",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk AutoCAD",
      "Navisworks"
    ],
    "clientRegion": "Bangladesh (Dhaka)",
    "completionDate": "May 2022",
    "areaSqFt": "32,000 sq.ft",
    "keyFeatures": [
      "Transformed 2D CAD concepts into a compliant, high-fidelity 3D Revit model",
      "Modeled specialized architectural cleanroom layouts matching strict pharmaceutical standards",
      "Integrated fully coordinated MEP systems tailored for sterile facility operations",
      "Resolved spatial conflicts via clash detection for seamless, regulation-ready construction"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Architecture Modeling • MEP Systems"
  },
  {
    "id": "project-09",
    "title": "Marple Cross Architectural Residence 3D BIM Model",
    "category": [
      "architecture"
    ],
    "thumbnail": "./src/assets/images/projects/marple-cross/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/marple-cross/p1.webp", "caption": "Site Plan", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/marple-cross/p2.webp", "caption": "Ground Floor Layout", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/marple-cross/p3.webp", "caption": "First Floor Layout", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/marple-cross/p4.webp", "caption": "Elevation North and South", "group": "Elevation and Section Plan"},
      {"url": "./src/assets/images/projects/marple-cross/p5.webp", "caption": "Elevation East and West", "group": "Elevation and Section Plan"},
      {"url": "./src/assets/images/projects/marple-cross/p6.webp", "caption": "Architectural Sections", "group": "Elevation and Section Plan"},
      {"url": "./src/assets/images/projects/marple-cross/p7.webp", "caption": "Sectional and Joint Details", "group": "Elevation and Section Plan"},
      {"url": "./src/assets/images/projects/marple-cross/p8.webp", "caption": "Lighting Distributions", "group": "Electrical"},
      {"url": "./src/assets/images/projects/marple-cross/p9.webp", "caption": "Electrical Panel Board Details", "group": "Electrical"}
    ],
    "shortDesc": "Concept to 3D Revit model for a residential property, including detailed architectural elements and construction documentation.",
    "fullDesc": "Transformed schematic design concepts into a detailed 3D Revit model for a residential property, integrating precise architectural elements and automated construction documentation packages.",
    "lod": "LOD 300",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk AutoCAD",
      "Navisworks"
    ],
    "clientRegion": "United States (California)",
    "completionDate": "March 2024",
    "areaSqFt": "4,500 sq.ft",
    "keyFeatures": [
      "Developed a detailed 3D Revit model from initial residential schematic design concepts",
      "Modeled precise architectural elements including complex spatial layouts, fixtures, and finishes",
      "Generated automated, construction-ready documentation packages with dimensioned plans and sections",
      "Extracted accurate material take-offs and schedules to streamline project procurement"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Architecture Modeling"
  },


  {
    "id": "project-13",
    "title": "Point Cloud to Revit Conversion of a School Building",
    "category": [
      "point-cloud"
    ],
    "discipline": ["architecture", "autocad"],
    "buildingType": "educational",
    "thumbnail": "./src/assets/images/projects/point-cloud-p4/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/point-cloud-p4/p0.webp", "caption": "Point Cloud", "group": "Comparison"},
      {"url": "./src/assets/images/projects/point-cloud-p4/t1.webp", "caption": "3D View", "group": "Comparison"},
      {"url": "./src/assets/images/projects/point-cloud-p4/t2.webp", "caption": "3D Render View", "group": "3D Views"},
      {"url": "./src/assets/images/projects/point-cloud-p4/p2.webp", "caption": "3D Views", "group": "3D Views"},
      {"url": "./src/assets/images/projects/point-cloud-p4/p1.webp", "caption": "Cover Page", "group": "3D Views"},
      {"url": "./src/assets/images/projects/point-cloud-p4/p3.webp", "caption": "Ground Floor Plan", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p4/p4.webp", "caption": "1st Floor Plan", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p4/p5.webp", "caption": "2st Floor Plan", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p4/p6.webp", "caption": "3rd Floor Plan", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p4/p7.webp", "caption": "Roof Plan", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/point-cloud-p4/p8.webp", "caption": "Architectural Section", "group": "Architectural Sections & Elevations"},
      {"url": "./src/assets/images/projects/point-cloud-p4/p9.webp", "caption": "Architectural Section", "group": "Architectural Sections & Elevations"},
      {"url": "./src/assets/images/projects/point-cloud-p4/p10.webp", "caption": "East & West Elevations", "group": "Architectural Sections & Elevations"},
      {"url": "./src/assets/images/projects/point-cloud-p4/p11.webp", "caption": "North Elevation", "group": "Architectural Sections & Elevations"},
      {"url": "./src/assets/images/projects/point-cloud-p4/p12.webp", "caption": "South Elevation", "group": "Architectural Sections & Elevations"}
    ],
    "shortDesc": "Point cloud scan data converted into a detailed 3D Revit model for a residential property, including architectural elements.",
    "fullDesc": "Transformed raw point cloud scan data into a highly detailed 3D Revit model for a residential property, capturing precise architectural elements for accurate as-built documentation.",
    "lod": "LOD 300",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk AutoCAD",
      "Navisworks"
    ],
    "clientRegion": "Australia",
    "completionDate": "Jan 2024",
    "areaSqFt": "1,800 sq.ft",
    "keyFeatures": [
      "Converted high-density point cloud scan data into a Point Cloud-verified 3D Revit model",
      "Captured complex as-built residential architectural elements, including structural walls, fixtures, and finishes",
      "Eliminated manual measurement errors by modeling directly over registered laser scan data",
      "Provided a reliable, high-fidelity BIM foundation for future residential renovations and extensions"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Point Cloud to BIM"
  },


  {
    "id": "project-15",
    "title": "Point Cloud to Revit Conversion for Pražský Dům",
    "category": [
      "point-cloud"
    ],
    "discipline": ["architecture", "point-cloud"],
    "buildingType": "residential",
    "thumbnail": "./src/assets/images/projects/point-cloud-p6/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/point-cloud-p6/t0.webp", "caption": "Point Cloud to Revit Conversion for Pražský Dům"},
      {"url": "./src/assets/images/projects/point-cloud-p6/p0.webp", "caption": "Point Cloud to Revit Conversion for Pražský Dům"},
      {"url": "./src/assets/images/projects/point-cloud-p6/p1.webp", "caption": "Point Cloud to Revit Conversion for Pražský Dům"},
      {"url": "./src/assets/images/projects/point-cloud-p6/p2.webp", "caption": "Point Cloud to Revit Conversion for Pražský Dům"},
      {"url": "./src/assets/images/projects/point-cloud-p6/p3.webp", "caption": "Point Cloud to Revit Conversion for Pražský Dům"}
    ],
    "shortDesc": "Point cloud scan data converted into a detailed 3D Revit model for a historical residential building.",
    "fullDesc": "Converted high-density point cloud scan data into a highly detailed 3D Revit model for a historical residential building, capturing complex non-standard geometries for precise heritage preservation and documentation.",
    "lod": "LOD 300",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk AutoCAD",
      "Navisworks"
    ],
    "clientRegion": "Czech Republic",
    "completionDate": "Feb 2024",
    "areaSqFt": "35,000 sq.ft",
    "keyFeatures": [
      "Transformed raw laser scan data into a Point Cloud-verified 3D Revit as-built heritage model",
      "Captured complex, non-standard historic wall geometries, ornamental details, and structural anomalies",
      "Preserved architectural authenticity by modeling directly over registered high-density point clouds",
      "Provided a reliable, high-fidelity BIM foundation optimized for historic renovation and preservation workflows"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Point Cloud to BIM"
  },


  {
    "id": "project-20",
    "title": "Concept to Architectural Renovation BIM Model",
    "category": [
      "architecture"
    ],
    "thumbnail": "./src/assets/images/projects/renovation-p1/p1.webp",
    "images": [
      {"url": "./src/assets/images/projects/renovation-p1/p1.webp", "caption": "Cover sheet", "group": "Cover Sheet"},
      {"url": "./src/assets/images/projects/renovation-p1/p2.webp", "caption": "Site plan", "group": "Site Plan"},
      {"url": "./src/assets/images/projects/renovation-p1/p3.webp", "caption": "Ground Floor Plan (Existing & New Construction)", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/renovation-p1/p4.webp", "caption": "First Floor Plan (Existing & New Construction)", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/renovation-p1/p5.webp", "caption": "Roof Plan (Existing & New)", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/renovation-p1/p6.webp", "caption": "Demolition Plan", "group": "Architectural Plans"},
      {"url": "./src/assets/images/projects/renovation-p1/p7.webp", "caption": "Front & Rear Elevation (Existing & New Construction)", "group": "Architectural Elevations"},
      {"url": "./src/assets/images/projects/renovation-p1/p8.webp", "caption": "Left & Right Elevation (Existing & New Construction)", "group": "Architectural Elevations"},
      {"url": "./src/assets/images/projects/renovation-p1/p9.webp", "caption": "Building Sections", "group": "Architectural Section"}
    ],
    "shortDesc": "Architectural renovation BIM model for a private house, including detailed interior and exterior modeling.",
    "fullDesc": "Developed a high-fidelity architectural renovation BIM model for a private house, delivering comprehensive interior and exterior 3D parametric components to streamline modernization and spatial restructuring.",
    "lod": "LOD 300",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk AutoCAD",
      "Navisworks"
    ],
    "clientRegion": "United States (California)",
    "completionDate": "Jan 2024",
    "areaSqFt": "1,000 sq.ft",
    "keyFeatures": [
      "Modeled detailed as-built exterior facades, roof profiles, and architectural envelope assemblies",
      "Captured intricate interior finishes, custom cabinetry, spatial layouts, and internal structural elements",
      "Visualized exact design interventions by separating existing building fabrics from proposed renovation phases",
      "Generated precise, construction-ready documentation for seamless on-site structural alterations and fit-outs"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Architecture Modeling"
  },
  {
    "id": "project-21",
    "title": "Architectural Model with Detail Roof Structure (Residential)",
    "category": [
      "architecture"
    ],
    "thumbnail": "./src/assets/images/projects/sand-state/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/sand-state/p0.webp", "caption": "3D Roof View", "group": "3D View & Cover"},
      {"url": "./src/assets/images/projects/sand-state/p1.webp", "caption": "Cover Sheet", "group": "3D View & Cover"},
      {"url": "./src/assets/images/projects/sand-state/p2.webp", "caption": "Site Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/sand-state/p3.webp", "caption": "Floor Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/sand-state/p4.webp", "caption": "Roof Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/sand-state/p5.webp", "caption": "Roof Plan Details", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/sand-state/p6.webp", "caption": "Architectural Elevations", "group": "Elevations"},
      {"url": "./src/assets/images/projects/sand-state/p7.webp", "caption": "Structural Foundation", "group": "Foundation"}
    ],
    "shortDesc": "Architectural model with detailed roof structure modeling for a residential project.",
    "fullDesc": "Developed a high-fidelity architectural BIM model for a residential project, featuring precise 3D parametric roof structure modeling to ensure structural integrity and flawless construction alignment.",
    "lod": "LOD 300",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk AutoCAD",
      "Navisworks"
    ],
    "clientRegion": "United States",
    "completionDate": "Mar 2022",
    "areaSqFt": "4,000 sq.ft",
    "keyFeatures": [
      "Modeled complex, highly accurate residential roof structures including rafters, trusses, purlins, and framing",
      "Integrated detailed multi-layered roof assemblies, flashing zones, and integrated drainage profiles",
      "Coordinated structural load-bearing components seamlessly with the underlying architectural layouts",
      "Generated specialized roof framing plans, connection details, and precise lumber take-off schedules"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Architecture Modeling"
  },
  {
    "id": "project-22",
    "title": "Architectural & MEP BIM Model for a Spa Center",
    "category": [
      "architecture",
      "mep",
      "autocad"
    ],
    "thumbnail": "./src/assets/images/projects/spa-lodge-1/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/spa-lodge-1/p0.webp", "caption": "Architectural 3D View", "group": "3D Views"},
      {"url": "./src/assets/images/projects/spa-lodge-1/p1.webp", "caption": "Architectural 3D View", "group": "3D Views"},
      {"url": "./src/assets/images/projects/spa-lodge-1/p2.webp", "caption": "Architectural 3D View", "group": "3D Views"},
      {"url": "./src/assets/images/projects/spa-lodge-1/p3.webp", "caption": "Architectural 3D View", "group": "3D Views"},
      {"url": "./src/assets/images/projects/spa-lodge-1/p4.webp", "caption": "Architectural Floor Plan", "group": "Floor Plans"},
      {"url": "./src/assets/images/projects/spa-lodge-1/p5.webp", "caption": "Architectural Elevations", "group": "Elevations"},
      {"url": "./src/assets/images/projects/spa-lodge-1/p6.webp", "caption": "MEP 3D BIM Coordination View", "group": "MEP Distributions"},
      {"url": "./src/assets/images/projects/spa-lodge-1/p7.webp", "caption": "MEP Lighting Element Distributions", "group": "MEP Distributions"},
      {"url": "./src/assets/images/projects/spa-lodge-1/p8.webp", "caption": "MEP Heating Water Distributions", "group": "MEP Distributions"},
      {"url": "./src/assets/images/projects/spa-lodge-1/p9.webp", "caption": "MEP Water Supply Distributions", "group": "MEP Distributions"},
      {"url": "./src/assets/images/projects/spa-lodge-1/p10.webp", "caption": "MEP Ventilation/HVAC", "group": "MEP Distributions"}
    ],
    "shortDesc": "Architectural & MEP 3D BIM Model for a Spa Center",
    "fullDesc": "Developed a fully coordinated Architectural and MEP 3D BIM model for a spa center, integrating specialized wellness layouts with complex mechanical, electrical, and plumbing engineering systems.",
    "lod": "LOD 300",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk AutoCAD",
      "Navisworks"
    ],
    "clientRegion": "United Kingdom",
    "completionDate": "May 2023",
    "areaSqFt": "2,700 sq.ft",
    "keyFeatures": [
      "Designed detailed 3D architectural wellness layouts including treatment rooms, thermal zones, and wet areas",
      "Routed complex MEP services tailored for specialized spa equipment, high-humidity ventilation, and pool plumbing",
      "Executed multi-disciplinary clash detection to ensure zero interference between structural framing and heavy MEP utility lines",
      "Generated construction-ready parametric documentation packages, detailing installation specifics and exact equipment schedules"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Architecture Modeling • MEP Systems • AutoCAD Services"
  },


  {
    "id": "project-23",
    "title": "Construction City permit set for a Residential Project",
    "category": [
      "architecture",
      "mep",
      "autocad"
    ],
    "thumbnail": "./src/assets/images/projects/the-chase-house/t0.webp",
    "images": [
      {"url": "./src/assets/images/projects/the-chase-house/t0.webp", "caption": "Construction City permit set for a Residential Project"},
      {"url": "./src/assets/images/projects/the-chase-house/p0.webp", "caption": "Construction City permit set for a Residential Project"},
      {"url": "./src/assets/images/projects/the-chase-house/p01.webp", "caption": "Construction City permit set for a Residential Project"},
      {"url": "./src/assets/images/projects/the-chase-house/p1.webp", "caption": "Construction City permit set for a Residential Project"},
      {"url": "./src/assets/images/projects/the-chase-house/p2.webp", "caption": "Construction City permit set for a Residential Project"},
      {"url": "./src/assets/images/projects/the-chase-house/p3.webp", "caption": "Construction City permit set for a Residential Project"},
      {"url": "./src/assets/images/projects/the-chase-house/p4.webp", "caption": "Construction City permit set for a Residential Project"},
      {"url": "./src/assets/images/projects/the-chase-house/p5.webp", "caption": "Construction City permit set for a Residential Project"},
      {"url": "./src/assets/images/projects/the-chase-house/p6.webp", "caption": "Construction City permit set for a Residential Project"},
      {"url": "./src/assets/images/projects/the-chase-house/p7.webp", "caption": "Construction City permit set for a Residential Project"},
      {"url": "./src/assets/images/projects/the-chase-house/p8.webp", "caption": "Construction City permit set for a Residential Project"},
      {"url": "./src/assets/images/projects/the-chase-house/p9.webp", "caption": "Construction City permit set for a Residential Project"},
      {"url": "./src/assets/images/projects/the-chase-house/p10.webp", "caption": "Construction City permit set for a Residential Project"},
      {"url": "./src/assets/images/projects/the-chase-house/p11.webp", "caption": "Construction City permit set for a Residential Project"},
      {"url": "./src/assets/images/projects/the-chase-house/p12.webp", "caption": "Construction City permit set for a Residential Project"},
      {"url": "./src/assets/images/projects/the-chase-house/p13.webp", "caption": "Construction City permit set for a Residential Project"},
      {"url": "./src/assets/images/projects/the-chase-house/p14.webp", "caption": "Construction City permit set for a Residential Project"}
    ],
    "shortDesc": "Construction City permit set for a Residential Project, including detailed architectural and MEP documentation.",
    "fullDesc": "Developed a comprehensive, municipal-compliant construction permit set for a residential project, delivering fully coordinated architectural layouts and detailed MEP documentation to secure rapid city approval.",
    "lod": "LOD 300",
    "softwareUsed": [
      "Autodesk Revit",
      "Autodesk AutoCAD"
    ],
    "clientRegion": "United States",
    "completionDate": "Nov 2023",
    "areaSqFt": "4,000 sq.ft",
    "keyFeatures": [
      "Generated code-compliant architectural drawing sets including dimensioned site plans, egress routes, and building envelopes",
      "Integrated detailed MEP documentation covering residential load calculations, electrical circuitry, and plumbing schematics",
      "Enforced localized municipal zoning laws and building standards directly within the 3D parametric BIM environment",
      "Provided a completely coordinated, clash-resolved permit package to minimize city review cycles and construction delays"
    ],
    "externalUrl": "https://mirjariyadh.com.bd",
    "categoryName": "Architecture Modeling • MEP Systems • AutoCAD Services"
  }
];

var projectsData = PORTFOLIO_PROJECTS;

// Helper to determine building type if not explicitly set
function inferBuildingType(project) {
  if (project.buildingType) return project.buildingType;
  const text = `${project.title} ${project.shortDesc || ''} ${project.fullDesc || ''}`.toLowerCase();
  if (text.includes('pharma') || text.includes('incepta') || text.includes('cleanroom') || text.includes('clean room')) {
    return 'pharmaceutical';
  }
  if (text.includes('hospital') || text.includes('healthcare') || text.includes('clinic')) {
    return 'healthcare';
  }
  if (text.includes('hotel') || text.includes('resort') || text.includes('spa') || text.includes('lodge')) {
    return 'hospitality';
  }
  if (text.includes('school') || text.includes('gymnazium') || text.includes('university') || text.includes('education')) {
    return 'educational';
  }
  if (text.includes('office') || text.includes('commercial') || text.includes('city permit') || text.includes('retail')) {
    return 'commercial';
  }
  if (text.includes('industrial') || text.includes('plant') || text.includes('facility') || text.includes('warehouse')) {
    return 'industrial';
  }
  return 'residential';
}

// Helper to determine disciplines if not explicitly set
function inferDisciplines(project) {
  const cats = Array.isArray(project.category) ? project.category : [project.category || 'architecture'];
  const disciplines = new Set(cats);
  const text = `${project.title} ${project.shortDesc || ''} ${project.fullDesc || ''}`.toLowerCase();
  
  if (text.includes('clash') || text.includes('coordination') || text.includes('navisworks')) {
    disciplines.add('coordination');
  }
  if (text.includes('point cloud') || text.includes('scan to bim') || text.includes('laser scan') || text.includes('as-built')) {
    disciplines.add('point-cloud');
  }
  if (text.includes('mep') || text.includes('hvac') || text.includes('piping') || text.includes('plumbing') || text.includes('duct')) {
    disciplines.add('mep');
  }
  if (text.includes('cad') || text.includes('dwg') || text.includes('autocad') || text.includes('drafting')) {
    disciplines.add('autocad');
  }
  if (text.includes('architectur') || text.includes('revit') || text.includes('building')) {
    disciplines.add('architecture');
  }
  return Array.from(disciplines);
}

// Normalize all projects
PORTFOLIO_PROJECTS.forEach(project => {
  project.buildingType = inferBuildingType(project);
  project.discipline = inferDisciplines(project);
  if (!project.deliverables && project.keyFeatures) {
    project.deliverables = project.keyFeatures;
  }
});

// Query Utilities
var BIM_PROJECT_UTILS = {
  getAll() {
    return PORTFOLIO_PROJECTS;
  },
  
  getById(id) {
    if (!id) return null;
    const cleanId = String(id).trim().toLowerCase();
    const num = parseInt(cleanId.replace(/\D/g, ''), 10);
    return PORTFOLIO_PROJECTS.find(p => {
      if (p.id.toLowerCase() === cleanId) return true;
      if (`project-${cleanId}` === p.id.toLowerCase()) return true;
      if (!isNaN(num)) {
        if (p.id === `project-${String(num).padStart(2, '0')}`) return true;
        if (p.id === `project-${num}`) return true;
      }
      return false;
    }) || null;
  },

  filterProjects({ discipline = 'all', buildingType = 'all', query = '' } = {}) {
    const q = query ? query.toLowerCase().trim() : '';
    
    return PORTFOLIO_PROJECTS.filter(project => {
      // 1. Discipline match
      if (discipline && discipline !== 'all') {
        const discMatch = project.discipline && project.discipline.includes(discipline);
        const catMatch = Array.isArray(project.category) ? project.category.includes(discipline) : project.category === discipline;
        if (!discMatch && !catMatch) return false;
      }

      // 2. Building type match
      if (buildingType && buildingType !== 'all') {
        if (buildingType === 'industrial-pharma') {
          if (project.buildingType !== 'industrial' && project.buildingType !== 'pharmaceutical') return false;
        } else if (buildingType === 'hospitality-healthcare') {
          if (project.buildingType !== 'hospitality' && project.buildingType !== 'healthcare') return false;
        } else {
          if (project.buildingType !== buildingType) return false;
        }
      }

      // 3. Search query match
      if (q) {
        const searchable = [
          project.title,
          project.categoryName || '',
          project.buildingType || '',
          project.shortDesc || '',
          project.fullDesc || '',
          project.lod || '',
          project.clientRegion || '',
          ...(project.softwareUsed || []),
          ...(project.discipline || []),
          ...(Array.isArray(project.category) ? project.category : [project.category || ''])
        ].join(' ').toLowerCase();

        // Support multiple keywords, e.g. "point cloud residential" or "mep hvac"
        const tokens = q.split(/\s+/).filter(Boolean);
        const allTokensMatch = tokens.every(token => searchable.includes(token));
        if (!allTokensMatch) return false;
      }

      return true;
    });
  },

  getRelatedProjects(currentId, limit = 3) {
    const current = this.getById(currentId);
    if (!current) return PORTFOLIO_PROJECTS.slice(0, limit);

    const candidates = PORTFOLIO_PROJECTS.filter(p => p.id !== current.id);
    
    // Score based on similarity
    const scored = candidates.map(p => {
      let score = 0;
      if (p.buildingType === current.buildingType) score += 4;
      const commonDisciplines = (p.discipline || []).filter(d => (current.discipline || []).includes(d));
      score += commonDisciplines.length * 3;
      if (p.lod === current.lod) score += 1;
      return { project: p, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map(item => item.project);
  },

  getAdjacentProjects(currentId) {
    const index = PORTFOLIO_PROJECTS.findIndex(p => p.id === currentId);
    if (index === -1) {
      return { prev: null, next: null };
    }
    const prevIndex = (index - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length;
    const nextIndex = (index + 1) % PORTFOLIO_PROJECTS.length;
    return {
      prev: PORTFOLIO_PROJECTS[prevIndex],
      next: PORTFOLIO_PROJECTS[nextIndex]
    };
  }
};

if (typeof window !== 'undefined') {
  window.PORTFOLIO_PROJECTS = PORTFOLIO_PROJECTS;
  window.projectsData = PORTFOLIO_PROJECTS;
  window.BIM_PROJECT_UTILS = BIM_PROJECT_UTILS;
}


