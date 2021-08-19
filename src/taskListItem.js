import flatpickr from "flatpickr";
import { createElemAttr, formatDate, focusAtEnd, setProgressDisplay, isDueDateToday } from './helpers.js';
import { createConfirmation } from './project.js';
import { recalcTaskNumber } from './navMenu.js';
import { createTaskForm } from './taskForm.js';
import { projects } from './data.js';


function createTaskLi(task, project, viewType) {
  const li = createElemAttr('li', {role: 'button', 'aria-expanded': 'false', tabindex: '0'});
  if (task.complete) li.classList.add('checked');
  if (task.priority) li.classList.add('priority');

  const taskMain = createElemAttr('div', {class: 'task-main'});
  li.appendChild(taskMain);

  const btnCheck = createElemAttr('button', {type: 'button', 'aria-label': 'complete-task', class: 'btn-check'});
  const iconCheck = createElemAttr('i', { class: 'fas fa-check' });
  btnCheck.appendChild(iconCheck);

  taskMain.appendChild(btnCheck);  

  const taskTitle = document.createElement('span');
  taskTitle.textContent = task.title;
  taskMain.appendChild(taskTitle);

  if (viewType !== 'project') {
    const projectName = createElemAttr('p', {class: 'project-name'});
    projectName.append(createElemAttr('i', {class: 'fas fa-square'}), project.title);
    li.appendChild(projectName);
  }

  const taskExtension = createElemAttr('div', {class: 'task-extension'});
  li.appendChild(taskExtension);

  const notes = document.createElement('p');
  notes.textContent = task.notes;
  taskExtension.appendChild(notes);  

  const taskOptions = createElemAttr('div', {class: 'task-options'});
  taskExtension.appendChild(taskOptions);

  const datePicker = createElemAttr('div', {class: 'flatpickr'});
  taskOptions.appendChild(datePicker);

  const btnCalendar = createElemAttr('button', {type: 'button', class: 'input-button task-option', title: 'toggle',
      'aria-label': 'toggle-calendar', 'data-toggle': ''});
  btnCalendar.appendChild(createElemAttr('i', {class: 'far fa-calendar-alt'}));
  datePicker.appendChild(btnCalendar);  

  const label = createElemAttr('label', {class: 'visuallyhidden'});
  label.textContent = 'When';
  datePicker.appendChild(label);

  const dateInput = createElemAttr('input', {type: 'text', class: 'visuallyhidden', placeholder: 'When', 'data-input': ''});
  label.appendChild(dateInput);

  if (viewType === 'project') {
    const dateSpan = createElemAttr('span', {class: 'due-date'});
    taskMain.appendChild(dateSpan);
    displayDate(task, dateSpan);
    initFlatpickr(datePicker, task, li, dateSpan);
  } else {
    initFlatpickr(datePicker, task, li);
  } 

  const btnPriority = createElemAttr('button', {type: 'button', class: 'task-option', 'aria-label': 'set-priority'});
  if (task.priority) btnPriority.classList.add('active');
  btnPriority.appendChild(createElemAttr('i', {class: 'fas fa-flag'}));
  taskOptions.appendChild(btnPriority);  

  const btnEdit = createElemAttr('button', {type: 'button', class: 'task-option', 'aria-label': 'edit-task'});
  btnEdit.appendChild(createElemAttr('i', { class: 'fas fa-edit'}));
  taskOptions.appendChild(btnEdit);

  const btnDelete = createElemAttr('button', {type: 'button', class: 'task-option', 'aria-label': 'delete-task'});
  btnDelete.appendChild(createElemAttr('i', {class: 'fas fa-trash-alt'}));
  taskOptions.appendChild(btnDelete);

  // Add event listeners
  li.addEventListener('click', handleExtend);
  li.addEventListener('keydown', handleExtend);

  iconCheck.addEventListener('animationend', () => iconCheck.style['animation-name'] = 'none');

  btnCheck.addEventListener('click', function(e) {
    e.stopPropagation();
    handleCheck(li, task, project, viewType);
  });

  btnCalendar.addEventListener('click', (e) => e.stopPropagation());

  btnPriority.addEventListener('click', function(e) { handlePriority(e, task, this, li) });

  btnEdit.addEventListener('click', (e) => { 
    e.stopPropagation();
    handleEdit(task, project, li, viewType);
  });

  btnDelete.addEventListener('click', (e) => {
    e.stopPropagation();
    confirmTaskDelete(task, project, li, viewType)
  });

  return li;
}

function handleExtend(e) {
  if (this.classList.contains('edit-mode')) return;
  if (e instanceof KeyboardEvent && e.key !== 'Enter' && e.key !== ' ') return;
  e.preventDefault();
  if (this.getAttribute('aria-expanded') === 'false') {
    this.setAttribute('aria-expanded', 'true');
  } else {
    this.setAttribute('aria-expanded', 'false');
  }  
}

function initFlatpickr(element, task, li, dateElement) {
  flatpickr(element, {
    disableMobile: 'true',
    dateFormat: 'M j Y',
    defaultDate: task.dueDate,
    wrap: true,
    onChange: (selDates, dateStr) => {
      const prevDate = task.dueDate;
      task.changeDate(dateStr);
      // Project view case
      if (dateElement) {
        displayDate(task, dateElement);
        if (isDueDateToday(prevDate) || isDueDateToday(dateStr)) {
          recalcTaskNumber(projects.findTodayTasks());
        }
      // Today view case
      } else if (!isDueDateToday(dateStr)) {
        li.remove();
        const todayProject = projects.findTodayTasks();
        setProgressDisplay(todayProject);
        recalcTaskNumber(todayProject);
      }
    },
  });
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

function handleCheck(li, task, project, viewType) {
  task.toggleComplete();
  if (task.complete) {
    li.classList.add('checked');    
    li.querySelector('.fa-check').style['animation-name'] = 'check';
  } else {
    li.classList.remove('checked');
  }
  setProgressDisplay(viewType === 'project' ? project : projects.findTodayTasks());
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

function handleEdit(task, project, li, viewType) {
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
  li.appendChild(createTaskForm(viewType, project, task));
  li.classList.add('edit-mode');
  document.querySelector('.form-overlay').classList.add('show');
  focusAtEnd(li.querySelector('.task-title'));
}

function confirmTaskDelete(task, project, li, viewType) {
  // Create and append confirmation window
  const confWrapper = createConfirmation('Are you sure you want to delete task', task.title);
  li.appendChild(confWrapper);

  // Handle user's choice
  confWrapper.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target.dataset.click === 'delete') {
      handleDeleteTask(task, project, li, viewType);
    } else if (e.target.dataset.click) confWrapper.remove();
  });
}

function handleDeleteTask(task, project, li, viewType) {
  project.deleteTask(task);
  recalcTaskNumber(project);
  if (viewType === 'project') {
    setProgressDisplay(project);
  } else if (viewType === 'today') {
    setProgressDisplay(projects.findTodayTasks());
  }
  if (isDueDateToday(task.dueDate)) {
    recalcTaskNumber(projects.findTodayTasks());
  }
  if (li) li.remove();
}

export { handleDeleteTask, createTaskLi };