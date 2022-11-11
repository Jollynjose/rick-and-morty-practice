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
    "../../app/models/PaginationCharacter.mjs"
  );

  const characterInfo = characters.info;
  const characterCount = characterInfo.count;

  const paginationCharacter = new PaginationCharacter(1, characterCount);
  return paginationCharacter;
};

const getRandomCharacterImage = async () => {
  const paginationCharacter = await getCountByCharacters();

  const randomNumber = Math.floor(Math.random() * paginationCharacter.count);
  const id = randomNumber !== 0 ? randomNumber : 1;

  const { data } = await rickAndMortyApi.get(`/api/character/${id}`);
  const imageUrl = data.image;

  return imageUrl;
};

// export const getCharacterById = async (id) => {
//   try {
//     const data = await fetch(`${apiUrl}/api/character/${id}`, { ...options });
//     const character = await data.json();
//     return new Character(
//       character.id,
//       character.name,
//       character.status,
//       character.species,
//       character.image,
//       character.type,
//       character.gender,
//       character.origin,
//       character.location,
//       character.episode,
//       character.url,
//       character.created
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const getListCharacters = async (page = 1) => {
//   const query = `query{
//   characters(page: ${page}){
//     results{
//       id
//       name
//       image
//       species
//       status
//     }
//   }
// }`;
//   const body = JSON.stringify({ query });
//   const response = await fetch(`${apiUrl}/graphql`, {
//     ...options,
//     method: "POST",
//     body,
//   });
//   const charactersResponse = await response.json();

//   const charactersResponseRaw = charactersResponse.data.characters;

//   const charactersResponseResults = charactersResponseRaw.results;

//   const characters = charactersResponseResults.map(
//     ({ id, name, status, species, image }) => {
//       return new Character(id, name, status, species, image);
//     }
//   );

//   return characters;
// };

module.exports = {
  getRandomCharacterImage,
};
