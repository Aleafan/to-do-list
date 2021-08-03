import { parse, format, isToday, isTomorrow, isThisYear, isPast } from 'date-fns';


// Unique ID generator (based on https://gist.github.com/gordonbrander/2230317#file-id-js)
function uniqueId() {
  return 'a' + Math.random().toString(36).substr(2, 9);
}


function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
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


export { uniqueId, setAttributes, createElemAttr, formatDate };