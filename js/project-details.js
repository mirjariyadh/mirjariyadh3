/**
 * Mirja Riyadh - BIM Specialist Portfolio
 * Dynamic Single Project Detail Page Logic
 */

function renderProjectDetailsPage() {
  const container = document.getElementById('project-details-container');
  if (!container) return;

  const projects = window.projectsData || window.PORTFOLIO_PROJECTS;
  if (!projects || !projects.length) {
    // Retry shortly if data is still loading
    setTimeout(renderProjectDetailsPage, 50);
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const rawId = urlParams.get('id');

  if (!rawId) {
    showNotFound(container);
    return;
  }

  const cleanId = rawId.trim();
  const numericId = parseInt(cleanId.replace(/\D/g, ''), 10);

  // Flexible ID search
  const project = projects.find(p => {
    if (p.id === cleanId) return true;
    if (p.id.toLowerCase() === cleanId.toLowerCase()) return true;
    if (`project-${cleanId}` === p.id) return true;
    if (`project-${String(cleanId).padStart(2, '0')}` === p.id) return true;
    if (!isNaN(numericId)) {
      if (p.id === `project-${String(numericId).padStart(2, '0')}`) return true;
      if (p.id === `project-${numericId}`) return true;
    }
    return false;
  });

  if (!project) {
    showNotFound(container);
    return;
  }

  window.currentProject = project;

  // Normalize project attributes
  const catArray = Array.isArray(project.category) 
    ? project.category 
    : [project.category || 'BIM Project'];
  
  const categoryName = project.categoryName || catArray.join(' • ');
  const shortDesc = project.shortDesc || project.description || '';
  const fullDesc = project.fullDesc || project.longDescription || shortDesc;
  const clientInfo = project.clientRegion || project.client || 'N/A';
  const completionDate = project.completionDate || project.year || 'N/A';
  const lod = project.lod || 'LOD 300';
  const areaSqFt = project.areaSqFt || 'N/A';

  const mainImage = project.thumbnail || project.image || 
    (project.images && project.images[0] ? (typeof project.images[0] === 'string' ? project.images[0] : project.images[0].url) : '');

  let galleryList = (project.images || project.gallery || []).map(img => 
    typeof img === 'string' ? { url: img, caption: project.title } : img
  );

  if (!galleryList.length && mainImage) {
    galleryList = [{ url: mainImage, caption: project.title }];
  }

  window.currentProjectGallery = galleryList;

  const deliverables = project.keyFeatures || project.deliverables || [];
  const software = project.softwareUsed || project.software || [];

  // Update Page Title and Meta Description
  document.title = `${project.title} | ${categoryName} - Mirja Riyadh`;
  
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', `${project.title} - ${shortDesc} Specialized BIM Services by Mirja Riyadh.`);
  }

  // Find Category Page URL based on internal slugs
  let categoryPageUrl = 'all-projects.html';
  if (catArray.includes('architecture') || catArray.some(c => /architecture|Architectural/i.test(c))) {
    categoryPageUrl = 'architecture.html';
  } else if (catArray.includes('mep') || catArray.some(c => /mep/i.test(c))) {
    categoryPageUrl = 'mep.html';
  } else if (catArray.includes('point-cloud') || catArray.some(c => /point[\s_-]?cloud|scan/i.test(c))) {
    categoryPageUrl = 'point-cloud.html';
  } else if (catArray.includes('autocad') || catArray.some(c => /autocad|drafting|documentation/i.test(c))) {
    categoryPageUrl = 'autocad.html';
  }

  // Render Full Project View
  container.innerHTML = `
    <!-- Breadcrumb & Back Link -->
    <nav class="flex items-center space-x-2 text-sm text-gray-400 mb-6 flex-wrap gap-y-1">
      <a href="index.html" class="hover:text-cyan-400 transition-colors">Home</a>
      <span>/</span>
      <a href="${categoryPageUrl}" class="hover:text-cyan-400 transition-colors">${categoryName}</a>
      <span>/</span>
      <span class="text-gray-200 font-medium truncate max-w-xs">${project.title}</span>
    </nav>

    <!-- Header & Meta Tags -->
    <header class="mb-10">
      <div class="flex flex-wrap items-center gap-3 mb-4">
        <span class="px-3 py-1 text-xs font-semibold rounded-sm bg-cyan-950 border border-cyan-500/40 text-cyan-300">
          ${categoryName}
        </span>
        <span class="px-3 py-1 text-xs font-mono font-semibold rounded-sm bg-slate-800 border border-slate-700 text-emerald-400">
          ${lod}
        </span>
        <span class="px-3 py-1 text-xs font-mono text-gray-400 bg-slate-900 border border-slate-800 rounded-sm">
          Completed: ${completionDate}
        </span>
        ${areaSqFt !== 'N/A' ? `
          <span class="px-3 py-1 text-xs font-mono text-cyan-300 bg-slate-900 border border-slate-800 rounded-sm">
            Area: ${areaSqFt}
          </span>
        ` : ''}
      </div>

      <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-100 tracking-tight leading-tight">
        ${project.title}
      </h1>

      <p class="text-lg text-gray-300 mt-4 leading-relaxed max-w-4xl">
        ${shortDesc}
      </p>

      <!-- Compact Professional Project Overview Box -->
      <div class="mt-8 p-5 bg-slate-900/90 border border-slate-800 rounded-md">
        <div class="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span>PROJECT OVERVIEW</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-xs font-mono">
          <div class="space-y-1">
            <span class="text-gray-400 text-[11px] block uppercase">PROJECT TYPE</span>
            <span class="font-bold text-white">${categoryName}</span>
          </div>
          <div class="space-y-1">
            <span class="text-gray-400 text-[11px] block uppercase">SCOPE</span>
            <span class="font-bold text-cyan-400">${project.shortDesc ? project.shortDesc.split('.')[0] : 'BIM Modeling'}</span>
          </div>
          <div class="space-y-1">
            <span class="text-gray-400 text-[11px] block uppercase">SOFTWARE</span>
            <span class="font-bold text-white">${software.join(', ') || 'Autodesk Revit'}</span>
          </div>
          <div class="space-y-1">
            <span class="text-gray-400 text-[11px] block uppercase">LOD</span>
            <span class="font-bold text-emerald-400">${lod}</span>
          </div>
          <div class="space-y-1">
            <span class="text-gray-400 text-[11px] block uppercase">DELIVERABLES</span>
            <span class="font-bold text-white">Revit Model / Documentation</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Project Feature Showcase Image / Comparison -->
    <div class="mb-12 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
      ${project.beforeImage && project.afterImage ? `
        <!-- Interactive Point Cloud Slider -->
        <div class="p-4 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between">
          <span class="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">Interactive Scan-to-BIM Comparison (Drag Handle)</span>
          <span class="text-xs text-gray-400">Raw Point Cloud (Left) vs 3D Revit Model (Right)</span>
        </div>
        <div class="comparison-slider aspect-video">
          <!-- Background Image: Completed 3D Revit Model (Shown on Right) -->
          <img src="${project.afterImage}" alt="Completed 3D Revit Model" class="w-full h-full object-cover select-none pointer-events-none" referrerPolicy="no-referrer" />
          
          <!-- Foreground Clip Image: Raw Point Cloud (Shown on Left) -->
          <div class="img-after absolute inset-0 w-full h-full overflow-hidden">
            <img src="${project.beforeImage}" alt="Raw Laser Scan Point Cloud" class="w-full h-full object-cover select-none pointer-events-none" referrerPolicy="no-referrer" />
          </div>

          <div class="slider-handle">
            <div class="slider-button">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 9l-4 3 4 3m8-6l4 3-4 3"></path></svg>
            </div>
          </div>
        </div>
      ` : `
        <img 
          src="${mainImage}" 
          alt="${project.title} Main Visual" 
          class="w-full aspect-video object-cover"
          referrerPolicy="no-referrer"
        />
      `}
    </div>

    <!-- Content Columns: Deep Dive & Deliverables -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
      
      <!-- Left Column: Detailed Case Study Narrative -->
      <div class="lg:col-span-2 space-y-8">
        <section class="bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
          <h2 class="text-2xl font-bold text-gray-100 mb-4 flex items-center space-x-3">
            <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            <span>Technical Project Overview</span>
          </h2>
          <div class="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-4">
            <p>${fullDesc}</p>
          </div>
        </section>

        <!-- Gallery Screenshots -->
        ${galleryList.length > 0 ? `
          <section class="bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-gray-100 mb-6 flex items-center space-x-3">
              <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span>Project Gallery & High-Res Renders</span>
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${galleryList.map((imgObj, idx) => `
                <div class="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 aspect-video group cursor-pointer" onclick="window.openLightbox(${idx})">
                  <img src="${imgObj.url}" alt="${imgObj.caption || project.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" referrerPolicy="no-referrer" />
                  <div class="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span class="px-3.5 py-1.5 bg-slate-900/90 text-cyan-300 text-xs font-semibold rounded-full border border-cyan-500/40 shadow-lg flex items-center space-x-1.5">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                      <span>Enlarge View</span>
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}
      </div>

      <!-- Right Column: Key Deliverables & Software Sidebar -->
      <div class="space-y-6">
        
        <!-- Deliverables Box -->
        ${deliverables.length > 0 ? `
          <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h3 class="text-lg font-bold text-gray-100 mb-4 pb-3 border-b border-slate-800 flex items-center space-x-2">
              <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Key Project Highlights</span>
            </h3>
            <ul class="space-y-3">
              ${deliverables.map(item => `
                <li class="flex items-start space-x-3 text-sm text-gray-300">
                  <span class="text-cyan-400 mt-0.5">✓</span>
                  <span>${item}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- Software Stack Used -->
        ${software.length > 0 ? `
          <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h3 class="text-lg font-bold text-gray-100 mb-4 pb-3 border-b border-slate-800 flex items-center space-x-2">
              <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
              <span>Software & Tools Used</span>
            </h3>
            <div class="flex flex-wrap gap-2">
              ${software.map(tool => `
                <span class="px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-800 text-cyan-300 border border-slate-700/80 font-medium">
                  ${tool}
                </span>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Inquiry Action Box -->
        <div class="bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-500/30 rounded-2xl p-6 text-center">
          <h3 class="text-xl font-extrabold text-gray-100">Need a Similar BIM Model?</h3>
          <p class="text-xs text-gray-300 mt-2">Get high-precision modeling, clash detection, or point cloud conversion tailored to your project schedule.</p>
          <button 
            onclick="triggerQuoteForProject('${project.title}')"
            class="mt-5 w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-950/50 flex items-center justify-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            <span>Request Quote for This Project</span>
          </button>
        </div>

      </div>
    </div>

    <!-- Related Projects Section -->
    <section class="pt-10 border-t border-slate-800">
      <h2 class="text-2xl font-bold text-gray-100 mb-6">More Related BIM Projects</h2>
      <div id="related-projects-grid" class="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
    </section>
  `;

  // Initialize Comparison Sliders if present
  if (window.initComparisonSliders) {
    window.initComparisonSliders();
  }

  // Render Related Projects
  const relatedContainer = document.getElementById('related-projects-grid');
  if (relatedContainer) {
    const related = projects
      .filter(p => p.id !== project.id)
      .slice(0, 3);

    relatedContainer.innerHTML = related.map(rel => {
      const relCat = rel.categoryName || (Array.isArray(rel.category) ? rel.category.join(' • ') : rel.category);
      const relImg = rel.thumbnail || rel.image || (rel.images && rel.images[0] ? (typeof rel.images[0] === 'string' ? rel.images[0] : rel.images[0].url) : '');
      const relDesc = rel.shortDesc || rel.description || '';
      return `
        <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden card-hover flex flex-col justify-between">
          <div>
            <div class="aspect-video bg-slate-950 overflow-hidden">
              <img src="${relImg}" alt="${rel.title}" class="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
            </div>
            <div class="p-5">
              <span class="text-xs font-mono text-cyan-400 font-semibold">${relCat}</span>
              <h3 class="text-base font-bold text-gray-100 mt-1 line-clamp-1">${rel.title}</h3>
              <p class="text-xs text-gray-400 mt-2 line-clamp-2">${relDesc}</p>
            </div>
          </div>
          <div class="p-5 pt-0">
            <a href="project-details.html?id=${rel.id}" class="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center space-x-1">
              <span>View Case Study</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }
}

function showNotFound(container) {
  document.title = "Project Not Found | Mirja Riyadh BIM Specialist";
  container.innerHTML = `
    <div class="max-w-4xl mx-auto py-20 px-4 text-center">
      <div class="w-20 h-20 mx-auto bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-cyan-400 mb-6">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
      </div>
      <h1 class="text-3xl font-extrabold text-gray-100">Project Not Found</h1>
      <p class="text-gray-400 mt-2 max-w-lg mx-auto">The project you are looking for does not exist or may have been updated in our database catalog.</p>
      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <a href="all-projects.html" class="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition-colors inline-flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span>Back to All Projects</span>
        </a>
        <a href="architecture.html" class="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-gray-200 font-semibold rounded-xl transition-colors">
          Architecture Projects
        </a>
      </div>
    </div>
  `;
}

// Quote trigger pre-filler
function triggerQuoteForProject(projectTitle) {
  const modal = document.getElementById('contact-modal');
  const messageInput = document.getElementById('contact-message');
  if (messageInput) {
    messageInput.value = `Hello Mirja, I am interested in a BIM service similar to: "${projectTitle}". Please contact me with availability and estimated rates.`;
  }
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

// Lightbox modal for gallery images
let currentLightboxIndex = 0;

function openLightbox(index = 0) {
  let gallery = window.currentProjectGallery || [];

  if (!gallery || !gallery.length) {
    if (window.currentProject) {
      const proj = window.currentProject;
      gallery = (proj.images || proj.gallery || []).map(img => 
        typeof img === 'string' ? { url: img, caption: proj.title } : img
      );
      if (!gallery.length && (proj.thumbnail || proj.image)) {
        gallery = [{ url: proj.thumbnail || proj.image, caption: proj.title }];
      }
      window.currentProjectGallery = gallery;
    }
  }

  if (!gallery || !gallery.length) return;

  if (typeof index === 'number') {
    currentLightboxIndex = index;
  } else if (typeof index === 'string' && !isNaN(parseInt(index, 10)) && String(parseInt(index, 10)) === index.trim()) {
    currentLightboxIndex = parseInt(index, 10);
  } else if (typeof index === 'string') {
    const foundIdx = gallery.findIndex(item => (typeof item === 'string' ? item : item.url) === index);
    if (foundIdx !== -1) {
      currentLightboxIndex = foundIdx;
    } else {
      gallery.push({ url: index, caption: 'Project Visual' });
      currentLightboxIndex = gallery.length - 1;
    }
  } else {
    currentLightboxIndex = 0;
  }

  if (currentLightboxIndex < 0 || currentLightboxIndex >= gallery.length) {
    currentLightboxIndex = 0;
  }

  const existing = document.getElementById('lightbox-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'lightbox-modal';
  modal.className = "fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 select-none";

  function renderLightboxStep() {
    const item = gallery[currentLightboxIndex];
    const imgUrl = typeof item === 'string' ? item : (item ? item.url : '');
    const caption = typeof item === 'object' && item && item.caption ? item.caption : '';

    modal.innerHTML = `
      <!-- Top Bar: Counter & Close -->
      <div class="w-full max-w-7xl flex items-center justify-between px-4 py-2 text-white z-20">
        <span class="text-xs md:text-sm font-mono bg-slate-900/90 text-cyan-400 px-4 py-1.5 rounded-full border border-slate-700/80 shadow-lg">
          Image ${currentLightboxIndex + 1} of ${gallery.length}
        </span>
        <button id="lightbox-close-btn" class="bg-slate-900/80 hover:bg-cyan-600 text-white w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center border border-slate-700 transition-colors shadow-lg cursor-pointer">
          ✕
        </button>
      </div>

      <!-- Main Image Display Container -->
      <div class="relative flex-1 w-full max-w-7xl flex items-center justify-center max-h-[80vh] my-2">
        
        <!-- Previous Button ( Left Arrow ) -->
        ${gallery.length > 1 ? `
          <button id="lightbox-prev-btn" class="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-slate-900/90 hover:bg-cyan-600 text-cyan-300 hover:text-white p-3.5 md:p-4 rounded-full border border-slate-700 shadow-2xl transition-all hover:scale-110 flex items-center justify-center cursor-pointer" title="Previous Image (Left Arrow)">
            <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
          </button>
        ` : ''}

        <!-- Enlarged Image -->
        <img src="${imgUrl}" alt="Enlarged Project Visual" class="max-w-full max-h-full object-contain rounded-xl border border-slate-800 shadow-2xl transition-all duration-300" referrerPolicy="no-referrer" />

        <!-- Next Button ( Right Arrow ) -->
        ${gallery.length > 1 ? `
          <button id="lightbox-next-btn" class="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-slate-900/90 hover:bg-cyan-600 text-cyan-300 hover:text-white p-3.5 md:p-4 rounded-full border border-slate-700 shadow-2xl transition-all hover:scale-110 flex items-center justify-center cursor-pointer" title="Next Image (Right Arrow)">
            <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
          </button>
        ` : ''}
      </div>

      <!-- Caption Footer -->
      ${caption ? `
        <div class="bg-slate-900/90 border border-slate-800/90 px-6 py-2.5 rounded-full text-center max-w-3xl text-xs md:text-sm text-gray-200 shadow-xl z-20">
          ${caption}
        </div>
      ` : '<div class="h-4"></div>'}
    `;

    // Event Handlers
    const prevBtn = modal.querySelector('#lightbox-prev-btn');
    if (prevBtn) {
      prevBtn.onclick = (e) => {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex - 1 + gallery.length) % gallery.length;
        renderLightboxStep();
      };
    }

    const nextBtn = modal.querySelector('#lightbox-next-btn');
    if (nextBtn) {
      nextBtn.onclick = (e) => {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex + 1) % gallery.length;
        renderLightboxStep();
      };
    }

    const closeBtn = modal.querySelector('#lightbox-close-btn');
    if (closeBtn) {
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        closeModal();
      };
    }
  }

  function closeModal() {
    window.removeEventListener('keydown', handleKeyEvents);
    modal.remove();
  }

  function handleKeyEvents(e) {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      currentLightboxIndex = (currentLightboxIndex - 1 + gallery.length) % gallery.length;
      renderLightboxStep();
    } else if (e.key === 'ArrowRight') {
      currentLightboxIndex = (currentLightboxIndex + 1) % gallery.length;
      renderLightboxStep();
    }
  }

  window.addEventListener('keydown', handleKeyEvents);

  modal.onclick = (e) => {
    if (e.target === modal || e.target.classList.contains('my-2')) {
      closeModal();
    }
  };

  renderLightboxStep();
  document.body.appendChild(modal);
}

window.triggerQuoteForProject = triggerQuoteForProject;
window.openLightbox = openLightbox;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderProjectDetailsPage);
} else {
  renderProjectDetailsPage();
}
