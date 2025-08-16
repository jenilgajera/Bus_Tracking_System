const cookieParser = require("cookie-parser");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("./config/db");
app.use(
  cors({
    origin: "http://localhost:3010",
    credentials: true,
  })
);

app.use(morgan(":method :url :status :response-time ms"));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.json());

app.use("/v1/auth", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is runnig on port ${PORT}`);
});
