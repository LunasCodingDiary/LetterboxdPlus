const db = require("../db");
const { STRING, TEXT, ARRAY, INTEGER, DECIMAL } = require("sequelize");

///////////////// PRODUCT MODEL /////////////////
const Film = db.define("film", {
  //unique
  tmdb_id: {
    type: STRING,
    allowNull: false
  },
  //unique
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  original_title: {
    type: STRING,
    allowNull: true
  },

  // year: {
  //   type: INTEGER,
  //   allowNull: false,
  // }
  release_date:{
    type: INTEGER, //year = release_date.slice(0,4)
     allowNull: true
  },

  runtime: {
    type: INTEGER,
    allowNull: true
  },

  //multiple-selects
  production_countries: {
    type: ARRAY(TEXT),
    allowNull: true
  },

  production_companies: {
    type: ARRAY(TEXT),
    allowNull: true
  },

  genres: {
    type: ARRAY(TEXT),
    //or ENUM(["horror","thriller","action", "drama", "family", "comedy","sci-fi"]), //not string
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  keywords: {
    type: ARRAY(TEXT),
    allowNull: true
  },
  
  // add director/case to a movie
  // const horror = await Director.create({ name: 'steven' });
  // const jaw = await Movie.create({ name: 'Jaw', genreId: steven.id });

  directorId: {
    type: INTEGER,
    allowNull: true
  },

  cast: {
    type: TEXT,
    allowNull: true,
  },

  homepage: {
    type: STRING,
    allowNull: true
  },

  // imageURL: {
  //   type: STRING,
  //   allowNull: false,
  // } 
  // decides to use API for poster 

  rating: {
    type: DECIMAL,
    allowNull: true,
    validate: {
      isNumeric: true,
      min: 0.0,
      max: 10.0,
    },
    defaultValue:5.0
  },

  votes: {
    type: INTEGER,
    allowNull: true
  },

  synopsis: {
    // Note: word limit of 10,000 characters.
    type: TEXT,
    allowNull: true
  },

  tagline: {
    type: TEXT,
    allowNull: true
  },

  language:{
    type:STRING,
    allowNull: true
  },

  // more info in the datasets
  revenue:{
    type: STRING,
    allowNull: true
  },
  homepage: {
    type: STRING,
    allowNull: true
  },
  popularity:{
    type: DECIMAL,
    allowNull: true,
    validate: {
      isNumeric: true
    }
  }

});

///////////////// EXPORTING /////////////////
module.exports = Film;
