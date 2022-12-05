const { addFavorite, removeFavorite } = require("../../controllers/favorites");
const { checkUserMiddleware } = require("../../middleware/auth");

const router = require("express").Router();

router.use(checkUserMiddleware);

router.put("/add", addFavorite);

router.put("/remove", removeFavorite);

module.exports = router;
