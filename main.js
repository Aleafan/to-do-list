/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domChange.js":
/*!**************************!*\
  !*** ./src/domChange.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadInterface": () => (/* binding */ loadInterface),
/* harmony export */   "loadContent": () => (/* binding */ loadContent)
/* harmony export */ });
function loadInterface(element) {
  document.body.appendChild(element);
}

function loadContent(content) {
  const previousContent = document.querySelector('main');
  if (previousContent) {
    document.body.removeChild(previousContent);
  }
  document.body.appendChild(content);
  document.body.classList.remove('nav-positioner');
}



/***/ }),

/***/ "./src/header.js":
/*!***********************!*\
  !*** ./src/header.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createHeader": () => (/* binding */ createHeader)
/* harmony export */ });
/* harmony import */ var _navMenu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navMenu.js */ "./src/navMenu.js");


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
  button.setAttribute('type', 'button');
  button.setAttribute('id', 'nav-toggler');
  button.setAttribute('aria-label', 'toggle-menu');
  header.appendChild(button);

  button.addEventListener('click', _navMenu_js__WEBPACK_IMPORTED_MODULE_0__.toggleNav);

  const iconToggler = document.createElement('i');
  iconToggler.classList.add('fas', 'fa-bars');
  button.appendChild(iconToggler);

  return header;
}



/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "countProgress": () => (/* binding */ countProgress)
/* harmony export */ });
function countProgress(project) {
  let completed = 0;
  project.tasks.forEach(task => {
    if (task.complete) completed++;
  });
  const progress = Math.round(completed / project.tasks.length * 100);
  return progress;
}



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projects": () => (/* binding */ projects)
/* harmony export */ });
/* harmony import */ var _domChange_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domChange.js */ "./src/domChange.js");
/* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header.js */ "./src/header.js");
/* harmony import */ var _navMenu_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navMenu.js */ "./src/navMenu.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./project.js */ "./src/project.js");





const vacation = {
  title: 'Vacation in Rome',
  description: 'We\'ll go from June 14-22 and visit Rome, Siena and Florence', 
  tasks: [
    {
      title: 'Book flight',
      notes: '',
      dueDate: 'Sep 28',
      priority: 1,
      complete: 1,
    },
    {
      title: 'Read about the metro',
      notes: '',
      dueDate: 'Today',
      priority: 0,
      complete: 0,
    },
    {
      title: 'Buy travel guide',
      notes: '',
      dueDate: 'Sep 12',
      priority: 0,
      complete: 1,
    },
    {
      title: 'Book hotel room',
      notes: '',
      dueDate: '',
      priority: 1,
      complete: 0,
    }
  ]
}
const exercise = {
  title: 'Exercise',
  description: 'Phisical exercise is important for general well-being', 
  tasks: [
    {
      title: 'Practice yoga',
      notes: 'Practice yoga 3 times per week',
      dueDate: '',
      priority: 1,
      complete: 0,
    },
    {
      title: 'Exercise on the bar',
      notes: '',
      dueDate: '',
      priority: 0,
      complete: 0,
    },
    {
      title: 'Do back exercises',
      notes: '',
      dueDate: '',
      priority: 0,
      complete: 0,
    }
  ]
}
const health = {
  title: 'Health',
  description: 'Caring for my health leads to better quality of life', 
  tasks: [
    {
      title: 'Have healthy diet',
      notes: '',
      dueDate: '',
      priority: 0,
      complete: 1,
    },
    {
      title: 'Reduce sugar consumption',
      notes: '',
      dueDate: '',
      priority: 0,
      complete: 0,
    },
    {
      title: 'Drink less alcohole',
      notes: '',
      dueDate: '',
      priority: 0,
      complete: 1,
    }
  ]
}
const house = {
  title: 'House',
  description: 'Clean the house once every week', 
  tasks: [
    {
      title: 'Clean the house',
      notes: 'Once per week',
      dueDate: '',
      priority: 0,
      complete: 1,
    },
    {
      title: 'Repair broken tap',
      notes: '',
      dueDate: '',
      priority: 0,
      complete: 0,
    }
  ]
}

const projects = [vacation, exercise, health, house];

(0,_domChange_js__WEBPACK_IMPORTED_MODULE_0__.loadInterface)((0,_header_js__WEBPACK_IMPORTED_MODULE_1__.createHeader)());
(0,_domChange_js__WEBPACK_IMPORTED_MODULE_0__.loadInterface)((0,_navMenu_js__WEBPACK_IMPORTED_MODULE_2__.createNavMenu)());

