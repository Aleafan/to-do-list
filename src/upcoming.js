import { projects } from "./data";
import { createElemAttr, formatDateUpcoming } from "./helpers";
import { createTaskLi } from './taskListItem.js';
import { createTaskForm, toggleTaskForm } from './taskForm.js';
import { handleClickOverlay } from './project.js';

function createUpcomingPage() {
  const main = document.createElement('main');

  const header = createElemAttr('header', { id: 'header-upcoming' });
  main.appendChild(header);

  const h3 = document.createElement('h3');
  h3.append(createElemAttr('i', { class: 'fas fa-calendar-alt' }), 'Upcoming');
  header.appendChild(h3);

  projects.findUpcomingTasks().forEach(dateObj => {
    const article = createElemAttr('article', { class: 'day-tasks' });
    main.appendChild(article);

    const h4 = document.createElement('h4');
    h4.textContent = formatDateUpcoming(dateObj.date);
    article.appendChild(h4);

    const taskList = createElemAttr('ul', { class: 'task-list' });
    article.appendChild(taskList);

    dateObj.tasks.forEach(taskObj => {
      const project = projects.list.find((project) => project.id === taskObj.id);
      taskList.appendChild(createTaskLi(taskObj.task, project, 'upcoming'));
    });
  });

  const taskFormWrapper = createElemAttr('div', { id: 'task-form-wrapper' });
  main.appendChild(taskFormWrapper);

  taskFormWrapper.appendChild(createTaskForm('upcoming'));

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

export { createUpcomingPage };
