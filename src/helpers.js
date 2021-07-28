// Unique ID generator (based on https://gist.github.com/gordonbrander/2230317#file-id-js)
function uniqueId() {
  return 'a' + Math.random().toString(36).substr(2, 9);
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

export { uniqueId, setAttributes };