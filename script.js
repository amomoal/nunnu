const slides = document.querySelector('.slides');
const slideCount = slides.children.length;
let currentIndex = 0;

document.querySelector('.prev').addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? slideCount - 1 : currentIndex - 1;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
});

document.querySelector('.next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slideCount;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
});
