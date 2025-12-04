//for section navigator dots visible. 
// for tab to run first for offcanvas
// Focus trap for offcanvas

document.getElementById('sectionNavigator').addEventListener('shown.bs.offcanvas', function () {
  this.querySelector('.dot-item').focus();
});

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  const dotLinks = document.querySelectorAll('.dot-item');
  const sectionIds = Array.from(dotLinks).map(dot => 
    dot.getAttribute('href').substring(1)
  );
  const sections = document.querySelectorAll(sectionIds.map(id => `#${id}`).join(', '));

  function updateActiveDot() {
  let currentSection = '';
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom >= 150) {
      currentSection = section.id;
    }
  });
  

    dotLinks.forEach(dot => {
      dot.querySelector('.dot').classList.remove('active');
    });

    if (currentSection) {
      const activeDot = document.querySelector(`.dot-item[href='#${currentSection}']`);
      if (activeDot) {
        activeDot.querySelector('.dot').classList.add('active');
      }
    }
  }

  // Update on scroll and click
  window.addEventListener('scroll', updateActiveDot);
  dotLinks.forEach(dot => dot.addEventListener('click', () => setTimeout(updateActiveDot, 100)));
  updateActiveDot(); // Initial check
});