import { randomPic } from './utils/randomPic.mjs';
import { generateList } from './utils/generateList.mjs';
import { moreButtonEvent } from './utils/listeners.mjs';

const path = window.location.pathname || '';
switch (path) {
  case '/pages/list.html':
    generateList();
    moreButtonEvent();
    break;
  case '/':
  case '/index.html':
  case '/pages/about.html':
    randomPic();
    break;
  default:
    break;
}
