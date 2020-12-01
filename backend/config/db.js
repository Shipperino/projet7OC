var Sequelize = require('sequelize');

var sequelize = new Sequelize('groupomania', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;