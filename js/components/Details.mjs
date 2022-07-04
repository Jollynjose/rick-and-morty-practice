import { getCharacterById } from '../api/rickMortyApi.js';
import {
  onShowDetail,
  onRemoveDetail,
  setPositionDetail,
} from '../utils/screenFunctions.mjs';

export const Details = (id = 1) => {
  getCharacterById(id).then((character) => {
    // Creating detail image nodes
    const figure = document.createElement('figure');
    const title = document.createElement('figcaption');
    const img = document.createElement('img');
    [img.src, img.alt, title.innerHTML] = [
      character.image,
      character.name,
      character.name,
    ];
    figure.classList.add('detail__information--figure');
    figure.appendChild(img);
    figure.appendChild(title);
    //creating detail information list nodes
    const infoList = document.createElement('ul');
    infoList.classList.add('detail__information--list');
    const status = document.createElement('li');
    const specie = document.createElement('li');
    const type = document.createElement('li');
    const gender = document.createElement('li');
    const origin = document.createElement('li');
    const location = document.createElement('li');

    // Adding text on detail information nodes
    const isAlive =
      character.status === 'Alive'
        ? 'green'
        : character.status === 'Dead'
        ? 'red'
        : 'grey';

    status.innerHTML = `Status: ${character.status}`;
    status.style.color = isAlive;

    specie.innerHTML = `Specie: ${character.species}`;
    gender.innerHTML = `Gender: ${character.gender}`;
    origin.innerHTML = `Origin: ${character.origin.name}`;
    location.innerHTML = `Location: ${character.location.name}`;
    type.innerHTML = `Type: ${character.type || 'Unknown'}`;

    const infoItems = [status, specie, type, gender, origin, location];
    infoItems.forEach((list) => {
      infoList.appendChild(list);
    });

    //creating detail close button
    const button = document.createElement('button');
    button.classList.add('detail__button');
    button.innerText = 'Close';
    //adding event listers for close details
    const listSection = document.querySelector('.list');
    button.addEventListener('click', onRemoveDetail, { once: true });
    listSection.addEventListener('click', onRemoveDetail, { once: true });

    // creating detail node
    const div = document.createElement('div');
    div.classList.add('detail__information');
    div.appendChild(figure);
    div.appendChild(infoList);

    // creating detail node and inserting in tree
    const detail = document.createElement('section');
    detail.classList.add('detail');

    detail.appendChild(div);
    detail.appendChild(button);

    document.querySelector('main').appendChild(detail);
    // move screen
    onShowDetail();
    setPositionDetail();
  });
};
