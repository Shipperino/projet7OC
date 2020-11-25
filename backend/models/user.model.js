const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db");
const { sequelize } = require("../config/db");

const User = db.define(
    "user", {

        username: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, 

);

module.exports = User; // true