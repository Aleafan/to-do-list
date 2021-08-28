function createElemAttr(element, attributes) {
  const newElement = document.createElement(element);
  Object.keys(attributes).forEach(key => {
    newElement.setAttribute(key, attributes[key]);
  });
  return newElement;
}

function loadContent(createContentFunc) {
  // Clean previous content
  const previousContent = document.querySelector('main');
  if (previousContent) previousContent.remove();

  const previousFpContainer = document.querySelector('.fp-container');
  if (previousFpContainer) previousFpContainer.remove();

  // Append new content
  document.body.appendChild(createElemAttr('div', { class: 'fp-container' }));
  document.body.appendChild(createContentFunc());

  document.body.classList.remove('nav-positioner');

  window.scroll(0, 0);
}

function focusAtEnd(element) {
  element.focus();
  const { value } = element;
  element.value = '';
  element.value = value;
}

function setProgressDisplay(project, progress) {
  const progressBar = progress || document.querySelector('progress');
  if (!progressBar) return;

  const progressValue = project.calcProgress();
  progressBar.setAttribute('value', progressValue);
  progressBar.textContent = `${progressValue} %`;
}

function highlightActiveTab(button) {
  const currTab = document.querySelector('.active-tab');
  if (currTab) currTab.classList.remove('active-tab');

  button.classList.add('active-tab');
}

function recalcTaskNumber(project) {
  const navMenu = document.getElementById('nav-menu');
  const spanNumber = navMenu.querySelector(`#${project.id} .task-number`);
  spanNumber.textContent = project.calcActiveTasks();
}

export {
  loadContent,
  createElemAttr,
  focusAtEnd,
  setProgressDisplay,
  highlightActiveTab,
  recalcTaskNumber,
};
