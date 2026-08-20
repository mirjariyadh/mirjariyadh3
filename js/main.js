/**
 * Mirja Riyadh - BIM Specialist & Revit Modeler Portfolio
 * Main Layout & Universal Scripts (GitHub Pages Ready)
 */

// Global State & Constants
const FEATURED_PROJECT_PRIORITY_IDS = [
  'project-01', // 1. Pharma Project
  'project-02', // 2. MEP Coordination Project (Residential)
  'project-04', // 3. Permit Set (Architecture and MEP)
  'project-03', // 4. Point Cloud to BIM: Point Cloud to Revit (School)
  'project-09', // 5. Architectural Drawing Set
  'project-26', // 6. Ventilation Coordinate BIM Project
  'project-20', // 9. Architectural Renovation Project
  'project-27', // 8. Architectural Renovation Project From Point Cloud
  'project-21', // 7. Architectural Model with Detail Roof Structure (Residential)
  'project-16', // 10. Architectural & MEP BIM Model (Hotel Lodge)
  'project-28', // 11. Construction Permit set
  'project-29'  // 12. Point Cloud to Revit Model
];

let homeSelectedCategory = 'all';
let homeSearchQuery = '';
let mobileShowAllProjects = false;

// Analytics-Ready Event Tracker
function trackBimEvent(eventName, data = {}) {
  try {
    if (window.gtag) {
      window.gtag('event', eventName, data);
    }
    // Custom event dispatch for analytics hooks
    window.dispatchEvent(new CustomEvent('bim_portfolio_event', { detail: { eventName, data, timestamp: Date.now() } }));
  } catch (e) {
    // Silent fail
  }
}
window.trackBimEvent = trackBimEvent;

function initMain() {
  // Ensure dark mode is active
  document.documentElement.classList.add('dark');
  document.documentElement.classList.remove('light-theme');
  if (document.body) {
    document.body.classList.remove('light-theme');
  }

  initMobileNav();
  highlightActiveNav();
  initContactModal();
  initRequirementHelper();
  initScrollTop();
  initCopyButtons();
  initSectionObserverAnimations();
  autoInitCategoryGrids();
}

/* Automatically initialize grids if elements are present in DOM */
function autoInitCategoryGrids() {
  // Home Page Selected Projects Grid
  if (document.getElementById('selected-projects-grid')) {
    renderSelectedProjects('all');
    setupSelectedProjectFilters();
  }

  // All Projects Grid (All Projects Page)
  if (document.getElementById('all-projects-grid')) {
    setupAdvancedPortfolioFilter('all-projects-grid');
  }

  // Category Specific Pages
  if (document.getElementById('architecture-projects-grid')) {
    renderProjectGrid('architecture-projects-grid', 'architecture');
  }
  if (document.getElementById('mep-projects-grid')) {
    renderProjectGrid('mep-projects-grid', 'mep');
  }
  if (document.getElementById('pointcloud-projects-grid')) {
    renderProjectGrid('pointcloud-projects-grid', 'point-cloud');
  }
  if (document.getElementById('autocad-projects-grid')) {
    renderProjectGrid('autocad-projects-grid', 'autocad');
  }
}

/* Helper to get formatted category and scope tag */
function getProjectMetadata(project) {
  const cats = Array.isArray(project.category) ? project.category : [project.category || 'architecture'];
  let categoryLabel = 'Architectural BIM';
  let scopeTag = '3D BIM Modeling · Documentation';

  if (project.id === 'project-01' || project.id === 'project-08' || project.buildingType === 'pharmaceutical') {
    categoryLabel = 'Revit BIM Modeling';
    scopeTag = 'Pharmaceutical Facility · Cleanroom · MEP';
  } else if (cats.includes('point-cloud')) {
    categoryLabel = 'Point Cloud → BIM';
    scopeTag = 'Existing Condition · Laser Scan · As-Built';
  } else if (cats.includes('mep') && cats.includes('architecture')) {
    categoryLabel = 'Architecture & MEP BIM';
    scopeTag = 'Multidisciplinary · Clash Coordination';
  } else if (cats.includes('mep')) {
    categoryLabel = 'MEP Coordination';
    scopeTag = 'HVAC Ductwork · Piping · Clash Detection';
  } else if (cats.includes('autocad') && !cats.includes('architecture')) {
    categoryLabel = 'CAD & Documentation';
    scopeTag = 'Permit Sets · Shop Drawings · DWG';
  } else if (cats.includes('architecture')) {
    categoryLabel = 'Architectural BIM';
    scopeTag = 'Parametric Revit · Construction Sheets';
  }

  return { categoryLabel, scopeTag };
}

