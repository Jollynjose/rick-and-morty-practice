import { Card, Detail } from "./";
import { getListCharacters, getCountByCharacters } from "../api/rickMortyApi";
import { database } from "../api/firebase/firestore";

const loader = document.querySelector(".loader");
class CardListEvents {
  constructor(cardListElem) {
    this.cardListElem = cardListElem;
    cardListElem.addEventListener("click", this.onClick.bind(this));
  }

  static init(cardListElem) {
    if (cardListElem) return new CardListEvents(cardListElem);
    return null;
  }

  async openDetail(target) {
    const id = target.getAttribute("id");
    if (id) await Detail(+id);
  }

  async addFavorite(id, target) {
    await database.addFavorites(+id);
    target.innerText = "Remove Favorite";
    target.dataset.action = "removeFavorite";
  }

  async removeFavorite(id, target, cardTarget) {
    await database.removeFavorite(+id);
    target.innerText = "Add Favorite";
    target.dataset.action = "addFavorite";
    if (target.dataset.actionUi === "remove") cardTarget.remove();
  }

  async setFavorites(target, cardTarget) {
    const id = cardTarget.getAttribute("id");
    const action = target.dataset.action;
    if (action === "addFavorite") {
      this.addFavorite(id, target);
      return;
    }
    this.removeFavorite(id, target, cardTarget);
  }

  async onClick(event) {
    const cardTarget = event.target.closest(".card");
    const isfavoriteTag = event.target.classList.contains("card__fav");
    if (isfavoriteTag) {
      await this.setFavorites(event.target, cardTarget);
    } else {
      await this.openDetail(cardTarget);
    }
    this.cardListElem.removeEventListener("click", this.onClick.bind(this));
  }
}

CardListEvents.init(document.querySelector(".list"));

const onAddCharacters = () => {
  let page = 1;
  if (loader) {
    window.addEventListener("scroll", async () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const bottomScroll = scrollTop + clientHeight;
      if (bottomScroll >= scrollHeight) {
        loader.classList.toggle("hide");
        const count = await getCountByCharacters();
        const list = document.querySelector(".list__items");
        const totalItems = list.childElementCount - 1;
        if (totalItems !== count) {
          const isCache = localStorage.length > 0;
          await CardList(++page, isCache);
        }
        loader.classList.toggle("hide");
      }
    });
  }
};
const charactersLocal = async (page = 1) => {
  const nextCharacters = await getListCharacters(++page);
  const charactersJSON = JSON.stringify(nextCharacters);
  localStorage.setItem("characters", charactersJSON);
};

export const CardList = async (page = 1, isCache = false) => {
  if (isCache) {
    const charactersJSON = localStorage.getItem("characters");
    if (charactersJSON) {
      const nextCharacters = JSON.parse(charactersJSON);
      nextCharacters.forEach((character) => {
        Card(character);
      });
    }
  } else {
    const characters = await getListCharacters(page);
    characters.forEach((character) => {
      Card(character);
    });
  }
  await charactersLocal(page);
  loader.classList.toggle("hide");
  onAddCharacters();
};
