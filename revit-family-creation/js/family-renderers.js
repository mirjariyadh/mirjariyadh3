/**
 * Revit Family Creation Service - Vector Schematics & Interactive Render Engine
 * Generates true engineering CAD/BIM views: Isometric 3D, Plan View, Elevations, and Connector Schematics.
 */

export function renderFamilySvg(viewType, sampleId, options = {}) {
  const isLight = document.documentElement.classList.contains('light-mode');
  const strokeMain = isLight ? '#0f172a' : '#38bdf8';
  const strokeSec = isLight ? '#475569' : '#0284c7';
  const fillSurface = isLight ? '#f1f5f9' : '#082f49';
  const fillAccent = isLight ? '#e2e8f0' : '#0c4a6e';
  const gridLine = isLight ? 'rgba(148, 163, 184, 0.25)' : 'rgba(56, 189, 248, 0.08)';
  const textFill = isLight ? '#334155' : '#94a3b8';
  const textHighlight = isLight ? '#0284c7' : '#38bdf8';
  const dimColor = isLight ? '#ea580c' : '#fb923c';

  switch (sampleId) {
    case 'ahu-rooftop-01':
      return renderAhuSvg(viewType, { strokeMain, strokeSec, fillSurface, fillAccent, gridLine, textFill, textHighlight, dimColor });
    case 'fcu-concealed-02':
      return renderFcuSvg(viewType, { strokeMain, strokeSec, fillSurface, fillAccent, gridLine, textFill, textHighlight, dimColor });
    case 'chilled-water-pump-03':
      return renderPumpSvg(viewType, { strokeMain, strokeSec, fillSurface, fillAccent, gridLine, textFill, textHighlight, dimColor });
    case 'modulating-control-valve-04':
      return renderValveSvg(viewType, { strokeMain, strokeSec, fillSurface, fillAccent, gridLine, textFill, textHighlight, dimColor });
    case 'slurry-mixing-vessel-05':
      return renderTankSvg(viewType, { strokeMain, strokeSec, fillSurface, fillAccent, gridLine, textFill, textHighlight, dimColor });
    case 'pressure-booster-skid-06':
      return renderBoosterSvg(viewType, { strokeMain, strokeSec, fillSurface, fillAccent, gridLine, textFill, textHighlight, dimColor });
    case 'commercial-entrance-door-07':
      return renderDoorSvg(viewType, { strokeMain, strokeSec, fillSurface, fillAccent, gridLine, textFill, textHighlight, dimColor });
    case 'louvered-access-panel-08':
    default:
      return renderPanelSvg(viewType, { strokeMain, strokeSec, fillSurface, fillAccent, gridLine, textFill, textHighlight, dimColor });
  }
}

