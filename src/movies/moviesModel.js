const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

// sequelizeAuto to auto generate the table

const Movies = sequelize.define("Movies", {
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
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = Movies;
