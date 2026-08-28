class BankAccount {
    constructor(initialBalance) {
        this.balance = initialBalance;
    }

    getBalance() {
        return this.balance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            return true; 
        }
        return false;
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            return true;
        }
        return false;
    }
}

const myAccount = new BankAccount(1000);

const balanceDisplay = document.getElementById('balance');
const amountInput = document.getElementById('amount-input');
const btnDeposit = document.getElementById('btn-deposit');
const btnWithdraw = document.getElementById('btn-withdraw');
const messageBox = document.getElementById('message-box');

function updateUI() {
    balanceDisplay.textContent = myAccount.getBalance();
}

function showMessage(msg, isError = true) {
    messageBox.textContent = msg;
    messageBox.style.color = isError ? '#e53935' : '#43a047'; 
    
    setTimeout(() => {
        messageBox.textContent = '';
    }, 3000);
}

btnDeposit.addEventListener('click', () => {
    const amount = Number(amountInput.value);
    
    if (myAccount.deposit(amount)) {
        updateUI();
        showMessage(`Успішно поповнено на $${amount}`, false);
        amountInput.value = ''; 
    } else {
        showMessage("Сума має бути більшою за нуль!");
    }
});

btnWithdraw.addEventListener('click', () => {
    const amount = Number(amountInput.value);
    
    if (amount <= 0) {
        showMessage("Сума має бути більшою за нуль!");
        return;
    }
    
    if (myAccount.withdraw(amount)) {
        updateUI();
        showMessage(`Успішно знято $${amount}`, false);
        amountInput.value = ''; 
    } else {
        showMessage("Недостатньо коштів на рахунку!");
    }
});

updateUI();