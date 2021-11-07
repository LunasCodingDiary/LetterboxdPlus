const { BOOLEAN, DEMICAL, STRING, TEXT, DATE, DECIMAL } = require('sequelize');
const db = require('../db');

///////////////// ORDER MODEL /////////////////
const Entry = db.define('entry', {
    // hasReview: {
    //     type: BOOLEAN,
    //     defaultValue: false,
    // },
    date:{
        type:DATE,
        allowNull: true
    },
    review: {
        type: TEXT,
        allowNull: true
    },
    rating: {
        type: DECIMAL,
        allowNull: true
    },
    watched_or_not: {
        type: BOOLEAN,
        allowNull: true //will change laters
    }

})

///////////////// EXPORTING /////////////////
module.exports = Entry;