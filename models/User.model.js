const {sequelize} = require('../database/db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('users', {
    firstName: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true} },
    lastName: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    email: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true, contains: '@'}},
    password: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},

});

module.exports = User;