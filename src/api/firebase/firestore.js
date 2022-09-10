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
  constructor(app) {
    this.userId = sessionStorage.getItem("userId");
    this._firestore = getFirestore(app);
    this.favorites = [];
  }

  async getFavorites() {
    if (this.userId) {
      const querySnapshot = await getDoc(
        doc(this._firestore, "favorites", this.userId)
      );
      if (querySnapshot.exists()) {
        const data = querySnapshot.data();
        this.favorites.push(...data.favorites);
      }
    }
  }

  async addFavorites(characterId = 1) {
    const docRef = doc(this._firestore, "favorites", this.userId);
    const favorites = await getDoc(docRef);

    if (favorites.exists()) {
      //push chracter
      await updateDoc(docRef, {
        favorites: arrayUnion(characterId),
      });
    } else {
      await setDoc(docRef, {
        favorites: [characterId],
      });
    }
    return alert("Sucessfully");
  }

  async removeFavorite(characterId = 1) {
    const docRef = doc(this._firestore, "favorites", this.userId);
    this.favorites = this.favorites.filter((id) => id !== characterId);
    await updateDoc(docRef, {
      favorites: this.favorites,
    });
    return alert("Sucessfully");
  }
}
export const database = new Database(app);