/* Render 12 Projects for the Home Page Showcase with Category, Search & Mobile-First Prioritization */
function renderSelectedProjects(categoryFilter = 'all', searchQuery = '') {
  const container = document.getElementById('selected-projects-grid');
  if (!container) return;

  const projects = window.projectsData || window.PORTFOLIO_PROJECTS;
  if (!projects || !projects.length) {
    setTimeout(() => renderSelectedProjects(categoryFilter, searchQuery), 50);
    return;
  }

  homeSelectedCategory = categoryFilter;
  homeSearchQuery = searchQuery;

  let filtered = projects;

  // Filter by category
  if (categoryFilter && categoryFilter !== 'all') {
    filtered = filtered.filter(p => matchProjectCategory(p, categoryFilter));
  }

  // Filter by search query
  if (searchQuery && searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => {
      const title = (p.title || '').toLowerCase();
      const desc = (p.shortDesc || p.description || p.fullDesc || '').toLowerCase();
      const client = (p.clientRegion || p.client || '').toLowerCase();
      const building = (p.buildingType || '').toLowerCase();
      const software = (p.softwareUsed || p.software || []).join(' ').toLowerCase();
      const lod = (p.lod || '').toLowerCase();
      const cat = (p.categoryName || (Array.isArray(p.category) ? p.category.join(' ') : '')).toLowerCase();
      return title.includes(q) || desc.includes(q) || client.includes(q) || building.includes(q) || software.includes(q) || lod.includes(q) || cat.includes(q);
    });
  }

  let displayProjects = [];
  if ((!categoryFilter || categoryFilter === 'all') && (!searchQuery || searchQuery.trim() === '')) {
    // Pick the 12 prioritized projects in exact order
    FEATURED_PROJECT_PRIORITY_IDS.forEach(id => {
      const p = projects.find(item => item.id === id);
      if (p && !displayProjects.includes(p)) displayProjects.push(p);
    });
    // Fallback if some IDs not found
    if (displayProjects.length < 12) {
      projects.forEach(p => {
        if (!displayProjects.includes(p) && displayProjects.length < 12) {
          displayProjects.push(p);
        }
      });
    }
  } else {
    displayProjects = filtered.slice(0, 12);
  }

  if (displayProjects.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center bg-slate-900/40 rounded-md border border-slate-800">
        <svg class="w-10 h-10 mx-auto text-slate-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <p class="text-gray-300 font-bold text-sm">No matching projects found</p>
        <p class="text-gray-400 font-mono text-xs mt-1">Try clearing your search keyword or switching category.</p>
      </div>
    `;
    return;
  }

  const isDefaultOverview = (!categoryFilter || categoryFilter === 'all') && (!searchQuery || searchQuery.trim() === '');

  const cardsHtml = displayProjects.map((project, idx) => {
    const { categoryLabel, scopeTag } = getProjectMetadata(project);
    const thumbnail = project.thumbnail || project.image || 
      (project.images && project.images[0] ? (typeof project.images[0] === 'string' ? project.images[0] : project.images[0].url) : '');
    const lod = project.lod || 'LOD 350';
    const primarySoftware = (project.softwareUsed && project.softwareUsed[0]) || 'Autodesk Revit';
    
    // On mobile, hide projects beyond index 2 by default if in default showcase view
    const mobileClass = (isDefaultOverview && idx >= 3 && !mobileShowAllProjects) ? 'mobile-project-collapsed' : '';

    return `
      <div class="bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/80 rounded-md overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-lg hover:shadow-cyan-950/40 ${mobileClass}">
        <div>
          <!-- Thumbnail & Category Tag (16:9 standard ratio) -->
          <div class="relative aspect-video overflow-hidden bg-slate-950">
            <img 
              data-src="${thumbnail}"
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'><rect width='100%' height='100%' fill='%230f172a'/></svg>"
              alt="${project.title}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-slate-900 opacity-90 transition-opacity duration-300 lazy-project-img" 
              loading="lazy" 
              decoding="async"
              referrerPolicy="no-referrer" 
              onload="this.classList.remove('opacity-90'); this.classList.add('opacity-100');"
              onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'225\\' viewBox=\\'0 0 400 225\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%230f172a\\'/><text x=\\'50%\\' y=\\'50%\\' fill=\\'%2338bdf8\\' font-family=\\'monospace\\' font-size=\\'12\\' font-weight=\\'bold\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'>BIM MODEL</text></svg>';"
            />
            <div class="absolute top-2.5 left-2.5">
              <span class="px-2 py-0.5 bg-slate-950/90 text-cyan-400 text-[10px] font-mono font-bold tracking-wider uppercase rounded-sm border border-cyan-500/30">
                ${categoryLabel}
              </span>
            </div>
          </div>

          <!-- Project Specs & Scope -->
          <div class="p-4 space-y-2">
            <h3 class="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
              ${project.title}
            </h3>
            
            <p class="text-[11px] text-gray-400 font-mono line-clamp-1">
              ${scopeTag}
            </p>

            <div class="pt-1 flex items-center justify-between text-[11px] font-mono text-gray-400 border-t border-slate-800/60">
              <span class="text-emerald-400 font-bold">${lod}</span>
              <span>${primarySoftware}</span>
            </div>
          </div>
        </div>

        <!-- Footer Action -->
        <div class="px-4 pb-4 pt-2">
          <a href="project-details.html?id=${project.id}" class="w-full py-2.5 bg-slate-800/80 hover:bg-cyan-600 text-gray-200 hover:text-white text-xs font-mono font-bold rounded flex items-center justify-center space-x-1.5 transition-all min-h-[44px]">
            <span>View Project</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </a>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = cardsHtml;

  // Handle Mobile "Show More / Show Less" toggle if needed
  const mobileToggleContainer = document.getElementById('mobile-projects-toggle-wrapper');
  if (isDefaultOverview && displayProjects.length > 3) {
    if (mobileToggleContainer) {
      mobileToggleContainer.classList.remove('hidden');
      const toggleBtn = document.getElementById('mobile-projects-toggle-btn');
      if (toggleBtn) {
        toggleBtn.textContent = mobileShowAllProjects 
          ? 'Show Top 3 Projects ↑' 
          : `Show More Featured Projects (${displayProjects.length - 3} more) ↓`;
      }
    }
  } else if (mobileToggleContainer) {
    mobileToggleContainer.classList.add('hidden');
  }

  initLazyImages(container);
}

