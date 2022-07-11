export const onBlurBackground = () => {
  const header = document.querySelector('header');
  const list = document.querySelector('.list__items');
  const more = document.querySelector('.list__more');
  header.classList.toggle('blurry');
  list.classList.toggle('blurry');
  more.classList.toggle('blurry');
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
  document.body.classList.toggle('body--scrolloff');
};

export const setPositionDetail = () => {
  const topInit = 70;
  const screenPosition = window.pageYOffset;
  const detail = document.querySelector('.detail');
  detail.style.top = `${topInit + screenPosition}px`;
};

export const onRemoveDetail = () => {
  const detail = document.querySelector('.detail');
  const detailDiv = document.querySelector('.detail__information');
  const detailButton = document.querySelector('.detail__button');
  detail.style.display = 'none';

  if (detailDiv && detailButton) {
    onShowDetail();
    detail.removeChild(detailDiv);
    detail.removeChild(detailButton);
  }
};