// 1. AHU Rooftop Unit SVG Renderer
function renderAhuSvg(viewType, c) {
  if (viewType === 'iso') {
    return `
      <svg viewBox="0 0 800 500" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="iso-grid-ahu" width="40" height="23" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 40 23 M 0 23 L 40 0" fill="none" stroke="${c.gridLine}" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#iso-grid-ahu)" />
        
        <!-- Roof Curb Base -->
        <polygon points="180,360 480,440 680,340 380,260" fill="${c.fillAccent}" opacity="0.6" stroke="${c.strokeSec}" stroke-width="1.5" />
        
        <!-- Main Cabinet Body -->
        <polygon points="190,340 480,418 480,240 190,162" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" />
        <polygon points="480,418 670,320 670,142 480,240" fill="${c.fillAccent}" stroke="${c.strokeMain}" stroke-width="2" />
        <polygon points="190,162 480,240 670,142 380,64" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" opacity="0.9" />

        <!-- Access Doors & Seams -->
        <line x1="285" y1="188" x2="285" y2="366" stroke="${c.strokeSec}" stroke-width="1.5" stroke-dasharray="4 2" />
        <line x1="380" y1="213" x2="380" y2="391" stroke="${c.strokeSec}" stroke-width="1.5" stroke-dasharray="4 2" />
        
        <!-- Economizer Hood -->
        <polygon points="150,280 200,295 200,210 150,195" fill="${c.fillAccent}" stroke="${c.strokeMain}" stroke-width="1.5" />
        <line x1="150" y1="210" x2="200" y2="225" stroke="${c.strokeMain}" stroke-width="1" />
        <line x1="150" y1="235" x2="200" y2="250" stroke="${c.strokeMain}" stroke-width="1" />
        <line x1="150" y1="260" x2="200" y2="275" stroke="${c.strokeMain}" stroke-width="1" />

        <!-- Supply Air Duct Collar (Top/Side Discharge) -->
        <polygon points="530,214 620,168 620,190 530,236" fill="#3b82f6" fill-opacity="0.3" stroke="#3b82f6" stroke-width="2" />
        <circle cx="575" cy="202" r="6" fill="#3b82f6" />
        
        <!-- Return Air Duct Collar -->
        <polygon points="410,398 460,372 460,340 410,366" fill="#ec4899" fill-opacity="0.3" stroke="#ec4899" stroke-width="2" />
        
        <!-- Condensate Drain Connector -->
        <circle cx="210" cy="350" r="5" fill="#f97316" stroke="#fff" stroke-width="1.5" />
        
        <!-- Power Knockout Junction -->
        <rect x="635" y="220" width="16" height="22" fill="#eab308" stroke="#ca8a04" stroke-width="1.5" />

        <!-- Dimension Callout Overlay -->
        <path d="M 170,370 L 170,390 M 480,450 L 480,470" stroke="${c.dimColor}" stroke-width="1" />
        <line x1="170" y1="385" x2="480" y2="465" stroke="${c.dimColor}" stroke-width="1.5" marker-start="url(#dot)" />
        <text x="310" y="445" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">Length: 104.0" (2,642 mm)</text>

        <line x1="495" y1="418" x2="495" y2="240" stroke="${c.dimColor}" stroke-width="1.5" />
        <text x="505" y="330" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">H: 50.0" (1,270 mm)</text>

        <!-- Connector Legend Badges -->
        <g transform="translate(40, 40)">
          <rect width="220" height="96" rx="4" fill="rgba(15,23,42,0.85)" stroke="rgba(56,189,248,0.3)" />
          <text x="12" y="22" font-family="monospace" font-size="11" font-weight="bold" fill="${c.textHighlight}">REVIT MEP CONNECTORS</text>
          <circle cx="18" cy="40" r="4" fill="#3b82f6" />
          <text x="30" y="44" font-family="sans-serif" font-size="10" fill="#cbd5e1">Supply Air Duct: 24"x20"</text>
          <circle cx="18" cy="58" r="4" fill="#ec4899" />
          <text x="30" y="62" font-family="sans-serif" font-size="10" fill="#cbd5e1">Return Air Duct: 24"x22"</text>
          <circle cx="18" cy="76" r="4" fill="#f97316" />
          <text x="30" y="80" font-family="sans-serif" font-size="10" fill="#cbd5e1">Condensate Drain: 1-1/4" NPT</text>
        </g>
      </svg>
    `;
  } else if (viewType === 'top') {
    return `
      <svg viewBox="0 0 800 450" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="none" stroke="${c.gridLine}" stroke-width="1" />
        <!-- Top Plan View Outline -->
        <rect x="140" y="80" width="520" height="260" rx="4" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" />
        <line x1="280" y1="80" x2="280" y2="340" stroke="${c.strokeSec}" stroke-width="1.5" stroke-dasharray="6 3" />
        <line x1="440" y1="80" x2="440" y2="340" stroke="${c.strokeSec}" stroke-width="1.5" stroke-dasharray="6 3" />
        
        <!-- Economizer Louver Hood (Left) -->
        <rect x="80" y="110" width="60" height="200" fill="${c.fillAccent}" stroke="${c.strokeMain}" stroke-width="1.5" />
        <line x1="95" y1="110" x2="95" y2="310" stroke="${c.strokeSec}" />
        <line x1="110" y1="110" x2="110" y2="310" stroke="${c.strokeSec}" />
        <line x1="125" y1="110" x2="125" y2="310" stroke="${c.strokeSec}" />

        <!-- Supply Air Opening -->
        <rect x="490" y="110" width="130" height="100" fill="#3b82f6" fill-opacity="0.25" stroke="#3b82f6" stroke-width="2" />
        <line x1="490" y1="110" x2="620" y2="210" stroke="#3b82f6" stroke-width="1" />
        <line x1="620" y1="110" x2="490" y2="210" stroke="#3b82f6" stroke-width="1" />
        <text x="500" y="235" font-family="monospace" font-size="11" fill="#3b82f6" font-weight="bold">SUPPLY DUCT 24"x20"</text>

        <!-- Return Air Opening -->
        <rect x="300" y="120" width="110" height="120" fill="#ec4899" fill-opacity="0.25" stroke="#ec4899" stroke-width="2" />
        <line x1="300" y1="120" x2="410" y2="240" stroke="#ec4899" stroke-width="1" />
        <line x1="410" y1="120" x2="300" y2="240" stroke="#ec4899" stroke-width="1" />
        <text x="305" y="265" font-family="monospace" font-size="11" fill="#ec4899" font-weight="bold">RETURN 24"x22"</text>

        <!-- Dimension Lines -->
        <line x1="140" y1="50" x2="660" y2="50" stroke="${c.dimColor}" stroke-width="1.5" />
        <text x="350" y="42" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">Length: 104.0" (2,642 mm)</text>

        <line x1="690" y1="80" x2="690" y2="340" stroke="${c.dimColor}" stroke-width="1.5" />
        <text x="700" y="215" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">Width: 58.0"</text>

        <!-- View Title Block -->
        <text x="40" y="415" font-family="monospace" font-size="13" font-weight="bold" fill="${c.textHighlight}">REVIT PLAN VIEW (LEVEL / TOP ELEVATION 0'-0")</text>
      </svg>
    `;
  } else if (viewType === 'front') {
    return `
      <svg viewBox="0 0 800 450" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="none" stroke="${c.gridLine}" stroke-width="1" />
        
        <!-- Roof Curb -->
        <rect x="160" y="280" width="480" height="50" fill="${c.fillAccent}" stroke="${c.strokeSec}" stroke-width="1.5" />
        <text x="360" y="310" font-family="monospace" font-size="11" fill="${c.textFill}">ROOF CURB 18" (457 mm)</text>

        <!-- Main Enclosure -->
        <rect x="150" y="100" width="500" height="180" rx="3" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" />
        
        <!-- Access Panel Latches -->
        <circle cx="210" cy="190" r="4" fill="${c.strokeSec}" />
        <circle cx="340" cy="190" r="4" fill="${c.strokeSec}" />
        <circle cx="470" cy="190" r="4" fill="${c.strokeSec}" />
        <circle cx="600" cy="190" r="4" fill="${c.strokeSec}" />

        <!-- Seams -->
        <line x1="280" y1="100" x2="280" y2="280" stroke="${c.strokeSec}" stroke-width="1.5" />
        <line x1="410" y1="100" x2="410" y2="280" stroke="${c.strokeSec}" stroke-width="1.5" />
        <line x1="540" y1="100" x2="540" y2="280" stroke="${c.strokeSec}" stroke-width="1.5" />

        <!-- Dimensions -->
        <line x1="150" y1="70" x2="650" y2="70" stroke="${c.dimColor}" stroke-width="1.5" />
        <text x="350" y="62" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">Overall Casing: 104.0"</text>

        <line x1="110" y1="100" x2="110" y2="330" stroke="${c.dimColor}" stroke-width="1.5" />
        <text x="40" y="220" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">Height: 50.0"</text>

        <!-- Title -->
        <text x="40" y="415" font-family="monospace" font-size="13" font-weight="bold" fill="${c.textHighlight}">REVIT FRONT ELEVATION VIEW</text>
      </svg>
    `;
  } else {
    // Connector Diagram
    return `
      <svg viewBox="0 0 800 450" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="none" stroke="${c.gridLine}" stroke-width="1" />
        <rect x="180" y="90" width="440" height="240" rx="6" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" stroke-dasharray="4 2" />
        <text x="330" y="125" font-family="monospace" font-size="13" font-weight="bold" fill="${c.textHighlight}">REVIT MEP PORT MAP</text>

        <!-- MEP 01: Supply -->
        <g transform="translate(480, 160)">
          <circle cx="0" cy="0" r="18" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="2" />
          <path d="M -6 -6 L 6 0 L -6 6 Z" fill="#3b82f6" />
          <line x1="22" y1="0" x2="120" y2="0" stroke="#3b82f6" stroke-width="1.5" />
          <text x="130" y="4" font-family="monospace" font-size="11" font-weight="bold" fill="#3b82f6">MEP-01: Supply Air [OUT]</text>
          <text x="130" y="18" font-family="sans-serif" font-size="10" fill="${c.textFill}">24"x20" Rect / 2,700 CFM</text>
        </g>

        <!-- MEP 02: Return -->
        <g transform="translate(260, 180)">
          <circle cx="0" cy="0" r="18" fill="#ec4899" fill-opacity="0.2" stroke="#ec4899" stroke-width="2" />
          <path d="M 6 -6 L -6 0 L 6 6 Z" fill="#ec4899" />
          <line x1="-22" y1="0" x2="-80" y2="0" stroke="#ec4899" stroke-width="1.5" />
          <text x="-210" y="4" font-family="monospace" font-size="11" font-weight="bold" fill="#ec4899">MEP-02: Return Air [IN]</text>
          <text x="-210" y="18" font-family="sans-serif" font-size="10" fill="${c.textFill}">24"x22" Rect / System Flow</text>
        </g>

        <!-- MEP 03: Drain -->
        <g transform="translate(240, 290)">
          <circle cx="0" cy="0" r="14" fill="#f97316" fill-opacity="0.2" stroke="#f97316" stroke-width="2" />
          <path d="M 0 -5 L 0 5" stroke="#f97316" stroke-width="2" />
          <line x1="-18" y1="0" x2="-70" y2="0" stroke="#f97316" stroke-width="1.5" />
          <text x="-200" y="4" font-family="monospace" font-size="11" font-weight="bold" fill="#f97316">MEP-03: Drain [OUT]</text>
          <text x="-200" y="18" font-family="sans-serif" font-size="10" fill="${c.textFill}">1-1/4" NPT / Gravity Slope</text>
        </g>

        <!-- MEP 04: Power -->
        <g transform="translate(560, 270)">
          <circle cx="0" cy="0" r="14" fill="#eab308" fill-opacity="0.2" stroke="#eab308" stroke-width="2" />
          <path d="M -3 -6 L 2 0 L -2 0 L 3 6" fill="none" stroke="#eab308" stroke-width="2" />
          <line x1="18" y1="0" x2="60" y2="0" stroke="#eab308" stroke-width="1.5" />
          <text x="70" y="4" font-family="monospace" font-size="11" font-weight="bold" fill="#eab308">MEP-04: Power [IN]</text>
          <text x="70" y="18" font-family="sans-serif" font-size="10" fill="${c.textFill}">460V, 3Ph / MCA 18.2A</text>
        </g>
      </svg>
    `;
  }
}

