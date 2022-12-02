const { Router } = require("express");
const {
    createMovies,
    getAllMovies,
    getMovie,
    updateMovie,
    deleteMovie,
} = require("./moviesControllers");
const movieRouter = Router();

movieRouter.post("/addMovie", createMovies); // add movie to db
movieRouter.get("/getMovies", getAllMovies); // return all movies
movieRouter.get("/getMovie/:id?", getMovie); // get one movie
movieRouter.put("/updateMovie", updateMovie); // update movie
movieRouter.delete("/deleteMovie", deleteMovie); // delete movie
