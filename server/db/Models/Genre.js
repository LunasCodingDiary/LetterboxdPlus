
const { STRING } = require("sequelize");

const db = require("../db");

///////////////// BRAND MODEL /////////////////
const Genre = db.define("genre", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  }
});

///////////////// EXPORTING /////////////////
module.exports = Genre;
