class Calculator {
    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        if (b === 0) {
            return "Помилка (ділення на 0)";
        }
        return a / b;
    }
}

const calc = new Calculator();

const inputA = document.getElementById('num-a');
const inputB = document.getElementById('num-b');
const resultDisplay = document.getElementById('result');

function getNumbers() {
    const a = Number(inputA.value) || 0;
    const b = Number(inputB.value) || 0;
    return { a, b };
}

function showResult(value) {
    resultDisplay.textContent = value;
}

document.getElementById('btn-add').addEventListener('click', () => {
    const nums = getNumbers();
    showResult(calc.add(nums.a, nums.b));
});

document.getElementById('btn-sub').addEventListener('click', () => {
    const nums = getNumbers();
    showResult(calc.subtract(nums.a, nums.b));
});

document.getElementById('btn-mult').addEventListener('click', () => {
    const nums = getNumbers();
    showResult(calc.multiply(nums.a, nums.b));
});

document.getElementById('btn-div').addEventListener('click', () => {
    const nums = getNumbers();
    showResult(calc.divide(nums.a, nums.b));
});