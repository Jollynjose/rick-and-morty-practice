export const blurScreen = () => {
  const detail = document.querySelector('.detail');
  const header = document.querySelector('header');
  header.classList.toggle('blurry');
  const list = document.querySelector('.list');
  list.classList.toggle('blurry');
  detail.classList.toggle('detail--apper');
};

export const hoverCards = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((value) => {
    value.classList.toggle('noHover');
  });
};

export const showDetails = () => {
  console.log('working');
  hoverCards();
  blurScreen();
};
