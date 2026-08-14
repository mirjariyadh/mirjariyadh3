/**
 * Mirja Riyadh - BIM Specialist
 * Interactive BIM ROI & Clash Detection Savings Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  initRoiCalculator();
});

function initRoiCalculator() {
  const calcForm = document.getElementById('bim-roi-form');
  if (!calcForm) return;

  const areaInput = document.getElementById('calc-area');
  const areaDisplay = document.getElementById('calc-area-val');
  const typeSelect = document.getElementById('calc-type');
  const lodSelect = document.getElementById('calc-lod');

  const clashesResult = document.getElementById('res-clashes');
  const reworkResult = document.getElementById('res-rework');
  const savingsResult = document.getElementById('res-savings');
  const roiMultiplier = document.getElementById('res-roi');

  function calculateROI() {
    const area = parseInt(areaInput ? areaInput.value : 100000);
    const type = typeSelect ? typeSelect.value : 'commercial';
    const lod = lodSelect ? lodSelect.value : 'LOD350';

    if (areaDisplay) {
      areaDisplay.innerText = area.toLocaleString() + ' sq.ft';
    }

    // Complexity multipliers
    let complexity = 1.0;
    if (type === 'medical') complexity = 1.8;
    else if (type === 'industrial') complexity = 1.5;
    else if (type === 'residential') complexity = 0.8;

    let lodFactor = 1.0;
    if (lod === 'LOD400') lodFactor = 1.4;
    else if (lod === 'LOD300') lodFactor = 0.85;

    // Calculations
    const estimatedClashes = Math.round((area / 1000) * 1.2 * complexity * lodFactor);
    const savedHours = Math.round(estimatedClashes * 3.5);
    const financialSavings = Math.round(savedHours * 45); // Avg $45/hr field labor cost savings
    const estimatedBimCost = Math.round(area * 0.12 * lodFactor);
    const roi = ((financialSavings / Math.max(estimatedBimCost, 1)) * 100).toFixed(0);

    if (clashesResult) clashesResult.innerText = `${estimatedClashes}+ Clashes`;
    if (reworkResult) reworkResult.innerText = `${savedHours.toLocaleString()} Hours`;
    if (savingsResult) savingsResult.innerText = `$${financialSavings.toLocaleString()} USD`;
    if (roiMultiplier) roiMultiplier.innerText = `${roi}% ROI`;
  }

  if (areaInput) {
    areaInput.addEventListener('input', calculateROI);
  }
  if (typeSelect) typeSelect.addEventListener('change', calculateROI);
  if (lodSelect) lodSelect.addEventListener('change', calculateROI);

  // Initial calculation
  calculateROI();
}
