//for adding anchor tags to card images for lightbox2.


document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.card-img-top').forEach(img => {
    const anchor = document.createElement('a');
    anchor.href = img.src;
    anchor.setAttribute('data-lightbox', 'gallery');
    anchor.setAttribute('data-title', img.alt);
    anchor.setAttribute('aria-label', 'View larger image: ' + img.alt);
    
    img.parentNode.insertBefore(anchor, img);
    anchor.appendChild(img);
  });
});

