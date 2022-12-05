const firebaseAdmin = require("./admin");

const db = firebaseAdmin.firestore();

const getFavorites = async (email = "") => {
  try {
    const favoritesRef = db.collection("favorites").doc(email);
    const snapshot = await favoritesRef.get();
    const data = snapshot.data();
    return data?.favorites;
  } catch (error) {
    throw new Error(error);
  }
};

const updateFavorites = async (email = "", favorites = []) => {
  try {
    const favoritesRef = db.collection("favorites").doc(email);
    await favoritesRef.set({ favorites });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getFavorites,
  updateFavorites,
};
