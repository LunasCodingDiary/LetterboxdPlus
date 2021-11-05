const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const Order = require("../db/models/Order");
const OrderItem = require("../db/models/OrderItem");

//ATTENTION (RIV): Should we be keeping GET Route? Since this should only be accessible by an Admin / we have a GET Route for users via api/admin.js
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username"],
      // include: {
      //   model: Order,
      //   include: {
      //     model: OrderItem
      //   }
      // }
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    await user.update(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
