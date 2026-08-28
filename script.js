const form = document.querySelector('.js--form');
const input = document.querySelector('.js--form__input');
const todosWrapper = document.querySelector('.js--todos-wrapper');

let tasks = JSON.parse(localStorage.getItem('todo-tasks')) || [];

function saveToLocalStorage() {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}

function renderTasks() {
    todosWrapper.innerHTML = '';

    tasks.forEach(task => {
        const cssClass = task.completed ? 'todo-item todo-item--checked' : 'todo-item';
        
        const taskHTML = `
            <li class="${cssClass}" data-id="${task.id}">
                <input type="checkbox" class="js--check" ${task.completed ? 'checked' : ''}>
                <span class="todo-item__description">${task.text}</span>
                <button class="todo-item__delete js--delete">Видалити</button>
            </li>
        `;
        
        todosWrapper.insertAdjacentHTML('beforeend', taskHTML);
    });
}

function addTask(event) {
    event.preventDefault(); 
    
    const taskText = input.value.trim();
    if (taskText === '') return;

    const newTask = {
        id: Date.now(), 
        text: taskText,
        completed: false
    };

    tasks.push(newTask); 
    saveToLocalStorage(); 
    renderTasks(); 
    
    input.value = ''; 
    input.focus();
}

function handleTaskAction(event) {
    const parentNode = event.target.closest('.todo-item');
    if (!parentNode) return;
    
    const taskId = Number(parentNode.dataset.id);

    if (event.target.classList.contains('js--delete')) {
        tasks = tasks.filter(task => task.id !== taskId);
    }

    if (event.target.classList.contains('js--check')) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
        }
    }

    saveToLocalStorage(); 
    renderTasks(); 
}

form.addEventListener('submit', addTask);
todosWrapper.addEventListener('click', handleTaskAction);

renderTasks();