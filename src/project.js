import flatpickr from "flatpickr";
import { createTaskForm } from './taskForm.js';
import { setAttributes, createElemAttr, formatDate } from './helpers.js';

function createProjectPage(project) {
  const main = document.createElement('main');

  const header = document.createElement('header');
  main.appendChild(header);

  const h3 = document.createElement('h3');
  h3.textContent = project.title;
  header.appendChild(h3);

  const btnOptions = document.createElement('button');
  setAttributes(btnOptions, {'type': 'button', 'aria-label': 'show-options', 'class': 'btn-options'});
  header.appendChild(btnOptions);

  const iconEllipsis = document.createElement('i');
  iconEllipsis.classList.add('fas', 'fa-ellipsis-h');
  btnOptions.appendChild(iconEllipsis);

  const progress = document.createElement('progress');
  progress.setAttribute('max', '100');
  setProgressDisplay(project, progress);
  main.appendChild(progress);

  const description = document.createElement('p');
  description.textContent = project.description;
  main.appendChild(description);

  const taskList = document.createElement('ul');
  taskList.classList.add('task-list');
  main.appendChild(taskList);

  project.tasks.forEach(task => taskList.appendChild(createTaskLi(task, project)));

  const taskFormWrapper = createElemAttr('div', {id: 'task-form-wrapper'});
  main.appendChild(taskFormWrapper);

  taskFormWrapper.appendChild(createTaskForm(project));

  const btnAddTask = document.createElement('button');
  setAttributes(btnAddTask, {'type': 'button', 'class': 'btn-menu btn-add'});
  btnAddTask.textContent = ' New task';
  taskFormWrapper.appendChild(btnAddTask);

  btnAddTask.addEventListener('click', toggleTaskForm);

  return main;
}


function toggleTaskForm() {
  const taskFormWrapper = document.getElementById('task-form-wrapper');
  if (taskFormWrapper.classList.contains('show-form')) {
    taskFormWrapper.classList.remove('show-form');
  } else {
    taskFormWrapper.classList.add('show-form');
    taskFormWrapper.querySelector('.task-title').focus();
  }
}


function createTaskLi(task, project) {
  const li = document.createElement('li');
  if (task.complete) li.classList.add('checked');
  if (task.priority) li.classList.add('priority');

  const taskMain = document.createElement('div');
  taskMain.classList.add('task-main');
  li.appendChild(taskMain);

  const btnCheck = document.createElement('button');
  setAttributes(btnCheck, {'type': 'button', 'aria-label': 'complete-task', 'class': 'btn-check'});
  taskMain.appendChild(btnCheck);

  const iconCheck = document.createElement('i');
  iconCheck.classList.add('fas', 'fa-check');
  btnCheck.appendChild(iconCheck);

  const taskTitle = document.createElement('span');
  taskTitle.textContent = task.title;
  taskMain.appendChild(taskTitle);

  const dateSpan = document.createElement('span');
  dateSpan.classList.add('due-date');
  taskMain.appendChild(dateSpan);

  displayDate(task, dateSpan);

  const taskExtension = document.createElement('div');
  taskExtension.classList.add('task-extension');
  li.appendChild(taskExtension);

  const notes = document.createElement('p');
  notes.textContent = task.notes;
  taskExtension.appendChild(notes);  

  const taskOptions = document.createElement('div');
  taskOptions.classList.add('task-options');
  taskExtension.appendChild(taskOptions);

  const datePicker = document.createElement('div');
  datePicker.classList.add('flatpickr');
  taskOptions.appendChild(datePicker);

  const btnCalendar = document.createElement('button');
  setAttributes(btnCalendar, {'type': 'button', 'class': 'input-button task-option', 'title': 'toggle',
      'aria-label': 'toggle-calendar', 'data-toggle': ''});
  datePicker.appendChild(btnCalendar);

  const iconCalendar = document.createElement('i');
  iconCalendar.classList.add('far', 'fa-calendar-alt');
  btnCalendar.appendChild(iconCalendar);

  const label = document.createElement('label');
  label.classList.add('visuallyhidden');
  label.textContent = 'When';
  datePicker.appendChild(label);

  const dateInput = document.createElement('input');
  setAttributes(dateInput, { 'type': 'text', 'class': 'visuallyhidden', 'placeholder': 'When', 'data-input': ''});
  label.appendChild(dateInput);

  const btnPriority = document.createElement('button');
  setAttributes(btnPriority, {'type': 'button', 'class': 'task-option', 'aria-label': 'set-priority'});
  if (task.priority) btnPriority.classList.add('active');
  taskOptions.appendChild(btnPriority);

  const iconFlag = document.createElement('i');
  iconFlag.classList.add('fas', 'fa-flag');
  btnPriority.appendChild(iconFlag);

  const btnEdit = document.createElement('button');
  setAttributes(btnEdit, {'type': 'button', 'class': 'task-option', 'aria-label': 'edit-task'});
  taskOptions.appendChild(btnEdit);

  initFlatpickr(datePicker, task, dateSpan);

  btnEdit.appendChild(createElemAttr('i', { class: 'fas fa-edit'}));

  // Add event listeners
  li.addEventListener('click', toggleExtension);

  btnCheck.addEventListener('click', function(e) { handleCheck(e, li, task, project) });

  btnCalendar.addEventListener('click', (e) => e.stopPropagation());

  btnPriority.addEventListener('click', function(e) { handlePriority(e, task, this, li) });

  btnEdit.addEventListener('click', function(e) { handleEdit(e, task, project, li) });

  return li;
}


