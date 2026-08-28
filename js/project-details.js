/**
 * Mirja Riyadh - BIM Specialist Portfolio
 * Dynamic Single Project Detail Page Logic & Interactive Suite
 */

// Technical Image Lightbox State
let currentLightboxIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function showBimToast(message) {
  let toast = document.getElementById('bim-toast-elem');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'bim-toast-elem';
    toast.className = 'bim-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg class="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
    <span>${message}</span>
  `;
  toast.classList.add('is-visible');
  clearTimeout(window.bimToastTimer);
  window.bimToastTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 3200);
}

function shareCurrentProject() {
  const proj = window.currentProject;
  const url = window.location.href;
  const title = proj ? proj.title : document.title;
  const text = proj ? (proj.shortDesc || proj.description) : 'BIM Project by Mirja Riyadh';

  if (window.trackBimEvent) {
    window.trackBimEvent('project_share_click', { projectId: proj ? proj.id : 'unknown' });
  }

  if (navigator.share) {
    navigator.share({
      title: title,
      text: text,
      url: url
    }).then(() => {
      showBimToast('Project shared successfully');
    }).catch(err => {
      if (err.name !== 'AbortError') {
        copyProjectLinkFallback(url);
      }
    });
  } else {
    copyProjectLinkFallback(url);
  }
}

function copyProjectLinkFallback(url) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      showBimToast('Project link copied to clipboard!');
    }).catch(() => {
      prompt('Copy project URL:', url);
    });
  } else {
    prompt('Copy project URL:', url);
  }
}

function printProjectSheet() {
  if (window.trackBimEvent && window.currentProject) {
    window.trackBimEvent('project_sheet_print', { projectId: window.currentProject.id });
  }
  window.print();
}

function updateProjectMeta(project, categoryName) {
  const pageTitle = `${project.title} | ${categoryName} — Mirja Riyadh`;
  document.title = pageTitle;

  const descText = project.shortDesc || project.description || `Specialized BIM modeling and coordination case study by Mirja Riyadh.`;

  // Standard Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', `${project.title} — ${descText}`);

  // Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', `https://mirjariyadh.com.bd/project-details.html?id=${project.id}`);

  // Open Graph
  const setOg = (prop, content) => {
    let elem = document.querySelector(`meta[property="${prop}"]`);
    if (!elem) {
      elem = document.createElement('meta');
      elem.setAttribute('property', prop);
      document.head.appendChild(elem);
    }
    elem.setAttribute('content', content);
  };

  const mainImage = project.thumbnail || project.image || 
    (project.images && project.images[0] ? (typeof project.images[0] === 'string' ? project.images[0] : project.images[0].url) : '');
  const absoluteImg = mainImage.startsWith('http') ? mainImage : `https://mirjariyadh.com.bd/${mainImage.replace(/^\.?\//, '')}`;

  setOg('og:title', pageTitle);
  setOg('og:description', descText);
  setOg('og:url', `https://mirjariyadh.com.bd/project-details.html?id=${project.id}`);
  setOg('og:image', absoluteImg);
  setOg('og:type', 'article');

  // Inject Rich JSON-LD Structured Data
  let scriptLd = document.getElementById('project-json-ld');
  if (!scriptLd) {
    scriptLd = document.createElement('script');
    scriptLd.id = 'project-json-ld';
    scriptLd.type = 'application/ld+json';
    document.head.appendChild(scriptLd);
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mirjariyadh.com.bd/" },
          { "@type": "ListItem", "position": 2, "name": "All Projects", "item": "https://mirjariyadh.com.bd/all-projects.html" },
          { "@type": "ListItem", "position": 3, "name": project.title, "item": `https://mirjariyadh.com.bd/project-details.html?id=${project.id}` }
        ]
      },
      {
        "@type": "CreativeWork",
        "@id": `https://mirjariyadh.com.bd/project-details.html?id=${project.id}#project`,
        "name": project.title,
        "description": descText,
        "image": absoluteImg,
        "creator": {
          "@type": "Person",
          "name": "Mirja Riyadh",
          "jobTitle": "Senior BIM Specialist & Revit Modeler",
          "url": "https://mirjariyadh.com.bd/"
        },
        "genre": categoryName,
        "keywords": `BIM, Revit, ${project.lod || 'LOD 350'}, ${(project.softwareUsed || []).join(', ')}, ${project.buildingType || 'Building'}`
      }
    ]
  };

  scriptLd.textContent = JSON.stringify(structuredData, null, 2);
}