// 2. Centrifugal Pump SVG Renderer
function renderPumpSvg(viewType, c) {
  return `
    <svg viewBox="0 0 800 450" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-pump" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="${c.gridLine}" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pump)" />

      <!-- Structural Base Channel -->
      <polygon points="120,340 680,340 640,380 80,380" fill="${c.fillAccent}" stroke="${c.strokeMain}" stroke-width="2" />
      <rect x="80" y="380" width="560" height="20" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="1.5" />

      <!-- Pump Volute (Spiral Casing) -->
      <circle cx="250" cy="240" r="75" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2.5" />
      <circle cx="250" cy="240" r="45" fill="${c.fillAccent}" stroke="${c.strokeSec}" stroke-width="1.5" />

      <!-- Suction Inlet Flange (Horizontal) -->
      <polygon points="110,215 175,215 175,265 110,265" fill="${c.fillAccent}" stroke="${c.strokeMain}" stroke-width="2" />
      <rect x="95" y="205" width="15" height="70" rx="2" fill="#10b981" stroke="#059669" stroke-width="2" />
      <text x="40" y="245" font-family="monospace" font-size="11" font-weight="bold" fill="#10b981">SUCTION 3"</text>

      <!-- Discharge Flange (Vertical Top) -->
      <polygon points="225,165 275,165 275,100 225,100" fill="${c.fillAccent}" stroke="${c.strokeMain}" stroke-width="2" />
      <rect x="215" y="85" width="70" height="15" rx="2" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
      <text x="220" y="70" font-family="monospace" font-size="11" font-weight="bold" fill="#06b6d4">DISCHARGE 2.5"</text>

      <!-- Coupling Guard -->
      <rect x="325" y="210" width="60" height="60" rx="3" fill="${c.fillSurface}" stroke="${c.strokeSec}" stroke-width="1.5" stroke-dasharray="3 3" />
      <text x="330" y="245" font-family="monospace" font-size="10" fill="${c.textFill}">COUPLING</text>

      <!-- TEFC Motor Cylinder -->
      <rect x="385" y="170" width="220" height="140" rx="6" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" />
      <!-- Motor Fins -->
      <line x1="410" y1="170" x2="410" y2="310" stroke="${c.strokeSec}" stroke-width="1.5" />
      <line x1="440" y1="170" x2="440" y2="310" stroke="${c.strokeSec}" stroke-width="1.5" />
      <line x1="470" y1="170" x2="470" y2="310" stroke="${c.strokeSec}" stroke-width="1.5" />
      <line x1="500" y1="170" x2="500" y2="310" stroke="${c.strokeSec}" stroke-width="1.5" />
      <line x1="530" y1="170" x2="530" y2="310" stroke="${c.strokeSec}" stroke-width="1.5" />

      <!-- Motor Fan Shroud -->
      <path d="M 605 180 L 630 190 L 630 290 L 605 300 Z" fill="${c.fillAccent}" stroke="${c.strokeMain}" stroke-width="1.5" />

      <!-- Conduit Junction Box -->
      <rect x="440" y="140" width="50" height="30" fill="#eab308" stroke="#ca8a04" stroke-width="1.5" />
      <text x="445" y="160" font-family="monospace" font-size="9" fill="#000" font-weight="bold">460V</text>

      <!-- Dimension Overlays -->
      <line x1="80" y1="420" x2="640" y2="420" stroke="${c.dimColor}" stroke-width="1.5" />
      <text x="310" y="435" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">Base Length: 54.0" (1,372 mm)</text>

      <line x1="660" y1="85" x2="660" y2="400" stroke="${c.dimColor}" stroke-width="1.5" />
      <text x="670" y="245" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">H: 28.0"</text>
    </svg>
  `;
}

