const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dotsContainer = document.getElementById('dots-container');

let currentIndex = 0;

slides.forEach((slide, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
    
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    currentIndex = index;
    
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
    
    if (currentIndex === 0) {
        prevBtn.style.visibility = 'hidden';
    } else {
        prevBtn.style.visibility = 'visible';
    }
    
    if (currentIndex === slides.length - 1) {
        nextBtn.style.visibility = 'hidden';
    } else {
        nextBtn.style.visibility = 'visible';
    }
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
        goToSlide(currentIndex + 1);
    }
});

goToSlide(0);