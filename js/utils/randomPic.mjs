import { getRandomLocationImage } from '../api/rickMortyApi.js';

export const randomPic = () => {
  const img = document.createElement('img');
  const main = document.querySelector('.random');
  const figureCaption = document.createElement('figcaption');

  getRandomLocationImage().then((value) => {
    img.src = value;
    img.alt = 'Random pic';
    img.className = 'random__picture';
    figureCaption.innerHTML = 'Random Picture';
    main.appendChild(img);
    main.appendChild(figureCaption);
  });
};


