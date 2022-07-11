import { getCharacterById } from '../api/rickMortyApi.js';
import {
  onShowDetail,
  onRemoveDetail,
  setPositionDetail,
} from '../utils/screenFunctions.js';
// TODO: USE TYPE TEMPLATES AND RENDER FUNCTION

export const Details = async (id = 1) => {
  const character = await getCharacterById(id);

  const template = document.getElementById('detail--template');
  const detailNodeTemplate = document.importNode(template.content, true);

  const [detailDiv, detailButton] = detailNodeTemplate.children;

  const [figure, ul] = detailDiv.children;
  const [img, figcaption] = figure.children;
  const liItemsNodes = ul.children;
  
  img.src = character.image;
  img.alt = character.name;
  figcaption.innerText = character.name;
  
  const liItems = [...liItemsNodes];
  liItems.forEach((li) => {
    const information = li.textContent.trim();
    const informationToLowerCase = information.toLowerCase();
    const key = informationToLowerCase.slice(0, -1);

    li.innerText += character.getInfo(key);
  });
  
  const detail = document.querySelector('.detail');
  const listSection = document.querySelector('.list');

  detail.appendChild(detailNodeTemplate);
  detail.style.display = 'flex';

  detailButton.addEventListener('click', onRemoveDetail, { once: true });
  listSection.addEventListener('click', onRemoveDetail, { once: true });

  onShowDetail();
  setPositionDetail();
};
