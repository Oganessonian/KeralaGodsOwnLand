
//welcome message upon page load//

window.addEventListener('load', () => {
  const toast = new bootstrap.Toast(document.getElementById('welcomeToast'), {
    autohide: true,
    delay: 3000  // Adjust timing here
  });
  toast.show();
  
  document.body.addEventListener('click', () => toast.hide(), { once: true });
});


//side menu animation and hiding auto in tablet view//

document.addEventListener('DOMContentLoaded', function() {
  const sidemenu = document.getElementById('collapsibleNavbar');
  
  sidemenu.addEventListener('show.bs.collapse', function() {
    setTimeout(() => {
      const bsCollapse = bootstrap.Collapse.getInstance(this);
      if (bsCollapse) bsCollapse.hide();
    }, 5000);
  });
});

//side menu automation by key escapte//

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const sidemenu = document.getElementById('collapsibleNavbar');
    const bsCollapse = bootstrap.Collapse.getInstance(sidemenu);
    if (bsCollapse && sidemenu.classList.contains('show')) {
      bsCollapse.hide();
    }
  }
});

//for navbarPC view
// for the hover timeout of the image in PC view. 

let hoverTimeout;
const imageCol = document.querySelector('.pc-image-col');

imageCol.addEventListener('mouseenter', () => {
  hoverTimeout = setTimeout(() => {
    imageCol.classList.add('force-reset');
  }, 7000);
});

imageCol.addEventListener('mouseleave', () => {
  clearTimeout(hoverTimeout);
  imageCol.classList.remove('force-reset');
});

//For the homicon issu to avoid WAVE alert
document.querySelector('.home-icon-btn').addEventListener('click', () => {
  document.getElementById('comicBox').classList.toggle('hidden');
});
document.getElementById('dialogueCloseBtn').addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('comicBox').classList.add('hidden');
});

