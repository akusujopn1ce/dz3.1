const imgElement = document.getElementById('random-img');
const btnElement = document.getElementById('change-img-btn');

function setRandomImage() {
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    
    const imageName = randomNumber + '.jpg';
    
    imgElement.src = 'images/' + imageName;
}

setRandomImage();

btnElement.addEventListener('click', setRandomImage);