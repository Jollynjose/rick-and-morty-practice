import { getCharacterById } from '../api/rickMortyApi.js';
import { onShowDetail, onRemoveDetail } from '../utils/screenFunctions.mjs';


export const Details = (id = 1) => {
  getCharacterById(id).then((value) => {
    onShowDetail();
    document
      .querySelector('.list')
      .addEventListener('click', onRemoveDetail, { once: true });
  });
};
