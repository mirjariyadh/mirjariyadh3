/**
 * Revit Family Creation Service Microsite - Technical Data Model
 * Real, manufacturer-ready BIM family samples with authentic engineering parameters,
 * LOD definitions, MEP connectors, and type catalogs.
 */

export const HERO_IMAGE_WEBP = '/src/assets/images/revit-family/hero-revit-family.webp';

export const REVIT_FAMILY_SAMPLES = [
  {
    id: 'ahu-rooftop-01',
    title: 'Custom Packaged Rooftop AHU with Economizer & DX Coil',
    category: 'hvac',
    categoryLabel: 'HVAC Equipment',
    subtitle: 'Direct-expansion packaged rooftop air handler with motorized economizer dampers, ECM plug fan, and full MEP duct connectors.',
    modelSeries: 'RTU-ECO-Series V',
    imageWebp: '/src/assets/images/revit-family/sample-ahu.webp',
    revitVersions: ['2021', '2022', '2023', '2024', '2025'],
    lodLevel: 'LOD 350',
    fileSizeRfa: '640 KB',
    omniClass: '23-27 19 11',
    omniClassTitle: 'Packaged Outdoor Air-Conditioning Units',
    uniFormat: 'D3040.10',
    masterFormat: '23 74 13',
    overview: 'Engineered specifically for commercial HVAC equipment manufacturers. Built entirely with native Revit extrusions and sweeps—100% free of imported CAD meshes or corrupt DWG layers. Features parametric length, curb mounting offset, motorized outside air economizer hood, supply and return duct connectors with predefined static pressure and airflow instance parameters.',
    keyFeatures: [
      'Native Revit geometry without imported CAD blocks (ultra-clean 640 KB file size)',
      'Pre-configured Supply Air & Return Air rectangular duct connectors with automated airflow link',
      'Hydronic condensate drain pipe connector with gravity drainage slope capability',
      'Integrated Type Catalog (.txt) supporting 4 factory capacity ratings from 1,200 to 4,800 CFM',
      'Parametric roof curb height and service clearance zone toggleable via instance visibility parameter'
    ],
    parametricCapabilities: {
      geometryFlexibility: 'Fully parametric casing length, width, roof curb height (14" to 24"), and left/right supply discharge configuration.',
      typeCatalogSupport: true,
      sharedParametersCount: 26,
      nestedComponents: ['Service Clearance Envelope (Coarse/Fine)', 'ECM Fan Motor Assembly', 'Economizer Damper Assembly'],
      formulaConstraints: [
        'Casing_Length = Nominal_Tonnage * 22.5" + 48"',
        'Supply_Duct_Width = if(Airflow_CFM > 3000, 28", 22")',
        'Operating_Weight = Curb_Weight + (Nominal_Tonnage * 185 lb)'
      ]
    },
    types: [
      {
        typeName: 'RTU-05-1800',
        nominalCapacity: '5.0 Tons / 1,800 CFM',
        dimensions: { length: '88.5" (2,248 mm)', width: '52.0" (1,320 mm)', height: '44.0" (1,118 mm)' },
        weightOperating: '920 lbs (417 kg)',
        electrical: '208/230V, 3Ph, 60Hz, MCA 24.5A',
        flowRating: '1,800 CFM @ 1.2 in. w.g. ESP',
        specificAttrs: { 'Refrigerant': 'R-454B / R-32', 'Sound Rating': '74 dBA', 'Filter Class': 'MERV 13' }
      },
      {
        typeName: 'RTU-7.5-2700',
        nominalCapacity: '7.5 Tons / 2,700 CFM',
        dimensions: { length: '104.0" (2,642 mm)', width: '58.0" (1,473 mm)', height: '50.0" (1,270 mm)' },
        weightOperating: '1,280 lbs (580 kg)',
        electrical: '460V, 3Ph, 60Hz, MCA 18.2A',
        flowRating: '2,700 CFM @ 1.4 in. w.g. ESP',
        specificAttrs: { 'Refrigerant': 'R-454B / R-32', 'Sound Rating': '77 dBA', 'Filter Class': 'MERV 13' }
      },
      {
        typeName: 'RTU-10-3600',
        nominalCapacity: '10.0 Tons / 3,600 CFM',
        dimensions: { length: '118.0" (2,997 mm)', width: '64.0" (1,625 mm)', height: '54.0" (1,372 mm)' },
        weightOperating: '1,640 lbs (744 kg)',
        electrical: '460V, 3Ph, 60Hz, MCA 23.8A',
        flowRating: '3,600 CFM @ 1.5 in. w.g. ESP',
        specificAttrs: { 'Refrigerant': 'R-454B / R-32', 'Sound Rating': '79 dBA', 'Filter Class': 'MERV 14' }
      },
      {
        typeName: 'RTU-12.5-4500',
        nominalCapacity: '12.5 Tons / 4,500 CFM',
        dimensions: { length: '132.0" (3,353 mm)', width: '68.0" (1,727 mm)', height: '58.0" (1,473 mm)' },
        weightOperating: '1,980 lbs (898 kg)',
        electrical: '460V, 3Ph, 60Hz, MCA 29.4A',
        flowRating: '4,500 CFM @ 1.6 in. w.g. ESP',
        specificAttrs: { 'Refrigerant': 'R-454B / R-32', 'Sound Rating': '81 dBA', 'Filter Class': 'MERV 14' }
      }
    ],
    connectors: [
      {
        connectorId: 'MEP-01',
        name: 'Supply Air Duct Outlet',
        systemClassification: 'Supply Air',
        flowDirection: 'Out',
        size: '24" x 20" Rectangular Flanged',
        heightFromBase: '36.5"',
        flowConfiguration: 'Calculated / Preset',
        description: 'Connects to primary supply duct run with dynamic air velocity & pressure loss links.'
      },
      {
        connectorId: 'MEP-02',
        name: 'Return Air Duct Inlet',
        systemClassification: 'Return Air',
        flowDirection: 'In',
        size: '24" x 22" Rectangular Flanged',
        heightFromBase: '18.0"',
        flowConfiguration: 'System Flow',
        description: 'Receives conditioned return air stream from plenum or duct return grille.'
      },
      {
        connectorId: 'MEP-03',
        name: 'Condensate Drain Outlet',
        systemClassification: 'Sanitary / Drain',
        flowDirection: 'Out',
        size: '1-1/4" NPT Threaded Female',
        heightFromBase: '6.25"',
        flowConfiguration: 'Drainage Flow',
        description: 'Gravity condensation drainage connection from deep stainless steel drain pan.'
      },
      {
        connectorId: 'MEP-04',
        name: 'Electrical Power Connection',
        systemClassification: 'Power - Unbalanced',
        flowDirection: 'In',
        size: '1-1/4" Conduit Knockout',
        heightFromBase: '28.0"',
        flowConfiguration: 'Apparent Load',
        description: 'Single-point power junction box for 3-Phase feed with MCA/MOP parameters.'
      }
    ],
    parameters: [
      { group: 'Mechanical - Airflow', name: 'Design_Airflow_Supply', type: 'Flow', isInstance: true, isShared: true, guid: 'a1b2c3d4-e5f6-4a11-8901-abcdef012345', formulaOrValue: 'Parametric', description: 'Design supply airflow linked directly to MEP duct connector.' },
      { group: 'Mechanical - Loads', name: 'Cooling_Capacity_Sensible', type: 'Power', isInstance: false, isShared: true, guid: 'b2c3d4e5-f6a1-4b22-8902-bcdef0123456', formulaOrValue: 'Looked up from Type Table', description: 'Sensible heat rejection in Btuh.' },
      { group: 'Dimensions', name: 'Casing_Length', type: 'Length', isInstance: false, isShared: false, formulaOrValue: 'Type driven', description: 'Total cabinet overall length including economizer hood.' },
      { group: 'Dimensions', name: 'Roof_Curb_Height', type: 'Length', isInstance: true, isShared: false, formulaOrValue: '18.0"', description: 'Instance height for roof curb flashing coordination.' },
      { group: 'Visibility / Graphics', name: 'Show_Service_Clearances', type: 'Yes/No', isInstance: true, isShared: true, formulaOrValue: '1', description: 'Toggles 36-inch maintenance clearance box for clash detection in Navisworks.' }
    ],
    deliverables: [
      'Autodesk Revit Family (.RFA) - Purged & QA Verified',
      'Revit External Type Catalog (.TXT) with 4 Commercial SKUs',
      'Shared Parameter Mapping Guide (.PDF)',
      'Submittal 2D DWG export from 3D Model',
      'Parameter Flex Test Video & Report'
    ],
    developmentNotes: {
      geometryHygiene: 'Model created with clean 3D solids and zero faceting. Coarse LOD displays bounding envelope with connector locations; Medium LOD displays primary panels; Fine LOD displays structural lift lugs and panel latches.',
      performanceAudit: 'File size strictly kept below 650 KB. Tested in Revit 2021 through Revit 2025 project environments without circular formula warnings.',
      clashClearances: 'Dedicated subcategory "Clearance Envelopes" allows MEP coordinators to toggle clash zones on/off in Navisworks without hiding the physical unit.',
      qaSignoff: '100% parameter flex verification completed. Connectors verified against Autodesk MEP system browser.'
    },
    views: {
      isometricSvg: 'ahu-iso',
      topViewSvg: 'ahu-top',
      frontViewSvg: 'ahu-front',
      sideViewSvg: 'ahu-side',
      connectorDiagramSvg: 'ahu-connectors'
    }
  },
  {
    id: 'fcu-concealed-02',
    title: 'Horizontal Concealed Fan Coil Unit (4-Pipe System)',
    category: 'hvac',
    categoryLabel: 'HVAC Equipment',
    subtitle: 'Ceiling-recessed hydronic fan coil with ECM motor, independent heating/cooling coils, and integrated plenum return.',
    modelSeries: 'FCU-HYD-Conceal',
    imageWebp: '/src/assets/images/revit-family/sample-fcu.webp',
    revitVersions: ['2021', '2022', '2023', '2024', '2025'],
    lodLevel: 'LOD 350',
    fileSizeRfa: '480 KB',
    omniClass: '23-27 19 13',
    omniClassTitle: 'Fan Coil Units',
    uniFormat: 'D3040.20',
    masterFormat: '23 82 19',
    overview: 'High-performance hydronic fan coil family developed for commercial building manufacturers. Incorporates 4-pipe system (separate chilled water supply/return and heating hot water supply/return) plus condensate drain. Features low ceiling profile (11.5" height) with configurable duct collar arrangements.',
    keyFeatures: [
      'Compact 11.5" profile engineered for tight ceiling plenum coordination',
      '4 distinct hydronic pipe connectors (CHWS, CHWR, HHWS, HHWR) with flow direction arrows',
      'Integrated supply duct collar with configurable aspect ratio',
      'Hanger rod mounting points with parametric ceiling drop elevation',
      'Electrical connection for variable speed ECM motor with 0-10V BAS control terminal'
    ],
    parametricCapabilities: {
      geometryFlexibility: 'Cabinet width adjusts dynamically based on CFM selection (400 to 1,400 CFM). Reversible coil connections (Left/Right hand orientation).',
      typeCatalogSupport: true,
      sharedParametersCount: 22,
      nestedComponents: ['Filter Access Door', 'Centrifugal Blower Wheel', 'Hanger Bracket Assembly'],
      formulaConstraints: [
        'Width = if(Nominal_CFM <= 600, 36", if(Nominal_CFM <= 1000, 48", 60"))',
        'CHW_Flow_GPM = Total_Cooling_Btuh / (500 * Delta_T_Chilled)'
      ]
    },
    types: [
      {
        typeName: 'FCU-04-400',
        nominalCapacity: '1.0 Ton / 400 CFM',
        dimensions: { length: '36.0" (914 mm)', width: '24.0" (610 mm)', height: '11.5" (292 mm)' },
        weightOperating: '78 lbs (35 kg)',
        electrical: '120V, 1Ph, 60Hz, FLA 1.8A',
        flowRating: '400 CFM / CHW 2.4 GPM / HHW 1.2 GPM',
        specificAttrs: { 'Airflow Range': '350 - 450 CFM', 'Filter': '1" MERV 8', 'Sound NC': 'NC-32' }
      },
      {
        typeName: 'FCU-08-800',
        nominalCapacity: '2.0 Tons / 800 CFM',
        dimensions: { length: '48.0" (1,219 mm)', width: '24.0" (610 mm)', height: '11.5" (292 mm)' },
        weightOperating: '115 lbs (52 kg)',
        electrical: '120V, 1Ph, 60Hz, FLA 3.2A',
        flowRating: '800 CFM / CHW 4.8 GPM / HHW 2.4 GPM',
        specificAttrs: { 'Airflow Range': '700 - 880 CFM', 'Filter': '1" MERV 8', 'Sound NC': 'NC-35' }
      },
      {
        typeName: 'FCU-12-1200',
        nominalCapacity: '3.0 Tons / 1,200 CFM',
        dimensions: { length: '60.0" (1,524 mm)', width: '26.0" (660 mm)', height: '12.5" (318 mm)' },
        weightOperating: '148 lbs (67 kg)',
        electrical: '208V, 1Ph, 60Hz, FLA 2.8A',
        flowRating: '1,200 CFM / CHW 7.2 GPM / HHW 3.6 GPM',
        specificAttrs: { 'Airflow Range': '1,050 - 1,300 CFM', 'Filter': '1" MERV 11', 'Sound NC': 'NC-38' }
      }
    ],
    connectors: [
      { connectorId: 'MEP-01', name: 'Supply Air Collar', systemClassification: 'Supply Air', flowDirection: 'Out', size: '10" x 30" Rectangular', heightFromBase: '5.5"', flowConfiguration: 'Preset', description: 'Ducted discharge connector.' },
      { connectorId: 'MEP-02', name: 'Chilled Water Supply', systemClassification: 'Hydronic Supply', flowDirection: 'In', size: '3/4" NPT Male', heightFromBase: '3.0"', flowConfiguration: 'Calculated', description: 'Chilled water loop inlet.' },
      { connectorId: 'MEP-03', name: 'Chilled Water Return', systemClassification: 'Hydronic Return', flowDirection: 'Out', size: '3/4" NPT Male', heightFromBase: '7.5"', flowConfiguration: 'System Flow', description: 'Chilled water loop discharge.' },
      { connectorId: 'MEP-04', name: 'Heating Hot Water Supply', systemClassification: 'Hydronic Supply', flowDirection: 'In', size: '1/2" NPT Male', heightFromBase: '3.0"', flowConfiguration: 'Calculated', description: 'Hot water heating coil inlet.' },
      { connectorId: 'MEP-05', name: 'Condensate Drain', systemClassification: 'Sanitary / Drain', flowDirection: 'Out', size: '3/4" Female Conduit', heightFromBase: '1.25"', flowConfiguration: 'Drainage', description: 'Slope drainage connection.' }
    ],
    parameters: [
      { group: 'Mechanical - Flow', name: 'CHW_Flow_Rate', type: 'Flow', isInstance: true, isShared: true, formulaOrValue: 'GPM (Parametric)', description: 'Chilled water flow parameter linked to connector.' },
      { group: 'Mechanical - Flow', name: 'HHW_Flow_Rate', type: 'Flow', isInstance: true, isShared: true, formulaOrValue: 'GPM (Parametric)', description: 'Heating water flow rate.' },
      { group: 'Dimensions', name: 'Hanger_Rod_Spacing', type: 'Length', isInstance: false, isShared: false, formulaOrValue: 'Length - 2"', description: 'Center-to-center structural hanger rod spacing.' }
    ],
    deliverables: [
      'Autodesk Revit Family (.RFA)',
      'Type Catalog Text File (.TXT)',
      'Family Parameter Documentation Sheet (.PDF)'
    ],
    developmentNotes: {
      geometryHygiene: 'Ultra-clean 480 KB lightweight file. 2D symbolic representations enabled in plan views to avoid cluttering architectural drawings.',
      performanceAudit: 'Smooth drag-and-drop into standard Revit MEP projects with instant system linking.',
      clashClearances: 'Hanger rod guides modeled to coordinate with ceiling strut channels.',
      qaSignoff: 'Tested with Revit MEP pipe auto-sizing and system inspector tool.'
    },
    views: {
      isometricSvg: 'fcu-iso',
      topViewSvg: 'fcu-top',
      frontViewSvg: 'fcu-front',
      sideViewSvg: 'fcu-side',
      connectorDiagramSvg: 'fcu-connectors'
    }
  },
  {
    id: 'chilled-water-pump-03',
    title: 'End-Suction Base-Mounted Centrifugal Chilled Water Pump',
    category: 'mep',
    categoryLabel: 'MEP Equipment',
    subtitle: 'Heavy-duty commercial hydronic pump on cast iron structural base with TEFC motor and ANSI flanged pipe connectors.',
    modelSeries: 'BVM-ES-Series 1500',
    imageWebp: '/src/assets/images/revit-family/sample-pump.webp',
    revitVersions: ['2021', '2022', '2023', '2024', '2025'],
    lodLevel: 'LOD 350',
    fileSizeRfa: '520 KB',
    omniClass: '23-29 17 11',
    omniClassTitle: 'Centrifugal Hydronic Pumps',
    uniFormat: 'D3020.20',
    masterFormat: '23 21 23',
    overview: 'Precision parametric centrifugal pump family developed for MEP equipment manufacturers. Represents pump volute, bearing frame, flexible coupling guard, motor, and welded structural channel base. Flanged suction and discharge connectors feature true ANSI 125# bolt-circle dimensions and system classification parameters.',
    keyFeatures: [
      'Flanged End-Suction and Top-Discharge pipe connectors with accurate ANSI 125#/150# dimensions',
      'Parametric motor frame size (NEMA 182T up to 365T) matching manufacturer cut-sheets',
      'Inertia base pouring perimeter offset and spring isolator mounting points',
      'Hydronic system connector flow direction, pressure drop formula, and flow tracking',
      'Electrical connection for 3-Phase induction motor with HP, RPM, and MCA parameters'
    ],
    parametricCapabilities: {
      geometryFlexibility: 'Configurable discharge nozzle orientation (Top horizontal, Top vertical, Bottom horizontal). Dynamic motor enclosure length.',
      typeCatalogSupport: true,
      sharedParametersCount: 24,
      nestedComponents: ['ANSI Flange Profile Sub-family', 'NEMA C-Face Motor Sub-family', 'Vibration Isolator Foot Pads'],
      formulaConstraints: [
        'Base_Length = Volute_Length + Motor_Length + 12"',
        'Total_Weight = Base_Weight + Pump_Wet_Weight + Motor_Weight'
      ]
    },
    types: [
      {
        typeName: 'ES-2.5x2x8-7.5HP',
        nominalCapacity: '250 GPM @ 75 ft Head',
        dimensions: { length: '46.0" (1,168 mm)', width: '20.0" (508 mm)', height: '24.0" (610 mm)' },
        weightOperating: '480 lbs (218 kg)',
        electrical: '460V, 3Ph, 60Hz, 7.5 HP, 1750 RPM',
        flowRating: '250 GPM (Hydronic Supply)',
        specificAttrs: { 'Suction Size': '2.5" Flange', 'Discharge Size': '2.0" Flange', 'Impeller': '7.85"' }
      },
      {
        typeName: 'ES-3x2.5x10-15HP',
        nominalCapacity: '450 GPM @ 95 ft Head',
        dimensions: { length: '54.0" (1,372 mm)', width: '22.0" (559 mm)', height: '28.0" (711 mm)' },
        weightOperating: '710 lbs (322 kg)',
        electrical: '460V, 3Ph, 60Hz, 15 HP, 1750 RPM',
        flowRating: '450 GPM (Hydronic Supply)',
        specificAttrs: { 'Suction Size': '3.0" Flange', 'Discharge Size': '2.5" Flange', 'Impeller': '9.50"' }
      },
      {
        typeName: 'ES-4x3x11-25HP',
        nominalCapacity: '750 GPM @ 110 ft Head',
        dimensions: { length: '62.0" (1,575 mm)', width: '24.0" (610 mm)', height: '32.0" (813 mm)' },
        weightOperating: '980 lbs (445 kg)',
        electrical: '460V, 3Ph, 60Hz, 25 HP, 1750 RPM',
        flowRating: '750 GPM (Hydronic Supply)',
        specificAttrs: { 'Suction Size': '4.0" Flange', 'Discharge Size': '3.0" Flange', 'Impeller': '10.75"' }
      }
    ],
    connectors: [
      { connectorId: 'MEP-01', name: 'Suction Inlet Flange', systemClassification: 'Hydronic Return', flowDirection: 'In', size: '3" Class 125 Flange', heightFromBase: '10.5"', flowConfiguration: 'Preset', description: 'End-suction pipe connection.' },
      { connectorId: 'MEP-02', name: 'Discharge Outlet Flange', systemClassification: 'Hydronic Supply', flowDirection: 'Out', size: '2.5" Class 125 Flange', heightFromBase: '24.0"', flowConfiguration: 'Calculated', description: 'Top discharge pipe connection.' },
      { connectorId: 'MEP-03', name: 'Motor Power Conduit', systemClassification: 'Power - Balanced', flowDirection: 'In', size: '1" Conduit Knockout', heightFromBase: '18.0"', flowConfiguration: 'Apparent Load', description: 'Motor terminal box feed.' }
    ],
    parameters: [
      { group: 'Mechanical - Flow', name: 'Pump_Design_Flow', type: 'Flow', isInstance: true, isShared: true, formulaOrValue: 'GPM (Parametric)', description: 'Design hydronic loop flow.' },
      { group: 'Mechanical - Flow', name: 'Pump_Head_Total', type: 'Length', isInstance: false, isShared: true, formulaOrValue: 'Feet Head', description: 'Total dynamic head.' },
      { group: 'Electrical - Loads', name: 'Motor_Horsepower', type: 'Power', isInstance: false, isShared: true, formulaOrValue: 'HP Rating', description: 'Rated brake horsepower.' }
    ],
    deliverables: [
      'Revit Pump Family (.RFA)',
      'Type Catalog File (.TXT)',
      'Submittal Cut-Sheet Alignment Sheet (.PDF)'
    ],
    developmentNotes: {
      geometryHygiene: 'Modeled with native revolved solids and sweeps. Clean base channel profile without redundant internal faces.',
      performanceAudit: 'Purged of unused materials and line patterns. Snaps precisely to floor slab and pipe centerline.',
      clashClearances: 'Shaft pullout maintenance envelope included in visibility settings.',
      qaSignoff: 'Tested with Revit MEP pipe systems for accurate fluid flow direction.'
    },
    views: {
      isometricSvg: 'pump-iso',
      topViewSvg: 'pump-top',
      frontViewSvg: 'pump-front',
      sideViewSvg: 'pump-side',
      connectorDiagramSvg: 'pump-connectors'
    }
  },
  {
    id: 'modulating-control-valve-04',
    title: 'Motorized 2-Way Modulating Characterized Control Valve',
    category: 'mep',
    categoryLabel: 'MEP Equipment',
    subtitle: 'Flanged commercial control valve assembly with electronic fail-safe modulating rotary actuator and BACnet feedback.',
    modelSeries: 'CCV-FL-Series 200',
    imageWebp: '/src/assets/images/revit-family/sample-valve.webp',
    revitVersions: ['2021', '2022', '2023', '2024', '2025'],
    lodLevel: 'LOD 350',
    fileSizeRfa: '410 KB',
    omniClass: '23-33 13 13',
    omniClassTitle: 'Control Valves',
    uniFormat: 'D3020.80',
    masterFormat: '23 09 23',
    overview: 'Precision pipe accessory family for commercial valve manufacturers. Integrates cast iron valve body, characterized disc, stainless steel stem, and 24VAC proportional control actuator. Connects directly in-line into hydronic piping with dynamic pipe diameter matching.',
    keyFeatures: [
      'In-line pipe accessory behavior that automatically breaks and connects into Revit pipe runs',
      'Dual flanged connectors matching standard ANSI 125# / 150# pipe schedules',
      'Rotatable actuator head orientation (90° increments) to prevent wall and duct clashes',
      'Full valve flow coefficient (Cv) ratings embedded per nominal diameter',
      'Control signal wiring connector for 0-10VDC / 4-20mA BAS analog output'
    ],
    parametricCapabilities: {
      geometryFlexibility: 'Face-to-face flange dimension adapts to ANSI standards. Actuator enclosure switches between standard and NEMA 4X weather-proof housing.',
      typeCatalogSupport: true,
      sharedParametersCount: 18,
      nestedComponents: ['Electronic Rotary Actuator Assembly', 'Position Indicator Dial'],
      formulaConstraints: [
        'Pressure_Drop_PSI = (Flow_GPM / Valve_Cv) ^ 2',
        'Face_to_Face = lookuptable("Valve_Table", "FtoF", Pipe_Diameter)'
      ]
    },
    types: [
      {
        typeName: 'CCV-2.0-Cv45',
        nominalCapacity: '2.0" Flanged / Cv 45',
        dimensions: { length: '7.5" (191 mm)', width: '6.0" (152 mm)', height: '14.8" (376 mm)' },
        weightOperating: '28 lbs (13 kg)',
        electrical: '24VAC, 50/60Hz, 8.5 VA',
        flowRating: 'Cv 45 (15-60 GPM typical)',
        specificAttrs: { 'Body Rating': 'ANSI 125#', 'Stroke Time': '90 sec', 'Fail Position': 'Normally Closed' }
      },
      {
        typeName: 'CCV-3.0-Cv110',
        nominalCapacity: '3.0" Flanged / Cv 110',
        dimensions: { length: '9.0" (229 mm)', width: '7.5" (191 mm)', height: '17.2" (437 mm)' },
        weightOperating: '44 lbs (20 kg)',
        electrical: '24VAC, 50/60Hz, 10.0 VA',
        flowRating: 'Cv 110 (40-160 GPM typical)',
        specificAttrs: { 'Body Rating': 'ANSI 125#', 'Stroke Time': '90 sec', 'Fail Position': 'Fail In Place' }
      },
      {
        typeName: 'CCV-4.0-Cv185',
        nominalCapacity: '4.0" Flanged / Cv 185',
        dimensions: { length: '11.5" (292 mm)', width: '9.0" (229 mm)', height: '19.5" (495 mm)' },
        weightOperating: '68 lbs (31 kg)',
        electrical: '24VAC, 50/60Hz, 12.0 VA',
        flowRating: 'Cv 185 (80-300 GPM typical)',
        specificAttrs: { 'Body Rating': 'ANSI 125#', 'Stroke Time': '90 sec', 'Fail Position': 'Normally Open' }
      }
    ],
    connectors: [
      { connectorId: 'MEP-01', name: 'Pipe Inlet', systemClassification: 'Hydronic Supply', flowDirection: 'In', size: '3" Flanged', heightFromBase: '3.75"', flowConfiguration: 'Global', description: 'Primary water loop entry.' },
      { connectorId: 'MEP-02', name: 'Pipe Outlet', systemClassification: 'Hydronic Supply', flowDirection: 'Out', size: '3" Flanged', heightFromBase: '3.75"', flowConfiguration: 'Global', description: 'Primary water loop outlet.' },
      { connectorId: 'MEP-03', name: 'BAS Control Cable', systemClassification: 'Controls', flowDirection: 'In', size: '1/2" Conduit', heightFromBase: '15.0"', flowConfiguration: 'Signal', description: '24VAC power & 0-10V control input.' }
    ],
    parameters: [
      { group: 'Mechanical - Flow', name: 'Valve_Flow_Coefficient_Cv', type: 'Flow', isInstance: false, isShared: true, formulaOrValue: 'Looked up from Catalog', description: 'Rated Cv at 100% open.' },
      { group: 'Mechanical - Pressure', name: 'Calculated_Pressure_Drop', type: 'Length', isInstance: true, isShared: true, formulaOrValue: '(Flow / Cv)^2', description: 'Instantaneous head loss across valve.' }
    ],
    deliverables: [
      'Revit Pipe Accessory Family (.RFA)',
      'Type Catalog (.TXT) with 6 Standard Pipe Sizes',
      'Shared Parameter Definitions'
    ],
    developmentNotes: {
      geometryHygiene: 'Clean 410 KB file size. Optimized for Revit pipe layout insertion without breaking pipeline connectivity.',
      performanceAudit: 'Flow direction arrow displayed in 2D plan and 3D views.',
      clashClearances: 'Actuator removal clearance envelope included for vertical maintenance.',
      qaSignoff: 'Tested in Revit pipe accessory auto-cut behavior.'
    },
    views: {
      isometricSvg: 'valve-iso',
      topViewSvg: 'valve-top',
      frontViewSvg: 'valve-front',
      sideViewSvg: 'valve-side',
      connectorDiagramSvg: 'valve-connectors'
    }
  },
  {
    id: 'slurry-mixing-vessel-05',
    title: '316L Stainless Steel Industrial Agitated Process Vessel Skid',
    category: 'industrial',
    categoryLabel: 'Industrial Equipment',
    subtitle: 'ASME-stamped vertical stainless steel sanitary mixing tank on structural skid with top-entry helical gear agitator.',
    modelSeries: 'IND-TNK-Agitator 3000',
    imageWebp: '/src/assets/images/revit-family/sample-vessel.webp',
    revitVersions: ['2021', '2022', '2023', '2024', '2025'],
    lodLevel: 'LOD 350',
    fileSizeRfa: '780 KB',
    omniClass: '23-35 15 11',
    omniClassTitle: 'Storage Tanks and Mixing Vessels',
    uniFormat: 'D3050.50',
    masterFormat: '43 41 16',
    overview: 'High-fidelity industrial process vessel engineered for chemical, pharmaceutical, and food-processing equipment manufacturers. Features dished heads, dimple cooling jacket, top-entry motor and mechanical seal agitator, flanged process inlets, CIP spray ball nozzle, and bottom outlet with sanitary diaphragm valve.',
    keyFeatures: [
      'Authentic ASME Section VIII pressure vessel geometry with ASME dished heads and support legs',
      '6 separate process pipe connectors: Product Inlet, Vent, CIP Wash, Jacket In, Jacket Out, Slurry Drain',
      'Structural steel H-beam mounting skid with anchor bolt hole locations',
      'Agitator drive motor with electrical power connection and speed controller metadata',
      'Parametric liquid volume and dynamic operating weight calculator'
    ],
    parametricCapabilities: {
      geometryFlexibility: 'Parametric shell diameter (48" to 96"), straight shell height (60" to 144"), and jacket pressure rating.',
      typeCatalogSupport: true,
      sharedParametersCount: 28,
      nestedComponents: ['Top Agitator Drive Assembly', 'Sight Glass Assembly', 'ASME Manway Port (18")'],
      formulaConstraints: [
        'Vessel_Volume_Gallons = 3.14159 * (Diameter / 2)^2 * Shell_Height * 7.48',
        'Operating_Weight = Dry_Weight + (Vessel_Volume_Gallons * Liquid_Specific_Gravity * 8.34 lb)'
      ]
    },
    types: [
      {
        typeName: 'TK-1500-AG',
        nominalCapacity: '1,500 Gallons (5,678 Liters)',
        dimensions: { length: '68.0" (1,727 mm)', width: '68.0" (1,727 mm)', height: '142.0" (3,607 mm)' },
        weightOperating: '15,800 lbs (7,167 kg)',
        electrical: '460V, 3Ph, 60Hz, 10 HP, 120 RPM output',
        flowRating: 'Inlet 3" / Outlet 3" Sanitary Tri-Clamp',
        specificAttrs: { 'Shell Material': '316L SS', 'Design Pressure': '50 PSI / Full Vac', 'Jacket Rating': '100 PSI Steam' }
      },
      {
        typeName: 'TK-3000-AG',
        nominalCapacity: '3,000 Gallons (11,356 Liters)',
        dimensions: { length: '84.0" (2,134 mm)', width: '84.0" (2,134 mm)', height: '178.0" (4,521 mm)' },
        weightOperating: '31,200 lbs (14,152 kg)',
        electrical: '460V, 3Ph, 60Hz, 20 HP, 95 RPM output',
        flowRating: 'Inlet 4" / Outlet 4" Sanitary Tri-Clamp',
        specificAttrs: { 'Shell Material': '316L SS', 'Design Pressure': '50 PSI / Full Vac', 'Jacket Rating': '100 PSI Steam' }
      },
      {
        typeName: 'TK-5000-AG',
        nominalCapacity: '5,000 Gallons (18,927 Liters)',
        dimensions: { length: '102.0" (2,591 mm)', width: '102.0" (2,591 mm)', height: '210.0" (5,334 mm)' },
        weightOperating: '50,400 lbs (22,861 kg)',
        electrical: '460V, 3Ph, 60Hz, 30 HP, 80 RPM output',
        flowRating: 'Inlet 6" / Outlet 6" ANSI 150# Flange',
        specificAttrs: { 'Shell Material': '316L SS', 'Design Pressure': '60 PSI / Full Vac', 'Jacket Rating': '125 PSI Steam' }
      }
    ],
    connectors: [
      { connectorId: 'MEP-01', name: 'Product Process Inlet', systemClassification: 'Other', flowDirection: 'In', size: '3" Tri-Clamp Flange', heightFromBase: '115.0"', flowConfiguration: 'Preset', description: 'Top head liquid process inlet.' },
      { connectorId: 'MEP-02', name: 'Slurry Drain Outlet', systemClassification: 'Other', flowDirection: 'Out', size: '3" Tri-Clamp Flange', heightFromBase: '14.0"', flowConfiguration: 'System Flow', description: 'Bottom dished head outlet.' },
      { connectorId: 'MEP-03', name: 'Cooling Jacket In', systemClassification: 'Hydronic Supply', flowDirection: 'In', size: '2" 150# Flange', heightFromBase: '30.0"', flowConfiguration: 'Calculated', description: 'Chilled water / glycol cooling loop.' },
      { connectorId: 'MEP-04', name: 'Cooling Jacket Out', systemClassification: 'Hydronic Return', flowDirection: 'Out', size: '2" 150# Flange', heightFromBase: '95.0"', flowConfiguration: 'System Flow', description: 'Jacket fluid return.' },
      { connectorId: 'MEP-05', name: 'Agitator Motor Power', systemClassification: 'Power - Balanced', flowDirection: 'In', size: '1-1/4" Conduit', heightFromBase: '136.0"', flowConfiguration: 'Apparent Load', description: '3-Phase electrical feed.' }
    ],
    parameters: [
      { group: 'Mechanical - General', name: 'Operating_Liquid_Volume', type: 'Flow', isInstance: true, isShared: true, formulaOrValue: 'Gallons', description: 'Nominal volume at 80% liquid level.' },
      { group: 'Structural - Loads', name: 'Total_Vessel_Operating_Weight', type: 'Power', isInstance: true, isShared: true, formulaOrValue: 'Formula-calculated', description: 'Used by structural engineers for floor load verification.' }
    ],
    deliverables: [
      'Revit Process Equipment Family (.RFA)',
      'Type Catalog (.TXT)',
      'Nozzle Schedule & Elevation Drawing Sheet'
    ],
    developmentNotes: {
      geometryHygiene: 'Modeled with native revolved solids and clean parametric torispherical head sweeps. Under 780 KB file size.',
      performanceAudit: 'Nozzle coordinate origins aligned with industrial process piping systems.',
      clashClearances: 'Top motor removal crane envelope toggleable in 3D views.',
      qaSignoff: 'Stress and weight verified against manufacturer vessel submittal.'
    },
    views: {
      isometricSvg: 'tank-iso',
      topViewSvg: 'tank-top',
      frontViewSvg: 'tank-front',
      sideViewSvg: 'tank-side',
      connectorDiagramSvg: 'tank-connectors'
    }
  },
  {
    id: 'pressure-booster-skid-06',
    title: 'Triplex Variable Speed Domestic Water Pressure Booster Skid',
    category: 'industrial',
    categoryLabel: 'Industrial Equipment',
    subtitle: 'Pre-piped triplex vertical multi-stage booster pump skid with 304 SS manifolds, ASME expansion tanks, and NEMA 4X VFD controller.',
    modelSeries: 'BVM-TRX-Booster 400',
    imageWebp: '/src/assets/images/revit-family/sample-booster.webp',
    revitVersions: ['2021', '2022', '2023', '2024', '2025'],
    lodLevel: 'LOD 350',
    fileSizeRfa: '820 KB',
    omniClass: '23-35 19 13',
    omniClassTitle: 'Packaged Pumping Systems',
    uniFormat: 'D2010.40',
    masterFormat: '22 11 23',
    overview: 'Packaged skid assembly developed for commercial pump package manufacturers. Incorporates three vertical multi-stage booster pumps mounted on a common structural steel channel base, complete with 304 stainless steel suction and discharge headers, isolation ball valves, silent check valves, and central control enclosure.',
    keyFeatures: [
      'Fully packaged skid design with single-point suction and discharge flanged connections',
      'Three vertical multi-stage pumps with dynamic staging parameters (Lead/Lag/Standby)',
      'Single-point electrical feed connection to NEMA 4X variable frequency drive control panel',
      'ASME hydro-pneumatic bladder surge tank modeled with authentic mounting bracket',
      'Structural skid channel base with seismic tie-down hole coordinates'
    ],
    parametricCapabilities: {
      geometryFlexibility: 'Manifold spacing and header size automatically resize per pump flow rating (4" to 8" header diameter).',
      typeCatalogSupport: true,
      sharedParametersCount: 30,
      nestedComponents: ['Vertical Multi-stage Pump (Nested)', 'VFD Control Console', 'ASME Diaphragm Tank'],
      formulaConstraints: [
        'Header_Diameter = if(Total_Skid_GPM > 400, 6", 4")',
        'Skid_Total_Weight = Base_Skid_Tare + (3 * Pump_Weight) + Manifold_Water_Weight'
      ]
    },
    types: [
      {
        typeName: 'TRX-3x15-180GPM',
        nominalCapacity: '180 GPM @ 120 PSI Boost',
        dimensions: { length: '78.0" (1,981 mm)', width: '44.0" (1,118 mm)', height: '72.0" (1,829 mm)' },
        weightOperating: '2,150 lbs (975 kg)',
        electrical: '460V, 3Ph, 60Hz, 3x 5.0 HP Motors, MCA 28A',
        flowRating: '180 GPM (Domestic Water)',
        specificAttrs: { 'Suction Header': '4" Flange', 'Discharge Header': '4" Flange', 'VFD Brand': 'Integrated NEMA 4X' }
      },
      {
        typeName: 'TRX-3x25-360GPM',
        nominalCapacity: '360 GPM @ 140 PSI Boost',
        dimensions: { length: '92.0" (2,337 mm)', width: '48.0" (1,219 mm)', height: '80.0" (2,032 mm)' },
        weightOperating: '3,280 lbs (1,488 kg)',
        electrical: '460V, 3Ph, 60Hz, 3x 10.0 HP Motors, MCA 46A',
        flowRating: '360 GPM (Domestic Water)',
        specificAttrs: { 'Suction Header': '6" Flange', 'Discharge Header': '6" Flange', 'VFD Brand': 'Integrated NEMA 4X' }
      },
      {
        typeName: 'TRX-3x40-600GPM',
        nominalCapacity: '600 GPM @ 160 PSI Boost',
        dimensions: { length: '108.0" (2,743 mm)', width: '54.0" (1,372 mm)', height: '86.0" (2,184 mm)' },
        weightOperating: '4,650 lbs (2,109 kg)',
        electrical: '460V, 3Ph, 60Hz, 3x 15.0 HP Motors, MCA 68A',
        flowRating: '600 GPM (Domestic Water)',
        specificAttrs: { 'Suction Header': '8" Flange', 'Discharge Header': '6" Flange', 'VFD Brand': 'Integrated NEMA 4X' }
      }
    ],
    connectors: [
      { connectorId: 'MEP-01', name: 'Suction Header Inlet', systemClassification: 'Domestic Cold Water', flowDirection: 'In', size: '6" Class 150 Flange', heightFromBase: '14.0"', flowConfiguration: 'Preset', description: 'City main supply connection.' },
      { connectorId: 'MEP-02', name: 'Discharge Header Outlet', systemClassification: 'Domestic Cold Water', flowDirection: 'Out', size: '6" Class 150 Flange', heightFromBase: '24.0"', flowConfiguration: 'Calculated', description: 'High-pressure domestic water riser feed.' },
      { connectorId: 'MEP-03', name: 'Central Power Feed', systemClassification: 'Power - Balanced', flowDirection: 'In', size: '2" Conduit Knockout', heightFromBase: '48.0"', flowConfiguration: 'Apparent Load', description: 'Single-point power supply to VFD panel.' }
    ],
    parameters: [
      { group: 'Plumbing - General', name: 'Booster_System_Total_Flow', type: 'Flow', isInstance: true, isShared: true, formulaOrValue: 'GPM (Parametric)', description: 'Total instantaneous design flow capacity.' },
      { group: 'Plumbing - Pressure', name: 'Booster_Discharge_Pressure', type: 'Power', isInstance: false, isShared: true, formulaOrValue: 'PSI Rating', description: 'Constant regulated header pressure.' }
    ],
    deliverables: [
      'Packaged Equipment Family (.RFA)',
      'Type Catalog (.TXT)',
      'Equipment Layout & Electrical Schematics PDF'
    ],
    developmentNotes: {
      geometryHygiene: 'Skid structural frame modeled using standard structural channel profiles. Compact 820 KB file size.',
      performanceAudit: 'Purged of unnecessary complex bolt threads. Fast rendering in both Revit project views and Enscape.',
      clashClearances: 'Control panel door swing clearance zone modeled as 3D subcategory.',
      qaSignoff: 'Tested across multi-story plumbing riser systems.'
    },
    views: {
      isometricSvg: 'booster-iso',
      topViewSvg: 'booster-top',
      frontViewSvg: 'booster-front',
      sideViewSvg: 'booster-side',
      connectorDiagramSvg: 'booster-connectors'
    }
  },
  {
    id: 'commercial-entrance-door-07',
    title: 'Thermal-Break Narrow-Stile Commercial Aluminum Entrance Double Door',
    category: 'architectural',
    categoryLabel: 'Architectural Products',
    subtitle: 'Storefront commercial glazed entrance system with nested panic exit hardware, continuous geared hinges, and ADA threshold.',
    modelSeries: 'ARC-ENT-Narrow Stile 500',
    imageWebp: '/src/assets/images/revit-family/sample-door.webp',
    revitVersions: ['2021', '2022', '2023', '2024', '2025'],
    lodLevel: 'LOD 350',
    fileSizeRfa: '560 KB',
    omniClass: '23-17 11 11',
    omniClassTitle: 'Commercial Entrance Doors',
    uniFormat: 'B2050.10',
    masterFormat: '08 41 13',
    overview: 'High-end architectural product family created for commercial door and curtain wall manufacturers. Inserts directly into Revit host walls or curtain wall infills. Features parametric rough opening width and height, frame depth, configurable transom panel, nested panic exit hardware, and dynamic swing angle in 3D (0° to 90° for visualization).',
    keyFeatures: [
      'Wall-hosted family with automatic wall opening cut and wall thickness matching',
      'Parametric Door Swing Angle parameter (0° closed to 90° open in 3D for render views)',
      '2D symbolic lines for floor plans conforming to US (AIA) and UK (ISO) drafting standards',
      'Nested ADA-compliant threshold profile with customizable floor finish offset',
      'Instance parameters for Keyed Access, Electric Strike wiring knockout, and Frame Finish'
    ],
    parametricCapabilities: {
      geometryFlexibility: 'Rough Opening Width (60" to 96"), Height (80" to 120"), Frame Depth (4-1/2" to 7"), and optional Transom Glazing height.',
      typeCatalogSupport: true,
      sharedParametersCount: 20,
      nestedComponents: ['Panic Exit Device (Rim Type)', 'Overhead Concealed Closer', '10" ADA Bottom Rail'],
      formulaConstraints: [
        'Rough_Opening_Width = Frame_Width + 0.5"',
        'Leaf_Width = (Frame_Width - (Frame_Face * 2) - Meeting_Stile_Gap) / 2'
      ]
    },
    types: [
      {
        typeName: 'ENT-6080-STD',
        nominalCapacity: '6\'-0" x 7\'-0" Double Door (1828 x 2134 mm)',
        dimensions: { length: '76.0" (1,930 mm)', width: '4.5" (114 mm)', height: '86.5" (2,197 mm)' },
        weightOperating: '240 lbs (109 kg)',
        electrical: '24VDC Electric Strike (Optional)',
        flowRating: 'ADA Compliant Clear Width 32.5"',
        specificAttrs: { 'Glass': '1" Low-E Insulated', 'Thermal Break': 'Polyamide Strip', 'Finish': 'Clear Anodized Class I' }
      },
      {
        typeName: 'ENT-6080-TR',
        nominalCapacity: '6\'-0" x 9\'-0" With Transom (1828 x 2743 mm)',
        dimensions: { length: '76.0" (1,930 mm)', width: '4.5" (114 mm)', height: '110.5" (2,807 mm)' },
        weightOperating: '320 lbs (145 kg)',
        electrical: '24VDC Electric Strike (Optional)',
        flowRating: 'ADA Compliant Clear Width 32.5"',
        specificAttrs: { 'Glass': '1" Low-E Insulated', 'Transom Height': '24.0"', 'Finish': 'Dark Bronze Anodized' }
      },
      {
        typeName: 'ENT-7080-HD',
        nominalCapacity: '7\'-0" x 7\'-0" Heavy Traffic (2134 x 2134 mm)',
        dimensions: { length: '88.0" (2,235 mm)', width: '6.0" (152 mm)', height: '86.5" (2,197 mm)' },
        weightOperating: '310 lbs (141 kg)',
        electrical: '24VDC Motorized Latch Retraction',
        flowRating: 'ADA Compliant Clear Width 38.0"',
        specificAttrs: { 'Glass': '1-1/8" Impact Rated', 'Thermal Break': 'Polyamide Strip', 'Finish': 'Custom Powder Coat' }
      }
    ],
    connectors: [
      { connectorId: 'MEP-01', name: 'Electric Access Power', systemClassification: 'Controls', flowDirection: 'In', size: '1/2" Low Voltage Knockout', heightFromBase: '40.0"', flowConfiguration: 'Signal', description: 'Low voltage access control wire transfer.' }
    ],
    parameters: [
      { group: 'Dimensions', name: 'Door_Swing_3D_Angle', type: 'Integer', isInstance: true, isShared: false, formulaOrValue: '0 to 90 degrees', description: 'Allows rendering doors open or closed in 3D scenes.' },
      { group: 'Identity Data', name: 'Fire_Rating', type: 'Text', isInstance: false, isShared: true, formulaOrValue: 'Non-Rated / 20 Min', description: 'UL fire resistance code.' }
    ],
    deliverables: [
      'Revit Wall-Hosted Door Family (.RFA)',
      'Type Catalog (.TXT)',
      'MasterFormat Specification Guide'
    ],
    developmentNotes: {
      geometryHygiene: 'Modeled with native aluminum profile sweeps. 2D linework cleanly displays in plan cuts without showing 3D geometry clutter.',
      performanceAudit: 'Tested in standard Revit drywall, masonry, and concrete curtain wall infills.',
      clashClearances: 'Egress path trajectory included in plan subcategory.',
      qaSignoff: 'Verified ADA clearance parameters and door schedule outputs.'
    },
    views: {
      isometricSvg: 'door-iso',
      topViewSvg: 'door-top',
      frontViewSvg: 'door-front',
      sideViewSvg: 'door-side',
      connectorDiagramSvg: 'door-connectors'
    }
  },
  {
    id: 'louvered-access-panel-08',
    title: 'Acoustically Rated Flush Louvered Ceiling Access Panel',
    category: 'architectural',
    categoryLabel: 'Architectural Products',
    subtitle: 'Flush drywall ceiling and wall access panel with sound-attenuated acoustic louvers and concealed pivot hinge.',
    modelSeries: 'ARC-ACC-AcousticFlush',
    imageWebp: '/src/assets/images/revit-family/sample-louver.webp',
    revitVersions: ['2021', '2022', '2023', '2024', '2025'],
    lodLevel: 'LOD 300',
    fileSizeRfa: '390 KB',
    omniClass: '23-17 19 13',
    omniClassTitle: 'Access Doors and Panels',
    uniFormat: 'B2050.50',
    masterFormat: '08 31 13',
    overview: 'Precision specialty building product family for access panel and grille manufacturers. Face-hosted family that mounts seamlessly onto drywall ceilings, masonry walls, or soffits. Features parametric louver blade count, free air ventilation area calculation, concealed continuous piano hinge, and screwdriver cam latch.',
    keyFeatures: [
      'Face-hosted architecture allowing flexible placement on walls, ceilings, and bulkheads',
      'Calculated Free Area Parameter dynamically updated based on panel dimensions',
      'Clean recessed frame bead for tape-and-spackle flush architectural installation',
      'Concealed mechanical cam latch with screwdriver/cylinder lock options',
      'Fine LOD includes acoustic sound-insulation baffle liner'
    ],
    parametricCapabilities: {
      geometryFlexibility: 'Customizable Width (12" to 36") and Height (12" to 48"). Frame flange width adjustable for standard 5/8" gypsum board.',
      typeCatalogSupport: true,
      sharedParametersCount: 16,
      nestedComponents: ['Concealed Cam Latch', 'Flush Mounting Flange Bead'],
      formulaConstraints: [
        'Louver_Blade_Count = round(Height / 2.5")',
        'Free_Vent_Area_SqFt = (Width - 2") * (Height - 2") * 0.45 / 144'
      ]
    },
    types: [
      {
        typeName: 'ACC-1818-LUV',
        nominalCapacity: '18" x 18" Access Opening (457 x 457 mm)',
        dimensions: { length: '20.5" (521 mm)', width: '2.5" (64 mm)', height: '20.5" (521 mm)' },
        weightOperating: '14 lbs (6.4 kg)',
        electrical: 'N/A',
        flowRating: 'Free Area: 1.05 Sq.Ft.',
        specificAttrs: { 'Frame': '16-Gauge Galvanized Steel', 'Acoustic Rating': 'STC 38', 'Latch': 'Screwdriver Cam' }
      },
      {
        typeName: 'ACC-2424-LUV',
        nominalCapacity: '24" x 24" Access Opening (610 x 610 mm)',
        dimensions: { length: '26.5" (673 mm)', width: '2.5" (64 mm)', height: '26.5" (673 mm)' },
        weightOperating: '22 lbs (10.0 kg)',
        electrical: 'N/A',
        flowRating: 'Free Area: 1.88 Sq.Ft.',
        specificAttrs: { 'Frame': '16-Gauge Galvanized Steel', 'Acoustic Rating': 'STC 38', 'Latch': 'Dual Cam Latches' }
      },
      {
        typeName: 'ACC-2436-LUV',
        nominalCapacity: '24" x 36" Access Opening (610 x 914 mm)',
        dimensions: { length: '26.5" (673 mm)', width: '2.5" (64 mm)', height: '38.5" (978 mm)' },
        weightOperating: '31 lbs (14.1 kg)',
        electrical: 'N/A',
        flowRating: 'Free Area: 2.85 Sq.Ft.',
        specificAttrs: { 'Frame': '14-Gauge Galvanized Steel', 'Acoustic Rating': 'STC 40', 'Latch': 'Keyed Cylinder Lock' }
      }
    ],
    connectors: [],
    parameters: [
      { group: 'Dimensions', name: 'Rough_Wall_Opening_Width', type: 'Length', isInstance: false, isShared: true, formulaOrValue: 'Width + 0.375"', description: 'Required framing rough opening width.' },
      { group: 'HVAC - Ventilation', name: 'Calculated_Free_Area_SqFt', type: 'Flow', isInstance: true, isShared: true, formulaOrValue: 'Formula-driven', description: 'Net louver free ventilation area for airflow calculations.' }
    ],
    deliverables: [
      'Revit Face-Hosted Access Panel Family (.RFA)',
      'Type Catalog Text File (.TXT)',
      'Architectural Detail Sheet (.PDF)'
    ],
    developmentNotes: {
      geometryHygiene: 'Lightweight 390 KB file. Louvers modeled with efficient array formulas that calculate blade pitch dynamically.',
      performanceAudit: 'Zero project file bloat when placed in high quantities across large hospital or hotel projects.',
      clashClearances: 'Swing trajectory arc verified for ceiling clearance.',
      qaSignoff: 'Tested on horizontal drywall ceilings and vertical concrete walls.'
    },
    views: {
      isometricSvg: 'panel-iso',
      topViewSvg: 'panel-top',
      frontViewSvg: 'panel-front',
      sideViewSvg: 'panel-side',
      connectorDiagramSvg: 'panel-connectors'
    }
  }
];

export function getSampleById(id) {
  return REVIT_FAMILY_SAMPLES.find(s => s.id === id);
}

export function getSamplesByCategory(category) {
  if (category === 'all') return REVIT_FAMILY_SAMPLES;
  return REVIT_FAMILY_SAMPLES.filter(s => s.category === category);
}
