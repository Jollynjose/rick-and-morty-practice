import { database } from "../api/firebase/firestore";
import { getFavoriteChracters } from "../api/rickMortyApi";
import { Card } from "./Card";

const loader = document.querySelector(".loader");

export const FavoritesList = async () => {
  const favoritesIds = database.favorites;
  if (favoritesIds.length) {
    const favoriteChracters = await getFavoriteChracters(favoritesIds);
    favoriteChracters.forEach((chracter) => {
      Card(chracter, true);
    });
    loader.classList.toggle("hide");
    return;
  }
  document.querySelector("main").innerHTML = "<h1>No favorites</h1>";
};
