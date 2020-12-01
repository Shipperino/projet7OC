// INTEGRER SEQUALIZED
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db");

const Post = db.define("post", {
    // Model attributes are defined here

    title: {
        type: DataTypes.STRING,
        defaultValue: ''

    },
    content: {
        type: DataTypes.STRING,
        defaultValue: ''

    }
}, );

// `sequelize.define` also returns the model
console.log(Post === db.models.Post);

module.exports = Post; // true