// 3. Modulating Control Valve SVG Renderer
function renderValveSvg(viewType, c) {
  return `
    <svg viewBox="0 0 800 450" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-valve" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="${c.gridLine}" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-valve)" />

      <!-- Valve Flanges & Pipe Body -->
      <rect x="180" y="260" width="30" height="110" rx="2" fill="#0284c7" stroke="${c.strokeMain}" stroke-width="2" />
      <circle cx="195" cy="280" r="4" fill="#fff" />
      <circle cx="195" cy="350" r="4" fill="#fff" />
      
      <rect x="510" y="260" width="30" height="110" rx="2" fill="#0284c7" stroke="${c.strokeMain}" stroke-width="2" />
      <circle cx="525" cy="280" r="4" fill="#fff" />
      <circle cx="525" cy="350" r="4" fill="#fff" />

      <!-- Valve Center Bulb / Globe Casing -->
      <circle cx="360" cy="315" r="65" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" />
      
      <!-- Flow Direction Arrow -->
      <path d="M 270 315 L 450 315 M 430 300 L 450 315 L 430 330" fill="none" stroke="#22c55e" stroke-width="3" />
      <text x="325" y="340" font-family="monospace" font-size="11" font-weight="bold" fill="#22c55e">FLOW Cv 110</text>

      <!-- Valve Neck & Thermal Yoke -->
      <rect x="335" y="180" width="50" height="70" fill="${c.fillAccent}" stroke="${c.strokeMain}" stroke-width="2" />
      <line x1="360" y1="180" x2="360" y2="250" stroke="${c.strokeSec}" stroke-width="3" />

      <!-- Motorized Electronic Actuator Enclosure -->
      <rect x="290" y="70" width="140" height="110" rx="6" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2.5" />
      <circle cx="360" cy="115" r="24" fill="${c.fillAccent}" stroke="${c.strokeSec}" stroke-width="1.5" />
      <!-- Indicator Dial -->
      <line x1="360" y1="115" x2="378" y2="105" stroke="#ef4444" stroke-width="2.5" />

      <!-- Wiring Conduit Terminal Knockout -->
      <rect x="420" y="130" width="25" height="20" fill="#eab308" stroke="#ca8a04" stroke-width="1.5" />
      <text x="455" y="145" font-family="monospace" font-size="10" font-weight="bold" fill="#eab308">24VAC / 0-10V</text>

      <!-- Dimensions -->
      <line x1="180" y1="395" x2="540" y2="395" stroke="${c.dimColor}" stroke-width="1.5" />
      <text x="310" y="415" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">Face-to-Face: 9.0" (229 mm)</text>

      <line x1="565" y1="70" x2="565" y2="370" stroke="${c.dimColor}" stroke-width="1.5" />
      <text x="575" y="220" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">Height: 17.2"</text>
    </svg>
  `;
}

