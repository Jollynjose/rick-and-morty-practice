import "./css/index.css";
import { CardList, RandomImage, FavoritesList } from "./components";
import { login, register } from "./api/firebase/auth";
import { database } from "./api/firebase/firestore";

window.addEventListener("load", async () => {
  const path = window.location.pathname || "";
  await database.getFavorites();
  switch (path) {
    case "/list.html":
      await CardList();
      break;
    case "/favorites.html":
      await FavoritesList();
      break;
    case "/about.html":
    case "/home.html":
      await RandomImage();
      break;
    case "/login.html":
      login();
      break;
    case "/signup.html":
      register();
      break;
    default:
      break;
  }
});
