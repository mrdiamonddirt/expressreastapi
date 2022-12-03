const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

// sequelizeAuto to auto generate the table

const Favorite = sequelize.define("Favorite", {
    // Model attributes are defined here
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        foreignKey: true,
    },
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
});

module.exports = Favorite;
