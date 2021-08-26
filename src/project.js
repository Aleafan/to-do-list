import { createTaskForm, toggleTaskForm } from './taskForm.js';
import { createTaskLi } from './taskListItem.js';
import { highlightActiveTab, recalcTaskNumber } from './navMenu.js';
import { loadContent } from "./domChange.js";
import { createElemAttr, focusAtEnd, setProgressDisplay } from './helpers.js';
import { projects } from "./data.js";
import { createTodayPage } from './today.js';

function createProjectPage(project) {
  const main = document.createElement('main');

  main.appendChild(createProjectHeader(project));

  const progress = createElemAttr('progress', {max: '100'});
  setProgressDisplay(project, progress);
  main.appendChild(progress);  

  const taskList = createElemAttr('ul', {class: 'task-list'});
  main.appendChild(taskList);

  project.tasks.forEach(task => taskList.appendChild(createTaskLi(task, project, 'project')));

  const taskFormWrapper = createElemAttr('div', {id: 'task-form-wrapper'});
  main.appendChild(taskFormWrapper);

  taskFormWrapper.appendChild(createTaskForm('project', project));

  const btnAddTask = createElemAttr('button', {type: 'button', class: 'btn-menu btn-add'});
  btnAddTask.textContent = ' New task';
  taskFormWrapper.appendChild(btnAddTask);

  const formOverlay = createElemAttr('div', {class: 'form-overlay'});
  main.appendChild(formOverlay);

  // Add event listeners
  btnAddTask.addEventListener('click', toggleTaskForm);  

  formOverlay.addEventListener('click', handleClickOverlay);

  return main;
}

function handleClickOverlay(e) {
  if (e.target === this) {
    document.querySelector('.edit-mode .btn-cancel').click();
    this.classList.remove('show');
  }
}

function createProjectHeader(project) {
  const header = createElemAttr('header', {id: 'project-info'});

  const flexWrapper = createElemAttr('div', {class: 'flex-wrapper'});

  const h3 = document.createElement('h3');
  if (project.id === 'inbox') {
    h3.append(createElemAttr('i', { class: 'fas fa-inbox' }), project.title);
  } else {
    h3.textContent = project.title;
  }

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

  if (project.id !== 'inbox') {
    const liEdit = document.createElement('li');
    projOptions.appendChild(liEdit);

    const btnEdit = createElemAttr('button', {type: 'button', class: 'btn-proj-option'});
    btnEdit.append(createElemAttr('i', {class: 'fas fa-edit'}), 'Edit project');
    liEdit.appendChild(btnEdit);

    btnEdit.addEventListener('click', () => handleProjectEdit(project));
  }

  const liDelComplete = document.createElement('li');
  projOptions.appendChild(liDelComplete);

  const btnDelComplete = createElemAttr('button', {type: 'button', class: 'btn-proj-option'});
  btnDelComplete.append(createElemAttr('i', {class: 'fas fa-calendar-check'}), 'Delete completed tasks');
  liDelComplete.appendChild(btnDelComplete);

  if (project.id !== 'inbox') {
    const liDelete = document.createElement('li');
    projOptions.appendChild(liDelete);

    const btnDelete = createElemAttr('button', {type: 'button', class: 'btn-proj-option'});
    btnDelete.append(createElemAttr('i', {class: 'far fa-trash-alt'}), 'Delete project');
    liDelete.appendChild(btnDelete);

    btnDelete.addEventListener('click', () => handleDelProject(project));
  }

  document.body.appendChild(popupWrapper);

  setPopupPosition(btnOptions, projOptions);

  // Add event listeners
  window.addEventListener('resize', () => setPopupPosition(btnOptions, projOptions));

  popupWrapper.addEventListener('click', () => popupWrapper.remove());

  btnDelComplete.addEventListener('click', () => handleDelComplete(project));
}

function handleDelProject(project) {
  // Create and append confirmation window
  const conf = createConfirmation('Are you sure you want to delete project', project.title);
  document.querySelector('main').appendChild(conf);

  // Handle user's choice
  conf.addEventListener('click', (e) => {
    e.stopPropagation();

    if (e.target.dataset.click == 'delete') {
      projects.deleteProject(project);

      // Remove project's button from nav menu
      document.querySelectorAll('#nav-projects li').forEach(li => {
        if (li.id === project.id) li.remove();
      });

      recalcTaskNumber(projects.findTodayTasks());
      loadContent(createTodayPage);
      highlightActiveTab(document.querySelector('#today .btn-menu'));
    }
    else if (e.target.dataset.click) conf.remove();
  })
}

function handleDelComplete(project) {
  // Create and append confirmation window
  const conf = createConfirmation('Are you sure you want to delete', 'completed tasks');
  document.querySelector('main').appendChild(conf);

  // Handle user's choice
  conf.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target.dataset.click == 'delete') {
      project.deleteCompleted();
      loadContent(createProjectPage.bind(null, project));
      recalcTaskNumber(project);
    }
    else if (e.target.dataset.click) conf.remove();
  });
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
  const form = createElemAttr('form', {id: 'edit-project', class: 'edit-mode'});
  
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

  // Show form overlay
  document.querySelector('.form-overlay').classList.add('show');

  // Add event listeners
  form.addEventListener('submit', (e) => handleSubmit(e, form, project));

  btnCancel.addEventListener('click', () => handleCancel(form, oldHeader));
}

function handleSubmit(e, form, project) {
  e.preventDefault();
  
  // Edit project object information
  project.title = form.querySelector('#project-title').value;
  project.description = form.querySelector('#project-notes').value;
  
  // Hide form overlay
  document.querySelector('.form-overlay').classList.remove('show');

  // Change project title in nav menu
  document.querySelector(`#nav-menu #${project.id} .span-title`).textContent = project.title;

  // Replace form with new project header
  form.replaceWith(createProjectHeader(project));
}

function handleCancel(form, oldHeader) {
  form.replaceWith(oldHeader);
  document.querySelector('.form-overlay').classList.remove('show');
}

function createConfirmation(text, title) {
  const confWrapper = createElemAttr('div', {id: 'conf-wrapper', 'data-click': 'cancel'});
  
  const confDelete = createElemAttr('div', {id: 'conf-delete'});

  confWrapper.appendChild(confDelete);

  const p = document.createElement('p');
  const span = createElemAttr('span', {class: 'title-span'});
  span.textContent = title;

  p.append(text, ' ', span, ' ?');

  const btnWrapper = createElemAttr('div', {class: 'btn-conf-wrapper'});

  confDelete.append(p, btnWrapper);

  const btnDelete = createElemAttr('button', {type: 'button', class: 'btn-form btn-delete', 'data-click': 'delete'});
  btnDelete.textContent = 'Delete';
  const btnCancel = createElemAttr('button', {type: 'button', class: 'btn-form btn-cancel', 'data-click': 'cancel'});
  btnCancel.textContent = 'Cancel';

  btnWrapper.append(btnDelete, btnCancel);

  return confWrapper;
}

export { createProjectPage, setProgressDisplay, toggleTaskForm, createConfirmation, handleClickOverlay };