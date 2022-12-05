const removeFavorites = async ({ id, removeHandler, element }) => {
  try {
    await removeHandler(id);
    element.remove();
  } catch (error) {
    throw new Error(error);
  }
};

const FavoritesView = async ({ removeHandler, renderDetail }) => {
  try {
    const list = document.querySelector(".list__items");
    list.addEventListener("click", async function (ev) {
      const action = ev.target.dataset?.action;
      const clicked = ev.target.closest(".card");
      if (action) {
        const id = +clicked.dataset.id;
        await removeFavorites({ id, removeHandler, element: clicked });
      } else if (clicked) {
        const id = +clicked.dataset.id;
        await renderDetail(id);
      }
      list.removeEventListener("click", this);
    });
  } catch (error) {
    throw new Error(error);
  }
};

export default FavoritesView;
