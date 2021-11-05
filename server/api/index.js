const router = require("express").Router();
const usersRoute = require("./users");
const productsRoute = require("./products");
const brandsRoute = require("./brands");
const ordersRoute = require("./orders");
const cartRoute = require("./cart");
const adminRoute = require("./admin");
const addressRoute = require('./address')
const stripeRoute = require("./stripe")

router.use("/cart", cartRoute);
router.use("/products", productsRoute);
router.use("/users", usersRoute);
router.use("/admin", adminRoute);
router.use("/brands", brandsRoute);
router.use("/orders", ordersRoute);
router.use("/address", addressRoute);
router.use("/stripe", stripeRoute)

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;