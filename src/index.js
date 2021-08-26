import { prepareUsersData, configureDataSave } from './data';
import { loadInterface, loadContent } from './domChange';
import { createHeader } from './header';
import { createNavMenu } from './navMenu';
import { createTodayPage } from './today';

prepareUsersData();
configureDataSave();

loadInterface(createHeader());
loadInterface(createNavMenu());

loadContent(createTodayPage);
