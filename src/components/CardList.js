import { Card, Detail } from "./";
import { getListCharacters, getCountByCharacters } from "../api/rickMortyApi";

const onAddDetail = () => {
  const list = document.querySelector(".list");
  if (list) {
    list.addEventListener("click", async (e) => {
      const clicked = e.target.closest("article");
      if (clicked?.classList.contains("card")) {
        const id = clicked.getAttribute("id");
        await Detail(+id);
        list.removeEventListener("click", onAddDetail);
      } else if (clicked?.classList.contains("card_fav")) {
        //add and remove favorites logic
      }
    });
  }
};

const onAddCharacters = () => {
  const loader = document.querySelector(".loader");
  let page = 1;
  if (loader) {
    window.addEventListener("scroll", async () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const bottomScroll = scrollTop + clientHeight;
      if (bottomScroll >= scrollHeight) {
        loader.classList.toggle("show");
        const count = await getCountByCharacters();
        const list = document.querySelector(".list__items");
        const totalItems = list.childElementCount - 1;

        if (totalItems !== count) {
          const isCache = localStorage.length > 0;
          await CardList(++page, isCache);
        }
        loader.classList.toggle("show");
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
};

onAddCharacters();
onAddDetail();
