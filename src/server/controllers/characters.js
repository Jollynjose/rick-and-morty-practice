const { getFavorites } = require("../../storage/firebase/firestore");
const { getCharacterById, getListCharacters } = require("../services/axios");

const getCharacters = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    if (Number(page) === NaN || page === "0")
      throw new Error("Incorrect parameter");

    const email = res.locals.email;
    const favorites = await getFavorites(email);
    const characters = await getListCharacters(page, favorites);

    res.status(200).json(characters);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: error,
    });
  }
};

const getCharacter = async (req, res) => {
  try {
    const id = req.params.id;
    if (Number(id) === NaN || id === "0")
      throw new Error("Incorrect parameter");

    const character = await getCharacterById(+id);

    res.status(200).json(character);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: error,
    });
  }
};

module.exports = {
  getCharacter,
  getCharacters,
};
