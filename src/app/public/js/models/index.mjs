import { Character } from "./Chracter.mjs";
import { PaginationCharacter } from "./PaginationCharacter.mjs";

export const state = {
  character: new Character(),
  characters: [],
  user: { email: "", favorites: [] },
  pagination: { page: 1, count: 0 },
};

export const loadCharacter = async (id = 0) => {
  try {
    const response = await fetch(`/api/character/${id}`);
    const data = await response.json();
    const character = new Character(
      data.id,
      data.name,
      data.status,
      data.species,
      data.image,
      data.type,
      data.gender,
      data.origin,
      data.location,
      data.episode,
      data.url,
      data.created
    );
    state.character = character;
  } catch (error) {
    console.error(error);
  }
};

export const loadCharacters = async () => {
  try {
    const response = await fetch(
      `/api/characters?page=${state.pagination.page}`
    );
    const data = await response.json();
    state.characters = data.map(
      ({ id, name, status, species, image, isFavorite }) => {
        const character = new Character(id, name, status, species, image);
        character.isFavorite = isFavorite;
        return character;
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const loadCharactersCount = () => {
  const countString = Cookies.get("charactersCount");
  const countParsed = JSON.parse(countString);
  const pagination = new PaginationCharacter(
    countParsed.page,
    countParsed.count
  );
  state.pagination = { ...pagination };
};

export const updateCharacterPage = () => {
  state.pagination = { ...state.pagination, page: state.pagination.page + 1 };
};

export const loginHandler = async (email, password) => {
  try {
    const auth = firebase.auth();
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    const idToken = await user.getIdToken();
    await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "CSRF-Token": Cookies.get("XSRF-TOKEN"),
      },
      body: JSON.stringify({ idToken, csrfToken: Cookies.get("XSRF-TOKEN") }),
    });

    auth.signOut();
  } catch (error) {
    throw new Error(error);
  }
};

export const logoutHandler = async () => {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "CSRF-Token": Cookies.get("XSRF-TOKEN"),
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const registerHandler = async (email, password) => {
  try {
    const auth = firebase.auth();
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    const idToken = await user.getIdToken();
    await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "CSRF-Token": Cookies.get("XSRF-TOKEN"),
      },
      body: JSON.stringify({ idToken, csrfToken: Cookies.get("XSRF-TOKEN") }),
    });
    auth.signOut();
  } catch (error) {
    throw new Error(error);
  }
};

export const addFavorite = async (id = 0) => {
  try {
    const response = await fetch("/api/favorites/add", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "CSRF-Token": Cookies.get("XSRF-TOKEN"),
      },
      body: JSON.stringify({ favoriteId: id }),
    });
    console.log(await response.json());
  } catch (error) {
    throw new Error(error);
  }
};

export const removeFavorite = async (id = 0) => {
  try {
    const response = await fetch("/api/favorites/remove", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "CSRF-Token": Cookies.get("XSRF-TOKEN"),
      },
      body: JSON.stringify({ favoriteId: id }),
    });
    console.log(await response.json());
  } catch (error) {
    throw new Error(error);
  }
};
