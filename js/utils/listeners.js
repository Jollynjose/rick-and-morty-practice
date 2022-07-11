import { generateList } from './generateList.js';
import { getCountByCharacters } from '../api/rickMortyApi.js';

export const moreButtonEvent = async () => {
  const button = document.querySelector('.list__more--button');
  let page = 1;
  button.addEventListener('click', async () => {
    page += 1;
    generateList(page);
    const count = await getCountByCharacters();
    const list = document.querySelector('.list__items');
    const totalItems = list.childElementCount - 1;
    const isButtonDisable = totalItems === count;
    button.disabled = isButtonDisable;
  });
};
