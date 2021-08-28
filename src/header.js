import { toggleNav } from './navMenu';
import { createElemAttr } from './domFunctions';

function createHeader() {
  const header = createElemAttr('header', { id: 'app-header' });

  const h1 = document.createElement('h1');
  h1.append(createElemAttr('i', { class: 'far fa-check-square' }), 'To-do List');

  const button = createElemAttr('button', {
    type: 'button',
    id: 'nav-toggler',
    'aria-label': 'toggle-menu',
  });
  button.appendChild(createElemAttr('i', { class: 'fas fa-bars' }));

  header.append(h1, button);

  // Event listeners
  button.addEventListener('click', toggleNav);

  return header;
}

export default createHeader;
