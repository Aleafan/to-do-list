import flatpickr from "flatpickr";
import { parse, format, isToday, isTomorrow, isThisYear, isPast } from 'date-fns';
import { projects, createTask } from './data.js';
import { recalcTaskNumber } from './navMenu.js';
import { setAttributes } from './helpers.js';

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

  project.tasks.forEach(task => addTaskToList(task, taskList));

  main.appendChild(createTaskForm(project));

  return main;
}

function createTaskForm(project) {

  const taskFormWrapper = document.createElement('div');
  taskFormWrapper.setAttribute('id', 'task-form-wrapper');
  
  const taskForm = document.createElement('form');
  taskForm.setAttribute('id', 'task-form');
  taskFormWrapper.appendChild(taskForm);

  const flexWrapper = document.createElement('div');
  flexWrapper.classList.add('flex-wrapper');
  taskForm.appendChild(flexWrapper);

  const labelTitle = document.createElement('label');
  setAttributes(labelTitle, {'for': 'task-title', 'class': 'visuallyhidden'});
  labelTitle.textContent = 'Task name';
  flexWrapper.appendChild(labelTitle);

  const inputTitle = document.createElement('input');
  setAttributes(inputTitle, {'type': 'text', 'id': 'task-title', 'placeholder': 'Task name', 'required': ''});
  flexWrapper.appendChild(inputTitle);

  const btnPriority = document.createElement('button');
  setAttributes(btnPriority, {'type': 'button', 'value': '', 'aria-label': 'set-priority', 'id': 'task-priority'});
  flexWrapper.appendChild(btnPriority);

  const iconFlag = document.createElement('i');
  iconFlag.classList.add('fas', 'fa-flag');
  btnPriority.appendChild(iconFlag);  

  const labelNotes = document.createElement('label');
  setAttributes(labelNotes, {'for': 'task-notes', 'class': 'visuallyhidden'});
  labelNotes.textContent = 'Task notes';
  taskForm.appendChild(labelNotes);

  const inputNotes = document.createElement('textarea');
  setAttributes(inputNotes, {'id': 'task-notes', 'placeholder': 'Notes', 'rows': '2'});
  taskForm.appendChild(inputNotes);

  const formOptions = document.createElement('div');
  formOptions.classList.add('form-options');
  taskForm.appendChild(formOptions);

  // Create date picker
  const datePicker = document.createElement('div');
  datePicker.classList.add('flatpickr');
  formOptions.appendChild(datePicker);

  const btnCalendar = document.createElement('button');
  setAttributes(btnCalendar, {'type': 'button', 'title': 'toggle', 'data-toggle': '', 'aria-label': 'toggle-calendar', 
      'class': 'input-button'});
  datePicker.appendChild(btnCalendar);

  const iconCalendar = document.createElement('i');
  iconCalendar.classList.add('far', 'fa-calendar-alt');
  btnCalendar.appendChild(iconCalendar);

  const labelDate = document.createElement('label');
  setAttributes(labelDate, {'for': 'task-date', 'class': 'visuallyhidden'});
  labelDate.textContent = 'When';
  datePicker.appendChild(labelDate);

  const inputDate = document.createElement('input');
  setAttributes(inputDate, {'type': 'text', 'placeholder': 'When', 'data-input': ''});
  datePicker.appendChild(inputDate);
  
  const btnClearDate = document.createElement('button');
  setAttributes(btnClearDate, {'type': 'button', 'title': 'clear', 'data-clear': '', 'aria-label': 'clear-date', 
      'class': 'input-button'});
  datePicker.appendChild(btnClearDate);

  const iconTimes = document.createElement('i');
  iconTimes.classList.add('fas', 'fa-times');
  btnClearDate.appendChild(iconTimes);

  // Initialize flatpickr instance
  initializeFlatpickr(datePicker);

  // Create project selection menu
  const taskProjectWrapper = document.createElement('div');
  taskProjectWrapper.setAttribute('id', 'task-project-wrapper');
  formOptions.appendChild(taskProjectWrapper);

  const labelProject = document.createElement('label');
  setAttributes(labelProject, {'for': 'task-project', 'class': 'visuallyhidden'});
  labelProject.textContent = 'Select a project';
  taskProjectWrapper.appendChild(labelProject);

  const selectProject = document.createElement('select');
  selectProject.setAttribute('id', 'task-project');
  taskProjectWrapper.appendChild(selectProject);

  projects.forEach(proj => {
    const option = document.createElement('option');
    option.textContent = proj.title;
    option.setAttribute('value', proj.id);
    if (project.id === proj.id) option.setAttribute('selected', '');
    selectProject.appendChild(option);
  });

  const btnFormWrapper = document.createElement('div');
  btnFormWrapper.classList.add('btn-form-wrapper');
  taskForm.appendChild(btnFormWrapper);

  const btnSubmit = document.createElement('button');
  setAttributes(btnSubmit, {'type': 'submit', 'class': 'btn-form btn-submit'});
  btnSubmit.textContent = 'Save';
  btnFormWrapper.appendChild(btnSubmit);

  const btnCancel = document.createElement('button');
  setAttributes(btnCancel, {'type': 'button', 'class': 'btn-form btn-cancel'});
  btnCancel.textContent = 'Cancel';
  btnFormWrapper.appendChild(btnCancel);

  const btnAddTask = document.createElement('button');
  setAttributes(btnAddTask, {'type': 'button', 'class': 'btn-menu btn-add'});
  btnAddTask.textContent = ' New task';
  taskFormWrapper.appendChild(btnAddTask);

  // Add event listeners
  btnPriority.addEventListener('click', togglePriorityState);

  btnAddTask.addEventListener('click', toggleTaskForm);

  btnCancel.addEventListener('click', () => cancelTask(taskForm));

  taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    submitTask(this, project.id);
  });

  return taskFormWrapper;
}


