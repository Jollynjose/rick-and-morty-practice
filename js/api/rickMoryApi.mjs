const apiUrl = 'https://rickandmortyapi.com/';

async function getCountByLocations() {
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
}

export async function getRandomLocationImage() {
  const count = await getCountByLocations();
  const randomNumber = Math.floor(Math.random() * count);

  const data = await (
    await fetch(`${apiUrl}/api/character/${randomNumber}`, {
      method: 'GET',
    })
  ).json();
  return data.image;
}

export async function getListCharacters(page = 1) {
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
}

export async function getCharacterById(id) {
  const data = await (await fetch(`${apiUrl}/api/character/${id}`)).json();
  console.log(data);
  return data;
}
