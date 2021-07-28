import { projects } from './data.js';
import { createProjectPage } from './project.js';
import { loadContent } from './domChange.js';
import { setAttributes } from './helpers.js';

const timeline = ['Today', 'This week', 'All tasks'];

function createNavMenu() {
  const navWrapper = document.createElement('div');
  navWrapper.setAttribute('id', 'nav-wrapper');

  const navMenu = document.createElement('section');
  navMenu.setAttribute('id', 'nav-menu');
  navWrapper.appendChild(navMenu);

  const navTimeline = document.createElement('ul');
  navTimeline.setAttribute('id', 'nav-timeline');
  navMenu.appendChild(navTimeline);

  timeline.forEach(time => {
    const li = document.createElement('li');
    navTimeline.appendChild(li);

    const button = document.createElement('button');
    setAttributes(button, {'class': 'btn-menu btn-flex', 'type': 'button'});
    li.appendChild(button);

    const span1 = document.createElement('span');
    span1.textContent = time;
    button.appendChild(span1);

    const span2 = document.createElement('span');
    span2.textContent = '5';
    button.appendChild(span2);
  });

  const navProjects = document.createElement('ul');
  navProjects.setAttribute('id', 'nav-projects');
  navMenu.appendChild(navProjects);

  const h2 = document.createElement('h2');
  h2.textContent = 'Projects';
  navProjects.appendChild(h2);

  projects.forEach(project => {
    const li = document.createElement('li');
    li.setAttribute('id', project.id);
    navProjects.appendChild(li);

    const button = document.createElement('button');
    setAttributes(button, {'class': 'btn-menu btn-flex', 'type': 'button'});
    li.appendChild(button);

    const spanTitle = document.createElement('span');
    spanTitle.textContent = project.title;
    button.appendChild(spanTitle);

    const spanNumber = document.createElement('span');
    spanNumber.classList.add('task-number')
    spanNumber.textContent = project.tasks.length;
    button.appendChild(spanNumber);
    
    button.addEventListener('click', () => loadContent(createProjectPage(project)))
  });
  
  const btnAdd = document.createElement('button');
  setAttributes(btnAdd, {'class': 'btn-menu btn-add', 'type': 'button'});
  btnAdd.textContent = ' Add project';
  navMenu.appendChild(btnAdd);

  return navWrapper;
}

function toggleNav() {
  document.body.classList.toggle('nav-positioner');
}

function recalcTaskNumber(project) {
  const navProjects = document.getElementById('nav-projects');
  const spanNumber = navProjects.querySelector(`#${project.id} .task-number`);
  spanNumber.textContent = project.tasks.length;
}

export { createNavMenu, toggleNav, recalcTaskNumber };