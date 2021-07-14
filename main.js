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
/* harmony export */   "loadContent": () => (/* binding */ loadContent)
/* harmony export */ });
function loadContent(content) {
  const previousContent = document.getElementById('content');
  if (previousContent) {
    document.body.removeChild(previousContent);
  }
  document.body.appendChild(content);
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
/* harmony import */ var _mainMenu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mainMenu.js */ "./src/mainMenu.js");



const vacation = {
  title: 'Vacation in Rome',
  tasks: [
    {
      title: 'Book flight',
      description: '',
      dueDate: '',
      priority: 1,
    },
    {
      title: 'Read about the metro',
      description: '',
      dueDate: '',
      priority: 0,
    },
    {
      title: 'Buy travel guide',
      description: '',
      dueDate: '',
      priority: 0,
    },
    {
      title: 'Book hotel room',
      description: '',
      dueDate: '',
      priority: 0,
    }
  ]
}
const exercise = {
  title: 'Exercise',
  tasks: [
    {
      title: 'Practice yoga',
      description: 'Practice yoga 3 times per week',
      dueDate: '',
      priority: 1,
    },
    {
      title: 'Exercise on the bar',
      description: '',
      dueDate: '',
      priority: 0,
    },
    {
      title: 'Do back exercises',
      description: '',
      dueDate: '',
      priority: 0,
    }
  ]
}
const health = {
  title: 'Health',
  tasks: [
    {
      title: 'Have healthy diet',
      description: '',
      dueDate: '',
      priority: 0,
    },
    {
      title: 'Reduce sugar consumption',
      description: '',
      dueDate: '',
      priority: 0,
    },
    {
      title: 'Drink less alcohole',
      description: '',
      dueDate: '',
      priority: 0,
    }
  ]
}
const house = {
  title: 'House',
  tasks: [
    {
      title: 'Clean the house',
      description: 'Once per week',
      dueDate: '',
      priority: 0,
    },
    {
      title: 'Repair broken tap',
      description: '',
      dueDate: '',
      priority: 0,
    }
  ]
}

const projects = [vacation, exercise, health, house];

(0,_domChange_js__WEBPACK_IMPORTED_MODULE_0__.loadContent)((0,_mainMenu_js__WEBPACK_IMPORTED_MODULE_1__.createMenu)());

/***/ }),

/***/ "./src/mainMenu.js":
/*!*************************!*\
  !*** ./src/mainMenu.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMenu": () => (/* binding */ createMenu)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./src/index.js");


const timeline = ['Today', 'This week', 'All tasks'];

