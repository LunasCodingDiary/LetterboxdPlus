//user's movie diary
const router = require("express").Router();

const { models: { Entry } } = require("../db");
const Film = require("../db/models/Films");
const User = require("../db/models/User");
const { isLoggedIn } = require("../middleware");

router.get("/", isLoggedIn, async (req, res, next) => {
    try {
        const user = req.user;
        const entries = await Entry.findAll({
            include: {
                model: Film,
            },
            where: {
                userId: user.id
            },
            entry: [["updatedAt", "DESC"]],
        });
        res.json(entries);
    }
    catch (err) {
        next(err);
    }
});

router.get("/diary", isLoggedIn, async (req, res, next) => {
  try {
      const user = req.user;
      const entries = await Entry.findAll({
          include: {
              model: Film,
          },
          where: {
              userId: user.id,
              watched_or_not: true
          },
          entry: [["updatedAt", "DESC"]],
      });
      res.json(entries);
  }
  catch (err) {
      next(err);
  }
});
router.get("/watchlist", isLoggedIn, async (req, res, next) => {
  try {
      const user = req.user;
      const entries = await Entry.findAll({
          include: {
              model: Film,
          },
          where: {
              userId: user.id,
              watched_or_not: false
          },
          entry: [["updatedAt", "DESC"]],
      });
      res.json(entries);
  }
  catch (err) {
      next(err);
  }
});


router.post("/", isLoggedIn, async (req, res, next) => {
    try {
        const user = req.user
       // const domainURL = process.env.SERVER_URL;
        const { entryId, filmId, userId, content, watched_or_not} = req.body
        res.send (await Entry.Create(req.body))
    //     const entry = await Entry.Create(req.body
    //     //     where: {
    //     //       userId: user.id,
    //     //       isCart: true,
    //     //     },
    //     //     defaults: {
    //     //       userId: user.id,
    //     //     },
    //     );
            
    //     const entries = await Entry.findAll({
    //     where: {
    //       userId: user.id,
    //     },
    //     order: [["createdAt", "DESC"]],
    //     include: Film,
    //   });
    //     res.json(entries);
    }
    catch (err) {
        next(err);
    }
});


router.put("/", isLoggedIn, async (req, res, next) => {
    try {
      const updateEntry = req.body;
     
      const entryToUpdate = await Entry.findOne({
        where: {
          id: updateEntry.id,
        },
      });
  
      await entryToUpdate.update(updateEntry);
  
      const updatedEntries = await entry.findAll({
        where: {
          userId: entryToUpdate.userId,
        },
        order: [["createdAt", "DESC"]],
        include: Film,
      });
  
      res.json(updatedEntries);
    } catch (err) {
      next(err);
    }
  });
  
  router.delete("/:entryId", isLoggedIn, async (req, res, next) => {
    try {
      const { entryId } = req.params;
      const entryToDelete = await Entry.findByPk(entryId, {
        // where: {
        //     orderId: cart.id,
        // }
      });
      await entryToDelete.destroy();
  
      const userEntries = await entry.findAll({
        where: {
          userId: entryToDelete.userId,
        },
        order: [["createdAt", "DESC"]],
        include: Film,
      });
  
      res.json(userEntries);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;