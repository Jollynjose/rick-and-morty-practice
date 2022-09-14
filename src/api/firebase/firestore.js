import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { app } from "./config";

class Database {
  constructor(app, userId = "") {
    this.userId = userId;
    this._firestore = getFirestore(app);
    this.favorites = [];
  }

  static init() {
    const userId = sessionStorage.getItem("userId");

    if (userId) return new Database(app, userId);

    return null;
  }

  async getFavorites() {
    try {
      const querySnapshot = await getDoc(
        doc(this._firestore, "favorites", this.userId)
      );
      if (querySnapshot.exists()) {
        const data = querySnapshot.data();
        this.favorites.push(...data.favorites);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async addFavorites(characterId = 1) {
    const docRef = doc(this._firestore, "favorites", this.userId);
    try {
      const favorites = await getDoc(docRef);
      if (favorites.exists()) {
        await updateDoc(docRef, {
          favorites: arrayUnion(characterId),
        });
      } else {
        await setDoc(docRef, {
          favorites: [characterId],
        });
      }
      return alert("Sucessfully");
    } catch (e) {
      console.error(e);
    }
  }

  async removeFavorite(characterId = 1) {
    const docRef = doc(this._firestore, "favorites", this.userId);
    this.favorites = this.favorites.filter((id) => id !== characterId);
    try {
      await updateDoc(docRef, {
        favorites: this.favorites,
      });
      return alert("Sucessfully");
    } catch (e) {
      console.error(e);
    }
  }
}
export const database = Database.init();
