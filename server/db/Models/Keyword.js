
const { STRING } = require("sequelize");

const db = require("../db");

///////////////// BRAND MODEL /////////////////
const Keyword = db.define("keyword", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  }
});

///////////////// EXPORTING /////////////////
module.exports = Keyword;
