const {
  getFavorites,
  updateFavorites,
} = require("../../storage/firebase/firestore");

const removeFavorite = async (req, res) => {
  try {
    const email = res.locals.email;
    const favoriteId = +req.body.favoriteId;
    if (!favoriteId) throw new Error("you must send a favorite");

    const favorites = await getFavorites(email);
    if (favorites) {
      const updatedFavorites = favorites.filter((id) => id !== favoriteId);
      await updateFavorites(email, updatedFavorites);
      res.status(201).json({ message: "sucess", favorites: updatedFavorites });
    }
  } catch (error) {
    console.error(error);
  }
};

const addFavorite = async (req, res) => {
  try {
    const email = res.locals.email;
    const newFavoriteId = +req.body.favoriteId;
    if (!newFavoriteId) throw new Error("you must send a favorite");

    const favorites = await getFavorites(email);
    if (favorites) {
      const newFavorites = [...favorites, newFavoriteId];
      await updateFavorites(email, newFavorites);
      return res
        .status(201)
        .json({ message: "sucess", favorites: newFavorites });
    }
    const newFavorites = [newFavoriteId];
    await updateFavorites(email, newFavorites);
    res.status(201).json({ message: "sucess", favorites: newFavorites });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addFavorite,
  removeFavorite,
};
