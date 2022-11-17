"use strict";
class App {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener("load", async () => {
      const path = window.location.pathname || "";
      switch (path) {
        case "/list":
          this.listPage();
          break;
        default:
          this.mainPage();
          break;
      }
    });
  }

  mainPage() {
    const image = document.querySelector(".random__img");
    const figure = document.querySelector(".random--figure");
    const [, figureCaption] = figure.children;
    const loading = setInterval(() => {
      if (image.complete) {
        const loader = document.querySelector(".loader--random");
        loader.style.visibility = "hidden";
        figure.style.visibility = "visible";
        figureCaption.innerText = "Random Image";
        clearInterval(loading);
      }
    }, 100);
  }

  listPage() {}
}
new App();
