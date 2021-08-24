import { createElemAttr } from './helpers.js';

function loadInterface(element) {
  document.body.appendChild(element);
}

function loadContent(createContentFunc) {
  cleanPreviousContent();

  document.body.appendChild(createElemAttr('div', { class: 'fp-container' }));

  document.body.appendChild(createContentFunc());

  document.body.classList.remove('nav-positioner');
  
  window.scroll(0, 0);
}

function cleanPreviousContent() {
  const previousContent = document.querySelector('main');
  if (previousContent) previousContent.remove();

  const previousFpContainer = document.querySelector('.fp-container');
  if (previousFpContainer) previousFpContainer.remove();
}

export { loadInterface, loadContent };