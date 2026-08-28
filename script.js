const textBlock = document.getElementById('text-block');
const button = document.getElementById('color-btn');

button.addEventListener('click', function() {
    textBlock.classList.toggle('text-highlight');
});