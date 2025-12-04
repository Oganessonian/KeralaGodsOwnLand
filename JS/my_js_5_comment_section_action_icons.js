// for comment section
document.getElementById("CommentSubmitBtn").onclick = function (e) {
    e.preventDefault();
    const toast = new bootstrap.Toast(document.querySelector("section[aria-label='comment-section'] .toast"));
    toast.show();
};

document.querySelector('button[type="reset"]').addEventListener("click", function () {
    setTimeout(() => document.getElementById("commentBox").blur(), 50);
});


// For action icons after comments
document.querySelector('.quick-actions .btn[title="copy"]').addEventListener("click", function () {
    // Add active class to swap icons
    this.classList.add("active");

    // Copy functionality (you'll need to define what to copy)
    // navigator.clipboard.writeText("Text to copy");

    // Revert after 2 seconds
    setTimeout(() => {
        this.classList.remove("active");
    }, 2000);
});

document.querySelector('.btn[title="like"]').addEventListener("click", function () {
    // 1. Add animation
    this.classList.add("like-animation");

    // 2. Swap to GIF after animation
    setTimeout(() => {
        this.innerHTML =
            '<img src="Images/Google_noto_folded_hand_emoji_1f64f.gif" alt="Thank you" style="width: 1.5rem; height: 1.5rem;">';
        this.classList.remove("like-animation");
    }, 500);

    // 3. Revert after 2 seconds
    setTimeout(() => {
        this.innerHTML = "&#128077;";
    }, 2000);
});

document.querySelector('.btn[title="share"]').addEventListener("click", function () {
    // Add animation
    this.classList.add("like-animation");

    // Remove animation after it completes
    setTimeout(() => {
        this.classList.remove("like-animation");
    }, 500);
});

document.querySelector('.btn[title="home-goto-top"]').addEventListener('click', function() {
    this.classList.add('active');
    
    // Scroll to top functionality
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
        this.classList.remove('active');
    }, 2000);
});

//For action icons view on PC

const quickActions = document.querySelector('.quick-actions');
const mainElement = document.getElementById('main');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      quickActions.classList.add('visible');
    } else {
      quickActions.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });
observer.observe(mainElement);



