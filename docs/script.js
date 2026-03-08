let index = 0;

function showSlides() {
let slides = document.querySelectorAll(".slide");

slides.forEach((slide)=>{
slide.style.display = "none";
});

index++;

if(index > slides.length){
index = 1;
}

slides[index-1].style.display = "block";

setTimeout(showSlides, 3000);
}

showSlides();
