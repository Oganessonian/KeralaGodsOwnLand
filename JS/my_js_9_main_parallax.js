//for parallax efect on scrolling the main section.

document.addEventListener('DOMContentLoaded', function() {
  // Create backdrop element
  const backdrop = document.createElement('div');
  backdrop.id = 'scrollBackdrop';
  backdrop.setAttribute('aria-hidden', 'true'); // Hide from screen readers
  document.body.appendChild(backdrop);
  
  const backdropImg = document.createElement('img');
  backdropImg.alt = ""; // this empty alt it to remove WAVE alert
  backdrop.appendChild(backdropImg);
  
  const sections = document.querySelectorAll('#main section');
  let scrollTimeout;
  let lastScrollY = window.scrollY;
  let currentRotation = 0;
  
  function getCurrentSectionImage() {
    const windowCenter = window.innerHeight / 2;
    
    for (let section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top < windowCenter && rect.bottom > windowCenter) {
        const img = section.querySelector('.card img');
        return img ? img.src : null;
      }
    }
    return null;
  }
  
  function updateBackdrop() {
    const currentScroll = window.scrollY;
    const scrollDelta = currentScroll - lastScrollY;
    lastScrollY = currentScroll;
    
    // Update rotation based on scroll direction and speed
    currentRotation += scrollDelta * 0.5; // Adjust multiplier for rotation speed
    
    // Get current section's image
    const imageSrc = getCurrentSectionImage();
    
    if (imageSrc && Math.abs(scrollDelta) > 0) {
      // Show backdrop
      backdrop.classList.add('active');
      
      // Update image if changed
      if (backdropImg.src !== imageSrc) {
        backdropImg.src = imageSrc;
      }
      
      // Apply rotation
      backdropImg.style.transform = `perspective(1500px) rotateY(${currentRotation}deg) scale(1.2)`;
      
      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Hide backdrop after scrolling stops
      scrollTimeout = setTimeout(() => {
        backdrop.classList.remove('active');
        currentRotation = 0; // Reset rotation
      }, 500);
    }
  }
  
  window.addEventListener('scroll', updateBackdrop);
});

