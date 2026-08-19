# Mirja Riyadh - BIM & CAD Specialist Portfolio

Comprehensive BIM & CAD Portfolio website for **Mirja Riyadh**, Senior BIM Specialist in Bangladesh. Showcase of LOD Based Revit Architecture, MEP Coordination, Scan-to-BIM digital twins, and 2D AutoCAD approval sets.

## 🚀 Featured BIM Services

- **Revit Architecture (LOD Based Modeling)**: Parametric modeling, curtain wall detailing, BIM execution plans.
- **MEP Coordination**: High-density HVAC ducting, chilled water piping, cable tray routing, Navisworks hard clash detection.
- **Point Cloud to BIM (Scan-to-BIM)**: 3D Revit modeling from terrestrial laser scan point clouds (Leica Cyclone, ReCap).
- **AutoCAD Services**: 2D precision drafting, Rajuk municipal permit approval sets, bar bending schedules (BBS).

## 🛠️ Tech Stack & Architecture

- **Frontend**: Vite, HTML5, Tailwind CSS, JavaScript (ES Modules).
- **Pages**:
  - `index.html` - Main landing page with featured 3x3 project showcase.
  - `all-projects.html` - Dedicated page displaying all projects with live category & search filters.
  - `architecture.html` - Revit Architecture project showcase.
  - `mep.html` - MEP Coordination showcase.
  - `point-cloud.html` - Scan-to-BIM laser scan showcase.
  - `autocad.html` - 2D AutoCAD drafting showcase.
  - `project-details.html` - Deep-dive case study page with interactive before/after sliders.

## 💻 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## 📜 License


/**
 * Portfolio Projects Data
 * Full Projects list with structured metadata

 * category: Slugs for filtering ["architecture", "mep", "point-cloud", "autocad"]
 * discipline: Disciplines ["architecture", "mep", "point-cloud", "autocad", "coordination"]
 * buildingType: ["pharmaceutical", "residential", "commercial", "industrial", "hospitality", "healthcare", "educational"]
 * categoryName: Display text shown on website UI

 * Gallery Grouping Options (shown with group headings in project details page):
 * Option A (Image object group field):
 *   "images": [
 *     {"url": "./src/assets/images/projects/example/p0.webp", "caption": "Floor Plan", "group": "Architectural Plans"},
 *     {"url": "./src/assets/images/projects/example/p1.webp", "caption": "HVAC Duct Layout", "group": "MEP Coordination"}
 *   ]

 * Option B (galleryGroups structure):
 *   "galleryGroups": [
 *     {
 *       "name": "Architectural Plans",
 *       "images": [
 *         {"url": "./src/assets/images/projects/example/p0.webp", "caption": "Floor Plan"}
 *       ]
 *     }
 *   ]

 * buildingType
 *  "pharmaceutical" 
 *  "residential" 
 *  "commercial" 
 *  "industrial" 
 *  "hospitality" 
 *  "healthcare" 
 *  "educational"

 * discipline/category
 * "architecture"
 * "mep"
 * "point-cloud"
 * "autocad"
 * "coordination"

 */


© 2026 Mirja Riyadh. All rights reserved.
