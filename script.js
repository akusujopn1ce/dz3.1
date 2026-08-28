// 1. Знаходимо необхідні елементи в DOM
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');

// --- ЧАСТИНА 1: Видалення завдань (Делегування подій) ---

// Вішаємо обробник подій на весь список <ul>
taskList.addEventListener('click', function(event) {
    // Перевіряємо, чи клік був саме по кнопці "Видалити"
    if (event.target.classList.contains('delete-btn')) {
        // Знаходимо батьківський елемент <li> для цієї кнопки
        const liToRemove = event.target.parentElement;
        
        // Видаляємо елемент <li> з DOM
        liToRemove.remove();
    }
});

// --- ЧАСТИНА 2: Додавання нових завдань ---

addBtn.addEventListener('click', function() {
    // Отримуємо текст з інпута та очищаємо його від зайвих пробілів по краях
    const taskText = taskInput.value.trim();

    // Перевіряємо, чи інпут не порожній
    if (taskText !== "") {
        // Створюємо новий елемент <li>
        const newLi = document.createElement('li');

        // Створюємо <span> для тексту завдання
        const span = document.createElement('span');
        span.textContent = taskText;

        // Створюємо кнопку "Видалити"
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Видалити";
        deleteButton.classList.add('delete-btn'); // Додаємо клас, щоб працювало делегування та стилі

        // Складаємо елементи разом (додаємо span та button всередину li)
        newLi.appendChild(span);
        newLi.appendChild(deleteButton);

        // Додаємо готовий <li> у наш список <ul>
        taskList.appendChild(newLi);

        // Очищаємо інпут після додавання
        taskInput.value = "";
    } else {
        alert("Будь ласка, введіть текст завдання.");
    }
});