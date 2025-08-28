require("./config/db");
const { customErrorHandler } = require("./helpers/response.helper");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");

const routes = require("./routes/index.routes");
const {
  ROUTE_PREFIX,
  ROUTE_TYPE,
  AUTH_PREFIX,
} = require("./constants/constant");

require("./services/passport");

app.use(passport.initialize());

app.use(morgan(":method :url :status :response-time ms"));

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.json());

//auth Rotues
app.use(routes)

app.use(customErrorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is runnig on port ${PORT}`);
});
