import {
  addFavorite,
  loadCharacter,
  loadCharacters,
  loadCharactersCount,
  removeFavorite,
  state,
  updateCharacterPage,
} from "../models/index.mjs";
import { CardListView } from "../views/CardView.mjs";
import { DetailView } from "../views/DetailView.mjs";

const updateFavorite = async ({ id, action, card }) => {
  try {
    const button = card.querySelector("button");
    if (action === "add") {
      await addFavorite(id);
      button.setAttribute("data-action", "remove");
      button.innerText = "Remove Favorite";
    } else if (action === "remove") {
      await removeFavorite(id);
      button.setAttribute("data-action", "add");
      button.innerText = "Add Favorite";
    } else {
      throw new Error("ilegal action");
    }
  } catch (error) {
    throw new Error(error);
  }
};

const eventHandler = () => {
  const list = document.querySelector(".list");
  list.addEventListener("click", async (e) => {
    try {
      const action = e.target.dataset?.action;
      const clicked = e.target.closest("article");
      if (action) {
        const id = clicked.dataset.id;
        await updateFavorite({ action, id: +id, card: clicked });
      } else if (clicked) {
        const id = clicked.dataset.id;
        renderDetail(id);
      }
      list.removeEventListener("click", eventHandler);
    } catch (error) {
      throw new Error(error);
    }
  });
};

const renderDetail = async (id = 0) => {
  try {
    await loadCharacter(+id);
    DetailView(state.character);
  } catch (error) {
    throw new Error(error);
  }
};

const renderCards = async () => {
  try {
    const loader = document.querySelector(".loader");
    loadCharactersCount();
    await loadCharacters();
    window.addEventListener("scroll", async () => {
      try {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;
        const bottomScroll = scrollTop + clientHeight;
        if (bottomScroll >= scrollHeight) {
          loader.classList.toggle("show");

          const list = document.querySelector(".list__items");
          const totalItems = list.childElementCount - 1;

          if (totalItems !== state.pagination.count) {
            CardListView(state.characters);
            updateCharacterPage();
            await loadCharacters();
          }
          loader.classList.toggle("show");
        }
      } catch (error) {
        throw new Error(error);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};

const ListController = async () => {
  try {
    eventHandler();
    await renderCards();
  } catch (error) {
    throw new Error(error);
  }
};

export default ListController;