function renderProjectDetailsPage() {
  const container = document.getElementById('project-details-container');
  if (!container) return;

  const projects = window.projectsData || window.PORTFOLIO_PROJECTS;
  if (!projects || !projects.length) {
    setTimeout(renderProjectDetailsPage, 50);
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const rawId = urlParams.get('id');

  if (!rawId) {
    showNotFound(container);
    return;
  }

  let project = window.BIM_PROJECT_UTILS ? window.BIM_PROJECT_UTILS.getById(rawId) : null;
  if (!project) {
    const cleanId = rawId.trim().toLowerCase();
    project = projects.find(p => p.id.toLowerCase() === cleanId || p.id.toLowerCase() === `project-${cleanId}`);
  }

  if (!project) {
    showNotFound(container);
    return;
  }

  window.currentProject = project;

  if (window.trackBimEvent) {
    window.trackBimEvent('project_view', { projectId: project.id, title: project.title });
  }

  // Normalize project attributes
  const catArray = Array.isArray(project.category) ? project.category : [project.category || 'architecture'];
  const categoryName = project.categoryName || catArray.map(c => c.toUpperCase()).join(' • ');
  const shortDesc = project.shortDesc || project.description || '';
  const fullDesc = project.fullDesc || project.longDescription || shortDesc;
  const clientInfo = project.clientRegion || project.client || 'International Client';
  const completionDate = project.completionDate || project.year || 'Completed';
  const lod = project.lod || 'LOD 350';
  const areaSqFt = project.areaSqFt || 'N/A';
  const buildingType = (project.buildingType || 'Commercial / Residential').toUpperCase();

  const mainImage = project.thumbnail || project.image || 
    (project.images && project.images[0] ? (typeof project.images[0] === 'string' ? project.images[0] : project.images[0].url) : '');

  // Extract gallery groups and flat gallery list for lightboxes
  let galleryGroups = [];
  let flatGalleryList = [];

  if (Array.isArray(project.galleryGroups) && project.galleryGroups.length > 0) {
    project.galleryGroups.forEach(grp => {
      const gName = grp.name || grp.groupTitle || grp.title || grp.group || 'General Drawings';
      const grpImages = (grp.images || grp.gallery || []).map(img => 
        typeof img === 'string' ? { url: img, caption: project.title, group: gName } : { ...img, group: img.group || gName }
      );
      if (grpImages.length > 0) {
        galleryGroups.push({
          name: gName,
          images: grpImages
        });
        flatGalleryList.push(...grpImages);
      }
    });
  } else {
    // Check if flat images array has group properties
    const rawImages = (project.images || project.gallery || []).map(img => 
      typeof img === 'string' ? { url: img, caption: project.title } : img
    );

    const hasAnyGroup = rawImages.some(img => img && img.group);

    if (hasAnyGroup) {
      // Group by img.group preserving appearance order
      const groupMap = new Map();
      rawImages.forEach(img => {
        const gName = img.group || 'Project Drawings';
        if (!groupMap.has(gName)) {
          groupMap.set(gName, []);
        }
        groupMap.get(gName).push(img);
      });
      groupMap.forEach((imgs, gName) => {
        galleryGroups.push({
          name: gName,
          images: imgs
        });
      });
      flatGalleryList = rawImages;
    } else {
      flatGalleryList = rawImages;
      if (rawImages.length > 0) {
        galleryGroups.push({
          name: '',
          images: rawImages
        });
      }
    }
  }

  if (!flatGalleryList.length && mainImage) {
    flatGalleryList = [{ url: mainImage, caption: project.title }];
    galleryGroups = [{ name: '', images: flatGalleryList }];
  }

  const galleryList = flatGalleryList;
  window.currentProjectGallery = galleryList;

  const deliverables = project.deliverables || project.keyFeatures || [
    'Autodesk Revit 3D Model (.RVT)',
    'Coordinated BIM Sheet Sets (.PDF)',
    'AutoCAD Shop Drawings (.DWG)',
    'Clash Detection Report (.NWD)'
  ];
  const software = project.softwareUsed || project.software || ['Autodesk Revit', 'Navisworks Manage', 'AutoCAD'];

  // SEO & Social Meta
  updateProjectMeta(project, categoryName);

  // Category page URL
  let categoryPageUrl = 'all-projects.html';
  if (catArray.includes('architecture')) categoryPageUrl = 'architecture.html';
  else if (catArray.includes('mep')) categoryPageUrl = 'mep.html';
  else if (catArray.includes('point-cloud')) categoryPageUrl = 'point-cloud.html';
  else if (catArray.includes('autocad')) categoryPageUrl = 'autocad.html';

  // Check if project is Point Cloud to render comparison slider
  const isPointCloudProject = catArray.includes('point-cloud') || catArray.includes('pointcloud') || /point[\s_-]?cloud|scan/i.test(categoryName) || Boolean(project.beforeImage && project.afterImage);
  const pointCloudImg = project.beforeImage || (galleryList.length > 0 ? galleryList[0].url : mainImage);
  const bimModelImg = project.afterImage || (galleryList.length > 1 ? galleryList[1].url : (galleryList.length > 0 ? galleryList[0].url : mainImage));

  // Previous and Next Projects
  const adj = window.BIM_PROJECT_UTILS ? window.BIM_PROJECT_UTILS.getAdjacentProjects(project.id) : { prev: null, next: null };
  const prevProj = adj.prev;
  const nextProj = adj.next;

  container.innerHTML = `
    <!-- Printable Header Banner (Only visible during print) -->
    <div class="print-header hidden">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-black">${project.title}</h1>
          <p class="text-xs text-gray-700">Mirja Riyadh — Senior BIM Specialist (mirjariyadh.com.bd)</p>
        </div>
        <div class="text-right text-xs text-gray-600">
          <p>Email: mirja.riyadh@gmail.com</p>
          <p>Date: ${completionDate} | LOD: ${lod}</p>
        </div>
      </div>
    </div>

    <!-- Breadcrumbs & Quick Actions Row -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 no-print">
      <nav class="flex items-center space-x-2 text-xs font-mono text-gray-400 flex-wrap gap-y-1">
        <a href="index.html" class="hover:text-cyan-400 transition-colors">Home</a>
        <span>/</span>
        <a href="all-projects.html" class="hover:text-cyan-400 transition-colors">Portfolio</a>
        <span>/</span>
        <a href="${categoryPageUrl}" class="hover:text-cyan-400 transition-colors">${catArray[0].toUpperCase()}</a>
        <span>/</span>
        <span class="text-cyan-400 font-semibold truncate max-w-xs">${project.title}</span>
      </nav>

      <!-- Action Buttons (Share) -->
      <div class="flex items-center space-x-2">
        <button 
          onclick="shareCurrentProject()" 
          class="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-gray-300 hover:text-white rounded text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer"
          title="Share or Copy Link"
        >
          <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
          <span>Share Project</span>
        </button>
      </div>
    </div>

    <!-- Header & Title -->
    <header class="mb-8 sm:mb-10">
      <div class="flex flex-wrap items-center gap-2 mb-4">
        <span class="px-2.5 py-1 text-[11px] font-mono font-bold uppercase rounded-sm bg-cyan-950/90 border border-cyan-500/40 text-cyan-300">
          ${categoryName}
        </span>
        <span class="px-2.5 py-1 text-[11px] font-mono font-bold rounded-sm bg-slate-900 border border-emerald-500/40 text-emerald-400">
          ${lod}
        </span>
        <span class="px-2.5 py-1 text-[11px] font-mono text-gray-300 bg-slate-900 border border-slate-800 rounded-sm">
          Building: ${buildingType}
        </span>
        <span class="px-2.5 py-1 text-[11px] font-mono text-gray-400 bg-slate-900 border border-slate-800 rounded-sm">
          Completed: ${completionDate}
        </span>
        ${areaSqFt !== 'N/A' ? `
          <span class="px-2.5 py-1 text-[11px] font-mono text-cyan-300 bg-slate-900 border border-slate-800 rounded-sm">
            Area: ${areaSqFt}
          </span>
        ` : ''}
      </div>

      <h1 class="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight break-words">
        ${project.title}
      </h1>

      <p class="text-sm sm:text-base lg:text-lg text-gray-300 mt-3 sm:mt-4 leading-relaxed max-w-4xl font-normal break-words">
        ${shortDesc}
      </p>

      <!-- Technical Project Overview Matrix Box -->
      <div class="mt-6 sm:mt-8 p-4 sm:p-5 bg-slate-900/90 border border-slate-800 rounded-md">
        <div class="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span>TECHNICAL PROJECT OVERVIEW</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 text-xs font-mono">
          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] sm:text-[11px] block uppercase">DISCIPLINE</span>
            <span class="font-bold text-white break-words">${categoryName}</span>
          </div>
          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] sm:text-[11px] block uppercase">BUILDING TYPE</span>
            <span class="font-bold text-white break-words">${buildingType}</span>
          </div>
          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] sm:text-[11px] block uppercase">SOFTWARE</span>
            <span class="font-bold text-cyan-400 break-words">${software.join(', ')}</span>
          </div>
          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] sm:text-[11px] block uppercase">LOD SPEC</span>
            <span class="font-bold text-emerald-400">${lod}</span>
          </div>
          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] sm:text-[11px] block uppercase">CLIENT REGION</span>
            <span class="font-bold text-gray-300 break-words">${clientInfo}</span>
          </div>
          <div class="space-y-1">
            <span class="text-gray-400 text-[10px] sm:text-[11px] block uppercase">DELIVERABLES</span>
            <span class="font-bold text-white break-words">RVT · IFC · DWG · PDF</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Showcase Visual / Scan-to-BIM Comparison -->
    <div class="mb-12 rounded-md overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
      ${isPointCloudProject ? `
        <!-- Interactive Point Cloud vs 3D BIM Model Slider -->
        <div class="p-3 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 no-print">
          <div class="flex items-center space-x-2">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span class="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Point Cloud vs. 3D BIM Model (Drag Slider)</span>
          </div>
          <div class="flex items-center space-x-3 text-[11px] font-mono">
            <span class="text-amber-400 font-bold">← Point Cloud (Left)</span>
            <span class="text-gray-500">|</span>
            <span class="text-cyan-400 font-bold">3D BIM Model (Right) →</span>
          </div>
        </div>

        <div class="relative comparison-slider aspect-video select-none cursor-ew-resize bg-slate-950">
          <!-- Right Side: 3D BIM Model Background -->
          <img 
            src="${bimModelImg}" 
            alt="${project.title} - 3D BIM Model" 
            class="w-full h-full object-cover select-none pointer-events-none" 
            referrerPolicy="no-referrer" 
          />
          
          <!-- Left Side (Clipped): Raw Point Cloud Scan -->
          <div class="img-after absolute inset-0 w-full h-full overflow-hidden">
            <img 
              src="${pointCloudImg}" 
              alt="${project.title} - Point Cloud Scan" 
              class="w-full h-full object-cover select-none pointer-events-none" 
              referrerPolicy="no-referrer" 
            />
          </div>

          <!-- Badges -->
          <div class="absolute top-3 left-3 z-10 pointer-events-none">
            <span class="px-2.5 py-1 bg-slate-950/90 text-amber-400 text-[10px] font-mono font-bold rounded-sm border border-amber-500/40 shadow-md">
              POINT CLOUD
            </span>
          </div>

          <div class="absolute top-3 right-3 z-10 pointer-events-none">
            <span class="px-2.5 py-1 bg-slate-950/90 text-cyan-300 text-[10px] font-mono font-bold rounded-sm border border-cyan-500/40 shadow-md">
              3D BIM MODEL
            </span>
          </div>

          <!-- Slider Center Handle -->
          <div class="slider-handle">
            <div class="slider-button">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 9l-4 3 4 3m8-6l4 3-4 3"></path></svg>
            </div>
          </div>

          <!-- Enlarge Visual Trigger Button -->
          <button 
            type="button" 
            class="absolute bottom-3 left-3 z-20 px-3 py-1.5 bg-slate-900/90 hover:bg-cyan-600 text-gray-200 hover:text-white rounded border border-slate-700 text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer" 
            title="Open full view in lightbox" 
            onclick="window.openLightbox(0)"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
            <span>Enlarge Visual (Lightbox)</span>
          </button>
        </div>
      ` : `
        <div class="relative group cursor-pointer aspect-video" onclick="window.openLightbox(0)">
          <img 
            src="${mainImage}" 
            alt="${project.title} Main Visual" 
            class="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div class="absolute inset-0 bg-cyan-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center no-print">
            <span class="px-4 py-2 bg-slate-900/95 text-cyan-300 text-xs font-mono font-bold rounded-md border border-cyan-500/40 shadow-xl flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
              <span>Click to Enlarge Drawing (Lightbox)</span>
            </span>
          </div>
        </div>
      `}
    </div>

    <!-- Deep Dive Case Study Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
      
      <!-- Left Column (2 Cols): Case Study Narrative & Gallery -->
      <div class="lg:col-span-2 space-y-8">
        
        <!-- Case Study Detailed Scope -->
        <section class="bg-slate-900/50 border border-slate-800 rounded-md p-6 sm:p-8">
          <h2 class="text-xl font-bold text-white mb-4 flex items-center space-x-2.5">
            <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>Project Scope & Technical Execution</span>
          </h2>
          <div class="text-sm text-gray-300 leading-relaxed space-y-4">
            <p>${fullDesc}</p>
          </div>
        </section>

        <!-- Technical Image Gallery with Lightbox Hook -->
        ${galleryList.length > 0 ? `
          <section class="bg-slate-900/50 border border-slate-800 rounded-md p-6 sm:p-8">
            <div class="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
              <h2 class="text-xl font-bold text-white flex items-center space-x-2.5">
                <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Project Gallery & Technical Drawings</span>
              </h2>
              <span class="text-xs font-mono px-2.5 py-1 bg-slate-950 text-cyan-400 border border-slate-800 rounded-sm font-semibold">${galleryList.length} Visuals</span>
            </div>

            <!-- Grouped Gallery Container -->
            <div class="space-y-8">
              ${(() => {
                let globalIdx = 0;
                return galleryGroups.map(grp => {
                  const hasGroupName = Boolean(grp.name && grp.name.trim().length > 0 && (galleryGroups.length > 1 || grp.name.toLowerCase() !== 'general drawings'));
                  return `
                    <div class="space-y-4">
                      ${hasGroupName ? `
                        <div class="flex items-center justify-between pt-1 pb-1">
                          <div class="flex items-center space-x-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                            <h3 class="text-sm font-mono font-bold text-cyan-300 uppercase tracking-wider">${grp.name}</h3>
                          </div>
                          <span class="text-[11px] font-mono text-gray-500">${grp.images.length} Drawing${grp.images.length > 1 ? 's' : ''}</span>
                        </div>
                      ` : ''}

                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        ${grp.images.map(imgObj => {
                          const currentIdx = globalIdx++;
                          return `
                            <div 
                              class="relative overflow-hidden rounded-md border border-slate-800 bg-slate-950 aspect-video group cursor-pointer hover:border-cyan-500/50 transition-colors" 
                              onclick="window.openLightbox(${currentIdx})"
                              tabindex="0"
                              role="button"
                              aria-label="View Image ${currentIdx + 1}"
                              onkeydown="if(event.key==='Enter'||event.key===' ') { window.openLightbox(${currentIdx}); event.preventDefault(); }"
                            >
                              <img 
                                src="${imgObj.url}" 
                                alt="${imgObj.caption || project.title}" 
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                loading="lazy" 
                                referrerPolicy="no-referrer" 
                              />
                              <div class="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span class="px-3 py-1.5 bg-slate-900 text-cyan-300 text-xs font-mono font-bold rounded border border-cyan-500/40 shadow-lg flex items-center space-x-1.5">
                                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                                  <span>Inspect Drawing</span>
                                </span>
                              </div>
                            </div>
                          `;
                        }).join('')}
                      </div>
                    </div>
                  `;
                }).join('');
              })()}
            </div>
          </section>
        ` : ''}
      </div>

      <!-- Right Column (1 Col): Key Deliverables & Actions -->
      <div class="space-y-6">
        
        <!-- Deliverables & Highlights -->
        <div class="bg-slate-900/90 border border-slate-800 rounded-md p-6">
          <h3 class="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider mb-4 pb-3 border-b border-slate-800 flex items-center space-x-2">
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Deliverables & Highlights</span>
          </h3>
          <ul class="space-y-3">
            ${deliverables.map(item => `
              <li class="flex items-start space-x-2.5 text-xs text-gray-300 leading-normal">
                <span class="text-cyan-400 font-mono font-bold shrink-0">✓</span>
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Software Stack -->
        <div class="bg-slate-900/90 border border-slate-800 rounded-md p-6">
          <h3 class="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider mb-4 pb-3 border-b border-slate-800 flex items-center space-x-2">
            <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            <span>Software & Standards</span>
          </h3>
          <div class="flex flex-wrap gap-2">
            ${software.map(tool => `
              <span class="px-2.5 py-1 text-xs font-mono rounded bg-slate-950 text-cyan-300 border border-slate-800">
                ${tool}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Direct Inquiry Card -->
        <div class="bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 rounded-md p-6 text-center space-y-4 no-print">
          <span class="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">CLIENT INQUIRY</span>
          <h3 class="text-lg font-bold text-white">Need a Similar BIM Model?</h3>
          <p class="text-xs text-gray-400 leading-relaxed">
            Get high-precision modeling, clash detection, or point cloud conversion tailored to your project schedule and LOD requirement.
          </p>
          <button 
            onclick="triggerQuoteForProject('${project.title}')"
            class="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold rounded transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            <span>Request Quote for This Project</span>
          </button>
        </div>

      </div>
    </div>

    <!-- Previous / Next Project Navigation Bar -->
    <nav class="my-10 pt-6 pb-6 border-t border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 no-print text-xs font-mono">
      ${prevProj ? `
        <a href="project-details.html?id=${prevProj.id}" class="w-full sm:w-auto p-3 bg-slate-900 hover:bg-slate-850 hover:border-cyan-500/50 border border-slate-800 rounded flex items-center space-x-3 text-gray-300 hover:text-white transition-all group">
          <span class="text-cyan-400 group-hover:-translate-x-1 transition-transform">←</span>
          <div class="text-left">
            <span class="text-[10px] text-gray-500 uppercase block">Previous Project</span>
            <span class="font-bold truncate max-w-[200px] block">${prevProj.title}</span>
          </div>
        </a>
      ` : `<div class="hidden sm:block"></div>`}

      <a href="all-projects.html" class="text-xs font-mono text-cyan-400 hover:underline px-4 py-2">
        View All Projects
      </a>

      ${nextProj ? `
        <a href="project-details.html?id=${nextProj.id}" class="w-full sm:w-auto p-3 bg-slate-900 hover:bg-slate-850 hover:border-cyan-500/50 border border-slate-800 rounded flex items-center justify-between sm:justify-end space-x-3 text-gray-300 hover:text-white transition-all group">
          <div class="text-right">
            <span class="text-[10px] text-gray-500 uppercase block">Next Project</span>
            <span class="font-bold truncate max-w-[200px] block">${nextProj.title}</span>
          </div>
          <span class="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
        </a>
      ` : `<div class="hidden sm:block"></div>`}
    </nav>

    <!-- Related Projects Section -->
    <section class="pt-8 no-print">
      <div class="flex items-center justify-between mb-6">
        <div>
          <span class="text-xs font-mono text-cyan-400 uppercase tracking-wider block">EXPLORE MORE</span>
          <h2 class="text-2xl font-bold text-white mt-1">Related Projects</h2>
        </div>
        <a href="all-projects.html" class="text-xs font-mono text-cyan-400 hover:underline hidden sm:block">
          All Case Studies →
        </a>
      </div>
      <div id="related-projects-grid" class="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
    </section>
  `;

  // Initialize Comparison Sliders if present
  if (window.initComparisonSliders) {
    window.initComparisonSliders();
  }

  // Render Smart Related Projects
  const relatedContainer = document.getElementById('related-projects-grid');
  if (relatedContainer) {
    const related = window.BIM_PROJECT_UTILS 
      ? window.BIM_PROJECT_UTILS.getRelatedProjects(project.id, 3)
      : projects.filter(p => p.id !== project.id).slice(0, 3);

    relatedContainer.innerHTML = related.map(rel => {
      const relCat = rel.categoryName || (Array.isArray(rel.category) ? rel.category[0].toUpperCase() : 'BIM MODEL');
      const relImg = rel.thumbnail || rel.image || (rel.images && rel.images[0] ? (typeof rel.images[0] === 'string' ? rel.images[0] : rel.images[0].url) : '');
      const relLod = rel.lod || 'LOD 350';
      const relSoftware = (rel.softwareUsed && rel.softwareUsed[0]) || 'Autodesk Revit';

      return `
        <div class="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-md overflow-hidden flex flex-col justify-between group transition-all duration-300">
          <div>
            <div class="aspect-video bg-slate-950 overflow-hidden relative">
              <img src="${relImg}" alt="${rel.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" referrerPolicy="no-referrer" />
              <div class="absolute top-2 left-2">
                <span class="px-2 py-0.5 bg-slate-950/90 text-cyan-400 text-[9px] font-mono font-bold uppercase rounded border border-cyan-500/30">
                  ${relCat}
                </span>
              </div>
            </div>
            <div class="p-4 space-y-2">
              <h3 class="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                ${rel.title}
              </h3>
              <p class="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                ${rel.shortDesc || ''}
              </p>
              <div class="pt-2 flex items-center justify-between text-[11px] font-mono text-gray-400 border-t border-slate-800/80">
                <span class="text-emerald-400 font-bold">${relLod}</span>
                <span>${relSoftware}</span>
              </div>
            </div>
          </div>
          <div class="p-4 pt-0">
            <a href="project-details.html?id=${rel.id}" class="w-full py-2 bg-slate-800/80 hover:bg-cyan-600 text-gray-200 hover:text-white text-xs font-mono font-bold rounded flex items-center justify-center space-x-1.5 transition-all">
              <span>View Case Study</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
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
    <div class="max-w-xl mx-auto py-20 px-4 text-center">
      <div class="w-16 h-16 mx-auto bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-cyan-400 mb-6">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
      </div>
      <h1 class="text-2xl font-extrabold text-white">Project Not Found</h1>
      <p class="text-gray-400 text-xs font-mono mt-2">The requested BIM case study is unavailable or has moved.</p>
      <div class="mt-8 flex justify-center gap-4">
        <a href="all-projects.html" class="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold rounded transition-colors inline-flex items-center space-x-2">
          <span>Explore All Projects</span>
          <span>→</span>
        </a>
      </div>
    </div>
  `;
}

// Quote trigger pre-filler
function triggerQuoteForProject(projectTitle) {
  const msg = `Hello Mirja, I am interested in a BIM modeling service similar to "${projectTitle}". Please contact me regarding scope and estimate.`;
  if (window.openContactModal) {
    window.openContactModal('', msg);
  } else {
    const modal = document.getElementById('contact-modal');
    const messageInput = document.getElementById('contact-message') || (modal ? modal.querySelector('textarea[name="message"]') : null);
    if (messageInput) {
      messageInput.value = msg;
    }
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  if (window.trackBimEvent) {
    window.trackBimEvent('project_quote_trigger', { projectTitle });
  }
}

// Technical Image Lightbox Modal
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
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-label', 'Technical Image Viewer');

  function renderLightboxStep() {
    const item = gallery[currentLightboxIndex];
    const imgUrl = typeof item === 'string' ? item : (item ? item.url : '');
    const caption = typeof item === 'object' && item && item.caption ? item.caption : (window.currentProject ? window.currentProject.title : '');
    const groupName = typeof item === 'object' && item && item.group ? item.group : '';

    modal.innerHTML = `
      <!-- Top Bar: Counter & Close Button -->
      <div class="w-full max-w-7xl flex items-center justify-between px-2 sm:px-4 py-1 sm:py-2 text-white z-20 shrink-0">
        <span class="text-xs font-mono bg-slate-900/90 text-cyan-400 px-3 py-1.5 rounded border border-slate-700 shadow-md flex items-center space-x-1.5 max-w-[calc(100%-50px)] overflow-hidden">
          <span class="shrink-0 font-bold">Image ${currentLightboxIndex + 1} of ${gallery.length}</span>
          ${groupName ? `<span class="text-gray-600 shrink-0">|</span><span class="text-gray-300 font-normal truncate">${groupName}</span>` : ''}
        </span>
        <button id="lightbox-close-btn" class="bg-slate-900 hover:bg-cyan-600 text-white w-9 h-9 rounded flex items-center justify-center border border-slate-700 transition-colors shadow-lg cursor-pointer shrink-0 ml-2" aria-label="Close Lightbox">
          ✕
        </button>
      </div>

      <!-- Main Image Display (Uncropped Technical Drawing View) -->
      <div id="lightbox-content-area" class="relative flex-1 min-h-0 w-full max-w-7xl flex items-center justify-center my-1 sm:my-2 overflow-hidden">
        
        <!-- Previous Button -->
        ${gallery.length > 1 ? `
          <button id="lightbox-prev-btn" class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-slate-900/90 hover:bg-cyan-600 text-cyan-300 hover:text-white p-2.5 sm:p-3 rounded-full border border-slate-700 shadow-2xl transition-all flex items-center justify-center cursor-pointer min-h-[40px] min-w-[40px]" aria-label="Previous image">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
          </button>
        ` : ''}

        <!-- Image Element with Anti-Download Shield & Watermark -->
        <div class="relative max-w-full max-h-full flex items-center justify-center select-none img-copyright-shield">
          <img 
            id="lightbox-main-img"
            src="${imgUrl}" 
            alt="${caption}" 
            class="max-w-full max-h-full object-contain rounded border border-slate-800/80 shadow-2xl transition-opacity duration-200 pointer-events-none select-none" 
            referrerPolicy="no-referrer" 
          />
          <!-- Subtle Floating Copyright Shield Tag -->
          <div class="absolute bottom-3 right-3 bg-slate-950/85 border border-slate-700/80 px-2.5 py-1 rounded text-[10px] font-mono text-cyan-300 backdrop-blur-md shadow-lg pointer-events-none select-none flex items-center space-x-1.5 opacity-80 hover:opacity-100">
            <svg class="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m0 0v2m0-2h2m-2 0H10m11-3.5a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>© Mirja Riyadh</span>
          </div>
        </div>

        <!-- Next Button -->
        ${gallery.length > 1 ? `
          <button id="lightbox-next-btn" class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-slate-900/90 hover:bg-cyan-600 text-cyan-300 hover:text-white p-2.5 sm:p-3 rounded-full border border-slate-700 shadow-2xl transition-all flex items-center justify-center cursor-pointer min-h-[40px] min-w-[40px]" aria-label="Next image">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
          </button>
        ` : ''}
      </div>

      <!-- Bottom Container: Caption & Bottom Thumbnail Preview Strip -->
      <div class="w-full max-w-7xl flex flex-col items-center gap-2 z-20 px-2 sm:px-4 pb-1 shrink-0 select-none">
        
        <!-- Caption Bar (Full text wrap on mobile, prevents truncation clipping) -->
        ${caption ? `
          <div class="bg-slate-900/95 border border-slate-800 px-3.5 py-1.5 sm:px-4 sm:py-1 rounded-md sm:rounded-full text-center max-w-[94vw] sm:max-w-2xl text-[11px] sm:text-xs font-mono text-cyan-300 shadow-xl break-words leading-tight">
            ${caption}
          </div>
        ` : ''}

        <!-- Horizontal Thumbnail Preview Strip (All Project Images) -->
        ${gallery.length > 1 ? `
          <div class="w-full flex items-center justify-center">
            <div id="lightbox-thumb-strip" class="flex items-center gap-2 overflow-x-auto max-w-[95vw] sm:max-w-full py-1.5 px-3 bg-slate-950/90 border border-slate-800 rounded-lg scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
              ${gallery.map((thumbItem, tIdx) => {
                const tUrl = typeof thumbItem === 'string' ? thumbItem : (thumbItem ? thumbItem.url : '');
                const isActive = tIdx === currentLightboxIndex;
                return `
                  <button 
                    type="button"
                    data-thumb-index="${tIdx}"
                    class="lightbox-thumb-btn shrink-0 w-16 h-11 sm:w-20 sm:h-13 rounded overflow-hidden transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? 'border-2 border-cyan-400 ring-2 ring-cyan-400/50 opacity-100 scale-105 shadow-lg shadow-cyan-950' 
                        : 'border border-slate-800 opacity-50 hover:opacity-100 hover:border-slate-600'
                    }"
                    title="View Image ${tIdx + 1}"
                  >
                    <img 
                      src="${tUrl}" 
                      alt="Thumbnail ${tIdx + 1}" 
                      class="w-full h-full object-cover pointer-events-none" 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Event Handlers for Prev / Next / Close
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

    // Thumbnail Clicks
    modal.querySelectorAll('.lightbox-thumb-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-thumb-index'), 10);
        if (!isNaN(idx) && idx !== currentLightboxIndex) {
          currentLightboxIndex = idx;
          renderLightboxStep();
        }
      };
    });

    // Auto-scroll active thumbnail into view smoothly
    setTimeout(() => {
      const activeThumb = modal.querySelector(`[data-thumb-index="${currentLightboxIndex}"]`);
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }, 20);

    // Touch swipe gestures for mobile
    const contentArea = modal.querySelector('#lightbox-content-area');
    if (contentArea) {
      contentArea.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      contentArea.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swiped Left -> Next Image
      currentLightboxIndex = (currentLightboxIndex + 1) % gallery.length;
      renderLightboxStep();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swiped Right -> Prev Image
      currentLightboxIndex = (currentLightboxIndex - 1 + gallery.length) % gallery.length;
      renderLightboxStep();
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
    if (e.target === modal || e.target.id === 'lightbox-content-area') {
      closeModal();
    }
  };

  renderLightboxStep();
  document.body.appendChild(modal);
}

// Global exports
window.triggerQuoteForProject = triggerQuoteForProject;
window.openLightbox = openLightbox;
window.shareCurrentProject = shareCurrentProject;
window.printProjectSheet = printProjectSheet;
window.showBimToast = showBimToast;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderProjectDetailsPage);
} else {
  renderProjectDetailsPage();
}
