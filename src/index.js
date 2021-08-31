import createHeader from './header';
import { prepareUsersData, configureDataSave } from './data';
import { loadContent } from './domFunctions';
import { createNavMenu } from './navMenu';
import createTodayPage from './today';
import './styles/normalize.css';
import './styles/style.css';
import './styles/dark.css';

prepareUsersData();
configureDataSave();

document.body.append(createHeader(), createNavMenu());

loadContent(createTodayPage);
