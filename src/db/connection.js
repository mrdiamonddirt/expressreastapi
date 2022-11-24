require ('dotenv').config();

// alternative import statement using ES6 syntax
// import * as dotenv from 'dotenv';
// dotenv.config()

const { Sequelize } = require ('sequelize');
const test = new Sequelize(process.env.MYSQL_URI)
// console.log(test)
exports.sequelize = new Sequelize(process.env.MYSQL_URI)