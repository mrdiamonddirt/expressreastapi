const { response } = require("express");
const { Sequelize } = require("sequelize");
const Favorite = require("./favoriteModel");

// check if table users exists if not create it
Favorite.sync({ force: false }).then(() => {
    console.log("Favorite table created");
});

// add new movie selected id to db
export const addFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.create({
            movieId: req.body.movieId,
            userId: req.body.userId,
        });
        res.status(200).send({
            status: "success",
            message: "Movie added to favorites",
            data: favorite,
        });
    } catch (err) {
        res.status(500).send({
            status: "fail",
            message: err,
        });
    }
};
// delete movie id from db
export const deleteFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.destroy({
            where: {
                movieId: req.body.movieId,
                userId: req.body.userId,
            },
        });
        res.status(200).send({
            status: "success",
            message: "Movie deleted from favorites",
            data: favorite,
        });
    } catch (err) {
        res.status(500).send({
            status: "fail",
            message: err,
        });
    }
};
// read all movies id's from db

export const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.findAll();
        res.status(200).send({
            status: "success",
            message: "Favorites found",
            data: favorites,
        });
    } catch (err) {
        res.status(500).send({
            status: "fail",
            message: err,
        });
    }
};
// get all movie id's from db for specific user_id
export const getFavoritesByUserId = async (req, res) => {
    try {
        const favorites = await Favorite.findAll({
            where: {
                userId: req.body.userId,
            },
        });
        res.status(200).send({
            status: "success",
            message: "Favorites found",
            data: favorites,
        });
    } catch (err) {
        res.status(500).send({
            status: "fail",
            message: err,
        });
    }
};

// make sure if user deleted all corresponding movie id's are deleted from db
