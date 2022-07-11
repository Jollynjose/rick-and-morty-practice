import { randomPic } from './utils/randomPic.js';
import { generateList } from './utils/generateList.js';
import { moreButtonEvent } from './utils/listeners.js';
const path = window.location.pathname || '';
switch (path) {
  case '/pages/list.html':
    await generateList();
    await moreButtonEvent();
    break;
  case '/':
  case '/index.html':
  case '/pages/about.html':
    await randomPic();
    break;
  default:
    break;
}
