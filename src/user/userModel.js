const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");
const { Favorite } = require("../favorite/favoriteModel");
const userRouter = require("./userRouter");

// sequelizeAuto to auto generate the table

const User = sequelize.define("User", {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = User;
