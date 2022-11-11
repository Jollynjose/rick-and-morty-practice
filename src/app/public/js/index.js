"use strict";
class App {
  constructor() {
    window.addEventListener("load", async () => {
      const path = window.location.pathname || "";
      switch (path) {
        case "/list.html":
        case "/about":
        case "/home":
        case "/":
          this.randomImage();

          break;
        default:
          break;
      }
      console.log(ejs);
    });
  }

  randomImage() {
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
}
new App();
