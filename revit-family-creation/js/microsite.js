/**
 * Revit Family Creation Service Microsite - Gucci Minimalist Luxury Interactive Controller
 */

import { REVIT_FAMILY_SAMPLES, getSamplesByCategory, getSampleById } from './family-data.js';
import { renderFamilySvg } from './family-renderers.js';

let activeCategory = 'all';

// Universal Theme Syncing (Dark / Light Mode)
function initTheme() {
  const isLight = localStorage.getItem('site-theme') === 'light';
  if (isLight) {
    document.documentElement.classList.add('light-mode');
    document.documentElement.classList.remove('dark');
    if (document.body) {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark');
    }
  }

  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentLight = document.documentElement.classList.contains('light-mode');
      const nextLight = !currentLight;

      if (nextLight) {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark');
        if (document.body) {
          document.body.classList.add('light-mode');
          document.body.classList.remove('dark');
        }
        localStorage.setItem('site-theme', 'light');
      } else {
        document.documentElement.classList.remove('light-mode');
        document.documentElement.classList.add('dark');
        if (document.body) {
          document.body.classList.remove('light-mode');
          document.body.classList.add('dark');
        }
        localStorage.setItem('site-theme', 'dark');
      }

      updateAllRenderers();
    });
  });
}

function updateAllRenderers() {
  const heroContainer = document.getElementById('hero-cad-preview');
  if (heroContainer) {
    const activeView = heroContainer.dataset.activeView || 'render';
    if (activeView !== 'render') {
      heroContainer.innerHTML = renderFamilySvg(activeView, 'ahu-rooftop-01');
    }
  }

  const detailContainer = document.getElementById('detail-svg-viewport');
  if (detailContainer && window.currentSampleDetailId) {
    const activeView = detailContainer.dataset.activeView || 'render';
    if (activeView !== 'render') {
      detailContainer.innerHTML = renderFamilySvg(activeView, window.currentSampleDetailId);
    }
  }
}

// Gucci-Inspired Portfolio Gallery Renderer
function renderPortfolioGallery(category = 'all') {
  const container = document.getElementById('portfolio-grid');
  if (!container) return;

  const samples = getSamplesByCategory(category);

  container.innerHTML = samples.map(sample => {
    return `
      <article class="group flex flex-col justify-between border-b border-lux pb-8 transition-opacity duration-300">
        <a href="sample-detail.html?id=${sample.id}" class="block group">
          <!-- Luxury Image Showcase Frame -->
          <div class="luxury-frame aspect-[16/11] w-full overflow-hidden relative">
            <img 
              src="${sample.imageWebp || 'assets/images/hero/hero.webp'}"
              alt="${sample.title}" 
              loading="lazy" 
              class="w-full h-full object-cover object-center"
              onerror="this.src='assets/images/hero/hero.webp'"
            />
            
            <!-- Quiet Corner Kicker -->
            <div class="absolute top-4 left-4 text-[10px] tracking-luxury uppercase text-white/90 bg-black/60 px-2 py-0.5 backdrop-blur-sm">
              ${sample.categoryLabel}
            </div>
            
            <div class="absolute bottom-4 right-4 text-[9px] font-mono tracking-wider text-white/80 bg-black/60 px-2 py-0.5 backdrop-blur-sm">
              ${sample.modelSeries} · ${sample.lodLevel}
            </div>
          </div>

          <!-- Product Details (Pure Editorial Typography) -->
          <div class="pt-5">
            <div class="text-[11px] uppercase tracking-luxury text-stone-400">
              ${sample.modelSeries}
            </div>
            <h3 class="text-base font-normal text-stone-100 group-hover:text-white transition-colors mt-1.5 leading-snug">
              ${sample.title}
            </h3>
            <p class="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed font-light">
              ${sample.subtitle}
            </p>

            <!-- Quiet Specs Divider -->
            <div class="mt-4 pt-3 border-t border-lux flex items-center justify-between text-[11px] font-mono text-stone-400">
              <span>${sample.fileSizeRfa}</span>
              <span>Revit ${sample.revitVersions[0]}–${sample.revitVersions[sample.revitVersions.length - 1]}</span>
              <span>${sample.connectors.length > 0 ? `${sample.connectors.length} MEP Ports` : 'Face-Hosted'}</span>
            </div>
          </div>
        </a>

        <!-- View Specs Action -->
        <div class="pt-4">
          <a 
            href="sample-detail.html?id=${sample.id}" 
            class="inline-flex items-center gap-2 text-xs tracking-luxury uppercase text-stone-300 hover:text-white transition-colors border-b border-transparent hover:border-current pb-0.5"
          >
            <span>Explore Specifications</span>
            <span class="transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </article>
    `;
  }).join('');
}