/* Toggle mobile projects expansion */
window.toggleMobileFeaturedProjects = function() {
  mobileShowAllProjects = !mobileShowAllProjects;
  renderSelectedProjects(homeSelectedCategory, homeSearchQuery);
  trackBimEvent('mobile_projects_toggle', { expanded: mobileShowAllProjects });
};

/* Home Page Selected Projects Filter Handler */
function setupSelectedProjectFilters() {
  const filterBtns = document.querySelectorAll('.selected-filter-btn');
  const searchInput = document.getElementById('home-project-search');

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        filterBtns.forEach(b => {
          b.classList.remove('bg-[#009FB7]', 'bg-cyan-600', 'text-white', 'shadow');
          b.classList.add('text-gray-400', 'bg-transparent');
        });
        btn.classList.add('bg-[#009FB7]', 'text-white', 'shadow');
        btn.classList.remove('text-gray-400', 'bg-transparent');

        homeSelectedCategory = btn.getAttribute('data-category') || 'all';
        renderSelectedProjects(homeSelectedCategory, homeSearchQuery);
        trackBimEvent('home_filter_click', { category: homeSelectedCategory });
      };
    });
  }

  if (searchInput) {
    let debounceTimer = null;
    searchInput.oninput = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        homeSearchQuery = searchInput.value;
        renderSelectedProjects(homeSelectedCategory, homeSearchQuery);
        if (homeSearchQuery.length > 2) {
          trackBimEvent('home_search', { query: homeSearchQuery });
        }
      }, 80);
    };
  }
}

