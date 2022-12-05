const { verifySessionCookie } = require("../../../storage/firebase/auth");

const checkUserMiddleware = async (req, res, next) => {
  const excludePaths = ["/register", "/login"];
  try {
    const sessionCookie = req.cookies.session || "";
    if (!excludePaths.includes(req.originalUrl)) {
      const user = await verifySessionCookie(sessionCookie);
      console.log(` user is logged: ${user.email}`);
      res.locals.email = user.email;
      return next();
    }
    next();
  } catch (error) {
    if (!excludePaths.includes(req.originalUrl)) {
      res.redirect("/login");
    }
    next();
  }
};
module.exports = {
  checkUserMiddleware,
};
