import { loadInterface, loadContent } from './domChange.js';
import { createHeader } from './header.js';
import { createNavMenu } from './navMenu.js';
import { createProjectPage } from './project.js';
import { projects } from './data.js';


loadInterface(createHeader());
loadInterface(createNavMenu());

loadContent(createProjectPage(projects[0]));