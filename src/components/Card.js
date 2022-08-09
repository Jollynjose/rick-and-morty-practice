const statusToColor = {
  Alive: "green",
  Dead: "red",
};

const getCharacterColor = (status = "") => {
  return statusToColor[status] || "grey";
};

export const Card = (character) => {
  const template = document.getElementById("card--template");
  const cardNodeTemplate = document.importNode(template.content, true);

  const [cardArticle] = cardNodeTemplate.children;
  const [cardFigure, cardDiv] = cardArticle.children;

  const [cardFigureImg] = cardFigure.children;
  const [cardDivH3, cardDivH6] = cardDiv.children;

  cardArticle.setAttribute("id", character.id);

  cardFigureImg.src = character.image;
  cardFigureImg.alt = character.name;

  const statusColor = getCharacterColor(character.status);

  cardDivH3.innerText = character.name;
  cardDivH6.innerText = `${character.species}-${character.status}`;
  cardDivH6.style.color = statusColor;

  document.querySelector(".list__items").appendChild(cardNodeTemplate);
};
