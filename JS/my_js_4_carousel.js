 
document.getElementById("closeCarousel").addEventListener("click", function () {
  document.getElementById("myCarousel").style.display = "none";
  this.style.display = "none";
  document.getElementById("refreshCarousel").style.display = "block";
});

document.getElementById("refreshCarousel").addEventListener("click", function () {
  document.getElementById("myCarousel").style.display = "block";
  this.style.display = "none";
  document.getElementById("closeCarousel").style.display = "block";
});

// Get ALL carousel items
let carouselItems = document.querySelectorAll('#myCarousel .carousel-item');

// Set different intervals for each item
carouselItems.forEach(function(item, index) {
  // Set interval directly on the item element
  item.setAttribute('data-bs-interval', '3000'); // Or different times per index
  
  // For different intervals for different slides:
  // var intervals = [3000, 5000, 4000, 6000, 3000];
  // item.setAttribute('data-bs-interval', intervals[index]);
});



