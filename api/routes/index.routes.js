const express = require("express");
const authRoutes = require("./auth.routes");
const { ROUTE_PREFIX, ROUTE_TYPE, AUTH_PREFIX } = require("../constants/constant");

const router = express.Router();

//auth routes
router.use(`${ROUTE_PREFIX}${ROUTE_TYPE.PUBLIC}${AUTH_PREFIX}`, authRoutes);



module.exports = router;
