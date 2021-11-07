const router = require("express").Router();
const usersRoute = require("./users");
const filmsRoute = require("./films");
//const directorsRoute = require("./directors");
const adminRoute = require("./admin");
const entriesRoute = require ("./entries")
//const addressRoute = require('./address')

router.use("/films", filmsRoute);
router.use("/users", usersRoute);
router.use("/admin", adminRoute);
//router.use("/directors", directorsRoute);
router.use("/entries", entriesRoute);


router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;