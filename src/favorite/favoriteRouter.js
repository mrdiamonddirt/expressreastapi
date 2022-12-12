const { Router } = require("express");
const {
    createFavorite,
    getAllFavorite,
    getFavorite,
    updateFavorite,
    deleteFavorite,
} = require("./favoriteController");
const favoriteRouter = Router();

// favoriteRouter.post("/addFavorite", createFavorite); // add Favorite to db
// favoriteRouter.get("/getFavorite", getAllFavorite); // return all favorite
// favoriteRouter.get("/getFavorite", getFavorite); // get one Favorite
// favoriteRouter.put("/updateFavorite", updateFavorite); // update Favorite
// favoriteRouter.delete("/deleteFavorite", deleteFavorite); // delete Favorite
