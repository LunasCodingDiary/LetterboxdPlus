const { BOOLEAN, INTEGER, STRING, TEXT, DATE } = require('sequelize');
const db = require('../db');

///////////////// ORDER MODEL /////////////////
const Entry = db.define('entry', {
    // hasReview: {
    //     type: BOOLEAN,
    //     defaultValue: false,
    // },
    date:{
        type:DATE,
        allowNull: false
    },
    review: {
        type: TEXT,
        allowNull: true
    },
    rating: {
        type: INTEGER,
        allowNull: true
    },
    watched_or_not: {
        type: BOOLEAN,
        allowNull: false
    }

})

///////////////// EXPORTING /////////////////
module.exports = Entry;