// Category Filter Controller (Gucci Typographic Tabs)
function initCategoryFilters() {
  const buttons = document.querySelectorAll('.category-filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category || 'all';
      activeCategory = cat;

      buttons.forEach(b => {
        b.classList.remove('text-white', 'border-b-2', 'border-white', 'font-medium');
        b.classList.add('text-stone-400', 'border-transparent');
      });
      btn.classList.add('text-white', 'border-b-2', 'border-white', 'font-medium');
      btn.classList.remove('text-stone-400', 'border-transparent');

      renderPortfolioGallery(cat);
    });
  });

  const checkHash = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['hvac', 'mep', 'industrial', 'architectural'].includes(hash)) {
      const targetBtn = document.querySelector(`.category-filter-btn[data-category="${hash}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
    }
  };
  window.addEventListener('hashchange', checkHash);
  checkHash();
}

// Hero Section Interactive Luxury Model & CAD View Switcher
function initHeroInteractiveViewer() {
  const container = document.getElementById('hero-cad-preview');
  if (!container) return;

  const viewButtons = document.querySelectorAll('.hero-view-btn');

  const updateHeroDisplay = (view) => {
    container.dataset.activeView = view;
    if (view === 'render') {
      container.innerHTML = `
        <div class="relative w-full h-full flex items-center justify-center overflow-hidden luxury-frame">
          <img 
            id="hero-model-img" 
            src="assets/images/hero/hero.webp"
            alt="Packaged Rooftop AHU Revit Family 3D Model" 
            class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            onerror="this.onerror=null;this.src='assets/images/hero-revit-family.webp'"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
          <div class="absolute bottom-4 left-4 text-[10px] tracking-luxury uppercase text-white/90 bg-black/60 px-3 py-1 backdrop-blur-sm">
            RTU-ECO-SERIES V · LOD 350
          </div>
          <div class="absolute top-4 right-4 text-[9px] font-mono tracking-wider text-white/80 bg-black/60 px-2.5 py-0.5 backdrop-blur-sm">
            640 KB RFA · ZERO CAD MESH
          </div>
        </div>
      `;
    } else {
      container.innerHTML = renderFamilySvg(view, 'ahu-rooftop-01');
    }
  };

  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      viewButtons.forEach(b => {
        b.classList.remove('text-white', 'border-white', 'font-medium');
        b.classList.add('text-stone-400', 'border-transparent');
      });
      btn.classList.add('text-white', 'border-white', 'font-medium');
      btn.classList.remove('text-stone-400', 'border-transparent');

      const view = btn.dataset.view || 'render';
      updateHeroDisplay(view);
    });
  });

  const initialView = container.dataset.activeView || 'render';
  updateHeroDisplay(initialView);
}

// FAQ Accordion (Minimalist Luxury)
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');
        document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
        document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-45'));

        if (!isOpen) {
          content.classList.remove('hidden');
          if (icon) icon.classList.add('rotate-45');
        }
      });
    }
  });
}

// Quote Modal & RFQ Form
function initQuoteModal() {
  const openButtons = document.querySelectorAll('.open-quote-modal-btn');
  const modal = document.getElementById('rfq-modal');
  const closeBtn = document.getElementById('close-rfq-modal');
  const form = document.getElementById('rfq-form');

  if (openButtons.length && modal) {
    openButtons.forEach(b => {
      b.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      });
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const company = form.querySelector('[name="company_name"]')?.value || 'Client';
      const email = form.querySelector('[name="email"]')?.value || '';
      const notes = form.querySelector('[name="notes"]')?.value || '';
      const category = form.querySelector('[name="category"]')?.value || 'General';

      const subject = encodeURIComponent(`Bespoke Revit Family Inquiry: ${company} (${category})`);
      const body = encodeURIComponent(`Hello Mirja,\n\nI would like to inquire regarding manufacturer Revit family creation.\n\nCompany: ${company}\nEmail: ${email}\nCategory: ${category}\nProject Scope:\n${notes}\n\nThank you.`);

      window.location.href = `mailto:mirja.riyadh@gmail.com?subject=${subject}&body=${body}`;

      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  }
}

// Mobile Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
      });
    });
  }
}

// Guard all internal navigation to stay inside microsite
function initMicrositeNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeroInteractiveViewer();
  renderPortfolioGallery('all');
  initCategoryFilters();
  initFaqAccordion();
  initQuoteModal();
  initMobileMenu();
  initMicrositeNavigation();
});
