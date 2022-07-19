import "./css/index.css";
import { CardList, RandomImage } from "./components";

window.addEventListener("load", async () => {
  const path = window.location.pathname || "";
  switch (path) {
    case "/list.html":
      await CardList();
    case "/about.html":
    case "/home.html":
      await RandomImage();
    default:
      break;
  }
});
