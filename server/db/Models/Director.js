
const { TEXT, STRING } = require("sequelize");

const db = require("../db");

///////////////// BRAND MODEL /////////////////
const Director = db.define("director", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: TEXT,
    allowNull: true
  },
  country:{
    type: STRING,
    allowNull: true,
  }
});

///////////////// EXPORTING /////////////////
module.exports = Director;
