const { Tag, STRING } = require("sequelize");

const db = require("../db");

///////////////// BRAND MODEL /////////////////
const Tag = db.define("tag", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  }
});

///////////////// EXPORTING /////////////////
module.exports = Tag;
