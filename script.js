const container = document.getElementById('button-container');

container.addEventListener('click', function(event) {
    
    if (event.target.tagName === 'BUTTON') {
        const buttonName = event.target.textContent;
        
        alert(`Клікнуто на кнопці: ${buttonName}`);
    }
});