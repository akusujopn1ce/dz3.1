require('./style.scss');

"use strict";

$(document).ready(function () {
  var tasks = JSON.parse(localStorage.getItem('todo-tasks')) || [];

  function saveToLocalStorage() {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }

  function renderTasks() {
    var $wrapper = $('.js--todos-wrapper');
    $wrapper.empty();
    
    $.each(tasks, function (index, task) {
      var checkedAttr = task.completed ? 'checked' : '';
      var completedClass = task.completed ? 'todo-item--checked' : '';
      
      var taskHTML = "\n                <li class=\"todo-item list-group-item " + completedClass + "\" data-id=\"" + task.id + "\">\n                    <input class=\"form-check-input js--check me-2\" type=\"checkbox\" " + checkedAttr + ">\n                    <span class=\"todo-item__description\">" + task.text + "</span>\n                    <button class=\"btn btn-success btn-sm js--delete ms-auto\" style=\"background-color: #0be69d; border: none; color: black;\">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438</button>\n                </li>\n            ";
      $wrapper.append(taskHTML);
    });
  }

  $('.js--form').on('submit', function (e) {
    e.preventDefault();
    var $input = $('.js--form__input');
    var taskText = $input.val().trim();
    if (taskText === '') return;
    
    var newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };
    
    tasks.push(newTask);
    saveToLocalStorage();
    renderTasks();
    $input.val('');
  });

  $('.js--todos-wrapper').on('click', '.js--delete', function () {
    var taskId = $(this).closest('.todo-item').data('id');
    tasks = $.grep(tasks, function (task) {
      return task.id !== taskId;
    });
    saveToLocalStorage();
    renderTasks();
  });

  $('.js--todos-wrapper').on('change', '.js--check', function () {
    var taskId = $(this).closest('.todo-item').data('id');
    $.each(tasks, function (index, task) {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
    });
    saveToLocalStorage();
    renderTasks();
  });

  $('.js--todos-wrapper').on('click', '.todo-item__description', function () {
    var taskText = $(this).text();
    $('#modal-task-text').text(taskText);
    $('#taskModal').modal('show');
  });

  renderTasks();
});