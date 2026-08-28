const form = document.getElementById('help-form');

const regexPatterns = {
    name: /^(?!\s*$).+/, 
    message: /^[\s\S]{5,}$/, 
    phone: /^\+380\d{9}$/, 
    email: /^[^@\s]+@[^@\s]+\.[^@\s]+$/
};

function validateInput(inputId, errorId, regex) {
    const input = document.getElementById(inputId);
    const errorMsg = document.getElementById(errorId);
    const value = input.value.trim(); 

    if (regex.test(value)) {
        input.classList.remove('invalid');
        errorMsg.classList.remove('active');
        return true;
    } else {
        input.classList.add('invalid');
        errorMsg.classList.add('active');
        return false;
    }
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const isNameValid = validateInput('name', 'error-name', regexPatterns.name);
    const isMessageValid = validateInput('message', 'error-message', regexPatterns.message);
    const isPhoneValid = validateInput('phone', 'error-phone', regexPatterns.phone);
    const isEmailValid = validateInput('email', 'error-email', regexPatterns.email);

    if (isNameValid && isMessageValid && isPhoneValid && isEmailValid) {
        const formData = {
            name: document.getElementById('name').value.trim(),
            message: document.getElementById('message').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim()
        };

        console.log("Дані з форми успішно відправлені:", formData);
        
        form.reset();
    }
});