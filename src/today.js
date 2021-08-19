import { projects } from "./data.js";
import { createTaskForm, toggleTaskForm } from './taskForm.js';
import { createElemAttr, getToday, setProgressDisplay } from './helpers.js';
import { handleClickOverlay } from './project.js';
import { createTaskLi } from './taskListItem.js';

function createTodayPage() {
  const todayProject = projects.findTodayTasks();

  const main = document.createElement('main');

  const header = createElemAttr('header', { id: 'header-today' });

  const h3 = document.createElement('h3');
  h3.textContent = 'Today';
  const p = document.createElement('p');
  p.textContent = getToday();

  header.append(h3, p);

  main.appendChild(header);

  const progress = createElemAttr('progress', {max: '100'});
  setProgressDisplay(todayProject, progress);
  main.appendChild(progress); 

  const taskList = createElemAttr('ul', { class: 'task-list' });
  main.appendChild(taskList);

  todayProject.tasks.forEach(elem => {
    const project = projects.list.find((project) => project.id === elem.id);
    taskList.appendChild(createTaskLi(elem.task, project, 'today'));
  });

  const taskFormWrapper = createElemAttr('div', { id: 'task-form-wrapper' });
  main.appendChild(taskFormWrapper);

  taskFormWrapper.appendChild(createTaskForm('today'));

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

export { createTodayPage };