const btnEnter = document.getElementById('btn-enter');
const btnGo = document.getElementById('btn-go');
const statusText = document.getElementById('status-text');

let userUrl = "";

btnEnter.addEventListener('click', function() {
    const input = prompt("Введіть посилання (наприклад, google.com):");
    
    if (input !== null && input.trim() !== "") {
        userUrl = input.trim();
        
        if (!userUrl.startsWith('http://') && !userUrl.startsWith('https://')) {
            userUrl = 'https://' + userUrl;
        }
        
        statusText.textContent = "Посилання збережено. Тепер можна переходити!";
        statusText.style.color = "green";
    }
});

btnGo.addEventListener('click', function() {
    if (userUrl !== "") {
        window.location.href = userUrl;
    } else {
        alert("Будь ласка, спочатку натисніть 'Ввести посилання'!");
    }
});