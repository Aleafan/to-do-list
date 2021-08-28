import { loadContent, createElemAttr, highlightActiveTab, recalcTaskNumber } from './domFunctions';
import { projects, createProject } from './data';
import createTodayPage from './today';
import createUpcomingPage from './upcoming';
import createProjectPage from './project';

function createNavMenu() {
  const navWrapper = createElemAttr('div', { id: 'nav-wrapper' });

  const navMenu = createElemAttr('section', { id: 'nav-menu' });
  navWrapper.appendChild(navMenu);

  const navStandard = createElemAttr('ul', { id: 'nav-standard-items' });
  navMenu.appendChild(navStandard);

  // Create "Inbox" menu button
  const inboxProject = projects.list.find(project => project.id === 'inbox');

  const liInbox = createElemAttr('li', { id: 'inbox' });
  navStandard.appendChild(liInbox);

  const btnInbox = createElemAttr('button', { class: 'btn-menu btn-flex', type: 'button' });
  liInbox.appendChild(btnInbox);

  const spanTitle = createElemAttr('span', { class: 'span-title' });
  spanTitle.textContent = 'Inbox';

  const spanNumber = createElemAttr('span', { class: 'task-number' });
  spanNumber.textContent = inboxProject.calcActiveTasks();

  btnInbox.append(createElemAttr('i', { class: 'fas fa-inbox' }), spanTitle, spanNumber);

  // Create "Today" menu button
  const liToday = createElemAttr('li', { id: 'today' });
  navStandard.appendChild(liToday);

  const btnToday = createElemAttr('button', {
    class: 'btn-menu btn-flex active-tab',
    type: 'button',
  });
  liToday.appendChild(btnToday);

  const span1 = document.createElement('span');
  span1.textContent = 'Today';

  const span2 = createElemAttr('span', { class: 'task-number' });
  span2.textContent = projects.findTodayTasks().calcActiveTasks();

  btnToday.append(createElemAttr('i', { class: 'fas fa-calendar-day' }), span1, span2);

  // Create "Upcoming" menu button
  const liUpcoming = createElemAttr('li', { id: 'upcoming' });
  navStandard.appendChild(liUpcoming);

  const btnUpcoming = createElemAttr('button', { class: 'btn-menu btn-flex', type: 'button' });
  btnUpcoming.append(createElemAttr('i', { class: 'fas fa-calendar-alt' }), 'Upcoming');
  liUpcoming.appendChild(btnUpcoming);

  // Create "Projects" section
  const h2 = document.createElement('h2');
  h2.textContent = 'Projects';
  navMenu.appendChild(h2);

  const navProjects = createElemAttr('ul', { id: 'nav-projects' });
  navMenu.appendChild(navProjects);

  projects.list.forEach(project => createProjectButton(project, navProjects));

  // Create form for adding new project
  const projectFormWrapper = createElemAttr('div', { id: 'project-form-wrapper' });
  navMenu.appendChild(projectFormWrapper);

  const form = createElemAttr('form', { id: 'project-form' });
  projectFormWrapper.appendChild(form);

  const labelTitle = createElemAttr('label', { for: 'project-title' });

  const labelTitleText = createElemAttr('span', { class: 'visuallyhidden' });
  labelTitleText.textContent = 'Project name';

  labelTitle.append(createElemAttr('i', { class: 'fas fa-square project-icon' }), labelTitleText);

  const inputTitle = createElemAttr('input', {
    type: 'text',
    class: 'project-title',
    placeholder: 'Project name',
    required: '',
  });

  const btnSubmit = createElemAttr('button', {
    type: 'submit',
    class: 'task-option',
    'aria-label': 'add-new-project',
  });
  btnSubmit.appendChild(createElemAttr('i', { class: 'fas fa-plus' }));

  form.append(labelTitle, inputTitle, btnSubmit);

  const btnAdd = createElemAttr('button', { class: 'btn-menu btn-add', type: 'button' });
  btnAdd.textContent = ' Add project';
  projectFormWrapper.appendChild(btnAdd);

  // Add event listeners
  btnAdd.addEventListener('click', toggleProjectForm);

  form.addEventListener('submit', handleSubmit);

  btnToday.addEventListener('click', () => {
    highlightActiveTab(btnToday);
    loadContent(createTodayPage);
  });

  btnUpcoming.addEventListener('click', () => {
    highlightActiveTab(btnUpcoming);
    loadContent(createUpcomingPage);
  });

  btnInbox.addEventListener('click', () => {
    highlightActiveTab(btnInbox);
    loadContent(createProjectPage.bind(null, inboxProject));
  });

  navWrapper.addEventListener('click', handleClickNavWrapper);

  return navWrapper;
}

function createProjectButton(project, domParent) {
  if (project.id === 'inbox') return;

  const li = createElemAttr('li', { id: project.id });
  domParent.appendChild(li);

  const button = createElemAttr('button', { class: 'btn-menu btn-flex', type: 'button' });
  button.appendChild(createElemAttr('i', { class: 'fas fa-square project-icon' }));
  li.appendChild(button);

  const spanTitle = createElemAttr('span', { class: 'span-title' });
  spanTitle.textContent = project.title;
  const spanNumber = createElemAttr('span', { class: 'task-number' });
  spanNumber.textContent = project.calcActiveTasks();

  button.append(spanTitle, spanNumber);

  button.addEventListener('click', () => {
    highlightActiveTab(button);
    loadContent(createProjectPage.bind(null, project));
  });
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
  const formWrapper = document.getElementById('project-form-wrapper');
  if (formWrapper.classList.contains('show-form')) {
    formWrapper.classList.remove('show-form');
    formWrapper.querySelector('form').reset();
  } else {
    formWrapper.classList.add('show-form');
    formWrapper.querySelector('.project-title').focus();
  }
}

function handleClickNavWrapper(e) {
  if (e.target === this) toggleNav();
}

export { createNavMenu, toggleNav, recalcTaskNumber };