/* Advanced Multi-Facet Filter & Instant Search System for all-projects.html */
function setupAdvancedPortfolioFilter(gridContainerId = 'all-projects-grid') {
  const container = document.getElementById(gridContainerId);
  if (!container) return;

  const searchInput = document.getElementById('project-search-input');
  const disciplineBtns = document.querySelectorAll('.filter-discipline-btn, .filter-btn');
  const buildingTypeSelect = document.getElementById('filter-building-type');
  const countBadge = document.getElementById('portfolio-count-badge');
  const clearBtn = document.getElementById('clear-filters-btn');

  let activeDiscipline = 'all';
  let activeBuildingType = 'all';
  let activeSearchQuery = '';

  function applyFilters() {
    let results = [];
    if (window.BIM_PROJECT_UTILS) {
      results = window.BIM_PROJECT_UTILS.filterProjects({
        discipline: activeDiscipline,
        buildingType: activeBuildingType,
        query: activeSearchQuery
      });
    } else {
      const projects = window.projectsData || window.PORTFOLIO_PROJECTS || [];
      results = projects.filter(p => matchProjectCategory(p, activeDiscipline));
    }

    // Update count badge
    if (countBadge) {
      countBadge.textContent = `Showing ${results.length} verified projects`;
    }

    if (results.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center bg-slate-900/40 rounded-md border border-slate-800">
          <svg class="w-10 h-10 mx-auto text-slate-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <h3 class="text-base font-bold text-gray-200">No Matching Projects Found</h3>
          <p class="text-gray-400 text-xs font-mono mt-1">Try resetting filters or using a broader search keyword.</p>
          <button id="reset-filter-action" class="mt-4 px-4 py-1.5 bg-slate-800 hover:bg-cyan-600 text-white text-xs font-mono font-bold rounded transition-colors">
            Reset All Filters
          </button>
        </div>
      `;
      const resetAction = document.getElementById('reset-filter-action');
      if (resetAction) {
        resetAction.onclick = resetFilters;
      }
      return;
    }

    container.innerHTML = results.map(project => {
      const { categoryLabel, scopeTag } = getProjectMetadata(project);
      const thumbnail = project.thumbnail || project.image || 
        (project.images && project.images[0] ? (typeof project.images[0] === 'string' ? project.images[0] : project.images[0].url) : '');
      const lod = project.lod || 'LOD 350';
      const primarySoftware = (project.softwareUsed && project.softwareUsed[0]) || 'Autodesk Revit';

      return `
        <div class="bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/80 rounded-md overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-lg hover:shadow-cyan-950/40">
          <div>
            <div class="relative aspect-video overflow-hidden bg-slate-950">
              <img 
                data-src="${thumbnail}"
                src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'><rect width='100%' height='100%' fill='%230f172a'/></svg>"
                alt="${project.title}" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-slate-900 opacity-90 transition-opacity duration-300 lazy-project-img" 
                loading="lazy" 
                decoding="async"
                referrerPolicy="no-referrer" 
                onload="this.classList.remove('opacity-90'); this.classList.add('opacity-100');"
                onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'225\\' viewBox=\\'0 0 400 225\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%230f172a\\'/><text x=\\'50%\\' y=\\'50%\\' fill=\\'%2338bdf8\\' font-family=\\'monospace\\' font-size=\\'12\\' font-weight=\\'bold\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'>BIM MODEL</text></svg>';"
              />
              <div class="absolute top-2.5 left-2.5">
                <span class="px-2 py-0.5 bg-slate-950/90 text-cyan-400 text-[10px] font-mono font-bold tracking-wider uppercase rounded-sm border border-cyan-500/30">
                  ${categoryLabel}
                </span>
              </div>
            </div>

            <div class="p-4 space-y-2">
              <h3 class="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                ${project.title}
              </h3>
              
              <p class="text-[11px] text-gray-400 font-mono line-clamp-1">
                ${scopeTag}
              </p>

              <div class="pt-1 flex items-center justify-between text-[11px] font-mono text-gray-400 border-t border-slate-800/60">
                <span class="text-emerald-400 font-bold">${lod}</span>
                <span>${primarySoftware}</span>
              </div>
            </div>
          </div>

          <div class="px-4 pb-4 pt-2">
            <a href="project-details.html?id=${project.id}" class="w-full py-2 bg-slate-800/80 hover:bg-cyan-600 text-gray-200 hover:text-white text-xs font-mono font-bold rounded flex items-center justify-center space-x-1.5 transition-all">
              <span>View Case Study</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>
        </div>
      `;
    }).join('');

    initLazyImages(container);
  }

  function resetFilters() {
    activeDiscipline = 'all';
    activeBuildingType = 'all';
    activeSearchQuery = '';
    if (searchInput) searchInput.value = '';
    if (buildingTypeSelect) buildingTypeSelect.value = 'all';
    disciplineBtns.forEach(b => {
      b.classList.remove('bg-cyan-600', 'text-white');
      b.classList.add('text-gray-400');
      if (b.getAttribute('data-discipline') === 'all' || b.getAttribute('data-category') === 'all') {
        b.classList.add('bg-cyan-600', 'text-white');
        b.classList.remove('text-gray-400');
      }
    });
    applyFilters();
  }

  // Discipline Button Handlers
  disciplineBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      disciplineBtns.forEach(b => {
        b.classList.remove('bg-cyan-600', 'text-white');
        b.classList.add('text-gray-400');
      });
      btn.classList.add('bg-cyan-600', 'text-white');
      btn.classList.remove('text-gray-400');

      activeDiscipline = btn.getAttribute('data-discipline') || btn.getAttribute('data-category') || 'all';
      applyFilters();
      trackBimEvent('portfolio_discipline_filter', { discipline: activeDiscipline });
    };
  });

  // Building Type Select Handler
  if (buildingTypeSelect) {
    buildingTypeSelect.onchange = () => {
      activeBuildingType = buildingTypeSelect.value;
      applyFilters();
      trackBimEvent('portfolio_buildingtype_filter', { buildingType: activeBuildingType });
    };
  }

  // Instant Free-Text Search Handler
  if (searchInput) {
    let searchDebounce = null;
    searchInput.oninput = () => {
      activeSearchQuery = searchInput.value;
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        applyFilters();
        if (activeSearchQuery.length > 2) {
          trackBimEvent('portfolio_search', { query: activeSearchQuery });
        }
      }, 80);
    };
  }

  if (clearBtn) {
    clearBtn.onclick = resetFilters;
  }

  // Initial render
  applyFilters();
}

/* Mobile Hamburger Menu */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuBtn.setAttribute('aria-expanded', 'true');
      } else {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close when clicking any link or action button inside mobile menu
    const interactiveElements = mobileMenu.querySelectorAll('a, button');
    interactiveElements.forEach(el => {
      el.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside of mobile menu
    document.addEventListener('click', (e) => {
      if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* Highlight Active Navigation Link */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-cyan-400', 'font-bold', 'border-b-2', 'border-cyan-400');
      link.classList.remove('text-gray-300');
    } else {
      link.classList.remove('text-cyan-400', 'font-bold', 'border-b-2', 'border-cyan-400');
    }
  });
}

/* Global Modal Controls (Accessible from anywhere) */
window.openContactModal = function(service = '', message = '') {
  const modal = document.getElementById('contact-modal');
  if (!modal) {
    console.warn('contact-modal element not found in DOM');
    return;
  }

  // Ensure modal is displayed
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Prefill service / project type if provided
  if (service) {
    const projectTypeSelect = modal.querySelector('select[name="projectType"]') || modal.querySelector('select[name="service"]');
    if (projectTypeSelect) {
      for (let i = 0; i < projectTypeSelect.options.length; i++) {
        const optVal = projectTypeSelect.options[i].value.toLowerCase();
        const optTxt = projectTypeSelect.options[i].text.toLowerCase();
        const s = service.toLowerCase();
        if (optVal.includes(s) || optTxt.includes(s)) {
          projectTypeSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  // Prefill message if provided
  if (message) {
    const msgTextarea = modal.querySelector('textarea[name="message"]') || document.getElementById('contact-message');
    if (msgTextarea && !msgTextarea.value.trim()) {
      msgTextarea.value = message;
    }
  }

  // Auto focus first input
  setTimeout(() => {
    const firstInput = modal.querySelector('input[type="text"], input[type="email"], textarea');
    if (firstInput) {
      firstInput.focus();
    }
  }, 50);

  trackBimEvent('contact_modal_open', { service: service || 'general' });
};

window.closeContactModal = function() {
  const modal = document.getElementById('contact-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

/* Contact Modal & Fast Quote Request Drawer */
function initContactModal() {
  const modal = document.getElementById('contact-modal');
  const contactForm = document.getElementById('contact-form');

  // Universal Click Event Delegation for open/close triggers
  document.addEventListener('click', (e) => {
    // Check if clicked element is or is inside an open button
    const openTrigger = e.target.closest('.open-contact-modal, [data-open-contact-modal], a[href="#contact-modal"], a[href="#contact"]');
    if (openTrigger) {
      e.preventDefault();
      const service = openTrigger.getAttribute('data-service') || '';
      const message = openTrigger.getAttribute('data-message') || '';
      window.openContactModal(service, message);
      return;
    }

    // Check if clicked element is close trigger
    const closeTrigger = e.target.closest('.close-contact-modal');
    if (closeTrigger) {
      e.preventDefault();
      window.closeContactModal();
      return;
    }

    // Close when clicking directly on backdrop
    if (modal && e.target === modal) {
      window.closeContactModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeContactModal();
      window.closeRequirementHelper();
    }
  });

  // Handle Form Submission with Formspree Endpoint
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const statusDiv = document.getElementById('form-status');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Submit Quote Request';

      const formData = new FormData(contactForm);
      const dataObj = Object.fromEntries(formData.entries());

      trackBimEvent('contact_form_submit_attempt', {
        service: dataObj.service || dataObj.projectType || 'General'
      });

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="inline-flex items-center justify-center space-x-2">
            <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Submitting BIM Inquiry...</span>
          </span>
        `;
      }

      if (statusDiv) {
        statusDiv.innerHTML = `
          <div class="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 p-3 rounded-lg text-xs flex items-center space-x-2 font-mono">
            <span>Transmitting project requirements to Mirja Riyadh...</span>
          </div>
        `;
      }

      try {
        const response = await fetch('https://formspree.io/f/xgawzykp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(dataObj)
        });

        if (response.ok) {
          trackBimEvent('contact_form_submit_success');
          if (statusDiv) {
            statusDiv.innerHTML = `
              <div class="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl flex items-center space-x-3">
                <svg class="w-6 h-6 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <p class="font-bold text-sm text-emerald-300">Quote Request Delivered Successfully!</p>
                  <p class="text-xs text-gray-300 mt-0.5">Thank you! Your project details have been sent directly to Mirja Riyadh's inbox. I will review and reply with a scope breakdown shortly.</p>
                </div>
              </div>
            `;
          }
          contactForm.reset();
          setTimeout(() => {
            if (modal) {
              modal.classList.add('hidden');
              modal.classList.remove('flex');
            }
            if (statusDiv) statusDiv.innerHTML = '';
          }, 4500);
        } else {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || 'Server error while submitting form');
        }
      } catch (err) {
        console.error('Form submission error:', err);
        if (statusDiv) {
          statusDiv.innerHTML = `
            <div class="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs space-y-1">
              <p class="font-semibold text-red-300">Direct Delivery Issue</p>
              <p class="text-gray-300">Could not submit automatically. Please send project drawings directly to: <a href="mailto:mirja.riyadh@gmail.com" class="text-cyan-400 underline font-mono">mirja.riyadh@gmail.com</a></p>
            </div>
          `;
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }
}

