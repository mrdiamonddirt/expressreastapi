const { response } = require("express");
const { Sequelize } = require("sequelize");
const Favorite = require("./favoriteModel");

// check if table users exists if not create it
Favorite.sync({ force: false }).then(() => {
    console.log("Favorite table created");
});

// add new movie selected id to db

// delete movie id from db

// read all movies id's from db

// get all movie id's from db for specific user_id

// make sure if user deleted all corresponding movie id's are deleted from db
