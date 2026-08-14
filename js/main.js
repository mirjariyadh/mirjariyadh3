/**
 * Mirja Riyadh - BIM Specialist & Revit Modeler Portfolio
 * Main Layout & Universal Scripts (GitHub Pages Ready)
 */

function initMain() {
  // Ensure dark mode is active and clear light theme settings
  document.documentElement.classList.add('dark');
  document.documentElement.classList.remove('light-theme');
  if (document.body) {
    document.body.classList.remove('light-theme');
  }
  try {
    localStorage.removeItem('mirja_theme');
  } catch (e) {}

  initMobileNav();
  highlightActiveNav();
  initContactModal();
  initScrollTop();
  initCopyButtons();
  autoInitCategoryGrids();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMain);
} else {
  initMain();
}

/* Automatically initialize grids if elements are present in DOM */
function autoInitCategoryGrids() {
  // Home Page Selected Projects Grid (8 Projects)
  if (document.getElementById('selected-projects-grid')) {
    renderSelectedProjects('all');
    setupSelectedProjectFilters();
  }

  // All Projects Grid (All Projects Page)
  if (document.getElementById('all-projects-grid')) {
    renderProjectGrid('all-projects-grid', 'all');
    setupFilterButtons('all-projects-grid');
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

/* Home Page Selected Projects Filter Handler */
function setupSelectedProjectFilters() {
  const filterBtns = document.querySelectorAll('.selected-filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#009FB7]', 'bg-cyan-600', 'text-white', 'shadow');
        b.classList.add('text-gray-400', 'bg-transparent');
      });
      btn.classList.add('bg-[#009FB7]', 'text-white', 'shadow');
      btn.classList.remove('text-gray-400', 'bg-transparent');

      const category = btn.getAttribute('data-category') || 'all';
      renderSelectedProjects(category);
    };
  });
}

/* Render exactly 8 Projects for the Home Page Showcase */
function renderSelectedProjects(categoryFilter = 'all') {
  const container = document.getElementById('selected-projects-grid');
  if (!container) return;

  const projects = window.projectsData || window.PORTFOLIO_PROJECTS;
  if (!projects || !projects.length) {
    setTimeout(() => renderSelectedProjects(categoryFilter), 50);
    return;
  }

  let filtered = projects;
  if (categoryFilter && categoryFilter !== 'all') {
    filtered = filtered.filter(p => matchProjectCategory(p, categoryFilter));
  }

  // Always show up to 8 projects in the 4x2 grid
  const displayProjects = filtered.slice(0, 8);

  if (displayProjects.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
        <p class="text-gray-400 font-mono text-xs">No projects found in this category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = displayProjects.map(project => {
    const cats = Array.isArray(project.category) ? project.category : [project.category];
    let badgeText = 'ARCHITECTURAL MODELING';
    if (cats.includes('point-cloud')) {
      badgeText = 'POINT CLOUD TO BIM';
    } else if (cats.includes('mep') && !cats.includes('architecture')) {
      badgeText = 'MEP SYSTEMS';
    } else if (cats.includes('autocad') && !cats.includes('architecture') && !cats.includes('mep')) {
      badgeText = 'AUTOCAD SERVICES';
    } else if (cats.includes('architecture')) {
      badgeText = 'ARCHITECTURAL MODELING';
    }

    const thumbnail = project.thumbnail || project.image || 
      (project.images && project.images[0] ? (typeof project.images[0] === 'string' ? project.images[0] : project.images[0].url) : '');
    const lod = project.lod || 'LOD 350';
    const primarySoftware = (project.softwareUsed && project.softwareUsed[0]) || 'Autodesk Revit';
    const clientRegion = project.clientRegion || 'International Client';

    return `
      <a href="project-details.html?id=${project.id}" class="bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/80 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-lg hover:shadow-cyan-950/40">
        <div>
          <!-- Thumbnail & Category Tag -->
          <div class="relative aspect-[16/10] overflow-hidden bg-slate-950">
            <img 
              data-src="${thumbnail}"
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'><rect width='100%' height='100%' fill='%230f172a'/></svg>"
              alt="${project.title}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-slate-900 opacity-90 transition-opacity duration-300 lazy-project-img" 
              loading="lazy" 
              decoding="async"
              fetchpriority="low"
              referrerPolicy="no-referrer"
              onload="this.classList.remove('opacity-90'); this.classList.add('opacity-100');"
              onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'250\\' viewBox=\\'0 0 400 250\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%230f172a\\'/><text x=\\'50%\\' y=\\'50%\\' fill=\\'%2338bdf8\\' font-family=\\'monospace\\' font-size=\\'12\\' font-weight=\\'bold\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'>BIM MODEL</text></svg>';"
            />
            <div class="absolute top-2.5 left-2.5">
              <span class="px-2 py-0.5 bg-slate-950/90 text-cyan-400 text-[9px] font-mono font-bold tracking-wider uppercase rounded border border-cyan-500/30">
                ${badgeText}
              </span>
            </div>
          </div>

          <!-- Project Specs -->
          <div class="p-4">
            <h3 class="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 min-h-[40px] leading-snug">
              ${project.title}
            </h3>
            <p class="text-[11px] font-mono text-gray-400 mt-1.5 flex items-center space-x-1.5">
              <span>${lod}</span>
              <span class="text-slate-600">|</span>
              <span>${primarySoftware}</span>
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-4 pb-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <span class="text-[11px] font-mono text-gray-400 truncate max-w-[170px]">${clientRegion}</span>
          <div class="w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-[#009FB7] group-hover:text-white flex items-center justify-center text-gray-400 transition-colors text-xs font-bold shrink-0">
            →
          </div>
        </div>
      </a>
    `;
  }).join('');

  initLazyImages(container);
}

/* Helper to setup category filter buttons and search input */
function setupFilterButtons(gridContainerId) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('project-search-input');
  let currentCategory = 'all';

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      // Remove any existing click handlers by cloning or replacing
      btn.onclick = (e) => {
        e.preventDefault();
        filterBtns.forEach(b => {
          b.classList.remove('bg-cyan-600', 'text-white');
          b.classList.add('text-gray-400');
        });
        btn.classList.add('bg-cyan-600', 'text-white');
        btn.classList.remove('text-gray-400');

        currentCategory = btn.getAttribute('data-category') || 'all';
        renderProjectGrid(gridContainerId, currentCategory, searchInput ? searchInput.value : '');
      };
    });
  }

  if (searchInput) {
    searchInput.oninput = () => {
      renderProjectGrid(gridContainerId, currentCategory, searchInput.value);
    };
  }
}

