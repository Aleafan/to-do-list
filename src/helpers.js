import { parse, format, isToday, isTomorrow, isThisYear, isPast } from 'date-fns';

// Unique ID generator (based on https://gist.github.com/gordonbrander/2230317#file-id-js)
function uniqueId() {
  return 'a' + Math.random().toString(36).substr(2, 9);
}

function createElemAttr(element, attributes) {
  const newElement = document.createElement(element);
  for (const key in attributes) {
    newElement.setAttribute(key, attributes[key]);
  }
  return newElement;
}

function formatDate(dateStr) {
  const parsedDate = parse(dateStr, "MMM d yyyy", new Date());
  const expired = isPast(parsedDate);
  const date = isToday(parsedDate) ? 'Today'
      : isTomorrow(parsedDate) ? 'Tomor.'
      : isThisYear(parsedDate) ? format(parsedDate, 'MMM d')
      : dateStr;
  return { date, expired };
}

function isDueDateToday(dueDate) {
  const parsedDate = parse(dueDate, "MMM d yyyy", new Date());
  return isToday(parsedDate);
}

function focusAtEnd(element) {
  element.focus();
  const value = element.value;
  element.value = '';
  element.value = value;
}

function setProgressDisplay(project, progress) {
  if (!progress) {
    progress = document.querySelector('progress');
    if (!progress) return;
  }
  const progressValue = project.calcProgress();
  progress.setAttribute('value', progressValue);
  progress.textContent = `${progressValue} %`;
}

function getToday() {
  return format(Date.now(), 'EEE, MMM d');
}

export { uniqueId, createElemAttr, formatDate, isDueDateToday, focusAtEnd, setProgressDisplay, getToday };