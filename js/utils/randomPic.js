import { getRandomLocationImage } from '../api/rickMortyApi.js';

export const randomPic = async () => {
  const img = document.createElement('img');
  const main = document.querySelector('.random');
  const figureCaption = document.createElement('figcaption');

  const random = await getRandomLocationImage();
  img.src = random;
  img.alt = 'Random pic';
  img.className = 'random__picture';
  figureCaption.innerHTML = 'Random Picture';
  main.appendChild(img);
  main.appendChild(figureCaption);
};


