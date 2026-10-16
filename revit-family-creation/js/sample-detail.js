/**
 * Revit Family Creation Service - Family Detail View (Gucci Luxury Theme)
 */

import { REVIT_FAMILY_SAMPLES, getSampleById } from './family-data.js';
import { renderFamilySvg } from './family-renderers.js';

let currentSample = null;
let activeView = 'render';
let selectedTypeIndex = 0;

function getSampleIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id') || 'ahu-rooftop-01';
}

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

      renderActiveView();
    });
  });
}

function renderActiveView() {
  const viewport = document.getElementById('detail-svg-viewport');
  if (!viewport || !currentSample) return;

  if (activeView === 'render') {
    viewport.innerHTML = `
      <div class="relative w-full h-full flex items-center justify-center overflow-hidden luxury-frame">
        <img 
          id="detail-model-img" 
          src="${currentSample.imageWebp || '/src/assets/images/hero/hero.webp'}" 
          alt="${currentSample.title}" 
          class="max-w-full max-h-full object-contain transition-transform duration-700 hover:scale-105"
          onerror="this.src='/src/assets/images/hero/hero.webp'"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
        <div class="absolute bottom-4 left-4 text-[10px] tracking-luxury uppercase text-white/90 bg-black/60 px-3 py-1 backdrop-blur-sm">
          ${currentSample.modelSeries} · ${currentSample.lodLevel}
        </div>
        <div class="absolute top-4 right-4 text-[9px] font-mono tracking-wider text-white/80 bg-black/60 px-2.5 py-0.5 backdrop-blur-sm">
          ${currentSample.fileSizeRfa} · RFA Specimen
        </div>
      </div>
    `;
  } else {
    viewport.innerHTML = renderFamilySvg(activeView, currentSample.id);
  }
}

function renderDetailPage() {
  const sampleId = getSampleIdFromUrl();
  currentSample = getSampleById(sampleId) || REVIT_FAMILY_SAMPLES[0];
  window.currentSampleDetailId = currentSample.id;

  // Set document title
  document.title = `${currentSample.title} | Revit Family Atelier | Mirja Riyadh`;

  // Update Breadcrumbs
  const breadcrumbCategory = document.getElementById('breadcrumb-category');
  const breadcrumbCurrent = document.getElementById('breadcrumb-current');
  if (breadcrumbCategory) {
    breadcrumbCategory.textContent = currentSample.categoryLabel;
    breadcrumbCategory.href = `index.html#${currentSample.category}`;
  }
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = currentSample.modelSeries;

  // Header Details
  document.getElementById('sample-title').textContent = currentSample.title;
  document.getElementById('sample-subtitle').textContent = currentSample.subtitle;
  document.getElementById('sample-model-series').textContent = currentSample.modelSeries;
  document.getElementById('sample-lod').textContent = currentSample.lodLevel;
  document.getElementById('sample-filesize').textContent = currentSample.fileSizeRfa;
  document.getElementById('sample-omniclass').textContent = `${currentSample.omniClass} (${currentSample.omniClassTitle})`;
  document.getElementById('sample-uniformat').textContent = currentSample.uniFormat;
  document.getElementById('sample-masterformat').textContent = currentSample.masterFormat;

  // Overview & Key Features
  document.getElementById('sample-overview').textContent = currentSample.overview;
  const featuresList = document.getElementById('sample-features-list');
  if (featuresList) {
    featuresList.innerHTML = currentSample.keyFeatures.map(f => `
      <li class="flex items-start gap-3 text-xs text-stone-300 font-sans font-light leading-relaxed">
        <span class="text-stone-400 font-mono">—</span>
        <span>${f}</span>
      </li>
    `).join('');
  }

  // Revit Versions Badges
  const versionsContainer = document.getElementById('sample-versions-list');
  if (versionsContainer) {
    versionsContainer.innerHTML = currentSample.revitVersions.map(v => `
      <span class="px-2.5 py-1 border border-lux text-stone-200 text-xs font-mono">
        Revit ${v}
      </span>
    `).join('');
  }

  // Deliverables
  const deliverablesContainer = document.getElementById('sample-deliverables-list');
  if (deliverablesContainer) {
    deliverablesContainer.innerHTML = currentSample.deliverables.map(d => `
      <div class="py-1 text-xs font-sans text-stone-300 flex items-center gap-2">
        <span class="text-stone-400 font-mono text-[10px]">✓</span>
        <span>${d}</span>
      </div>
    `).join('');
  }

  // Development Notes / Audit
  document.getElementById('audit-geometry').textContent = currentSample.developmentNotes.geometryHygiene;
  document.getElementById('audit-performance').textContent = currentSample.developmentNotes.performanceAudit;
  document.getElementById('audit-clearance').textContent = currentSample.developmentNotes.clashClearances;
  document.getElementById('audit-qa').textContent = currentSample.developmentNotes.qaSignoff;

  // Viewport
  renderActiveView();

  // Setup View Tabs
  const viewTabs = document.querySelectorAll('.detail-view-tab');
  viewTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      viewTabs.forEach(t => {
        t.classList.remove('text-white', 'border-white', 'font-medium');
        t.classList.add('text-stone-400', 'border-transparent');
      });
      tab.classList.add('text-white', 'border-white', 'font-medium');
      tab.classList.remove('text-stone-400', 'border-transparent');

      activeView = tab.dataset.view || 'render';
      renderActiveView();
    });
  });

  // Setup Type Selector & Table
  renderTypeSelector();
  renderTypeCatalogTable();

  // Setup Connectors Table
  renderConnectorsTable();

  // Setup Parameters Table
  renderParametersTable();

  // Setup Related Families
  renderRelatedFamilies();

  // Setup Quote Modal Trigger with Pre-fill
  initDetailQuoteModal();
}

