import { loadInterface, loadContent } from './domChange.js';
import { createHeader } from './header.js';
import { createNavMenu } from './navMenu.js';
import { createProjectPage } from './project.js';

const vacation = {
  title: 'Vacation in Rome',
  description: 'We\'ll go from June 14-22 and visit Rome, Siena and Florence', 
  tasks: [
    {
      title: 'Book flight',
      notes: '',
      dueDate: 'Sep 28',
      priority: 1,
      complete: 1,
    },
    {
      title: 'Read about the metro',
      notes: '',
      dueDate: 'Today',
      priority: 0,
      complete: 0,
    },
    {
      title: 'Buy travel guide',
      notes: '',
      dueDate: 'Sep 12',
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
  ]
}
const exercise = {
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
  ]
}
const health = {
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
  ]
}
const house = {
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
  ]
}

export const projects = [vacation, exercise, health, house];

loadInterface(createHeader());
loadInterface(createNavMenu());

loadContent(createProjectPage(projects[0]));