function createMenu() {
  const menu = document.createElement('div');

  const header = document.createElement('header');
  menu.appendChild(header);

  const h1 = document.createElement('h1');
  h1.textContent = 'To Do List';
  header.appendChild(h1);

  const main = document.createElement('main');
  menu.appendChild(main);

  const navMenu = document.createElement('div');
  navMenu.setAttribute('id', 'nav-menu');
  main.appendChild(navMenu);

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
  });

  return menu;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2RvbUNoYW5nZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbWFpbk1lbnUuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ042QztBQUNGOztBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTzs7QUFFUCwwREFBVyxDQUFDLHdEQUFVLEk7Ozs7Ozs7Ozs7Ozs7OztBQ2xHZ0I7O0FBRXRDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEVBQUUsdURBQWdCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQztBQUNBLEdBQUc7O0FBRUg7QUFDQTs7Ozs7Ozs7VUN0RUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBsb2FkQ29udGVudChjb250ZW50KSB7XG4gIGNvbnN0IHByZXZpb3VzQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jyk7XG4gIGlmIChwcmV2aW91c0NvbnRlbnQpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHByZXZpb3VzQ29udGVudCk7XG4gIH1cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250ZW50KTtcbn1cblxuZXhwb3J0IHsgbG9hZENvbnRlbnQgfTsiLCJpbXBvcnQgeyBsb2FkQ29udGVudCB9IGZyb20gJy4vZG9tQ2hhbmdlLmpzJztcbmltcG9ydCB7IGNyZWF0ZU1lbnUgfSBmcm9tICcuL21haW5NZW51LmpzJztcblxuY29uc3QgdmFjYXRpb24gPSB7XG4gIHRpdGxlOiAnVmFjYXRpb24gaW4gUm9tZScsXG4gIHRhc2tzOiBbXG4gICAge1xuICAgICAgdGl0bGU6ICdCb29rIGZsaWdodCcsXG4gICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICBkdWVEYXRlOiAnJyxcbiAgICAgIHByaW9yaXR5OiAxLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdSZWFkIGFib3V0IHRoZSBtZXRybycsXG4gICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICBkdWVEYXRlOiAnJyxcbiAgICAgIHByaW9yaXR5OiAwLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdCdXkgdHJhdmVsIGd1aWRlJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgIGR1ZURhdGU6ICcnLFxuICAgICAgcHJpb3JpdHk6IDAsXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0Jvb2sgaG90ZWwgcm9vbScsXG4gICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICBkdWVEYXRlOiAnJyxcbiAgICAgIHByaW9yaXR5OiAwLFxuICAgIH1cbiAgXVxufVxuY29uc3QgZXhlcmNpc2UgPSB7XG4gIHRpdGxlOiAnRXhlcmNpc2UnLFxuICB0YXNrczogW1xuICAgIHtcbiAgICAgIHRpdGxlOiAnUHJhY3RpY2UgeW9nYScsXG4gICAgICBkZXNjcmlwdGlvbjogJ1ByYWN0aWNlIHlvZ2EgMyB0aW1lcyBwZXIgd2VlaycsXG4gICAgICBkdWVEYXRlOiAnJyxcbiAgICAgIHByaW9yaXR5OiAxLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdFeGVyY2lzZSBvbiB0aGUgYmFyJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgIGR1ZURhdGU6ICcnLFxuICAgICAgcHJpb3JpdHk6IDAsXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0RvIGJhY2sgZXhlcmNpc2VzJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgIGR1ZURhdGU6ICcnLFxuICAgICAgcHJpb3JpdHk6IDAsXG4gICAgfVxuICBdXG59XG5jb25zdCBoZWFsdGggPSB7XG4gIHRpdGxlOiAnSGVhbHRoJyxcbiAgdGFza3M6IFtcbiAgICB7XG4gICAgICB0aXRsZTogJ0hhdmUgaGVhbHRoeSBkaWV0JyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgIGR1ZURhdGU6ICcnLFxuICAgICAgcHJpb3JpdHk6IDAsXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ1JlZHVjZSBzdWdhciBjb25zdW1wdGlvbicsXG4gICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICBkdWVEYXRlOiAnJyxcbiAgICAgIHByaW9yaXR5OiAwLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdEcmluayBsZXNzIGFsY29ob2xlJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgIGR1ZURhdGU6ICcnLFxuICAgICAgcHJpb3JpdHk6IDAsXG4gICAgfVxuICBdXG59XG5jb25zdCBob3VzZSA9IHtcbiAgdGl0bGU6ICdIb3VzZScsXG4gIHRhc2tzOiBbXG4gICAge1xuICAgICAgdGl0bGU6ICdDbGVhbiB0aGUgaG91c2UnLFxuICAgICAgZGVzY3JpcHRpb246ICdPbmNlIHBlciB3ZWVrJyxcbiAgICAgIGR1ZURhdGU6ICcnLFxuICAgICAgcHJpb3JpdHk6IDAsXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ1JlcGFpciBicm9rZW4gdGFwJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgIGR1ZURhdGU6ICcnLFxuICAgICAgcHJpb3JpdHk6IDAsXG4gICAgfVxuICBdXG59XG5cbmV4cG9ydCBjb25zdCBwcm9qZWN0cyA9IFt2YWNhdGlvbiwgZXhlcmNpc2UsIGhlYWx0aCwgaG91c2VdO1xuXG5sb2FkQ29udGVudChjcmVhdGVNZW51KCkpOyIsImltcG9ydCB7IHByb2plY3RzIH0gZnJvbSAnLi9pbmRleC5qcyc7XG5cbmNvbnN0IHRpbWVsaW5lID0gWydUb2RheScsICdUaGlzIHdlZWsnLCAnQWxsIHRhc2tzJ107XG5cbmZ1bmN0aW9uIGNyZWF0ZU1lbnUoKSB7XG4gIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgbWVudS5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgaDEudGV4dENvbnRlbnQgPSAnVG8gRG8gTGlzdCc7XG4gIGhlYWRlci5hcHBlbmRDaGlsZChoMSk7XG5cbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcbiAgbWVudS5hcHBlbmRDaGlsZChtYWluKTtcblxuICBjb25zdCBuYXZNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG5hdk1lbnUuc2V0QXR0cmlidXRlKCdpZCcsICduYXYtbWVudScpO1xuICBtYWluLmFwcGVuZENoaWxkKG5hdk1lbnUpO1xuXG4gIGNvbnN0IG5hdlRpbWVsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgbmF2VGltZWxpbmUuc2V0QXR0cmlidXRlKCdpZCcsICduYXYtdGltZWxpbmUnKTtcbiAgbmF2TWVudS5hcHBlbmRDaGlsZChuYXZUaW1lbGluZSk7XG5cbiAgdGltZWxpbmUuZm9yRWFjaCh0aW1lID0+IHtcbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgbmF2VGltZWxpbmUuYXBwZW5kQ2hpbGQobGkpO1xuXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bi1tZW51JywgJ2J0bi1mbGV4Jyk7XG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICBsaS5hcHBlbmRDaGlsZChidXR0b24pO1xuXG4gICAgY29uc3Qgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgc3BhbjEudGV4dENvbnRlbnQgPSB0aW1lO1xuICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzcGFuMSk7XG5cbiAgICBjb25zdCBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBzcGFuMi50ZXh0Q29udGVudCA9ICc1JztcbiAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3BhbjIpO1xuICB9KTtcblxuICBjb25zdCBuYXZQcm9qZWN0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIG5hdlByb2plY3RzLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmF2LXByb2plY3RzJyk7XG4gIG5hdk1lbnUuYXBwZW5kQ2hpbGQobmF2UHJvamVjdHMpO1xuXG4gIGNvbnN0IGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgaDIudGV4dENvbnRlbnQgPSAnUHJvamVjdHMnO1xuICBuYXZQcm9qZWN0cy5hcHBlbmRDaGlsZChoMik7XG5cbiAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgbmF2UHJvamVjdHMuYXBwZW5kQ2hpbGQobGkpO1xuXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bi1tZW51JywgJ2J0bi1mbGV4Jyk7XG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICBsaS5hcHBlbmRDaGlsZChidXR0b24pO1xuXG4gICAgY29uc3Qgc3BhblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHNwYW5UaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XG4gICAgYnV0dG9uLmFwcGVuZENoaWxkKHNwYW5UaXRsZSk7XG5cbiAgICBjb25zdCBzcGFuTnVtYmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHNwYW5OdW1iZXIudGV4dENvbnRlbnQgPSBwcm9qZWN0LnRhc2tzLmxlbmd0aDtcbiAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3Bhbk51bWJlcik7ICBcbiAgfSk7XG5cbiAgcmV0dXJuIG1lbnU7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZU1lbnUgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==