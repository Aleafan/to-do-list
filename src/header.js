import { toggleNav } from './navMenu.js';
import { createElemAttr } from './helpers.js';

function createHeader() {
  const header = createElemAttr('header', {id: 'app-header'});

  const h1 = document.createElement('h1');
  h1.appendChild(createElemAttr('i', {class: 'far fa-check-square'}));
  h1.appendChild(document.createTextNode(' To-do List'));
  header.appendChild(h1);

  const button = createElemAttr('button', {type: 'button', id: 'nav-toggler', 'aria-label': 'toggle-menu'});
  button.appendChild(createElemAttr('i', {class: 'fas fa-bars'}));
  header.appendChild(button);

  // Event listeners
  button.addEventListener('click', toggleNav);

  return header;
}

export { createHeader };