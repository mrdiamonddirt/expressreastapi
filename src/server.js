const { sequelize } = require("./db/connection");
const express = require("express");
const cors = require("cors");
const userRouter = require("./user/userRouter");
const { User } = require("./user/userModel");
// const favoriteRouter = require("./favorite/favoriteRouter");
// const { Favorite } = require("./favorite/favoriteModel");
// port connection
const port = process.env.PORT || 5001;

// express app
const app = express();
app.use(cors());

app.use(express.json());
app.use(userRouter);

// async function relationships() {
//     User.hasMany(Favorite, {
//         foreignKey: "user_id",
//         sourceKey: "id",
//     });
//     Favorite.belongsTo(User);

//     sequelize.sync();
// }
// relationships();

// get health from server
app.get("/health", (req, res) => {
    res.status(200).send({ message: "API is working" });
});

// sequelize connection
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

// listener
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
