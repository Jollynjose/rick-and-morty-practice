import { generateList } from './generateList.mjs';
import { getCountByCharacters } from '../api/rickMortyApi.js';

export const moreButtonEvent = () => {
  const button = document.querySelector('.list__more--button');
  let page = 1;
  button.addEventListener('click', () => {
    page += 1;
    generateList(page);
    getCountByCharacters().then((count) => {
      const list = document.querySelector('.list__more');
      const isButtonDisable = list.childElementCount === count;
      button.disabled = isButtonDisable;
    });
  });
};
