// INTEGRER SEQUALIZED
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Post = sequelize.define("post", {
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
console.log(Post === sequelize.models.Post);

module.exports = Post; // true