function loadInterface(element) {
  document.body.appendChild(element);
}

function loadContent(content) {
  const previousContent = document.querySelector('main');
  if (previousContent) previousContent.remove();
  document.body.appendChild(content);
  document.body.classList.remove('nav-positioner');
}

export { loadInterface, loadContent };