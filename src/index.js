import { loadInterface, loadContent } from './domChange';
import { createHeader } from './header';
import { createNavMenu } from './navMenu';
import { createTodayPage } from './today';

loadInterface(createHeader());
loadInterface(createNavMenu());

loadContent(createTodayPage);
