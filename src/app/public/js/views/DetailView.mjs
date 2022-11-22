import { state } from "../models/index.mjs";

const onToggleHoverCards = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((value) => {
    value.classList.toggle("noHover");
  });
};

const onBlurBackground = () => {
  const header = document.querySelector("header");
  const list = document.querySelector(".list__items");
  const more = document.querySelector(".list__more");
  header.classList.toggle("blurry");
  list.classList.toggle("blurry");
  more.classList.toggle("blurry");
};

const setPositionDetail = () => {
  const topInit = 70;
  const screenPosition = window.pageYOffset;
  const detail = document.querySelector(".detail");
  detail.style.top = `${topInit + screenPosition}px`;
};

const onShowDetail = () => {
  onToggleHoverCards();
  onBlurBackground();
  document.body.classList.toggle("body--scrolloff");
};

const onRemoveDetail = () => {
  const detail = document.querySelector(".detail");
  const detailDiv = document.querySelector(".detail__information");
  const detailButton = document.querySelector(".detail__button");
  detail.style.display = "none";

  if (detailDiv && detailButton) {
    onShowDetail();
    detail.removeChild(detailDiv);
    detail.removeChild(detailButton);
  }
};

export const Detail = () => {
  const character = state.character;

  const template = document.getElementById("detail--template");
  const detailNodeTemplate = document.importNode(template.content, true);

  const [detailDiv, detailButton] = detailNodeTemplate.children;

  const [figure, ul] = detailDiv.children;
  const [img, figcaption] = figure.children;
  const liItemsNodes = ul.children;

  img.src = character.image;
  img.alt = character.name;
  figcaption.innerText = character.name;

  const liItems = Array.from(liItemsNodes);

  liItems.forEach((li) => {
    const information = li.textContent.trim();
    const informationToLowerCase = information.toLowerCase();
    const key = informationToLowerCase.slice(0, -1);

    li.innerText += character.getInfo(key);
  });

  const detail = document.querySelector(".detail");
  const listSection = document.querySelector(".list");

  detail.appendChild(detailNodeTemplate);
  detail.style.display = "flex";

  detailButton.addEventListener("click", onRemoveDetail, { once: true });
  listSection.addEventListener("click", onRemoveDetail, { once: true });

  onShowDetail();
  setPositionDetail();
};
