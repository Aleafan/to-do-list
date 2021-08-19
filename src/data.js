import { uniqueId, isDueDateToday } from './helpers';

const vacation = {
  id: 'a94hngh656',
  title: 'Vacation in Italy',
  description: 'We\'ll go from June 14-22 and visit Rome, Siena and Florence',
  tasks: [
    {
      title: 'Book flight',
      notes: 'Flight during the day',
      dueDate: 'Aug 19 2021',
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
      dueDate: 'Jul 26 2021',
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
    const tasksNum = this.calcTasks();
    if (tasksNum === 0) return 0;
    let completed = 0;
    this.tasks.forEach(task => {
      if (task.complete) completed++;
    });
    return Math.round((completed / tasksNum) * 100);
  },
  calcTasks() {
    return this.tasks.length;
  },
  deleteCompleted() {
    this.tasks = this.tasks.filter((task) => !task.complete);
  },
};
const exercise = {
  id: 'acurlpj9pg',
  title: 'Exercise',
  description: 'Phisical exercise is important for general well-being',
  tasks: [
    {
      title: 'Practice yoga',
      notes: 'Practice yoga 3 times per week',
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
    {
      title: 'Exercise on the bar',
      notes: '',
      dueDate: 'Aug 19 2021',
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
    const tasksNum = this.calcTasks();
    if (tasksNum === 0) return 0;
    let completed = 0;
    this.tasks.forEach((task) => {
      if (task.complete) completed++;
    });
    return Math.round((completed / tasksNum) * 100);
  },
  calcTasks() {
    return this.tasks.length;
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
      dueDate: 'Aug 19 2021',
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
      dueDate: 'Aug 19 2021',
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
    const tasksNum = this.calcTasks();
    if (tasksNum === 0) return 0;
    let completed = 0;
    this.tasks.forEach(task => {
      if (task.complete) completed++;
    });
    return Math.round((completed / tasksNum) * 100);
  },
  calcTasks() {
    return this.tasks.length;
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
    const tasksNum = this.calcTasks();
    if (tasksNum === 0) return 0;
    let completed = 0;
    this.tasks.forEach(task => {
      if (task.complete) completed++;
    });
    return Math.round((completed / tasksNum) * 100);
  },
  calcTasks() {
    return this.tasks.length;
  },
  deleteCompleted() {
    this.tasks = this.tasks.filter(task => !task.complete);
  },
};

function createProject(title) {
  const id = uniqueId();
  const addTask = (task) => project.tasks.push(task);
  const deleteTask = (task) => project.tasks.splice(project.tasks.indexOf(task), 1);
  const calcTasks = () => project.tasks.length;
  const calcProgress = () => {
    const tasksNum = project.calcTasks();
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
    calcTasks,
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
  list: [vacation, exercise, health, house],

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
        const tasksNum = this.calcTasks();
        if (tasksNum === 0) return 0;
        let completed = 0;
        this.tasks.forEach(taskObj => {
          if (taskObj.task.complete) completed++;
        });
        return Math.round((completed / tasksNum) * 100);
      },

      calcTasks() {
        return this.tasks.length;
      },
    };
    return todayProject;
  },
};

export { projects, createTask, createProject };