function renderTypeSelector() {
  const container = document.getElementById('type-selector-buttons');
  if (!container || !currentSample.types.length) return;

  container.innerHTML = currentSample.types.map((t, idx) => `
    <button 
      type="button" 
      class="type-select-btn px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer ${idx === selectedTypeIndex ? 'border border-white bg-white text-black font-medium' : 'border border-lux text-stone-300 hover:text-white hover:border-stone-500'}"
      data-type-index="${idx}"
    >
      ${t.typeName}
    </button>
  `).join('');

  container.querySelectorAll('.type-select-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedTypeIndex = parseInt(btn.dataset.typeIndex, 10);
      renderTypeSelector();
      updateActiveTypeCard();
    });
  });

  updateActiveTypeCard();
}

function updateActiveTypeCard() {
  const t = currentSample.types[selectedTypeIndex];
  if (!t) return;

  document.getElementById('active-type-name').textContent = t.typeName;
  document.getElementById('active-type-capacity').textContent = t.nominalCapacity;
  document.getElementById('active-type-length').textContent = t.dimensions.length;
  document.getElementById('active-type-width').textContent = t.dimensions.width;
  document.getElementById('active-type-height').textContent = t.dimensions.height;
  document.getElementById('active-type-weight').textContent = t.weightOperating;
  document.getElementById('active-type-flow').textContent = t.flowRating;
}

function renderTypeCatalogTable() {
  const tbody = document.getElementById('type-catalog-tbody');
  if (!tbody || !currentSample.types.length) return;

  tbody.innerHTML = currentSample.types.map(t => `
    <tr class="border-b border-lux hover:bg-white/[0.02] transition-colors font-mono text-xs">
      <td class="p-3 text-white font-medium whitespace-nowrap">${t.typeName}</td>
      <td class="p-3 text-stone-200 whitespace-nowrap">${t.nominalCapacity}</td>
      <td class="p-3 text-stone-400 whitespace-nowrap">${t.dimensions.length} × ${t.dimensions.width} × ${t.dimensions.height}</td>
      <td class="p-3 text-stone-400 whitespace-nowrap">${t.weightOperating}</td>
      <td class="p-3 text-stone-400 text-[11px] whitespace-nowrap">${t.electrical}</td>
      <td class="p-3 text-stone-300 whitespace-nowrap">${t.flowRating}</td>
    </tr>
  `).join('');
}

