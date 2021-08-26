import { uniqueId, isDueDateToday, isDueDateUpcoming, compareDates } from './helpers';

// Default projects declaration
const inbox = {
  id: 'inbox',
  title: 'Inbox',
  description: '',
  tasks: [
    {
      title: 'Finish work project',
      notes: '',
      dueDate: 'Aug 25 2021',
      priority: false,
      complete: false,
    },
    {
      title: 'Read weekly news',
      notes: '',
      dueDate: 'Sep 26 2021',
      priority: false,
      complete: true,
    },
    {
      title: 'Repair the bicycle',
      notes: 'Buy a spanner size 12',
      dueDate: 'Sep 12 2021',
      priority: false,
      complete: false,
    },
  ],
};

const vacation = {
  id: 'a94hngh656',
  title: 'Vacation in Italy',
  description: 'We\'ll go next month and visit Rome, Siena and Florence',
  tasks: [
    {
      title: 'Book flight tickets',
      notes: 'Flight during the day',
      dueDate: 'Aug 25 2021',
      priority: false,
      complete: false,
    },
    {
      title: 'Read about the metro',
      notes: 'Tickets, prices, opening times',
      dueDate: 'Sep 26 2021',
      priority: false,
      complete: false,
    },
    {
      title: 'Buy travel guide',
      notes: 'Rough Guide is preferred',
      dueDate: 'Sep 12 2021',
      priority: false,
      complete: true,
    },
    {
      title: 'Book hotel room',
      notes: '',
      dueDate: '',
      priority: true,
      complete: false,
    },
  ],
};

const exercise = {
  id: 'acurlpj9pg',
  title: 'Exercise',
  description: 'Physical exercise is important for general well-being',
  tasks: [
    {
      title: 'Practice yoga',
      notes: 'Practice yoga 3 times per week',
      dueDate: 'Aug 26 2021',
      priority: true,
      complete: false,
    },
    {
      title: 'Exercise on the bar',
      notes: '',
      dueDate: 'Aug 25 2021',
      priority: false,
      complete: true,
    },
    {
      title: 'Do back exercises',
      notes: '',
      dueDate: 'Aug 10 2021',
      priority: false,
      complete: false,
    },
  ],
};

const house = {
  id: 'a9yorb54d2',
  title: 'House',
  description: 'Keep the house tidy',
  tasks: [
    {
      title: 'Clean the house',
      notes: 'Once per week',
      dueDate: '',
      priority: false,
      complete: false,
    },
    {
      title: 'Repair broken tap',
      notes: '',
      dueDate: '',
      priority: false,
      complete: false,
    },
  ],
};

const grocery = {
  id: 'ayl9h1qd67',
  title: 'Grocery list',
  description: '',
  tasks: [
    {
      title: 'Buy milk',
      notes: 'Sale in Diksy - 95% off!',
      dueDate: 'Aug 25 2021',
      priority: false,
      complete: false,
    },
    {
      title: 'Buy sugar',
      notes: 'Super cheap in Pyaterochka',
      dueDate: 'Aug 25 2021',
      priority: false,
      complete: false,
    },
    {
      title: 'Buy beer',
      notes: 'As much as possible...',
      dueDate: '',
      priority: false,
      complete: true,
    },
  ],
};

// Factory functions for tasks and projects creation
function createTask(title, notes, dueDate, priority, complete) {
  priority = !!priority;
  complete = !!complete;
  const task = { title, notes, dueDate, priority, complete };
  return task;
}

function createProject(title) {
  const id = uniqueId();
  const projectProps = { id, title, tasks: [] };
  const newObject = Object.create(projProto);
  return Object.assign(newObject, projectProps);
}

// Prototypes for each project and projects object containing their methods
const projProto = {
  addTask(task) {
    this.tasks.push(task);
  },

  deleteTask(task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  },

  calcProgress() {
    const tasksNum = this.tasks.length;
    if (tasksNum === 0) return 0;
    let completed = 0;
    this.tasks.forEach(task => {
      if (task.complete) completed++;
    });
    return Math.round((completed / tasksNum) * 100);
  },

  calcActiveTasks() {
    const number = this.tasks.filter(task => !task.complete).length;
    return number || '';
  },

  deleteCompleted() {
    this.tasks = this.tasks.filter(task => !task.complete);
  },
}

const projectsProto = {
  addProject(project) {
    this.list.push(project);
  },

  deleteProject(project) {
    this.list.splice(this.list.indexOf(project), 1);
  },

  findTodayTasks() {
    const tasks = this.list.reduce((array, project) => {
      project.tasks.forEach(task => {
        if (isDueDateToday(task.dueDate)) {
          array.push({
            id: project.id,
            task,
          });
        }
      });
      return array;
    }, []);

    const todayProject = {
      id: 'today',
      tasks,

      calcProgress() {
        const tasksNum = this.tasks.length;
        if (tasksNum === 0) return 0;
        let completed = 0;
        this.tasks.forEach(taskObj => {
          if (taskObj.task.complete) completed++;
        });
        return Math.round((completed / tasksNum) * 100);
      },

      calcActiveTasks() {
        const number = this.tasks.filter(taskObj => !taskObj.task.complete).length;
        return number || '';
      },
    };
    return todayProject;
  },

  findUpcomingTasks() {
    const upcomingTasks = this.list
      .reduce((array, project) => {
        project.tasks.forEach(task => {
          if (task.dueDate && isDueDateUpcoming(task.dueDate)) {
            const taskObj = {
              id: project.id,
              task,
            };
            const dateElem = array.find(elem => elem.date === task.dueDate);
            if (dateElem) {
              dateElem.tasks.push(taskObj);
            } else {
              const newDateElem = {
                date: task.dueDate,
                tasks: [taskObj],
              };
              array.push(newDateElem);
            }
          }
        });
        return array;
      }, [])
      .sort((first, second) => compareDates(first.date, second.date));
    return upcomingTasks;
  },
};

let projects;
const defaultList = [inbox, vacation, exercise, house, grocery];

function prepareUsersData() {
  // Check in LocalStorage and load default projects if no saved data found
  const savedData = localStorage.getItem('projects');
  const projectsList = savedData ? JSON.parse(savedData) : defaultList;

  const list = projectsList.map(project => {
    const newObject = Object.create(projProto);
    return Object.assign(newObject, project);
  });
  projects = Object.assign({ list }, projectsProto);
}

// Save data to local storage on visibilitychange to hidden, check 'pagehide' for Safari bug case
function configureDataSave() {
  let terminatingEventSent = false;

  const handleHide = (e) => {
    if (terminatingEventSent) return;
    if (e.type === 'pagehide') {
      terminatingEventSent = true;
      localStorage.setItem('projects', JSON.stringify(projects.list));
    }
    if (e.type === 'visibilitychange' && document.visibilityState === 'hidden') {
      localStorage.setItem('projects', JSON.stringify(projects.list));
    }
  }

  document.addEventListener('visibilitychange', handleHide);
  window.addEventListener('pagehide', handleHide)
}

export { projects, createTask, createProject, prepareUsersData, configureDataSave };
