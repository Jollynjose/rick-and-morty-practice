const { getCharacter, getCharacters } = require("../../controllers/characters");

const router = require("express").Router();

router.get("/character/:id", getCharacter);

router.get("/characters", getCharacters);

module.exports = router;
