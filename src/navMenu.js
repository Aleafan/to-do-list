import { projects, createProject } from './data.js';
import { createProjectPage } from './project.js';
import { loadContent } from './domChange.js';
import { createElemAttr } from './helpers.js';
import { createTodayPage } from './today.js';

const timeline = ['This week', 'All tasks'];

function createNavMenu() {
  const navWrapper = createElemAttr('div', {id: 'nav-wrapper'});

  const navMenu = createElemAttr('section', {id: 'nav-menu'});
  navWrapper.appendChild(navMenu);

  const navTimeline = createElemAttr('ul', {id: 'nav-timeline'});
  navMenu.appendChild(navTimeline);

  const li = createElemAttr('li', { id: 'today' });
  navTimeline.appendChild(li);

  const btnToday = createElemAttr('button', {class: 'btn-menu btn-flex', type: 'button'});
  li.appendChild(btnToday);

  const span1 = document.createElement('span');
  span1.textContent = 'Today';

  const span2 = createElemAttr('span', { class: 'task-number' });
  span2.textContent = projects.findTodayTasks().calcActiveTasks();

  btnToday.append(span1, span2);

  timeline.forEach(time => {
    const li = document.createElement('li');
    navTimeline.appendChild(li);

    const button = createElemAttr('button', {class: 'btn-menu btn-flex', type: 'button'});
    li.appendChild(button);

    const span1 = document.createElement('span');
    span1.textContent = time;

    const span2 = document.createElement('span');
    span2.textContent = '5';

    button.append(span1, span2);
  });

  const navProjects = createElemAttr('ul', {id: 'nav-projects'});
  navMenu.appendChild(navProjects);

  const h2 = document.createElement('h2');
  h2.textContent = 'Projects';
  navProjects.appendChild(h2);

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

  btnToday.addEventListener('click', () => loadContent(createTodayPage()));

  return navWrapper;
}

function createProjectButton(project, domParent) {
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
  
  button.addEventListener('click', () => loadContent(createProjectPage(project)));
}

function handleSubmit(e) {
  e.preventDefault();
  const title = this.querySelector('.project-title').value;
  const newProject = createProject(title);
  projects.addProject(newProject);
  loadContent(createProjectPage(newProject));
  toggleProjectForm();
  createProjectButton(newProject, document.getElementById('nav-projects'));
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

export { createNavMenu, toggleNav, recalcTaskNumber };