(0,_domChange_js__WEBPACK_IMPORTED_MODULE_0__.loadContent)((0,_project_js__WEBPACK_IMPORTED_MODULE_3__.createProjectPage)(projects[0]));

/***/ }),

/***/ "./src/navMenu.js":
/*!************************!*\
  !*** ./src/navMenu.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createNavMenu": () => (/* binding */ createNavMenu),
/* harmony export */   "toggleNav": () => (/* binding */ toggleNav)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./src/index.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project.js */ "./src/project.js");
/* harmony import */ var _domChange_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domChange.js */ "./src/domChange.js");




const timeline = ['Today', 'This week', 'All tasks'];

function createNavMenu() {
  const navWrapper = document.createElement('div');
  navWrapper.setAttribute('id', 'nav-wrapper');

  const navMenu = document.createElement('section');
  navMenu.setAttribute('id', 'nav-menu');
  navWrapper.appendChild(navMenu);

  const navTimeline = document.createElement('ul');
  navTimeline.setAttribute('id', 'nav-timeline');
  navMenu.appendChild(navTimeline);

  timeline.forEach(time => {
    const li = document.createElement('li');
    navTimeline.appendChild(li);

    const button = document.createElement('button');
    button.classList.add('btn-menu', 'btn-flex');
    button.setAttribute('type', 'button');
    li.appendChild(button);

    const span1 = document.createElement('span');
    span1.textContent = time;
    button.appendChild(span1);

    const span2 = document.createElement('span');
    span2.textContent = '5';
    button.appendChild(span2);
  });

  const navProjects = document.createElement('ul');
  navProjects.setAttribute('id', 'nav-projects');
  navMenu.appendChild(navProjects);

  const h2 = document.createElement('h2');
  h2.textContent = 'Projects';
  navProjects.appendChild(h2);

  _index_js__WEBPACK_IMPORTED_MODULE_0__.projects.forEach(project => {
    const li = document.createElement('li');
    navProjects.appendChild(li);

    const button = document.createElement('button');
    button.classList.add('btn-menu', 'btn-flex');
    button.setAttribute('type', 'button');
    li.appendChild(button);

    const spanTitle = document.createElement('span');
    spanTitle.textContent = project.title;
    button.appendChild(spanTitle);

    const spanNumber = document.createElement('span');
    spanNumber.textContent = project.tasks.length;
    button.appendChild(spanNumber);
    
    button.addEventListener('click', () => (0,_domChange_js__WEBPACK_IMPORTED_MODULE_2__.loadContent)((0,_project_js__WEBPACK_IMPORTED_MODULE_1__.createProjectPage)(project)))
  });
  
  const btnAdd = document.createElement('button');
  btnAdd.classList.add('btn-menu', 'btn-add');
  btnAdd.setAttribute('type', 'button');
  navMenu.appendChild(btnAdd);

  const faPlus = document.createElement('i');
  faPlus.classList.add('fas', 'fa-plus');
  btnAdd.appendChild(faPlus);

  const text = document.createTextNode(' Add project');
  btnAdd.appendChild(text);

  return navWrapper;
}

function toggleNav() {
  document.body.classList.toggle('nav-positioner');
}



/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProjectPage": () => (/* binding */ createProjectPage)
/* harmony export */ });
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.js */ "./src/helpers.js");


