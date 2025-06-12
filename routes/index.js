const router = require("express").Router();
const point = require("./Coordinates");

router.use("/coordinates", point);

module.exports = router;
