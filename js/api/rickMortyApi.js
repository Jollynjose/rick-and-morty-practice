const apiUrl = 'https://rickandmortyapi.com/';

export const getCountByCharacters = async () => {
  const query = `
  query{
    characters(page: 1){
      info{
        count
      }
    }
  }`;
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  };
  const { data } = await (await fetch(`${apiUrl}/graphql`, options)).json();
  return data?.characters.info.count;
};

export const getRandomLocationImage = async () => {
  const count = await getCountByCharacters();
  const randomNumber = Math.floor(Math.random() * count);
  const id = randomNumber !== 0 ? randomNumber : 1;

  const data = await (
    await fetch(`${apiUrl}/api/character/${id}`, {
      method: 'GET',
    })
  ).json();
  return data.image;
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
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  };
  const { data = {} } = await (
    await fetch(`${apiUrl}/graphql`, options)
  ).json();
  return data?.characters.results;
};

export const getCharacterById = async (id) => {
  const data = await (await fetch(`${apiUrl}/api/character/${id}`)).json();
  return data;
};
