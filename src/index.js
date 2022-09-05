import "./css/index.css";
import { CardList, RandomImage } from "./components";
import { login, register } from "./api/firebase/auth";

window.addEventListener("load", async () => {
  const path = window.location.pathname || "";
  switch (path) {
    case "/list.html":
      await CardList();
    case "/about.html":
    case "/home.html":
      await RandomImage();
    case "/login.html":
      login();
      break;
    case "/signup.html":
      register();
    default:
      break;
  }
});
