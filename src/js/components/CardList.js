import { Card, Detail } from './';
import { getListCharacters, getCountByCharacters } from '../api/rickMortyApi';

const onAddDetail = () => {
  const list = document.querySelector('.list');
  if (list) {
    list.addEventListener('click', async (e) => {
      const clicked = e.target.closest('article');
      if (clicked?.classList.contains('card')) {
        const id = clicked.getAttribute('id');
        await Detail(+id);
      }
    });
  }
};

const addCharacters = () => {
  const loader = document.querySelector('.loader');
  let page = 1;
  if (loader) {
    window.addEventListener('scroll', async () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const bottomScroll = scrollTop + clientHeight;
      if (bottomScroll >= scrollHeight) {
        loader.classList.toggle('show');
        const count = await getCountByCharacters();
        const list = document.querySelector('.list__items');
        const totalItems = list.childElementCount - 1;

        if (totalItems !== count) {
          await CardList(++page);
        }
        loader.classList.toggle('show');
      }
    });
  }
};

export const CardList = async (page = 1) => {
  const characters = await getListCharacters(page);
  characters.forEach((character) => {
    Card(character);
  });
};

addCharacters();
onAddDetail();
