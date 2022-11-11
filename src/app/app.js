const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { config } = require("../config");
const pageRouter = require("../server/routes/pages");
const authRouter = require("../server/routes/auth");

const app = express();

app.set("views", path.resolve(__dirname, "../client/pages"));
app.set("view engine", "ejs");

app.use(cors());
app.use(morgan("combined"));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

app.use(pageRouter);
app.use("/api", authRouter);

app.listen(config.PORT, () => {
  console.log(`App listening at port ${config.PORT}`);
});
