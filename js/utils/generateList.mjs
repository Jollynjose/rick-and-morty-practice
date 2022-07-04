import { Card } from '../components/Card.mjs';
import { getListCharacters } from '../api/rickMortyApi.js';

export const generateList = (page = 1) => {
  const list = document.querySelector('.list__items');
  getListCharacters(page).then((characters) => {
    characters.forEach((character) => {
      list.appendChild(Card(character));
    });
  });
};
