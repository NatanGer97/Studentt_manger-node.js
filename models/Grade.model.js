const {sequelize} = require('../database/db');
const {DataTypes} = require('sequelize');
const Student = require('./Student.model');

const Grade = sequelize.define('grades' ,{
    courseName: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true} },
    courseGrade: {type: DataTypes.INTEGER, allowNull: false, validate: {notEmpty: true, min:1, max:100}},

});

// Grade.belongsTo(Student);
module.exports = Grade;
