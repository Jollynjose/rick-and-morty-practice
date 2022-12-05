const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");

const { config } = require("../config");
const favoriteRouter = require("../server/routes/favorites");
const pageRouter = require("../server/routes/pages");
const authRouter = require("../server/routes/auth");
const characterRouter = require("../server/routes/characters");

const app = express();
const csrftMiddleware = csrf({ cookie: true });

app.set("views", path.resolve(__dirname, "../client/pages"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(csrftMiddleware);

app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});
app.use("/api/auth", authRouter);
app.use("/api/favorites", favoriteRouter);
app.use("/api", characterRouter);
app.use(pageRouter);

app.listen(config.PORT, () => {
  console.log(`App listening at port ${config.PORT}`);
});
