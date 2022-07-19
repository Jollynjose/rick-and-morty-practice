import './css/index.css';
import { CardList, RandomImage } from './js/components';

window.addEventListener('load', async () => {
  const path = window.location.pathname || '';
  switch (path) {
    case '/list.html':
      await CardList();
      break;
    case '/about.html':
    case '/home.html':
      await RandomImage();
      break;
    default:
      break;
  }
});