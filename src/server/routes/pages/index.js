const router = require("express").Router();
const {
  homePageController,
  listPageController,
  aboutPageController,
} = require("../../controllers/pages");
const { Status404 } = require("../../middleware/Status404");

router.get(["/", "/home"], homePageController);

router.get("/list", listPageController);

router.get("/about", aboutPageController);

router.use(Status404);

module.exports = router;