/* Project Requirement Helper Modal */
window.openRequirementHelper = function() {
  const modal = document.getElementById('requirement-helper-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

window.closeRequirementHelper = function() {
  const modal = document.getElementById('requirement-helper-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  modal.style.display = 'none';
  document.body.style.overflow = '';
};

function initRequirementHelper() {
  const modal = document.getElementById('requirement-helper-modal');

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-requirement-helper, [data-open-requirement-helper]');
    if (trigger) {
      e.preventDefault();
      window.openRequirementHelper();
      return;
    }

    const closeTrigger = e.target.closest('.close-requirement-helper');
    if (closeTrigger) {
      e.preventDefault();
      window.closeRequirementHelper();
      return;
    }

    if (modal && e.target === modal) {
      window.closeRequirementHelper();
    }
  });
}

/* Scroll To Top Button */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        scrollTopBtn.classList.add('opacity-100');
      } else {
        scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
        scrollTopBtn.classList.remove('opacity-100');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* Copy to Clipboard Notification */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-trigger');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = `<span class="text-emerald-400 font-semibold font-mono">✓ Copied!</span>`;
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2000);
        });
      }
    });
  });
}

/* Universal Category Matcher */
function matchProjectCategory(project, categoryFilter) {
  if (!categoryFilter || categoryFilter === 'all') return true;
  const cats = Array.isArray(project.category) ? project.category : [project.category];
  const target = categoryFilter.toLowerCase().trim();

  return cats.some(c => {
    if (!c) return false;
    const catSlug = c.toLowerCase().trim();
    if (catSlug === target) return true;
    if (target === 'architecture' && (catSlug === 'architecture' || /architect/i.test(catSlug))) return true;
    if (target === 'mep' && (catSlug === 'mep' || /mep/i.test(catSlug))) return true;
    if ((target === 'point-cloud' || target === 'pointcloud' || target === 'scan') && (catSlug === 'point-cloud' || /point[\s_-]?cloud|scan/i.test(catSlug))) return true;
    if ((target === 'autocad' || target === 'cad' || target === 'drafting') && (catSlug === 'autocad' || /autocad|drafting|documentation|permit/i.test(catSlug))) return true;
    return false;
  });
}

