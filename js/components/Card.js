import { Details } from './Details.js';
export const Card = (character) => {
  const article = document.createElement('article');
  article.classList.add('card');

  const template = document.getElementById('card--template');
  const characterCard = document.importNode(template.content, true);

  const characterCardFigure = characterCard.querySelector('.card__figure');
  const characterCardImg = characterCard.querySelector('img');
  const characterCardH3 = characterCard.querySelector('.card__info__name');
  const characterCardH6 = characterCard.querySelector('.card__info__status');
  const characterCardDiv = characterCard.querySelector('.card__info');

  characterCardImg.src = character.image;
  characterCard.alt = character.name;
  characterCardFigure.appendChild(characterCardImg);

  const isAlive =
    character.status === 'Alive'
      ? 'green'
      : character.status === 'Dead'
      ? 'red'
      : 'grey';

  characterCardH3.innerHTML = character.name;
  characterCardH6.innerHTML = `${character.species}-${character.status}`;
  characterCardH6.style.color = isAlive;
  characterCardDiv.appendChild(characterCardH3);
  characterCardDiv.appendChild(characterCardH6);

  article.appendChild(characterCardFigure);
  article.appendChild(characterCardDiv);

  document.querySelector('.list__items').appendChild(article);

  article.addEventListener('click', async () => {
    await Details(character.id);
  });
  
};