/* Mobile Hamburger Menu */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on clicking links
    const links = mobileMenu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
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

/* Contact Modal & Fast Quote Request Drawer */
function initContactModal() {
  const modal = document.getElementById('contact-modal');
  const openBtns = document.querySelectorAll('.open-contact-modal');
  const closeBtns = document.querySelectorAll('.close-contact-modal');
  const contactForm = document.getElementById('contact-form');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  });

  // Close when clicking backdrop
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  }

  // Handle Form Submission with Formspree Endpoint
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const statusDiv = document.getElementById('form-status');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Submit Quote Request';

      // Gather form data
      const formData = new FormData(contactForm);
      const dataObj = Object.fromEntries(formData.entries());

      // Set Loading State
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="inline-flex items-center justify-center space-x-2">
            <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Sending Proposal Request...</span>
          </span>
        `;
      }

      if (statusDiv) {
        statusDiv.innerHTML = `
          <div class="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 p-3 rounded-lg text-xs flex items-center space-x-2">
            <span>Connecting to Mirja Riyadh's secure mail server...</span>
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
          if (statusDiv) {
            statusDiv.innerHTML = `
              <div class="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl flex items-center space-x-3 animate-fade-in">
                <svg class="w-6 h-6 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <p class="font-bold text-sm text-emerald-300">Quote Request Delivered Successfully!</p>
                  <p class="text-xs text-gray-300 mt-0.5">Thank you! Your project details have been sent directly to Mirja Riyadh's inbox. I will review and reply to your email shortly.</p>
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
              <p class="font-semibold text-red-300">Message Delivery Issue</p>
              <p class="text-gray-300">Could not submit automatically. Please email directly to: <a href="mailto:mirja.riyadh@gmail.com" class="text-cyan-400 underline font-medium">mirja.riyadh@gmail.com</a></p>
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
          btn.innerHTML = `<span class="text-emerald-400 font-semibold">✓ Copied!</span>`;
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2000);
        });
      }
    });
  });
}

/* Universal Category Matcher
 * Uses internal slugs: 'architecture', 'mep', 'point-cloud', 'autocad'
 */
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

function getProjectCategoryCounts() {
  const projects = window.projectsData || window.PORTFOLIO_PROJECTS || [];
  return {
    all: projects.length,
    architecture: projects.filter(p => matchProjectCategory(p, 'architecture')).length,
    mep: projects.filter(p => matchProjectCategory(p, 'mep')).length,
    'point-cloud': projects.filter(p => matchProjectCategory(p, 'point-cloud')).length,
    autocad: projects.filter(p => matchProjectCategory(p, 'autocad')).length
  };
}

/* Universal Render Projects function for category pages and all projects page */
function renderProjectGrid(containerId, categoryFilter = 'all', searchKeyword = '') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const projects = window.projectsData || window.PORTFOLIO_PROJECTS;
  if (!projects || !projects.length) {
    setTimeout(() => renderProjectGrid(containerId, categoryFilter, searchKeyword), 50);
    return;
  }

  let filtered = projects;

  // Filter by category
  if (categoryFilter && categoryFilter !== 'all') {
    filtered = filtered.filter(p => matchProjectCategory(p, categoryFilter));
  }

  // Filter by search keyword
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
      <div class="col-span-full py-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
        <svg class="w-12 h-12 mx-auto text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <h3 class="text-xl font-bold text-gray-200">No Projects Found</h3>
        <p class="text-gray-400 text-sm mt-1">Try adjusting your search query or selecting a different category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(project => {
    const cats = Array.isArray(project.category) ? project.category : [project.category || 'architecture'];
    let badgeText = 'ARCHITECTURAL';
    if (cats.includes('point-cloud')) {
      badgeText = 'POINT CLOUD TO BIM';
    } else if (cats.includes('mep') && !cats.includes('architecture')) {
      badgeText = 'MEP SYSTEMS';
    } else if (cats.includes('autocad') && !cats.includes('architecture') && !cats.includes('mep')) {
      badgeText = 'AUTOCAD SERVICES';
    } else if (cats.includes('architecture')) {
      badgeText = 'ARCHITECTURAL MODELING';
    }

    const thumbnail = project.thumbnail || project.image || 
      (project.images && project.images[0] ? (typeof project.images[0] === 'string' ? project.images[0] : project.images[0].url) : '');
    const lod = project.lod || 'LOD 350';
    const primarySoftware = (project.softwareUsed && project.softwareUsed[0]) || 'Autodesk Revit';
    const clientRegion = project.clientRegion || project.client || 'International Client';

    return `
      <a href="project-details.html?id=${project.id}" class="bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/80 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-lg hover:shadow-cyan-950/40">
        <div>
          <!-- Thumbnail & Category Tag -->
          <div class="relative aspect-[16/10] overflow-hidden bg-slate-950">
            <img 
              data-src="${thumbnail}"
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'><rect width='100%' height='100%' fill='%230f172a'/></svg>"
              alt="${project.title}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-slate-900 opacity-90 transition-opacity duration-300 lazy-project-img" 
              loading="lazy" 
              decoding="async"
              fetchpriority="low"
              referrerPolicy="no-referrer"
              onload="this.classList.remove('opacity-90'); this.classList.add('opacity-100');"
              onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'250\\' viewBox=\\'0 0 400 250\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%230f172a\\'/><text x=\\'50%\\' y=\\'50%\\' fill=\\'%2338bdf8\\' font-family=\\'monospace\\' font-size=\\'12\\' font-weight=\\'bold\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'>BIM MODEL</text></svg>';"
            />
            <div class="absolute top-2.5 left-2.5">
              <span class="px-2 py-0.5 bg-slate-950/90 text-cyan-400 text-[9px] font-mono font-bold tracking-wider uppercase rounded border border-cyan-500/30">
                ${badgeText}
              </span>
            </div>
          </div>

          <!-- Project Specs -->
          <div class="p-4">
            <h3 class="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 min-h-[40px] leading-snug">
              ${project.title}
            </h3>
            <p class="text-[11px] font-mono text-gray-400 mt-1.5 flex items-center space-x-1.5">
              <span>${lod}</span>
              <span class="text-slate-600">|</span>
              <span>${primarySoftware}</span>
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-4 pb-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <span class="text-[11px] font-mono text-gray-400 truncate max-w-[170px]">${clientRegion}</span>
          <div class="w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-[#009FB7] group-hover:text-white flex items-center justify-center text-gray-400 transition-colors text-xs font-bold shrink-0">
            →
          </div>
        </div>
      </a>
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
    // Immediate fallback for browsers without IntersectionObserver
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
  }
}

// Make functions available globally
window.renderProjectGrid = renderProjectGrid;
window.renderSelectedProjects = renderSelectedProjects;
window.initLazyImages = initLazyImages;
window.matchProjectCategory = matchProjectCategory;
window.getProjectCategoryCounts = getProjectCategoryCounts;
