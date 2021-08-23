import { parse, format, isToday, isTomorrow, isThisYear, isPast, isFuture, isAfter } from 'date-fns';

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

function isDueDateUpcoming(dueDate) {
  const parsedDate = parse(dueDate, "MMM d yyyy", new Date());
  return isFuture(parsedDate);
}

function compareDates(firstDate, secondDate) {
  const firstDateParsed = parse(firstDate, "MMM d yyyy", new Date());
  const secondDateParsed = parse(secondDate, "MMM d yyyy", new Date());
  return isAfter(firstDateParsed, secondDateParsed) ? 1 : (-1);
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

function formatDateUpcoming(dateStr) {
  const parsedDate = parse(dateStr, "MMM d yyyy", new Date());
  const date = isTomorrow(parsedDate) ? format(parsedDate, "MMM d, 'Tomorrow'")
      : isThisYear(parsedDate) ? format(parsedDate, 'MMM d, eeee')
      : format(parsedDate, "MMM d yyyy, eeee");
  return date;
}

export {
  uniqueId,
  createElemAttr,
  formatDate,
  isDueDateToday,
  isDueDateUpcoming,
  focusAtEnd,
  setProgressDisplay,
  getToday,
  compareDates,
  formatDateUpcoming,
};