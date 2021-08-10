import flatpickr from "flatpickr";
import { createTaskForm } from './taskForm.js';
import { recalcTaskNumber } from './navMenu.js';
import { createElemAttr, formatDate, focusAtEnd } from './helpers.js';

function createProjectPage(project) {
  const main = document.createElement('main');

  main.appendChild(createProjectHeader(project));

  const progress = createElemAttr('progress', {max: '100'});
  setProgressDisplay(project, progress);
  main.appendChild(progress);  

  const taskList = createElemAttr('ul', {class: 'task-list'});
  main.appendChild(taskList);

  project.tasks.forEach(task => taskList.appendChild(createTaskLi(task, project)));

  const taskFormWrapper = createElemAttr('div', {id: 'task-form-wrapper'});
  main.appendChild(taskFormWrapper);

  taskFormWrapper.appendChild(createTaskForm(project));

  const btnAddTask = createElemAttr('button', {type: 'button', class: 'btn-menu btn-add'});
  btnAddTask.textContent = ' New task';
  taskFormWrapper.appendChild(btnAddTask);

  // Add event listeners
  btnAddTask.addEventListener('click', toggleTaskForm);  

  return main;
}


function createProjectHeader(project) {
  const header = createElemAttr('header', {id: 'project-info'});

  const flexWrapper = createElemAttr('div', {class: 'flex-wrapper'});

  const h3 = document.createElement('h3');
  h3.textContent = project.title;

  const btnOptions = createElemAttr('button', {type: 'button', 'aria-label': 'show-options', class: 'btn-options'});
  btnOptions.appendChild(createElemAttr('i', {class: 'fas fa-ellipsis-h'}));

  flexWrapper.append(h3, btnOptions);

  header.appendChild(flexWrapper);

  if (project.description) {
    const description = createElemAttr('p', {class: 'description'});
    description.textContent = project.description;
    header.appendChild(description);
  }

  // Add event listeners
  btnOptions.addEventListener('click', function() { showOptionsPopup(btnOptions, project) });

  return header;
}


function showOptionsPopup(btnOptions, project) {
  const popupWrapper = createElemAttr('div', {id: 'popup-wrapper'});
  
  const projOptions = createElemAttr('ul', {id: 'project-options'});
  popupWrapper.appendChild(projOptions);

  const liEdit = document.createElement('li');
  const btnEdit = createElemAttr('button', {type: 'button', class: 'btn-proj-option'});
  btnEdit.append(createElemAttr('i', {class: 'fas fa-edit'}), 'Edit project');
  liEdit.appendChild(btnEdit);

  const liDelComplete = document.createElement('li');
  const btnDelComplete = createElemAttr('button', {type: 'button', class: 'btn-proj-option'});
  btnDelComplete.append(createElemAttr('i', {class: 'fas fa-calendar-check'}), 'Delete completed tasks');
  liDelComplete.appendChild(btnDelComplete);

  const liDelete = document.createElement('li');
  const btnDelete = createElemAttr('button', {type: 'button', class: 'btn-proj-option'});
  btnDelete.append(createElemAttr('i', {class: 'far fa-trash-alt'}), 'Delete project');
  liDelete.appendChild(btnDelete);
  projOptions.append(liEdit, liDelComplete, liDelete);

  document.body.appendChild(popupWrapper);

  setPopupPosition(btnOptions, projOptions);

  // Add event listeners
  window.addEventListener('resize', () => setPopupPosition(btnOptions, projOptions));

  popupWrapper.addEventListener('click', () => popupWrapper.remove());

  btnEdit.addEventListener('click', () => handleProjectEdit(project));
}


function setPopupPosition(refElement, projOptions) {
  const top = refElement.offsetTop + refElement.offsetHeight;
  const left = refElement.offsetLeft + 0.5 * refElement.offsetWidth - 0.5 * projOptions.offsetWidth;

  if ((left + projOptions.offsetWidth) > window.innerWidth) {
    projOptions.style.cssText = `top: ${top}px; right: 0`;
  } else {
    projOptions.style.cssText = `top: ${top}px; left: ${left}px`;
  }
}


