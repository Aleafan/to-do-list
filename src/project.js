import { countProgress } from './helpers.js';

function createProjectPage(project) {
  const main = document.createElement('main');

  const header = document.createElement('header');
  main.appendChild(header);

  const h2 = document.createElement('h2');
  h2.textContent = project.title;
  header.appendChild(h2);

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

  project.tasks.forEach(task => {
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
      date.textContent = task.dueDate;
      li.appendChild(date);
    }
  });

  const btnAddTask = document.createElement('button');
  btnAddTask.setAttribute('type', 'button');
  btnAddTask.classList.add('btn-menu', 'btn-add');
  main.appendChild(btnAddTask);

  const iconPlus = document.createElement('i');
  iconPlus.classList.add('fas', 'fa-plus');
  btnAddTask.appendChild(iconPlus);

  const label = document.createTextNode('Add task');
  btnAddTask.appendChild(label);

  // const template = document.querySelector('.project-page');
  // let main = template.content.cloneNode(true);

  return main;
}

export { createProjectPage };