const router = require("express").Router();
const {
  models: { Film, Director, Entry, Genre, Keyword, Tag},
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const films = await Film.findAll({
      include: [
        {
          model: Genre 
        },
        {
          model: Entry 
        },
        {
          model: Keyword
        },
        {
          model: Director
        },
        
       ] //fetching associations ; multiple eager loading
    });
    res.json(films);
  } catch (err) {
    next(err);
  }
});

router.get("/:filmId", async (req, res, next) => {
  try {
    const film = await Film.findByPk(req.params.filmId);
    res.send(film);
  } catch (err) {
    next(err);
  }
});

//Creating New Film...
router.post("/", async (req, res, next) => {
  try {
    res.send(await Film.create(req.body));
  } catch (err) {
    next(err);
  }
});

//Updating Single film...
router.put("/:filmId", async (req, res, next) => {
  try {
    const singlefilm = await Film.findByPk(req.params.filmId);
    await singlefilm.update(req.body);
    res.send(await singlefilm.save()); //save()
  } catch (err) {
    next(err);
  }
});

//Deleting Single film...
router.delete("/:id", async (req, res, next) => {
  try {
    const singlefilm = await film.findByPk(req.params.id);
    await singlefilm.destroy();
    res.send(singlefilm);
  } catch (err) {
    next(err);
  }
});

// Retrieving data for specific film...
// router.get("/:id", async (req, res, next) => {
//   try {
//     const filmId = req.params.id
//     const singlefilm = await film.findByPk(filmId, {
//       include: Brand
//     });
//     res.json(singlefilm);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
