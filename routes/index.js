const express = require("express");
const app = express.Router();

require("./endpoints/user")(app);
require("./endpoints/expense")(app);


module.exports = app;