// 4. Industrial Agitated Tank SVG Renderer
function renderTankSvg(viewType, c) {
  return `
    <svg viewBox="0 0 800 450" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-tank" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="${c.gridLine}" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-tank)" />

      <!-- Support Legs -->
      <rect x="250" y="320" width="22" height="90" fill="${c.fillAccent}" stroke="${c.strokeMain}" stroke-width="1.5" />
      <rect x="450" y="320" width="22" height="90" fill="${c.fillAccent}" stroke="${c.strokeMain}" stroke-width="1.5" />

      <!-- Bottom Dished Head (ASME Torispherical) -->
      <path d="M 230 290 Q 360 360 490 290 Z" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" />
      
      <!-- Cylindrical Shell with Cooling Jacket -->
      <rect x="230" y="140" width="260" height="150" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" />
      <!-- Dimple Jacket Strakes -->
      <line x1="240" y1="160" x2="240" y2="280" stroke="${c.strokeSec}" stroke-width="1" stroke-dasharray="3 3" />
      <line x1="480" y1="160" x2="480" y2="280" stroke="${c.strokeSec}" stroke-width="1" stroke-dasharray="3 3" />

      <!-- Top Dished Head -->
      <path d="M 230 140 Q 360 90 490 140 Z" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" />

      <!-- Top Gear Motor Agitator Assembly -->
      <rect x="330" y="45" width="60" height="45" fill="${c.fillAccent}" stroke="${c.strokeMain}" stroke-width="2" />
      <circle cx="360" cy="30" r="14" fill="#3b82f6" stroke="${c.strokeMain}" stroke-width="1.5" />
      
      <!-- Agitator Shaft & Impeller (Ghosted internal) -->
      <line x1="360" y1="90" x2="360" y2="300" stroke="#0284c7" stroke-width="3" stroke-dasharray="4 2" />
      <path d="M 310 280 L 410 280 M 310 240 L 410 240" stroke="#0284c7" stroke-width="3" stroke-dasharray="4 2" />

      <!-- Process Nozzles (MEP Connectors) -->
      <rect x="260" y="100" width="30" height="14" rx="2" fill="#10b981" stroke="#059669" stroke-width="1.5" />
      <text x="180" y="112" font-family="monospace" font-size="10" font-weight="bold" fill="#10b981">INLET 3"</text>

      <rect x="345" y="340" width="30" height="18" rx="2" fill="#10b981" stroke="#059669" stroke-width="1.5" />
      <text x="390" y="355" font-family="monospace" font-size="10" font-weight="bold" fill="#10b981">DRAIN 3"</text>

      <rect x="215" y="180" width="16" height="25" rx="2" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
      <text x="135" y="195" font-family="monospace" font-size="10" font-weight="bold" fill="#06b6d4">JACKET IN</text>

      <!-- Dimensions -->
      <line x1="230" y1="430" x2="490" y2="430" stroke="${c.dimColor}" stroke-width="1.5" />
      <text x="310" y="445" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">Dia: 84.0" (2,134 mm)</text>

      <line x1="530" y1="20" x2="530" y2="410" stroke="${c.dimColor}" stroke-width="1.5" />
      <text x="540" y="215" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">H: 178.0" (4,521 mm)</text>
    </svg>
  `;
}

