import {
  loadCharacters,
  state,
  updateCharacterPage,
} from "../models/index.mjs";

const statusToColor = {
  Alive: "green",
  Dead: "red",
};

const getCharacterColor = (status = "") => {
  return statusToColor[status] || "grey";
};

const Card = (character) => {
  const template = document.getElementById("card--template");
  const cardNodeTemplate = document.importNode(template.content, true);

  const [cardArticle] = cardNodeTemplate.children;
  const [cardFigure, cardDiv] = cardArticle.children;

  const [cardFigureImg] = cardFigure.children;
  const [cardDivH3, cardDivH6] = cardDiv.children;

  cardArticle.setAttribute("data-id", character.id);

  cardFigureImg.src = character.image;
  cardFigureImg.alt = character.name;

  const statusColor = getCharacterColor(character.status);

  cardDivH3.innerText = character.name;
  cardDivH6.innerText = `${character.species}-${character.status}`;
  cardDivH6.style.color = statusColor;

  document.querySelector(".list__items").appendChild(cardNodeTemplate);
};

export const CardList = async () => {
  const charactersJSONString = localStorage.getItem("characters");
  if (charactersJSONString) {
    const nextCharacters = JSON.parse(charactersJSONString);
    nextCharacters.forEach((character) => {
      Card(character);
    });
  } else {
    state.characters.forEach((character) => {
      Card(character);
    });
  }
  updateCharacterPage();
  await loadCharacters();
  localStorage.setItem("characters", JSON.stringify(state.characters));
};
