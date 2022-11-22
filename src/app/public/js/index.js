"use strict";
import ListController from "./controllers/List.mjs";
import MainController from "./controllers/Main.mjs";

const init = () => {
  window.addEventListener("load", async () => {
    const path = window.location.pathname || "";
    switch (path) {
      case "/list":
        await ListController();
        break;
      default:
        MainController();
        break;
    }
  });
};

init();