// 5. Domestic Booster Skid SVG
function renderBoosterSvg(viewType, c) {
  return `
    <svg viewBox="0 0 800 450" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-booster" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="${c.gridLine}" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-booster)" />

      <!-- Skid Frame Base -->
      <rect x="120" y="340" width="560" height="35" rx="3" fill="${c.fillAccent}" stroke="${c.strokeMain}" stroke-width="2" />
      
      <!-- 3 Vertical Multi-Stage Pumps -->
      <!-- Pump 1 -->
      <rect x="180" y="160" width="50" height="180" rx="3" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" />
      <circle cx="205" cy="140" r="18" fill="#3b82f6" stroke="${c.strokeMain}" stroke-width="1.5" />
      <!-- Pump 2 -->
      <rect x="290" y="160" width="50" height="180" rx="3" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" />
      <circle cx="315" cy="140" r="18" fill="#3b82f6" stroke="${c.strokeMain}" stroke-width="1.5" />
      <!-- Pump 3 -->
      <rect x="400" y="160" width="50" height="180" rx="3" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" />
      <circle cx="425" cy="140" r="18" fill="#3b82f6" stroke="${c.strokeMain}" stroke-width="1.5" />

      <!-- Suction Header Manifold (Bottom) -->
      <rect x="140" y="295" width="340" height="24" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
      <text x="80" y="312" font-family="monospace" font-size="10" font-weight="bold" fill="#06b6d4">SUCTION 6"</text>

      <!-- Discharge Header Manifold (Middle) -->
      <rect x="140" y="235" width="340" height="24" rx="3" fill="#10b981" stroke="#059669" stroke-width="2" />
      <text x="70" y="252" font-family="monospace" font-size="10" font-weight="bold" fill="#10b981">DISCHARGE 6"</text>

      <!-- Surge Diaphragm Tank (Right) -->
      <rect x="480" y="120" width="65" height="170" rx="30" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" />
      <text x="488" y="200" font-family="monospace" font-size="9" fill="${c.textFill}" font-weight="bold">ASME TANK</text>

      <!-- VFD Control Enclosure -->
      <rect x="575" y="110" width="85" height="130" rx="4" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" />
      <rect x="590" y="130" width="55" height="35" fill="#0f172a" stroke="${c.strokeSec}" stroke-width="1" />
      <text x="595" y="152" font-family="monospace" font-size="9" fill="#22c55e">NEMA 4X</text>

      <!-- Dimensions -->
      <line x1="120" y1="395" x2="680" y2="395" stroke="${c.dimColor}" stroke-width="1.5" />
      <text x="350" y="415" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">Length: 92.0" (2,337 mm)</text>

      <line x1="700" y1="110" x2="700" y2="375" stroke="${c.dimColor}" stroke-width="1.5" />
      <text x="710" y="245" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">H: 80.0"</text>
    </svg>
  `;
}

