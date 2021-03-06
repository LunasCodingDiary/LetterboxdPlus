"use strict";
const filmSeedData = require("./film-seed-data.json");

const {
  db,
  models: { User,Film, Director, Entry,Tag},
} = require("../server/db");

//for images/avatar
const path = require("path");
const fs = require("fs");

const loadImage = (imagePath) => {
    return new Promise((res, rej) => {
      fs.readFile(imagePath, "base64", (err, data) => {
        if (err) {
          rej(err);
        } else {
          res(`data:image/png;base64,${data.toString()}`); //?
        }
      });
    });
  };

async function seed() {
  // creating users
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users...
  const users = await Promise.all([
    User.create({ username: "prof", password: "2021" }),
    User.create({ username: "stanley", password: "2021" }),
    User.create({ username: "jason", password: "2021" }),
    User.create({ username: "luna", password: "2021", isAdmin: true }),
    User.create({ username: "nina", password: "2021", isAdmin: true }),
    User.create({ username: "gustove", password: "2021", isAdmin: true }),
  ]);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  // Creating films
  console.log(Array.isArray(filmSeedData))
  const films = []
  //await Promise.all(
    // filmSeedData.map((film) => Film.create(film))
  //);
 
  // Creating Directors...
  const directors = await Promise.all([
    Director.create({
      name: "Ang Lee",
      description:
        "Born in 1954 in Pingtung, Taiwan, Ang Lee has become one of today's greatest contemporary filmmakers.In 2012 Lee directed Life of Pi which earned 11 Academy Award nominations and went on to win the Academy Award for Best Director. In 2013 Ang Lee was selected as a member of the main competition jury at the 2013 Cannes Film Festival."
        }),
    Director.create({
      name: "Wes Anderson",
      description:
        "Wesley Wales Anderson is an American filmmaker. His films are known for their eccentricity and distinctive visual and narrative styles."
    }),
    Director.create({
      name: "Steven Spielberg",
      description:
        "Steven Allan Spielberg is an American film director, producer, and screenwriter. He began his career in the New Hollywood era, and is currently the most commercially successful director."
    }),
    Director.create({
      name: "Mia Hansen-L??ve",
      description:
        "Mia Hansen-L??ve is a French film director, screenwriter, and former actress. She has won several accolades for her work. Her first feature film, All Is Forgiven, won the Louis Delluc Prize for Best First Film in 2007 along with C??line Sciamma's Water Lilies. "
        }),
    Director.create({
      name: "Hayao Miyazaki",
      description:
        "Hayao Miyazaki (?????? ???, born 5 January 1941) is a Japanese animator, director, producer, screenwriter, author, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation."
    }),
]);
   // Creating film/Director Associations...
  directors.forEach((director) =>
    films.forEach((film) => {
      if (film.director === director.name) film.directorId = director.id;
    })
  );

  // Saving data..
  films.forEach((film) => film.save());
  directors.forEach((director) => director.save());

  //Creating entry
  const entry1 = await Entry.create({
    userId: users[0].id,
    // filmId: 5,
    review: "Not bad!",
    rating: 3.5
  });

  entry1.save()

  return {
    users: {
      luna: users[0],
      nina: users[1],
    },
  };
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
    runSeed();
  }
  
  // we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
  