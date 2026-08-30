require('./style.scss');

const API_URL = 'http://localhost:5000/tasks';
let tasks = []; 

$(document).ready(function() {
    
    async function fetchTasks() {
        try {
            const response = await fetch(API_URL);
            tasks = await response.json();
            renderTasks();
        } catch (error) {
            console.error('Помилка завантаження з БД:', error);
        }
    }

    function renderTasks() {
        const $wrapper = $('.js--todos-wrapper');
        $wrapper.empty(); 

        $.each(tasks, function(index, task) {
            const taskId = task._id; 
            const checkedAttr = task.completed ? 'checked' : '';
            const completedClass = task.completed ? 'todo-item--checked' : '';

            const taskHTML = `
                <li class="todo-item list-group-item ${completedClass}" data-id="${taskId}">
                    <input class="form-check-input js--check me-2" type="checkbox" ${checkedAttr}>
                    <span class="todo-item__description">${task.text}</span>
                    <button class="btn btn-success btn-sm js--delete ms-auto" style="background-color: #0be69d; border: none; color: black;">Видалити</button>
                </li>
            `;
            $wrapper.append(taskHTML);
        });
    }

    $('.js--form').on('submit', async function(e) {
        e.preventDefault();
        const $input = $('.js--form__input');
        const taskText = $input.val().trim();

        if (taskText === '') return;

        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: taskText })
        });

        $input.val('');
        fetchTasks(); 
    }); 

    $('.js--todos-wrapper').on('click', '.js--delete', async function() {
        const taskId = $(this).closest('.todo-item').data('id');
        
        await fetch(`${API_URL}/${taskId}`, { method: 'DELETE' });
        fetchTasks(); 
    });

    $('.js--todos-wrapper').on('change', '.js--check', async function() {
        const taskId = $(this).closest('.todo-item').data('id');
        
        const task = tasks.find(t => t._id === taskId);
        
        await fetch(`${API_URL}/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !task.completed })
        });
        
        fetchTasks(); 
    });

    $('.js--todos-wrapper').on('click', '.todo-item__description', function() {
        const taskText = $(this).text(); 
        $('#modal-task-text').text(taskText); 
        $('#taskModal').modal('show'); 
    });

    fetchTasks();
});