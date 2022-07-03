import { generateList } from './generateList.mjs';

export const moreButtonEvent = () => {
  const button = document.querySelector('.button__more');
  let page = 1;
  button.addEventListener('click', () => {
    page += 1;
    generateList(page);
  });
};