// 6. Fan Coil Unit SVG
function renderFcuSvg(viewType, c) {
  return `
    <svg viewBox="0 0 800 450" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-fcu" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="${c.gridLine}" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-fcu)" />

      <!-- Ceiling Hanger Rods -->
      <line x1="200" y1="40" x2="200" y2="180" stroke="${c.strokeSec}" stroke-width="2" stroke-dasharray="4 2" />
      <line x1="600" y1="40" x2="600" y2="180" stroke="${c.strokeSec}" stroke-width="2" stroke-dasharray="4 2" />

      <!-- Low Profile Casing (11.5" Height) -->
      <rect x="180" y="180" width="440" height="130" rx="3" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" />
      
      <!-- Supply Duct Collar (Front) -->
      <rect x="220" y="200" width="280" height="70" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="2" />
      <text x="290" y="242" font-family="monospace" font-size="11" font-weight="bold" fill="#3b82f6">SUPPLY COLLAR 10"x30"</text>

      <!-- 4-Pipe Hydronic Stubs (Right) -->
      <circle cx="530" cy="210" r="8" fill="#0284c7" stroke="#fff" stroke-width="1.5" />
      <text x="545" y="215" font-family="monospace" font-size="9" fill="#0284c7" font-weight="bold">CHWS 3/4"</text>

      <circle cx="530" cy="235" r="8" fill="#0369a1" stroke="#fff" stroke-width="1.5" />
      <text x="545" y="240" font-family="monospace" font-size="9" fill="#0369a1" font-weight="bold">CHWR 3/4"</text>

      <circle cx="530" cy="260" r="7" fill="#ef4444" stroke="#fff" stroke-width="1.5" />
      <text x="545" y="265" font-family="monospace" font-size="9" fill="#ef4444" font-weight="bold">HHWS 1/2"</text>

      <circle cx="530" cy="285" r="7" fill="#b91c1c" stroke="#fff" stroke-width="1.5" />
      <text x="545" y="290" font-family="monospace" font-size="9" fill="#b91c1c" font-weight="bold">HHWR 1/2"</text>

      <!-- Condensate Drain Tray -->
      <rect x="180" y="310" width="440" height="15" fill="${c.fillAccent}" stroke="${c.strokeMain}" stroke-width="1.5" />
      <circle cx="210" cy="318" r="5" fill="#f97316" stroke="#fff" stroke-width="1.5" />
      <text x="140" y="338" font-family="monospace" font-size="9" fill="#f97316" font-weight="bold">DRAIN 3/4"</text>

      <!-- Dimensions -->
      <line x1="180" y1="365" x2="620" y2="365" stroke="${c.dimColor}" stroke-width="1.5" />
      <text x="350" y="385" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">Length: 48.0" (1,219 mm)</text>

      <line x1="645" y1="180" x2="645" y2="310" stroke="${c.dimColor}" stroke-width="1.5" />
      <text x="655" y="250" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">H: 11.5" Low Profile</text>
    </svg>
  `;
}

