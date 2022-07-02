import { getCharacterById } from '../api/rickMortyApi.js';
import { showDetails } from '../utils/screenFunctions.mjs';

export const Details = (id = 1) => {
  getCharacterById(id).then((value) => {
    showDetails();
    document.querySelector('.list').addEventListener('click', (event) => {
      event.stopPropagation();
      showDetails();
    });
  });
};
