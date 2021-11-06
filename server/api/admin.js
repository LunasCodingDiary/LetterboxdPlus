const router = require("express").Router();
const {models: { Film, User, Diary }} = require("../db");

const { isLoggedIn, isAdmin } = require("../middleware");
const { pluralize } = require("inflection");
//const Film = require("../db/models/Film");

/////////////////// ROUTES / SIMPLE ///////////////////

// router.get("/orders", async (req, res, next) => {
//   try {
//     const orders = await Order.findAll();
//     res.send(orders);
//   } catch (err) {
//     next(err);
//   }
// });

// router.get("/users", async (req, res, next) => {
//   try {
//     const users = await User.findAll();
//     res.send(users);
//   } catch (err) {
//     next(err);
//   }
// });

/////////////////// ROUTES (DYNAMIC) ///////////////////

// router.get("/orders", isLoggedIn, isAdmin, async (req, res, next) => {
//   try {
//     const orders = await Order.findAll();
//     res.json(orders);
//   } catch (err) {
//     next(err);
//   }
// });

// router.get("/users", isLoggedIn, isAdmin, async (req, res, next) => {
//     try {
//         const users = await User.findAll()
//         res.json(users);
//     }
//     catch (err) {
//         next(err);
//     }
// });

// router.get("/products", isLoggedIn, isAdmin, async (req, res, next) => {
//     try {
//         const products = await Product.findAll()
//         res.json(products);
//     }
//     catch (err) {
//         next(err);
//     }
// });

module.exports = router;

//Do three Routes in a more efficient way (dynamic routes)
const obj = {
  orders: Order,
  orderItems: OrderItem,
  users: User,
  products: Product,
};

Object.entries(obj).forEach((entry) => {
  const _path = pluralize(entry[0]);
  const model = entry[1];
  router.get(`/${_path}`, isLoggedIn, isAdmin, async (req, res, next) => {
    try {
      res.send(await model.findAll());
    } catch (err) {
      next(err);
    }
  });
  router.get(`/${_path}/:id`, async (req, res, next) => {
    try {
      res.send(await model.findByPk(req.params.id));
    } catch (err) {
      next(err);
    }
  });
  router.put(`/${_path}/:id`, async (req, res, next) => {
    try {
      const item = await model.findByPk(req.params.id);
      console.log(item);
      await item.update(req.body);
      res.send(item);
    } catch (err) {
      next(err);
    }
  });
  router.post(`/users`, async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      res.send({ token: await user.generateToken() });
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(401).send("User already exists");
      } else {
        next(err);
      }
    }
  });
  router.delete(
    `/${_path}/:id`,
    isLoggedIn,
    isAdmin,
    async (req, res, next) => {
      try {
        const item = await model.findByPk(req.params.id);
        await item.destroy();
        res.sendStatus(201);
      } catch (err) {
        next(err);
      }
    }
  );
});
