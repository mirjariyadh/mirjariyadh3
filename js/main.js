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
  // All Projects Grid (Home Page or All Projects Page)
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

  // Handle Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const statusDiv = document.getElementById('form-status');
      if (statusDiv) {
        statusDiv.innerHTML = `
          <div class="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-lg flex items-center space-x-3">
            <svg class="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            <div>
              <p class="font-semibold">Inquiry Received!</p>
              <p class="text-xs text-gray-300">Thank you. Mirja Riyadh will review your BIM project details and respond within 12 hours.</p>
            </div>
          </div>
        `;
        contactForm.reset();
        setTimeout(() => {
          if (modal) modal.classList.add('hidden');
          statusDiv.innerHTML = '';
        }, 4000);
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

/* Universal Render Projects function for category pages and home page */
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
    const catArray = Array.isArray(project.category) ? project.category : [project.category || 'BIM Project'];
    const categoryName = project.categoryName || catArray.join(' • ');
    const thumbnail = project.thumbnail || project.image || 
      (project.images && project.images[0] ? (typeof project.images[0] === 'string' ? project.images[0] : project.images[0].url) : '');
    const lod = project.lod || 'LOD 300';
    const client = project.clientRegion || project.client || 'Client';
    const year = project.completionDate || project.year || 'Completed';
    const description = project.shortDesc || project.description || '';
    const softwareList = project.softwareUsed || project.software || [];

    return `
      <article class="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden card-hover flex flex-col justify-between group">
        <div>
          <div class="relative overflow-hidden aspect-video bg-slate-950">
            <img 
              src="${thumbnail}" 
              alt="${project.title} - ${categoryName}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-slate-800" 
              loading="lazy" 
              referrerPolicy="no-referrer"
              onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'225\\' viewBox=\\'0 0 400 225\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%230f172a\\'/><text x=\\'50%\\' y=\\'50%\\' fill=\\'%2338bdf8\\' font-family=\\'sans-serif\\' font-size=\\'14\\' font-weight=\\'bold\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'>BIM PROJECT VIEW</text></svg>';"
            />
            <div class="absolute top-3 left-3 flex gap-2 flex-wrap">
              <span class="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 backdrop-blur-md">
                ${categoryName}
              </span>
              <span class="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-slate-900/80 border border-slate-700 text-emerald-400 backdrop-blur-md">
                ${lod}
              </span>
            </div>
          </div>
          <div class="p-6">
            <p class="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">${client} • ${year}</p>
            <h3 class="text-lg font-bold text-gray-100 group-hover:text-cyan-400 transition-colors line-clamp-2">
              ${project.title}
            </h3>
            <p class="text-sm text-gray-400 mt-2 line-clamp-3 leading-relaxed">
              ${description}
            </p>
            
            <div class="flex flex-wrap gap-1.5 mt-4">
              ${softwareList.map(s => `
                <span class="px-2 py-0.5 text-xs font-mono rounded bg-slate-800/80 text-slate-300 border border-slate-700/50">
                  ${s}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="px-6 pb-6 pt-2 border-t border-slate-800/50 mt-4 flex items-center justify-between">
          <span class="text-xs text-slate-400 font-mono">${project.areaSqFt || 'Verified BIM Model'}</span>
          <a 
            href="project-details.html?id=${project.id}" 
            class="inline-flex items-center space-x-1 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>View Details</span>
            <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </a>
        </div>
      </article>
    `;
  }).join('');
}

// Make functions available globally
window.renderProjectGrid = renderProjectGrid;
window.matchProjectCategory = matchProjectCategory;
window.getProjectCategoryCounts = getProjectCategoryCounts;
