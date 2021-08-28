import { projects } from './data';
import { formatDateUpcoming } from './helpers';
import { createTaskLi } from './taskListItem';
import { createTaskForm, toggleTaskForm } from './taskForm';
import { createElemAttr } from './domFunctions';
import createFormOverlay from './formOverlay';

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
      const project = projects.list.find(proj => proj.id === taskObj.id);
      taskList.appendChild(createTaskLi(taskObj.task, project, 'upcoming'));
    });
  });

  const taskFormWrapper = createElemAttr('div', { id: 'task-form-wrapper' });
  main.appendChild(taskFormWrapper);

  taskFormWrapper.appendChild(createTaskForm('upcoming'));

  const btnAddTask = createElemAttr('button', { type: 'button', class: 'btn-menu btn-add' });
  btnAddTask.textContent = ' New task';
  taskFormWrapper.appendChild(btnAddTask);

  main.appendChild(createFormOverlay());

  // Add event listeners
  btnAddTask.addEventListener('click', toggleTaskForm);

  return main;
}

export default createUpcomingPage;
