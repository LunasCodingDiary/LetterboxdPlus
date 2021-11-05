const db = require("./db");
const User = require("./models/User");
const Movie = require("./models/Movie");
const Entry = require("./models/Entry");
const Tag = require("./Models/Tag");
const Director = require("./models/Director");

///////////////// ASSOCIATIONS /////////////////

//user has entries
Entry.belongsTo(User);
User.hasMany(Entry);

//entry refers to films 
Entry.belongsTo(Movie);
Movie.hasMany(Entry);

//film has directors 
Movie.belongsTo(Director);
Director.hasMany(Movie);

//entry refers to tags
Entry.belongsTo(Tag);
Tag.hasMany(Entry);

//film has directors and tags and genres
Movie.belongsTo(Director);
Director.hasMany(Movie);
Movie.belongsTo(Tag);
Tag.hasMany(Movie);
// User.belongsTo(Tag);
// Tag.hasMany(User);
// Tag.belongsTo(User);
// User.hasMany(Tag);



module.exports = {
  db,
  models: {
    User,
    Movie,
    Tag,
    Director,
    Entry
  },
};
