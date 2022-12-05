const { loginUser, logoutUser } = require("../../controllers/auth");
const { checkUserMiddleware } = require("../../middleware/auth");
const router = require("express").Router();

router.post("/login", loginUser);

router.post("/logout", checkUserMiddleware, logoutUser);

module.exports = router;
