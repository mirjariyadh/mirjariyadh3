import React, { useState } from 'react';
import { Download, CheckCircle2, Layers, Cpu, Box, Wrench, MapPin } from 'lucide-react';

const profilePortraitImg = '/assets/images/about/mirja-riyadh-desk.webp';

interface AboutSectionProps {
  onOpenContact?: () => void;
  onSelectExperience?: (exp: any) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadCV = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="w-full bg-[#F7F8FA] dark:bg-[#0B1220] text-[#111827] dark:text-slate-100 transition-colors duration-300 font-sans">
      
      {/* ==================================================
          1. SECTION HEADER & MAIN ABOUT (2-COLUMN)
         ================================================== */}
      <section className="relative py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Technical Grid Background Line */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Section Header */}
        <div className="mb-10 md:mb-14 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#EEF2F5] dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 text-[11px] font-mono font-bold tracking-widest text-[#18A999] uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#18A999]" />
            ABOUT ME
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] dark:text-white font-display leading-[1.15] max-w-3xl">
            Building Digital Models from{' '}
            <span className="text-[#18A999] relative inline-block">
              Real-World Data
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#18A999]/30 rounded-full" />
            </span>
          </h1>
        </div>

        {/* Two-Column Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start relative z-10">
          
          {/* LEFT COLUMN: Profile Image */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full max-w-[320px] mx-auto aspect-[4/5] rounded-md overflow-hidden bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 shadow-md group">
              <img
                src={profilePortraitImg}
                alt="Mirja Riyadh - BIM Modeler & Revit Specialist"
                className="w-full h-full object-cover object-center grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect width="100%" height="100%" fill="%23111827"/><circle cx="200" cy="180" r="70" fill="%231e293b"/><path d="M80 420 C80 300 120 280 200 280 C280 280 320 300 320 420 Z" fill="%231e293b"/><text x="200" y="460" text-anchor="middle" fill="%2318A999" font-family="monospace" font-size="14">MIRJA RIYADH</text></svg>';
                }}
              />
              
              {/* Subtle Overlay Label Top Left */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0B1220]/85 backdrop-blur-md border border-[#18A999]/30 text-[10px] font-mono font-bold tracking-wider text-white shadow-sm">
                BIM MODELER / REVIT SPECIALIST
              </div>

              {/* Subtle Overlay Label Bottom */}
              <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded bg-[#0B1220]/90 backdrop-blur-md border border-slate-700/60 flex items-center justify-between text-[10px] font-mono text-slate-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3 h-3 text-[#18A999]" />
                  BASED IN BANGLADESH
                </span>
                <span className="text-[#18A999] font-bold">WORKING GLOBALLY</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Introduction & Core Expertise */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-8">
            
            {/* Introduction Paragraphs */}
            <div className="space-y-4 max-w-[650px] text-base sm:text-lg text-[#111827] dark:text-slate-200 leading-relaxed font-normal">
              <p>
                I'm <strong className="font-bold text-[#111827] dark:text-white">Riyadh</strong>, a BIM Modeler and Revit Specialist focused on transforming point clouds, drawings, and project information into accurate, coordinated BIM and CAD deliverables.
              </p>
              <p className="text-[#667085] dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                My work spans Scan-to-BIM, Architectural BIM, MEP modeling, CAD drafting, coordination, and technical documentation. I work across different project types and deliverables, with a strong focus on model accuracy, clean documentation, and practical project requirements.
              </p>
            </div>

            {/* Core Expertise Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#667085] dark:text-slate-400 uppercase">
                CORE EXPERTISE
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Block 01 */}
                <div className="group relative bg-white dark:bg-[#111827] p-4 rounded-md border border-[#E5E7EB] dark:border-slate-800 hover:border-[#18A999] transition-all duration-300 hover:-translate-y-1 shadow-sm overflow-hidden">
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#18A999] group-hover:w-full transition-all duration-300" />
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-[#18A999]">01</span>
                    <Layers className="w-3.5 h-3.5 text-[#667085] group-hover:text-[#18A999] transition-colors" />
                  </div>
                  <h4 className="text-xs font-bold font-mono tracking-wider text-[#111827] dark:text-white uppercase mb-1">
                    SCAN-TO-BIM
                  </h4>
                  <ul className="text-[11px] text-[#667085] dark:text-slate-400 space-y-0.5 font-mono">
                    <li>• Point Cloud → Revit</li>
                    <li>• Existing Conditions</li>
                    <li>• As-Built Modeling</li>
                  </ul>
                </div>

                {/* Block 02 */}
                <div className="group relative bg-white dark:bg-[#111827] p-4 rounded-md border border-[#E5E7EB] dark:border-slate-800 hover:border-[#18A999] transition-all duration-300 hover:-translate-y-1 shadow-sm overflow-hidden">
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#18A999] group-hover:w-full transition-all duration-300" />
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-[#18A999]">02</span>
                    <Box className="w-3.5 h-3.5 text-[#667085] group-hover:text-[#18A999] transition-colors" />
                  </div>
                  <h4 className="text-xs font-bold font-mono tracking-wider text-[#111827] dark:text-white uppercase mb-1">
                    ARCHITECTURAL BIM
                  </h4>
                  <ul className="text-[11px] text-[#667085] dark:text-slate-400 space-y-0.5 font-mono">
                    <li>• Architectural Modeling</li>
                    <li>• Revit Families</li>
                    <li>• Documentation</li>
                  </ul>
                </div>

                {/* Block 03 */}
                <div className="group relative bg-white dark:bg-[#111827] p-4 rounded-md border border-[#E5E7EB] dark:border-slate-800 hover:border-[#18A999] transition-all duration-300 hover:-translate-y-1 shadow-sm overflow-hidden">
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#18A999] group-hover:w-full transition-all duration-300" />
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-[#18A999]">03</span>
                    <Cpu className="w-3.5 h-3.5 text-[#667085] group-hover:text-[#18A999] transition-colors" />
                  </div>
                  <h4 className="text-xs font-bold font-mono tracking-wider text-[#111827] dark:text-white uppercase mb-1">
                    MEP BIM
                  </h4>
                  <ul className="text-[11px] text-[#667085] dark:text-slate-400 space-y-0.5 font-mono">
                    <li>• HVAC & Plumbing</li>
                    <li>• Electrical Systems</li>
                    <li>• Coordination</li>
                  </ul>
                </div>

                {/* Block 04 */}
                <div className="group relative bg-white dark:bg-[#111827] p-4 rounded-md border border-[#E5E7EB] dark:border-slate-800 hover:border-[#18A999] transition-all duration-300 hover:-translate-y-1 shadow-sm overflow-hidden">
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#18A999] group-hover:w-full transition-all duration-300" />
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-[#18A999]">04</span>
                    <Wrench className="w-3.5 h-3.5 text-[#667085] group-hover:text-[#18A999] transition-colors" />
                  </div>
                  <h4 className="text-xs font-bold font-mono tracking-wider text-[#111827] dark:text-white uppercase mb-1">
                    AUTOCAD
                  </h4>
                  <ul className="text-[11px] text-[#667085] dark:text-slate-400 space-y-0.5 font-mono">
                    <li>• PDF → DWG</li>
                    <li>• 2D Drafting</li>
                    <li>• Technical Documentation</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Download CV Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="assets/documents/riyadh-cv.pdf"
                download="Riyadh_BIM_Specialist_CV.pdf"
                onClick={handleDownloadCV}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#111827] hover:bg-[#18A999] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md group cursor-pointer"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download CV</span>
              </a>

              {downloadSuccess && (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#18A999]">
                  <CheckCircle2 className="w-4 h-4" /> CV File Path Ready (assets/documents/riyadh-cv.pdf)
                </span>
              )}

              {onOpenContact && (
                <button
                  onClick={onOpenContact}
                  className="px-6 py-3 rounded-md bg-[#18A999] hover:bg-[#138b7e] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md"
                >
                  Contact Riyadh
                </button>
              )}
            </div>

          </div>

        </div>

      </section>

      {/* Technical Process Workflow Diagram */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="p-4 rounded-md bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 shadow-sm">
          <div className="text-[10px] font-mono font-bold tracking-widest text-[#667085] dark:text-slate-400 uppercase text-center mb-3">
            TECHNICAL PROCESS WORKFLOW DIAGRAM
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-around gap-3 text-xs font-mono font-bold text-[#111827] dark:text-slate-200">
            <div className="px-3 py-1.5 rounded bg-[#EEF2F5] dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800">
              PROJECT DATA
            </div>
            <span className="text-[#18A999] text-sm sm:rotate-0 rotate-90">↓</span>
            <div className="px-3 py-1.5 rounded bg-[#EEF2F5] dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800">
              BIM SETUP / REVIT MODELING
            </div>
            <span className="text-[#18A999] text-sm sm:rotate-0 rotate-90">↓</span>
            <div className="px-3 py-1.5 rounded bg-[#EEF2F5] dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800">
              COORDINATION & QA/QC + CLASH
            </div>
            <span className="text-[#18A999] text-sm sm:rotate-0 rotate-90">↓</span>
            <div className="px-3 py-1.5 rounded bg-[#18A999] text-white">
              DELIVERABLE (RVT/DWG/IFC/PDF)
            </div>
          </div>
        </div>
      </div>

      {/* HOW I WORK SECTION */}
      <section className="bg-[#EEF2F5] dark:bg-[#0B1220] text-[#111827] dark:text-white py-16 sm:py-20 border-t border-b border-[#E5E7EB] dark:border-slate-800 relative overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-12">
            <div className="text-xs font-mono font-bold tracking-widest text-[#18A999] uppercase mb-1">
              HOW I WORK
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#111827] dark:text-white">
              From project data to professional deliverables.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {/* Step 01 */}
            <div className="relative flex flex-col justify-between p-4 rounded bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 hover:border-[#18A999] transition-all duration-300 shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-full bg-[#18A999]/15 dark:bg-[#18A999]/20 text-[#18A999] text-xs font-mono font-bold flex items-center justify-center border border-[#18A999]/30 dark:border-[#18A999]/40">
                    01
                  </span>
                  <span className="hidden md:inline text-[#18A999] font-mono text-xs">→</span>
                </div>
                <h3 className="text-sm font-bold font-mono text-[#111827] dark:text-white tracking-wider uppercase mb-2">
                  UNDERSTAND
                </h3>
                <ul className="text-xs text-[#667085] dark:text-slate-400 space-y-1 font-mono">
                  <li>• Project requirements</li>
                  <li>• Drawings & specifications</li>
                  <li>• BIM standards & LOD</li>
                </ul>
              </div>
            </div>

            {/* Step 02 */}
            <div className="relative flex flex-col justify-between p-4 rounded bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 hover:border-[#18A999] transition-all duration-300 shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-full bg-[#18A999]/15 dark:bg-[#18A999]/20 text-[#18A999] text-xs font-mono font-bold flex items-center justify-center border border-[#18A999]/30 dark:border-[#18A999]/40">
                    02
                  </span>
                  <span className="hidden md:inline text-[#18A999] font-mono text-xs">→</span>
                </div>
                <h3 className="text-sm font-bold font-mono text-[#111827] dark:text-white tracking-wider uppercase mb-2">
                  PLAN
                </h3>
                <ul className="text-xs text-[#667085] dark:text-slate-400 space-y-1 font-mono">
                  <li>• Model strategy</li>
                  <li>• Project setup & coordinates</li>
                  <li>• Worksets & BIM standards</li>
                </ul>
              </div>
            </div>

            {/* Step 03 */}
            <div className="relative flex flex-col justify-between p-4 rounded bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 hover:border-[#18A999] transition-all duration-300 shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-full bg-[#18A999]/15 dark:bg-[#18A999]/20 text-[#18A999] text-xs font-mono font-bold flex items-center justify-center border border-[#18A999]/30 dark:border-[#18A999]/40">
                    03
                  </span>
                  <span className="hidden md:inline text-[#18A999] font-mono text-xs">→</span>
                </div>
                <h3 className="text-sm font-bold font-mono text-[#111827] dark:text-white tracking-wider uppercase mb-2">
                  MODEL
                </h3>
                <ul className="text-xs text-[#667085] dark:text-slate-400 space-y-1 font-mono">
                  <li>• Revit Architecture</li>
                  <li>• Revit MEP</li>
                  <li>• Families, systems & detailed BIM</li>
                </ul>
              </div>
            </div>

            {/* Step 04 */}
            <div className="relative flex flex-col justify-between p-4 rounded bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 hover:border-[#18A999] transition-all duration-300 shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-full bg-[#18A999]/15 dark:bg-[#18A999]/20 text-[#18A999] text-xs font-mono font-bold flex items-center justify-center border border-[#18A999]/30 dark:border-[#18A999]/40">
                    04
                  </span>
                  <span className="hidden md:inline text-[#18A999] font-mono text-xs">→</span>
                </div>
                <h3 className="text-sm font-bold font-mono text-[#111827] dark:text-white tracking-wider uppercase mb-2">
                  COORDINATE
                </h3>
                <ul className="text-xs text-[#667085] dark:text-slate-400 space-y-1 font-mono">
                  <li>• Model review & QA/QC</li>
                  <li>• Navisworks clash detection</li>
                  <li>• Multidiscipline coordination</li>
                </ul>
              </div>
            </div>

            {/* Step 05 */}
            <div className="relative flex flex-col justify-between p-4 rounded bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 hover:border-[#18A999] transition-all duration-300 shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-full bg-[#18A999] text-white text-xs font-mono font-bold flex items-center justify-center">
                    05
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#18A999]" />
                </div>
                <h3 className="text-sm font-bold font-mono text-[#111827] dark:text-white tracking-wider uppercase mb-2">
                  DELIVER
                </h3>
                <ul className="text-xs text-[#667085] dark:text-slate-400 space-y-1 font-mono">
                  <li>• RVT & IFC models</li>
                  <li>• DWG & PDF documentation</li>
                  <li>• Schedules, quantities & reports</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS I WORK WITH */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-left">
          <div className="text-xs font-mono font-bold tracking-widest text-[#18A999] uppercase mb-1">
            SOFTWARE STACK
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#111827] dark:text-white">
            TOOLS I WORK WITH
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Card 1 */}
          <div className="bg-white dark:bg-[#111827] p-6 rounded-md border-2 border-[#18A999] shadow-md flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-[#18A999] text-white text-[9px] font-mono font-bold px-3 py-1 rounded-bl uppercase tracking-wider">
              PRIMARY TOOL
            </div>
            <div>
              <div className="text-2xl font-extrabold font-mono text-[#111827] dark:text-white mb-1">
                REVIT
              </div>
              <div className="text-xs font-mono text-[#18A999] font-bold uppercase mb-3">
                AUTODESK REVIT · BIM MODELING
              </div>
              <p className="text-xs text-[#667085] dark:text-slate-300 leading-relaxed font-sans">
                Full 3D BIM parametric modeling, custom family creation, architecture & MEP integration, and sheet creation.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E7EB] dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Parametric BIM · LOD 100-400
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-[#111827] p-6 rounded-md border border-[#E5E7EB] dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-[#18A999] transition-colors">
            <div>
              <div className="text-2xl font-extrabold font-mono text-[#111827] dark:text-white mb-1">
                AUTOCAD
              </div>
              <div className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase mb-3">
                AUTODESK AUTOCAD · CAD DRAFTING
              </div>
              <p className="text-xs text-[#667085] dark:text-slate-300 leading-relaxed font-sans">
                Precision 2D technical drafting, PDF to DWG conversion, layer management, and construction detail drawings.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E7EB] dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400">
              2D CAD · Drafting · DWG/DXF
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-[#111827] p-6 rounded-md border border-[#E5E7EB] dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-[#18A999] transition-colors">
            <div>
              <div className="text-2xl font-extrabold font-mono text-[#111827] dark:text-white mb-1">
                NAVISWORKS
              </div>
              <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase mb-3">
                NAVISWORKS MANAGE · COORDINATION
              </div>
              <p className="text-xs text-[#667085] dark:text-slate-300 leading-relaxed font-sans">
                Clash detection matrix, colorful presentations, and interdisciplinary coordination.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E7EB] dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Clash Detection · NWD/NWC
            </div>
          </div>
        </div>

        <div className="bg-[#EEF2F5] dark:bg-slate-900/60 p-4 rounded-md border border-[#E5E7EB] dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono font-bold text-[#667085] dark:text-slate-400 uppercase">
            SUPPORTING SOFTWARE:
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-medium text-[#111827] dark:text-slate-200">
            <span className="px-3 py-1.5 rounded bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 shadow-xs">
              Adobe Photoshop
            </span>
            <span className="px-3 py-1.5 rounded bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 shadow-xs">
              Adobe Acrobat
            </span>
            <span className="px-3 py-1.5 rounded bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 shadow-xs">
              Microsoft Excel
            </span>
          </div>
        </div>
      </section>

    </div>
  );
};
