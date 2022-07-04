import { Details } from './Details.mjs';
import { setPositionDetail } from '../utils/screenFunctions.mjs';

export const Card = (character) => {
  //creating card node
  const card = document.createElement('article');
  card.className = 'card';
  //creating title and status node
  const title = document.createElement('h3');
  title.textContent = character.name;
  title.className = 'card__info__title';
  const info = document.createElement('h6');
  info.textContent = `${character.species}-${character.status}`;

  const isAlive =
    character.status === 'Alive'
      ? 'green'
      : character.status === 'Dead'
      ? 'red'
      : 'grey';

  info.className = 'card__info__status';
  info.style.color = isAlive;
  //creating info column
  const div = document.createElement('div');
  div.className = 'card__info';
  //inserting info
  div.appendChild(title);
  div.appendChild(info);
  //creating img node
  const img = document.createElement('img');
  img.src = character.image;
  img.alt = `${character.name}-image`;
  // creating figure node and appending img
  const figure = document.createElement('figure');
  figure.appendChild(img);
  figure.className = 'card__figure';
  // adding event listener on card with details
  card.addEventListener('click', () => {
    Details(character.id);
  });
  // appending nodes on card
  const nodes = [figure, div];
  nodes.forEach((value) => {
    card.appendChild(value);
  });

  return card;
};
