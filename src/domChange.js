function loadContent(content) {
  const previousContent = document.getElementById('content');
  if (previousContent) {
    document.body.removeChild(previousContent);
  }
  document.body.appendChild(content);
}

export { loadContent };