let index = 0;

function showSlides() {
  const slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return;

  slides.forEach(slide => {
    slide.style.display = "none";
  });

  index++;
  if (index > slides.length) {
    index = 1;
  }

  slides[index - 1].style.display = "block";
  setTimeout(showSlides, 3000);
}

document.addEventListener("DOMContentLoaded", showSlides);
