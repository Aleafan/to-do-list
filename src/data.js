import { uniqueId, isDueDateToday, isDueDateUpcoming, compareDates } from './helpers';

const inbox = {
  id: 'inbox',
  title: 'Inbox',
  description: '',
  tasks: [
    {
      title: 'Finish IT project',
      notes: '',
      dueDate: 'Aug 23 2021',
      priority: false,
      complete: false,
      togglePriority() {
        this.priority = !this.priority;
      },
      toggleComplete() {
        this.complete = !this.complete;
      },
      changeDate(date) {
        this.dueDate = date;
      },
    },
    {
      title: 'Read weekly news',
      notes: '',
      dueDate: 'Sep 26 2021',
      priority: false,
      complete: false,
      togglePriority() {
        this.priority = !this.priority;
      },
      toggleComplete() {
        this.complete = !this.complete;
      },
      changeDate(date) {
        this.dueDate = date;
      },
    },
    {
      title: 'Repair the bicycle',
      notes: 'Buy a spanner size 12',
      dueDate: 'Sep 12 2021',
      priority: false,
      complete: true,
      togglePriority() {
        this.priority = !this.priority;
      },
      toggleComplete() {
        this.complete = !this.complete;
      },
      changeDate(date) {
        this.dueDate = date;
      },
    },
  ],

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
    this.tasks = this.tasks.filter((task) => !task.complete);
  },
};

const vacation = {
  id: 'a94hngh656',
  title: 'Vacation in Italy',
  description: 'We\'ll go from June 14-22 and visit Rome, Siena and Florence',
  tasks: [
    {
      title: 'Book flight',
      notes: 'Flight during the day',
      dueDate: 'Aug 23 2021',
      priority: false,
      complete: false,
      togglePriority() {
        this.priority = !this.priority;
      },
      toggleComplete() {
        this.complete = !this.complete;
      },
      changeDate(date) {
        this.dueDate = date;
      },
    },
    {
      title: 'Read about the metro',
      notes: 'Tickets, prices, opening times',
      dueDate: 'Sep 26 2021',
      priority: false,
      complete: false,
      togglePriority() {
        this.priority = !this.priority;
      },
      toggleComplete() {
        this.complete = !this.complete;
      },
      changeDate(date) {
        this.dueDate = date;
      },
    },
    {
      title: 'Buy travel guide',
      notes: 'Rough Guide',
      dueDate: 'Sep 12 2021',
      priority: false,
      complete: true,
      togglePriority() {
        this.priority = !this.priority;
      },
      toggleComplete() {
        this.complete = !this.complete;
      },
      changeDate(date) {
        this.dueDate = date;
      },
    },
    {
      title: 'Book hotel room',
      notes: '',
      dueDate: '',
      priority: true,
      complete: false,
      togglePriority() {
        this.priority = !this.priority;
      },
      toggleComplete() {
        this.complete = !this.complete;
      },
      changeDate(date) {
        this.dueDate = date;
      },
    },
  ],

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
    this.tasks = this.tasks.filter((task) => !task.complete);
  },
};

