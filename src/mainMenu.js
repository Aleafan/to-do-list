import { projects } from './index.js';

const timeline = ['Today', 'This week', 'All tasks'];

function createMenu() {
  const menu = document.createElement('div');

  const header = document.createElement('header');
  menu.appendChild(header);

  const h1 = document.createElement('h1');
  h1.textContent = 'To Do List';
  header.appendChild(h1);

  const main = document.createElement('main');
  menu.appendChild(main);

  const navMenu = document.createElement('div');
  navMenu.setAttribute('id', 'nav-menu');
  main.appendChild(navMenu);

  const navTimeline = document.createElement('ul');
  navTimeline.setAttribute('id', 'nav-timeline');
  navMenu.appendChild(navTimeline);

  timeline.forEach(time => {
    const li = document.createElement('li');
    navTimeline.appendChild(li);

    const button = document.createElement('button');
    button.classList.add('btn-menu', 'btn-flex');
    button.setAttribute('type', 'button');
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
    navProjects.appendChild(li);

    const button = document.createElement('button');
    button.classList.add('btn-menu', 'btn-flex');
    button.setAttribute('type', 'button');
    li.appendChild(button);

    const spanTitle = document.createElement('span');
    spanTitle.textContent = project.title;
    button.appendChild(spanTitle);

    const spanNumber = document.createElement('span');
    spanNumber.textContent = project.tasks.length;
    button.appendChild(spanNumber);  
  });

  return menu;
}

export { createMenu };