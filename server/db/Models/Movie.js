const db = require("../db");
const { STRING, TEXT, ENUM, INTEGER } = require("sequelize");

///////////////// PRODUCT MODEL /////////////////
const Movie = db.define("movie", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  // add director to a movie
  // const horror = await Director.create({ name: 'steven' });
  // const jaw = await Movie.create({ name: 'Jaw', genreId: steven.id });

  director: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  imageURL: {
    type: STRING,
    allowNull: false,
  },

  year: {
    type: INTEGER,
    allowNull: false,
  },

  runtime: {
    type: INTEGER,
    allowNull: false
  },

  country: {
    type: STRING,
    allowNull: false
  },

  genre: {
    type: ENUM(["horror","thriller","action", "drama", "family", "comedy","sci-fi"]), //not string
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  
  rating: {
    type: DECIMAL,
    validate: {
      isNumeric: true,
      min: 0.0,
      max: 5.0,
    },
  },

  synopsis: {
    // Note: word limit of 10,000 characters.
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

///////////////// EXPORTING /////////////////
module.exports = Movie;
