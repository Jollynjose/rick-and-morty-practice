const {
  characterController,
  charactersController,
} = require("../../controllers/characters");

const router = require("express").Router();

router.get("/character/:id", characterController);

router.get("/characters", charactersController);

module.exports = router;
