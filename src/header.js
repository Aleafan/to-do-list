import { toggleNav } from './navMenu.js';
import { setAttributes } from './helpers.js';

function createHeader() {
  const header = document.createElement('header');
  header.setAttribute('id', 'app-header');

  const h1 = document.createElement('h1');
  header.appendChild(h1);

  const iconTitle = document.createElement('i');
  iconTitle.classList.add('far', 'fa-check-square');
  h1.appendChild(iconTitle);

  const h1Text = document.createTextNode(' To-do List');
  h1.appendChild(h1Text);

  const button = document.createElement('button');
  setAttributes(button, {'type': 'button', 'id': 'nav-toggler', 'aria-label': 'toggle-menu'});
  header.appendChild(button);

  button.addEventListener('click', toggleNav);

  const iconToggler = document.createElement('i');
  iconToggler.classList.add('fas', 'fa-bars');
  button.appendChild(iconToggler);

  return header;
}

export { createHeader };