/* Universal Render Projects function for category pages */
function renderProjectGrid(containerId, categoryFilter = 'all', searchKeyword = '') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const projects = window.projectsData || window.PORTFOLIO_PROJECTS;
  if (!projects || !projects.length) {
    setTimeout(() => renderProjectGrid(containerId, categoryFilter, searchKeyword), 50);
    return;
  }

  let filtered = projects;

  if (categoryFilter && categoryFilter !== 'all') {
    filtered = filtered.filter(p => matchProjectCategory(p, categoryFilter));
  }

  if (searchKeyword && searchKeyword.trim() !== '') {
    const q = searchKeyword.toLowerCase();
    filtered = filtered.filter(p => {
      const title = (p.title || '').toLowerCase();
      const desc = (p.shortDesc || p.description || '').toLowerCase();
      const client = (p.clientRegion || p.client || '').toLowerCase();
      const software = (p.softwareUsed || p.software || []).join(' ').toLowerCase();
      return title.includes(q) || desc.includes(q) || client.includes(q) || software.includes(q);
    });
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center bg-slate-900/40 rounded-md border border-slate-800">
        <svg class="w-10 h-10 mx-auto text-slate-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <h3 class="text-base font-bold text-gray-200">No Projects Found</h3>
        <p class="text-gray-400 text-xs font-mono mt-1">Try adjusting your filters or search keywords.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(project => {
    const { categoryLabel, scopeTag } = getProjectMetadata(project);
    const thumbnail = project.thumbnail || project.image || 
      (project.images && project.images[0] ? (typeof project.images[0] === 'string' ? project.images[0] : project.images[0].url) : '');
    const lod = project.lod || 'LOD 350';
    const primarySoftware = (project.softwareUsed && project.softwareUsed[0]) || 'Autodesk Revit';

    return `
      <div class="bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/80 rounded-md overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-lg hover:shadow-cyan-950/40">
        <div>
          <div class="relative aspect-video overflow-hidden bg-slate-950">
            <img 
              data-src="${thumbnail}"
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'><rect width='100%' height='100%' fill='%230f172a'/></svg>"
              alt="${project.title}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-slate-900 opacity-90 transition-opacity duration-300 lazy-project-img" 
              loading="lazy" 
              decoding="async"
              referrerPolicy="no-referrer" 
              onload="this.classList.remove('opacity-90'); this.classList.add('opacity-100');"
              onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'225\\' viewBox=\\'0 0 400 225\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%230f172a\\'/><text x=\\'50%\\' y=\\'50%\\' fill=\\'%2338bdf8\\' font-family=\\'monospace\\' font-size=\\'12\\' font-weight=\\'bold\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'>BIM MODEL</text></svg>';"
            />
            <div class="absolute top-2.5 left-2.5">
              <span class="px-2 py-0.5 bg-slate-950/90 text-cyan-400 text-[10px] font-mono font-bold tracking-wider uppercase rounded-sm border border-cyan-500/30">
                ${categoryLabel}
              </span>
            </div>
          </div>

          <div class="p-4 space-y-2">
            <h3 class="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
              ${project.title}
            </h3>
            
            <p class="text-[11px] text-gray-400 font-mono line-clamp-1">
              ${scopeTag}
            </p>

            <div class="pt-1 flex items-center justify-between text-[11px] font-mono text-gray-400 border-t border-slate-800/60">
              <span class="text-emerald-400 font-bold">${lod}</span>
              <span>${primarySoftware}</span>
            </div>
          </div>
        </div>

        <div class="px-4 pb-4 pt-2">
          <a href="project-details.html?id=${project.id}" class="w-full py-2 bg-slate-800/80 hover:bg-cyan-600 text-gray-200 hover:text-white text-xs font-mono font-bold rounded flex items-center justify-center space-x-1.5 transition-all">
            <span>View Case Study</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </a>
        </div>
      </div>
    `;
  }).join('');

  initLazyImages(container);
}

