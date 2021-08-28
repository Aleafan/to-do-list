import { projects } from './data';
import { createTaskForm, toggleTaskForm } from './taskForm';
import { getToday } from './helpers';
import { createTaskLi } from './taskListItem';
import { createElemAttr, setProgressDisplay } from './domFunctions';
import createFormOverlay from './formOverlay';

function createTodayPage() {
  const todayProject = projects.findTodayTasks();

  const main = document.createElement('main');

  const header = createElemAttr('header', { id: 'header-today' });

  const h3 = document.createElement('h3');
  h3.append(createElemAttr('i', { class: 'fas fa-calendar-day' }), 'Today');
  const p = document.createElement('p');
  p.textContent = getToday();

  header.append(h3, p);

  main.appendChild(header);

  const progress = createElemAttr('progress', { max: '100' });
  setProgressDisplay(todayProject, progress);
  main.appendChild(progress);

  const taskList = createElemAttr('ul', { class: 'task-list' });
  main.appendChild(taskList);

  todayProject.tasks.forEach(elem => {
    const project = projects.list.find(proj => proj.id === elem.id);
    taskList.appendChild(createTaskLi(elem.task, project, 'today'));
  });

  const taskFormWrapper = createElemAttr('div', { id: 'task-form-wrapper' });
  main.appendChild(taskFormWrapper);

  taskFormWrapper.appendChild(createTaskForm('today'));

  const btnAddTask = createElemAttr('button', { type: 'button', class: 'btn-menu btn-add' });
  btnAddTask.textContent = ' New task';
  taskFormWrapper.appendChild(btnAddTask);

  main.appendChild(createFormOverlay());

  // Add event listeners
  btnAddTask.addEventListener('click', toggleTaskForm);

  return main;
}

export default createTodayPage;
