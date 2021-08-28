import createHeader from './header';
import { prepareUsersData, configureDataSave } from './data';
import { loadContent } from './domFunctions';
import { createNavMenu } from './navMenu';
import createTodayPage from './today';

prepareUsersData();
configureDataSave();

document.body.append(createHeader(), createNavMenu());

loadContent(createTodayPage);
