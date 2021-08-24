import { projects, createProject } from './data.js';
import { createProjectPage } from './project.js';
import { loadContent } from './domChange.js';
import { createElemAttr } from './helpers.js';
import { createTodayPage } from './today.js';
import { createUpcomingPage } from './upcoming.js';

function createNavMenu() {
  const navWrapper = createElemAttr('div', {id: 'nav-wrapper'});

  const navMenu = createElemAttr('section', {id: 'nav-menu'});
  navWrapper.appendChild(navMenu);

  const navStandard = createElemAttr('ul', {id: 'nav-standard-items'});
  navMenu.appendChild(navStandard);

  // Create "Inbox" menu button
  const inboxProject = projects.list.find(project => project.id === 'inbox');

  const liInbox = createElemAttr('li', { id: 'inbox' });
  navStandard.appendChild(liInbox);

  const btnInbox = createElemAttr('button', {class: 'btn-menu btn-flex', type: 'button'});
  liInbox.appendChild(btnInbox);

  const spanTitle = createElemAttr('span', {class: 'span-title'});
  spanTitle.textContent = 'Inbox';

  const spanNumber = createElemAttr('span', {class: 'task-number'});
  spanNumber.textContent = inboxProject.calcActiveTasks();

  btnInbox.append(createElemAttr('i', { class: 'fas fa-inbox' }), spanTitle, spanNumber);
  
  // Create "Today" menu button
  const liToday = createElemAttr('li', { id: 'today' });
  navStandard.appendChild(liToday);

  const btnToday = createElemAttr('button', {class: 'btn-menu btn-flex active-tab', type: 'button'});
  liToday.appendChild(btnToday);

  const span1 = document.createElement('span');
  span1.textContent = 'Today';

  const span2 = createElemAttr('span', { class: 'task-number' });
  span2.textContent = projects.findTodayTasks().calcActiveTasks();

  btnToday.append(createElemAttr('i', { class: 'fas fa-calendar-day' }),span1, span2);

  // Create "Upcoming" menu button
  const liUpcoming = createElemAttr('li', { id: 'upcoming' });
  navStandard.appendChild(liUpcoming);

  const btnUpcoming = createElemAttr('button', {class: 'btn-menu btn-flex', type: 'button'});
  btnUpcoming.append(createElemAttr('i', { class: 'fas fa-calendar-alt' }), 'Upcoming');
  liUpcoming.appendChild(btnUpcoming);

  // Create "Projects" section
  const h2 = document.createElement('h2');
  h2.append( 'Projects');
  navMenu.appendChild(h2);

  const navProjects = createElemAttr('ul', {id: 'nav-projects'});
  navMenu.appendChild(navProjects);

  projects.list.forEach(project => createProjectButton(project, navProjects));

  // Create form for adding new project
  const projectFormWrapper = createElemAttr('div', {id: 'project-form-wrapper'});
  navMenu.appendChild(projectFormWrapper);

  const form = createElemAttr('form', {id: 'project-form'});
  projectFormWrapper.appendChild(form);

  const labelTitle = createElemAttr('label', {for: 'project-title'});
  labelTitle.appendChild(createElemAttr('i', {class: 'fas fa-square project-icon'}));
  const labelTitleText = createElemAttr('span', {class: 'visuallyhidden'});
  labelTitleText.textContent = 'Project name';
  labelTitle.appendChild(labelTitleText);

  form.appendChild(labelTitle);

  const inputTitle = createElemAttr('input', {type: 'text', class: 'project-title', placeholder: 'Project name', 
      required: ''});
  form.appendChild(inputTitle);

  const btnSubmit = createElemAttr('button', {type: 'submit', class: 'task-option', 'aria-label': 'add-new-project'});
  btnSubmit.appendChild(createElemAttr('i', {class: 'fas fa-plus'}));
  form.appendChild(btnSubmit);
  
  const btnAdd = createElemAttr('button', {class: 'btn-menu btn-add', type: 'button'});
  btnAdd.textContent = ' Add project';
  projectFormWrapper.appendChild(btnAdd);

  // Add event listeners
  btnAdd.addEventListener('click', toggleProjectForm);

  form.addEventListener('submit', handleSubmit);

  btnToday.addEventListener('click', function() {
    highlightActiveTab(this);
    loadContent(createTodayPage);
  });

  btnUpcoming.addEventListener('click', function() {
    highlightActiveTab(this);
    loadContent(createUpcomingPage);
  });

  btnInbox.addEventListener('click', function() {
    highlightActiveTab(this);
    loadContent(createProjectPage.bind(null, inboxProject));
  });

  return navWrapper;
}

function createProjectButton(project, domParent) {
  if (project.id === 'inbox') return;

  const li = createElemAttr('li', {id: project.id});
  domParent.appendChild(li);

  const button = createElemAttr('button', {class: 'btn-menu btn-flex', type: 'button'});
  button.appendChild(createElemAttr('i', {class: 'fas fa-square project-icon'}));
  li.appendChild(button);

  const spanTitle = createElemAttr('span', {class: 'span-title'});
  spanTitle.textContent = project.title;
  button.appendChild(spanTitle);

  const spanNumber = createElemAttr('span', {class: 'task-number'});
  spanNumber.textContent = project.calcActiveTasks();
  button.appendChild(spanNumber);
  
  button.addEventListener('click', function() {
    highlightActiveTab(this);
    loadContent(createProjectPage.bind(null, project));
  });
}

function highlightActiveTab(button) {
  const currTab = document.querySelector('.active-tab');
  if (currTab) currTab.classList.remove('active-tab');

  button.classList.add('active-tab');
}

function handleSubmit(e) {
  e.preventDefault();
  const title = this.querySelector('.project-title').value;
  const newProject = createProject(title);
  projects.addProject(newProject);
  loadContent(createProjectPage.bind(null, newProject));
  toggleProjectForm();
  createProjectButton(newProject, document.getElementById('nav-projects'));
  highlightActiveTab(document.querySelector(`#${newProject.id} .btn-menu`));
}

function toggleNav() {
  document.body.classList.toggle('nav-positioner');
}

function toggleProjectForm() {
  const projectFormWrapper = document.getElementById('project-form-wrapper');
  if (projectFormWrapper.classList.contains('show-form')) {
    projectFormWrapper.classList.remove('show-form');
    projectFormWrapper.querySelector('form').reset();
  } else {
    projectFormWrapper.classList.add('show-form');
    projectFormWrapper.querySelector('.project-title').focus();
  }
}

function recalcTaskNumber(project) {
  const navMenu = document.getElementById('nav-menu');
  const spanNumber = navMenu.querySelector(`#${project.id} .task-number`);
  spanNumber.textContent = project.calcActiveTasks();
}

export { createNavMenu, toggleNav, recalcTaskNumber, highlightActiveTab };