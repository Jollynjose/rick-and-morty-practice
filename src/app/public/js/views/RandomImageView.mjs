const RandomImage = () => {
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
};

export default RandomImage;
