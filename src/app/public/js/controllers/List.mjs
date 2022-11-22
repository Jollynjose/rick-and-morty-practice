import {
  loadCharacter,
  loadCharacters,
  loadCharactersCount,
  state,
} from "../models/index.mjs";
import { CardList } from "../views/CardView.mjs";
import { Detail } from "../views/DetailView.mjs";

const renderDetail = () => {
  const list = document.querySelector(".list");
  if (list) {
    list.addEventListener("click", async (e) => {
      const clicked = e.target.closest("article");
      if (clicked?.classList.contains("card")) {
        const id = clicked.dataset.id;
        await loadCharacter(+id);
        Detail();
        list.removeEventListener("click", renderDetail);
      }
    });
  }
};

const renderCards = async () => {
  const loader = document.querySelector(".loader");
  loadCharactersCount();
  await loadCharacters();
  localStorage.removeItem("characters");

  window.addEventListener("scroll", async () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const bottomScroll = scrollTop + clientHeight;
    if (bottomScroll >= scrollHeight) {
      loader.classList.toggle("show");

      const list = document.querySelector(".list__items");
      const totalItems = list.childElementCount - 1;

      if (totalItems !== state.pagination.count) {
        await CardList();
      }
      loader.classList.toggle("show");
    }
  });
};

const ListController = async () => {
  renderDetail();
  await renderCards();
};

export default ListController;
