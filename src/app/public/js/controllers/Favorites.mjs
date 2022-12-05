import FavoritesView from "../views/FavoritesView.mjs";
import { loadCharacter, removeFavorite, state } from "../models/index.mjs";
import { DetailView } from "../views/DetailView.mjs";

const renderDetail = async (id = 0) => {
  try {
    await loadCharacter(+id);
    DetailView(state.character);
  } catch (error) {
    throw new Error(error);
  }
};

const FavoritesController = async () => {
  try {
    await FavoritesView({ removeFavorite, renderDetail });
  } catch (error) {
    throw new Error(error);
  }
};

export default FavoritesController;
