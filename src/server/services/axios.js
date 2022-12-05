const {
  config: { API_URL },
} = require("../../config");

const axios = require("axios");

const rickAndMortyApi = axios.create({
  baseURL: API_URL,
  headers: {
    "content-type": "application/json",
  },
});

const getCountByCharacters = async () => {
  try {
    const query = `
  query{
    characters(page: 1){
      info{
        count
      }
    }
  }`;
    const { data: response } = await rickAndMortyApi.post("/graphql", {
      method: "POST",
      query,
    });
    const characters = response.data.characters;
    const { PaginationCharacter } = await import(
      "../../app/public/js/models/PaginationCharacter.mjs"
    );

    const characterInfo = characters.info;
    const characterCount = characterInfo.count;

    const paginationCharacter = new PaginationCharacter(2, characterCount);
    return paginationCharacter;
  } catch (error) {
    throw new Error(error);
  }
};

const getRandomCharacterImage = async () => {
  try {
    const paginationCharacter = await getCountByCharacters();

    const randomNumber = Math.floor(Math.random() * paginationCharacter.count);
    const id = randomNumber !== 0 ? randomNumber : 1;

    const { data } = await rickAndMortyApi.get(`/api/character/${id}`);
    const imageUrl = data.image;

    return imageUrl;
  } catch (error) {
    throw new Error(error);
  }
};

const getCharacterById = async (id = 1) => {
  try {
    const response = await rickAndMortyApi.get(`/api/character/${id}`);
    const character = response.data;
    const { Character } = await import(
      "../../app/public/js/models/Chracter.mjs"
    );
    return new Character(
      character.id,
      character.name,
      character.status,
      character.species,
      character.image,
      character.type,
      character.gender,
      character.origin,
      character.location,
      character.episode,
      character.url,
      character.created
    );
  } catch (error) {
    throw new Error(error);
  }
};

const getListCharacters = async (page = 1, favorites = []) => {
  try {
    const query = `query{
  characters(page: ${page}){
    results{
      id
      name
      image
      species
      status
    }
  }
}`;
    const { data: response } = await rickAndMortyApi.post("/graphql", {
      method: "POST",
      query,
    });

    const charactersResponseRaw = response.data.characters;

    const charactersResponseResults = charactersResponseRaw.results;
    const { Character } = await import(
      "../../app/public/js/models/Chracter.mjs"
    );

    const characters = charactersResponseResults.map(
      ({ id, name, status, species, image }) => {
        const isFavorite = favorites.includes(+id);
        const character = new Character(id, name, status, species, image);
        character.isFavorite = isFavorite;
        return character;
      }
    );
    return characters;
  } catch (error) {
    throw new Error(error);
  }
};

const getFavoriteChracters = async (ids = []) => {
  const response = await rickAndMortyApi.get(`/api/character/${ids}`);
  const charactersRaw = response.data;

  const { Character } = await import("../../app/public/js/models/Chracter.mjs");

  if (Array.isArray(charactersRaw)) {
    const characters = charactersRaw.map(
      ({ id, name, status, species, image }) => {
        const character = new Character(id, name, status, species, image);
        character.isFavorite = true;
        return character;
      }
    );
    return characters;
  }

  const character = new Character(
    charactersRaw.id,
    charactersRaw.name,
    charactersRaw.status,
    charactersRaw.species,
    charactersRaw.image
  );
  character.isFavorite = true;

  return [character];
};

module.exports = {
  getRandomCharacterImage,
  getCharacterById,
  getListCharacters,
  getCountByCharacters,
  getFavoriteChracters,
};
