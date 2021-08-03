import { projects, createTask } from './data.js';
import { recalcTaskNumber } from './navMenu.js';
import { createTaskLi, setProgressDisplay, toggleTaskForm } from './project.js';
import { createElemAttr, formatDate } from './helpers.js';
import flatpickr from "flatpickr";


function createTaskForm(project, task) {
  const taskFormId = task ? 'edit-task-form' : 'new-task-form';
  const taskForm = createElemAttr('form', {id: taskFormId});

  const flexWrapper = createElemAttr('div', {class: 'flex-wrapper'});
  taskForm.appendChild(flexWrapper);

  // Create title input
  const inputTitleId = task ? 'edit-title' : 'new-title';
  const inputTitleValue = task ? task.title : '';
  
  const labelTitle = createElemAttr('label', {for: inputTitleId, class: 'visuallyhidden'});
  labelTitle.textContent = 'Task name';
  flexWrapper.appendChild(labelTitle);

  const inputTitle = createElemAttr('input', 
      {type: 'text', id: inputTitleId, class: 'task-title', required: '', value: inputTitleValue, placeholder: 'Task name'});
  flexWrapper.appendChild(inputTitle);

  // Create priority button
  const priorityValue = task && task.priority ? '1' : '';
  const btnPriority = createElemAttr('button', 
      {type: 'button', value: priorityValue, 'aria-label': 'set-priority', class: 'task-option'});
  if (priorityValue) btnPriority.classList.add('active');
  btnPriority.appendChild(createElemAttr('i', {class: 'fas fa-flag'}));
  flexWrapper.appendChild(btnPriority);
    
  // Create notes input
  const inputNotesId = task ? 'edit-notes' : 'new-notes';
  const inputNotesValue = task ? task.notes : '';

  const labelNotes = createElemAttr('label', {for: inputNotesId, class: 'visuallyhidden'});
  labelNotes.textContent = 'Task notes';
  taskForm.appendChild(labelNotes);

  const inputNotes = createElemAttr('textarea', {class: 'task-notes', id: inputNotesId, placeholder: 'Notes', rows: '2'});
  inputNotes.textContent = inputNotesValue;
  taskForm.appendChild(inputNotes);

  // Create form options
  const formOptions = createElemAttr('div', {class: 'form-options'});
  taskForm.appendChild(formOptions);

  // - Create date picker
  const datePicker = createElemAttr('div', {class: 'flatpickr'});
  formOptions.appendChild(datePicker);

  const btnCalendar = createElemAttr('button', 
      {type: 'button', title: 'toggle', 'data-toggle': '', 'aria-label': 'toggle-calendar', class: 'input-button'});
  btnCalendar.appendChild(createElemAttr('i', {class: 'far fa-calendar-alt'}));
  datePicker.appendChild(btnCalendar);

  const inputDateId = task ? 'edit-date' : 'new-date';
  const labelDate = createElemAttr('label', {for: inputDateId, class: 'visuallyhidden'});
  labelDate.textContent = 'When';
  datePicker.appendChild(labelDate);

  const inputDate = createElemAttr('input', {type: 'text', placeholder: 'When', 'data-input': ''});
  datePicker.appendChild(inputDate);
  
  const btnClearDate = createElemAttr('button', 
      {type: 'button', title: 'clear', 'data-clear': '', 'aria-label': 'clear-date', class: 'input-button'});
  btnClearDate.appendChild(createElemAttr('i', {class: 'fas fa-times'}));
  datePicker.appendChild(btnClearDate);  

  // - Initialize flatpickr instance
  const initialDate = task ? task.dueDate : null;
  initFlatpickr(datePicker, inputDateId, initialDate);

  // - Create project selection menu
  const taskProjectWrapper = createElemAttr('div', {class: 'task-project-wrapper'});
  formOptions.appendChild(taskProjectWrapper);

  const selectProjectId = task ? 'edit-task-project' : 'new-task-project';
  const labelProject = createElemAttr('label', {for: selectProjectId, class: 'visuallyhidden'});
  labelProject.textContent = 'Select a project';
  taskProjectWrapper.appendChild(labelProject);

  const selectProject = createElemAttr('select', {class: 'task-project', id: selectProjectId});
  taskProjectWrapper.appendChild(selectProject);

  projects.forEach(proj => {
    const option = createElemAttr('option', {'value': proj.id});
    option.textContent = proj.title;
    if (project.id === proj.id) option.setAttribute('selected', '');
    selectProject.appendChild(option);
  });

  // Create form control buttons
  const btnFormWrapper = createElemAttr('div', {class: 'btn-form-wrapper'});
  taskForm.appendChild(btnFormWrapper);

  const btnSubmit = createElemAttr('button', {'type': 'submit', 'class': 'btn-form btn-submit'});
  btnSubmit.textContent = 'Save';
  btnFormWrapper.appendChild(btnSubmit);

  const btnCancel = createElemAttr('button', {'type': 'button', 'class': 'btn-form btn-cancel'});
  btnCancel.textContent = 'Cancel';
  btnFormWrapper.appendChild(btnCancel);

  // Add event listeners
  inputTitle.addEventListener('focus', focusAtEnd);

  btnPriority.addEventListener('click', togglePriorityFlag);

  btnCancel.addEventListener('click', () => cancelTask(taskForm));

  taskForm.addEventListener('submit', (e) => { 
    e.preventDefault();
    if (task) editTask(taskForm, task, project);
    else createNewTask(taskForm, project);
  });

  return taskForm;
}


