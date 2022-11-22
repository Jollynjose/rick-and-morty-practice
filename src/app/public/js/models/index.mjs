import { Character } from "./Chracter.mjs";
import Cookies from "../modules/js.cookie.min.mjs";
import { PaginationCharacter } from "./PaginationCharacter.mjs";
const apiUrl = window.location.origin;

export const state = {
  character: new Character(),
  characters: [],
  user: {},
  pagination: { page: 1, count: 0 },
};

export const loadCharacter = async (id = 0) => {
  try {
    const response = await fetch(`${apiUrl}/api/character/${id}`);
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
    console.log(state.pagination.page);
    const response = await fetch(
      `${apiUrl}/api/characters?page=${state.pagination.page}`
    );
    const data = await response.json();
    state.characters = data.map(({ id, name, status, species, image }) => {
      return new Character(id, name, status, species, image);
    });
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
