import { getRandomCharacterImage } from '../api/rickMortyApi';

export const RandomImage = async () => {
  const imageURL = await getRandomCharacterImage();
  const template = document.getElementById('random--template');
  const randomImageTemplate = document.importNode(template.content, true);

  const [figure] = randomImageTemplate.children;
  const [image, figcaption] = figure.children;

  image.src = imageURL;
  image.alt = 'random image';

  figcaption.innerText = 'Random Image';
  document.querySelector('.random--section').appendChild(randomImageTemplate);
};
