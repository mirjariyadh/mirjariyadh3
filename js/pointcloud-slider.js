/**
 * Mirja Riyadh - BIM Specialist
 * Interactive Point Cloud Scan-to-BIM Comparison Slider
 */

document.addEventListener('DOMContentLoaded', () => {
  initComparisonSliders();
});

function initComparisonSliders() {
  const sliders = document.querySelectorAll('.comparison-slider');

  sliders.forEach(slider => {
    const afterImg = slider.querySelector('.img-after');
    const handle = slider.querySelector('.slider-handle');
    if (!afterImg || !handle) return;

    let isDragging = false;

    function setSliderPosition(x) {
      const rect = slider.getBoundingClientRect();
      let pos = ((x - rect.left) / rect.width) * 100;
      if (pos < 0) pos = 0;
      if (pos > 100) pos = 100;

      afterImg.style.width = `${pos}%`;
      handle.style.left = `${pos}%`;
    }

    // Mouse events
    slider.addEventListener('mousedown', (e) => {
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
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.touches[0].clientX);
    });
  });
}

window.initComparisonSliders = initComparisonSliders;