function displayDate(task, element) {
  element.classList.remove('today', 'expired');
  if (task.dueDate) {
    const formDate = formatDate(task.dueDate);
    element.textContent = formDate.date;
    if (formDate.date === 'Today') {
      element.classList.add('today');
    } else if (formDate.expired) {
      element.classList.add('expired');
    }
  }
}


function initFlatpickr(element, task, dateElement) {
  flatpickr(element, { 
    disableMobile: "true",
    dateFormat: "M j Y",
    defaultDate: task.dueDate,
    wrap: true,
    onChange: (selDates, dateStr, fp) => {
      task.changeDate(dateStr);
      displayDate(task, dateElement);
      },
  });
}


function setProgressDisplay(project, progress) {
  if (!progress) {
    progress = document.querySelector('progress');
  }
  const progressValue = project.calcProgress();
  progress.setAttribute('value', progressValue);
  progress.textContent = `${progressValue} %`;
}


function handleCheck(e, li, task, project) {
  e.stopPropagation();
  task.toggleComplete();
  task.complete ? li.classList.add('checked') : li.classList.remove('checked');
  setProgressDisplay(project);
}


function handlePriority(e, task, button, li) {
  e.stopPropagation();
  task.togglePriority();
  if (task.priority) {
    li.classList.add('priority');
    button.classList.add('active');
  } else {
    li.classList.remove('priority');
    button.classList.remove('active');
  }
}


function handleEdit(e, task, project, li) {
  e.stopPropagation();

  // Submit previously opened editing form
  const openedForm = document.getElementById('edit-task-form');
  if (openedForm) {
     openedForm.querySelector('.btn-submit').click();
  }

  // Cancel previously opened form if it doesn't pass submit
  if (document.getElementById('edit-task-form')) {
    openedForm.querySelector('.btn-cancel').click();
  }

  while (li.firstChild) {
    li.removeChild(li.firstChild);
  }
  li.classList.remove('checked', 'priority');
  li.appendChild(createTaskForm(project, task));
  li.classList.add('edit-mode');
  li.querySelector('.task-title').focus();
}


function toggleExtension(e) {
  this.classList.toggle('extended');
}


export { createProjectPage, createTaskLi, setProgressDisplay, toggleTaskForm };