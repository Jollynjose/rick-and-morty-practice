import { Card } from '../components/Card.js';
import { getListCharacters } from '../api/rickMortyApi.js';

export const generateList = async (page = 1) => {
  const characters = await getListCharacters(page);
  characters.forEach((character) => {
    Card(character);
  });
};
