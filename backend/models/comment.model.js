const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db");
const { sequelize } = require("../config/db");

const Comment = db.define(
    "comment", {

        comment: {
            type: DataTypes.STRING,
            defaultValue: '',
            allowNull: false
        },

    },

);

module.exports = Comment; // true