function renderConnectorsTable() {
  const container = document.getElementById('connectors-tbody');
  if (!container) return;

  if (currentSample.connectors.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" class="p-6 text-center text-xs text-stone-400 font-mono">
          This architectural family does not require MEP fluid/electrical connectors.
        </td>
      </tr>
    `;
    return;
  }

  container.innerHTML = currentSample.connectors.map(c => `
    <tr class="border-b border-lux hover:bg-white/[0.02] transition-colors font-mono text-xs">
      <td class="p-3 text-stone-200 font-bold whitespace-nowrap">${c.connectorId}</td>
      <td class="p-3 text-white font-medium whitespace-nowrap">${c.name}</td>
      <td class="p-3 text-stone-300 whitespace-nowrap">${c.systemClassification}</td>
      <td class="p-3 text-white whitespace-nowrap font-medium">${c.flowDirection}</td>
      <td class="p-3 text-stone-300 whitespace-nowrap">${c.size}</td>
      <td class="p-3 text-stone-400 text-[11px]">${c.description}</td>
    </tr>
  `).join('');
}

function renderParametersTable() {
  const container = document.getElementById('parameters-tbody');
  if (!container) return;

  container.innerHTML = currentSample.parameters.map(p => `
    <tr class="border-b border-lux hover:bg-white/[0.02] transition-colors font-mono text-xs">
      <td class="p-3 text-white font-medium whitespace-nowrap">${p.name}</td>
      <td class="p-3 text-stone-400 text-[11px] whitespace-nowrap">${p.group}</td>
      <td class="p-3 text-stone-300 whitespace-nowrap">${p.type}</td>
      <td class="p-3 text-stone-300 whitespace-nowrap">${p.isInstance ? 'Instance' : 'Type'}</td>
      <td class="p-3 text-stone-300 whitespace-nowrap font-mono text-[11px]">${p.formulaOrValue}</td>
      <td class="p-3 text-stone-400 text-[11px]">${p.description}</td>
    </tr>
  `).join('');
}

function renderRelatedFamilies() {
  const container = document.getElementById('related-families-grid');
  if (!container) return;

  const related = REVIT_FAMILY_SAMPLES.filter(s => s.id !== currentSample.id).slice(0, 3);
  container.innerHTML = related.map(s => `
    <article class="group flex flex-col justify-between border-b border-lux pb-6">
      <a href="sample-detail.html?id=${s.id}" class="block group">
        <div class="luxury-frame aspect-[16/11] w-full overflow-hidden relative mb-4">
          <img 
            src="${s.imageWebp || '/src/assets/images/hero/hero.webp'}" 
            alt="${s.title}" 
            class="w-full h-full object-cover"
            onerror="this.src='/src/assets/images/hero/hero.webp'"
          />
          <div class="absolute bottom-3 left-3 bg-black/60 px-2 py-0.5 text-[9px] font-mono tracking-wider text-white/90 backdrop-blur-sm">
            ${s.modelSeries}
          </div>
        </div>
        <div class="text-[10px] uppercase tracking-luxury text-stone-400 mb-1">${s.categoryLabel}</div>
        <h4 class="text-sm font-normal text-stone-200 group-hover:text-white transition-colors line-clamp-2">${s.title}</h4>
      </a>
      <div class="mt-4 pt-3 border-t border-lux flex items-center justify-between text-xs tracking-luxury uppercase text-stone-400">
        <span>${s.lodLevel}</span>
        <a href="sample-detail.html?id=${s.id}" class="text-stone-300 hover:text-white transition-colors">Inspect →</a>
      </div>
    </article>
  `).join('');
}

function initDetailQuoteModal() {
  const openButtons = document.querySelectorAll('.open-quote-modal-btn');
  const modal = document.getElementById('detail-rfq-modal');
  const closeBtn = document.getElementById('close-detail-rfq-modal');
  const form = document.getElementById('detail-rfq-form');

  if (openButtons.length && modal) {
    openButtons.forEach(b => {
      b.addEventListener('click', () => {
        const inputFamily = modal.querySelector('[name="target_family"]');
        if (inputFamily && currentSample) {
          inputFamily.value = `${currentSample.title} (${currentSample.modelSeries})`;
        }
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

      const subject = encodeURIComponent(`Revit Family Quote: ${currentSample.title}`);
      const body = encodeURIComponent(`Hello Mirja,\n\nI would like to request a quote for a Revit Family similar to: ${currentSample.title} (${currentSample.modelSeries}).\n\nCompany: ${company}\nContact: ${email}\nRequirements:\n${notes}`);

      window.location.href = `mailto:mirja.riyadh@gmail.com?subject=${subject}&body=${body}`;

      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderDetailPage();
});
