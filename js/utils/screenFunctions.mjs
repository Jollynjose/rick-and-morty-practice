export const onBlurBackground = () => {
  const detail = document.querySelector('.detail');
  const header = document.querySelector('header');
  header.classList.toggle('blurry');
  const list = document.querySelector('.list');
  list.classList.toggle('blurry');
  detail.classList.toggle('detail--apper');
};

export const onToggleHoverCards = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((value) => {
    value.classList.toggle('noHover');
  });
};

export const onShowDetail = () => {
  onToggleHoverCards();
  onBlurBackground();
};

export const onInsertDetail = ()=>{
  const body = document.querySelector('body');
  body.classList.toggle('body--scrolloff')
  const detail = document.createElement('section');
  body.appendChild(detail);
  detail.classList.add('detail');
  window.scrollTo(0, 0);
}

export const onRemoveDetail = (event) => {
  event.stopPropagation();
  onShowDetail();
  const body = document.querySelector('body');
  body.classList.toggle('body--scrolloff');
  body.removeChild(document.querySelector('.detail'));
};
