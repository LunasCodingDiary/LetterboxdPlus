const db = require("./db");
const User = require("./models/User");
const Film = require("./Models/Film");
const Entry = require("./models/Entry");
const Tag = require("./Models/Tag");
const Director = require("./models/Director");
const Genre = require("./models/Genre");
const Keyword = require("./models/Keyword");
///////////////// ASSOCIATIONS /////////////////

//user has entries
Entry.belongsTo(User);
User.hasMany(Entry);

//entry refers to films 
Entry.belongsTo(Film);
Film.hasMany(Entry);

//film has directors 
Film.belongsTo(Director);
Director.hasMany(Film);

//entry refers to tags
Entry.belongsTo(Tag);
Tag.hasMany(Entry);

//film has many and belong to tags, keywords, and genres
Film.belongsTo(Director);
Director.hasMany(Film);
Film.belongsTo(Tag);
Tag.hasMany(Film);

// Film.belongsTo(Keyword);
// Keyword.hasMany(Film);
// Film.hasMany(Keyword);
// Keyword.belongsTo(Film);

// Film.belongsTo(Genre);
// Genre.hasMany(Film);
// Film.hasMany(Genre);
// Genre.belongsTo(Film);

// User.belongsTo(Tag);
// Tag.hasMany(User);
// Tag.belongsTo(User);
// User.hasMany(Tag);

module.exports = {
  db,
  models: {
    User,
    Film,
    Tag,
    Director,
    Entry,
    Genre,
    Keyword
  },
};