function toggleTaskForm() {
  const taskFormWrapper = document.getElementById('task-form-wrapper');
  if (taskFormWrapper.classList.contains('show-form')) {
    taskFormWrapper.classList.remove('show-form');
  } else {
    taskFormWrapper.classList.add('show-form');
    taskFormWrapper.querySelector('#task-title').focus();
  }
}


function togglePriorityState() {
  if (this.value) {
    this.value = '';
    this.classList.remove('active');
  } else {
    this.value = '1';
    this.classList.add('active');
  }
}


function submitTask(form, id) {
  const title = form.querySelector('#task-title').value;
  const notes = form.querySelector('#task-notes').value;
  const dueDate = form.querySelector('#task-date').value;
  const btnPriority = form.querySelector('#task-priority');
  const priority = btnPriority.value;
  const task = createTask(title, notes, dueDate, priority);

  const projectId = form.querySelector('#task-project').value;
  const project = projects.find(currProject => currProject.id === projectId);
  project.addTask(task);

  if (projectId === id) {
    addTaskToList(task);
    setProgressDisplay(project);
  }  
  toggleTaskForm();
  if (priority) togglePriorityState.apply(btnPriority);
  form.reset();
  recalcTaskNumber(project);
}

function cancelTask(form) {
  toggleTaskForm();
  const btnPriority = form.querySelector('#task-priority');
  if (btnPriority.value) togglePriorityState.apply(btnPriority);
  form.reset();
}


function addTaskToList(task, taskList) {
  if (!taskList) {
    taskList = document.querySelector('.task-list');
  }

  const li = document.createElement('li');
  if (task.complete) li.classList.add('checked');
  if (task.priority) li.classList.add('priority');
  taskList.appendChild(li);

  const btnCheck = document.createElement('button');
  setAttributes(btnCheck, {'type': 'button', 'aria-label': 'complete-task', 'class': 'btn-check'});
  li.appendChild(btnCheck);

  const iconCheck = document.createElement('i');
  iconCheck.classList.add('fas', 'fa-check');
  btnCheck.appendChild(iconCheck);

  const taskTitle = document.createTextNode(task.title);
  li.appendChild(taskTitle);

  if (task.dueDate) {
    const date = document.createElement('span');
    date.classList.add('due-date');
    const formDate = formatDate(task.dueDate);
    date.textContent = formDate.date;
    if (formDate.date === 'Today') {
      date.classList.add('today');
    } else if (formDate.expired) {
      date.classList.add('expired');
    }
    li.appendChild(date);
  }
}


function formatDate(dateStr) {
  const parsedDate = parse(dateStr, "MMM d yyyy", new Date());
  const expired = isPast(parsedDate);
  const date = isToday(parsedDate) ? 'Today'
      : isTomorrow(parsedDate) ? 'Tomor.'
      : isThisYear(parsedDate) ? format(parsedDate, 'MMM d')
      : dateStr;
  return { date, expired };
}


function initializeFlatpickr(element) {
  flatpickr(element, { 
    disableMobile: "true",
    altInput: true,
    altFormat: "M j Y",
    dateFormat: "M j Y",
    minDate: 'today',
    wrap: true,
    onReady: (a, b, fp) => {
      fp.altInput.setAttribute('id', 'task-date');
      },
    onChange: (selDates, dateStr, fp) => {
      fp.altInput.value = formatDate(dateStr).date;
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

export { createProjectPage };