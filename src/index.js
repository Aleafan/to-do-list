import { loadContent } from './domChange.js';
import { createMenu } from './mainMenu.js';

const vacation = {
  title: 'Vacation in Rome',
  tasks: [
    {
      title: 'Book flight',
      description: '',
      dueDate: '',
      priority: 1,
    },
    {
      title: 'Read about the metro',
      description: '',
      dueDate: '',
      priority: 0,
    },
    {
      title: 'Buy travel guide',
      description: '',
      dueDate: '',
      priority: 0,
    },
    {
      title: 'Book hotel room',
      description: '',
      dueDate: '',
      priority: 0,
    }
  ]
}
const exercise = {
  title: 'Exercise',
  tasks: [
    {
      title: 'Practice yoga',
      description: 'Practice yoga 3 times per week',
      dueDate: '',
      priority: 1,
    },
    {
      title: 'Exercise on the bar',
      description: '',
      dueDate: '',
      priority: 0,
    },
    {
      title: 'Do back exercises',
      description: '',
      dueDate: '',
      priority: 0,
    }
  ]
}
const health = {
  title: 'Health',
  tasks: [
    {
      title: 'Have healthy diet',
      description: '',
      dueDate: '',
      priority: 0,
    },
    {
      title: 'Reduce sugar consumption',
      description: '',
      dueDate: '',
      priority: 0,
    },
    {
      title: 'Drink less alcohole',
      description: '',
      dueDate: '',
      priority: 0,
    }
  ]
}
const house = {
  title: 'House',
  tasks: [
    {
      title: 'Clean the house',
      description: 'Once per week',
      dueDate: '',
      priority: 0,
    },
    {
      title: 'Repair broken tap',
      description: '',
      dueDate: '',
      priority: 0,
    }
  ]
}

export const projects = [vacation, exercise, health, house];

loadContent(createMenu());