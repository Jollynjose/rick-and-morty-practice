import { child, get, getDatabase, ref, set } from "firebase/database";
import { auth } from "./auth";
import { app } from "./config";

const db = getDatabase(app);
const dbRef = ref(db);

export const getFavorites = async () => {
  const userId = auth.firebaseAuth.currentUser?.uid;
  const snapshot = await get(child(dbRef, `favorites/${userId}`));

  return snapshot.exists() ? snapshot.val() : "No Favorites";
};

export const addFavoriteChracter = async (character) => {
  const userId = auth.firebaseAuth.currentUser?.uid;
  try {
    await set(ref(db, `favorites/${userId}`), {
      ...character,
    });
  } catch (err) {
    alert(err);
  } finally {
    alert("Sucessfully!");
  }
};
