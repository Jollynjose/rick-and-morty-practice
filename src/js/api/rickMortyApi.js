import { Character, PaginationCharacter } from '../models';

const apiUrl = 'https://rickandmortyapi.com/';

const options = {
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
};

export const getCountByCharacters = async () => {
  const query = `
  query{
    characters(page: 1){
      info{
        count
      }
    }
  }`;
  const body = JSON.stringify({ query });
  const response = await fetch(`${apiUrl}/graphql`, {
    ...options,
    method: 'POST',
    body,
  });
  const { data } = await response.json();

  const characters = data.characters;
  const characterInfo = characters.info;
  const characterCount = characterInfo.count;

  const paginationCharacter = new PaginationCharacter(1, characterCount);
  return paginationCharacter;
};

export const getRandomCharacterImage = async () => {
  const paginationCharacter = await getCountByCharacters();

  const randomNumber = Math.floor(Math.random() * paginationCharacter.count);
  const id = randomNumber !== 0 ? randomNumber : 1;

  const response = await fetch(`${apiUrl}/api/character/${id}`, options);
  const data = await response.json();

  const imageUrl = data.image;
  return imageUrl;
};

export const getListCharacters = async (page = 1) => {
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
  const body = JSON.stringify({ query });
  const response = await fetch(`${apiUrl}/graphql`, {
    ...options,
    method: 'POST',
    body,
  });
  const charactersResponse = await response.json();

  const charactersResponseRaw = charactersResponse.data.characters;

  const charactersResponseResults = charactersResponseRaw.results;

  const characters = charactersResponseResults.map(
    ({ id, name, status, species, image }) => {
      return new Character(id, name, status, species, image);
    }
  );

  return characters;
};

export const getCharacterById = async (id) => {
  const data = await fetch(`${apiUrl}/api/character/${id}`, options);
  const character = await data.json();
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
};
