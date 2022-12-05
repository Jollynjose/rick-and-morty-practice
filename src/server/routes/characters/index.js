const { getCharacter, getCharacters } = require("../../controllers/characters");
const { checkUserMiddleware } = require("../../middleware/auth");

const router = require("express").Router();

router.get("/character/:id", checkUserMiddleware, getCharacter);

router.get("/characters", checkUserMiddleware, getCharacters);

module.exports = router;
