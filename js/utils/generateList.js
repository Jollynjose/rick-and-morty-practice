import { Card } from '../components/Card.js';
import { getListCharacters } from '../api/rickMortyApi.js';

export const generateList = async (page = 1) => {
  const list = document.querySelector('.list__items');
  const characters = await getListCharacters(page);
  characters.forEach((character) => {
    list.appendChild(Card(character));
  });
};
