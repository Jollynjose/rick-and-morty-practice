const router = require("express").Router();
const {
  homePageController,
  listPageController,
  aboutPageController,
  loginPageController,
  registerPageController,
  favoritesPageController,
} = require("../../controllers/pages");
const { checkUserMiddleware } = require("../../middleware/auth");
const { Status404Middleware } = require("../../middleware/Status404");

router.get(["/", "/home"], checkUserMiddleware, homePageController);

router.get("/list", checkUserMiddleware, listPageController);

router.get("/favorites", checkUserMiddleware, favoritesPageController);

router.get("/about", checkUserMiddleware, aboutPageController);

router.get("/login", checkUserMiddleware, loginPageController);

router.get("/register", checkUserMiddleware, registerPageController);

router.use(Status404Middleware);

module.exports = router;