function createProjectPage(project) {
  const main = document.createElement('main');

  const header = document.createElement('header');
  main.appendChild(header);

  const h2 = document.createElement('h2');
  h2.textContent = project.title;
  header.appendChild(h2);

  const btnOptions = document.createElement('button');
  btnOptions.setAttribute('type', 'button');
  btnOptions.setAttribute('aria-label', 'show-options');
  btnOptions.classList.add('btn-options');
  header.appendChild(btnOptions);

  const iconEllipsis = document.createElement('i');
  iconEllipsis.classList.add('fas', 'fa-ellipsis-h');
  btnOptions.appendChild(iconEllipsis);

  const progress = document.createElement('progress');
  progress.setAttribute('max', '100');
  const progressValue = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.countProgress)(project);
  progress.setAttribute('value', progressValue);
  progress.textContent = progressValue;
  main.appendChild(progress);

  const description = document.createElement('p');
  description.textContent = project.description;
  main.appendChild(description);

  const taskList = document.createElement('ul');
  taskList.classList.add('task-list');
  main.appendChild(taskList);

  project.tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.complete) li.classList.add('checked');
    if (task.priority) li.classList.add('priority');
    taskList.appendChild(li);

    const btnCheck = document.createElement('button');
    btnCheck.setAttribute('type', 'button');
    btnCheck.setAttribute('aria-label', 'complete-task');
    btnCheck.classList.add('btn-check');
    li.appendChild(btnCheck);

    const iconCheck = document.createElement('i');
    iconCheck.classList.add('fas', 'fa-check');
    btnCheck.appendChild(iconCheck);

    const taskTitle = document.createTextNode(task.title);
    li.appendChild(taskTitle);

    if (task.dueDate) {
      const date = document.createElement('span');
      date.classList.add('due-date');
      date.textContent = task.dueDate;
      li.appendChild(date);
    }
  });

  const btnAddTask = document.createElement('button');
  btnAddTask.setAttribute('type', 'button');
  btnAddTask.classList.add('btn-menu', 'btn-add');
  main.appendChild(btnAddTask);

  const iconPlus = document.createElement('i');
  iconPlus.classList.add('fas', 'fa-plus');
  btnAddTask.appendChild(iconPlus);

  const label = document.createTextNode('Add task');
  btnAddTask.appendChild(label);

  // const template = document.querySelector('.project-page');
  // let main = template.content.cloneNode(true);

  return main;
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2RvbUNoYW5nZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2hlYWRlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL25hdk1lbnUuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYeUM7O0FBRXpDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQW1DLGtEQUFTOztBQUU1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUDREO0FBQ2pCO0FBQ0U7QUFDSTs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTzs7QUFFUCw0REFBYSxDQUFDLHdEQUFZO0FBQzFCLDREQUFhLENBQUMsMERBQWE7O0FBRTNCLDBEQUFXLENBQUMsOERBQWlCLGU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZIUztBQUNXO0FBQ0o7O0FBRTdDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEVBQUUsdURBQWdCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwyQ0FBMkMsMERBQVcsQ0FBQyw4REFBaUI7QUFDeEUsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRjZDOztBQUU3QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsMERBQWE7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztVQ2hGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGxvYWRJbnRlcmZhY2UoZWxlbWVudCkge1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBsb2FkQ29udGVudChjb250ZW50KSB7XG4gIGNvbnN0IHByZXZpb3VzQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgaWYgKHByZXZpb3VzQ29udGVudCkge1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocHJldmlvdXNDb250ZW50KTtcbiAgfVxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25hdi1wb3NpdGlvbmVyJyk7XG59XG5cbmV4cG9ydCB7IGxvYWRJbnRlcmZhY2UsIGxvYWRDb250ZW50IH07IiwiaW1wb3J0IHsgdG9nZ2xlTmF2IH0gZnJvbSAnLi9uYXZNZW51LmpzJztcblxuZnVuY3Rpb24gY3JlYXRlSGVhZGVyKCkge1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgaGVhZGVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnYXBwLWhlYWRlcicpO1xuXG4gIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKGgxKTtcblxuICBjb25zdCBpY29uVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gIGljb25UaXRsZS5jbGFzc0xpc3QuYWRkKCdmYXInLCAnZmEtY2hlY2stc3F1YXJlJyk7XG4gIGgxLmFwcGVuZENoaWxkKGljb25UaXRsZSk7XG5cbiAgY29uc3QgaDFUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyBUby1kbyBMaXN0Jyk7XG4gIGgxLmFwcGVuZENoaWxkKGgxVGV4dCk7XG5cbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25hdi10b2dnbGVyJyk7XG4gIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAndG9nZ2xlLW1lbnUnKTtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XG5cbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlTmF2KTtcblxuICBjb25zdCBpY29uVG9nZ2xlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgaWNvblRvZ2dsZXIuY2xhc3NMaXN0LmFkZCgnZmFzJywgJ2ZhLWJhcnMnKTtcbiAgYnV0dG9uLmFwcGVuZENoaWxkKGljb25Ub2dnbGVyKTtcblxuICByZXR1cm4gaGVhZGVyO1xufVxuXG5leHBvcnQgeyBjcmVhdGVIZWFkZXIgfTsiLCJmdW5jdGlvbiBjb3VudFByb2dyZXNzKHByb2plY3QpIHtcbiAgbGV0IGNvbXBsZXRlZCA9IDA7XG4gIHByb2plY3QudGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICBpZiAodGFzay5jb21wbGV0ZSkgY29tcGxldGVkKys7XG4gIH0pO1xuICBjb25zdCBwcm9ncmVzcyA9IE1hdGgucm91bmQoY29tcGxldGVkIC8gcHJvamVjdC50YXNrcy5sZW5ndGggKiAxMDApO1xuICByZXR1cm4gcHJvZ3Jlc3M7XG59XG5cbmV4cG9ydCB7IGNvdW50UHJvZ3Jlc3MgfTsiLCJpbXBvcnQgeyBsb2FkSW50ZXJmYWNlLCBsb2FkQ29udGVudCB9IGZyb20gJy4vZG9tQ2hhbmdlLmpzJztcbmltcG9ydCB7IGNyZWF0ZUhlYWRlciB9IGZyb20gJy4vaGVhZGVyLmpzJztcbmltcG9ydCB7IGNyZWF0ZU5hdk1lbnUgfSBmcm9tICcuL25hdk1lbnUuanMnO1xuaW1wb3J0IHsgY3JlYXRlUHJvamVjdFBhZ2UgfSBmcm9tICcuL3Byb2plY3QuanMnO1xuXG5jb25zdCB2YWNhdGlvbiA9IHtcbiAgdGl0bGU6ICdWYWNhdGlvbiBpbiBSb21lJyxcbiAgZGVzY3JpcHRpb246ICdXZVxcJ2xsIGdvIGZyb20gSnVuZSAxNC0yMiBhbmQgdmlzaXQgUm9tZSwgU2llbmEgYW5kIEZsb3JlbmNlJywgXG4gIHRhc2tzOiBbXG4gICAge1xuICAgICAgdGl0bGU6ICdCb29rIGZsaWdodCcsXG4gICAgICBub3RlczogJycsXG4gICAgICBkdWVEYXRlOiAnU2VwIDI4JyxcbiAgICAgIHByaW9yaXR5OiAxLFxuICAgICAgY29tcGxldGU6IDEsXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ1JlYWQgYWJvdXQgdGhlIG1ldHJvJyxcbiAgICAgIG5vdGVzOiAnJyxcbiAgICAgIGR1ZURhdGU6ICdUb2RheScsXG4gICAgICBwcmlvcml0eTogMCxcbiAgICAgIGNvbXBsZXRlOiAwLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdCdXkgdHJhdmVsIGd1aWRlJyxcbiAgICAgIG5vdGVzOiAnJyxcbiAgICAgIGR1ZURhdGU6ICdTZXAgMTInLFxuICAgICAgcHJpb3JpdHk6IDAsXG4gICAgICBjb21wbGV0ZTogMSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnQm9vayBob3RlbCByb29tJyxcbiAgICAgIG5vdGVzOiAnJyxcbiAgICAgIGR1ZURhdGU6ICcnLFxuICAgICAgcHJpb3JpdHk6IDEsXG4gICAgICBjb21wbGV0ZTogMCxcbiAgICB9XG4gIF1cbn1cbmNvbnN0IGV4ZXJjaXNlID0ge1xuICB0aXRsZTogJ0V4ZXJjaXNlJyxcbiAgZGVzY3JpcHRpb246ICdQaGlzaWNhbCBleGVyY2lzZSBpcyBpbXBvcnRhbnQgZm9yIGdlbmVyYWwgd2VsbC1iZWluZycsIFxuICB0YXNrczogW1xuICAgIHtcbiAgICAgIHRpdGxlOiAnUHJhY3RpY2UgeW9nYScsXG4gICAgICBub3RlczogJ1ByYWN0aWNlIHlvZ2EgMyB0aW1lcyBwZXIgd2VlaycsXG4gICAgICBkdWVEYXRlOiAnJyxcbiAgICAgIHByaW9yaXR5OiAxLFxuICAgICAgY29tcGxldGU6IDAsXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0V4ZXJjaXNlIG9uIHRoZSBiYXInLFxuICAgICAgbm90ZXM6ICcnLFxuICAgICAgZHVlRGF0ZTogJycsXG4gICAgICBwcmlvcml0eTogMCxcbiAgICAgIGNvbXBsZXRlOiAwLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdEbyBiYWNrIGV4ZXJjaXNlcycsXG4gICAgICBub3RlczogJycsXG4gICAgICBkdWVEYXRlOiAnJyxcbiAgICAgIHByaW9yaXR5OiAwLFxuICAgICAgY29tcGxldGU6IDAsXG4gICAgfVxuICBdXG59XG5jb25zdCBoZWFsdGggPSB7XG4gIHRpdGxlOiAnSGVhbHRoJyxcbiAgZGVzY3JpcHRpb246ICdDYXJpbmcgZm9yIG15IGhlYWx0aCBsZWFkcyB0byBiZXR0ZXIgcXVhbGl0eSBvZiBsaWZlJywgXG4gIHRhc2tzOiBbXG4gICAge1xuICAgICAgdGl0bGU6ICdIYXZlIGhlYWx0aHkgZGlldCcsXG4gICAgICBub3RlczogJycsXG4gICAgICBkdWVEYXRlOiAnJyxcbiAgICAgIHByaW9yaXR5OiAwLFxuICAgICAgY29tcGxldGU6IDEsXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ1JlZHVjZSBzdWdhciBjb25zdW1wdGlvbicsXG4gICAgICBub3RlczogJycsXG4gICAgICBkdWVEYXRlOiAnJyxcbiAgICAgIHByaW9yaXR5OiAwLFxuICAgICAgY29tcGxldGU6IDAsXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0RyaW5rIGxlc3MgYWxjb2hvbGUnLFxuICAgICAgbm90ZXM6ICcnLFxuICAgICAgZHVlRGF0ZTogJycsXG4gICAgICBwcmlvcml0eTogMCxcbiAgICAgIGNvbXBsZXRlOiAxLFxuICAgIH1cbiAgXVxufVxuY29uc3QgaG91c2UgPSB7XG4gIHRpdGxlOiAnSG91c2UnLFxuICBkZXNjcmlwdGlvbjogJ0NsZWFuIHRoZSBob3VzZSBvbmNlIGV2ZXJ5IHdlZWsnLCBcbiAgdGFza3M6IFtcbiAgICB7XG4gICAgICB0aXRsZTogJ0NsZWFuIHRoZSBob3VzZScsXG4gICAgICBub3RlczogJ09uY2UgcGVyIHdlZWsnLFxuICAgICAgZHVlRGF0ZTogJycsXG4gICAgICBwcmlvcml0eTogMCxcbiAgICAgIGNvbXBsZXRlOiAxLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdSZXBhaXIgYnJva2VuIHRhcCcsXG4gICAgICBub3RlczogJycsXG4gICAgICBkdWVEYXRlOiAnJyxcbiAgICAgIHByaW9yaXR5OiAwLFxuICAgICAgY29tcGxldGU6IDAsXG4gICAgfVxuICBdXG59XG5cbmV4cG9ydCBjb25zdCBwcm9qZWN0cyA9IFt2YWNhdGlvbiwgZXhlcmNpc2UsIGhlYWx0aCwgaG91c2VdO1xuXG5sb2FkSW50ZXJmYWNlKGNyZWF0ZUhlYWRlcigpKTtcbmxvYWRJbnRlcmZhY2UoY3JlYXRlTmF2TWVudSgpKTtcblxubG9hZENvbnRlbnQoY3JlYXRlUHJvamVjdFBhZ2UocHJvamVjdHNbMF0pKTsiLCJpbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gJy4vaW5kZXguanMnO1xuaW1wb3J0IHsgY3JlYXRlUHJvamVjdFBhZ2UgfSBmcm9tICcuL3Byb2plY3QuanMnO1xuaW1wb3J0IHsgbG9hZENvbnRlbnQgfSBmcm9tICcuL2RvbUNoYW5nZS5qcyc7XG5cbmNvbnN0IHRpbWVsaW5lID0gWydUb2RheScsICdUaGlzIHdlZWsnLCAnQWxsIHRhc2tzJ107XG5cbmZ1bmN0aW9uIGNyZWF0ZU5hdk1lbnUoKSB7XG4gIGNvbnN0IG5hdldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbmF2V3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25hdi13cmFwcGVyJyk7XG5cbiAgY29uc3QgbmF2TWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgbmF2TWVudS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25hdi1tZW51Jyk7XG4gIG5hdldyYXBwZXIuYXBwZW5kQ2hpbGQobmF2TWVudSk7XG5cbiAgY29uc3QgbmF2VGltZWxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICBuYXZUaW1lbGluZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25hdi10aW1lbGluZScpO1xuICBuYXZNZW51LmFwcGVuZENoaWxkKG5hdlRpbWVsaW5lKTtcblxuICB0aW1lbGluZS5mb3JFYWNoKHRpbWUgPT4ge1xuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBuYXZUaW1lbGluZS5hcHBlbmRDaGlsZChsaSk7XG5cbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuLW1lbnUnLCAnYnRuLWZsZXgnKTtcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIGxpLmFwcGVuZENoaWxkKGJ1dHRvbik7XG5cbiAgICBjb25zdCBzcGFuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBzcGFuMS50ZXh0Q29udGVudCA9IHRpbWU7XG4gICAgYnV0dG9uLmFwcGVuZENoaWxkKHNwYW4xKTtcblxuICAgIGNvbnN0IHNwYW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHNwYW4yLnRleHRDb250ZW50ID0gJzUnO1xuICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzcGFuMik7XG4gIH0pO1xuXG4gIGNvbnN0IG5hdlByb2plY3RzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgbmF2UHJvamVjdHMuc2V0QXR0cmlidXRlKCdpZCcsICduYXYtcHJvamVjdHMnKTtcbiAgbmF2TWVudS5hcHBlbmRDaGlsZChuYXZQcm9qZWN0cyk7XG5cbiAgY29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICBoMi50ZXh0Q29udGVudCA9ICdQcm9qZWN0cyc7XG4gIG5hdlByb2plY3RzLmFwcGVuZENoaWxkKGgyKTtcblxuICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBuYXZQcm9qZWN0cy5hcHBlbmRDaGlsZChsaSk7XG5cbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuLW1lbnUnLCAnYnRuLWZsZXgnKTtcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIGxpLmFwcGVuZENoaWxkKGJ1dHRvbik7XG5cbiAgICBjb25zdCBzcGFuVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgc3BhblRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcbiAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3BhblRpdGxlKTtcblxuICAgIGNvbnN0IHNwYW5OdW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgc3Bhbk51bWJlci50ZXh0Q29udGVudCA9IHByb2plY3QudGFza3MubGVuZ3RoO1xuICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzcGFuTnVtYmVyKTtcbiAgICBcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBsb2FkQ29udGVudChjcmVhdGVQcm9qZWN0UGFnZShwcm9qZWN0KSkpXG4gIH0pO1xuICBcbiAgY29uc3QgYnRuQWRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGJ0bkFkZC5jbGFzc0xpc3QuYWRkKCdidG4tbWVudScsICdidG4tYWRkJyk7XG4gIGJ0bkFkZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gIG5hdk1lbnUuYXBwZW5kQ2hpbGQoYnRuQWRkKTtcblxuICBjb25zdCBmYVBsdXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gIGZhUGx1cy5jbGFzc0xpc3QuYWRkKCdmYXMnLCAnZmEtcGx1cycpO1xuICBidG5BZGQuYXBwZW5kQ2hpbGQoZmFQbHVzKTtcblxuICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyBBZGQgcHJvamVjdCcpO1xuICBidG5BZGQuYXBwZW5kQ2hpbGQodGV4dCk7XG5cbiAgcmV0dXJuIG5hdldyYXBwZXI7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZU5hdigpIHtcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCduYXYtcG9zaXRpb25lcicpO1xufVxuXG5leHBvcnQgeyBjcmVhdGVOYXZNZW51LCB0b2dnbGVOYXYgfTsiLCJpbXBvcnQgeyBjb3VudFByb2dyZXNzIH0gZnJvbSAnLi9oZWxwZXJzLmpzJztcblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdFBhZ2UocHJvamVjdCkge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWFpbicpO1xuXG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICBtYWluLmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgY29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICBoMi50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XG4gIGhlYWRlci5hcHBlbmRDaGlsZChoMik7XG5cbiAgY29uc3QgYnRuT3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBidG5PcHRpb25zLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgYnRuT3B0aW9ucy5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnc2hvdy1vcHRpb25zJyk7XG4gIGJ0bk9wdGlvbnMuY2xhc3NMaXN0LmFkZCgnYnRuLW9wdGlvbnMnKTtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKGJ0bk9wdGlvbnMpO1xuXG4gIGNvbnN0IGljb25FbGxpcHNpcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgaWNvbkVsbGlwc2lzLmNsYXNzTGlzdC5hZGQoJ2ZhcycsICdmYS1lbGxpcHNpcy1oJyk7XG4gIGJ0bk9wdGlvbnMuYXBwZW5kQ2hpbGQoaWNvbkVsbGlwc2lzKTtcblxuICBjb25zdCBwcm9ncmVzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Byb2dyZXNzJyk7XG4gIHByb2dyZXNzLnNldEF0dHJpYnV0ZSgnbWF4JywgJzEwMCcpO1xuICBjb25zdCBwcm9ncmVzc1ZhbHVlID0gY291bnRQcm9ncmVzcyhwcm9qZWN0KTtcbiAgcHJvZ3Jlc3Muc2V0QXR0cmlidXRlKCd2YWx1ZScsIHByb2dyZXNzVmFsdWUpO1xuICBwcm9ncmVzcy50ZXh0Q29udGVudCA9IHByb2dyZXNzVmFsdWU7XG4gIG1haW4uYXBwZW5kQ2hpbGQocHJvZ3Jlc3MpO1xuXG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QuZGVzY3JpcHRpb247XG4gIG1haW4uYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gIGNvbnN0IHRhc2tMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgdGFza0xpc3QuY2xhc3NMaXN0LmFkZCgndGFzay1saXN0Jyk7XG4gIG1haW4uYXBwZW5kQ2hpbGQodGFza0xpc3QpO1xuXG4gIHByb2plY3QudGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgaWYgKHRhc2suY29tcGxldGUpIGxpLmNsYXNzTGlzdC5hZGQoJ2NoZWNrZWQnKTtcbiAgICBpZiAodGFzay5wcmlvcml0eSkgbGkuY2xhc3NMaXN0LmFkZCgncHJpb3JpdHknKTtcbiAgICB0YXNrTGlzdC5hcHBlbmRDaGlsZChsaSk7XG5cbiAgICBjb25zdCBidG5DaGVjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGJ0bkNoZWNrLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICBidG5DaGVjay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnY29tcGxldGUtdGFzaycpO1xuICAgIGJ0bkNoZWNrLmNsYXNzTGlzdC5hZGQoJ2J0bi1jaGVjaycpO1xuICAgIGxpLmFwcGVuZENoaWxkKGJ0bkNoZWNrKTtcblxuICAgIGNvbnN0IGljb25DaGVjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICBpY29uQ2hlY2suY2xhc3NMaXN0LmFkZCgnZmFzJywgJ2ZhLWNoZWNrJyk7XG4gICAgYnRuQ2hlY2suYXBwZW5kQ2hpbGQoaWNvbkNoZWNrKTtcblxuICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRhc2sudGl0bGUpO1xuICAgIGxpLmFwcGVuZENoaWxkKHRhc2tUaXRsZSk7XG5cbiAgICBpZiAodGFzay5kdWVEYXRlKSB7XG4gICAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgZGF0ZS5jbGFzc0xpc3QuYWRkKCdkdWUtZGF0ZScpO1xuICAgICAgZGF0ZS50ZXh0Q29udGVudCA9IHRhc2suZHVlRGF0ZTtcbiAgICAgIGxpLmFwcGVuZENoaWxkKGRhdGUpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgYnRuQWRkVGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBidG5BZGRUYXNrLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgYnRuQWRkVGFzay5jbGFzc0xpc3QuYWRkKCdidG4tbWVudScsICdidG4tYWRkJyk7XG4gIG1haW4uYXBwZW5kQ2hpbGQoYnRuQWRkVGFzayk7XG5cbiAgY29uc3QgaWNvblBsdXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gIGljb25QbHVzLmNsYXNzTGlzdC5hZGQoJ2ZhcycsICdmYS1wbHVzJyk7XG4gIGJ0bkFkZFRhc2suYXBwZW5kQ2hpbGQoaWNvblBsdXMpO1xuXG4gIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ0FkZCB0YXNrJyk7XG4gIGJ0bkFkZFRhc2suYXBwZW5kQ2hpbGQobGFiZWwpO1xuXG4gIC8vIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtcGFnZScpO1xuICAvLyBsZXQgbWFpbiA9IHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuXG4gIHJldHVybiBtYWluO1xufVxuXG5leHBvcnQgeyBjcmVhdGVQcm9qZWN0UGFnZSB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9