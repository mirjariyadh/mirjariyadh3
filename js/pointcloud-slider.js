/**
 * Mirja Riyadh - BIM Specialist
 * Interactive Point Cloud Scan-to-BIM Comparison Slider
 * Fixed-size clipping mask logic (no image scaling/distortion)
 */

document.addEventListener('DOMContentLoaded', () => {
  initComparisonSliders();
});

function initComparisonSliders() {
  const sliders = document.querySelectorAll('.comparison-slider');

  sliders.forEach(slider => {
    if (slider.dataset.sliderInitialized === 'true') return;
    slider.dataset.sliderInitialized = 'true';

    const afterImg = slider.querySelector('.img-after');
    const handle = slider.querySelector('.slider-handle');
    if (!afterImg || !handle) return;

    let isDragging = false;

    function applyPosition(pos) {
      if (pos < 0) pos = 0;
      if (pos > 100) pos = 100;

      afterImg.style.width = '100%';
      afterImg.style.height = '100%';
      afterImg.style.clipPath = `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`;
      afterImg.style.webkitClipPath = `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`;
      handle.style.left = `${pos}%`;
    }

    function setSliderPosition(clientX) {
      const rect = slider.getBoundingClientRect();
      const pos = ((clientX - rect.left) / rect.width) * 100;
      applyPosition(pos);
    }

    // Set initial 50% state
    applyPosition(50);

    // Mouse events
    slider.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDragging = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    // Touch events
    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });
  });
}

window.initComparisonSliders = initComparisonSliders;
