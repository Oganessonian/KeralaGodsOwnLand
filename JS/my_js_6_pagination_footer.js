//For pagination bar
function renderPagination(currentPage) {
    const pages = [
        { name: "1", url: "index.html#main", aria: "homepage" },
        { name: "2", url: "festivals.html#main", aria: "festivals page" },
        { name: "3", url: "wildlife.html#main", aria: "wildlife page" }
    ];
    const currentIndex = pages.findIndex((page) => page.name === currentPage);
    return `
        <ul class="pagination pagination-lg justify-content-center">
            ${pages.map((page, index) => `
                <li class="page-item ${index === currentIndex ? "active" : ""}">
                    ${index === currentIndex ? 
                        `<span class="page-link" aria-current="page">${index + 1}</span>` :
                        `<a class="page-link" href="${page.url}" aria-label="${page.aria}">
                            ${index < currentIndex ? '← ' : ''}${index + 1}${index > currentIndex ? ' →' : ''}
                        </a>`
                    }
                </li>`).join("")}
        </ul>`;
}
// Call in each page:
// index.html: renderPagination("1")
// festivals.html: renderPagination("2")
// wildlife.html: renderPagination("3")
// Usage in each HTML file
//document.getElementById("pagination").innerHTML = renderPagination("1");

//javaScript for footer mainly for contact social media icons
// Add click animation to footer social icons

document.querySelectorAll('#contactInfo .accordion-body .btn').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.add('footer-icon-animation');
        setTimeout(() => {
            this.classList.remove('footer-icon-animation');
        }, 400);
    });
});


//to cause footer to show up fully when we are at the bottom
//Final JS after so many attempts and complications
//
//(function() {
//    const footer = document.querySelector('footer');
//    const pagination = document.querySelector('#pagination');
//    const SCROLL_ZONE = 900;
//    let ticking = false;
//    
//    function updateFooter() {
//        const paginationBottom = pagination.getBoundingClientRect().bottom;
//        const distanceFromBottom = window.innerHeight - paginationBottom;
//        const isAtBottom = Math.ceil(window.scrollY + window.innerHeight) >= 
//                          document.documentElement.scrollHeight;
//        
//        footer.style.transform = '';
//        footer.classList.remove('at-bottom', 'no-hover');
//        
//        if (isAtBottom) {
//            footer.classList.add('at-bottom');
//        } else if (distanceFromBottom <= SCROLL_ZONE && distanceFromBottom > 100) {
//            const progress = 1 - (distanceFromBottom / SCROLL_ZONE);
//            footer.style.transform = `translateY(${88 - (88 * progress)}%)`;
//            footer.classList.add('no-hover');
//        }
//    }
//    
//    window.addEventListener('scroll', () => {
//        if (!ticking) {
//            requestAnimationFrame(() => {
//                updateFooter();
//                ticking = false;
//            });
//            ticking = true;
//        }
//    }, { passive: true });
//    
//    let scrollTimer;
//    window.addEventListener('scroll', () => {
//        clearTimeout(scrollTimer);
//        scrollTimer = setTimeout(() => footer.classList.remove('no-hover'), 300);
//    }, { passive: true });
//    
//    updateFooter();
//})();

