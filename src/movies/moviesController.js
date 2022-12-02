const { response } = require("express");
const { Sequelize } = require("sequelize");
const Movie = require("./moviesModel");

// check if table users exists if not create it
Movie.sync({ force: false }).then(() => {
    console.log("table created");
});

// add new movie selected id to db

// read all movies id's from db

// get all movie id's from db for specific user_id

// delete movie id from db

// delete all movie id's from db for specific user_id

// make sure if user deleted all corresponding movie id's are deleted from db