function handleProjectEdit(project) {
  // Create editing form
  const form = createElemAttr('form', {id: 'edit-project'});
  
  const labelTitle = createElemAttr('label', {for: 'project-title', class: 'visuallyhidden'});
  labelTitle.textContent = 'Project name';
  const inputTitle = createElemAttr('input', {type: 'text', id: 'project-title', class: 'project-title', 
      placeholder: 'Project name', value: project.title, required: ''});

  const labelNotes = createElemAttr('label', {for: 'project-notes', class: 'visuallyhidden'});
  labelTitle.textContent = 'Project notes';
  const inputNotes = createElemAttr('textarea', {id: 'project-notes', row: '2', placeholder: 'Project notes'});
  inputNotes.textContent = project.description || '';

  const btnWrapper = createElemAttr('div', {class: 'btn-form-wrapper'});

  const btnSubmit = createElemAttr('button', {type: 'submit', class: 'btn-form btn-submit'});
  btnSubmit.textContent = 'Save';
  const btnCancel = createElemAttr('button', {class: 'btn-form btn-cancel'});
  btnCancel.textContent = 'Cancel';

  btnWrapper.append(btnSubmit, btnCancel);
      
  form.append(labelTitle, inputTitle, labelNotes, inputNotes, btnWrapper);

  // Replace project header with form
  const oldHeader = document.getElementById('project-info');
  oldHeader.replaceWith(form);

  // Focus on project title input
  focusAtEnd(inputTitle);

  // Add event listeners
  form.addEventListener('submit', (e) => handleSubmit(e, form, project));

  btnCancel.addEventListener('click', () => form.replaceWith(oldHeader));
}


function handleSubmit(e, form, project) {
  e.preventDefault();
  
  // Edit project object information
  project.title = form.querySelector('#project-title').value;
  project.description = form.querySelector('#project-notes').value;
  
  // Replace form with new project header
  form.replaceWith(createProjectHeader(project));
}


function toggleTaskForm() {
  const taskFormWrapper = document.getElementById('task-form-wrapper');
  if (taskFormWrapper.classList.contains('show-form')) {
    taskFormWrapper.classList.remove('show-form');
  } else {
    taskFormWrapper.classList.add('show-form');
    focusAtEnd(taskFormWrapper.querySelector('.task-title'));
  }
}


function createTaskLi(task, project) {
  const li = createElemAttr('li', {role: 'button', 'aria-expanded': 'false', tabindex: '0'});
  if (task.complete) li.classList.add('checked');
  if (task.priority) li.classList.add('priority');

  const taskMain = createElemAttr('div', {class: 'task-main'});
  li.appendChild(taskMain);

  const btnCheck = createElemAttr('button', {type: 'button', 'aria-label': 'complete-task', class: 'btn-check'});
  btnCheck.appendChild(createElemAttr('i', {class: 'fas fa-check'}));
  taskMain.appendChild(btnCheck);  

  const taskTitle = document.createElement('span');
  taskTitle.textContent = task.title;
  taskMain.appendChild(taskTitle);

  const dateSpan = createElemAttr('span', {class: 'due-date'});
  taskMain.appendChild(dateSpan);

  displayDate(task, dateSpan);

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

  initFlatpickr(datePicker, task, dateSpan);

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

  btnCheck.addEventListener('click', function(e) {handleCheck(e, li, task, project)});

  btnCalendar.addEventListener('click', (e) => e.stopPropagation());

  btnPriority.addEventListener('click', function(e) {handlePriority(e, task, this, li)});

  btnEdit.addEventListener('click', function(e) {handleEdit(e, task, project, li)});

  btnDelete.addEventListener('click', (e) => {
    e.stopPropagation();
    showConfirmation(task, project, li)
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
  focusAtEnd(li.querySelector('.task-title'));
}


function showConfirmation(task, project, li) {
  const confWrapper = createElemAttr('div', {id: 'conf-wrapper', 'data-click': 'cancel'});
  
  const confDelete = createElemAttr('div', {id: 'conf-delete'});
  confWrapper.appendChild(confDelete);

  const p = document.createElement('p');
  confDelete.appendChild(p);

  const text1 = document.createTextNode('Are you sure you want to delete task ');
  p.appendChild(text1);
  const span = createElemAttr('span', {class: 'title-span'});
  span.textContent = `"${task.title}"`;
  p.appendChild(span);
  const text2 = document.createTextNode('?');
  p.appendChild(text2);

  const btnWrapper = createElemAttr('div', {class: 'btn-conf-wrapper'});
  confDelete.appendChild(btnWrapper);

  const btnDelete = createElemAttr('button', {type: 'button', class: 'btn-form btn-delete', 'data-click': 'delete'});
  btnDelete.textContent = 'Delete';
  btnWrapper.appendChild(btnDelete);

  const btnCancel = createElemAttr('button', {type: 'button', class: 'btn-form btn-cancel', 'data-click': 'cancel'});
  btnCancel.textContent = 'Cancel';
  btnWrapper.appendChild(btnCancel);

  // Add event listeners to buttons
  confWrapper.addEventListener('click', (e) => handleClick(e, confWrapper, task, project));

  li.appendChild(confWrapper);
}


function handleClick(e, confWrapper, task, project) {
  e.stopPropagation();
  if (e.target.dataset.click == 'delete') {
    handleDeleteTask(task, project, confWrapper.parentNode);
  }
  else if (e.target.dataset.click) confWrapper.remove();
}


function handleDeleteTask(task, project, li) {
  project.deleteTask(task);
  recalcTaskNumber(project);
  setProgressDisplay(project);
  li.remove();
}


export { createProjectPage, createTaskLi, setProgressDisplay, toggleTaskForm, handleDeleteTask };