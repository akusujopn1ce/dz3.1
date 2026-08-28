$(document).ready(function() {
    let tasks = JSON.parse(localStorage.getItem('todo-tasks')) || [];

    function saveToLocalStorage() {
        localStorage.setItem('todo-tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        const $wrapper = $('.js--todos-wrapper');
        $wrapper.empty(); 

        $.each(tasks, function(index, task) {
            const checkedAttr = task.completed ? 'checked' : '';
            const completedClass = task.completed ? 'todo-item--checked' : '';

            const taskHTML = `
                <li class="todo-item list-group-item ${completedClass}" data-id="${task.id}">
                    <input class="form-check-input js--check me-2" type="checkbox" ${checkedAttr}>
                    <span class="todo-item__description">${task.text}</span>
                    <button class="btn btn-success btn-sm js--delete ms-auto" style="background-color: #0be69d; border: none; color: black;">Видалити</button>
                </li>
            `;
            $wrapper.append(taskHTML);
        });
    }

    $('.js--form').on('submit', function(e) {
        e.preventDefault();
        const $input = $('.js--form__input');
        const taskText = $input.val().trim();

        if (taskText === '') return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveToLocalStorage();
        renderTasks();
        $input.val('');
    }); 

    $('.js--todos-wrapper').on('click', '.js--delete', function() {
        const taskId = $(this).closest('.todo-item').data('id');
        
        tasks = $.grep(tasks, function(task) {
            return task.id !== taskId;
        });
        
        saveToLocalStorage();
        renderTasks();
    });

    $('.js--todos-wrapper').on('change', '.js--check', function() {
        const taskId = $(this).closest('.todo-item').data('id');
        
        $.each(tasks, function(index, task) {
            if (task.id === taskId) {
                task.completed = !task.completed;
            }
        });
        
        saveToLocalStorage();
        renderTasks();
    });

    $('.js--todos-wrapper').on('click', '.todo-item__description', function() {
        const taskText = $(this).text(); 
        
        $('#modal-task-text').text(taskText); 
        
        $('#taskModal').modal('show'); 
    });

    renderTasks();
});