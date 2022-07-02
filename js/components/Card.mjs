import { Details } from './Details.mjs';

export const Card = (character) => {
  //creating card node
  const card = document.createElement('article');
  card.className = 'card';
  //creating title and status node
  const title = document.createElement('h3');
  title.textContent = character.name;
  title.className = 'card__info__title';
  const status = document.createElement('h6');
  status.textContent = `${character.species}-${character.status}`;
  status.className = 'card__info__status';
  //creating info column
  const div = document.createElement('div');
  div.className = 'card__info';
  div.appendChild(title);
  div.appendChild(status);
  //creating img node
  const img = document.createElement('img');
  img.src = character.image;
  img.alt = `${character.name}-image`;
  // creating figure node and appending img
  const figure = document.createElement('figure');
  figure.appendChild(img);
  figure.className = 'card__figure';
  // adding event listener on card
  card.addEventListener('click', () => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    Details();
  });
  // appending nodes on card
  const nodes = [figure, div];
  nodes.forEach((value) => {
    card.appendChild(value);
  });

  return card;
};