const exercise = {
  id: 'acurlpj9pg',
  title: 'Exercise',
  description: 'Physical exercise is important for general well-being',
  tasks: [
    {
      title: 'Practice yoga',
      notes: 'Practice yoga 3 times per week',
      dueDate: 'Aug 24 2021',
      priority: true,
      complete: false,
      togglePriority() {
        this.priority = !this.priority;
      },
      toggleComplete() {
        this.complete = !this.complete;
      },
      changeDate(date) {
        this.dueDate = date;
      },
    },
    {
      title: 'Exercise on the bar',
      notes: '',
      dueDate: 'Aug 23 2021',
      priority: false,
      complete: false,
      togglePriority() {
        this.priority = !this.priority;
      },
      toggleComplete() {
        this.complete = !this.complete;
      },
      changeDate(date) {
        this.dueDate = date;
      },
    },
    {
      title: 'Do back exercises',
      notes: '',
      dueDate: 'Aug 10 2021',
      priority: false,
      complete: false,
      togglePriority() {
        this.priority = !this.priority;
      },
      toggleComplete() {
        this.complete = !this.complete;
      },
      changeDate(date) {
        this.dueDate = date;
      },
    },
  ],

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
    this.tasks.forEach((task) => {
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
};

const health = {
  id: 'ayl9h1qd67',
  title: 'Health',
  description: 'Caring for my health leads to better quality of life',
  tasks: [
    {
      title: 'Have healthy diet',
      notes: '',
      dueDate: 'Aug 23 2021',
      priority: false,
      complete: true,
      togglePriority() {
        this.priority = !this.priority;
      },
      toggleComplete() {
        this.complete = !this.complete;
      },
      changeDate(date) {
        this.dueDate = date;
      },
    },
    {
      title: 'Reduce sugar consumption',
      notes: '',
      dueDate: 'Aug 23 2021',
      priority: false,
      complete: false,
      togglePriority() {
        this.priority = !this.priority;
      },
      toggleComplete() {
        this.complete = !this.complete;
      },
      changeDate(date) {
        this.dueDate = date;
      },
    },
    {
      title: 'Drink less alcohole',
      notes: '',
      dueDate: '',
      priority: false,
      complete: true,
      togglePriority() {
        this.priority = !this.priority;
      },
      toggleComplete() {
        this.complete = !this.complete;
      },
      changeDate(date) {
        this.dueDate = date;
      },
    },
  ],

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
};

const house = {
  id: 'a9yorb54d2',
  title: 'House',
  description: 'Clean the house once every week',
  tasks: [
    {
      title: 'Clean the house',
      notes: 'Once per week',
      dueDate: '',
      priority: false,
      complete: 1,
      togglePriority() {
        this.priority = !this.priority;
      },
      toggleComplete() {
        this.complete = !this.complete;
      },
      changeDate(date) {
        this.dueDate = date;
      },
    },
    {
      title: 'Repair broken tap',
      notes: '',
      dueDate: '',
      priority: false,
      complete: false,
      togglePriority() {
        this.priority = !this.priority;
      },
      toggleComplete() {
        this.complete = !this.complete;
      },
      changeDate(date) {
        this.dueDate = date;
      },
    },
  ],
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
};

function createProject(title) {
  const id = uniqueId();
  const addTask = (task) => project.tasks.push(task);
  const deleteTask = (task) => project.tasks.splice(project.tasks.indexOf(task), 1);
  const calcActiveTasks = () => project.tasks.filter(task => !task.complete).length || '';
  const calcProgress = () => {
    const tasksNum = project.tasks.length;
    if (tasksNum === 0) return 0;
    let completed = 0;
    project.tasks.forEach(task => {
      if (task.complete) completed++;
    });
    return Math.round(completed / tasksNum * 100);
  };
  const deleteCompleted = () => project.tasks = project.tasks.filter(task => !task.complete);
  const project = {
    id,
    title,
    tasks: [],
    addTask,
    deleteTask,
    calcActiveTasks,
    calcProgress,
    deleteCompleted,
  };
  return project;
}

function createTask(title, notes, dueDate, priority, complete) {
  priority = priority ? true : false;
  complete = complete ? true : false;
  const togglePriority = () => task.priority = !task.priority;
  const toggleComplete = () => task.complete = !task.complete;
  const changeDate = (date) => task.dueDate = date;
  const task = {
    title,
    notes,
    dueDate,
    priority,
    complete,
    togglePriority,
    toggleComplete,
    changeDate,
  };
  return task;
}

const projects = {
  list: [inbox, vacation, exercise, health, house],

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
    return upcomingTasks; // [{ date: 'Aug 23 2021', tasks: [task1, task2...]}, ...]
  },
};

export { projects, createTask, createProject };