// 7. Architectural Entrance Door SVG
function renderDoorSvg(viewType, c) {
  return `
    <svg viewBox="0 0 800 450" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-door" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="${c.gridLine}" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-door)" />

      <!-- Wall Opening Rough Bounds -->
      <rect x="200" y="60" width="400" height="340" fill="none" stroke="${c.strokeSec}" stroke-width="2" stroke-dasharray="6 3" />
      
      <!-- Aluminum Frame Perimeter -->
      <rect x="210" y="70" width="380" height="330" fill="${c.fillAccent}" stroke="${c.strokeMain}" stroke-width="2" />

      <!-- Left Door Leaf -->
      <rect x="225" y="85" width="170" height="310" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" />
      <!-- Insulated Glass Lite -->
      <rect x="245" y="105" width="130" height="220" fill="#38bdf8" fill-opacity="0.15" stroke="#38bdf8" stroke-width="1.5" />
      <!-- Panic Rim Hardware -->
      <rect x="240" y="250" width="140" height="12" rx="2" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.5" />
      <!-- 10" ADA Bottom Rail -->
      <rect x="225" y="345" width="170" height="50" fill="${c.fillAccent}" stroke="${c.strokeMain}" stroke-width="1.5" />
      <text x="250" y="375" font-family="monospace" font-size="10" fill="${c.textFill}">10" ADA RAIL</text>

      <!-- Right Door Leaf -->
      <rect x="405" y="85" width="170" height="310" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" />
      <!-- Insulated Glass Lite -->
      <rect x="425" y="105" width="130" height="220" fill="#38bdf8" fill-opacity="0.15" stroke="#38bdf8" stroke-width="1.5" />
      <!-- Panic Rim Hardware -->
      <rect x="420" y="250" width="140" height="12" rx="2" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.5" />
      <!-- 10" ADA Bottom Rail -->
      <rect x="405" y="345" width="170" height="50" fill="${c.fillAccent}" stroke="${c.strokeMain}" stroke-width="1.5" />
      <text x="430" y="375" font-family="monospace" font-size="10" fill="${c.textFill}">10" ADA RAIL</text>

      <!-- ADA Compliant Threshold -->
      <rect x="200" y="395" width="400" height="10" rx="1" fill="#475569" stroke="${c.strokeMain}" stroke-width="1.5" />

      <!-- Dimensions -->
      <line x1="200" y1="40" x2="600" y2="40" stroke="${c.dimColor}" stroke-width="1.5" />
      <text x="340" y="32" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">Width: 6'-0" (1,828 mm)</text>

      <line x1="620" y1="70" x2="620" y2="400" stroke="${c.dimColor}" stroke-width="1.5" />
      <text x="630" y="240" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">Height: 7'-0" (2,134 mm)</text>
    </svg>
  `;
}

// 8. Louvered Access Panel SVG
function renderPanelSvg(viewType, c) {
  return `
    <svg viewBox="0 0 800 450" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-panel" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="${c.gridLine}" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-panel)" />

      <!-- Flush Drywall Frame Bead -->
      <rect x="230" y="65" width="340" height="340" rx="4" fill="${c.fillAccent}" stroke="${c.strokeMain}" stroke-width="2" />
      
      <!-- Inner Hinged Door Panel -->
      <rect x="250" y="85" width="300" height="300" rx="2" fill="${c.fillSurface}" stroke="${c.strokeMain}" stroke-width="2" />

      <!-- Parametric Louver Blades -->
      ${Array.from({ length: 9 }).map((_, i) => `
        <rect x="270" y="${110 + i * 26}" width="260" height="14" rx="2" fill="${c.fillAccent}" stroke="${c.strokeSec}" stroke-width="1" />
        <line x1="270" y1="${120 + i * 26}" x2="530" y2="${120 + i * 26}" stroke="${c.strokeMain}" stroke-width="1" />
      `).join('')}

      <!-- Concealed Screwdriver Cam Latch -->
      <circle cx="525" cy="235" r="8" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.5" />
      <line x1="519" y1="235" x2="531" y2="235" stroke="#0f172a" stroke-width="2" />

      <!-- Concealed Continuous Hinge (Left) -->
      <line x1="250" y1="85" x2="250" y2="385" stroke="${c.strokeMain}" stroke-width="3" />

      <!-- Dimensions -->
      <line x1="230" y1="45" x2="570" y2="45" stroke="${c.dimColor}" stroke-width="1.5" />
      <text x="350" y="36" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">Width: 24.0" (610 mm)</text>

      <line x1="590" y1="65" x2="590" y2="405" stroke="${c.dimColor}" stroke-width="1.5" />
      <text x="600" y="240" font-family="monospace" font-size="12" font-weight="bold" fill="${c.dimColor}">Height: 24.0"</text>
    </svg>
  `;
}
