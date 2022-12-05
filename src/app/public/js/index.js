"use strict";
import FavoritesController from "./controllers/Favorites.mjs";
import ListController from "./controllers/List.mjs";
import LoginController from "./controllers/Login.mjs";
import LogoutController from "./controllers/Logout.mjs";
import MainController from "./controllers/Main.mjs";
import RegisterController from "./controllers/Register.mjs";

const init = () => {
  window.addEventListener("DOMContentLoaded", async () => {
    try {
      const path = window.location.pathname || "";
      LogoutController();
      switch (path) {
        case "/list":
          await ListController();
          break;
        case "/register":
          RegisterController();
          break;
        case "/login":
          LoginController();
          break;
        case "/favorites":
          await FavoritesController();
          break;
        default:
          MainController();
          break;
      }
    } catch (error) {
      console.error(error);
    }
  });
};

init();
