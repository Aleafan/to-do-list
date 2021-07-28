import { uniqueId } from "./helpers";

const vacation = {
  id: 'a94hngh656',
  title: 'Vacation in Italy',
  description: 'We\'ll go from June 14-22 and visit Rome, Siena and Florence',
  tasks: [
    {
      title: 'Book flight',
      notes: '',
      dueDate: 'Jul 23 2021',
      priority: 1,
      complete: 1,
    },
    {
      title: 'Read about the metro',
      notes: '',
      dueDate: 'Jul 26 2021',
      priority: 0,
      complete: 0,
    },
    {
      title: 'Buy travel guide',
      notes: '',
      dueDate: 'Sep 12 2021',
      priority: 0,
      complete: 1,
    },
    {
      title: 'Book hotel room',
      notes: '',
      dueDate: '',
      priority: 1,
      complete: 0,
    }
  ],
  addTask(task) {
    this.tasks.push(task);
  },
  calcProgress() {
    let completed = 0;
    this.tasks.forEach(task => {
    if (task.complete) completed++;
    });
    const progress = Math.round(completed / this.tasks.length * 100);
    return progress;
  },  
}
const exercise = {
  id: 'acurlpj9pg',
  title: 'Exercise',
  description: 'Phisical exercise is important for general well-being', 
  tasks: [
    {
      title: 'Practice yoga',
      notes: 'Practice yoga 3 times per week',
      dueDate: '',
      priority: 1,
      complete: 0,
    },
    {
      title: 'Exercise on the bar',
      notes: '',
      dueDate: '',
      priority: 0,
      complete: 0,
    },
    {
      title: 'Do back exercises',
      notes: '',
      dueDate: '',
      priority: 0,
      complete: 0,
    }
  ],
  addTask(task) {
    this.tasks.push(task);
  },
  calcProgress() {
    let completed = 0;
    this.tasks.forEach(task => {
    if (task.complete) completed++;
    });
    const progress = Math.round(completed / this.tasks.length * 100);
    return progress;
  }, 
}
const health = {
  id: 'ayl9h1qd67',
  title: 'Health',
  description: 'Caring for my health leads to better quality of life', 
  tasks: [
    {
      title: 'Have healthy diet',
      notes: '',
      dueDate: '',
      priority: 0,
      complete: 1,
    },
    {
      title: 'Reduce sugar consumption',
      notes: '',
      dueDate: '',
      priority: 0,
      complete: 0,
    },
    {
      title: 'Drink less alcohole',
      notes: '',
      dueDate: '',
      priority: 0,
      complete: 1,
    }
  ],
  addTask(task) {
    this.tasks.push(task);
  },
  calcProgress() {
    let completed = 0;
    this.tasks.forEach(task => {
    if (task.complete) completed++;
    });
    const progress = Math.round(completed / this.tasks.length * 100);
    return progress;
  }, 
}
const house = {
  id: 'a9yorb54d2',
  title: 'House',
  description: 'Clean the house once every week', 
  tasks: [
    {
      title: 'Clean the house',
      notes: 'Once per week',
      dueDate: '',
      priority: 0,
      complete: 1,
    },
    {
      title: 'Repair broken tap',
      notes: '',
      dueDate: '',
      priority: 0,
      complete: 0,
    }
  ],
  addTask(task) {
    this.tasks.push(task);
  },
  calcProgress() {
    let completed = 0;
    this.tasks.forEach(task => {
    if (task.complete) completed++;
    });
    const progress = Math.round(completed / this.tasks.length * 100);
    return progress;
  }, 
}

function createTask(title, notes, dueDate, priority) {
  return {
    title,
    notes,
    dueDate,
    priority,
    complete: false,
  }
}

const projects = [vacation, exercise, health, house];

export { projects, createTask };