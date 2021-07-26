import flatpickr from "flatpickr";
import { parse, format, isToday, isTomorrow, isThisYear, isPast } from 'date-fns';
import { countProgress } from './helpers.js';
import { createTask } from './data.js';

function createProjectPage(project) {
  const main = document.createElement('main');

  const header = document.createElement('header');
  main.appendChild(header);

  const h3 = document.createElement('h3');
  h3.textContent = project.title;
  header.appendChild(h3);

  const btnOptions = document.createElement('button');
  btnOptions.setAttribute('type', 'button');
  btnOptions.setAttribute('aria-label', 'show-options');
  btnOptions.classList.add('btn-options');
  header.appendChild(btnOptions);

  const iconEllipsis = document.createElement('i');
  iconEllipsis.classList.add('fas', 'fa-ellipsis-h');
  btnOptions.appendChild(iconEllipsis);

  const progress = document.createElement('progress');
  progress.setAttribute('max', '100');
  const progressValue = countProgress(project);
  progress.setAttribute('value', progressValue);
  progress.textContent = progressValue;
  main.appendChild(progress);

  const description = document.createElement('p');
  description.textContent = project.description;
  main.appendChild(description);

  const taskList = document.createElement('ul');
  taskList.classList.add('task-list');
  main.appendChild(taskList);

  project.tasks.forEach(task => addTaskToDom(task, taskList));

  main.appendChild(createTaskForm(project));

  // const template = document.querySelector('.project-page');
  // let main = template.content.cloneNode(true);

  return main;
}

function createTaskForm(project) {
  const taskFormWrapper = document.createElement('div');
  taskFormWrapper.setAttribute('id', 'task-form-wrapper');
  
  const taskForm = document.createElement('form');
  taskForm.setAttribute('id', 'task-form');
  taskFormWrapper.appendChild(taskForm);

  const labelTitle = document.createElement('label');
  labelTitle.setAttribute('for', 'task-title');
  labelTitle.classList.add('visuallyhidden');
  labelTitle.textContent = 'Task name';
  taskForm.appendChild(labelTitle);

  const inputTitle = document.createElement('input');
  const inputTitleAttr = [['type', 'text'], ['id', 'task-title'], ['placeholder', 'Task name'], ['required', '']];
  inputTitleAttr.forEach(attribute => inputTitle.setAttribute(...attribute));
  taskForm.appendChild(inputTitle);

  const labelNotes = document.createElement('label');
  labelNotes.setAttribute('for', 'task-notes');
  labelNotes.classList.add('visuallyhidden');
  labelNotes.textContent = 'Task notes';
  taskForm.appendChild(labelNotes);

  const inputNotes = document.createElement('textarea');
  const inputNotesAttr = [['id', 'task-notes'], ['placeholder', 'Notes'], ['rows', '2']];
  inputNotesAttr.forEach(attribute => inputNotes.setAttribute(...attribute));
  taskForm.appendChild(inputNotes);

  // Create date picker
  const datePicker = document.createElement('div');
  datePicker.classList.add('flatpickr');
  taskForm.appendChild(datePicker);

  const btnCalendar = document.createElement('button');
  const btnCalendarAttr = [['type', 'button'], ['title', 'toggle'], ['data-toggle', ''], ['aria-label', 'toggle-calendar']];
  btnCalendarAttr.forEach(attribute => btnCalendar.setAttribute(...attribute));  
  btnCalendar.classList.add('input-button');
  datePicker.appendChild(btnCalendar);

  const iconCalendar = document.createElement('i');
  iconCalendar.classList.add('far', 'fa-calendar-alt');
  btnCalendar.appendChild(iconCalendar);

  const labelDate = document.createElement('label');
  labelDate.setAttribute('for', 'task-date');
  labelDate.classList.add('visuallyhidden');
  labelDate.textContent = 'When';
  datePicker.appendChild(labelDate);

  const inputDate = document.createElement('input');
  const inputDatesAttr = [['type', 'text'], ['placeholder', 'When'], ['data-input', '']]
  inputDatesAttr.forEach(attribute => inputDate.setAttribute(...attribute));
  datePicker.appendChild(inputDate);
  
  const btnClearDate = document.createElement('button');
  const btnClearDateAttr = [['type', 'button'], ['title', 'clear'], ['data-clear', ''], ['aria-label', 'clear-date']];
  btnClearDateAttr.forEach(attribute => btnClearDate.setAttribute(...attribute));
  btnClearDate.classList.add('input-button');
  datePicker.appendChild(btnClearDate);

  const iconTimes = document.createElement('i');
  iconTimes.classList.add('fas', 'fa-times');
  btnClearDate.appendChild(iconTimes);

  // Initialize flatpickr instance
  initializeFlatpickr(datePicker);

  const btnSubmit = document.createElement('button');
  btnSubmit.setAttribute('type', 'submit');
  btnSubmit.classList.add('btn-submit');
  btnSubmit.textContent = 'Save';
  taskForm.appendChild(btnSubmit);

  const btnAddTask = document.createElement('button');
  btnAddTask.setAttribute('type', 'button');
  btnAddTask.classList.add('btn-menu', 'btn-add');
  btnAddTask.textContent = ' New task';
  taskFormWrapper.appendChild(btnAddTask);

  btnAddTask.addEventListener('click', toggleTaskForm);

  taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    submitTask(this, project);
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

function submitTask(form, project) {
  const title = form.querySelector('#task-title').value;
  const notes = form.querySelector('#task-notes').value;
  const dueDate = form.querySelector('#task-date').value;
  const task = createTask(title, notes, dueDate);
  project.addTask(task);
  addTaskToDom(task);
  toggleTaskForm();
  form.reset();
}

function addTaskToDom(task, taskList) {
  if (!taskList) {
    taskList = document.querySelector('.task-list');
  }

  const li = document.createElement('li');
  if (task.complete) li.classList.add('checked');
  if (task.priority) li.classList.add('priority');
  taskList.appendChild(li);

  const btnCheck = document.createElement('button');
  btnCheck.setAttribute('type', 'button');
  btnCheck.setAttribute('aria-label', 'complete-task');
  btnCheck.classList.add('btn-check');
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

export { createProjectPage };