function focusAtEnd() {
  const value = this.value;
  this.value = '';
  this.value = value;
}


function initFlatpickr(element, id, initialDate) {
  flatpickr(element, { 
    disableMobile: "true",
    altInput: true,
    altFormat: "M j Y",
    dateFormat: "M j Y",
    defaultDate: initialDate,
    wrap: true,
    onReady: (a, b, fp) => {
        fp.altInput.setAttribute('id', id);
      },
    onChange: (selDates, dateStr, fp) => {
        fp.altInput.value = formatDate(dateStr).date;
      },
  });
}


function togglePriorityFlag() {
  if (this.value) {
    this.value = '';
    this.classList.remove('active');
  } else {
    this.value = '1';
    this.classList.add('active');
  }
}


function cancelTask(form) {
  toggleTaskForm();
  const btnPriority = form.querySelector('.task-option');
  if (btnPriority.value) togglePriorityFlag.apply(btnPriority);
  form.reset();
}


function createNewTask(form, project) {
  const title = form.querySelector('.task-title').value;
  const notes = form.querySelector('.task-notes').value;
  const dueDate = form.querySelector('.flatpickr-input').value;
  const btnPriority = form.querySelector('.task-option');
  const priority = btnPriority.value;

  const newProjectId = form.querySelector('.task-project').value;
  const newProject = projects.find(currProject => currProject.id === newProjectId);

  const task = createTask(title, notes, dueDate, priority);

  newProject.addTask(task);
  
  if (newProjectId === project.id) {
    const taskList = document.querySelector('.task-list');
    taskList.appendChild(createTaskLi(task, project));
    setProgressDisplay(project);
  }
  recalcTaskNumber(newProject);
  toggleTaskForm();
  if (priority) togglePriorityFlag.apply(btnPriority);
  form.reset();
}


function editTask(form, task, project) {
  task.title = form.querySelector('.task-title').value;
  task.notes = form.querySelector('.task-notes').value;
  task.dueDate = form.querySelector('.flatpickr-input').value;
  task.priority = form.querySelector('.task-option').value ? true : false;

  const newProjectId = form.querySelector('.task-project').value;
  const newProject = projects.find(currProject => currProject.id === newProjectId);

  if (newProjectId === project.id) {
    form.parentNode.replaceWith(createTaskLi(task, project));
  } 
  else {
    project.tasks.splice(project.tasks.indexOf(task), 1);
    newProject.addTask(task);
    recalcTaskNumber(project);
    recalcTaskNumber(newProject);
    form.parentNode.remove();
    setProgressDisplay(project);
  }
}


export { createTaskForm };