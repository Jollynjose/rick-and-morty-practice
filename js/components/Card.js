import { Details } from './Details.js';
export const Card = (character) => {
  const template = document.getElementById('card--template');
  const cardNodeTemplate = document.importNode(template.content, true);

  const [cardArticle] = cardNodeTemplate.children;
  const [cardFigure, cardDiv] = cardArticle.children;

  const [cardFigureImg] = cardFigure.children;
  const [cardDivH3, cardDivH6] = cardDiv.children;

  cardFigureImg.src = character.image;
  cardFigureImg.alt = character.name;

  const isAlive =
    character.status === 'Alive'
      ? 'green'
      : character.status === 'Dead'
      ? 'red'
      : 'grey';

  cardDivH3.innerHTML = character.name;
  cardDivH6.innerHTML = `${character.species}-${character.status}`;
  cardDivH6.style.color = isAlive;

  document.querySelector('.list__items').appendChild(cardNodeTemplate);

  cardArticle.addEventListener('click', async () => {
    await Details(character.id);
  });
};
