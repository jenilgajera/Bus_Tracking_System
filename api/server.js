const cookieParser = require("cookie-parser");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("./config/db");
const passport = require("passport");

require("./services/passport");

app.use(passport.initialize());

app.use(morgan(":method :url :status :response-time ms"));

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.json());


app.use("/v1/auth", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is runnig on port ${PORT}`);
});
