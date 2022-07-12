import { generateList } from './generateList.js';
import { getCountByCharacters } from '../api/rickMortyApi.js';

export const moreCharactersEvent = async () => {
  const loader = document.querySelector('.loader');
  let page = 1;
  window.addEventListener('scroll', async () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const bottomScroll = scrollTop + clientHeight;
    if (bottomScroll >= scrollHeight ) {
      loader.style.display = 'block';
      const count = await getCountByCharacters();
      const list = document.querySelector('.list__items');
      const totalItems = list.childElementCount - 1;
      const areMoreChracters = totalItems === count;
      if (!areMoreChracters) {
        page++;
        await generateList(page);
      }
      loader.style.display = 'none';
    }
  });
};