/* Intersection Observer-based High Performance Lazy Loader */
function initLazyImages(container) {
  const scope = container || document;
  const lazyImages = scope.querySelectorAll('img[data-src]');
  if (!lazyImages || lazyImages.length === 0) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          obs.unobserve(img);
        }
      });
    }, {
      rootMargin: '250px 0px 250px 0px',
      threshold: 0.01
    });

    lazyImages.forEach(img => observer.observe(img));
  } else {
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
  }
}

/* Smooth Section Reveal Observer Animation on Scroll */
function initSectionObserverAnimations() {
  const targets = document.querySelectorAll('section:not(#hero), .reveal-on-scroll');
  if (!targets || targets.length === 0) return;

  targets.forEach((el) => {
    if (!el.classList.contains('reveal-on-scroll')) {
      el.classList.add('reveal-on-scroll');
    }
  });

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.08
    });

    targets.forEach(target => sectionObserver.observe(target));
  } else {
    targets.forEach(target => target.classList.add('is-visible'));
  }
}

// Global exports
window.initSectionObserverAnimations = initSectionObserverAnimations;
window.renderProjectGrid = renderProjectGrid;
window.renderSelectedProjects = renderSelectedProjects;
window.initLazyImages = initLazyImages;
window.matchProjectCategory = matchProjectCategory;
window.setupAdvancedPortfolioFilter = setupAdvancedPortfolioFilter;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMain);
} else {
  initMain();
}

